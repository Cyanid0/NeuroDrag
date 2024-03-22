import MenuIcon from './dependencies/menuIcon';

type navBarProp = {
  isOpen: boolean,
  setIsOpen: (x : boolean) => void,
}
function NavBar({ isOpen, setIsOpen }: navBarProp) {


  return (
    <div className="flex sticky top-0 border-black border-b-2 items-center bg-white w-[100%] h-20">
      <MenuIcon isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
  );
}

export default NavBar;

