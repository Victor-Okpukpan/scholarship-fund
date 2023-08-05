import React, { useState } from 'react';
// @ts-ignore
import broken from '../../../assets/images/broken_img.png';

function ImageWithPlaceholder({ imageUrl, altText }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div>
      {imageError ? (
        <img
          src={broken}
          alt='unable to load image'
          className=' w-full max-h-[150px]'
        />
      ) : (
        <img
          src={imageUrl}
          alt={altText}
          style={{ display: imageLoaded ? 'block' : 'none' }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
      {!imageLoaded && !imageError && (
        <p className='bg-gray-50 h-[100px] w-full'>Loading...</p>
      )}
    </div>
  );
}

export default ImageWithPlaceholder;
