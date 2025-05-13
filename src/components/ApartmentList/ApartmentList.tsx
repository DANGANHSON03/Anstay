import React from 'react';
import { useNavigate } from 'react-router-dom';

const ApartmentList = ({ listings }) => {
  const navigate = useNavigate();

  const handleApartmentClick = (listing) => {
    const encodedName = encodeURIComponent(listing.name).replace(/%20/g, '-');
    navigate(`${baseUrl}/${encodedName}/view`);
  };

  return (
    <div>
      {listings.map((listing) => (
        <div key={listing.id} onClick={() => handleApartmentClick(listing)}>
          <h2>{listing.name}</h2>
          <p>{listing.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ApartmentList;