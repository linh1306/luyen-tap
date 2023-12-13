import React, { useEffect } from 'react';

const TextareaAutoResize = ({ value, onchange, placeholder }) => {
  useEffect(() => {
    handleAutoChange()
  }, [])
  const handleAutoChange = () => {
    const textarea = document.querySelectorAll("textarea")
    textarea.forEach(element => {
      element.style.height = 'auto';
      element.style.height = (element.scrollHeight) + 'px';
    });
  }
  const handleChange = (e) => {
    handleAutoChange()
    onchange(e)
  }
  return (
    <textarea className='resize-none w-full border rounded-lg px-2 py-3 overflow-hidden' rows={1} value={value} onChange={(e) => handleChange(e)} placeholder={placeholder}></textarea>
  );
};

export default TextareaAutoResize;