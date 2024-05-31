function initializujStrone() {
  // podpięcie handlerów do eventów
  // Menu główne
  document.querySelector("#btn_klienci").addEventListener("click",()=>{
      pobierzListeElementow("klienci", klienci => {
      listaKlientow = klienci;
      wypelnijListeKlientow();
      przelaczStrone("klienci");
      });
  });
  document.querySelector("#btn_zabiegi").addEventListener("click",()=>{
    pobierzListeElementow("zabiegi", zabiegi => {
      listaZabiegow = zabiegi;
      wypelnijListeZabiegow();
      przelaczStrone("zabiegi");
    });
  });
  document.querySelector("#btn_kalendarz").addEventListener("click",()=>{
    pobierzListeElementow("zamowienia", wizyty => {
      listaWizyt = wizyty;
      przelaczStrone("kalendarz")
      wypelnijListeWizyt();
    });
  });
  document.querySelector("#btn_ustawienia").addEventListener("click",()=>{
      przelaczStrone("ustawienia")
  });
  document.querySelector("#btn_powrot_ustawienia").addEventListener("click",()=>{
    passcode = document.querySelector("#haslo_do_DB").value;
    APIkey = decrypt(encryptedAPIkey,passcode);
    baseSettings.headers["x-apikey"] = APIkey;
    pobierzListeElementow("klienci", klienci => listaKlientow = klienci);
    pobierzListeElementow("zabiegi", zabiegi => listaZabiegow = zabiegi);
    pobierzListeElementow("zamowienia", wizyty => listaWizyt = wizyty);
      przelaczStrone("menu_glowne");
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
  // Kalendarz
  document.querySelector("#btn_dodaj_wizyte").addEventListener("click",()=>{
    tworzListeKlientow();
    tworzListeZabiegow();
    przelaczStrone("dodaj_wizyte");
  });
  document.querySelector("#btn_powrot_wizyty").addEventListener("click",()=>{
    przelaczStrone("menu_glowne");
  });
  document.querySelector("#dodaj_wizyte form").addEventListener("submit", ev => {
    ev.preventDefault();
    ev.stopPropagation();
    const wizyta = {
      termin: document.querySelector("#nowa_wizyta_termin").value,
      idKlienta: document.querySelector("#nowa_wizyta_klient").value,
      idZabiegu: document.querySelector("#nowa_wizyta_zabieg").value
    }
    document.querySelector("#btn_dodaj_wizyte_submit").hidden = true;
    dodajElement("zamowienia",wizyta,() => {
      pobierzListeElementow("zamowienia", wizyty => {
        listaWizyt = wizyty;
        wypelnijListeWizyt();
        przelaczStrone("kalendarz");
        }
      );
    });
  });
  document.querySelector("#btn_powrot_nowa_wizyta").addEventListener("click",()=>{
    przelaczStrone("kalendarz");
  });
  document.querySelector("#btn_powrot_szczegoly_wizyty").addEventListener("click",()=>{
    przelaczStrone("kalendarz");
  });
  document.querySelector("#btn_usun_wizyte").addEventListener("click",()=>{
    if (confirm("Czy na pewno chcesz usunąć wizytę?")){
      listaWizyt=listaWizyt.filter(wizyta=>wizyta._id!=aktualnaWizyta._id);
      usunElement("zamowienia",aktualnaWizyta._id,() => {
        wypelnijListeWizyt();
        przelaczStrone("kalendarz");
      });
    }
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

  function wypelnijListeWizyt() {
    const tabelaWizyt = document.querySelector("#kalendarz tbody");
    tabelaWizyt.innerHTML = "";
    const templateWiersz = document.querySelector("#wiersz_zabiegi").content;
    listaWizyt.forEach(wizyta => {
        const templateTR = templateWiersz.querySelector("tr");
        const wiersz = templateWiersz.cloneNode(true);
        const komorki = wiersz.querySelectorAll("td span");
        komorki[0].textContent = formatujTermin(wizyta.termin);
        komorki[1].textContent = idKlientaNaNazwe(wizyta.idKlienta);
        komorki[2].textContent = idZabieguNaNazwe(wizyta.idZabiegu);
        wiersz.querySelector("tr").addEventListener("click", ev => {
          wyswietlSzczegolyWizyty(wizyta);
        });
        tabelaWizyt.appendChild(wiersz);
      }
    )
  }

  function wyswietlSzczegolyWizyty(wizyta) {
    aktualnaWizyta = wizyta;
    document.querySelector("#wizyta_termin").value = formatujTermin(wizyta.termin);
    document.querySelector("#wizyta_klient").value = idKlientaNaNazwe(wizyta.idKlienta) + ", tel: " + idKlientaNaTelefon(wizyta.idKlienta);
    document.querySelector("#wizyta_zabieg").value = idZabieguNaNazwe(wizyta.idZabiegu);
    document.querySelector("#kalendarz").hidden = true;
    document.querySelector("#wizyta_szczegoly").hidden = false;
  }

  function tworzListeKlientow() {
    const selectKlient = document.querySelector("#nowa_wizyta_klient");
    selectKlient.innerHTML = "";
    listaKlientow.forEach(klient => {
      const option = document.createElement("option");
      option.value = klient._id;
      option.textContent = klient.imie + " " + klient.nazwisko + ", tel: " + klient.tel;
      selectKlient.appendChild(option);
    })
  }

  function tworzListeZabiegow() {
    const selectZabieg = document.querySelector("#nowa_wizyta_zabieg");
    selectZabieg.innerHTML = "";
    listaZabiegow.forEach(zabieg => {
      const option = document.createElement("option");
      option.value = zabieg._id;
      option.textContent = zabieg.nazwa;
      selectZabieg.appendChild(option);
    })
  }

  pobierzListeKlientow = () => {
    pobierzListeElementow("klienci", klienci => {listaKlientow = klienci; }
    );
  }

  pobierzListeZabiegow = () => {
    pobierzListeElementow("zabiegi", zabiegi => {listaZabiegow = zabiegi; }
    );
  }

  pobierzListeWizyt = () => {
    pobierzListeElementow("zamowienia", wizyty => {listaWizyt = wizyty; }
    );
  }
  
  function idKlientaNaNazwe(idKlienta) {
    const klient = listaKlientow.find(klient => klient._id == idKlienta);
    return klient.imie + " " + klient.nazwisko;
  }

  function idKlientaNaTelefon(idKlienta) {
    const klient = listaKlientow.find(klient => klient._id == idKlienta);
    return klient.tel;
  }

  function idZabieguNaNazwe(idZabiegu) {
    const zabieg = listaZabiegow.find(zabieg => zabieg._id == idZabiegu);
    return zabieg.nazwa;
  }

  function formatujTermin(termin) {
    return termin.substring(0,10) + " " + termin.substring(11,16);
  }

  let listaKlientow = [];
  let listaZabiegow = [];
  let listaWizyt = [];

  const sekcje = ["menu_glowne","klienci","zabiegi","kalendarz","klient_szczegoly",
  "zabieg_szczegoly","dodaj_klienta","dodaj_zabieg","ustawienia","dodaj_wizyte","wizyta_szczegoly"]

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
         
