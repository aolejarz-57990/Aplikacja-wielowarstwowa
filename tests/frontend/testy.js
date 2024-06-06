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
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Przejdź do strony aplikacji
    await driver.get("https://aolejarz-57990.github.io");
    const nowyKlientBtn = await driver.findElement(By.id("btn_dodaj_klienta"));
    await driver.findElement(By.id("btn_klienci")).click();
    await driver.wait(until.elementIsVisible(nowyKlientBtn), 5000);
    await driver.findElement(By.id("btn_dodaj_klienta")).click();
    await driver.findElement(By.id("nowy_klient_imie")).sendKeys("Jan");
    await driver.findElement(By.id("nowy_klient_nazwisko")).sendKeys("Kowalski");
    await driver.findElement(By.id("nowy_klient_tel")).sendKeys("123456ABC");
    await driver.findElement(By.id("dodaj_klienta_submit")).click();
    await driver.wait(until.elementIsVisible(nowyKlientBtn), 20000);
    const actualString = await driver.findElement(By.xpath("//*[contains(text(), '123456AB')]")).getText();
    assert.equal(actualString,"123456AB");
  } finally {
    await driver.quit();
  }
}

async function dodajIEdytujKlientaTest() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Przejdź do strony aplikacji
    await driver.get("https://aolejarz-57990.github.io");
    // Dodaj klienta
    const nowyKlientBtn = await driver.findElement(By.id("btn_dodaj_klienta"));
    await driver.findElement(By.id("btn_klienci")).click();
    await driver.wait(until.elementIsVisible(nowyKlientBtn), 5000);
    await driver.findElement(By.id("btn_dodaj_klienta")).click();
    await driver.findElement(By.id("nowy_klient_imie")).sendKeys("Jan");
    await driver.findElement(By.id("nowy_klient_nazwisko")).sendKeys("Nowak");
    await driver.findElement(By.id("nowy_klient_tel")).sendKeys("111222333");
    await driver.findElement(By.id("dodaj_klienta_submit")).click();
    await driver.wait(until.elementIsVisible(nowyKlientBtn), 20000);
    await driver.findElement(By.xpath("//*[contains(text(), '111222333')]")).click();
    await driver.findElement(By.id("szczegoly_nazwisko")).sendKeys("Goszkowski");
    await driver.findElement(By.id("btn_zapisz_klienci")).click();
    await driver.wait(until.elementIsVisible(nowyKlientBtn), 20000);
    const actualString = await driver.findElement(By.xpath("//*[contains(text(), 'Goszkowski')]")).getText();
    assert.equal(actualString,"Goszkowski");
  } finally {
    await driver.quit();
  }
}

async function dodajIUsnunKlientaTest() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Przejdź do strony aplikacji
    await driver.get("https://aolejarz-57990.github.io");
    // Dodaj klienta
    const nowyKlientBtn = await driver.findElement(By.id("btn_dodaj_klienta"));
    await driver.findElement(By.id("btn_klienci")).click();
    await driver.wait(until.elementIsVisible(nowyKlientBtn), 5000);
    await driver.findElement(By.id("btn_dodaj_klienta")).click();
    await driver.findElement(By.id("nowy_klient_imie")).sendKeys("Jan");
    await driver.findElement(By.id("nowy_klient_nazwisko")).sendKeys("Nowak");
    await driver.findElement(By.id("nowy_klient_tel")).sendKeys("1122334455X");
    await driver.findElement(By.id("dodaj_klienta_submit")).click();
    await driver.wait(until.elementIsVisible(nowyKlientBtn), 20000);
    await driver.findElement(By.xpath("//*[contains(text(), '1122334455X')]")).click();
    await driver.findElement(By.id("btn_usun_klienci")).click();
    await driver.wait(until.elementIsVisible(nowyKlientBtn), 20000);
    const actualString = await driver.findElement(By.xpath("//*[contains(text(), '111222333')]")).getText();
    assert.equal(actualString,"");
  } finally {
    await driver.quit();
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

stronaGlownaTest();
nowyKlientTest();
dodajIEdytujKlientaTest();
dodajIUsnunKlientaTest();