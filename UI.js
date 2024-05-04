function initializujStrone() {
    document.querySelector("#btn_klienci").addEventListener("click",()=>{
        wypelnijListePacjentow();
        przelaczStrone("klienci");
    });
    document.querySelector("#btn_zabiegi").addEventListener("click",()=>{
        przelaczStrone("zabiegi");
        wypelnijListeZabiegow();
    });
    document.querySelector("#btn_kalendarz").addEventListener("click",()=>{
       przelaczStrone("kalendarz")
    });
    document.querySelector("#btn_zapisz_klienci").addEventListener("click",()=>{
        alert("Zapisano");
    });
    document.querySelector("#btn_usun_klienci").addEventListener("click",()=>{
        if (confirm("Czy na pewno chcesz usunąć pacjenta?")){
            listaKlientów=listaKlientów.filter(pacjent=>pacjent._id!=aktualnyPacjent._id);
            wypelnijListePacjentow();
            przelaczStrone("klienci");
        }
    });
    document.querySelector("#btn_powrot_klienci").addEventListener("click",()=>{
        przelaczStrone("klienci");
    });
    document.querySelector("#btn_zapisz_zabiegi").addEventListener("click",()=>{
        alert("Zapisano");
    });
    document.querySelector("#btn_usun_zabiegi").addEventListener("click",()=>{
        if (confirm("Czy na pewno chcesz usunąć zabieg?")){
            listaZabiegow=listaZabiegow.filter(zabieg=>zabieg.id!=aktualnyZabieg.id);
            wypelnijListeZabiegow();
            przelaczStrone("zabiegi");
        }
    });
    document.querySelector("#btn_powrot_zabiegi").addEventListener("click",()=>{
        przelaczStrone("zabiegi");
    });
}
      
function wypelnijListePacjentow() {
    const tabelaPacjentow = document.querySelector("#klienci tbody");
    tabelaPacjentow.innerHTML = "";
    const templateWiersz = document.querySelector("#wiersz_klienci").content;
    listaKlientów.forEach(pacjent => {
        const templateTR = templateWiersz.querySelector("tr");
        const wiersz = templateWiersz.cloneNode(true);
        const komorki = wiersz.querySelectorAll("td span");
        komorki[0].textContent = pacjent.imie;
        komorki[1].textContent = pacjent.nazwisko;
        komorki[2].textContent = pacjent.tel;
        wiersz.querySelector("tr").addEventListener("click", ev => {
          wyswietlSzczegolyPacjenta(pacjent)
        })
        tabelaPacjentow.appendChild(wiersz);
      }
    )

  }

  function wyswietlSzczegolyPacjenta(pacjent) {
    aktualnyPacjent = pacjent;
    const szczegolyImie = document.querySelector("#szczegoly_imie");
    szczegolyImie.value = pacjent.imie;
    const szczegolyNazwisko = document.querySelector("#szczegoly_nazwisko");
    szczegolyNazwisko.value = pacjent.nazwisko;
    const szczegolyTelefon = document.querySelector("#szczegoly_telefon");
    szczegolyTelefon.value = pacjent.tel;
    const sekcjaKlienci = document.querySelector("#klienci");
    sekcjaKlienci.hidden = true;
    const sekcjaSzczegoly = document.querySelector("#klient_szczegoly");
    sekcjaSzczegoly.hidden = false;
  }

  function wypelnijListeZabiegow() {
    const tabelaZabiegow = document.querySelector("#zabiegi tbody");
    tabelaZabiegow.innerHTML = "";
    const templateWiersz = document.querySelector("#wiersz_zabiegi").content;
    listaZabiegow.forEach(zabieg => {
        const templateTR = templateWiersz.querySelector("tr");
        const wiersz = templateWiersz.cloneNode(true);
        const komorki = wiersz.querySelectorAll("td span");
        komorki[0].textContent = zabieg.Nazwa;
        komorki[1].textContent = zabieg.Czasochlonnosc;
        komorki[2].textContent = zabieg.Opis;
        wiersz.querySelector("tr").addEventListener("click", ev => {
          wyswietlSzczegolyZabiegu(zabieg)
        })
        tabelaZabiegow.appendChild(wiersz);
      }
    )
  }

  function wyswietlSzczegolyZabiegu(zabieg) {
    aktualnyZabieg = zabieg;
    const szczegolyNazwa = document.querySelector("#szczegoly_nazwa");
    szczegolyNazwa.value = zabieg.Nazwa;
    const szczegolyCzasochlonnosc = document.querySelector("#szczegoly_czas");
    szczegolyCzasochlonnosc.value = zabieg.Czasochlonnosc;
    const szczegolyOpis = document.querySelector("#szczegoly_opis");
    szczegolyOpis.value = zabieg.Opis;
    const sekcjaZabiegi = document.querySelector("#zabiegi");
    sekcjaZabiegi.hidden = true;
    const sekcjaSzczegoly = document.querySelector("#zabieg_szczegoly");
    sekcjaSzczegoly.hidden = false;
  }

  let listaKlientów = [];

  let listaZabiegow = [
    { "id": "1",
      "Nazwa": "Zabieg1",
      "Czasochlonnosc": "30",
      "Opis": "Opis zabiegu1"},
     {"id": "2",
      "Nazwa": "Zabieg2",
      "Czasochlonnosc": "40",
      "Opis": "Opis zabiegu2"},
     {"id": "3",
      "Nazwa": "Zabieg3",
     "Czasochlonnosc": "120",
      "Opis": "Opis zabiegu3"},
     {"id": "4",
      "Nazwa": "Zabieg4",
     "Czasochlonnosc": "15",
      "Opis": "Opis zabiegu4"},
     {"id": "5",
      "Nazwa": "Zabieg5",
     "Czasochlonnosc": "60",
      "Opis": "Opis zabiegu5"},
  ]
  const sekcje = ["menu_glowne","klienci","zabiegi","kalendarz","klient_szczegoly","zabieg_szczegoly"]

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
         
