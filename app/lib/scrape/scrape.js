import { scrapeProducts, insertProductsIntoDatabase } from './scraper.js';

async function main() {
  try {
    const categories = [
      'electronics',
      'furniture',
      'beauty',
      'books',
      'sports',
      'trousers',
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

    for (const category of categories) {
      console.log(`Starting scraping for category: ${category}`);
      const products = await scrapeProducts(category);
      await insertProductsIntoDatabase(products);
      console.log(`Products for category ${category} saved to database.`);
    }

  } catch (error) {
    console.error('Error during scraping:', error.message);
  }
}

main();
