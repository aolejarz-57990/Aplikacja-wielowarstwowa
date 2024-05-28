const { test, expect } = require('@playwright/test');

test("Pobierz klientow", async ({ request, baseURL }) => {
    const _response = await request.get(`${baseURL}klienci`,
    {
      headers: {
          "x-apikey": "663507a7c60874c61ed323bf"
      }
    }
    );
    expect(_response.ok()).toBeTruthy();
    expect(_response.status()).toBe(200);
    console.log(await _response.json());
  });