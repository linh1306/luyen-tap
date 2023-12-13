import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const typeLesson = {
  "question": "fa-duotone fa-check",
  "text": "fa-regular fa-ballot-check"
}

const Home = () => {
  const [indexShow, setIndexShow] = useState(-1)
  const [dataShow, setDataShow] = useState([
    {
      "id": "c001",
      "name": "Cơ sở dữ liệu phân tán",
      "lessons": [
        {
          "id": "ls001",
          "name": "Đề 1",
          "type": "question"
        },
        {
          "id": "ls001",
          "name": "Đề 1",
          "type": "text"
        },
        {
          "id": "ls001",
          "name": "Đề 1",
          "type": "text"
        },
        {
          "id": "ls001",
          "name": "Đề 1",
          "type": "question"
        }
      ]
    },
    {
      "id": "c002",
      "name": "Tư tưởng Hồ Chí Minh",
      "lessons": [
        {
          "id": "ls001",
          "name": "Đề 1",
          "type": "question"
        }
      ]
    },
    {
      "id": "c003",
      "name": "Hệ điều hành",
      "lessons": [
        {
          "id": "ls001",
          "name": "Đề 1",
          "type": "question"
        }
      ]
    }
  ])
  return (
    <div className=''>
      <ul className='flex gap-2 flex-col px-4 py-10'>
        {dataShow.map((couse, indexCouse) => (
          <li key={couse.id} className={`border rounded-lg overflow-hidden ${indexCouse === indexShow ? 'shadow-config' : ""}`}>
            <div onClick={() => setIndexShow(indexCouse === indexShow ? -1 : indexCouse)} className={`transition-all flex justify-between border-b-[1px] items-center px-3 py-4 cursor-pointer hover:bg-slate-300 ${indexCouse === indexShow ? "text-blue-500 bg-slate-300" : ""}`}>
              <h1>{couse.name}</h1>
              <i className={`fa-regular ${indexCouse === indexShow ? "fa-caret-down" : "fa-caret-up"}`}></i>
            </div>
            <div className={`transition-all duration-500 grid ${indexCouse === indexShow ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="flex flex-col overflow-hidden">
                {couse.lessons.map((lesson, indexLesson) => (
                  <Link key={indexLesson} className='px-5 py-2 flex items-center gap-2 text-while border-t-[1px] cursor-pointer hover:bg-slate-300' to={"/" + lesson.type + "/" + lesson.id}>
                    <i className={typeLesson[lesson.type] + " text-xs"}></i>
                    <p>{lesson.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;