// src/components/Auth/Login.js
import React from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:8000/login', data);
      console.log('Login successful:', res.data);
      localStorage.setItem('token', res.data.token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <Heading mb={6} size="lg" textAlign="center">Login</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Your email" {...register('email', { required: true })} />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Password" {...register('password', { required: true })} />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">Login</Button>
        </VStack>
      </form>
    </Box>
  );
}
