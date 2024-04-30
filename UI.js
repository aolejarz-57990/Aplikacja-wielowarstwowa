function initializujStrone() {
    document.querySelector("#btn_pacjenci").addEventListener("click",()=>{
        const pierwsza_sekcja=document.querySelector("#menu_glowne");
        pierwsza_sekcja.hidden=true;
        const druga_sekcja=document.querySelector("#pacjenci");
        druga_sekcja.hidden=false;
        wypelnijListePacjentow();
    });
    document.querySelector("#btn_zabiegi").addEventListener("click",()=>{
        const pierwsza_sekcja=document.querySelector("#menu_glowne");
        pierwsza_sekcja.hidden=true;
        const trzecia_sekcja=document.querySelector("#zabiegi");
        trzecia_sekcja.hidden=false;
    });
    document.querySelector("#btn_kalendarz").addEventListener("click",()=>{
        const pierwsza_sekcja=document.querySelector("#menu_glowne");
        pierwsza_sekcja.hidden=true;
        const czwarta_sekcja=document.querySelector("#kalendarz");
        czwarta_sekcja.hidden=false;
    });
    document.querySelector("#btn_zapisz_pacjenci").addEventListener("click",()=>{
        alert("Zapisano");
    });
    document.querySelector("#btn_usun_pacjenci").addEventListener("click",()=>{
        if (confirm("Czy na pewno chcesz usunąć pacjenta?")){
            danePacjentow=danePacjentow.filter(pacjent=>pacjent.id!=aktualnyPacjent.id);
            wypelnijListePacjentow();
            document.querySelector("#pacjenci").hidden=false;
            document.querySelector("#klient_szczegoly").hidden=true;
        }
    });
    document.querySelector("#btn_powrot_pacjenci").addEventListener("click",()=>{
        document.querySelector("#pacjenci").hidden=false;
        document.querySelector("#klient_szczegoly").hidden=true;
    });
}
      
function wypelnijListePacjentow() {
    const tabelaPacjentow = document.querySelector("#pacjenci tbody");
    tabelaPacjentow.innerHTML = "";
    const templateWiersz = document.querySelector("#wiersz_pacjenci").content;
    danePacjentow.forEach(pacjent => {
        const templateTR = templateWiersz.querySelector("tr");
        const wiersz = templateWiersz.cloneNode(true);
        const komorki = wiersz.querySelectorAll("td span");
        komorki[0].textContent = pacjent.Imie;
        komorki[1].textContent = pacjent.Nazwisko;
        komorki[2].textContent = pacjent.Tel;
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
    szczegolyImie.value = pacjent.Imie;
    const szczegolyNazwisko = document.querySelector("#szczegoly_nazwisko");
    szczegolyNazwisko.value = pacjent.Nazwisko;
    const szczegolyTelefon = document.querySelector("#szczegoly_telefon");
    szczegolyTelefon.value = pacjent.Tel;
    const sekcjaPacjenci = document.querySelector("#pacjenci");
    sekcjaPacjenci.hidden = true;
    const sekcjaSzczegoly = document.querySelector("#klient_szczegoly");
    sekcjaSzczegoly.hidden = false;
  }

  let danePacjentow = [
    { "id": "1",
      "Imie": "Wojciech",
      "Nazwisko": "Olejarz",
      "Tel": "121223"},
     {"id": "2",
      "Imie": "Magdalena",
     "Nazwisko": "Goszkowska",
     "Tel": "45093409"},
     {"id": "3",
      "Imie": "Aleksandra",
     "Nazwisko": "Olejarz",
     "Tel": "7054094"},
     {"id": "4",
      "Imie": "Zbigniew",
     "Nazwisko": "Jabłoński",
     "Tel": "09845809"},
     {"id": "5",
      "Imie": "Beata",
     "Nazwisko": "Olejarz",
     "Tel": "094580934"},
  ]

  const sekcje = ["menu_glowne","pacjenci","zabiegi","kalendarz","klient_szczegoly"]

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
         
