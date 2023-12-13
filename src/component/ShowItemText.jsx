import React from 'react';

const ShowItemText = ({ item }) => {
  return (
    <div>
      {item.type === 'title' &&
        <p id={item.value} className={`font-medium text-orange-400`} style={{ "fontSize": (3 - item.rank) * 10 + 12 + "px" }}>{item.value}</p>
      }
      {item.type === 'text' &&
        <p className='indent-5 first-letter:uppercase'>{item.value}</p>
      }
      {item.type === 'img' &&
        <img src={item.value} className='w-full' />
      }
      {item.type === 'list' &&
        <ul className='list-disc pl-5'>
          {item.value.map((text, indexText) => (
            <li key={indexText} className=''>{text}</li>
          ))}
        </ul>
      }
    </div>
  );
};

export default ShowItemText;