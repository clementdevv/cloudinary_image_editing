// server.js
require('dotenv').config(); 
const express = require('express');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5523;

app.use(cors()); // Optional: Enable CORS for external apps like n8n or frontend
app.use(express.json());

// ✅ Load Cloudinary credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.post('/generate-image', (req, res) => {
  const {
    baseImagePublicId,
    headlineText,
    overlayImagePublicId,
    overlayWidth = 300,
    overlayOpacity = 90
  } = req.body;

  const transformations = [];

  // 1. Headline text overlay
  if (headlineText) {
    transformations.push({
      overlay: {
        font_family: "Arial",
        font_size: 60,
        font_weight: "bold",
        text: encodeURIComponent(headlineText)
      },
      gravity: "north",
      y: 40,
      color: "white"
    });
  }

  // 2. PNG logo overlay
  if (overlayImagePublicId) {
    transformations.push({
      overlay: overlayImagePublicId,
      width: overlayWidth,
      opacity: overlayOpacity,
      gravity: "south_east",
      x: 30,
      y: 30
    });
  }

  const transformedImageUrl = cloudinary.url(baseImagePublicId, {
    transformation: transformations,
    secure: true
  });

  res.json({ imageUrl: transformedImageUrl });
});

// ✅ Listen on all interfaces for Railway or localhost
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🔥 Image service running at http://0.0.0.0:${PORT}`);
});