const { Builder, By } = require('selenium-webdriver');

async function scrapeTakealot(driver) {
    try {
        // Navigate to Takealot
        await driver.get('https://www.takealot.com/cellular-gps');
        await driver.sleep(2000); // Add a short delay to ensure the page is fully loaded
        
        // Scrape smartphone data
        let smartphoneNameElement = await driver.findElement(By.className('product-title'));
        let smartphoneName = await smartphoneNameElement.getText();
        
        let smartphonePriceElement = await driver.findElement(By.className('price'));
        let smartphonePrice = await smartphonePriceElement.getText();

        return { retailer: 'Takealot', name: smartphoneName, price: smartphonePrice, scrapedAt: new Date().toISOString() };
    } catch (error) {
        console.error('Error scraping Takealot:', error);
        return null;
    }
}

async function scrapeMigro(driver) {
    try {
        // Navigate to Migro
        await driver.get('https://migro.co.rw/shop?category=smartphone-market&sub-category=tecno-mobile-phones');
        await driver.sleep(2000); // Add a short delay to ensure the page is fully loaded
        
        // Scrape smartphone data
        let smartphoneNameElement = await driver.findElement(By.className('product-name'));
        let smartphoneName = await smartphoneNameElement.getText();
        
        let smartphonePriceElement = await driver.findElement(By.id('price_1779'));
        let smartphonePrice = await smartphonePriceElement.getText();

        return { retailer: 'Migro', name: smartphoneName, price: smartphonePrice, scrapedAt: new Date().toISOString() };
    } catch (error) {
        console.error('Error scraping Migro:', error);
        return null;
    }
}

async function scrapeJumia(driver) {
    try {
        // Navigate to Jumia
        await driver.get('https://www.jumia.com.ng/phones-tablets');
        await driver.sleep(2000); // Add a short delay to ensure the page is fully loaded
        
        // Scrape smartphone data
        let smartphoneNameElement = await driver.findElement(By.className('name'));
        let smartphoneName = await smartphoneNameElement.getText();
        
        let smartphonePriceElement = await driver.findElement(By.className('prc'));
        let smartphonePrice = await smartphonePriceElement.getText();

        return { retailer: 'Jumia', name: smartphoneName, price: smartphonePrice, scrapedAt: new Date().toISOString() };
    } catch (error) {
        console.error('Error scraping Jumia:', error);
        return null;
    }
}

async function main() {
    let driver = await new Builder().forBrowser('chrome').build();
    let scrapedData = [];

    try {
        scrapedData = await Promise.all([
            scrapeTakealot(driver),
            scrapeMigro(driver),
            scrapeJumia(driver)
        ]);
    } catch (error) {
        console.error('Error during scraping:', error);
    } finally {
        await driver.quit();
    }

    // Filter out any null entries (failed scrapes)
    scrapedData = scrapedData.filter(data => data !== null);

    console.log(scrapedData);
}

main();
