/**
 * @author biud436
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const writeFileAsync = promisify(fs.writeFile);

const downFile = async function(url, filename, callback) {

    let out = fs.createWriteStream(filename);
    
    const options = {
        headers: {
            "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
        },
        port: 443,
        method: 'GET',
        checkServerIdentity: function(host, cert) {        
          },
    }
    const req = https.get(url, options, res => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);
    
        let len = parseInt(res.headers["content-length"], 10);
        let cur = 0;
        let total = len / 1048576;
        
        if(res.statusCode === 200) {
            res.pipe(out);
    
            res.on('data', c => {
                cur += c.length;
                console.log(`${(100.0 * cur / len).toFixed(1)}% (${(cur / total).toFixed(2)} MB)`);
            });
            res.on('end', async () => {
                await callback(null, res);
            });
        }

    });
    
    req.on( 'response', function ( data ) {
        console.log( data.headers[ 'content-length' ] );
    } );
    
    req.on('error', async err => {
        await callback(err, null);
    });

};

const downloadFile = promisify(downFile);

const downFileZip = async function(url, filename, callback) {
    
    const options = {
        port: 443,
        headers: {},
    };

    let req = https.get(url, options, res => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);

        const headers = res.headers;
        
        if('content-disposition' in headers) {
            if(/(?:filename=)(.*)/i.exec( headers['content-disposition'])) {
                filename = RegExp.$1;
            }
        }

        let out = fs.createWriteStream(filename);
        let len = 1048576;
        let isValid = false;

        if("content-length" in res.headers) {
            len = parseInt(res.headers["content-length"], 10);
            isValid = true;
        }
    
        let cur = 0;
        let total = len / 1048576;
        
        if(res.statusCode === 200) {
            res.pipe(out);
    
            res.on('data', c => {
                cur += c.length;
                if(isValid) {
                    console.log(`${(100.0 * cur / len).toFixed(0)}% (${(cur / total).toFixed(2)} MB)`);
                }
            });
            res.on('end', async () => {
                await callback(null, res);
            });
        }
    });

    req.on('error', async err => {
        await callback(err, null);
    });
};

const downFileZipAsync = promisify(downFileZip);

/**
 * @param {String} url
 */
module.exports = {
    downloadFile, 
    downFileZipAsync
};