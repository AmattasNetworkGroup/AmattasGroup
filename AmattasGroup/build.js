const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Array of your HTML file names (Make sure these are ALL your HTML files)
const htmlFiles = ['index.html', 'real-estate-welcome.html', 'telecommunications.html', 'solar.html'];


htmlFiles.forEach(fileName => {
    const nonce = crypto.randomBytes(16).toString('base64');
    const filePath = path.join(__dirname, 'dist', fileName);
    const aosScriptTag = '<script src="https://unpkg.com/aos@2.3.1/dist/aos.js" defer></script>';
    const cloudinaryScriptTag = '<script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"></script>';
    const systemeioScriptTag1 = '<script id="form-script-tag-15513494" src="https://amattabukahomeservices.systeme.io/public/remote/page/24259591b580885831008178133404d6efe2bfd8.js" async defer></script>'
    const systemeioScriptTag2 = '<script id="form-script-tag-15513236" src="https://amattabukahomeservices.systeme.io/public/remote/page/24259232ad1133380e4c08d1c941d40c9ef16947.js" async defer></script>'
    const systemeioScriptTag3 = '<script id="form-script-tag-15513637" src="https://amattabukahomeservices.systeme.io/public/remote/page/242597845c1b898ac9eeadaaa169e7106ae8a612.js" async defer></script>'
    
    let html = fs.readFileSync(filePath, 'utf-8'); // Read the file here


    // *** Conditional logic for Systeme.io (Important!) ***
    let systemeioScriptTag = ""; // Initialize an empty string

    if (fileName === 'real-estate-welcome.html') {
        systemeioScriptTag = systemeioScriptTag1;
    } else if (fileName === 'telecommunications.html') {
        systemeioScriptTag = systemeioScriptTag2;
    } else if (fileName === 'solar.html') {
        systemeioScriptTag = systemeioScriptTag3;
    }



    // Assuming your aos script tag looks exactly like this in all your html files. This script will add the tag before </body> if it's missing.
    html = html.replace('</body>', `${aosScriptTag}\n${cloudinaryScriptTag}\n${systemeioScriptTag}</body>`);

    console.log(`AOS, Cloudinary and Systeme.io Script tags added to ${fileName}`);


    // Inject nonces *only into existing script and style tags that don't already have a nonce*:
    html = html.replace(/<script(?!.*? nonce=).*?>/g, match => match.replace(/>/, ` nonce="${nonce}">`));
    html = html.replace(/<style(?!.*? nonce=).*?>/g, match => match.replace(/>/, ` nonce="${nonce}">`));



    fs.writeFileSync(filePath, html);
    console.log(`Nonce injected into: ${filePath}`);




    const headersFilePath = path.join(__dirname, 'dist', '_headers');
    const csp = `/*\n  Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-${nonce}' https://amattabukahomeservices.systeme.io https://upload-widget.cloudinary.com https://unpkg.com; style-src 'self' 'nonce-${nonce}' https://unpkg.com; img-src 'self' data: https://res.cloudinary.com; font-src 'self'; connect-src 'self' https://amattabukahomeservices.systeme.io https://upload-widget.cloudinary.com; frame-src https://amattabukahomeservices.systeme.io;`;  //CSP with the current nonce

    fs.writeFileSync(headersFilePath, csp);
    console.log(`${fileName} Build complete, Nonce is: ${nonce}`);


});