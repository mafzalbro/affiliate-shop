import fs from 'fs';
import path from 'path';
import { parse } from 'json2csv';
import ProductsScraper from '@scrapingant/amazon-proxy-scraper';

const API_KEY = '301fe01d2f454833a5092d103cba305c';

const saveProductsToFiles = async (products, category, pageNum) => {
    const folderPath = path.join(process.cwd(), 'products', category);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    const jsonFilePath = path.join(folderPath, `page_${pageNum}.json`);
    const csvFilePath = path.join(folderPath, `page_${pageNum}.csv`);

    fs.writeFileSync(jsonFilePath, JSON.stringify(products, null, 2));

    try {
        const csv = parse(products);
        fs.writeFileSync(csvFilePath, csv);
        console.log(`Products saved to ${csvFilePath} and ${jsonFilePath}`);
    } catch (error) {
        console.error('Failed to save products to CSV:', error.message);
    }
};

const scrapeProducts = async (keyword, category, pageNum) => {
    try {
        const scraper = new ProductsScraper({
            apiKey: API_KEY,
            keyword,
            number: 50, // Adjust as needed
            fileType: 'csv', // Adjust file type if needed
        });

        const result = await scraper.startScraping();

        const products = result.map(item => ({
          category,
          slug: item['amazon-id'] || '', // Use 'amazon-id' if available, fallback to empty string
          amazon_link: item.url || '', // Use 'url' if available, fallback to empty string
          title: item.title || '', // Ensure 'title' is available
          image: item['high-res-image'] || '', // Ensure 'high-res-image' is available
          shortDescription: item['short-description'] || '', // Ensure 'short-description' is available
          description: item['full-description'] || '', // Ensure 'full-description' is available
          price: parseFloat(item.price) || null, // Ensure 'price' is available
          favorite: false,

        }));

        await saveProductsToFiles(products, category, pageNum);
        console.log(`Scraped and saved ${products.length} products for category: ${category}, page: ${pageNum}`);
    } catch (error) {
        console.error(`Failed to scrape products for category: ${category}, page: ${pageNum}`, error.message);
    }
};

const runScraperForCategories = async (categories) => {
    for (const category of categories) {
        for (let pageNum = 1; pageNum <= 5; pageNum++) { // Adjust number of pages as needed
            await scrapeProducts(category, category, pageNum);
        }
    }
};

const categories = [
    'electronics',
    'furniture',
    'beauty',
    'books',
    'sports',
    'home decor',
    'kitchen',
    'garden',
    'jewelry',
    'baby products',
    'pants',
    'pet supplies',
    'shirts',
    'automotive',
    'toys',
    'office supplies',
    'fashion'
];

(async () => {
    try {
        await runScraperForCategories(categories);
    } catch (error) {
        console.error('Error during scraping:', error.message);
    }
})();
