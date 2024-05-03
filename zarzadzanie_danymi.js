//Uzyskanie dostepu do bazy danych
const encryptedAPIkey = "U2FsdGVkX18Ikhl8uGAj3j/+XdcYdUjGGbomZZUPR2BZyAPaVIXPGpNJFlr+OPjxiwWvRlQ6wnnlqqUXMtXN4w==";
const APIkey = decrypt(encryptedAPIkey,passcode);
var db = new restdb(APIkey);

// Obsługa kolekcji klientów

function pobierzKlientow(onDane) {
    const query = {}; // get all records
    const hints = {"$max": 100, "$orderby": {"_id": -1}};
    db.klienci.find(query, function(err, res){
    if (!err && typeof(onDane) == "function"){
        onDane(res);
    }
});
}

function dodajKlienta(klient) {    
}

function pobierzKlienta(kleintId) {
}

function aktualizujKlienta(klient) {
}

function usunKlienta(klientId) {
}

// Obsługa kolekcji zabiegów
function pobierzZabiegi() {
}

function dodajZabieg(zabieg) {
}

function pobierzZabieg(zabiegId) {
}

function aktualizujZabieg(zabieg) {
}

function usunZabieg(zabiegId) {
}

// Obsługa zamówień

function pobierzZamowienia() {
}

function dodajZamowienie(zamowienie) {
}

function pobierzZamowienie(zamowienieId) {
}

function aktualizujZamowienie(zamowienie) {
}

function usunZamowienie(zamowienieId) {
}

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

function encrypt(content, password) { 
    return CryptoJS.AES.encrypt(JSON.stringify({ content }), password).toString();
}

function decrypt(crypted, password) {
    return JSON.parse(CryptoJS.AES.decrypt(crypted, password).toString(CryptoJS.enc.Utf8)).content;
}