const axios = require('axios');
const cheerio = require('cheerio');
const { googleIt } = require('google-it');
const { LexzyLogger } = require('../utils/logger');

class WebToolsMod {
    constructor(sock) {
        this.sock = sock;
    }

    /**
     * 🔥 Google Search
     */
    async googleSearch(query) {
        try {
            const results = await googleIt({ query });
            return {
                success: true,
                data: results
            };
        } catch (error) {
            LexzyLogger.error('Google search failed:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 🔥 Web Scraping
     */
    async scrapeWebsite(url) {
        try {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);
            
            const title = $('title').text();
            const description = $('meta[name="description"]').attr('content');
            
            return {
                success: true,
                data: {
                    title,
                    description,
                    url
                }
            };
        } catch (error) {
            LexzyLogger.error('Web scraping failed:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 🔥 Get Trending News
     */
    async getNews(category = 'technology') {
        try {
            // Example news API
            const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=YOUR_API_KEY`);
            return {
                success: true,
                data: response.data.articles
            };
        } catch (error) {
            LexzyLogger.error('News fetch failed:', error);
            return { success: false, error: error.message };
        }
    }
}

module.exports = { WebToolsMod };