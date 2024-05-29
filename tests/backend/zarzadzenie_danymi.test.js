const zarzadzanie = require('../../zarzadzanie_danymi');
test('2+2 powinno dać 4', () => {
    expect(zarzadzanie.dodaj(2,2)).toBe(4);
  });