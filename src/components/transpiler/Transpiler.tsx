import React, { useState } from "react";
import Modal from "@/components/modal/Modal";
import { Node, Edge } from "reactflow";

interface TranspilerProps {
  nodes: Node[];
  edges: Edge[];
  isModalOpen: boolean;
  setIsModalOpen: (x: boolean) => void;
}

const Transpiler: React.FC<TranspilerProps> = ({
  nodes,
  edges,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [generatedCode, setGeneratedCode] = useState("");

  const generateCode = () => {
    let code = `import tensorflow as tf\n\nmodel = tf.keras.Sequential()\n`;

    // Map of node IDs to their corresponding node data
    const nodeMap = new Map<string, Node>();
    nodes.forEach((node) => nodeMap.set(node.id, node));

    // Set to track which nodes have already been processed
    const processedNodes = new Set<string>();

    // Helper function to generate code for a node
    const generateLayerCode = (node: Node) => {
      if (!node) return;

      switch (node.type?.toLowerCase()) {
        case "input":
          return `model.add(tf.keras.layers.InputLayer(input_shape=(...)))\n`;
        case "dense":
          return `model.add(tf.keras.layers.Dense(units=..., activation='relu'))\n`;
        case "conv":
          return `model.add(tf.keras.layers.Conv2D(filters=..., kernel_size=(3, 3), activation='relu'))\n`;
        case "pooling":
          return `model.add(tf.keras.layers.MaxPooling2D(pool_size=(2, 2)))\n`;
        default:
          return "";
      }
    };

    // First, process nodes based on edges to maintain connections
    edges.forEach((edge) => {
      const sourceNode = nodeMap.get(edge.source);
      const targetNode = nodeMap.get(edge.target);

      if (sourceNode && !processedNodes.has(sourceNode.id)) {
        code += generateLayerCode(sourceNode);
        processedNodes.add(sourceNode.id);
      }

      if (targetNode && !processedNodes.has(targetNode.id)) {
        code += generateLayerCode(targetNode);
        processedNodes.add(targetNode.id);
      }
    });

    code += `\nmodel.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])\n`;
    setGeneratedCode(code);
  };

  const handleGenerateClick = () => {
    generateCode();
    setIsModalOpen(true);
  };

  return (
    <div>
      <button
        onClick={handleGenerateClick}
        className="border-black border-2 mr-2 hover:bg-black hover:text-white transition-all duration-500 text-black px-3 py-1 rounded"
      >
        Generate Code
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        generatedCode={generatedCode}
      />
    </div>
  );
};

export default Transpiler;
