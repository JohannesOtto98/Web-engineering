import React from 'react';

const Table = ({ rows, onUpdate }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Image</th>
          <th>Actions</th> {/* Neue Spalte für Aktionen */}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <td>{row.name}</td>
            <td>{row.price}</td>
            <td><img src={`https://api.predic8.de${row.photo}`} alt={row.name} style={{ maxWidth: '100px' }} /></td>
            <td> {/* Neue Zelle für die Aktionsbuttons */}
              <button onClick={() => onUpdate(row)}>Update</button> {/* onUpdate wird mit dem Produkt aufgerufen */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
