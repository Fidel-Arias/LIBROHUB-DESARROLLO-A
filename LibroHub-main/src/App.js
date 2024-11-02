import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Componentes/header';
import Home from './Paginas/Home';
import Carrito from './Paginas/Carrito';
import Login from './Paginas/Login';
import LibroDetalles from './Paginas/LibroDetalles';
import Administrador from './Paginas/Administrador';

function App() {
    const [carrito, setCarrito] = useState([]);
    const [usuario, setUsuario] = useState(''); 
    const [libros, setLibros] = useState([]); // Estado para todos los libros
    const [error, setError] = useState(null);

    // Función para obtener libros de la base de datos al cargar la aplicación
    const fetchLibros = async () => {
        try {
            const response = await fetch('http://26.101.227.87:8000', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error('Error al obtener los datos');
            const data = await response.json();
            setLibros(data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchLibros();
    }, []);

    const addToCart = (libro) => {
        setCarrito((prevCarrito) => [...prevCarrito, libro]);
    };

    const removeFromCart = (indexToRemove) => {
        setCarrito((prevCarrito) => prevCarrito.filter((_, index) => index !== indexToRemove));
    };

    const carritoCount = carrito.length;

    return (
        <Router>
            <Header usuario={usuario} carritoCount={carritoCount} />
            <main>
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                <Routes>
                    <Route path="/" element={<Home libros={libros} addToCart={addToCart} />} />
                    <Route path="/carrito" element={<Carrito carrito={carrito} removeFromCart={removeFromCart} />} />
                    <Route path="/login" element={<Login setUsuario={setUsuario} />} />
                    <Route path="/libro/:id" element={<LibroDetalles addToCart={addToCart} />} /> {/* Pasa addToCart aquí */}
                    <Route path="/admin" element={<Administrador setLibros={setLibros} libros={libros} />} />
                </Routes>   
            </main>
        </Router>
    );
}

export default App;
