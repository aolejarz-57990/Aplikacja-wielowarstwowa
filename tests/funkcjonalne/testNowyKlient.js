const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
async function stronaGlownaTest() {
    // Uruchomienie przeglądarki
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        // Przejdź do strony aplikacji
        await driver.get("https://aolejarz-57990.github.io");
        // Sprawdzenie tytułu strony
        const pageTitle = await driver.getTitle();
        assert.strictEqual(pageTitle, "Aplikacja wielowarstwowa");
        // Sprawdzenie, czy przycisk "Klienci" jest dostępny
        await driver.findElement(By.id("btn_klienci")).click();
    } finally {
        await driver.quit();
    }
    }

async function nowyKlientTest() {
  // Uruchomienie przeglądarki
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Przejdź do strony aplikacji
    await driver.get("https://aolejarz-57990.github.io");
    // 
    await driver.findElement(By.id("email")).sendKeys("test3@gmail.com");
    await driver.findElement(By.id("password")).sendKeys("Password@12345");
    // Select login button and invoke click action
    //If login details are correct we wiil be redirected to the welcome page
    await driver.findElement(By.name("login")).click();
    //On succesful login get page title
    //Check page title, to confirm login was successful
    const pageTitle = await driver.getTitle();
    // assert usign node assertion
    assert.strictEqual(pageTitle, "Welcomepage");
    //Check if redirect to login page was successfull
    await driver.wait(until.titleIs("Welcomepage"), 4000);
  } finally {
    await driver.quit();
  }
}
stronaGlownaTest();