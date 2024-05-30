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
    const nowyKlientBtn = await driver.findElement(By.id("btn_dodaj_klienta"));
    await driver.findElement(By.id("btn_klienci")).click();
    await driver.wait(until.elementIsVisible(nowyKlientBtn), 5000);
    await driver.findElement(By.id("btn_dodaj_klienta")).click();
    await driver.findElement(By.id("nowy_klient_imie")).sendKeys("Jan");
    await driver.findElement(By.id("nowy_klient_nazwisko")).sendKeys("Olejarz");
    await driver.findElement(By.id("nowy_klient_tel")).sendKeys("111222333");
    await sleep(30000);
    await driver.findElement(By.id("dodaj_klienta_submit")).click();
   
    await driver.wait(until.elementIsVisible(nowyKlientBtn), 20000);
  } finally {
    await driver.quit();
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

stronaGlownaTest();
nowyKlientTest();
