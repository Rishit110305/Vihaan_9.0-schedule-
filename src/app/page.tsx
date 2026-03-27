'use client';

import React from 'react';
import { motion } from 'framer-motion';





export default function SchedulePage() {
  const nodes = [
    { id: 1, date: "APRIL 11", text: "REGISTRATION BEGINS", x: 20, y: 38, position: 'top' },
    { id: 2, date: "APRIL 11", text: "REGISTRATION ENDS", x: 35, y: 62, position: 'bottom' },
    { id: 3, date: "APRIL 11", text: "EVENT BROCHURE", x: 50, y: 38, position: 'top' },
    { id: 4, date: "APRIL 12", text: "VIHAAN STARTS", x: 65, y: 62, position: 'bottom' },
    { id: 5, date: "APRIL 12", text: "VIHAAN ENDS", x: 80, y: 38, position: 'top' },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#111111] overflow-hidden font-sans flex flex-col items-center justify-center">
      {/* Immersive Comic Texture Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "url('/bg-texture.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />
      
      {/* Top Left Spider Logo - Fixed at viewport edge */}
      <div 
        className="fixed top-0 left-4 z-50 pointer-events-none"
        style={{ width: '120px', height: '240px', mixBlendMode: 'screen', opacity: 0.5 }}
      >
        <img 
          src="/spider-new.png" 
          alt="Spider Logo" 
          className="w-full h-full object-contain object-top pt-4"
        />
      </div>

      <div className="relative w-full max-w-7xl flex-1 flex flex-col justify-center min-h-[800px]">
        {/* The spinning web wheel overlay has been removed per request */}

        {/* Title */}
        <div className="absolute top-4 w-full text-center z-20">
          <motion.h1
            initial={{ scale: 0.85, opacity: 0, y: -30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: 'spring', bounce: 0.3 }}
            className="text-8xl md:text-9xl text-white uppercase font-bangers"
            style={{
              fontStyle: 'italic',
              letterSpacing: '0.05em',
              transform: 'skewX(-6deg)',
              WebkitTextStroke: '0px',
              textShadow: [
                '3px 3px 0 #1a3fff',
                '6px 6px 0 #0028cc',
                '7px 7px 0 #000',
              ].join(', '),
            }}
          >
            EVENT SCHEDULE
          </motion.h1>
        </div>


        {/* To properly use % coordinates in SVG path, we use viewBox 0 0 100 100 */}
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
              {nodes.map((node, i) => {
                  if (i === nodes.length - 1) return null;
                  const next = nodes[i + 1];
                  const midX = (node.x + next.x) / 2;
                  const midY = (node.y + next.y) / 2;
                  
                  return (
                    <g key={`connection-web-${i}`}>
                      <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.4 }}
                        transition={{ duration: 1, delay: i * 0.3 + 0.5 }}
                        d={`M ${node.x} ${node.y + 4} L ${next.x} ${next.y + (next.y > node.y ? -4 : 4)}`}
                        stroke="white"
                        strokeWidth="0.2"
                        strokeDasharray="1 1"
                        fill="none"
                        vectorEffect="non-scaling-stroke"
                      />
                       {/* Place a spider somewhere along the line */}
                       <motion.g 
                         initial={{ opacity: 0 }} 
                         animate={{ opacity: 1 }} 
                         transition={{ delay: i * 0.3 + 1.2 }}
                         style={{ transform: `translate(${midX}%, ${midY}%)`, transformOrigin: 'center' }}
                       >
                         <image
                           href="/spider2.png"
                           x="-1.5"
                           y="-1.5"
                           width="3"
                           height="3"
                           style={{ filter: 'brightness(2) contrast(1.2)', opacity: 0.6, mixBlendMode: 'screen' }}
                         />
                       </motion.g>
                     </g>
                  );
              })}
            </svg>
        </div>

        {/* Timeline Nodes */}
        {nodes.map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.3 + 0.5, type: 'spring' }}
            className="absolute z-20 flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 w-[320px] lg:w-[460px] group cursor-pointer"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            {node.position === 'top' && (
              <h2
                className="text-white font-bangers tracking-widest mb-1 group-hover:-translate-y-1 transition-transform"
                style={{
                  fontSize: '3rem',
                  fontStyle: 'italic',
                  fontWeight: 900,
                  textShadow: '2px 2px 0 #000, -1px -1px 0 #000',
                  letterSpacing: '0.08em',
                }}
              >
                {node.date}
              </h2>
            )}

            {/* Batman logo node */}
            <div className="relative w-full flex items-center justify-center" style={{ aspectRatio: '3 / 1' }}>
              {/* Grey bat with blue wing-edge glow */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src="/bat-logo.png"
                  alt="Bat Node"
                  className="w-full h-full object-contain transition-all duration-300 group-hover:scale-105"
                  style={{
                    filter:
                      'invert(0.38) brightness(0.75) contrast(1.1)'
                      + ' drop-shadow(0 4px 0px #2255ff)'
                      + ' drop-shadow(0 -1px 0px #2255ff)'
                      + ' drop-shadow(0 0 14px rgba(30,90,255,0.45))',
                  }}
                />
              </div>
              {/* Event label inside bat */}
              <span
                className="relative z-10 text-white font-kalam uppercase text-center px-4 w-[85%] leading-[1.1]"
                style={{
                  fontSize: '0.8rem',
                  fontStyle: 'italic',
                  textShadow: '1px 1px 3px #000, 0 0 8px #000',
                  letterSpacing: '0.1em',
                  marginTop: '-5%',
                }}
              >
                {node.text}
              </span>
            </div>

            {node.position === 'bottom' && (
              <h2
                className="text-white font-bangers tracking-widest mt-1 group-hover:translate-y-1 transition-transform"
                style={{
                  fontSize: '3rem',
                  fontStyle: 'italic',
                  fontWeight: 900,
                  textShadow: '2px 2px 0 #000, -1px -1px 0 #000',
                  letterSpacing: '0.08em',
                }}
              >
                {node.date}
              </h2>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Footer Cityscape */}
      <div className="absolute bottom-0 left-0 w-full flex items-end z-0 pointer-events-none h-48 lg:h-72">
        <img src="/skyline1.png" alt="Skyline Left" className="w-1/2 h-full object-fill opacity-90 contrast-50 brightness-[2]" />
        <img src="/skyline2.png" alt="Skyline Right" className="w-1/2 h-full object-fill opacity-90 contrast-50 brightness-[2]" />
      </div>
    </div>
  );
}
