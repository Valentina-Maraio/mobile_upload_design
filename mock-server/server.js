const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

const app = express();
app.use(cors());
const upload = multer();

// POST
app.post('/sign-pdf', upload.single('pdf'), async (req, res) => {
    if (!req.file) {
        console.log("No file received");
        return res.status(400).send("No file received");
    }

    try {
        const pdfDoc = await PDFDocument.load(req.file.buffer);
        const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const pages = pdfDoc.getPages();

        pages.forEach((page) => {
            const { width, height } = page.getSize();
            const fontSize = 12;
            const text = "Signed by Mock Server";

            page.drawText(text, {
                x: width - font.widthOfTextAtSize(text, fontSize) - 20,
                y: 20,
                size: fontSize,
                font,
                color: rgb(0.8, 0, 0),
                opacity: 0.5
            });
        });

        const signedPdfBytes = await pdfDoc.save();

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename="signed-copy.pdf" '
        });

        res.send(Buffer.from(signedPdfBytes));;
    } catch (err) {
        console.error('PDF processing error: ', err);
        res.status(500).send('Failed to sign the PDF')
    }
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Mock signing server running on http://localhost:${PORT}`)
})