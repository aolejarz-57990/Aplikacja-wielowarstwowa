const zarzadzanie_danymi = require('../../zarzadzanie_danymi');
const helpers = require('../../helpers');

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

test('2+2 powinno dać 4', () => {
    expect(helpers.dodaj(2,2)).toBe(4);
  });


test('pobierz klientów', () => {
    const spy = jest.spyOn(helpers, 'request').mockImplementation(() => {});
    zarzadzanie_danymi.pobierzListeElementow('klienci');
    expect(spy).toHaveBeenCalledTimes(1);
   // expect(spy).toHaveBeenCalledWith({ url: 'https://aplikacja-ac0d.restdb.io/rest/klienci', method: 'GET' });
    spy.mockRestore();
});

// test('dodaj klienta', () => {
//     const spy = jest.spyOn(helpers, 'request').mockImplementation(() => {});
//     const klient = {Imie: 'Jan', Nazwisko: 'Kowalski', Tel: '111222333'};
//     zarzadzanie_danymi.dodajElement('klienci', klient);
//     expect(spy).toHaveBeenCalledTimes(1);
//     expect(spy).toHaveBeenCalledWith({ url: 'https://aplikacja-ac0d.restdb.io/rest/klienci', method: 'POST', data: JSON.stringify(klient) });
//     spy.mockRestore();
// });

// test('pobierz klienta', () => {
//     const spy = jest.spyOn(helpers, 'request').mockImplementation(() => {});
//     zarzadzanie_danymi.pobierzElement('klienci', '123');
//     expect(spy).toHaveBeenCalledTimes(1);
//     expect(spy).toHaveBeenCalledWith({ url: 'https://aplikacja-ac0d.restdb.io/rest/klienci/123', method: 'GET' });
//     spy.mockRestore();
// });

// test('aktualizuj klienta', () => {
//     const spy = jest.spyOn(helpers, 'request').mockImplementation(() => {});
//     const klient = {Imie: 'Jan', Nazwisko: 'Kowalski', Tel: '111222333'};
//     zarzadzanie_danymi.aktualizujElement('klienci', klient);
//     expect(spy).toHaveBeenCalledTimes(1);
//     expect(spy).toHaveBeenCalledWith({ url: 'https://aplikacja-ac0d.restdb.io/rest/klienci/undefined', method: 'PUT', data: JSON.stringify(klient) });
//     spy.mockRestore();
// });

// test('usuń klienta', () => {
//     const spy = jest.spyOn(helpers, 'request').mockImplementation(() => {});
//     zarzadzanie_danymi.usunElement('klienci', '123');
//     expect(spy).toHaveBeenCalledTimes(1);
//     expect(spy).toHaveBeenCalledWith({ url: 'https://aplikacja-ac0d.restdb.io/rest/klienci/123', method: 'DELETE' });
//     spy.mockRestore();
// });