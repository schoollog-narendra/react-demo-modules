import axios from 'axios';
import {
  useQuery
} from '@tanstack/react-query'
import { Box, Heading, SimpleGrid, Text, Button, Flex, HStack, Link, Spinner, Center, Input, VStack, TagLabel} from '@chakra-ui/react';
import {  useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import PriceForm from '../components/PriceForm';



 const ProductListPage = () => {
   const searchParams = new URLSearchParams(window.location.search);
   const navigate=useNavigate();
   const searchTimeout=useRef(null);
  const [queryParams, setQueryParams]=useState({
    minPrice:searchParams.get('minPrice')||0,maxPrice:searchParams.get('maxPrice')||Infinity, page:searchParams.get('page')||1 , searchString:searchParams.get('searchString')||'', limit:searchParams.get('limit')||10
  })
  const fetchProducts = async (params) => {
    const { minPrice, maxPrice, page, searchString, limit } = params;
    const res = await axios.get(`http://localhost:8000/products`, {
      params: { minPrice, maxPrice, page, searchString, limit },
    });
    return res.data;
  };
    useEffect(() => {
      navigate(`/products?minPrice=${queryParams.minPrice}&maxPrice=${queryParams.maxPrice}&page=${queryParams.page}&searchString=${queryParams.searchString}&limit=${queryParams.limit}`);
    }, [queryParams]);
  const { data, isLoading, error } = useQuery({
    queryKey: ['products',queryParams],
    queryFn: ()=>fetchProducts(queryParams),
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 10 * 1,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchInterval: 1000 * 60 * 10,
  });
  if (error) return <div>Error: {error.message}</div>;
  const handlePageChange=(page)=>{
    setQueryParams(({...queryParams,page}));
    
  }
  const handleSearch=(searchString)=>{
    if(searchTimeout.current){
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(()=>{
      setQueryParams(({...queryParams, searchString,page:1}))
    },2000)
  }
  const handlePriceChange=({minPrice, maxPrice})=>{
    setQueryParams(({...queryParams, minPrice, maxPrice, searchString:"", page:1}));
  }
  return (
    <Box p={6}>
      <Heading mb={4}>All Products</Heading>
      <HStack  justifyContent={"space-between"} margin={10}  alignItems={"top"}>
        <Flex flexDirection={"column"}>
          <Box margin={"15px 15px 10px"} >Search item</Box>
          <Input  width={"50vw"} onChange={(e)=>handleSearch(e.target.value)} type='string' placeholder='Search item'/>
        </Flex>
      <PriceForm handlePriceChange={handlePriceChange}/>
      </HStack>
      
      {isLoading&&<Flex height="50vh" align="center" justify="center">
      <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
    </Flex>}
    
    {!isLoading &&  <><SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {data.data?.map((p) => (
          <Box key={p._id} p={4} borderWidth="1px" rounded="md">
            <Heading size="md">{p.name}</Heading>
            <Text>{p.description}</Text>
            <Text>${p.price}</Text>
          </Box>
        ))}
      </SimpleGrid>
      <HStack alignItems={"center"} justifyContent={"center"} margin={"20px"}>
        {new Array(data.totalPages).fill(0).map((_,index)=>< Link key={"product_page_"+(index+1)} bgColor="gray.400" _hover={{textDecoration:"none"}}padding={'5px 10px '} borderRadius={2} onClick={(e)=>{
          e.preventDefault();
          handlePageChange(index+1)
        }}>{index+1}</ Link>)}
      </HStack></>}
      {data?.data?.length<1&&<Flex>No data found</Flex>}
    </Box>
  );
}
export default ProductListPage;