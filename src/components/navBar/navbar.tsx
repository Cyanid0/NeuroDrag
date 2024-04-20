import MenuIcon from './dependencies/menuIcon';

type navBarProp = {
  isOpen: boolean,
  setIsOpen: (x: boolean) => void,
  showGenerate: boolean,
}
function NavBar({ isOpen, setIsOpen, showGenerate }: navBarProp) {

  return (
    <div className="flex sticky top-0 border-black border-b-2 items-center justify-between bg-white w-[100%] h-20">
      <MenuIcon isOpen={isOpen} setIsOpen={setIsOpen} />
      {showGenerate &&
        <div className="flex items-center justify-center w-[13%] h-[80%] text-md text-black border-black rounded-lg border-md border-2 mr-2 hover:text-white hover:bg-black hover:cursor-pointer transition-all duration-200"> Generate Code </div>

      }
    </div>
  );
}

export default NavBar;

