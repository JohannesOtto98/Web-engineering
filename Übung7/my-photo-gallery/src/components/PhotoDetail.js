import React from 'react';

const PhotoDetail = ({ photo, onDelete, onBack }) => {
  return (
    <div className="photo-detail">
      <button onClick={onBack}>Back to Gallery</button>
      <img src={photo.image} alt={photo.title} />
      <h2>{photo.title}</h2>
      <button onClick={() => onDelete(photo.id)}>Delete Photo</button>
    </div>
  );
};

export default PhotoDetail;
