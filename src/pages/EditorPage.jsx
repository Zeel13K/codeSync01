import React, { useState } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";
import OpenClose from "../components/OpenClose";
import Avatar from "react-avatar";
import "../index.css";
import "../Editor.css";

function EditorPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [clients, setClients] = useState([
    { socketId: 1, userName: "ZK" },
    { socketId: 2, userName: "SG" },
    { socketId: 3, userName: "AC" },
    { socketId: 4, userName: "AA" },
    { socketId: 5, userName: "AB" },
    { socketId: 6, userName: "AC" },
    { socketId: 7, userName: "AD" },
    { socketId: 8, userName: "AE" },
    { socketId: 9, userName: "AF" },
    { socketId: 10, userName: "AG" },
  ]);

  return (
    <div className="main">
      <div className={`aside flex flex-col justify-between h-full ${isSidebarOpen ? 'openSidebar' : 'closedSidebar'}`}>
        <div className="asideInner flex-1">
          <div className="logo">
            <img src="../public/logo.png" alt="Logo" />
            <img src="../public/CodeSync.png" className="logo2" alt="CodeSync" />
          </div>

          {/* line divider */}
          <div className="botLine w-48 h-1 bg-white"></div>
          {/*  */}

          <h3 className="text-white font-bold">Connected Users</h3>

          <div className="clientList text-white flex flex-wrap gap-3 ml-2 mt-2">
            {clients.map((client) => (
              <div
                className="client flex-1 min-w-[calc(50%-0.9rem)] box-border p-2"
                key={client.socketId}
              >
                <div className="flex flex-col items-center">
                  <Avatar
                    name={client.userName}
                    size="49.3"
                    className="mb-2 rounded-xl"
                  />
                  <div className="username text-sm text-center">
                    {client.userName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto flex flex-col bg-white w-[199.22px] rounded-md space-y-2 mb-2 p-1">
          <button className="copyBtn bg-white text-black rounded font-bold">
            Copy ROOM ID
          </button>
        </div>

        <div className="mx-auto flex flex-col w-[199.22px] bg-[#2CE06E] space-y-2 mb-4 rounded-md p-1 ">
          <button className="leaveBtn rounded font-bold text-white">Leave Room</button>
        </div>
      </div>

      <div className={`editorContent ${isSidebarOpen ? '' : 'fullWidth'}`}>
        <Editor />
      </div>

      <div className={`openClose ${isSidebarOpen ? '' : 'sidebarClosed'}`}>
        <OpenClose toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>
    </div>
  );
}

export default EditorPage;
