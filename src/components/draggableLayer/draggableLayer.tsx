import React from "react";
import Image from "next/image";
import tooltip from "./dependencies/tooltip-2.svg";

interface LayerProps {
  name: string;
  link: string;
}

const DraggableLayer: React.FC<LayerProps> = ({ name, link }) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text/plain", name);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="relative cursor-grab transition-all flex border-2 w-[100%] h-20 rounded-lg items-center whitespace-nowrap justify-center hover:bg-white hover:text-black"
    >
      {name}
      <a
        href={link}
        className="transition-all cursor-tooltip absolute top-1 right-1"
        target="_blank"
      >
        <Image src={tooltip} alt="tooltip" className="h-5 w-5" />
      </a>
    </div>
  );
};

export default DraggableLayer;
