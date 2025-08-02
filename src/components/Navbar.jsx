import { Box, Flex, Button, Spacer, Heading,  } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box bg="teal.500" px={6} py={3} color="white">
      <Flex justify="space-between">
        <Heading size="md"><a href="/products">Products</a></Heading> 
        <Flex gap={4} align="center">
          
          {token && <Link to="/my-products">My Products</Link>}
          {token && <Link to="/add-product">Add Product</Link>}
          {token ? (
            <Button size="sm" colorScheme="red" onClick={handleLogout}>Logout</Button>
          ) : (
            <Button size="sm" colorScheme="blue" onClick={() => navigate('/login')}>Login</Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
