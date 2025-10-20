// Image optimization script - converts PNGs to WebP and compresses images
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'src', 'img');
const outputDir = path.join(__dirname, 'public', 'assets');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Image files to process
const images = [
    { input: 'kirakai.png', output: 'kirakai.webp', quality: 85 },
    { input: 'kirakaiEN.png', output: 'kirakaiEN.webp', quality: 85 },
    { input: 'logo_blanco.png', output: 'logo_blanco.webp', quality: 90 },
    { input: 'accesibilidad.jpeg', output: 'accesibilidad.webp', quality: 85 },
    { input: 'gestos.jpeg', output: 'gestos.webp', quality: 85 },
    { input: 'nerea1.jpg', output: 'nerea.jpg', quality: 85 },
    { input: 'sergio2.jpg', output: 'sergio.jpg', quality: 85 },
    { input: 'premio.jpg', output: 'premio.jpg', quality: 85 },
];

async function optimizeImages() {
    console.log('🖼️  Starting image optimization...\n');

    for (const img of images) {
        const inputPath = path.join(inputDir, img.input);
        const outputPath = path.join(outputDir, img.output);

        try {
            // Get original file size
            const stats = fs.statSync(inputPath);
            const originalSize = (stats.size / 1024).toFixed(2);

            // Process image
            if (img.output.endsWith('.webp')) {
                await sharp(inputPath)
                    .webp({ quality: img.quality })
                    .toFile(outputPath);
            } else {
                await sharp(inputPath)
                    .jpeg({ quality: img.quality, mozjpeg: true })
                    .toFile(outputPath);
            }

            // Get new file size
            const newStats = fs.statSync(outputPath);
            const newSize = (newStats.size / 1024).toFixed(2);
            const reduction = (((stats.size - newStats.size) / stats.size) * 100).toFixed(1);

            console.log(`✅ ${img.input} → ${img.output}`);
            console.log(`   ${originalSize} KB → ${newSize} KB (${reduction}% reduction)\n`);
        } catch (error) {
            console.error(`❌ Error processing ${img.input}:`, error.message);
        }
    }

    console.log('✨ Image optimization complete!');
}

optimizeImages().catch(console.error);
