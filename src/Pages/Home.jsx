import React from 'react';
// import { useNavigate } from 'react-router-dom'
import ClashPixelBG from '../assets/ClashPixelBG.gif';
import { Button } from 'pixel-retroui';

const Home = () => {
    return (
        <div 
            className="home-container h-screen w-screen bg-contain bg-center flex flex-col items-center justify-center" 
            style={{ backgroundImage: `url(${ClashPixelBG})` }}
        >
            <svg
              viewBox="0 0 500 100"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto bg-"
            >
              <text
                x="50%"
                y="40%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="#F6B639"
                stroke="#310202"
                strokeWidth="5"
                paintOrder="stroke fill"
                className="custom-shadow3 font-bold text-[40px]  pixelify-sans"
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
                
            </svg>
            <Button
                     bg="#DE5027"
                     textColor="#FFF546"
                     borderColor="#310202"
                     shadowColor="#310202"
                     className="px-[50px] text-[24px]"
                    // style={{ backgroundColor: '#E87532', 
                    // fontSize: '9px', 
                    // color: '#F6B639',  
                    // textShadow:'1px 1px #310202', 
                    // border:'0.5px solid #310202',
                    // boxShadow: '1.5px 1.5px 1px #1E3445',
                    // }}
                   >
                    PLAY
                  </Button>
            
                
            </div>
    );
}


export default Home;
