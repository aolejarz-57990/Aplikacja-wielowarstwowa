// Obsługa kolekcji klientów
function pobierzKlientow() {
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
    idZamowienia;
    Termin = "";
}