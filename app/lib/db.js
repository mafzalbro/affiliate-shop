import { query } from '@/app/lib/connect';
// import { notFound } from 'next/navigation';
// import { setupDatabase } from "@/app/lib/products"

// setupDatabase().catch(console.error);

// Fetch categories
export async function fetchCategories() {
  try {
    const sql = 'SELECT DISTINCT category FROM products';
    const rows = await query(sql);
    return rows.map((row) => row.category);
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories. Please try again later.');
  }
}

// Fetch products based on category, filters, page, and search query
export async function fetchProducts({ category = '', filters = [], page = 1, search = '', limit = 10 } = {}) {
  try {
    const offset = (page - 1) * limit;

    let sql = 'SELECT * FROM products WHERE 1=1';
    const params = [];
    let searchTerm = '';

    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }

    if (filters.length > 0) {
      sql += ' AND (' + filters.map((_, index) => `filter_column_${index + 1} = ?`).join(' OR ') + ')';
      params.push(...filters);
    }

    if (search) {
      searchTerm = `%${search}%`;
      sql += ' AND (title LIKE ? OR shortDescription LIKE ? OR description LIKE ?)';
      params.push(searchTerm, searchTerm, searchTerm);
    }

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

    sql += ' ORDER BY RAND() LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const rows = await query(sql, params);

    return { products: rows, totalPages };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products. Please try again later.');
  }
}


export async function loadMoreProducts({ page, filters, search }) {
  try {
    const { products, totalPages } = await fetchProducts({
      filters,
      search,
      page
    });
    return { products, totalPages };
  } catch (error) {
    console.error('Error loading more products:', error);
    throw new Error('Failed to load more products. Please try again later.');
  }
}


// Fetch product details based on slug
export async function fetchProductDetails(slug) {
  try {
    const sql = 'SELECT * FROM products WHERE slug = ?';
    const rows = await query(sql, [slug]);
    return rows[0];
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw new Error('Failed to fetch product details. Please try again later.');
  }
}

// Fetch random 5 products from the top 50 most recently added products
export async function fetchNewProducts() {
  try {
    const sql = 'SELECT * FROM products ORDER BY created_at DESC LIMIT 50';
    const rows = await query(sql);

    const selectedSql = 'SELECT * FROM (' + sql + ') AS top50 ORDER BY RAND() LIMIT 5';
    const selected = await query(selectedSql);

    return selected;
  } catch (error) {
    console.error('Error fetching new products:', error);
    throw new Error('Failed to fetch new products. Please try again later.');
  }
}

// Fetch related products based on category
export async function fetchRelatedProducts(slug) {
  try {
    const productDetails = await fetchProductDetails(slug);

    if (!productDetails) {
      throw new Error(`Product with slug ${slug} not found`);
    }

    const { title, description, category } = productDetails;
    const titlePattern = `%${title}%`;
    const descriptionPattern = `%${description}%`;

    const sql = `
      SELECT * 
      FROM products 
      WHERE category = ? 
        AND slug != ? 
        AND (title LIKE ? OR description LIKE ?) 
      ORDER BY RAND() 
      LIMIT 5
    `;
    let rows = await query(sql, [category, slug, titlePattern, descriptionPattern]);

    if (rows.length === 0) {
      const fallbackSql = 'SELECT * FROM products WHERE category = ? AND slug != ? ORDER BY RAND() LIMIT 5';
      rows = await query(fallbackSql, [category, slug]);
    }

    return rows;
  } catch (error) {
    console.error('Error fetching related products:', error);
    throw new Error('Failed to fetch related products. Please try again later.');
  }
}
