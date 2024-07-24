import { faker, id_ID } from '@faker-js/faker';
import { query } from './connect.js';


// Function to drop the products table
async function removeProductsTable() {
  await query("DROP TABLE IF EXISTS products");
  console.log("Products table dropped");
  
  // Create the products table
  await createProductsTable();
}

// Function to create the products table
async function createProductsTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      category VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      amazon_link VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      image VARCHAR(255),
      shortDescription TEXT,
      description TEXT,
      price DECIMAL(10, 2),
      favorite BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;
  await query(sql);
  console.log('Products table created');
}

// Function to generate dummy data
function generateDummyData(numProducts) {
  const products = [];

  for (let i = 0; i < numProducts; i++) {
    const product = {
      category: faker.helpers.arrayElement([
        "trousers",
        "fashion",
        "pants",
        "shirts",
        "home decor",
        "electronics",
        "books",
        "toys",
        "beauty",
        "jewelry",
        "sports",
        "outdoor",
        "automotive",
        "kitchen",
        "furniture",
        "office supplies",
        "garden",
        "health",
        "pet supplies",
        "baby products",
        "grocery",
        "tools",
        "music",
        "movies",
        "video games",
        "software",
        "travel",
        "luggage",
        "clothing accessories",
        "footwear",
        "watches",
        "bags",
        "gifts",
        "stationery",
        "crafts",
        "art supplies",
        "fitness",
        "cycling",
        "photography",
        "mobile phones",
        "tablets",
        "computers",
        "home appliances",
        "lighting",
        "cleaning supplies",
        "safety equipment"
      ]),
      slug: faker.lorem.slug(),
      title: faker.commerce.productName(),
      image: faker.image.url(),
      shortDescription: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      price: faker.commerce.price(),
      favorite: faker.datatype.boolean(),
      amazon_link: `https://amazon.com/${id_ID}`
      // No need to include created_at and updated_at in dummy data
    };
    products.push(product);
  }

  return products;
}

// Function to insert dummy data
async function insertDummyData(numProducts) {
  const products = generateDummyData(numProducts);

  const sql = `
    INSERT INTO products (category, slug, title, image, shortDescription, description, price, favorite)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  for (const product of products) {
    await query(sql, [
      product.category,
      product.slug,
      product.title,
      product.image,
      product.shortDescription,
      product.description,
      product.price,
      product.favorite ? 1 : 0, // Convert boolean to integer for MySQL
    ]);
  }

  console.log(`Inserted ${numProducts} dummy products`);
}

// Run these functions to drop the existing table, create a new table, and insert dummy data
export async function setupDatabase() {
  await removeProductsTable();
  await insertDummyData(1000); // Insert 100 dummy products
}
