// Dimensiones del mapa.
const WIDTH = 400;
const HEIGHT = 400;

// Objeto para indicar la situación de objetivo (tesoro).
let target = {
    x: getRandomNumber(WIDTH),
    y: getRandomNumber(HEIGHT)
};

console.log(target);

// Refencia al canvas.
let $map = document.getElementById('map');
// Contexto del canvas.
let ctx = $map.getContext('2d');
// Instanciamos un objeto Image.
let img = new Image();
// Establecemos al objeto la fuente.
img.src = 'assets/img/busquedadeltesoro/map.jpg';
// Si ejecutamos el método drawImage() puede que se cargue la 
// imagen en el canvas o no. Esto se debe a que solo se ejecuta 
// si la imagen está ya descargada, en caso contrario no pinta
// nada. Para solucionarlo, debemos saber si la imagen se ha cargado,
// gestionando su evento onload, que se ejecuta si la imagen está
// cargada.
img.onload = function() {
    ctx.drawImage(img, 0, 0);
}


let $info = document.getElementById('info');
let $icon = document.getElementById('icon');
let $intentos = document.getElementById('intentos');
let $coordenadas = document.getElementById('coordenadas');
let clicks = 0;

// Manejo del evento click sobre el mapa.
$map.addEventListener('click', function(e) {
    clicks++;
    let distance = getDistance(e, target);
    let distanceHint = getDistanceHint(distance);

    let msg, img;

    switch(distanceHint) {
        case 1: 
            msg = 'Hirviendo, casi lo tienes';
            img = '<img src="assets/img/busquedadeltesoro/muy-caliente.png" alt="hirviendo"/>';
            break;
        case 2: 
            msg = 'Muy caliente, te acercas';
            img = '<img src="assets/img/busquedadeltesoro/muy-caliente.png" alt="muy caliente"/>';
            break;
        case 3: 
            msg = 'Caliente, vas por buen camino';
            img = '<img src="assets/img/busquedadeltesoro/caliente.png" alt="caliente"/>';
            break;
        case 4: 
            msg = 'Frio, sigue buscando';
            img = '<img src="assets/img/busquedadeltesoro/frio.png" alt="frio"/>';
            break;
        case 5: 
            msg = 'Muy frio, sigue buscando';
            img = '<img src="assets/img/busquedadeltesoro/muy-frio.png" alt="muy frio"/>';
            break;
        case 6: 
            msg = 'Congelado, sigue buscando';
            img = '<img src="assets/img/busquedadeltesoro/congelado.png" alt="congelado"/>';
            break;
    }

    $info.innerHTML = `
        ${msg}
    `;
    $icon.innerHTML = `
        ${img}
    `;
    $intentos.innerHTML = `
        Intentos: ${clicks}
    `;

    if(distance < 20) {
        Swal.fire({
            title: 'ENHORABUENA',
            text: `Has encontrado el tesoro en ${clicks} intentos`,
            imageUrl: 'assets/img/busquedadeltesoro/tesoro.png',
            imageWidth: 128,
            imageHeight: 128,
            imageAlt: 'Tesoro',
        });
        
        $info.innerHTML = `
            <button class="btn btn-primary" onclick="reload()">Volver a jugar</button>
        `;
        $icon.innerHTML = `
            <img src="assets/img/busquedadeltesoro/tesoro.png" alt="Tesoro"/>
        `;
    }
});

// Manejo del evento mover ratón.
$map.addEventListener('mousemove', function(e) {
    $intentos.innerHTML = `
        Coordenadas del ratón: X -> ${e.offsetX}, Y -> ${e.offsetY}
    `;
});

function reload() {
    location.reload();
}