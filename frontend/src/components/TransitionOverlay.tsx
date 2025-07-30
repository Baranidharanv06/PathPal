import React from 'react';
import logo from '../assets/logo.png';

interface TransitionOverlayProps {
  isTransitioning: boolean;
}

const TransitionOverlay: React.FC<TransitionOverlayProps> = ({ isTransitioning }) => {
  return (
    <div className={`transition-overlay ${isTransitioning ? 'visible' : ''}`}>
      <img src={logo} alt="PathPal Logo" className="transition-logo" />
    </div>
  );
};

export default TransitionOverlay;
