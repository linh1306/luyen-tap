import React, { useState } from 'react';
import TextareaAutoResize from './TextareaAutoResize';

const typeOfText =
{
  "title": "Tiêu đề",
  "text": "Văn bản",
  "list": "Danh sách",
  "img": "Hình ảnh"
}

const ChangeItemText = ({ index, texts, setTexts, setStateChange }) => {
  const [fileImg, setFileImg] = useState(null)
  const [showOption, setShowOption] = useState(0)

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileImg(reader.result)
        const tmp = [...texts]
        tmp[index] = { ...texts[index], value: reader.result }
        setTexts(tmp)
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeTypeOf = (type) => {
    if (type === 'list') return []
    return ""
  }

  return (
    <div className='flex flex-col gap-3'>
      {/* Nút thêm 1 khối hiển thị bên trên */}
      <div onClick={() => {
        const tmp = [...texts]
        tmp.splice(index, 0, {
          "value": "",
          "type": "text"
        })
        setTexts(tmp)
      }} className='flex justify-center items-center border-2 py-2 hover:bg-slate-200 cursor-pointer'>
        <i class="fa-solid fa-plus"></i>
      </div>
      {/* Khối chỉnh sửa chính */}
      <div className='flex flex-col gap-3 px-3 py-4 pt-9 rounded-lg shadow-config relative'>
        {/* Nút xóa khối hiển thị */}
        <div onClick={() => {
          const tmp = [...texts]
          tmp.splice(index, 1)
          setTexts(tmp)
        }} className='absolute top-1 right-1 cursor-pointer'>
          <i className="text-xl fa-regular fa-circle-xmark"></i>
        </div>
        {/* Khối list danh sách thể loại khối hiển thị */}
        <div className='flex gap-2'>
          <div className={`flex-1 ${showOption === 1 ? 'shadow-config' : ""}`}>
            <div onClick={() => setShowOption(prop => prop === 1 ? 0 : 1)} className={`transition-all rounded-lg overflow-hidden border flex justify-between border-b-[1px] items-center px-3 py-4 cursor-pointer hover:bg-slate-300`}>
              <h1>{typeOfText[texts[index].type]}</h1>
              <i className={`fa-regular ${showOption === 1 ? "fa-caret-up" : "fa-caret-down"}`}></i>
            </div>
            <div className={`transition-all duration-500 grid ${showOption === 1 ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="flex flex-col overflow-hidden">
                {Object.keys(typeOfText).map((type, indexType) => (
                  <div key={indexType} onClick={() => {
                    const tmp = [...texts]
                    tmp[index] = { value: handleChangeTypeOf(type), type: type }
                    setTexts(tmp)
                    setShowOption(0)
                  }} className='px-5 py-2 flex items-center gap-2 text-while border-t-[1px] cursor-pointer hover:bg-slate-300'>
                    <p>{typeOfText[type]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`flex-1 ${showOption === 2 ? 'shadow-config' : ""} ${texts[index]?.type === "title" ? "" : "hidden"}`}>
            <div id={texts[index].value} onClick={() => setShowOption(prop => prop === 2 ? 0 : 2)} className={`transition-all border rounded-lg overflow-hidden flex justify-between border-b-[1px] items-center px-3 py-4 cursor-pointer hover:bg-slate-300`}>
              <h1>Rank : {texts[index].rank}</h1>
              <i className={`fa-regular ${showOption === 2 ? "fa-caret-up" : "fa-caret-down"}`}></i>
            </div>
            <div className={`transition-all duration-500 grid ${showOption === 2 ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="flex flex-col overflow-hidden">
                {[1, 2, 3].map((rank, indexRank) => (
                  <div key={indexRank} onClick={() => {
                    const tmp = [...texts]
                    tmp[index] = { ...texts[index], rank: rank }
                    setTexts(tmp)
                    setShowOption(0)
                  }} className='px-5 py-2 flex items-center gap-2 text-while border-t-[1px] cursor-pointer hover:bg-slate-300'>
                    <p>{rank}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          {texts[index].type === 'img' &&
            <div>
              <label className=' rounded-lg px-3 py-2' htmlFor="inputImg">
                {
                  fileImg
                    ?
                    <img src={fileImg} alt="Hình ảnh" />
                    :
                    (
                      texts[index].value.startsWith("http")
                        ?
                        <img src={texts[index].value} alt="Hình ảnh" />
                        :
                        <div className='bg-blue-400 flex justify-center items-center py-2 rounded-md text-white  cursor-pointer'>
                          Thêm hình ảnh
                        </div>
                    )
                }
              </label>
              <input type="file" onChange={(e) => handleImageChange(e)} typeof='png, jpg' id='inputImg' hidden />
            </div>
          }
          {texts[index].type === 'list' &&
            <div className='flex flex-col gap-3'>
              {texts[index].value.map((listItem, indexItem) => (
                <div key={indexItem} className='flex items-center gap-3'>
                  <TextareaAutoResize value={listItem} placeholder={"văn bản"} onchange={(e) => setTexts(() => {
                    const tmp = [...texts]
                    const tmpItem = [...texts[index].value]
                    tmpItem[indexItem] = e.target.value
                    tmp[index] = { ...texts[index], value: tmpItem }
                    return tmp
                  })} />
                  <div onClick={() => setTexts(() => {
                    const tmp = [...texts]
                    const tmpItem = [...texts[index].value]
                    tmpItem.splice(indexItem, 1)
                    tmp[index] = { ...texts[index], value: tmpItem }
                    return tmp
                  })} className='cursor-pointer'>
                    <i className="text-xl fa-regular fa-circle-xmark"></i>
                  </div>
                </div>
              ))}
              <div onClick={() => setTexts(() => {
                const tmp = [...texts]
                const tmpItem = [...texts[index].value, ""]
                tmp[index] = { ...texts[index], value: tmpItem }
                return tmp
              })}
                className='flex justify-center text-blue-600 items-center border-2 py-2 hover:bg-slate-200 cursor-pointer'>
                <i class="fa-solid fa-plus"></i>
              </div>
            </div>
          }
          {['text', 'title'].includes(texts[index].type) &&
            <TextareaAutoResize value={texts[index].value} placeholder={"văn bản"} onchange={(e) => setTexts(() => {
              const tmp = [...texts]
              tmp[index] = { ...texts[index], value: e.target.value }
              return tmp
            })} />
          }
        </div>
      </div>
      <div onClick={() => {
        const tmp = [...texts]
        tmp.splice(index + 1, 0, {
          "value": "",
          "type": "text"
        })
        setTexts(tmp)
        setStateChange(index + 1)
      }} className='flex justify-center items-center border-2 py-2 hover:bg-slate-200 cursor-pointer'>
        <i class="fa-solid fa-plus"></i>
      </div>
    </div>
  );
};

export default ChangeItemText;