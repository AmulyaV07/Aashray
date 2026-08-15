const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'views');

function traverse(currentDir) {
    fs.readdirSync(currentDir).forEach(file => {
        const fullPath = path.join(currentDir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverse(fullPath);
        } else if (fullPath.endsWith('.ejs')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // Make body background very dark (soothing deep color)
            content = content.replace(/bg-stone-900/g, 'bg-stone-950'); 
            
            // Cards and containers (which are currently 800) let's make them 900 for contrast against 950
            content = content.replace(/bg-stone-800/g, 'bg-stone-900');
            
            // Borders
            content = content.replace(/border-stone-700/g, 'border-stone-800');

            // Replace in file
            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    });
}

traverse(dir);
console.log("Soothing contrast dark theme applied.");
