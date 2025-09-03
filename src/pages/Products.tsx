import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch,useAppSelector } from "@store/hooks";
import { actGetProductsByCatPrefix,productsCleanUp } from "@store/products/productsSlice";
import { Container} from "react-bootstrap";
import { Product } from "@components/ecomerce";
import { Loading } from "@components/feedback";
import { GridList ,Heading } from "@components/common";

export default function Products() {

  const params = useParams();
  const dispatch = useAppDispatch();
  const {loading ,error,records} =useAppSelector((state) => state.products);
  const cartItems = useAppSelector(state => state.cart.items);
  const wishlistItemsId = useAppSelector((state)=>state.wishlist.itemsId)
  
  
  const productsFullInfo = records.map(el =>({
    ...el,
     quantity :cartItems[el.id] || 0,
     isLiked:wishlistItemsId.includes(el.id),
    }));

  useEffect(() =>{
      dispatch(actGetProductsByCatPrefix(params.prefix as string));
      return () =>{
        dispatch(productsCleanUp());
      }
  },[dispatch,params]);


  return (
  <Container>
    <Heading><span className="text-capitalize">{params.prefix}</span> Products</Heading>
    <Loading loading={loading} error={error}>
      <GridList records={productsFullInfo} renderItem={(record) =>  <Product {...record}/>}/>
    </Loading>
   </Container>
  )
}
