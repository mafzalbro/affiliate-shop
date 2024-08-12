import fs from 'fs';
import path from 'path';
import { parse } from 'json2csv';
import cheerio from 'cheerio';

// Function to save products to JSON and CSV files
const saveProductsToFiles = async (products, category, pageNum) => {
    const categoryPath = path.join('./products', category);
    const pagePath = path.join(categoryPath, `page_${pageNum}`);

    if (!fs.existsSync(pagePath)) {
        fs.mkdirSync(pagePath, { recursive: true });
    }

    const jsonFilePath = path.join(pagePath, 'products.json');
    const csvFilePath = path.join(pagePath, 'products.csv');

    fs.writeFileSync(jsonFilePath, JSON.stringify(products, null, 2));

    try {
        const csv = parse(products);
        fs.writeFileSync(csvFilePath, csv);
        console.log(`Products saved to ${csvFilePath} and ${jsonFilePath}`);
        console.log(`Number of products stored: ${products.length}`);
    } catch (error) {
        console.error('Failed to save products to CSV:', error.message);
    }
};


// Function to extract products from HTML content
const extractProductsFromHTML = (htmlContent, category, pageNum) => {
    const products = [];
    const $ = cheerio.load(htmlContent);

    const productElements = $('.s-main-slot .s-result-item');

    productElements.each((i, element) => {
        const title = $(element).find('h2 a span').text().trim();
        const image = $(element).find('.s-image').attr('src');
        const shortDescription = $(element).find('.a-text-normal').text().trim();
        const link = $(element).find('a').attr('href');
        const amazonLink = link ? `https://www.amazon.com${link}` : null;

        // Extract price
        const priceText = $(element).find('.a-price .a-offscreen').text().trim();
        const price = priceText ? parseFloat(priceText.replace(/[^0-9.]/g, '')) : null;

        // Only include products that have a title, price, and valid URL
        if (
            title &&
            price !== null &&
            amazonLink &&
            !amazonLink.toLowerCase().includes('help')
        ) {
            products.push({
                category,
                slug: link ? link.split('/').pop() : 'unknown',
                amazon_link: amazonLink,
                title: title || null,
                image: image || null,
                shortDescription: shortDescription || null,
                description: null,
                price: price || null,
                favorite: false,
            });
        }
    });

    return products;
};

// Main function to handle HTML files and save data
const processHTMLFiles = async () => {
    const productsDir = path.join(process.cwd(), 'products');
    console.log('Products directory:', productsDir);

    const categories = fs.readdirSync(productsDir).filter(file => fs.statSync(path.join(productsDir, file)).isDirectory());
    console.log('Categories found:', categories);

    let totalProductsStored = 0; // Counter for total products stored

    for (const category of categories) {
        const folderPath = path.join(productsDir, category);
        console.log('Processing category:', category);

        // List all subdirectories (e.g., page_1)
        const subdirs = fs.readdirSync(folderPath).filter(file => fs.statSync(path.join(folderPath, file)).isDirectory());
        console.log('Subdirectories found for category', category, ':', subdirs);

        for (const subdir of subdirs) {
            const subfolderPath = path.join(folderPath, subdir);
            const files = fs.readdirSync(subfolderPath).filter(file => file.endsWith('.html'));
            console.log('HTML files found in', subfolderPath, ':', files);

            for (const file of files) {
                // const pageNum = file.split('_')[1] || 'unknown';
                const pageNum = subfolderPath.split('_')[1];
                const filePath = path.join(subfolderPath, file);
                console.log('Processing file:', filePath);

                const htmlContent = fs.readFileSync(filePath, 'utf8');

                const products = extractProductsFromHTML(htmlContent, category, pageNum);
                console.log('Extracted products size:', products.length);

                // Update the total products counter
                totalProductsStored += products.length;

                // console.log({pageNum, files, subfolderPath})
                await saveProductsToFiles(products, category, pageNum);
            }
        }
    }

    console.log(`Total number of products stored: ${totalProductsStored}`);
};

(async () => {
    try {
        await processHTMLFiles();
    } catch (error) {
        console.error('Error during processing:', error.message);
    }
})();
