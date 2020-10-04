import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import db from "./firebase";
import {Avatar, IconButton} from "@material-ui/core"
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChats from './SidebarChats';
import { useStateValue } from './StateProvider';


function Sidebar() {
    //from the data layer
    const[{user}, dispatch]=useStateValue();
    const[rooms, setRooms]=useState([]);

    useEffect(()=>{
        const unsubscribe= db.collection('rooms').onSnapshot((snapshot)=>(
            setRooms(snapshot.docs.map((doc)=>({
                id: doc.id,
                data: doc.data(),
            })))
        ))
        //when the components unmount or cleans up it is a best practise
return()=>{
    unsubscribe();
}
    },[])


    return (
        <div className="sidebar">
            
            <div className="sidebar__header">
               <Avatar src={user?.photoURL}/> 
               <div className="sidebar__headerRight">

                {/* IconButton gives a clickable feel */}
                   <IconButton>
                       <DonutLargeIcon/>
                   </IconButton>

                <IconButton>
                   <ChatIcon/>
                </IconButton>

                 
                <IconButton>
                   <MoreVertIcon/>
                </IconButton>
             
              
               </div>
            </div>

            <div className="sidebar__search">

            <div className="sidebar__searchContainer">
                <SearchOutlinedIcon/>
            <input placeholder="Search or start new Chat" type="text"/>

            </div>

            
            </div>

            <div className="sidebar__chats">
                <SidebarChats addNewChat/>
                {/* rather than hardcoding */}
                {/* for every single room we will implicitly return */}
                {rooms.map(room=>(
                    <SidebarChats key={room.id} id={room.id} name={room.data.name}/>
                ))}
                
          
            </div>
        </div>
    )
}

export default Sidebar
