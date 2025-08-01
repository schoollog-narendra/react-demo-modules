import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Input, Textarea, Heading, VStack, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../main';

export default function EditProductPage() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const toast = useToast();
  const token = localStorage.getItem('token');

   useEffect(() => {
      axios.get(`http://localhost:8000/products/${id}`).then((res)=>{
        setName(res.data.name);
        setDescription(res.data.description);
        setPrice(res.data.price);
      })
  }, [id]);

  const handleUpdate = async () => {
     await axios.patch(`http://localhost:8000/products/${id}`,
        { name, description, price: Number(price) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
  };
  const { mutate: updateProductQuery, isPending } = useMutation({
    mutationFn: handleUpdate,
    
    
    onError: (error, variables, context)=>{
      toast({ title: 'Failed to update product onError toast', status: 'error' });
    },
    onSuccess: (d)=>{
      toast({ title: 'Product updated onSuccess toast', status: 'success' });
      queryClient.invalidateQueries({queryKey: ['products']});
     
    }
  })

  return (
    <Box className="flex items-center justify-center min-h-screen bg-gray-100">
      <VStack spacing={4} p={6} bg="white" rounded="md" shadow="md">
        <Heading>Edit Product</Heading>
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        <Button colorScheme="blue" onClick={()=>updateProductQuery()} isLoading={isPending}>Update Product</Button>
      </VStack>
    </Box>
  );
}
