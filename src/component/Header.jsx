import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const [showInfoUser,setShowInfoUser] = useState(false)
  const navItem = [
    {
      path: "/login",
      name: "Login"
    },
    {
      path: "/login",
      name: "login"
    },
    {
      path: "/test",
      name: "Test"
    },
  ]
  useEffect(() => {
    const header = document.getElementById("header")
    window.addEventListener("scroll", () => {
      const containsClass = header.classList.contains("anm-down")
      if (window.scrollY > 0 && !containsClass) {
        header.classList.add("anm-down")
        header.classList.add("fixed")
      }

      if (window.scrollY === 0 && containsClass) {
        header.classList.remove("anm-down")
        header.classList.remove("fixed")
      }
    })
  }, [])

  return (
    <header id='header' className='h-20 relative w-full px-5 flex justify-between items-center bg-slate-300'>
      <div>
        <Link className='' to={"/"}>
          <img className='w-8 object-cover' src="https://firebasestorage.googleapis.com/v0/b/product-a4847.appspot.com/o/icon.png?alt=media&token=1d8033bf-9ba2-4dae-9ebd-518707effe0e" alt="hình ảnh" />
        </Link>
      </div>
      <nav>
        <ul className='flex gap-3 items-center'>
          {navItem.map((item, index) => (
            <li key={index}>
              <NavLink to={item.path}>{item.name}</NavLink>
            </li>
          ))}
          <li className="">
            <div className='relative'>
              <div onClick={()=>setShowInfoUser(true)} className='relative h-11 border-2 rounded-full overflow-hidden cursor-pointer'>
                <img className='h-full' src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png" alt="" />
              </div>
              <div className={'z-50 mt-1 absolute right-0 w-[300px] h-[280px] rounded-lg shadow-config bg-red-800 ' + (showInfoUser?"":"hidden")}></div>
            </div>
            <div onClick={()=>setShowInfoUser(false)} className={'absolute left-0 top-0 w-screen h-screen ' + (showInfoUser?"":"hidden")}></div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;