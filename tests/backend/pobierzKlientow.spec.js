const { test, expect } = require('@playwright/test');

test("Pobierz klientow", async ({ request, baseURL }) => {
    const _response = await request.get(`${baseURL}klienci`
    );
    expect(_response.ok()).toBeTruthy();
    expect(_response.status()).toBe(200);
    console.log(await _response.json());
  });