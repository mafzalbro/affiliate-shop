import { scrapeProducts, saveProductsToDatabase } from './scraper';

async function main() {
  try {
    const category = 'fashion'; // Replace with the category you want to scrape
    const products = await scrapeProducts(category);
    await saveProductsToDatabase(products);
    console.log('Products saved to database.');
  } catch (error) {
    console.error('Error during scraping:', error.message);
  }
}

main();
