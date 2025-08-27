import { useEffect } from "react";
import { useAppDispatch,useAppSelector } from "@store/hooks";
import { actGetCategories } from "@store/categories/categoriesSlice";
import { Category } from "@components/ecomerce";
import { Container } from "react-bootstrap";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";


export default function Categories() {
  const dispatch = useAppDispatch();
  const {loading, error, records} = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if(!records.length) {
      dispatch(actGetCategories());
    }
  },[dispatch,records]);



  return (

  
    <Container>
      <Heading>Categories</Heading>
      <Loading status={loading} error={error}>
        <GridList records={records} renderItem={(record) =>  <Category {...record}/>}/>
  
      </Loading>
   </Container>
  

  )
}
