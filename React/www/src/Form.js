import React, { useState } from 'react';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (name.length === 0 || email.length === 0 || message.length === 0) {
      alert('Bitte überprüfen Sie Ihre Felder!');
      return;
    }

    // Data to be sent in the POST request
    const formData = {
      name,
      email,
      message
    };

    try {
      const response = await fetch('/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Clear form fields
      setName('');
      setEmail('');
      setMessage('');

      // Handle successful response
      alert('Formular erfolgreich gesendet!');
    } catch (error) {
      console.error('Es gab ein Problem mit Ihrer Anfrage:', error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name:</label><br />
      <input 
        type="text" 
        id="name" 
        name="name" 
        value={name} 
        onChange={e => setName(e.target.value)} 
      /><br />

      <label htmlFor="email">Email:</label><br />
      <input 
        type="email" 
        id="email" 
        name="email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
      /><br />

      <label htmlFor="message">Message:</label><br />
      <textarea 
        id="message" 
        name="message" 
        rows="4" 
        cols="50" 
        value={message} 
        onChange={e => setMessage(e.target.value)} 
      /><br />
      
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Form;

