import axios from 'axios';
import cheerio from 'cheerio';
import { query } from './connect';

async function scrapeProductDetails(productUrl) {
  try {
    const { data } = await axios.get(`https://www.amazon.com${productUrl}`);
    const $ = cheerio.load(data);

    const title = $('#productTitle').text().trim();
    const image = $('#imgTagWrapperId img').attr('src');
    const description = $('#productDescription').text().trim();
    
    return { title, image, description };
  } catch (error) {
    console.error('Failed to scrape product details:', error.message);
    return null;
  }
}

export async function scrapeProducts(category) {
  const url = `https://www.amazon.com/s?k=${category}`;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const products = [];

  $('.s-main-slot .s-result-item').each(async (index, element) => {
    const title = $(element).find('h2 a span').text();
    const image = $(element).find('.s-image').attr('src');
    const shortDescription = $(element).find('.a-text-normal').text();
    const link = $(element).find('a').attr('href');
    const views = Math.floor(Math.random() * 1000);

    if (link) {
      const productDetails = await scrapeProductDetails(link);
      if (productDetails) {
        products.push({
          category,
          slug: link.split('/').pop(),
          title: productDetails.title || title,
          image: productDetails.image || image,
          shortDescription: productDetails.description || shortDescription,
          description: productDetails.description,
          views
        });
      }
    }
  });

  return products;
}

export async function saveProductsToDatabase(products) {
  const sql = `
    INSERT INTO products (category, slug, title, image, shortDescription, description, views)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE 
      title = VALUES(title),
      image = VALUES(image),
      shortDescription = VALUES(shortDescription),
      description = VALUES(description),
      views = VALUES(views)
  `;

  for (const product of products) {
    await query(sql, [
      product.category,
      product.slug,
      product.title,
      product.image,
      product.shortDescription,
      product.description,
      product.views,
    ]);
  }
  console.log('Products saved to database');
}
