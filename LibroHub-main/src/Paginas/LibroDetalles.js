import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './LibroDetalles.css'; 

const LibroDetalles = ({ addToCart }) => {
    const { id } = useParams();
    const [libro, setLibro] = useState(null);
    const [error, setError] = useState(null);

    const fetchLibro = async () => {
        try {
            const response = await fetch(`http://26.101.227.87:8000/libro/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) throw new Error('Error al obtener los datos del libro');
            const data = await response.json();
            setLibro(data);
        } catch (error) {
            setError(error.message);
            console.error('Error al obtener los datos:', error);
        }
    };

    useEffect(() => {
        fetchLibro();
    }, [id]);

    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
    if (!libro) return <p>Cargando...</p>;

    return (
        <div className="libro-detalles"> 
            <div className='libro-imagen'>
                <img 
                    height={"70%"}
                    width={"300px"}
                    src={libro.imagen} 
                    alt={libro.titulo} 
                />
            </div>
            <div>
                <h2>{libro.titulo}</h2>
                <p>Autor: {libro.autor}</p>
                <p>Categoría: {libro.categoria}</p>
                <p>Precio: S/.{libro.precio}</p>
                <p>Stock: {libro.stock}</p>
                <p>Descripción: {libro.descripcion}</p>
                
                <button 
                    className="add-to-cart-button" 
                    onClick={() => addToCart(libro)} // Llama a addToCart al hacer clic
                >
                    Añadir al Carrito
                </button>
            </div>
        </div>
    );
};

export default LibroDetalles;
