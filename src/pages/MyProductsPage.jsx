import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, SimpleGrid, Text, Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function MyProductsPage() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:8000/products/my-products', {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => setProducts(res.data));
  }, [token]);

  return (
    <Box p={6}>
      <Heading mb={4}>My Products</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {products.map((p) => (
          <Box key={p._id} p={4} borderWidth="1px" rounded="md">
            <Heading size="md">{p.name}</Heading>
            <Text>{p.description}</Text>
            <Text>${p.price}</Text>
            <Flex mt={2}>
              <Link to={`/edit-product/${p._id}`}>
                <Button colorScheme="blue" size="sm" mr={2}>Edit</Button>
              </Link>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
