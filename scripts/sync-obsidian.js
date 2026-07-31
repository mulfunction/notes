import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- 1. Load .env manually to be safe across all node versions ---
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      process.env[match[1]] = match[2] || '';
    }
  });
}

// --- 2. Determine Obsidian Media Path (Cross-Platform) ---
let sourceDir = process.env.OBSIDIAN_MEDIA_PATH;

if (!sourceDir) {
  // OS-based fallback if not explicitly set in .env
  const isWindows = os.platform() === 'win32';
  sourceDir = isWindows 
    ? "C:/Users/ASUSC/Documents/Obsidian/Muldan-Second-Brain/media"
    : "/home/muldan/Obsidian/Muldan-Second-Brain/media";
}

const destDir = path.join(__dirname, '..', 'public', 'images');

if (!fs.existsSync(sourceDir)) {
  console.warn(`[Sync] Warning: Source directory not found: ${sourceDir}`);
  console.warn(`[Sync] If you move your vault, update OBSIDIAN_MEDIA_PATH in .env`);
  process.exit(0); // Exit gracefully so builds don't fail
}

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// --- 3. Cloud Upload Logic (Stub) ---
async function uploadToCloudStorage(filePath, fileName) {
  if (!process.env.CLOUD_BUCKET_URL || !process.env.CLOUD_API_KEY) {
    return; // Skip cloud upload if not fully configured
  }
  
  // TODO: Implement your preferred Cloud Provider SDK here (e.g. AWS S3 / Cloudflare R2 / Cloudinary)
  // Example for S3/R2:
  // const fileStream = fs.createReadStream(filePath);
  // await s3Client.send(new PutObjectCommand({
  //   Bucket: process.env.CLOUD_BUCKET_NAME,
  //   Key: `images/${fileName}`,
  //   Body: fileStream,
  // }));
  // console.log(`[Cloud] Uploaded ${fileName}`);
}

console.log(`[Sync] Processing media from ${sourceDir}...`);

try {
  const files = fs.readdirSync(sourceDir);
  let count = 0;
  
  for (const file of files) {
    const srcPath = path.join(sourceDir, file);
    const destPath = path.join(destDir, file);
    
    if (fs.statSync(srcPath).isFile()) {
      // Keep a local copy for development/preview
      fs.copyFileSync(srcPath, destPath);
      
      // Async trigger cloud upload
      uploadToCloudStorage(srcPath, file).catch(err => console.error(`[Cloud] Failed to upload ${file}:`, err));
      
      count++;
    }
  }
  console.log(`[Sync] Successfully synced ${count} media files!`);
} catch (err) {
  console.error(`[Sync] Error processing files:`, err);
}
