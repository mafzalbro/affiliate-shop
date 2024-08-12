import React from 'react';
import { FacebookShare, TwitterShare, LinkedinShare, WhatsappShare, TelegramShare } from 'react-share-lite';

export default function SharePopup({ product, onClose, popupRef }) {
  return (
    <div ref={popupRef} className="absolute top-16 right-4 bg-white p-4 rounded-full shadow-lg z-10">
      <div className="flex gap-2 flex-wrap">
        <FacebookShare 
          url={window.location.href} 
          quote={product.title} 
          round 
          borderRadius={32} 
          bgColor="#4267B2" 
          className="p-2"
        />
        <TwitterShare 
          url={window.location.href} 
          title={product.title} 
          round 
          borderRadius={32} 
          bgColor="#1DA1F2" 
          className="p-2"
        />
        <LinkedinShare 
          url={window.location.href} 
          round 
          borderRadius={32} 
          bgColor="#0077B5" 
          className="p-2"
        />
        <WhatsappShare 
          url={window.location.href} 
          title={product.title} 
          round 
          borderRadius={32} 
          bgColor="#25D366" 
          className="p-2"
        />
        <TelegramShare 
          url={window.location.href} 
          round 
          borderRadius={32} 
          bgColor="#0088cc" 
          className="p-2"
        />
      </div>
      <button onClick={onClose} className="mt-4 bg-gray-200 px-4 py-2 rounded-full shadow-md hover:bg-gray-300">
        Close
      </button>
    </div>
  );
}
