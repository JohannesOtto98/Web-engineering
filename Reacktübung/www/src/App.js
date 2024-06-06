import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Table from './components/Table';
import Form from './components/Form';

const App = () => {
  const [tableRows, setTableRows] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Produkt, das aktualisiert werden soll
  const [isUpdateMode, setIsUpdateMode] = useState(false); // Modus für Aktualisierung oder Hinzufügung

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.predic8.de/shop/v2/products/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const productsWithDetails = await Promise.all(data.products.map(async (product) => {
        const details = await fetchProductDetails(`https://api.predic8.de${product.self_link}`);
        return { id: product.id, name: product.name, ...details }; // Include product id
      }));

      setTableRows(productsWithDetails);
    } catch (error) {
      console.error('Error fetching the products:', error);
    }
  };

  const fetchProductDetails = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return {
        price: data.price,
        photo: data.image_link // Assuming image_link holds the URL of the photo
      };
    } catch (error) {
      console.error(`Error fetching product details from ${url}:`, error);
      return {};
    }
  };

  const addRow = (row) => {
    setTableRows([...tableRows, row]);
  };

  const onUpdate = async (updatedProduct) => {
    try {
      const response = await fetch(`https://api.predic8.de/shop/v2/products/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
      });
      if (!response.ok) {
        throw new Error(`Failed to update product with id ${updatedProduct.id}`);
      }
      // Update the product in tableRows
      const updatedRows = tableRows.map(product => {
        if (product.id === updatedProduct.id) {
          return updatedProduct;
        }
        return product;
      });
      setTableRows(updatedRows);
      setSelectedProduct(null); // Reset selected product
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const setMyFormField = (value) => {
    // Update form field based on the value passed
    // This function can be customized based on the structure of your form
  };

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setIsUpdateMode(true);
    // Auto fill form fields with selected product details
    // Example: setMyFormField(product.name);
  };

  return (
    <div>
      <Header />
      <Table rows={tableRows} onUpdate={handleUpdateClick} />
      <Form addRow={addRow} onUpdate={onUpdate} setMyFormField={setMyFormField} selectedProduct={selectedProduct} isUpdateMode={isUpdateMode} />
    </div>
  );
};

export default App;
