import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Input, Textarea, Heading, VStack, useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../main';
export default function AddProductPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const toast = useToast();
  const token = localStorage.getItem('token');

  const handleAddProduct = async (product) => {
    return axios.post('http://localhost:8000/products',
      { ...product, price: Number(product.price) },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  const { mutate: addProduct, isPending } = useMutation({
    mutationFn: handleAddProduct,
    retry: 5,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['products'] });
      toast({ title: 'Product added', status: 'success' });
    },
    onError: () => {
      toast({ title: 'Failed to add product', status: 'error' });
    },
  });

  return (
    <Box className="flex items-center justify-center min-h-screen bg-gray-100">
      <VStack spacing={4} p={6} bg="white" rounded="md" shadow="md">
        <Heading>Add Product</Heading>
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        <Button
          colorScheme="green"
          onClick={() => addProduct({ name, description, price })}
          isLoading={isPending}
        >
          Add Product
        </Button>
      </VStack>
    </Box>
  );
}
