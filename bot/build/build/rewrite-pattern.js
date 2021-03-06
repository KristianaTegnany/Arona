'use strict';

var generate = require('regjsgen').generate;

var parse = require('regjsparser').parse;

var regenerate = require('regenerate');

var unicodeMatchProperty = require('unicode-match-property-ecmascript');

var unicodeMatchPropertyValue = require('unicode-match-property-value-ecmascript');

var iuMappings = require('./data/iu-mappings.js');

var ESCAPE_SETS = require('./data/character-class-escape-sets.js'); // Prepare a Regenerate set containing all code points, used for negative
// character classes (if any).


var UNICODE_SET = regenerate().addRange(0x0, 0x10FFFF); // Without the `u` flag, the range stops at 0xFFFF.
// https://mths.be/es6#sec-pattern-semantics

var BMP_SET = regenerate().addRange(0x0, 0xFFFF); // Prepare a Regenerate set containing all code points that are supposed to be
// matched by `/./u`. https://mths.be/es6#sec-atom

var DOT_SET_UNICODE = UNICODE_SET.clone() // all Unicode code points
.remove( // minus `LineTerminator`s (https://mths.be/es6#sec-line-terminators):
0x000A, // Line Feed <LF>
0x000D, // Carriage Return <CR>
0x2028, // Line Separator <LS>
0x2029 // Paragraph Separator <PS>
);

var getCharacterClassEscapeSet = function getCharacterClassEscapeSet(character, unicode, ignoreCase) {
  if (unicode) {
    if (ignoreCase) {
      return ESCAPE_SETS.UNICODE_IGNORE_CASE.get(character);
    }

    return ESCAPE_SETS.UNICODE.get(character);
  }

  return ESCAPE_SETS.REGULAR.get(character);
};

var getUnicodeDotSet = function getUnicodeDotSet(dotAll) {
  return dotAll ? UNICODE_SET : DOT_SET_UNICODE;
};

var getUnicodePropertyValueSet = function getUnicodePropertyValueSet(property, value) {
  var path = value ? "".concat(property, "/").concat(value) : "Binary_Property/".concat(property);

  try {
    return require("regenerate-unicode-properties/".concat(path, ".js"));
  } catch (exception) {
    throw new Error("Failed to recognize value `".concat(value, "` for property ") + "`".concat(property, "`."));
  }
};

var handleLoneUnicodePropertyNameOrValue = function handleLoneUnicodePropertyNameOrValue(value) {
  // It could be a `General_Category` value or a binary property.
  // Note: `unicodeMatchPropertyValue` throws on invalid values.
  try {
    var _property = 'General_Category';
    var category = unicodeMatchPropertyValue(_property, value);
    return getUnicodePropertyValueSet(_property, category);
  } catch (exception) {} // It’s not a `General_Category` value, so check if it’s a binary
  // property. Note: `unicodeMatchProperty` throws on invalid properties.


  var property = unicodeMatchProperty(value);
  return getUnicodePropertyValueSet(property);
};

var getUnicodePropertyEscapeSet = function getUnicodePropertyEscapeSet(value, isNegative) {
  var parts = value.split('=');
  var firstPart = parts[0];
  var set;

  if (parts.length == 1) {
    set = handleLoneUnicodePropertyNameOrValue(firstPart);
  } else {
    // The pattern consists of two parts, i.e. `Property=Value`.
    var property = unicodeMatchProperty(firstPart);

    var _value = unicodeMatchPropertyValue(property, parts[1]);

    set = getUnicodePropertyValueSet(property, _value);
  }

  if (isNegative) {
    return UNICODE_SET.clone().remove(set);
  }

  return set.clone();
}; // Given a range of code points, add any case-folded code points in that range
// to a set.


regenerate.prototype.iuAddRange = function (min, max) {
  var $this = this;

  do {
    var folded = caseFold(min);

    if (folded) {
      $this.add(folded);
    }
  } while (++min <= max);

  return $this;
};

var update = function update(item, pattern) {
  var tree = parse(pattern, config.useUnicodeFlag ? 'u' : '');

  switch (tree.type) {
    case 'characterClass':
    case 'group':
    case 'value':
      // No wrapping needed.
      break;

    default:
      // Wrap the pattern in a non-capturing group.
      tree = wrap(tree, pattern);
  }

  Object.assign(item, tree);
};

var wrap = function wrap(tree, pattern) {
  // Wrap the pattern in a non-capturing group.
  return {
    'type': 'group',
    'behavior': 'ignore',
    'body': [tree],
    'raw': "(?:".concat(pattern, ")")
  };
};

var caseFold = function caseFold(codePoint) {
  return iuMappings.get(codePoint) || false;
};

var processCharacterClass = function processCharacterClass(characterClassItem, regenerateOptions) {
  var set = regenerate();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = characterClassItem.body[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      switch (item.type) {
        case 'value':
          set.add(item.codePoint);

          if (config.ignoreCase && config.unicode && !config.useUnicodeFlag) {
            var folded = caseFold(item.codePoint);

            if (folded) {
              set.add(folded);
            }
          }

          break;

        case 'characterClassRange':
          var min = item.min.codePoint;
          var max = item.max.codePoint;
          set.addRange(min, max);

          if (config.ignoreCase && config.unicode && !config.useUnicodeFlag) {
            set.iuAddRange(min, max);
          }

          break;

        case 'characterClassEscape':
          set.add(getCharacterClassEscapeSet(item.value, config.unicode, config.ignoreCase));
          break;

        case 'unicodePropertyEscape':
          set.add(getUnicodePropertyEscapeSet(item.value, item.negative));
          break;
        // The `default` clause is only here as a safeguard; it should never be
        // reached. Code coverage tools should ignore it.

        /* istanbul ignore next */

        default:
          throw new Error("Unknown term type: ".concat(item.type));
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (characterClassItem.negative) {
    set = (config.unicode ? UNICODE_SET : BMP_SET).clone().remove(set);
  }

  update(characterClassItem, set.toString(regenerateOptions));
  return characterClassItem;
};

var updateNamedReference = function updateNamedReference(item, index) {
  delete item.name;
  item.matchIndex = index;
};

var assertNoUnmatchedReferences = function assertNoUnmatchedReferences(groups) {
  var unmatchedReferencesNames = Object.keys(groups.unmatchedReferences);

  if (unmatchedReferencesNames.length > 0) {
    throw new Error("Unknown group names: ".concat(unmatchedReferencesNames));
  }
};

var processTerm = function processTerm(item, regenerateOptions, groups) {
  switch (item.type) {
    case 'dot':
      if (config.unicode) {
        update(item, getUnicodeDotSet(config.dotAll).toString(regenerateOptions));
      } else if (config.dotAll) {
        // TODO: consider changing this at the regenerate level.
        update(item, '[\\s\\S]');
      }

      break;

    case 'characterClass':
      item = processCharacterClass(item, regenerateOptions);
      break;

    case 'unicodePropertyEscape':
      update(item, getUnicodePropertyEscapeSet(item.value, item.negative).toString(regenerateOptions));
      break;

    case 'characterClassEscape':
      update(item, getCharacterClassEscapeSet(item.value, config.unicode, config.ignoreCase).toString(regenerateOptions));
      break;

    case 'group':
      if (item.behavior == 'normal') {
        groups.lastIndex++;
      }

      if (item.name) {
        var name = item.name.value;

        if (groups.names[name]) {
          throw new Error("Multiple groups with the same name (".concat(name, ") are not allowed."));
        }

        var index = groups.lastIndex;
        delete item.name;
        groups.names[name] = index;

        if (groups.onNamedGroup) {
          groups.onNamedGroup.call(null, name, index);
        }

        if (groups.unmatchedReferences[name]) {
          groups.unmatchedReferences[name].forEach(function (reference) {
            updateNamedReference(reference, index);
          });
          delete groups.unmatchedReferences[name];
        }
      }

    /* falls through */

    case 'alternative':
    case 'disjunction':
    case 'quantifier':
      item.body = item.body.map(function (term) {
        return processTerm(term, regenerateOptions, groups);
      });
      break;

    case 'value':
      var codePoint = item.codePoint;
      var set = regenerate(codePoint);

      if (config.ignoreCase && config.unicode && !config.useUnicodeFlag) {
        var folded = caseFold(codePoint);

        if (folded) {
          set.add(folded);
        }
      }

      update(item, set.toString(regenerateOptions));
      break;

    case 'reference':
      if (item.name) {
        var _name = item.name.value;
        var _index = groups.names[_name];

        if (_index) {
          updateNamedReference(item, _index);
          break;
        }

        if (!groups.unmatchedReferences[_name]) {
          groups.unmatchedReferences[_name] = [];
        } // Keep track of references used before the corresponding group.


        groups.unmatchedReferences[_name].push(item);
      }

      break;

    case 'anchor':
    case 'empty':
    case 'group':
      // Nothing to do here.
      break;
    // The `default` clause is only here as a safeguard; it should never be
    // reached. Code coverage tools should ignore it.

    /* istanbul ignore next */

    default:
      throw new Error("Unknown term type: ".concat(item.type));
  }

  return item;
};

var config = {
  'ignoreCase': false,
  'unicode': false,
  'dotAll': false,
  'useUnicodeFlag': false
};

var rewritePattern = function rewritePattern(pattern, flags, options) {
  var regjsparserFeatures = {
    'unicodePropertyEscape': options && options.unicodePropertyEscape,
    'namedGroups': options && options.namedGroup,
    'lookbehind': options && options.lookbehind
  };
  config.ignoreCase = flags && flags.includes('i');
  config.unicode = flags && flags.includes('u');
  var supportDotAllFlag = options && options.dotAllFlag;
  config.dotAll = supportDotAllFlag && flags && flags.includes('s');
  config.useUnicodeFlag = options && options.useUnicodeFlag;
  var regenerateOptions = {
    'hasUnicodeFlag': config.useUnicodeFlag,
    'bmpOnly': !config.unicode
  };
  var groups = {
    'onNamedGroup': options && options.onNamedGroup,
    'lastIndex': 0,
    'names': Object.create(null),
    // { [name]: index }
    'unmatchedReferences': Object.create(null) // { [name]: Array<reference> }

  };
  var tree = parse(pattern, flags, regjsparserFeatures); // Note: `processTerm` mutates `tree` and `groups`.

  processTerm(tree, regenerateOptions, groups);
  assertNoUnmatchedReferences(groups);
  return generate(tree);
};

module.exports = rewritePattern;
//# sourceMappingURL=rewrite-pattern.js.map