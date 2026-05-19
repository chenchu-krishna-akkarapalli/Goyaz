const fs = require('fs');
const path = require('path');

function replaceExtensions(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            replaceExtensions(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const originalContent = content;
            
            // Replace image extensions
            content = content.replace(/\.png|\.jpg|\.jpeg|\.webp/g, '.avif');
            
            // Add loading="lazy" and decoding="async" to img tags if not present
            content = content.replace(/<img([^>]*)>/g, (match, p1) => {
                let newAttrs = p1;
                if (!newAttrs.includes('loading="lazy"')) {
                    newAttrs += ' loading="lazy"';
                }
                if (!newAttrs.includes('decoding="async"')) {
                    newAttrs += ' decoding="async"';
                }
                return `<img${newAttrs}>`;
            });
            
            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

replaceExtensions(path.join(__dirname, '..', 'app'));
console.log('Done replacing extensions and adding lazy loading attributes.');
