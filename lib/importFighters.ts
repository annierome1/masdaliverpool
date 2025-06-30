import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';

// ──────────────────────────────────────────────────────────────────────────────
// Load environment variables from .env at project root
// Ensure you have a .env file with:
//   SANITY_PROJECT_ID=<yourProjectId>
//   SANITY_DATASET=<yourDataset>
//   SANITY_TOKEN=<yourWriteToken>
// ──────────────────────────────────────────────────────────────────────────────
dotenv.config();

// ──────────────────────────────────────────────────────────────────────────────
// Polyfill __dirname for ES modules
// ──────────────────────────────────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// ──────────────────────────────────────────────────────────────────────────────
// Load fighters data from public/data/team.json
// ──────────────────────────────────────────────────────────────────────────────
const fightersPath = path.join(projectRoot, 'public', 'data', 'team.json');
if (!fs.existsSync(fightersPath)) {
  console.error(`JSON file not found at ${fightersPath}`);
  process.exit(1);
}
const fighters = JSON.parse(fs.readFileSync(fightersPath, 'utf-8'));

// ──────────────────────────────────────────────────────────────────────────────
// Validate environment variables for Sanity credentials
// ──────────────────────────────────────────────────────────────────────────────
const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;
const token = process.env.SANITY_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    'Missing required env vars: SANITY_PROJECT_ID, SANITY_DATASET, and SANITY_TOKEN.\n' +
    'Please create a .env file at project root with these values.'
  );
  process.exit(1);
}

// ──────────────────────────────────────────────────────────────────────────────
// Initialize Sanity client using named createClient
// ──────────────────────────────────────────────────────────────────────────────
const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-06-30', // use today's date
  token,
  useCdn: false,
});

async function importFighters() {
  for (const f of fighters) {
    console.log(`Importing: ${f.name}`);

    // Upload main profile image
    let imageRef = null;
    const imgPath = path.join(projectRoot, 'public', f.image);
    if (fs.existsSync(imgPath)) {
      const stream = fs.createReadStream(imgPath);
      const uploaded = await client.assets.upload('image', stream, {
        filename: path.basename(imgPath),
      });
      imageRef = {
        _type: 'image',
        asset: { _type: 'reference', _ref: uploaded._id },
      };
    }

    // Upload gallery images
    const gallery = [];
    for (const rel of f.gallery || []) {
      const galPath = path.join(projectRoot, 'public', rel);
      if (fs.existsSync(galPath)) {
        const stream = fs.createReadStream(galPath);
        const uploaded = await client.assets.upload('image', stream, {
          filename: path.basename(galPath),
        });
        gallery.push({
          _type: 'image',
          asset: { _type: 'reference', _ref: uploaded._id },
        });
      }
    }

    // Build Sanity document for fighter_card schema
    const doc = {
      _id: `fighter_card-${f.id}`,
      _type: 'fighter_card',
      id: f.id,
      name: f.name,
      role: f.role,
      stance: f.stance,
      style: f.style,
      age: f.age,
      totalFights: f.totalFights,
      weight: f.weight,
      record: f.record,
      accomplishments: f.accomplishments,
      bio: f.bio,
      social: f.social,
      ...(imageRef && { image: imageRef }),
      ...(gallery.length > 0 && { gallery }),
    };

    // Create or replace document in Sanity
    await client.createOrReplace(doc);
    console.log(`✅ Imported ${f.name}`);
  }
}

importFighters().catch((err) => {
  console.error(err);
  process.exit(1);
});
