async function cargarPropiedades() {
    const response = await fetch('http://localhost:3000/api/propiedades'); // URL del servidor Node.js
    const propiedades = await response.json(); // Respuesta en formato JSON
    const propertiesSection = document.getElementById('properties'); // Contenedor de las propiedades
    propertiesSection.innerHTML = '';

    propiedades.forEach(prop => {
        const card = `
            <div class="property-card">
                <img src="images/${prop.imagen}" alt="${prop.titulo}">
                <div class="info">
                    <h3>${prop.titulo}</h3>
                    <p>${prop.ubicacion}</p>
                    <p>$${prop.precio.toLocaleString()}</p>
                </div>
            </div>
        `;
        propertiesSection.innerHTML += card;
    });
}

cargarPropiedades();
