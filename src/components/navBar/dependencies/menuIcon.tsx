import Lottie from "lottie-react";
import menu from '@/../public/icons8-menu.json';
import { useEffect, useRef } from "react";

type iconMenuProp = {
  isOpen: boolean,
  setIsOpen: (x : boolean) => void,
}

function MenuIcon({ isOpen, setIsOpen }: iconMenuProp) {

  const lotRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      lotRef.current?.setDirection(1);
      lotRef.current?.play();
    }
    else {
      lotRef.current?.setDirection(-1);
      lotRef.current?.play();
    }
  }, [isOpen])
  return (
    <Lottie lottieRef={lotRef} loop={false} animationData={menu} className="h-[50%]" onClick={(e) => { 

      setIsOpen(!isOpen) }} 
      initialSegment={[0, 15]} />
  )
}

export default MenuIcon;
