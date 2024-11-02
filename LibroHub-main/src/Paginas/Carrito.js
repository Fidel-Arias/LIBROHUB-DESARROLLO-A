import React from 'react';
import './Carrito.css';

const Carrito = ({ carrito, removeFromCart }) => {
    const handleProceedToPayment = () => {
        alert("El pago ha procedido con éxito");
    };

    return (
        <div className="carrito-container">
            <h2>Carrito de Compras</h2>
            {carrito.length === 0 ? (
                <p className="empty-message">Aquí se mostrarán los libros añadidos al carrito.</p>
            ) : (
                <div>
                    {carrito.map((libro, index) => (
                        <div className="book-item" key={index}>
                            <img src={libro.imagen} alt={libro.titulo} />
                            <div className="book-info">
                                <h3>{libro.titulo}</h3>
                                <p>Autor: {libro.autor}</p>
                                <p>Precio: S/.{libro.precio}</p>
                            </div>
                            <button className="remove-button" onClick={() => removeFromCart(index)}>
                                Eliminar
                            </button>
                        </div>
                    ))}
                    <button className="proceed-to-payment-button" onClick={handleProceedToPayment}>
                        Proceder con el pago
                    </button>
                </div>
            )}
        </div>
    );
};

export default Carrito;
