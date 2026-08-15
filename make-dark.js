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

            // Global Body background & text
            content = content.replace(/bg-\[#F8F9FA\]/g, 'bg-stone-950');
            content = content.replace(/text-stone-800/g, 'text-stone-200');
            content = content.replace(/text-stone-900/g, 'text-stone-100');
            
            // Cards / Containers
            content = content.replace(/bg-white/g, 'bg-stone-900');
            content = content.replace(/bg-stone-50/g, 'bg-stone-900');
            content = content.replace(/bg-stone-100/g, 'bg-stone-800');
            content = content.replace(/border-stone-200/g, 'border-stone-800');
            content = content.replace(/border-stone-100/g, 'border-stone-800');
            
            // Text muted
            content = content.replace(/text-stone-500/g, 'text-stone-400');
            content = content.replace(/text-stone-600/g, 'text-stone-300');
            content = content.replace(/text-stone-700/g, 'text-stone-200');

            // Replace in file
            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    });
}

traverse(dir);
console.log("Dark theme applied globally.");
