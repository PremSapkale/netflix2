import React from 'react';
import '../styles/TrailerWindow.css';

function TrailerWindow({ videoId, onClose }) {
   const videoUrl = `https://www.youtube.com/embed/${videoId}`;

   return (
      <div className='trailerWindow'>
         <div className='trailerWindow__content'>
            <iframe
               className='trailerWindow__frame'
               title='Youtube player'
               frameborder={0}
               allowFullScreen
               sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
               src={`${videoUrl}?autoplay=0`}
            ></iframe>
            <button className='trailerWindow__closeBtn' onClick={onClose}>
               <img
                  src='arrow-bar-up.svg'
                  alt='Close'
                  style={{
                     filter: 'invert()',
                  }}
               />
            </button>
         </div>
      </div>
   );
}

export default TrailerWindow;
