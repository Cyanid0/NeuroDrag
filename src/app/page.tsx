"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import SideBar from "@/components/sideBar/sideBar";
import DraggableLayer from "@/components/draggableLayer/draggableLayer";
import NavBar from "@/components/navBar/navbar";
import Cross from "@/../public/error-10375.svg";

const list = [
  {
    name: "Dense Layer",
    link: "https://www.tensorflow.org/api_docs/python/tf/keras/layers/Dense",
    funcName: "Dense",
    parameters: ["units"],
  },
  {
    name: "Convolutional Layer",
    link: "https://www.tensorflow.org/api_docs/python/tf/keras/layers/Conv2D",
    funcName: "Conv2D",
    parameters: ["filters", "kernel_size"],
  },
  {
    name: "Pooling Layer",
    link: "https://www.tensorflow.org/api_docs/python/tf/keras/layers/MaxPool2D",
    funcName: "MaxPooling2D",
    parameters: ["pool_size"],
  },
  {
    name: "Flatten Layer",
    link: "https://www.tensorflow.org/api_docs/python/tf/keras/layers/Flatten",
    funcName: "Flatten",
    parameters: [],
  },
];

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);
  const [droppedLayers, setDroppedLayers] = useState([]);
  const [islayers, setIslayers] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  const handleDelete = (index:any) => {
    const newLayers = droppedLayers.filter((_, i) => i !== index);
    setDroppedLayers(newLayers);
  };

  useEffect(() => {
    if (droppedLayers.length > 0) {
      let code = "import tensorflow as tf\n\nmodel = tf.keras.Sequential([\n";
      droppedLayers.forEach((layer) => {
        const validLayer = list.find((item) => item.name === layer.name);
        if (validLayer) {
          code += `    tf.keras.layers.${validLayer.funcName}(`;
          if (validLayer.parameters.length > 0) {
            code += `\n        `;
            validLayer.parameters.forEach((param, index) => {
              if (index > 0) code += `, `;
              code += `${param}=${layer.parameters[param]}`;
            });
            code += `\n    ),\n`;
          } else {
            code += `),\n`;
          }
        } else {
          console.error(`Invalid layer name: ${layer.name}`);
        }
      });
      code += "])";
      setGeneratedCode(code);
    }
  }, [droppedLayers]);

  const handleDrop = (event) => {
    event.preventDefault();
    const layerName = event.dataTransfer.getData("text/plain");
    setDroppedLayers([...droppedLayers, { name: layerName, parameters: {} }]);
  };

  useEffect(() => {
    if (droppedLayers.length > 0) {
      setIslayers(true);
    } else {
      setIslayers(false);
    }
  }, [droppedLayers]);

  const handleGenerate = () => {
    console.log(generatedCode);
  };

  const handleExpand = (index) => {
  
      }

  const handleParamChange = (layerIndex, paramName, paramValue) => {
    setDroppedLayers((prevLayers) => {
      const updatedLayers = [...prevLayers];
      updatedLayers[layerIndex].parameters[paramName] = paramValue;
      return updatedLayers;
    });
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
        onDragOver={(event) => event.preventDefault()}
      >
        <NavBar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          showGenerate={islayers}
          handleGenerate={handleGenerate}
        />
        <div className="overflow-y-scroll h-full">
          {droppedLayers.length > 0 ? (
            <div className="flex flex-col items-center gap-5 mt-10">
              {droppedLayers.map((layer, index) => (
                <div
                  key={index}
                  className="transition-all group relative bg-white/90 hover:bg-white w-1/2 h-20 text-2xl rounded-lg flex text-black items-center justify-center"
                  //it should expand on click like an accordion
                  onClick={() => handleExpand(index)}
                >
                  <div
                    className="absolute top-1 right-1"
                    onClick={() => handleDelete(index)}
                  >
                    <Image
                      src={Cross}
                      alt="cross"
                      className="transition-all group-hover:opacity-100 opacity-0 h-5 w-5 cursor-pointer"
                    />
                  </div>
                  <div className="transition-all group-hover:opacity-100 opacity-0 absolute left-5">
                   >
                  </div>
                  {layer.name! || "Layer"}
                  <div className="hidden">
                  {list.find((item) => item.name === layer.name).parameters.map(
                    (param, index) => (
                      <div key={index} className="z-[0]">
                        <label htmlFor={`${layer.name}-${param}`}>
                          {param}:
                        </label>
                        <input
                          type="text"
                          id={`${layer.name}-${param}`}
                          value={layer.parameters[param] || ""}
                          onChange={(event) =>
                            handleParamChange(
                              index,
                              param,
                              event.target.value
                            )
                          }
                        />
                      </div>
                    )
                  )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-4xl font-bold">Welcome to NeuroDrag</h1>
              <p className="text-2xl">
                Drag and drop layers to build your neural network
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
