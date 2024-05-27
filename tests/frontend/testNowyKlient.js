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
    driver.findElement(By.id("btn_ustawienia")).click();
    driver.findElement(By.id("haslo_do_DB")).sendKeys("Password123");
    driver.findElement(By.id("btn_powrot_ustawienia")).click();
    driver.findElement(By.id("btn_klienci")).click();
    driver.findElement(By.id("btn_dodaj_klienta")).click();
    driver.findElement(By.id("nowy_klient_imie")).sendKeys("Jan");
    driver.findElement(By.id("nowy_klient_nazwisko")).sendKeys("Kowalski");
    driver.findElement(By.id("nowy_klient_tel")).sendKeys("111222333");
    driver.findElement(By.id("dodaj_klienta_submit")).click();
  } finally {
    //await driver.quit();
  }
}
//stronaGlownaTest();
nowyKlientTest();