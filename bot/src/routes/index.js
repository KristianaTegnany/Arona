const router = require('express').Router()

router.get('/', function (request, response) {
    response.send(process.env.currentUrl)
})

module.exports = router;