import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../animations/Animation.json';

const LoadingAnimation = () => {
  const defaultOption = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderSettings: {
      preserveAspectRation: 'xMidYMid slice'
    }
  };
  return <Lottie options={defaultOption} height={400} width={400} />;
};

export default LoadingAnimation; 