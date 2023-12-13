import React, { useState } from 'react';

const Test = () => {
  var touchStart = 0;
  const [touch, setTouch] = useState(0);

  const handleTouchStart = (e) => {
    touchStart = e.touches[0].clientX;
  };
  
  const handleTouch = (e) => {
    setTouch(e.changedTouches[0].clientX - touchStart);
  };
  return (
    <div onTouchStart={handleTouchStart}
      onTouchEnd={handleTouch}
      className='w-full relative h-config bg-slate-500'>
      <div className={'absolute w-10 h-10 bg-red-400 transition-all duration-500 ' + (touch < 50 && "-translate-x-full")}>da</div>
    </div>
  );
};

export default Test;