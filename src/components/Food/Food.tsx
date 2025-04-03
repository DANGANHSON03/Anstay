import React from 'react'
import { useState } from 'react';
import './Food.css';
const Food = () => {
    const images = [  
        "https://i.ibb.co/fYxX5S6S/Menu-o-Ng-c-V-ng-Anstay-h-nh-nh-4.jpg",
        "https://i.ibb.co/3mJhMjvZ/Menu-o-Ng-c-V-ng-Anstay-h-nh-nh-2.jpg",
        "https://i.ibb.co/DD8WJ09H/Menu-o-Ng-c-V-ng-Anstay-h-nh-nh-6.jpg",
        "https://i.ibb.co/JwtQnQk1/Menu-o-Ng-c-V-ng-Anstay-h-nh-nh-1.jpg",
        "https://i.ibb.co/xSxjFR2c/Menu-o-Ng-c-V-ng-Anstay-h-nh-nh-5.jpg",
        "https://i.ibb.co/hJ8t7jHX/Menu-o-Ng-c-V-ng-Anstay-h-nh-nh-7.jpg",
        
      
      ];

  return (
    <div className='food-container'>
       {images.map((src, index) => (
        <div key={index} className="food-item">
          <img src={src} alt={`Menu ${index + 1}`} />
        </div>
      ))}
    </div>
  )
}


export default Food;
