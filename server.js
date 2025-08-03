const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect('mongodb://mongo:27017/research_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Reference Schema
const referenceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    authors: { type: String, required: true },
    journal: { type: String, required: true },
    year: { type: Number, required: true },
    volume: String,
    issue: String,
    pages: String,
    doi: String,
    pdfUrl: { type: String, required: true },
    pdfFile: String
}, { timestamps: true });

const Reference = mongoose.model('Reference', referenceSchema);

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/myresearch', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'myresearch.html'));
});

app.get('/reference', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'reference.html'));
});

// API Routes for References
app.get('/api/references', async (req, res) => {
    try {
        const references = await Reference.find().sort({ createdAt: -1 });
        res.json(references);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/references', upload.single('pdfFile'), async (req, res) => {
    try {
        const referenceData = {
            title: req.body.title,
            authors: req.body.authors,
            journal: req.body.journal,
            year: parseInt(req.body.year),
            volume: req.body.volume,
            issue: req.body.issue,
            pages: req.body.pages,
            doi: req.body.doi,
            pdfUrl: req.body.pdfUrl,
            pdfFile: req.file ? req.file.filename : null
        };

        const reference = new Reference(referenceData);
        await reference.save();
        res.status(201).json(reference);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/api/references/:id', upload.single('pdfFile'), async (req, res) => {
    try {
        const updateData = {
            title: req.body.title,
            authors: req.body.authors,
            journal: req.body.journal,
            year: parseInt(req.body.year),
            volume: req.body.volume,
            issue: req.body.issue,
            pages: req.body.pages,
            doi: req.body.doi,
            pdfUrl: req.body.pdfUrl
        };

        if (req.file) {
            updateData.pdfFile = req.file.filename;
        }

        const reference = await Reference.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );
        res.json(reference);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/references/:id', async (req, res) => {
    try {
        await Reference.findByIdAndDelete(req.params.id);
        res.json({ message: 'Reference deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 