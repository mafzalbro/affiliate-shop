import fs from 'fs';
import path from 'path';
import { parse } from 'json2csv';

// Function to aggregate JSON and CSV files from subdirectories into global and category-wise files
const aggregateCategoryFiles = async () => {
    const productsDir = path.join(process.cwd(), 'products');
    console.log('Products directory:', productsDir);

    const categories = fs.readdirSync(productsDir).filter(file => fs.statSync(path.join(productsDir, file)).isDirectory());
    console.log('Categories found:', categories);

    let globalProducts = [];
    let globalCsvData = [];

    // Process each category
    for (const category of categories) {
        const categoryPath = path.join(productsDir, category);
        console.log('Processing category:', category);

        let categoryProducts = [];
        let categoryCsvData = [];

        // Get all files from subdirectories
        const subdirs = fs.readdirSync(categoryPath).filter(file => fs.statSync(path.join(categoryPath, file)).isDirectory());
        console.log('Subdirectories found for category', category, ':', subdirs);

        for (const subdir of subdirs) {
            const subdirPath = path.join(categoryPath, subdir);
            const files = fs.readdirSync(subdirPath).filter(file => file.endsWith('.json') || file.endsWith('.csv'));
            console.log('Files found in', subdirPath, ':', files);

            for (const file of files) {
                const filePath = path.join(subdirPath, file);
                if (file.endsWith('.json')) {
                    console.log('Reading JSON file:', filePath);
                    const fileContent = fs.readFileSync(filePath, 'utf8');
                    const products = JSON.parse(fileContent);
                    categoryProducts = categoryProducts.concat(products);
                    globalProducts = globalProducts.concat(products);  // Aggregate globally
                } else if (file.endsWith('.csv')) {
                    console.log('Reading CSV file:', filePath);
                    const fileContent = fs.readFileSync(filePath, 'utf8');
                    const rows = fileContent.split('\n').slice(1); // Skip header
                    categoryCsvData.push(...rows);
                    globalCsvData.push(...rows);  // Aggregate globally
                }
            }
        }

        // Save combined category JSON
        const categoryJsonFilePath = path.join(categoryPath, 'all_products.json');
        fs.writeFileSync(categoryJsonFilePath, JSON.stringify(categoryProducts, null, 2));
        console.log(`Combined JSON saved to ${categoryJsonFilePath}`);

        // Add headers for category CSV if there is any CSV data
        const csvHeader = 'category,slug,amazon_link,title,image,shortDescription,description,price,favorite';
        const categoryCsvContent = [csvHeader, ...categoryCsvData].join('\n');

        // Save combined category CSV
        const categoryCsvFilePath = path.join(categoryPath, 'all_products.csv');
        fs.writeFileSync(categoryCsvFilePath, categoryCsvContent);
        console.log(`Combined CSV saved to ${categoryCsvFilePath}`);
    }

    // Save global JSON
    const globalJsonFilePath = path.join(productsDir, 'all_products.json');
    fs.writeFileSync(globalJsonFilePath, JSON.stringify(globalProducts, null, 2));
    console.log(`Global JSON saved to ${globalJsonFilePath}`);

    // Add headers for global CSV if there is any CSV data
    const globalCsvHeader = 'category,slug,amazon_link,title,image,shortDescription,description,price,favorite';
    const globalCsvContent = [globalCsvHeader, ...globalCsvData].join('\n');

    // Save global CSV
    const globalCsvFilePath = path.join(productsDir, 'all_products.csv');
    fs.writeFileSync(globalCsvFilePath, globalCsvContent);
    console.log(`Global CSV saved to ${globalCsvFilePath}`);
};

// Run this function separately when needed
(async () => {
    try {
        await aggregateCategoryFiles();
    } catch (error) {
        console.error('Error during aggregation:', error.message);
    }
})();
