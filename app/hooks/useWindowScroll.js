import { useEffect , useState } from "react";

export function useWindowScroll(){
    const [direction , setDirection] = useState(null);
    useEffect(() => {

        let lastY = window.scrollY;

        const handleScroll = () => {
            const currentY = window.scrollY;
            if(currentY > lastY){
                setDirection("down");
            }
            else if (currentY < lastY){
                setDirection("up");
            }

            lastY = currentY;
        }

        window.addEventListener("scroll" , handleScroll);

        return () => window.removeEventListener("scroll" , handleScroll);
     } , []);
     
     
     return {direction};
}