import React, { useState } from 'react';
import './Administrador.css'; 

const Administrador = () => {
    const [titulo, setTitulo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [stock, setStock] = useState('');
    const [imagen_url, setImagenUrl] = useState('');
    const [fecha, setFecha] = useState('');
    const [nombreAutor, setNombreAutor] = useState('');
    const [biografiaAutor, setBiografiaAutor] = useState('');
    const [idEliminar, setIdEliminar] = useState('');
    const [idActualizar, setIdActualizar] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Función para agregar un nuevo libro y autor
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!titulo || !nombreAutor || !categoria || !precio || !descripcion || !stock || !imagen_url || !fecha || !biografiaAutor) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        const libro = {
            titulo,
            categoria,
            precio: parseFloat(precio),
            descripcion,  
            stock: parseInt(stock),  
            imagen_url,
            fecha: new Date(fecha).toISOString()  
        };
        
        const autor = {
            nombre: nombreAutor,
            biografia: biografiaAutor,
        };
        
        try {
            const response = await fetch('http://26.101.227.87:8000/admin/agregar_libro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    libro: libro,
                    autor: autor,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al agregar el autor y el libro');
            }
            
            setSuccess('Autor y libro agregados con éxito!');
            setError(null);

            setTitulo('');
            setCategoria('');
            setDescripcion('');
            setPrecio('');
            setStock('');
            setImagenUrl('');
            setFecha('');
            setNombreAutor('');
            setBiografiaAutor('');
        } catch (error) {
            setError(error.message);
            setSuccess(null);
        }
    };

    // Función para eliminar un libro o autor por ID
    const handleDelete = async (event) => {
        event.preventDefault();

        if (!idEliminar) {
            setError('Debes ingresar un ID para eliminar.');
            return;
        }

        try {
            const response = await fetch(`http://26.101.227.87:8000/admin/eliminar_libro/${idEliminar}`, {
                method: 'DELETE',  
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el libro o autor');
            }

            setSuccess('Libro o autor eliminado con éxito!');
            setError(null);
            setIdEliminar('');
        } catch (error) {
            setError(error.message);
            setSuccess(null);
        }
    };

    // Function to fetch book details for updating
    const fetchBookDetails = async () => {
        if (!idActualizar) {
            setError('Debes ingresar un ID para actualizar.');
            return;
        }

        try {
            const response = await fetch(`http://26.101.227.87:8000/admin/get_libro/${idActualizar}`);
            if (!response.ok) throw new Error('Error al obtener los detalles del libro');
            const data = await response.json();
            
            setTitulo(data.libro.titulo);
            setCategoria(data.libro.categoria);
            setPrecio(data.libro.precio);
            setDescripcion(data.libro.descripcion);
            setStock(data.libro.stock);
            setImagenUrl(data.libro.imagen_url);
            setFecha(data.libro.fecha);
            setNombreAutor(data.autor.nombre);
            setBiografiaAutor(data.autor.biografia);
            setError(null);
        } catch (error) {
            setError(error.message);
            setSuccess(null);
        }
    };

    // Function to update a book by ID
    const handleUpdate = async (event) => {
        event.preventDefault();

        const updatedBook = {
            titulo,
            categoria,
            precio: parseFloat(precio),
            descripcion,
            stock: parseInt(stock),
            imagen_url,
            fecha: new Date(fecha).toISOString(),
        };
        
        const updatedAuthor = {
            nombre: nombreAutor,
            biografia: biografiaAutor,
        };

        try {
            const response = await fetch(`http://26.101.227.87:8000/admin/actualizar_libro/${idActualizar}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ libro: updatedBook, autor: updatedAuthor }),
            });

            if (!response.ok) throw new Error('Error al actualizar el libro o autor');

            setSuccess('Libro y autor actualizados con éxito!');
            setError(null);
            resetFormFields();
            setIdActualizar('');
        } catch (error) {
            setError(error.message);
            setSuccess(null);
        }
    };

    // Helper function to reset form fields
    const resetFormFields = () => {
        setTitulo('');
        setCategoria('');
        setDescripcion('');
        setPrecio('');
        setStock('');
        setImagenUrl('');
        setFecha('');
        setNombreAutor('');
        setBiografiaAutor('');
    };




    return (
        <div className="administrador">
            <h1>Agregar Autor y Libro</h1>
            <form onSubmit={handleSubmit}>
                <h2>Información del Autor</h2>
                <label>Nombre del Autor:</label>
                <input 
                    type="text" 
                    value={nombreAutor} 
                    onChange={(e) => setNombreAutor(e.target.value)} 
                    required 
                />
                
                <label>Biografía del Autor:</label>
                <textarea 
                    value={biografiaAutor} 
                    onChange={(e) => setBiografiaAutor(e.target.value)} 
                    required 
                />

                <h2>Información del Libro</h2>
                <label>Título:</label>
                <input 
                    type="text" 
                    value={titulo} 
                    onChange={(e) => setTitulo(e.target.value)} 
                    required 
                />
                
                <label>Categoría:</label>
                <input 
                    type="text" 
                    value={categoria} 
                    onChange={(e) => setCategoria(e.target.value)} 
                    required 
                />
                
                <label>Precio:</label>
                <input 
                    type="number" 
                    value={precio} 
                    onChange={(e) => setPrecio(e.target.value)} 
                    required 
                />

                <label>Descripción:</label>
                <textarea 
                    value={descripcion} 
                    onChange={(e) => setDescripcion(e.target.value)} 
                    required 
                />

                <label>Stock:</label>
                <input 
                    type="number" 
                    value={stock} 
                    onChange={(e) => setStock(e.target.value)} 
                    required 
                />

                <label>Imagen URL:</label>
                <input 
                    type="text" 
                    value={imagen_url} 
                    onChange={(e) => setImagenUrl(e.target.value)} 
                    required 
                />

                <label>Fecha:</label>
                <input 
                    type="date" 
                    value={fecha} 
                    onChange={(e) => setFecha(e.target.value)} 
                    required 
                />

                <button type="submit">Agregar Autor y Libro</button>
            </form>

            

            <h2>Eliminar Libro o Autor</h2>
            <form onSubmit={handleDelete} method='GET'>
                <label>ID del Libro o Autor a eliminar:</label>
                <input 
                    type="text" 
                    value={idEliminar} 
                    onChange={(e) => setIdEliminar(e.target.value)} 
                    required 
                />
                <button type="submit">Eliminar</button>
            </form>

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <h2>Actualizar Libro o Autor</h2>
            <form onSubmit={fetchBookDetails}>
                <label>ID del Libro o Autor a actualizar:</label>
                <input 
                    type="text" 
                    value={idActualizar} 
                    onChange={(e) => setIdActualizar(e.target.value)} 
                    required 
                />
                <button type="submit">Cargar Datos</button>
            </form>

            {/* Form to update book and author fields after loading data */}
            <form onSubmit={handleUpdate}>
                {/* Fields for updating book and author, similar to handleSubmit */}
                <button type="submit">Actualizar Autor y Libro</button>
            </form>

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        
        </div>
    );
};

export default Administrador;
