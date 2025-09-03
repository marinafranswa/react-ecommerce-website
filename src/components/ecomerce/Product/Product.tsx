import { memo, useEffect,useState } from "react";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import type { TProduct } from "@customTypes/product";
import Like from '@assets/svg/like.svg?react'
import LikeFill from '@assets/svg/like-fill.svg?react'
import { Button ,Spinner } from "react-bootstrap";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";
import styles from "./styles.module.css";


const { product, productImg ,maximumNotice, wishlistBtn} = styles;

const Product = memo(({id,title,price,img,max,quantity , isLiked }: TProduct)=> {

 const dispatch = useAppDispatch();
 const [isBtnDisabled, setIsBtnDisabled] = useState(false);

 const currentRemainingQuantity = max - (quantity??0);

 const quantityReachedToMax = currentRemainingQuantity <=0 ? true : false;

  useEffect(()=>{
  if(! isBtnDisabled){
    return;
  }
  setIsBtnDisabled(true)

  const debounce = setTimeout(()=>{
        setIsBtnDisabled(false);
      },300);

      return()=> clearTimeout(debounce);

 },[isBtnDisabled]);

 const addToCartHandler = () => {
  dispatch(addToCart(id));

  setIsBtnDisabled(true);
 }

 const likeToggleHandler = () =>{
  dispatch(actLikeToggle(id));
 }
 
  return (
    <div className={product}>
      <div className={wishlistBtn} onClick={likeToggleHandler}>
        {isLiked? <LikeFill/> : <Like/>}
      </div>
        <div className={productImg}>
            <img 
          src={img}
          alt={title}
            />
        </div>
        <h2>{title}</h2>
      <h3>{price.toFixed(2)} EGP</h3>
        <p className={maximumNotice}>{quantityReachedToMax ? "You reached to the limit." : `You can add ${currentRemainingQuantity} item(s)`}</p>
        <Button variant="info" style={{color:"white"}} 
        onClick={addToCartHandler}
        disabled={isBtnDisabled || quantityReachedToMax }
        >
          {isBtnDisabled?<><Spinner animation="border" size="sm"/> Loading ...</> :
           "Add to cart" }
            
        </Button>
      
    </div>
  )
})
export default Product