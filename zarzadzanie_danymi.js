const helpers = require('./helpers.js');
//Uzyskanie dostepu do bazy danych
const encryptedAPIkey = "U2FsdGVkX18Ikhl8uGAj3j/+XdcYdUjGGbomZZUPR2BZyAPaVIXPGpNJFlr+OPjxiwWvRlQ6wnnlqqUXMtXN4w==";
let passcode = "";
let APIkey = "";
const url = "https://aplikacja-ac0d.restdb.io/rest/";
const settings = {
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
    settings.method = "GET";
    settings.url = url+kolekcja;
    helpers.request(settings, onSuccess);
}

function dodajElement(kolekcja, element, onSuccess) {
    settings.method = "POST";
    settings.url = url+kolekcja;
    settings.processData = false;
    settings.data = JSON.stringify(element);
    helpers.request(settings, onSuccess);
}

function pobierzElement(kolekcja, elementId, onSuccess) {
    settings.method = "GET";
    settings.url = url+kolekcja+"/"+elementId;
    helpers.request(settings, onSuccess);
}

function aktualizujElement(kolekcja, element, onSuccess) {
    settings.method = "PUT";
    settings.url = url+kolekcja+"/"+element._id;
    settings.data = JSON.stringify(element);
    helpers.request(settings, onSuccess);
}


function usunElement(kolekcja, elementId,onSuccess) {
    settings.method = "DELETE";
    settings.url = url+kolekcja+"/"+elementId;
    helpers.request(settings, onSuccess);
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

module.exports = {
    pobierzListeElementow,
    dodajElement,
    pobierzElement,
    aktualizujElement,
    usunElement,
}