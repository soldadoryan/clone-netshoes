import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import { ProductList } from './styles';

function Home({ dispatch }) {
  const [ products, setProducts ] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const response = await api.get('/products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price)
      }));

      setProducts(data);
    }

    getProducts();

  }, []);

  const handleAddProduct = (product) => {
    dispatch({
      type: 'ADD_TO_CART',
      product,
    })
  }

  return (
    <ProductList>
      { products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title}/>
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button type="button" onClick={() => handleAddProduct(product)}>
            <div>
              <MdAddShoppingCart size={16} color="#fff" /> 
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      )) }
    </ProductList>
  );
}

export default connect()(Home);