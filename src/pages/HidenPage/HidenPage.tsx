import React, { useState } from 'react'
import './HidenPage.css';
import HidenEn from '../../components/TestPage/English/HidenEn';
import HidenViet from '../../components/TestPage/Vietnam/Hiden';

const HidenPage = () => {
    const [Clicked, setClicked] = useState(true);
    const [language,setLanguage] = useState<'vi'|'en'>("vi");
    const handleClick = () => {
        setClicked(!Clicked);
    };
  return (
    <div className='tab-hiden'>
         <div className='tab-hiden__language'>
            <button onClick={()=>{setLanguage('vi');handleClick()}} className={Clicked ? 'active':''}>Tiếng Việt</button>
            <button onClick={()=>{setLanguage('en');handleClick()}} className={!Clicked? 'active':''}>English</button>
         </div>
         {language === 'vi' ? <HidenViet/> : <HidenEn/>}
    </div>
  )
}

export default HidenPage
