document.getElementById('t_libros').addEventListener('click', read_datos);

function read_datos() {
    fetch('http://26.101.227.87:8000', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(result => result.json())
    .then(data => {
        console.log(data);
        const infoElement = document.getElementById('info');

        let htmlContent = '';
        data.forEach(libro => {
            htmlContent += `
                <div>
                    <h3>${libro.titulo}</h3>
                    <p>Autor: ${libro.autor}</p>
                    <p>Categoría: ${libro.categoria}</p>
                    <p>Precio: S/.${libro.precio}</p>
                    <p>Stock: ${libro.stock}</p>
                    <img src="${libro.imagen}" alt="${libro.titulo}" width="100" />
                </div>
                <hr>
            `;
        });
        
        infoElement.innerHTML = htmlContent;
    }).catch(error => {
        console.error('Error al obtener los datos:', error);
    });
}