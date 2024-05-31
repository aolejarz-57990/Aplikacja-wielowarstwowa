//const helpers = require('./helpers.js');
//Uzyskanie dostepu do bazy danych
const encryptedAPIkey = "U2FsdGVkX18Ikhl8uGAj3j/+XdcYdUjGGbomZZUPR2BZyAPaVIXPGpNJFlr+OPjxiwWvRlQ6wnnlqqUXMtXN4w==";
let passcode = "";
let APIkey = "663507a7c60874c61ed323be";
const url = "https://aplikacja-ac0d.restdb.io/rest/";
const baseSettings = {
    "async": true,
    "crossDomain": true,
    "url": "",
    "method": "",
    "headers": {
      "content-type": "application/json",
      "x-apikey": APIkey,
      "cache-control": "no-cache"
    }
  }

// Obsługa kolekcji
function pobierzListeElementow(kolekcja, onSuccess) {
    const settings = JSON.parse(JSON.stringify(baseSettings));
    settings.method = "GET";
    settings.url = url+kolekcja;
    request(settings, onSuccess);
}

function dodajElement(kolekcja, element, onSuccess) {
    const settings = JSON.parse(JSON.stringify(baseSettings));
    settings.method = "POST";
    settings.url = url+kolekcja;
    settings.processData = false;
    settings.data = JSON.stringify(element);
    request(settings, onSuccess);
}

function pobierzElement(kolekcja, elementId, onSuccess) {
    const settings = JSON.parse(JSON.stringify(baseSettings));
    settings.method = "GET";
    settings.url = url+kolekcja+"/"+elementId;
    request(settings, onSuccess);
}

function aktualizujElement(kolekcja, element, onSuccess) {
    const settings = JSON.parse(JSON.stringify(baseSettings));
    settings.method = "PUT";
    settings.url = url+kolekcja+"/"+element._id;
    settings.data = JSON.stringify(element);
    request(settings, onSuccess);
}


function usunElement(kolekcja, elementId, onSuccess) {
    const settings = JSON.parse(JSON.stringify(baseSettings));
    settings.method = "DELETE";
    settings.url = url+kolekcja+"/"+elementId;
    request(settings, onSuccess);
}

// Klasy do obsługi danych

class Klient {
    id;
    Imie = "";
    Nazwisko = "";
    Tel = "";
}

class Zabieg {
    id;
    Nazwa = "";
    Czasochlonnosc = 0;
    Opis = "";
}

class Zamowienia {
    id;
    idKlienta;
    idZabiegu;
    Termin = "";
}

// module.exports = {
//     pobierzListeElementow,
//     dodajElement,
//     pobierzElement,
//     aktualizujElement,
//     usunElement,
// }