import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigator = useNavigate();

    const [ roomId , setroomId ] = useState("");
    const [ userName , setuserName ] = useState("");

    const createRoom = (e) => {
        e.preventDefault();
        const id = uuidv4();
        console.log(id);
        setroomId(id);
        toast.success('New Room Created',)
    };

    const joinRoom = () => {

      if (!roomId && !userName) {
        toast.error('ROOM ID & UserName is required');
        return;
    }


      if (!roomId) {
        toast.error('ROOM ID is required');
        return;
    }

    if (!userName) {
        toast.error('USERNAME is required');
        return;
    }

        navigator(`/editor/${roomId}`,{
          state: {
            userName,
          }
        })

    };

    const inputEnter = (e) => {
        if(e.key === 'Enter'){
            joinRoom();
        }
    }




  return (
    <>
    <div className="mainBack">
      
       <div className=" container mx-auto card rounded-xl  ">
         
          <div className="logo m-3 mt-8 ml-9 mb-1">
       
        <div>
        
            <img 
                src="/logo.png" 
                alt="logocodeSync" 
                width={100} 
            /> 
         
        </div>
            
            {/* Line divider */}
            <div className=" lineDivider bg-white h-20  mb-4 "></div>
 
        <div>
            
             <img 
                src="/Codesync.png" 
                alt="codeSyncImg" 
                width={120} 
                className="ml-4 pt-2" 
             /> 
          
         </div>

          </div>

          <div className="title text-white container ml-9 p-1 text-lg mb-3">Paste invitation ROOM ID</div>

        {/* Input fields */}

          <div className="inputFields mx-10">
            
            <input 
            type="text" 
            placeholder="ROOM ID " 
            className="fields rounded-lg" 
            value={roomId}
            onChange={ (e) => setroomId(e.target.value) }
            onKeyUp={inputEnter}
            />

            <input 
            type="text" 
            placeholder="USERNAME" 
            className="fields rounded-lg" 
            value={userName}
            onChange={ (e) => setuserName(e.target.value) }
            onKeyUp={inputEnter}
            />

            <div className="flex justify-center p-3">
            
            <button onClick={ joinRoom } className="joinBtn bg-blue-500 text-white font-bold py-2 px-4 rounded-xl w-1/4">Join</button>
           
            </div>
         
          </div>

          {/* Invite code */}

          <div className="inviteCode text-white flex justify-center align-text-bottom ">
            Don't have an invite? Create 
           
            <a 
            onClick={createRoom} 
            href=""
            className="createNewRoom  transition-all">
              New Room
            </a>
         
          </div>

    </div>    

</div>
    </>
  );
}

export default Home;
