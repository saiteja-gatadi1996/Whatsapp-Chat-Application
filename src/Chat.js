import React, { useState, useEffect } from 'react';
import {Avatar,IconButton} from "@material-ui/core";
import "./Chat.css";
import MoreVert from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import AttachFile from '@material-ui/icons/AttachFile';



import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

import MicIcon from '@material-ui/icons/Mic';

import { useParams } from 'react-router-dom';
import db from './firebase';

//for server Timestamp we are importing from actual
import firebase from "firebase";
import { useStateValue } from './StateProvider';



function Chat() {
    
    // This input we are going to pass into the message input field
    const[input,setInput]=useState("");

    //     passing random value using used by useState instead of hardcoded number after human/
    const[seed, setSeed]=useState('');
    
    //roomId has to match with what you given here
    const{roomId}=useParams();

    //keep track of the room,whenver we click we get
    const[roomName, setRoomName]= useState("");

    //keep track of the messages
    const[messages, setMessages]=useState([]);

    const[{user}, dispatch]=useStateValue();

    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(setRoomName(snapshot.data().name)))

            db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp','asc').onSnapshot(snapshot=>(setMessages(snapshot.docs.map(doc=>doc.data()))))
        }
    },[roomId])

    //produces random avatar by settingseed
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[roomId]);

    const sendMessage= (e)=>{
        e.preventDefault();
        console.log("You typed ", input);

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            //fetches below from Google Authentication
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),


        })
        //clean input after message was typed
        setInput("");
    }


    return (
        <div className="chat">

        {/* chat header section */}
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>


            <div className="chat__header__info">
                <h3>{roomName}</h3>

    {/* last seen timestamp from last message */}
    <p>last seen {""}
    {new Date(messages[messages.length-1]?.timestamp?.toDate()).toLocaleDateString()
}
    
    </p>
            </div>


            <div className="chat__headerRight">
            <IconButton>
                       <SearchOutlined/>
                   </IconButton>

                <IconButton>
                   <AttachFile/>
                </IconButton>

                 
                <IconButton>
                   <MoreVert/>
                </IconButton>


            </div>
            </div>

            
            {/* chat body section */}  {/* added two classnames */}
            <div className="chat__body">
       {messages.map((message)=>(
           
        <p className={`chat__message ${true &&"chat__reciever"}`}> 
        <span className="chat__name">{message.name}</span>{message.message}
        <span className="chat__timestamp">
            {new Date(message.timestamp?.toDate()).toLocaleTimeString()
 }
        </span>
        </p>
       ))}
       
            </div>

            <div className="chat_footer">
            <InsertEmoticonIcon/>
            <form >
                <input value={input} onChange={e=>setInput(e.target.value)}placeholder="Type a message" type="text"/>
                <button onClick={sendMessage}type="submit">Send a message </button>
            </form>
            <MicIcon/>
            </div>
            
        </div>
    )
}

export default Chat
