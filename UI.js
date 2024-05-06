function initializujStrone() {
  // podpięcie handlerów do eventów
  // Menu główne
  document.querySelector("#btn_klienci").addEventListener("click",()=>{
      wypelnijListeKlientow();
      przelaczStrone("klienci");
  });
  document.querySelector("#btn_zabiegi").addEventListener("click",()=>{
      przelaczStrone("zabiegi");
      wypelnijListeZabiegow();
  });
  document.querySelector("#btn_kalendarz").addEventListener("click",()=>{
      przelaczStrone("kalendarz")
  });
  document.querySelector("#btn_ustawienia").addEventListener("click",()=>{
      przelaczStrone("ustawienia")
  });
  document.querySelector("#btn_powrot_ustawienia").addEventListener("click",()=>{
    passcode = document.querySelector("#haslo_do_DB").value;
    APIkey = decrypt(encryptedAPIkey,passcode);
    settings.headers["x-apikey"] = APIkey;
    pobierzListeElementow("klienci", klienci => listaKlientow = klienci);
    pobierzListeElementow("zabiegi", zabiegi => {
      listaZabiegow = zabiegi;
      przelaczStrone("menu_glowne");
    
    });
  });
  // Klienci
  document.querySelector("#btn_dodaj_klienta").addEventListener("click",() => {
      document.querySelector("#dodaj_klienta_submit").hidden = false;
      przelaczStrone("dodaj_klienta");
  })
  document.querySelector("#btn_powrot_klienci").addEventListener("click",()=>{
          przelaczStrone("menu_glowne");
      });
  document.querySelector("#btn_zapisz_klienci").addEventListener("click",()=>{
      const klient = {
        _id: aktualnyKlient._id,
        imie: document.querySelector("#szczegoly_imie").value,
        nazwisko: document.querySelector("#szczegoly_nazwisko").value,
        tel: document.querySelector("#szczegoly_telefon").value
      }
      aktualizujElement("klienci",klient,() => {
        pobierzListeElementow("klienci", klienci => {
          listaKlientow = klienci;
          wypelnijListeKlientow();
          przelaczStrone("klienci");
          }
        );
      });
  });
    document.querySelector("#btn_usun_klienci").addEventListener("click",()=>{
        if (confirm("Czy na pewno chcesz usunąć pacjenta?")){
            listaKlientow=listaKlientow.filter(klient=>klient._id!=aktualnyKlient._id);
            usunElement("klienci",aktualnyKlient._id,() => {
              wypelnijListeKlientow();
              przelaczStrone("klienci");
            });
        }
    });
   document.querySelector("#dodaj_klienta form").addEventListener("submit", ev => {
      ev.preventDefault();
      ev.stopPropagation();
      const klient = {
        imie: document.querySelector("#nowy_klient_imie").value,
        nazwisko: document.querySelector("#nowy_klient_nazwisko").value,
        tel: document.querySelector("#nowy_klient_tel").value
      }
      document.querySelector("#dodaj_klienta_submit").hidden = true;
      dodajElement("klienci",klient,() => {
        pobierzListeElementow("klienci", klienci => {
          listaKlientow = klienci;
          wypelnijListeKlientow();
          przelaczStrone("klienci");
          }
        );
      });
    }) 
  document.querySelector("#btn_powrot_dodaj_klienta").addEventListener("click",()=>{
      przelaczStrone("klienci");
  });
  document.querySelector("#btn_powrot_szczegoly_klienta").addEventListener("click",()=>{
    przelaczStrone("klienci");
  });

  // Zabiegi
  document.querySelector("#btn_dodaj_zabieg").addEventListener("click",() => {
    document.querySelector("#dodaj_zabieg_submit").hidden = false;
    przelaczStrone("dodaj_zabieg");
  });
  document.querySelector("#btn_powrot_zabiegi").addEventListener("click",()=>{
    przelaczStrone("menu_glowne");
  });
  document.querySelector("#btn_zapisz_zabiegi").addEventListener("click",()=>{
    const zabieg = {
      _id: aktualnyZabieg._id,
      nazwa: document.querySelector("#szczegoly_nazwa").value,
      czas: document.querySelector("#szczegoly_czas").value,
      opis: document.querySelector("#szczegoly_opis").value
    }
    aktualizujElement("zabiegi",zabieg,() => {
      pobierzListeElementow("zabiegi", zabiegi => {
        listaZabiegow = zabiegi;
        wypelnijListeZabiegow();
        przelaczStrone("zabiegi");
        }
      );
    }); 
  });
  document.querySelector("#btn_usun_zabiegi").addEventListener("click",()=>{
      if (confirm("Czy na pewno chcesz usunąć zabieg?")){
        listaZabiegow=listaZabiegow.filter(zabieg=>zabieg._id!=aktualnyZabieg._id);
        usunElement("zabiegi",aktualnyZabieg._id,() => {
          wypelnijListeZabiegow();
          przelaczStrone("zabiegi");
        });
      }
  });
  document.querySelector("#dodaj_zabieg form").addEventListener("submit", ev => {
    ev.preventDefault();
    ev.stopPropagation();
    const zabieg = {
      nazwa: document.querySelector("#nowy_zabieg_nazwa").value,
      czas: document.querySelector("#nowy_zabieg_czas").value,
      opis: document.querySelector("#nowy_zabieg_opis").value
    }
    document.querySelector("#dodaj_zabieg_submit").hidden = true;
    dodajElement("zabiegi",zabieg,() => {
      pobierzListeElementow("zabiegi", zabiegi => {
        listaZabiegow = zabiegi;
        wypelnijListeZabiegow();
        przelaczStrone("zabiegi");
        }
      );
    });
  })
  document.querySelector("#btn_powrot_dodaj_zabieg").addEventListener("click",()=>{
    przelaczStrone("zabiegi");
  });  
  document.querySelector("#btn_powrot_szczegoly_zabiegu").addEventListener("click",()=>{
    przelaczStrone("zabiegi");
  });
}
      
function wypelnijListeKlientow() {
    const tabelaPacjentow = document.querySelector("#klienci tbody");
    tabelaPacjentow.innerHTML = "";
    const templateWiersz = document.querySelector("#wiersz_klienci").content;
    listaKlientow.forEach(klient => {
        const templateTR = templateWiersz.querySelector("tr");
        const wiersz = templateWiersz.cloneNode(true);
        const komorki = wiersz.querySelectorAll("td span");
        komorki[0].textContent = klient.imie;
        komorki[1].textContent = klient.nazwisko;
        komorki[2].textContent = klient.tel;
        wiersz.querySelector("tr").addEventListener("click", ev => {
          wyswietlSzczegolyKlienta(klient)
        })
        tabelaPacjentow.appendChild(wiersz);
      }
    )

  }

  function wyswietlSzczegolyKlienta(klient) {
    aktualnyKlient = klient;
    document.querySelector("#szczegoly_imie").value = klient.imie;
    document.querySelector("#szczegoly_nazwisko").value = klient.nazwisko;
    document.querySelector("#szczegoly_telefon").value = klient.tel;
    document.querySelector("#klienci").hidden = true;
    document.querySelector("#klient_szczegoly").hidden = false;
  }

  function wypelnijListeZabiegow() {
    const tabelaZabiegow = document.querySelector("#zabiegi tbody");
    tabelaZabiegow.innerHTML = "";
    const templateWiersz = document.querySelector("#wiersz_zabiegi").content;
    listaZabiegow.forEach(zabieg => {
        const templateTR = templateWiersz.querySelector("tr");
        const wiersz = templateWiersz.cloneNode(true);
        const komorki = wiersz.querySelectorAll("td span");
        komorki[0].textContent = zabieg.nazwa;
        komorki[1].textContent = zabieg.czas;
        komorki[2].textContent = zabieg.opis;
        wiersz.querySelector("tr").addEventListener("click", ev => {
          wyswietlSzczegolyZabiegu(zabieg)
        })
        tabelaZabiegow.appendChild(wiersz);
      }
    )
  }

  function wyswietlSzczegolyZabiegu(zabieg) {
    aktualnyZabieg = zabieg;
    document.querySelector("#szczegoly_nazwa").value = zabieg.nazwa;
    document.querySelector("#szczegoly_czas").value = zabieg.czas;
    document.querySelector("#szczegoly_opis").value = zabieg.opis;
    document.querySelector("#zabiegi").hidden = true;
    document.querySelector("#zabieg_szczegoly").hidden = false;
  }

  let listaKlientow = [];
  let listaZabiegow = [];

  const sekcje = ["menu_glowne","klienci","zabiegi","kalendarz","klient_szczegoly",
  "zabieg_szczegoly","dodaj_klienta","dodaj_zabieg","ustawienia"]

  function przelaczStrone(strona) { 
    sekcje.forEach(sekcja => { 
        if(sekcja===strona) {
            document.querySelector(`#${sekcja}`).hidden=false;
        }
        else {
            document.querySelector(`#${sekcja}`).hidden=true;
        }
    })

  }
         
