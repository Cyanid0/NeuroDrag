import MenuIcon from "./dependencies/menuIcon";
import { Node, Edge } from "react-flow-renderer";
import Transpiler from "../transpiler/Transpiler";
type navBarProp = {
  isOpen: boolean;
  setIsOpen: (x: boolean) => void;
  showGenerate: boolean;
  Nodes: Node[];
  isModalOpen: boolean;
  Edges: Edge[];
  setIsModalOpen: (x: boolean) => void;
};
function NavBar({
  isOpen,
  setIsOpen,
  showGenerate,
  Nodes,
  Edges,
  isModalOpen,
  setIsModalOpen,
}: navBarProp) {
  return (
    <div className="flex border-black border-b-2 items-center justify-between bg-white w-[100%] h-20">
      <MenuIcon isOpen={isOpen} setIsOpen={setIsOpen} />
      {showGenerate && (
        <Transpiler
          nodes={Nodes}
          edges={Edges}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
}

export default NavBar;
