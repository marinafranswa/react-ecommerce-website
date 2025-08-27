import { useCallback, useEffect } from "react";
import { useAppDispatch ,useAppSelector} from "@store/hooks";
import { actGetProductsByItems ,cartItemChangeQuantity,cartItemRemove } from "@store/cart/cartSlice";
import { Heading } from "@components/common"
import { CartItemList, CartSubtotalPrice } from "@components/ecomerce"
import { Loading } from "@components/feedback";

export default function Cart() {
    const dispatch = useAppDispatch()
    const {items,productsFullInfo, loading, error} = useAppSelector((state) =>state.cart)
    useEffect (() => {
        dispatch(actGetProductsByItems())
    } ,[dispatch]);

    const products = productsFullInfo.map((el)=>({
      ...el,quantity:items[el.id]}));
  
      const changeQuantityHandler = useCallback((id:number,quantity:number) =>{
        dispatch(cartItemChangeQuantity({id,quantity}))
      },[dispatch]);

      const removeItemHandler =useCallback((id:number)=>{
         dispatch(cartItemRemove(id));
      },[dispatch])
      return (
            <>
             <Heading>Cart</Heading>
              <Loading loading={loading} error={error}>
             
                {products.length? (
                    <>
                 <CartItemList 
                products ={products} 
                changeQuantityHandler={changeQuantityHandler}
                removeItemHandler={removeItemHandler}
                />
                <CartSubtotalPrice products={products}/>
                </>
                ):(
                  "your cart is empty"

                )}            
              </Loading>
            </>
  )
}
