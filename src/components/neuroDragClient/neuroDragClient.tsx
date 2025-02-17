"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuidv4 } from "uuid";
import NavBar from "@/components/navBar/navbar";
import SideBar from "@/components/sideBar/sideBar";
import DraggableLayer from "@/components/draggableLayer/draggableLayer";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const FlowComponent: React.FC<{
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}> = ({ nodes, setNodes, edges, setEdges }) => {
  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  console.log(edges);
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    />
  );
};

const MainPage: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [showGenerate, setShowGenerate] = useState<boolean>(true);
  const [isNetworkCreated, setIsNetworkCreated] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);

  const { project } = useReactFlow();

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string,
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  useEffect(() => {
    if (nodes.length > 0) {
      setShowGenerate(true);
    } else {
      setShowGenerate(false);
    }
  }, [nodes]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const nodeType = event.dataTransfer.getData("application/reactflow");
    const position = project({
      x: 0,
      y: nodes.length === 0 ? 0 : nodes.length * 100,
    });

    const newNode: Node = {
      id: uuidv4(),
      type: nodeType,
      position,
      data: {
        label: `${nodeType.charAt(0).toUpperCase() + nodeType.slice(1)} Layer`,
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setIsNetworkCreated(true);
  };

  return (
    <>
      <ReactFlowProvider>
        <div className="flex w-full">
          <SideBar isOpen={isSidebarOpen}>
            <DraggableLayer layerType="Input" onDragStart={onDragStart} />
            <DraggableLayer layerType="Dense" onDragStart={onDragStart} />
            <DraggableLayer layerType="Conv" onDragStart={onDragStart} />
            <DraggableLayer layerType="Pooling" onDragStart={onDragStart} />
            <DraggableLayer layerType="Flatten" onDragStart={onDragStart} />
            <DraggableLayer layerType="Dropout" onDragStart={onDragStart} />
            <DraggableLayer layerType="BatchNormalization" onDragStart={onDragStart} />
            <DraggableLayer layerType="Activation" onDragStart={onDragStart} />
            <DraggableLayer layerType="Output" onDragStart={onDragStart} />
          </SideBar>
          <div
            className="w-full h-full relative"
            ref={reactFlowWrapper}
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
          >
            <NavBar
              isOpen={isSidebarOpen}
              setIsOpen={setIsSidebarOpen}
              showGenerate={showGenerate}
              Nodes={nodes}
              Edges={edges}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
            {!isNetworkCreated ? (
              <div className="w-full h-full flex justify-center items-center">
                <h2 className="text-2xl">
                  Welcome to NeuroDrag, just drag and drop to create a Neural
                  Network
                </h2>
              </div>
            ) : (
              !isModalOpen && (
                <FlowComponent
                  nodes={nodes}
                  setNodes={setNodes}
                  edges={edges}
                  setEdges={setEdges}
                />
              )
            )}
          </div>
        </div>
      </ReactFlowProvider>
    </>
  );
};

const Main: React.FC = () => {
  return (
    <ReactFlowProvider>
      <MainPage />
    </ReactFlowProvider>
  );
};
export default Main;
