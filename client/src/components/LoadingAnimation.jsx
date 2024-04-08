import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../animations/Animation.json';
import backgroundImage from "../Images/backgroundImage.webp"; // Import the background image

const LoadingAnimation = () => {
  const defaultOption = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div style={{ 
      backgroundImage: `url(${backgroundImage})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      minHeight: "calc(100vh - 95px)",
      width: '100%',
      display: 'flex',
      justifyContent: 'center', 
      alignItems: 'center',
    }}>
      <Lottie options={defaultOption} height={300} width={300} style={{
        marginBottom: "200px"
      }}/>
    </div>
  );
};

export default LoadingAnimation;
