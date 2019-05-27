const scrape = require('website-scraper');
const getTitleAtUrl = require('get-title-at-url');
const sanitize = require("sanitize-filename");
const path = require("path");
var zipFolder = require('zip-folder');
var rimraf = require("rimraf");
import extractDomain from 'extract-domain';

export const sendArchivedPage = (url, cb) => {
    let title = extractDomain(url);
    let titleAndTime = `${sanitize(title)}-${new Date().getTime()}`
    let tileOnly = `${sanitize(title)}`
    let folder_to_scrape = path.resolve(__dirname, `../../temp/pages/${titleAndTime}/${tileOnly}`)
    let folder_to_zip = path.resolve(__dirname, `../../temp/pages/${titleAndTime}`)
    let folder_archives_path = path.resolve(__dirname, `../../temp/archives/${titleAndTime}`)
    scrape({
        urls: [url],
        directory: folder_to_scrape,
        sources: [{
                selector: 'img',
                attr: 'src'
            },
            {
                selector: 'link[rel="stylesheet"]',
                attr: 'href'
            },
            {
                selector: 'script',
                attr: 'src'
            }
        ]
    }).then(function () {
        zipFolder(folder_to_zip, `${folder_archives_path}.zip`, function (err) {
            rimraf(folder_to_zip, function () {
                console.log("done")
            });
            cb(`${titleAndTime}.zip`)
            // Remove asynchronously
        });
    });
    
    getTitleAtUrl(url, function (title) {
    });
}