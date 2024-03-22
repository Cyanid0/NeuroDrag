"use client"
import React, { useState } from "react";
import Image from "next/image";
import SideBar from "@/components/sideBar/sideBar";
import DraggableLayer from "@/components/draggableLayer/draggableLayer";
import NavBar from "@/components/navBar/navbar";
import Cross from "@/../public/error-10375.svg";

const list = [
  {
    name: "Dense Layer",
    link: "https://www.tensorflow.org/api_docs/python/tf/keras/layers/Dense",
  },
  {
    name: "Convolutional Layer",
    link: "https://www.tensorflow.org/api_docs/python/tf/keras/layers/Conv2D",
  },
  {
    name: "Pooling Layer",
    link: "https://www.tensorflow.org/api_docs/python/tf/keras/layers/MaxPool2D",
  },
  {
    name: "Flatten Layer",
    link: "https://www.tensorflow.org/api_docs/python/tf/keras/layers/Flatten",
  },
];

export default function Home() {
  interface Layer {
    name: string;
  }

  const [isOpen, setIsOpen] = useState(true);
  const [droppedLayers, setDroppedLayers] = useState<Layer[]>([]);
  const handleDelete = (index: number) => {
    const newLayers = droppedLayers.filter((_, i) => i !== index);
    setDroppedLayers(newLayers);
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const layerName = event.dataTransfer.getData("text/plain");
    setDroppedLayers([...droppedLayers, { name: layerName }]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <main className="flex h-auto flex-row transition duration-300 overflow-hidden">
      <SideBar isOpen={isOpen}>
        {list.map((item, index) => (
          <DraggableLayer key={index} name={item.name} link={item.link} />
        ))}
      </SideBar>
      <div
        className={`bg-black flex flex-col w-[100%] h-screen z-10`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="overflow-y-scroll h-full">
          {droppedLayers.length > 0 ? (
            <div className="flex flex-col items-center gap-5 mt-10">
              {droppedLayers.map((layer, index) => (
                <div key={index} className="transition-all group relative bg-white/90 hover:bg-white w-1/2 h-20 text-2xl rounded-lg flex text-black items-center justify-center">
                  <div className="absolute top-1 right-1" onClick={() => handleDelete(index)}>
                    <Image src={Cross} alt="cross" className="transition-all group-hover:opacity-100 opacity-0 h-5 w-5 cursor-pointer" />
                  </div>
                  {layer.name}
                </div>
              ))}
            </div>
          )
            :
            (<div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-4xl font-bold">Welcome to NeuroDrag</h1>
              <p className="text-2xl">Drag and drop layers to build your neural network</p>
            </div>
            )
          }
        </div>
      </div>
    </main>
  );
}
