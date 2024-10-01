import React, { DragEvent } from "react";

interface DraggableLayerProps {
  layerType: string;
  onDragStart: (event: DragEvent<HTMLDivElement>, nodeType: string) => void;
}

const DraggableLayer: React.FC<DraggableLayerProps> = ({
  layerType,
  onDragStart,
}) => {
  return (
    <div
      className="w-[90%] transition-all duration-200 border-2 border-white text-center py-5 rounded-lg hover:bg-white hover:text-black"
      draggable
      onDragStart={(event) => onDragStart(event, layerType)}
    >
      {layerType}
    </div>
  );
};

export default DraggableLayer;
