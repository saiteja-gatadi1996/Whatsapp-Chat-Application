import React, { useState, useEffect } from 'react'
import "./SidebarChats.css"
import {Avatar} from "@material-ui/core"
import db from './firebase';
import {Link} from "react-router-dom"

//adding the props id, name which we defined in Sidebar.js
function SidebarChats({id, name, addNewChat}) {

//     passing random value by useState instead of hardcoded number after human/

    const[seed, setSeed]=useState('');
    const[messages, setMessages]=useState('');

    useEffect(()=>{
        if(id){
            db.collection('rooms')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot)=>setMessages(snapshot.docs.map((doc)=>doc.data()))

            )
        }

    },[id]);

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*4000));
    },[])

    //creating a function if they click on AddNewChat

    const createChat=()=>{
        const roomName=prompt("Please enter name for chat room");

        //if they enter something after prompting only
        if(roomName){
            //whenver you enter in the prompt, that name will be saved as room. Ex: EIE room
            db.collection('rooms').add({
                name:roomName,})

        }
    };

    // if it is not addNewChat then i am going to show the normal stuff
    return !addNewChat?(
        //go to this room when you click this on room id
        <Link to={`/rooms/${id}`}>
            
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarChat__info">
            <h2> {name}</h2>
                <p>{messages[0]?.message}</p>
            </div>
        </div>
        
        </Link>
    ): (
        // code for otherwise if it not addNewchat
        <div onClick={createChat} className="sidebarChat">
        <h2>Add new chat</h2>
        </div>
    )
}

export default SidebarChats
