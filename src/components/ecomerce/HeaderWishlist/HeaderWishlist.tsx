import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAppSelector } from "@store/hooks";
import Logo from "@assets/svg/wishlist.svg?react";
import styles from "./styles.module.css";
const {container ,totalNum, pumpAnimate, iconWrapper} =styles;


export default function HeaderWishlist() {

  const navigate = useNavigate();

  const [isAnimate, setIsAnimate] =useState(false);

  const totalQuantity = 0;

  const quantityStyle =`${totalNum} ${isAnimate ? pumpAnimate :""}`


  useEffect(()=>{
    if(!totalQuantity) {
      return;
    }
      setIsAnimate(true);

      const debounce = setTimeout(()=>{
        setIsAnimate(false);
      },300);

      return()=>clearTimeout(debounce);


  },[totalQuantity])

  return (
    //this "onClick={()=>navigate("/cart")" is called programmatic navigation 
    <div className={container} onClick={()=>navigate("/cart")} >
      <div className={iconWrapper}>
      <Logo title="basket icon" />
      {totalQuantity > 0 ?       
        <div className={quantityStyle}>{totalQuantity}</div>
      :null}
      </div>
      <h3>Wishlist</h3>
    </div>
  )
}
