const dureeCreneau = 20;
let nombre = 0;
const duree = document.getElementById('duree');
const bilan = document.getElementById('bilan');

function afficher() {
    duree.textContent = String(dureeCreneau);
    bilan.textContent = `${nombre} créneau(x) · ${nombre * dureeCreneau} minute(s)`;
}

document.getElementById('ajouter').addEventListener('click', () => {
    nombre += 1;
    afficher();
});
document.getElementById('reset').addEventListener('click', () => {
    nombre = 0;
    afficher();
});
afficher();
