const claveApi = "5UrNZxLdGXt3A3rGwGD4vmbkAcSNViF7a1uRKFoc2wuyuUx6Cc5nnaf5";
const campoBusqueda = document.getElementById("campo-busqueda");
const galeriaImagenes = document.getElementById("galeria-imagenes");

const cantidadImagenesPorDefecto = 20;

let imagenesMostradas = [];

function mostrarImagenesAleatorias() {
    fetch(`https://api.pexels.com/v1/curated?per_page=${cantidadImagenesPorDefecto}&page=${Math.floor(Math.random() * 100) + 1}`, {
        method: "GET",
        headers: {
            "Authorization": claveApi
        }
    })
    .then(respuesta => respuesta.json())
    .then(datos => {
        const imagenes = datos.photos;
        galeriaImagenes.innerHTML = '';

        imagenes.forEach(imagen => {
            if (!imagenesMostradas.includes(imagen.src.large)) {
                const tarjetaImagen = document.createElement("div");
                tarjetaImagen.classList.add("tarjeta-imagen");

                const elementoImagen = document.createElement("img");
                elementoImagen.src = imagen.src.large;
                elementoImagen.alt = imagen.alt;

                tarjetaImagen.appendChild(elementoImagen);
                galeriaImagenes.appendChild(tarjetaImagen);

                imagenesMostradas.push(imagen.src.large);

                if (imagenesMostradas.length >= cantidadImagenesPorDefecto) {
                    return;
                }
            }
        });

        if (imagenesMostradas.length < cantidadImagenesPorDefecto) {
            mostrarImagenesAleatorias();
        }
    })
    .catch(error => {
        console.error("Error al obtener imágenes aleatorias:", error);
    });
}

campoBusqueda.addEventListener("input", function() {
    const consulta = campoBusqueda.value;
    if (consulta) {
        obtenerImagenes(consulta);
    } else {
        galeriaImagenes.innerHTML = '';
        imagenesMostradas = [];
        mostrarImagenesAleatorias();
    }
});

function obtenerImagenes(consulta) {
    fetch(`https://api.pexels.com/v1/search?query=${consulta}&per_page=9`, {
        method: "GET",
        headers: {
            "Authorization": claveApi
        }
    })
    .then(respuesta => respuesta.json())
    .then(datos => {
        const imagenes = datos.photos;
        galeriaImagenes.innerHTML = "";
        imagenes.forEach(imagen => {
            const tarjetaImagen = document.createElement("div");
            tarjetaImagen.classList.add("tarjeta-imagen");

            const elementoImagen = document.createElement("img");
            elementoImagen.src = imagen.src.large;
            elementoImagen.alt = imagen.alt;

            tarjetaImagen.appendChild(elementoImagen);
            galeriaImagenes.appendChild(tarjetaImagen);
        });
    })
    .catch(error => {
        console.error("Error al obtener imágenes:", error);
    });
}

document.addEventListener("DOMContentLoaded", mostrarImagenesAleatorias);
