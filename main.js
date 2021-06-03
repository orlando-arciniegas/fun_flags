let url = 'https://restcountries.eu/rest/v2/all'

async function waitResponse(url) {
    let response = await fetch(url);
    let data = await response.json();

    function search() {
        // Capturo los elementos del HTML //
        let form = document.getElementById('form');
        let field = document.getElementById("field");
        let output = document.getElementById("output");
        let msgError = document.getElementById("msgError");

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            output.innerHTML = ''
            // Convertir la primera letra de la búsqueda en mayúscula //
            function capitalizeLetter(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            }
            // Capturo el valor ingresado por el usuario //
            let findValue = field.value;
            // Guardo el resultado de la función en la variable //
            findValue = capitalizeLetter(field.value.toLowerCase());
  
            // No se ingrese un valor vacío //
            if (findValue == '') {
                return msgError.innerHTML = 'You must write a country name.'    
            }
            // Depurar la búsqueda e ingrese más caracteres //
            if (findValue.length <= 2) {
                return msgError.innerHTML = 'You must enter at least 3 characters.'
            }
            // Filtrar el país //
            data.filter(country => {
          
                let found = country.name.match(findValue);
            
                if (found) {
                    msgError.innerHTML = '';
                    output.innerHTML =
                        `<div class="card" style="width: 18rem;">
                    <img src="${country.flag}" class="card-img-top" alt="bandera-pais">
                    <div class="card-body">
                      <h5 class="card-title">${country.name}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">Capital: ${country.capital}</h6>
                    </div>
                    </div>`
                } 
               
               
            })
        })
    }
    // Llamar la función buscar //
    search();
}

 // Llamar la función asincrona para la API//
waitResponse(url)
    .then()
    .catch(error => {
        console.error(error)
    })
