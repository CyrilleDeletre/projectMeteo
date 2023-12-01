
function createElementHtml(type, parent, id, className, contenu, event) {
    let elementHtml = document.createElement(type);
    parent.appendChild(elementHtml);

    elementHtml.id = id;
    elementHtml.className = className;

    //si on a une balise text : on creer du texte
    // if (si on est dans du text = true){
    //     elementHtml.textContent = contenu;
    // }
    // // sinon, si c'est une balise image : 
    // // on créer une source et on donne un chemin a cette source
    // else if(si on est dans une img = true){
    //     elementHtml.src = contenu
    // }
    

    
    
    if (event && typeof event === 'function') {
        elementHtml.addEventListener('click', event);
    }
    return elementHtml;
}

function afficheMeteo(ville) {
    let divGlobal = document.getElementById(`divGlobal${ville.nom}`);
    divGlobal.style.display = (divGlobal.style.display === 'none') ? 'flex' : 'none';
}

fetch('http://57.129.5.9:3000/villes/')
    .then(response => response.json())
    .then(data => {
        data.forEach(ville => {
            let divInfos
            let divOtherInfos
            let divGlobal = createElementHtml('div', document.body, `divGlobal${ville.nom}`, 'div-global');
            divGlobal.style.display = 'none';

            // balise p avec le nom de la ville
            createElementHtml('h2', divGlobal, `info${ville.nom}`, `info-${ville.nom.toLowerCase()}`, ville.nom);

            // Div pour afficher les informations (logo / temperature / autre infos)
            divInfos = createElementHtml('div', divGlobal, `divInfos${ville.nom}`, 'div-infos');
            createElementHtml('img', divInfos, `conditionsMeteo${ville.nom}`, `conditions-meteo-${ville.nom.toLowerCase()}` `src de l'image`);
            createElementHtml('p', divInfos, `temperature${ville.nom}`, `temperature-${ville.nom.toLowerCase()}`, `${ville.temperature}°C`);

            // Div pour afficher les autres infos
            divOtherInfos = createElementHtml('div', divInfos, `divOtherInfos${ville.nom}`, 'div-other-infos');
            createElementHtml('button', document.body, `myButton${ville.nom}`, 'my-button', ville.nom, () => afficheMeteo(ville));
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




