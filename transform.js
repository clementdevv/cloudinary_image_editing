const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dsupcj9xq',
  api_key: '678669133583699',
  api_secret: 'Itkfuu6VYAx9H0v4e3wrh7qwHSw',
});

const publicId = 'n6i2svetzszssqp8qjya';

const transformedUrl = cloudinary.url(publicId, {
  transformation: [
    // 1. Add text overlay at the top
    {
      overlay: {
        font_family: "Arial",
        font_size: 50,
        font_weight: "bold",
        text: "Hi%20Trusted%20Customer!"
      },
      gravity: "north",
      y: 20,
      color: "white"
    },
    // 2. Add PNG image overlay at bottom-right
    {
      overlay: "meat_discount_tag_xnuaw5", // your PNG logo
      width: 300,
      opacity: 100,
      gravity: "north_west", // bottom-right corner
      x: 20,
      y: 20
    }
  ],
  secure: true
});

console.log("Transformed Image URL:", transformedUrl);
