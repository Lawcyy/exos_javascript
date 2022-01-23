const page = document.getElementById('canvas');
let size = 1;
let color = ['cornflowerblue', 'orangered', 'pink', 'violet', 'gray', 'darkgreen', 'coral'];

let affichage = document.getElementById("taille");
affichage.innerHTML = size;

window.addEventListener('wheel', function(event) {

    if (event.deltaY < 0) {
        //si l'user scroll vers le haut
        size += 0.5;
    } 
    else if (event.deltaY > 0) {
        //si l'user scroll vers le bas
        size -= 0.5;
    }
        //la taille ne peut pas être négative
    if ( size < 0) {
        size = 0.5;
    }
    let affichage = document.getElementById("taille");
affichage.innerHTML = size;
});

page.onclick = function() {

    // Détecte la position du curseur au moment du click
    let e = window.event;
    
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    x /= rect.width;
    x *= page.width;
    y /= rect.height;
    y *= page.height;

    // Définis l'objet à renvoyer et le renvoie
    let circle = page.getContext('2d');

    circle.fillStyle = color[Math.floor(Math.random() * 7)];
    circle.beginPath();
    circle.arc(x, y, 1+size, 0, 2 * Math.PI, false);
    circle.fill();

}