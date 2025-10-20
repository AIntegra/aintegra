// Image optimization script - converts PNGs to WebP and compresses images
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, 'src', 'img');
const outputDir = path.join(__dirname, 'public', 'assets');
const teamDir = path.join(__dirname, 'public', 'team');

// Create output directories if they don't exist
[outputDir, teamDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Image files to process
const images = [
    { input: 'kirakai.png', output: 'kirakai.webp', dir: outputDir, quality: 85 },
    { input: 'kirakaiEN.png', output: 'kirakaiEN.webp', dir: outputDir, quality: 85 },
    { input: 'logo_blanco.png', output: 'logo_blanco.webp', dir: outputDir, quality: 90 },
    { input: 'accesibilidad.jpeg', output: 'accesibilidad.webp', dir: outputDir, quality: 85 },
    { input: 'gestos.jpeg', output: 'gestos.webp', dir: outputDir, quality: 85 },
    { input: 'nerea1.jpg', output: 'nerea.jpg', dir: teamDir, quality: 85 },
    { input: 'sergio2.jpg', output: 'sergio.jpg', dir: teamDir, quality: 85 },
    { input: 'premio.jpg', output: 'premio.jpg', dir: outputDir, quality: 85 },
];

async function optimizeImages() {
    console.log('🖼️  Starting image optimization...\n');

    for (const img of images) {
        const inputPath = path.join(inputDir, img.input);
        const outputPath = path.join(img.dir, img.output);

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
