/**
 * One-time script to apply CORS configuration to Firebase Storage.
 * This uses the googleapis npm package already available.
 * Run: node scripts/apply-cors.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Your Firebase Storage bucket name
const BUCKET = 'songaplayer-8287c.firebasestorage.app';

// Load CORS config
const corsConfig = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../client/firebase-cors.json'), 'utf8')
);

console.log('CORS config to apply:', JSON.stringify(corsConfig, null, 2));
console.log('\n⚠️  To apply this CORS config, run ONE of these methods:\n');
console.log('Method 1 - Google Cloud Console (No install required):');
console.log('  1. Go to: https://console.cloud.google.com/storage/browser/' + BUCKET);
console.log('  2. Click the bucket → Permissions → CORS → Edit');
console.log('  3. Paste the contents of client/firebase-cors.json\n');
console.log('Method 2 - gcloud CLI (if installed):');
console.log('  gcloud storage buckets update gs://' + BUCKET + ' --cors-file=client/firebase-cors.json\n');
console.log('Method 3 - Install Google Cloud SDK:');
console.log('  https://cloud.google.com/sdk/docs/install\n');
console.log('Current CORS origins configured:', corsConfig[0].origin);
