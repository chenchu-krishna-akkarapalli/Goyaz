const fs = require('fs');
const path = require('path');

function fixImgTags(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            fixImgTags(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const originalContent = content;
            
            // Fix the syntax error: `/ loading="lazy" decoding="async">` -> ` loading="lazy" decoding="async" />`
            content = content.replace(/\/ loading="lazy" decoding="async">/g, ' loading="lazy" decoding="async" />');
            
            // Also some might be just `/ loading="lazy">` if they already had decoding
            content = content.replace(/\/ loading="lazy">/g, ' loading="lazy" />');
            
            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Fixed ${fullPath}`);
            }
        }
    }
}

fixImgTags(path.join(__dirname, '..', 'app'));
console.log('Done fixing img tags.');
