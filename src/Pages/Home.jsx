import React from 'react';
// import { useNavigate } from 'react-router-dom'
import ClashPixelBG from '../assets/ClashPixelBG.gif';

const Home = () => {
  // const navigate = useNavigate();
  const handlePlayClick=()=>{
  // navigate('/login');
  }
    return (
        <div 
            className="home-container h-screen w-screen bg-cover bg-center flex items-center justify-center" 
            style={{ backgroundImage: `url(${ClashPixelBG})` }}
        >
            <svg
              viewBox="0 0 500 100"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <text
                x="50%"
                y="40%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="#F6B639"
                stroke="#310202"
                strokeWidth="6"
                paintOrder="stroke fill"
                className="custom-shadow3 font-bold text-[6vw] lg:text-[3vw] pixelify-sans"
              >
               CLASH
              </text>
              <text
                x="50%"
                y="67%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="#F6B533"
                stroke="#310202"
                strokeWidth="2"
                paintOrder="stroke fill"
                className="custom-shadow2 font-bold pixelify-sans"
                style={{ fontSize: '8px' }}
              >
              INTO THE UNKNOWN
              </text>
              <foreignObject x="50%" 
              y="101%" 
              width="200" 
              height="40" 
              transform="translate(-100, 0)">
                <div className="flex items-center justify-center h-full">
                  <button   className="px-6 py-0.5 text-white font-bold  hover:bg-opacity-90 pixelify-sans custom-shadow2 rounded-sm button-hover"
                    style={{ backgroundColor: '#E87532', 
                    fontSize: '9px', 
                    color: '#F6B639',  
                    textShadow:'1px 1px #310202', 
                    border:'0.5px solid #310202',
                    boxShadow: '1.5px 1.5px 1px #1E3445',
                    }}
                    onClick = {window.location.href="./login.jsx"}>
                    PLAY
                  </button>
                </div>
              </foreignObject>
              
            </svg>
            
                
            </div>
    );
}
const Loginpg = () => {
  return(
    <div 
    className="home-container h-screen w-screen bg-cover bg-center flex items-center justify-center" 
    style={{ backgroundImage: `url(${ClashPixelBG})` }}
> </div>
  );
}

export default Home;
