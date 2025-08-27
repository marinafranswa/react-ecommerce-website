import type { TProduct } from "@customTypes/product"
import CartItem from "../CartItem/CartItem"


type  CartItemListProps = {
  products: TProduct[];
  changeQuantityHandler:(id:number,quantity:number) => void; //this function does't return anything so its void
  removeItemHandler:(id:number) => void;

};
const CartItemList = ({products,changeQuantityHandler,removeItemHandler}:CartItemListProps) => {
    const renderList = products.map(el => 
    <CartItem 
    key={el.id}
    {...el} 
    changeQuantityHandler ={changeQuantityHandler}
    removeItemHandler ={removeItemHandler}
    />)
  return (
    <div>
      {renderList}
    </div>
  )
}

export default CartItemList
