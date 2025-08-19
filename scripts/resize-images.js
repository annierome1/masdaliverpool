const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const inputDir = './public/coaches/';
const outputDir = './public/coaches/optimized/';
const sizes = {
  desktop: { width: 800, height: 1200 },
  mobile: { width: 600, height: 900 },
  thumbnail: { width: 400, height: 600 }
};

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all image files from input directory
const imageFiles = fs.readdirSync(inputDir).filter(file => {
  const ext = path.extname(file).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
});

console.log(`Found ${imageFiles.length} images to process:`);
imageFiles.forEach(file => console.log(`- ${file}`));

// Process each image
async function processImages() {
  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const baseName = path.parse(file).name;
    
    console.log(`\nProcessing: ${file}`);
    
    try {
      // Create desktop version
      await sharp(inputPath)
        .resize(sizes.desktop.width, sizes.desktop.height, {
          fit: 'cover',
          position: 'top'
        })
        .jpeg({ quality: 85, progressive: true })
        .toFile(path.join(outputDir, `${baseName}_desktop.jpg`));
      
      console.log(`✓ Created desktop version (${sizes.desktop.width}x${sizes.desktop.height})`);
      
      // Create mobile version
      await sharp(inputPath)
        .resize(sizes.mobile.width, sizes.mobile.height, {
          fit: 'cover',
          position: 'top'
        })
        .jpeg({ quality: 85, progressive: true })
        .toFile(path.join(outputDir, `${baseName}_mobile.jpg`));
      
      console.log(`✓ Created mobile version (${sizes.mobile.width}x${sizes.mobile.height})`);
      
      // Create thumbnail version
      await sharp(inputPath)
        .resize(sizes.thumbnail.width, sizes.thumbnail.height, {
          fit: 'cover',
          position: 'top'
        })
        .jpeg({ quality: 80, progressive: true })
        .toFile(path.join(outputDir, `${baseName}_thumb.jpg`));
      
      console.log(`✓ Created thumbnail version (${sizes.thumbnail.width}x${sizes.thumbnail.height})`);
      
      // Create WebP version for modern browsers
      await sharp(inputPath)
        .resize(sizes.desktop.width, sizes.desktop.height, {
          fit: 'cover',
          position: 'top'
        })
        .webp({ quality: 85 })
        .toFile(path.join(outputDir, `${baseName}_desktop.webp`));
      
      console.log(`✓ Created WebP version`);
      
    } catch (error) {
      console.error(`✗ Error processing ${file}:`, error.message);
    }
  }
  
  console.log('\n🎉 Image processing complete!');
  console.log(`\nOptimized images saved to: ${outputDir}`);
  console.log('\nFile sizes should be reduced from ~20-30MB to ~200-500KB each.');
  console.log('\nNext steps:');
  console.log('1. Replace your original images with the optimized versions');
  console.log('2. Update your image paths in the coaches.js file');
  console.log('3. Test page load speed improvement');
}

// Run the script
processImages().catch(console.error);
