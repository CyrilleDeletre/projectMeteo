// Fonction générique pour créer des éléments html dynamiquement
function createElementHtml(type, parent, id, className, contenu, event) {
    // Permet de créer un élément html en fonction du paramètre type
    let elementHtml = document.createElement(type);
    // Permet d'ajouter cet élément html à un parent en fonction du paramètre parent
    parent.appendChild(elementHtml);
    // Permet d'ajouter à cet élément html une id et une classe
    elementHtml.id = id;
    elementHtml.className = className;

    // Permet d'ajouter du contenu à cet élément html en fonction du paramètre contenu
    // Si on a crée un élément html de texte : on change le contenu du texte avec le paramètre contenu
    if (type === 'p' || type === 'h2' || type === 'button'){
        elementHtml.textContent = contenu
    }
     
    // // Si on a crée un élément html d'image : on change ajoute une source d'image avec le paramètre contenu

    if (type === 'img'){
        elementHtml.src = contenu
    }
    
    // // Si le paramètre event est présent dans l'élément html, et si il correspond bien à une fonction :
    if (event && typeof event === 'function') {
        // Ajouter un écouteur d'évènement
        elementHtml.addEventListener('click', event);
    }
    // On retourne la variable elementHTML afin de pouvoir l'utiliser en dehors de la fonction
    return elementHtml;
}

// Fonction pour afficher ou non les informations supplémentaires au clique d'une ville
function afficheInfosMeteo(ville) {
    // On créer une variable pour stocker un conteneur pour chaque infos par ville
    let divGlobal = document.getElementById(`divGlobal${ville.nom}`);
    // On lui ajoute le style css display none par défaut et un toggle pour l'affiche ou non au clique
    divGlobal.style.display = (divGlobal.style.display === 'none') ? 'flex' : 'none';
}

// Fetch du json si l'api ne marche pas
fetch('script/apiMeteo.json')

// Fetch de l'api
// fetch('http://57.129.5.9:3000/villes')
    .then(response => response.json())
    .then(data => {
        // On fetch les données de l'api que l'on stocke dans data et on cherche pour chaque ville
        data.forEach(ville => {
            // On créer des div pour afficher les informations
            let divInfos
            let divOtherInfos
            let divGlobal = createElementHtml('div', document.body, `divGlobal${ville.nom}`, 'div-global');
            divGlobal.style.display = 'none';

            // balise p avec le nom de la ville
            createElementHtml('h2', divGlobal, `info${ville.nom}`, `info-${ville.nom.toLowerCase()}`, ville.nom);

            // Div pour afficher les informations (logo / temperature / autre infos)
            divInfos = createElementHtml('div', divGlobal, `divInfos${ville.nom}`, 'div-infos');
            createElementHtml('img', divInfos, `conditionsMeteo${ville.nom}`, `conditions-meteo-${ville.nom.toLowerCase()}`, `/img/${ville.conditionsMeteo}.jpg`);
            createElementHtml('p', divInfos, `temperature${ville.nom}`, `temperature-${ville.nom.toLowerCase()}`, `${ville.temperature}°C`);

            // Div pour afficher les autres infos
            divOtherInfos = createElementHtml('div', divInfos, `divOtherInfos${ville.nom}`, 'div-other-infos');
            createElementHtml('button', document.body, `myButton${ville.nom}`, 'my-button', ville.nom, () => afficheInfosMeteo(ville));
            createElementHtml('p', divOtherInfos, `humidite${ville.nom}`, `humidite-${ville.nom.toLowerCase()}`, `humidité : ${ville.humidite}`);
            createElementHtml('p', divOtherInfos, `precipitations${ville.nom}`, `precipitations-${ville.nom.toLowerCase()}`, `précipitations : ${ville.precipitations}`);
            createElementHtml('p', divOtherInfos, `indiceUV${ville.nom}`, `indice-uv-${ville.nom.toLowerCase()}`, `indice UV : ${ville.indiceUV}`);
        });
    })
    .catch(error => console.error('Error fetching data:', error));








//div globale (bleu)
    //balise p nom
    //div infos (verte)
        //balise img url "conditionsMeteo"
        // balise p temperature
        // div otherInfos (jaune)
            // balise p humidité
            // balise p precipitation
            // balise p indice UV




