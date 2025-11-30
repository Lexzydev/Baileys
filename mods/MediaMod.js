const Jimp = require('jimp');
const ffmpeg = require('fluent-ffmpeg');
const { LexzyLogger } = require('../utils/logger');

class MediaMod {
    constructor(sock) {
        this.sock = sock;
    }

    /**
     * 🔥 Add text to image
     */
    async addTextToImage(imageBuffer, text) {
        try {
            const image = await Jimp.read(imageBuffer);
            const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
            
            image.print(font, 10, 10, text);
            
            const processedBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
            return {
                success: true,
                data: processedBuffer
            };
        } catch (error) {
            LexzyLogger.error('Image processing failed:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 🔥 Convert image to grayscale
     */
    async grayscaleImage(imageBuffer) {
        try {
            const image = await Jimp.read(imageBuffer);
            image.grayscale();
            
            const processedBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
            return {
                success: true,
                data: processedBuffer
            };
        } catch (error) {
            LexzyLogger.error('Grayscale conversion failed:', error);
            return { success: false, error: error.message };
        }
    }
}

module.exports = { MediaMod };