function Main() {
    return `
    <main class="main-container text-center">
        <div id="todas" class="p-5 bg-gray-100">
            <h2 class="text-2xl font-semibold mb-4">Todas las plantas</h2>
            <div class="grid grid-cols-3 gap-6 max-sm:grid-cols-1" id="todasLasPlantas"></div>
        </div>
    
        <div id="invierno" class="p-5 bg-blue-100">
            <h2 class="text-2xl font-semibold mb-4">Plantas de Invierno</h2>
            <div class="grid grid-cols-3 gap-6 max-sm:grid-cols-1" id="contenedorInvierno"></div>
        </div>
    
        <div id="verano" class="p-5 bg-yellow-100">
            <h2 class="text-2xl font-semibold mb-4">Plantas de Verano</h2>
            <div class="grid grid-cols-3 gap-6 max-sm:grid-cols-1" id="contenedorVerano"></div>
        </div>
    </main>

    `
}

document.body.innerHTML = Main();

const fuentes = [ 
    {
        url: "https://alexisrr11.github.io/archivoJson/archivo.json",
        contenedor: document.querySelector("#todasLasPlantas")
    },
    {
        url: "https://alexisrr11.github.io/archivoJson/archivoJson1.json",
        contenedor: document.querySelector("#contenedorInvierno")
    },
    {
        url: "https://alexisrr11.github.io/archivoJson/archivoJson2.json",
        contenedor: document.querySelector("#contenedorVerano")
    }
];

fuentes.forEach(fuente => {
    fetch(fuente.url)
    .then(res => {
        if(!res.ok) throw new Error(`Error al cargar: ${fuente.url}`);
        return res.json();
    })
    .then(data => {
        data.forEach(planta => {
            fuente.contenedor.innerHTML += `
            <div class="p-4 border rounded shadow bg-white text-center">
                <h3 class="text-xl font-bold">${planta.nombre}</h3>
                <img src="${planta.img}" class="h-32 mx-auto object-cover" alt="${planta.nombre}">
                <p>Precio: $${planta.precio}</p>
                <p>${planta.descripcion}</p>
            </div>
            `;
        });
    })
    .catch(error => {
        fuente.contenedor.innerHTML = `<p class="text-red-600">${error.message}</p>`;
    })
})