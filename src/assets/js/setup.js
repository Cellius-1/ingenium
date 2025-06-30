// This script sets up the public directory structure
const fs = require('fs');
const path = require('path');

// Define source and public directories
const srcDir = path.join(__dirname, '..', '..');
const publicDir = path.join(__dirname, '..', '..', '..', 'public');

// Create public directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
    console.log('Created public directory');
}

// Copy files to public
function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied ${srcPath} to ${destPath}`);
        }
    }
}

// Copy pages to public root
const pagesDir = path.join(srcDir, 'pages');
const entries = fs.readdirSync(pagesDir, { withFileTypes: true });

for (let entry of entries) {
    if (!entry.isDirectory() && entry.name.endsWith('.html')) {
        const srcPath = path.join(pagesDir, entry.name);
        const destPath = path.join(publicDir, entry.name);
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${srcPath} to ${destPath}`);
    }
}

// Copy assets and components
copyDir(path.join(srcDir, 'assets'), path.join(publicDir, 'assets'));
copyDir(path.join(srcDir, 'components'), path.join(publicDir, 'components'));

console.log('Setup complete!');
