// src/components/Auth/Register.js
import React from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function Register() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:8000/auth/register', data);
      console.log('User registered:', res.data);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <Heading mb={6} size="lg" textAlign="center">Create Account</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Your name" {...register('name', { required: true })} />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Your email" {...register('email', { required: true })} />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Password" {...register('password', { required: true })} />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">Register</Button>
        </VStack>
      </form>
    </Box>
  );
}
