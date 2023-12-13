import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShowItemText from '../component/ShowItemText';
import ChangeItemText from '../component/ChangeItemText';

const Text = () => {
  const { id } = useParams();
  const [texts, setTexts] = useState([
    {
      "value": "Đề bài",
      "type": "title",
      "rank": 1
    },
    {
      "value": "https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/14/yvA5SpUH-IMG-Worlds-1200x800.jpg",
      "type": "img"
    },
    {
      "value": "Bài làm",
      "type": "title",
      "rank": 1
    },
    {
      "value": "Module tìm kiếm",
      "type": "title",
      "rank": 2
    },
    {
      "value": "Đoạn văn là một khái niệm quan trọng trong viết văn, tạo nên sự tổ chức và sắp xếp logic cho nội dung. Nó không chỉ mang trong mình một nội dung nhất định mà còn phản ánh sự phân đoạn hình thức của văn bản. Mỗi đoạn văn thường bắt đầu bằng một câu chủ đề hoặc một ý chính, từ đó phát triển và mở rộng ý kiến, thông tin hoặc quan điểm của tác giả. Các câu trong đoạn văn liên kết với nhau thông qua những từ nối, ví dụ như, để tạo sự mạch lạc và logic cho nội dung.",
      "type": "text"
    },
    {
      "value": [
        "triệu chứng",
        "liesr"
      ],
      "type": "list"
    },
    {
      "value": "Module duyệt đơn",
      "type": "title",
      "rank": 2
    },
    {
      "value": "Đoạn văn là một khái niệm quan trọng trong viết văn, tạo nên sự tổ chức và sắp xếp logic cho nội dung. Nó không chỉ mang trong mình một nội dung nhất định mà còn phản ánh sự phân đoạn hình thức của văn bản. Mỗi đoạn văn thường bắt đầu bằng một câu chủ đề hoặc một ý chính, từ đó phát triển và mở rộng ý kiến, thông tin hoặc quan điểm của tác giả. Các câu trong đoạn văn liên kết với nhau thông qua những từ nối, ví dụ như, để tạo sự mạch lạc và logic cho nội dung.",
      "type": "text"
    },
    {
      "value": [
        "triệu chứng",
        "liesr"
      ],
      "type": "list"
    }
  ])
  const [testEdit, setTextEdit] = useState(texts)
  const [stateChange, setStateChange] = useState(-1)
  var touchStart = 0;
  const [touch, setTouch] = useState(0);

  const handleTouchStart = (e) => {
    touchStart = e.touches[0].clientX;
  };

  const handleTouch = (e) => {
    setTouch(e.changedTouches[0].clientX - touchStart);
  };
  const scrollToTarget = (id) => {
    const targetElement = document.getElementById(id);
    targetElement.scrollIntoView({ behavior: 'smooth', block: "start" });
  }

  const handleUpdateLesson = () => {
    setStateChange(-1)
  }

  return (
    <div className='grid grid-cols-5 flex-1 relative'>
      {/* Mục lục */}
      <div className={'z-30 absolute md:relative pr-4 md:block md:col-span-1 h-config transition-all duration-500 bg-white shadow-config md:translate-x-0 ' + (touch < 50 && "-translate-x-full")}>
        {testEdit?.map((item, index) => (
          <div key={index}>
            {item.type === 'title' &&
              <p className="cursor-pointer hover:text-blue-400 font-medium" onClick={() => scrollToTarget(item.value)} style={{ "fontSize": (3 - item.rank) * 4 + 12 + "px", "paddingLeft": (item.rank - 1) * 20 + 10 + "px" }}>{item.value}</p>
            }
          </div>
        ))}
      </div>
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouch}
        className='col-span-5 md:col-span-4 h-full overflow-hidden'>
        <div className='w-full flex flex-col gap-3 h-config px-3 py-4 overflow-y-scroll'>
          {/* Thành phần trong trang */}
          {testEdit?.map((item, index) => (
            <div onClick={() => setStateChange(stateChange >= 0 ? index : -1)} key={index} className={stateChange >= 0 && stateChange !== index ? " border p-2" : ""}>
              {stateChange !== index ?
                (
                  <ShowItemText item={item} />
                ) :
                (
                  <ChangeItemText index={index} texts={testEdit} setStateChange={setStateChange} setTexts={setTextEdit} />
                )
              }

            </div>
          ))}
          {(testEdit.length === 0 && stateChange >= 0) && (
            <div onClick={() => setTextEdit([{
              "value": "",
              "type": "text"
            }])} className='flex justify-center items-center border-2 py-2 hover:bg-slate-200 cursor-pointer'>
              <i class="fa-solid fa-plus"></i>
            </div>
          )}
          {/* Nút điều khiển */}
          <div className='flex justify-center items-center flex-col gap-6 py-4'>
            <div className='w-full flex relative justify-center items-center'>
              <hr className='w-1/2 border-2' />
              <div className='absolute rounded-full w-10 aspect-square bg-white flex justify-center items-center '>
                <i className="fa-duotone fa-gear"></i>
              </div>
            </div>
            <div className='flex justify-center'>
              <button hidden={stateChange >= 0} onClick={() => setStateChange(0)} className='px-4 py-2 active:scale-95 bg-blue-400 text-white rounded-lg'>Chỉnh sửa</button>
              <div className={'flex gap-3 ' + (stateChange < 0 ? "hidden" : "")}>
                <button onClick={() => handleUpdateLesson()} className='px-4 py-2 active:scale-95 bg-green-400 text-white rounded-lg'>Lưu thay đổi</button>
                <button onClick={() => {
                  setTextEdit(texts)
                  setStateChange(-1)
                }} className='px-4 py-2 active:scale-95 bg-red-400 text-white rounded-lg'>Hủy</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Text;