import axios from 'axios';
import {
  useQuery
} from '@tanstack/react-query'
import { Box, Heading, SimpleGrid, Text, Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';



 const ProductListPage = () => {

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:8000/products');
    return res.data;
  }
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 10,//10 minutes
    cacheTime: 1000 * 10 * 1,//1 seconds
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchInterval: 1000 * 60 * 10,//10 minutes
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box p={6}>
      <Heading mb={4}>All Products</Heading>
      <Button onClick={() => refetch()} colorScheme="blue" mb={4}>Refresh List</Button>
      <Link to="/add-product">
        <Button colorScheme="green" mb={4}>Add Product</Button>
      </Link>
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {data?.map((p) => (
          <Box key={p._id} p={4} borderWidth="1px" rounded="md">
            <Heading size="md">{p.name}</Heading>
            <Text>{p.description}</Text>
            <Text>${p.price}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
export default ProductListPage;