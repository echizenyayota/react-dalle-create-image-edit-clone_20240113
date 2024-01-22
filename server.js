const PORT = 8000;

require("dotenv").config();

const OpenAI = require("openai");
const express = require("express");

const cors = require("cors");
const app = express();

app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY 
});

app.use(express.json());

const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage }).single('file');
let filePath;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Testing whether the API works",
  }); 
});

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    filePath = req.file.path;
    res.status(200).json({ filePath: req.file.path });
  });
});

app.post("/editImage", async(req, res) => {
  try {
    const image = await openai.images.edit({
      image: fs.createReadStream(filePath),
      prompt: req.body.message, 
    });
    res.status(200).json(image);
  } catch(error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log("Your server is running on PORT " + PORT));  