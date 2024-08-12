import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'json2csv';
import { query } from '../connect.js';

// Helper to get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to scrape product details with proxy support
async function scrapeProductDetails(page, productUrl, retries = 3) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
      await page.setUserAgent(userAgent);
      await page.goto(`https://www.amazon.com${productUrl}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
      const content = await page.content();
      const $ = cheerio.load(content);

      const title = $('#productTitle').text().trim();
      const image = $('#imgTagWrapperId img').attr('src');
      const description = $('#productDescription').text().trim();
      const price = $('#priceblock_ourprice, #priceblock_dealprice').text().trim().replace('$', '');

      return { title, image, description, price };
    } catch (error) {
      console.error(`Failed to scrape product details (attempt ${attempt + 1}):`, error.message);
      if (attempt === retries - 1) throw error;
      await page.waitForTimeout(5000); // Wait before retrying
    }
  }
}

// Function to save products to CSV and JSON files
async function saveProductsToFiles(products, category, pageNum) {
  const folderPath = path.join(__dirname, 'products', category);
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
}

// Function to scrape all products from a category
export async function scrapeProducts(category) {
  const url = `https://www.amazon.com/s?k=${encodeURIComponent(category)}`;
  const browser = await puppeteer.launch({ 
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process'
    ]
  });
  const page = await browser.newPage();
  const products = [];
  let pageNum = 1;

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

    let hasNextPage = true;
    while (hasNextPage) {
      const content = await page.content();
      const $ = cheerio.load(content);

      const productPromises = $('.s-main-slot .s-result-item').map(async (index, element) => {
        const title = $(element).find('h2 a span').text().trim();
        const image = $(element).find('.s-image').attr('src');
        const shortDescription = $(element).find('.a-text-normal').text().trim();
        const link = $(element).find('a').attr('href');
        const amazonLink = `https://www.amazon.com${link}`;
        const views = Math.floor(Math.random() * 1000);

        if (link) {
          const productDetails = await scrapeProductDetails(page, link);
          if (productDetails) {
            return {
              category,
              slug: link.split('/').pop(),
              amazon_link: amazonLink,
              title: productDetails.title || title,
              image: productDetails.image || image,
              shortDescription: productDetails.description || shortDescription,
              description: productDetails.description,
              price: parseFloat(productDetails.price) || null,
              favorite: false,
              views
            };
          }
        }
        return null;
      }).get();

      const results = (await Promise.all(productPromises)).filter(product => product !== null);
      products.push(...results);

      await saveProductsToFiles(results, category, pageNum);

      const nextPage = $('li.a-last a');
      if (nextPage.length > 0) {
        await page.waitForTimeout(2000); // Delay to avoid being blocked
        await nextPage.click();
        await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 60000 });
        pageNum++;
      } else {
        hasNextPage = false;
      }
    }
  } catch (error) {
    console.error('Failed to scrape products:', error.message);
  } finally {
    await browser.close();
  }

  return products;
}

// Function to insert products into the database
export async function insertProductsIntoDatabase(products) {
  const sql = `
    INSERT INTO products (category, slug, amazon_link, title, image, shortDescription, description, price, favorite)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE 
      title = VALUES(title),
      image = VALUES(image),
      shortDescription = VALUES(shortDescription),
      description = VALUES(description),
      price = VALUES(price),
      favorite = VALUES(favorite)
  `;

  for (const product of products) {
    try {
      await query(sql, [
        product.category,
        product.slug,
        product.amazon_link,
        product.title,
        product.image,
        product.shortDescription,
        product.description,
        product.price,
        product.favorite,
      ]);
    } catch (error) {
      console.error('Failed to save product to database:', error.message);
    }
  }
  console.log('Products saved to database');
}

// Function to run scraper for multiple categories
export async function runScraperForCategories(categories) {
  for (const category of categories) {
    console.log(`Starting scraping for category: ${category}`);
    const products = await scrapeProducts(category);
    // await insertProductsIntoDatabase(products);
  }
}

// Example usage
// const categories = [
//   'electronics',
//   'furniture',
//   'beauty',
//   'books',
//   'sports',
//   'trousers',
//   'home decor',
//   'kitchen',
//   'garden',
//   'jewelry',
//   'baby products',
//   'pants',
//   'pet supplies',
//   'shirts',
//   'automotive',
//   'toys',
//   'office supplies',
//   'fashion'
// ];

// runScraperForCategories(categories);
