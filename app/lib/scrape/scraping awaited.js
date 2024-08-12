import { Actor } from 'apify';
import { PlaywrightCrawler, RequestQueue } from 'crawlee';
import fs from 'fs';
import path from 'path';
import { parse } from 'json2csv';
import cheerio from 'cheerio';

const saveProductsToFiles = async (products, category, pageNum) => {
    const folderPath = path.join(process.cwd(), 'products', category);
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
};

const handlePageFunction = async ({ request, page, requestQueue }) => {
    try {
        const products = [];
        const content = await page.content();
        const $ = cheerio.load(content);

        const productElements = $('.s-main-slot .s-result-item');

        for (const element of productElements) {
            const title = $(element).find('h2 a span').text().trim();
            const image = $(element).find('.s-image').attr('src');
            const shortDescription = $(element).find('.a-text-normal').text().trim();
            const link = $(element).find('a').attr('href');
            const amazonLink = link ? `https://www.amazon.com${link}` : null;

            if (amazonLink) {
                try {
                    // await page.waitForTimeout(Math.random() * 2000 + 1000); // Random delay between 1-3 seconds
                    await page.goto(amazonLink, { waitUntil: 'networkidle' });
                    const productContent = await page.content();
                    const productPage = cheerio.load(productContent);

                    const description = productPage('#productDescription').text().trim();
                    const price = productPage('#priceblock_ourprice, #priceblock_dealprice').text().trim().replace('$', '');

                    products.push({
                        category: request.userData.category,
                        slug: link.split('/').pop(),
                        amazon_link: amazonLink,
                        title: title || productPage('#productTitle').text().trim(),
                        image,
                        shortDescription: shortDescription || description,
                        description,
                        price: parseFloat(price) || null,
                        favorite: false,
                    });
                } catch (error) {
                    console.error(`Failed to scrape product details: ${error.message}`);
                }
            }
        }

        if (products.length > 0) {
            await saveProductsToFiles(products, request.userData.category, request.userData.pageNum);
        }

        const nextPageLink = $('li.a-last a').attr('href');
        if (nextPageLink) {
            const nextPageUrl = `https://www.amazon.com${nextPageLink}`;
            if (nextPageUrl.startsWith('https://www.amazon.com')) {
                await requestQueue.addRequest({
                    url: nextPageUrl,
                    userData: {
                        category: request.userData.category,
                        pageNum: request.userData.pageNum + 1,
                    }
                });
            } else {
                console.error('Malformed next page URL:', nextPageUrl);
            }
        }
    } catch (error) {
        console.error('Error during page handling:', error.message);
    }
};

const runScraperForCategories = async (categories) => {
    const requestQueue = await RequestQueue.open();

    for (const category of categories) {
        await requestQueue.addRequest({
            url: `https://www.amazon.com/s?k=${category}`,
            userData: { category, pageNum: 1 }
        });
    }

    const crawler = new PlaywrightCrawler({
        requestQueue,
        handlePageFunction,
        launchContext: {
            launchOptions: { headless: false },
        },
        maxConcurrency: 2, // Reduce concurrency to handle resources better
        // pageTimeoutSecs: 60, // Increase page timeout to 60 seconds
        handleFailedRequestFunction: async ({ request }) => {
            console.error(`Request ${request.url} failed too many times.`);
        }
    });

    await crawler.run();
};

const categories = [
    'electronics',
    'furniture',
    'beauty',
    'books',
    'sports',
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

(async () => {
    await Actor.init();
    try {
        await runScraperForCategories(categories);
    } catch (error) {
        console.error('Error during scraping:', error.message);
    } finally {
        await Actor.exit();
    }
})();
