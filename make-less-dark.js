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

            // Make it less dark
            content = content.replace(/bg-stone-950/g, 'bg-stone-900');
            content = content.replace(/bg-stone-900/g, 'bg-stone-800');
            content = content.replace(/border-stone-800/g, 'border-stone-700');
            
            // Text muted
            content = content.replace(/text-stone-300/g, 'text-stone-200');
            content = content.replace(/text-stone-400/g, 'text-stone-300');

            // Replace in file
            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    });
}

traverse(dir);
console.log("Less dark theme applied globally.");
