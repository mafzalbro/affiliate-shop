import fs from 'fs';
import path from 'path';
import { query } from '../connect.js';
import slugify from 'slugify'; // Import slugify library

// Function to drop the products table
async function removeProductsTable() {
  await query("DROP TABLE IF EXISTS products");
  console.log("Products table dropped");
}

// Function to create the products table if it doesn't exist
async function createProductsTable() {
  const createTableSql = `
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      category VARCHAR(255),
      slug VARCHAR(255) UNIQUE,
      amazon_link TEXT,
      title TEXT,
      image TEXT,
      shortDescription TEXT,
      description TEXT,
      price DECIMAL(10, 2),
      favorite BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;
  await query(createTableSql);
  console.log("Products table created");
}

// Function to generate a slug from a title
const generateSlug = (title) => {
  return slugify(title, {
    lower: true,
    strict: true, // Remove any non-ASCII characters
  });
};

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
    // Generate slug from title
    product.slug = generateSlug(product.title);

    console.log("Title: ", product.title);
    
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

// Function to read products from JSON file and insert into database
export const importProductsFromJSON = async () => {
  const jsonFilePath = path.join(process.cwd(), 'products/garden', 'all_products.json');
  
  if (!fs.existsSync(jsonFilePath)) {
    console.error('JSON file does not exist:', jsonFilePath);
    return;
  }

  try {
    const fileContent = fs.readFileSync(jsonFilePath, 'utf8');
    const products = JSON.parse(fileContent);
    
    console.log(`Read ${products.length} products from JSON file.`);
    await insertProductsIntoDatabase(products);
  } catch (error) {
    console.error('Error reading JSON file or inserting into database:', error.message);
  }
};

// Run this function separately when needed
(async () => {
  try {
    // Uncomment the following line if you need to drop the table
    // await removeProductsTable();

    // Ensure the table is created
    // await createProductsTable();
    
    // Import products from JSON file
    await importProductsFromJSON();
  } catch (error) {
    console.error('Error during import:', error.message);
  }
})();
