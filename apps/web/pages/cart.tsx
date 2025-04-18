import { Box, Container, VStack, HStack, Text, Button, Image, Input, Divider, Heading } from '@chakra-ui/react';
import { FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Layout from '../src/components/Layout';

// Mock cart data - replace with actual state management
const cartItems = [
  {
    id: 1,
    name: 'Organic Tomatoes',
    price: 2.99,
    image: '/images/tomatoes.jpg',
    quantity: 2,
  },
  {
    id: 2,
    name: 'Fresh Apples',
    price: 1.99,
    image: '/images/apples.jpg',
    quantity: 3,
  },
];

export default function Cart() {
  const router = useRouter();
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5.99;
  const total = subtotal + shipping;

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Button
              leftIcon={<FiArrowLeft />}
              variant="ghost"
              onClick={() => router.back()}
              mb={4}
            >
              Continue Shopping
            </Button>
            <Heading size="lg">Shopping Cart</Heading>
          </Box>

          <VStack spacing={4} align="stretch">
            {cartItems.map((item) => (
              <Box key={item.id}>
                <HStack spacing={4} align="center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    boxSize="100px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <Box flex={1}>
                    <Text fontWeight="bold">{item.name}</Text>
                    <Text color="farm.primary" fontWeight="bold">
                      ${item.price.toFixed(2)}
                    </Text>
                  </Box>
                  <HStack>
                    <Input
                      type="number"
                      value={item.quantity}
                      min={1}
                      width="70px"
                    />
                    <Button
                      variant="ghost"
                      colorScheme="red"
                      leftIcon={<FiTrash2 />}
                    />
                  </HStack>
                </HStack>
                <Divider my={4} />
              </Box>
            ))}
          </VStack>

          <Box
            p={6}
            bg="white"
            borderRadius="lg"
            boxShadow="sm"
            borderWidth="1px"
            borderColor="gray.200"
          >
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <Text>Subtotal</Text>
                <Text>${subtotal.toFixed(2)}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text>Shipping</Text>
                <Text>${shipping.toFixed(2)}</Text>
              </HStack>
              <Divider />
              <HStack justify="space-between" fontWeight="bold">
                <Text>Total</Text>
                <Text>${total.toFixed(2)}</Text>
              </HStack>
              <Button
                colorScheme="green"
                size="lg"
                onClick={() => router.push('/checkout')}
              >
                Proceed to Checkout
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Layout>
  );
} 