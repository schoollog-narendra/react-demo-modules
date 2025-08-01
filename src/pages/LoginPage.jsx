import { useState } from 'react';
import { Box, Button, Input, Heading, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8000/auth/login', { email, password });
      localStorage.setItem('token', res.data.access_token);
      toast({ title: 'Login Successful', status: 'success' });
      navigate('/products');
    } catch (error) {
      toast({ title: 'Login Failed', status: 'error' });
    }
  };

  return (
    <Box className="flex items-center justify-center min-h-screen bg-gray-100">
      <VStack spacing={4} p={6} bg="white" rounded="md" shadow="md">
        <Heading>Login</Heading>
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button colorScheme="blue" onClick={handleLogin}>Login</Button>
      </VStack>
    </Box>
  );
}
