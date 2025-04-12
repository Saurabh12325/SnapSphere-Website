
import { faWpexplorer } from '@fortawesome/free-brands-svg-icons'
import { faCommentAlt, faComments, faHeart, faHourglassEmpty, faPlusSquare } from '@fortawesome/free-regular-svg-icons'
import {  faHomeUser, faHouse, faHouseLaptop, faRightFromBracket, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { toast } from 'react-toastify'


const SideBarItems = [

    {icon:<FontAwesomeIcon icon={faHomeUser} />, text:'Home' },
    {icon:<FontAwesomeIcon icon={faSearch} />, text:'Search'},
    {icon:<FontAwesomeIcon icon={faWpexplorer} />, text:'Explore'},
    {icon:<FontAwesomeIcon icon={faComments} />, text:'Messages' },
    {icon:<FontAwesomeIcon icon={faHeart} />, text:'Notifications' },
    {icon:<FontAwesomeIcon icon={faPlusSquare} />, text:'Create' }, 
    {icon:<FontAwesomeIcon icon={faUserCircle} />, text:'Profile' },
    {icon:<FontAwesomeIcon icon={faRightFromBracket} />, text:'Logout' }
]   
function LeftSideBar() {
    const LogoutHandler = ()=>{
        try{
            //  const res  = await axios.get('');
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message);
        }
    }
    return (
       <div className='fixed z-10 top-0 left-0 w-[16%] border-r border-gray-200 '>
      <div className='flex flex-col'>
        <h1>Logo</h1>
        <div>
        {
         SideBarItems.map((item, index) => (
            <div key={index} className='flex items-center gap-4 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'>
                {item.icon} 
                <span>{item.text}</span>
            </div>
        ))}
        </div>
     
      </div>
       </div>
    )
}

export default LeftSideBar
