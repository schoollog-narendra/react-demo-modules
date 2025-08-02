/* eslint-disable prettier/prettier */
import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  HStack,
} from '@chakra-ui/react';

export default function PriceForm({ handlePriceChange }) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    handlePriceChange({
      minPrice: Number(values.minPrice),
      maxPrice: Number(values.maxPrice),
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{marginBottom:"20px"}}>
      <FormControl isInvalid={errors.minPrice} mb={4}>
        <HStack>

        <FormLabel htmlFor='minPrice'>Minimum Price</FormLabel>
        <Input
          id='minPrice'
          placeholder='Minimum Price'
          type='number'
          {...register('minPrice', {
              required: 'Minimum price is required',
              min: { value: 0, message: 'Minimum price must be at least 0' },
            })}
            />
            </HStack>
        <FormErrorMessage>
          {errors.minPrice && errors.minPrice.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.maxPrice} mb={4}>
        <HStack>
        <FormLabel htmlFor='maxPrice'>Maximum Price</FormLabel>
            
        <Input
          id='maxPrice'
          placeholder='Maximum Price'
          type='number'
          {...register('maxPrice', {
              required: 'Maximum price is required',
              min: { value: 0, message: 'Maximum price must be at least 0' },
            })}
            />
            </HStack>
        <FormErrorMessage>
          {errors.maxPrice && errors.maxPrice.message}
        </FormErrorMessage>
      </FormControl>

      <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        Submit
      </Button>
    </form>
  );
}
