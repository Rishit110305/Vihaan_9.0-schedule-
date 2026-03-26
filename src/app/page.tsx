'use client';

import React from 'react';
import { motion } from 'framer-motion';





export default function SchedulePage() {
  const nodes = [
    { id: 1, date: "APRIL 11", text: "REGISTRATION BEGINS", x: 20, y: 32, position: 'top' },
    { id: 2, date: "APRIL 11", text: "REGISTRATION ENDS", x: 35, y: 55, position: 'bottom' },
    { id: 3, date: "APRIL 11", text: "EVENT BROCHURE", x: 50, y: 32, position: 'top' },
    { id: 4, date: "APRIL 12", text: "VIHAAN STARTS", x: 65, y: 55, position: 'bottom' },
    { id: 5, date: "APRIL 12", text: "VIHAAN ENDS", x: 80, y: 32, position: 'top' },
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
        className="fixed top-0 left-0 z-50 pointer-events-none"
        style={{ width: '150px', height: '150px', mixBlendMode: 'screen', opacity: 0.6 }}
      >
        <img 
          src="/spider2.png" 
          alt="Spider Logo" 
          className="w-full h-full object-contain"
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

        {/* Connecting Lines and Spiders */}
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none">
            {nodes.map((node, i) => {
              if (i === nodes.length - 1) return null;
              const next = nodes[i + 1];
              const isDownward = next.y > node.y;
              // Web sagging curve dynamically calculated
              const cpX = (node.x + next.x) / 2;
              const cpY = isDownward ? next.y - 10 : node.y - 10;
              
              const startX = `${node.x}%`;
              const startY = `${node.y}%`;
              const nextX = `${next.x}%`;
              const nextY = `${next.y}%`;
              const cX = `${cpX}%`;
              const cY = `${cpY}%`;

              return (
                <g key={`connection-${i}`}>
                  {/* The sagging web line */}
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.4 }}
                    transition={{ duration: 1, delay: i * 0.3 + 0.5 }}
                    d={`M ${node.x} ${node.y} Q ${cpX} ${cpY} ${next.x} ${next.y}`}
                    // This maps percentages perfectly using vector-effect
                    stroke="white"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    fill="none"
                    // Vector math workaround since browsers don't natively let you do `d="M % %"` inside SVG
                    // I will transform the SVG coordinate space to be 100x100!
                  />
                </g>
              );
            })}
          </svg>
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
            className="absolute z-20 flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 w-56 lg:w-72 group cursor-pointer"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            {node.position === 'top' && (
              <h2 className="text-white text-3xl font-kalam mb-1 group-hover:-translate-y-1 transition-transform tracking-wide" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.8)' }}>
                {node.date}
              </h2>
            )}
            
            <div className="relative w-full aspect-[2.5/1] flex items-center justify-center">
              <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                <img
                  src="/bat-logo.png"
                  alt="Bat Node"
                  className="w-full h-full object-contain filter transition-all duration-300 group-hover:scale-105"
                  style={{
                    filter: 'invert(0.4) brightness(0.6) drop-shadow(0 3px 0px #0050ff) drop-shadow(0 0 10px rgba(0, 80, 255, 0.4))',
                  }}
                />
              </div>
              <span className="relative z-10 text-white text-[10px] lg:text-[12px] font-kalam tracking-wider uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,1)] font-bold px-4 text-center leading-tight">
                {node.text}
              </span>
            </div>

            {node.position === 'bottom' && (
              <h2 className="text-white text-3xl font-kalam mt-2 group-hover:translate-y-1 transition-transform tracking-wide" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.8)' }}>
                {node.date}
              </h2>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Footer Cityscape */}
      <div className="absolute bottom-0 left-0 w-full flex items-end z-0 pointer-events-none">
        <img src="/skyline1.png" alt="Skyline Left" className="w-1/2 h-auto block opacity-90 contrast-50 brightness-[2]" />
        <img src="/skyline2.png" alt="Skyline Right" className="w-1/2 h-auto block opacity-90 contrast-50 brightness-[2]" />
      </div>
    </div>
  );
}
