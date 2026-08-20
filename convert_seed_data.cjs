const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'resources', 'js', 'data', 'initialData.ts');
const outputPath = path.join(__dirname, 'database', 'seeders', 'content.json');

let src = fs.readFileSync(inputPath, 'utf8');

// Remove all import blocks (single or multi-line)
src = src.replace(/^import\s+[\s\S]*?;\s*$/gm, '');

// Remove export keyword and any inline TypeScript type annotations
src = src.replace(/^export\s+const\s+(\w+)(?::\s*[^=]+)?\s*=/gm, 'const $1 =');

// Add module.exports at the end
src += `\nmodule.exports = {\n  initialSiteSettings,\n  initialDirectorates,\n  initialSectors,\n  initialNews,\n  initialEvents,\n  initialPublications,\n  initialGalleryItems,\n  initialFaqs,\n};\n`;

const tempPath = path.join(__dirname, 'database', 'seeders', 'content.tmp.cjs');
fs.writeFileSync(tempPath, src);

try {
  const data = require(tempPath);
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log('Generated database/seeders/content.json');
} finally {
  fs.unlinkSync(tempPath);
}
