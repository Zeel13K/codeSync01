import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditorPage from "./pages/EditorPage";
import './index.css';
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <>
      <div>
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              border: "1px solid #713200",
              padding: "8px",
              color: "#713200",
              primary : "#0094FF",
            },
          }}
        />
      </div>

      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element= { <Home/> }
          />
          <Route 
            path="/editor/:roomId" 
            element={ <EditorPage/> }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App