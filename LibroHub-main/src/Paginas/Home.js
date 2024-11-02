import React from 'react';
import Libros from '../Componentes/Libros';

const Home = ({ addToCart }) => {
    return (
        <div>
            <Libros addToCart={addToCart} />  
        </div>
    );
};

export default Home;
