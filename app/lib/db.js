import { query } from '@/app/lib/connect'
import { notFound } from 'next/navigation';
// import { setupDatabase } from "@/app/lib/products"

// setupDatabase().catch(console.error);


// Fetch categories
export async function fetchCategories() {
  const sql = 'SELECT DISTINCT category FROM products';
  const rows = await query(sql);
  return rows.map((row) => row.category);
}

// Fetch products based on category, filters, page, and search query
export async function fetchProducts({ category = '', filters = [], page = 1, search = '' } = {}) {
  const limit = 10;
  const offset = (page - 1) * limit;

  // Base SQL query
  let sql = 'SELECT * FROM products WHERE 1=1';
  const params = [];

  // Initialize searchTerm for later use
  let searchTerm = '';

  // Add category filter if provided
  if (category) {
    sql += ' AND category = ?';
    params.push(category);
  }

  // Add filters if provided
  if (filters.length > 0) {
    sql += ' AND (' + filters.map((_, index) => `filter_column_${index + 1} = ?`).join(' OR ') + ')';
    params.push(...filters);
  }

  // Add search query if provided
  if (search) {
    searchTerm = `%${search}%`;
    sql += ' AND (title LIKE ? OR shortDescription LIKE ? OR description LIKE ?)';
    params.push(searchTerm, searchTerm, searchTerm);
  }

  // Calculate total count for pagination
  const countSql = 'SELECT COUNT(*) AS total FROM products WHERE 1=1' +
    (category ? ' AND category = ?' : '') +
    (filters.length > 0 ? ' AND (' + filters.map((_, index) => `filter_column_${index + 1} = ?`).join(' OR ') + ')' : '') +
    (search ? ' AND (title LIKE ? OR shortDescription LIKE ? OR description LIKE ?)' : '');

  const countParams = [
    ...(category ? [category] : []),
    ...filters,
    ...(search ? [searchTerm, searchTerm, searchTerm] : []),
  ];

  const [{ total }] = await query(countSql, countParams);
  const totalPages = Math.ceil(total / limit);

  // Fetch the products for the current page
  sql += ' LIMIT ? OFFSET ?';
  params.push(limit, offset);

  const rows = await query(sql, params);

  return { products: rows, totalPages };
}

// Fetch product details based on slug
export async function fetchProductDetails(slug) {
  const sql = 'SELECT * FROM products WHERE slug = ?';
  const rows = await query(sql, [slug]);
  return rows[0];
}

// Fetch random 5 products from the top 50 most recently added products
export async function fetchNewProducts() {
  // Step 1: Fetch the top 50 most recently added products
  const sql = 'SELECT * FROM products ORDER BY created_at DESC LIMIT 50';
  const rows = await query(sql);

  // Step 2: Randomly select 5 products from the top 50
  const shuffled = rows.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 5);

  return selected;
}


// Fetch related products based on category
export async function fetchRelatedProducts(slug) {
  // First, get the details of the product with the given slug
  const productDetails = await fetchProductDetails(slug);

  if (!productDetails) {
    throw new Error(`Product with slug ${slug} not found`);
  }

  // Fetch products that belong to the same category, excluding the current product
  const sql = 'SELECT * FROM products WHERE category = ? AND slug != ? LIMIT 5';
  const rows = await query(sql, [productDetails.category, slug]);

  return rows;
}
