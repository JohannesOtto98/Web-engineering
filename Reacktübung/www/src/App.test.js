import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mock für fetch, um die HTTP-Anfragen zu simulieren
global.fetch = jest.fn();

test('Submit form adds a new product', async () => {
  // Mock-Antwort für die GET-Anfrage beim Laden der App
  fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({
      products: []
    })
  });

  // Render App
  const { getByLabelText, getByText } = render(<App />);

  // Warte auf die GET-Anfrage und Überprüfung der initialen Tabellengröße
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(getByText('No products available')).toBeInTheDocument();
  });

  // Fülle das Formular aus und sende es ab, um ein Produkt hinzuzufügen
  fireEvent.change(getByLabelText('Name'), { target: { value: 'Test Product' }});
  fireEvent.change(getByLabelText('Price'), { target: { value: '10.99' }});
  fireEvent.change(getByLabelText('Image URL'), { target: { value: 'https://example.com/image.jpg' }});
  fireEvent.click(getByText('Add Product'));

  // Warte auf die POST-Anfrage und Überprüfung der aktualisierten Tabellengröße
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith('https://api.predic8.de/shop/v2/products/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Test Product',
        price: '10.99',
        image_link: 'https://example.com/image.jpg'
      })
    });
    expect(getByText('Test Product')).toBeInTheDocument();
  });
});

// Weitere Tests können hinzugefügt werden, um das Aktualisieren von Produkten zu überprüfen
