const zarzadzanie_danymi = require('../../zarzadzanie_danymi');
const helpers = require('../../helpers');
const { describe } = require('node:test');

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

const parameters = {
    "async": true,
    "crossDomain": true,
    "headers": {
    "cache-control": "no-cache",
    "content-type": "application/json",
    "x-apikey": ""
    }
}

describe('Przykładowy test', () => {
    test('2+2 powinno dać 4', () => {
        expect(helpers.dodaj(2,2)).toBe(4);
    });
});


describe('Testy zarządzania danymi', () => {

    test('pobierz klientów', () => {
        const spy = jest.spyOn(helpers, 'request').mockImplementation(() => {});
        zarzadzanie_danymi.pobierzListeElementow('klienci');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({...parameters ,url: 'https://aplikacja-ac0d.restdb.io/rest/klienci', method: 'GET' }, undefined);
    });

    test('dodaj klienta', () => {
        const spy = jest.spyOn(helpers, 'request').mockImplementation(() => {});
        const klient = {Imie: 'Jan', Nazwisko: 'Kowalski', Tel: '111222333'};
        zarzadzanie_danymi.dodajElement('klienci', klient);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({...parameters, url: 'https://aplikacja-ac0d.restdb.io/rest/klienci', method: 'POST', processData: false, data: JSON.stringify(klient) }, undefined);
    });

    test('pobierz klienta', () => {
        const spy = jest.spyOn(helpers, 'request').mockImplementation(() => {});
        zarzadzanie_danymi.pobierzElement('klienci', '123');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({...parameters, url: 'https://aplikacja-ac0d.restdb.io/rest/klienci/123', method: 'GET' }, undefined);
    });

    test('aktualizuj klienta', () => {
        const spy = jest.spyOn(helpers, 'request').mockImplementation(() => {});
        const klient = {Imie: 'Jan', Nazwisko: 'Kowalski', Tel: '111222333'};
        zarzadzanie_danymi.aktualizujElement('klienci', klient);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({...parameters, url: 'https://aplikacja-ac0d.restdb.io/rest/klienci/undefined', method: 'PUT', data: JSON.stringify(klient) }, undefined);
    });

    test('usuń klienta', () => {
        const spy = jest.spyOn(helpers, 'request').mockImplementation(() => {});
        zarzadzanie_danymi.usunElement('klienci', '123');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({...parameters, url: 'https://aplikacja-ac0d.restdb.io/rest/klienci/123', method: 'DELETE' }, undefined);
    });
});