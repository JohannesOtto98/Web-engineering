import React, { useState } from 'react';

const AddPhotoForm = ({ onAddPhoto }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPhoto({ title, image });
    setTitle('');
    setImage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a new photo</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />
      <button type="submit">Add Photo</button>
    </form>
  );
};

export default AddPhotoForm;
