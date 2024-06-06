import React, { useState } from 'react';

const Form = ({ addRow }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (name.length === 0 || email.length === 0 || message.length === 0) {
      alert('Bitte überprüfen Sie Ihre Felder!');
      return;
    }

    // Create new row data
    const newRow = { name, email, message };

    try {
      const response = await fetch('https://api.predic8.de/shop/v2/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRow)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Add the new row to the table
      addRow(result);

      // Clear form fields
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name:</label><br />
      <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} /><br />

      <label htmlFor="email">Email:</label><br />
      <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} /><br />

      <label htmlFor="message">Message:</label><br />
      <textarea id="message" name="message" rows="4" cols="50" value={message} onChange={e => setMessage(e.target.value)}></textarea><br />
      
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Form;
