const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function injectNonces(html) {
    // Regular expression to find inline style attributes (case-insensitive)
    const inlineStyleRegex = /style=(["'])(.*?)\1/gi; // \1 is a backreference to group 1
    let newHtml = html;
    let match;

    while ((match = inlineStyleRegex.exec(html)) !== null) { // Finds each inline style one at a time.

        const originalStyleAttribute = match[0];
        const styleContent = match[2]; // The actual CSS

        const nonce = crypto.randomBytes(16).toString('base64'); // Generate a UNIQUE nonce for EACH style

        // Construct the new style attribute with the nonce
        const newStyleAttribute = `style="nonce-${nonce}; ${styleContent}"`; // Correct format


        // Replace only the specific matched inline style attribute:
        newHtml = newHtml.replace(originalStyleAttribute, newStyleAttribute);
    }
    return newHtml;
}


// Array of your HTML file names (Make sure these are ALL your HTML files)
const htmlFiles = ['index.html', 'real-estate-welcome.html', 'telecommunications.html', 'solar.html'];


htmlFiles.forEach(fileName => {
    const nonce = crypto.randomBytes(16).toString('base64');
    const filePath = path.join(__dirname, 'dist', fileName);
    const aosScriptTag = '<script src="https://unpkg.com/aos@2.3.1/dist/aos.js" defer></script>';
    const cloudinaryScriptTag = '<script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"></script>';
    // Systeme.io script tags (define all variations)
    const systemeioScriptTags = {
        'real-estate-welcome.html': '<script id="form-script-tag-15513494" src="https://amattabukahomeservices.systeme.io/public/remote/page/24259591b580885831008178133404d6efe2bfd8.js" async defer></script>',
        'telecommunications.html': '<script id="form-script-tag-15513236" src="https://amattabukahomeservices.systeme.io/public/remote/page/24259232ad1133380e4c08d1c941d40c9ef16947.js" async defer></script>',
        'solar.html': '<script id="form-script-tag-15513637" src="https://amattabukahomeservices.systeme.io/public/remote/page/242597845c1b898ac9eeadaaa169e7106ae8a612.js" async defer></script>'
    };

    let html = fs.readFileSync(filePath, 'utf-8'); // Read the file here


    html = injectNonces(html); // Call the function to inject nonces for inline styles


    // Inject external scripts *before* the closing </body> tag
    html = html.replace('</body>', `${aosScriptTag}\n${cloudinaryScriptTag}\n${systemeioScriptTags[fileName] || ''}</body>`); // Inject appropriate Systeme.io tag or nothing

    console.log(`AOS, Cloudinary and Systeme.io Script tags added to ${fileName}`);


    // Inject nonces *only into existing script and style tags that don't already have a nonce*:
     html = html.replace(/<script(?!.*? nonce=).*?>/g, match => match.replace(/>/, ` nonce="${nonce}">`));
     html = html.replace(/<style(?!.*? nonce=).*?>/g, match => match.replace(/>/, ` nonce="${nonce}">`));

    fs.writeFileSync(filePath, html);
    console.log(`Nonce injected into: ${filePath}`);




    const headersFilePath = path.join(__dirname, 'dist', '_headers');
    const csp = `/*\nContent-Security-Policy: default-src 'self'; base-uri 'none'; script-src 'self' 'nonce-${nonce}' https://amattabukahomeservices.systeme.io https://upload-widget.cloudinary.com https://unpkg.com; style-src 'self' 'nonce-${nonce}' https://unpkg.com; img-src 'self' data: https://res.cloudinary.com; font-src 'self'; connect-src 'self' https://amattabukahomeservices.systeme.io https://upload-widget.cloudinary.com; frame-src https://amattabukahomeservices.systeme.io; report-uri https://b82f66c6544b5f82f92e3f169547b092.report-uri.com/r/d/csp/reportOnly`;

    fs.writeFileSync(headersFilePath, csp);
    console.log(`${fileName} processed. Nonce (for scripts/ext styles): ${nonce}`);


});