import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Divider,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Grid,
  GridItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';
import Layout from '../src/components/Layout';
import { useCart } from '../src/contexts/CartContext';
import { useAuth } from '../src/contexts/AuthContext';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Checkout() {
  const router = useRouter();
  const toast = useToast();
  const { items, updateQuantity, removeFromCart, total } = useCart();
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (id: string, value: number) => {
    updateQuantity(id, value);
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
    toast({
      title: 'Item removed',
      description: 'Item has been removed from your cart',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleCheckout = async () => {
    if (!user) {
      router.push('/auth/login?redirect=/checkout');
      return;
    }

    setLoading(true);
    try {
      // Mock payment processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Order placed',
        description: 'Your order has been placed successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      router.push('/orders');
    } catch (error) {
      toast({
        title: 'Payment failed',
        description: 'Please try again',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <Container maxW="container.xl" py={8}>
          <VStack spacing={4} align="center">
            <Heading size="lg">Your cart is empty</Heading>
            <Text color="gray.600">Add some products to your cart first</Text>
            <Button colorScheme="green" onClick={() => router.push('/products')}>
              Browse Products
            </Button>
          </VStack>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={8}>
          <GridItem>
            <VStack spacing={8} align="stretch">
              <Box>
                <Heading size="lg" mb={4}>Shipping Information</Heading>
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                  <GridItem colSpan={2}>
                    <FormControl>
                      <FormLabel>Full Name</FormLabel>
                      <Input value={user?.name || ''} isReadOnly />
                    </FormControl>
                  </GridItem>

                  <GridItem colSpan={2}>
                    <FormControl>
                      <FormLabel>Address</FormLabel>
                      <Input value={user?.address.street || ''} isReadOnly />
                    </FormControl>
                  </GridItem>

                  <GridItem>
                    <FormControl>
                      <FormLabel>City</FormLabel>
                      <Input value={user?.address.city || ''} isReadOnly />
                    </FormControl>
                  </GridItem>

                  <GridItem>
                    <FormControl>
                      <FormLabel>State</FormLabel>
                      <Input value={user?.address.state || ''} isReadOnly />
                    </FormControl>
                  </GridItem>

                  <GridItem>
                    <FormControl>
                      <FormLabel>ZIP Code</FormLabel>
                      <Input value={user?.address.zipCode || ''} isReadOnly />
                    </FormControl>
                  </GridItem>

                  <GridItem>
                    <FormControl>
                      <FormLabel>Country</FormLabel>
                      <Input value={user?.address.country || ''} isReadOnly />
                    </FormControl>
                  </GridItem>

                  <GridItem>
                    <FormControl>
                      <FormLabel>Phone</FormLabel>
                      <Input value={user?.phone || ''} isReadOnly />
                    </FormControl>
                  </GridItem>

                  <GridItem>
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input value={user?.email || ''} isReadOnly />
                    </FormControl>
                  </GridItem>
                </Grid>
              </Box>

              <Box>
                <Heading size="lg" mb={4}>Payment Information</Heading>
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                  <GridItem colSpan={2}>
                    <FormControl>
                      <FormLabel>Card Number</FormLabel>
                      <Input value={user?.payment.cardNumber || ''} isReadOnly />
                    </FormControl>
                  </GridItem>

                  <GridItem>
                    <FormControl>
                      <FormLabel>Card Holder</FormLabel>
                      <Input value={user?.payment.cardHolder || ''} isReadOnly />
                    </FormControl>
                  </GridItem>

                  <GridItem>
                    <FormControl>
                      <FormLabel>Expiry Date</FormLabel>
                      <Input value={user?.payment.expiryDate || ''} isReadOnly />
                    </FormControl>
                  </GridItem>
                </Grid>
              </Box>
            </VStack>
          </GridItem>

          <GridItem>
            <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
              <Heading size="lg" mb={6}>Order Summary</Heading>
              
              <VStack spacing={4} align="stretch">
                {items.map((item) => (
                  <Box key={item.id}>
                    <HStack spacing={4} align="center">
                      <Box flex={1}>
                        <Text fontWeight="bold">{item.name}</Text>
                        <Text color="gray.600">${item.price.toFixed(2)} each</Text>
                      </Box>

                      <NumberInput
                        value={item.quantity}
                        onChange={(_, value) => handleQuantityChange(item.id, value)}
                        min={1}
                        width="120px"
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>

                      <Text fontWeight="bold" width="100px" textAlign="right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Text>

                      <Button
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <FiTrash2 />
                      </Button>
                    </HStack>
                    <Divider mt={4} />
                  </Box>
                ))}

                <Box>
                  <HStack justify="space-between">
                    <Text fontSize="xl" fontWeight="bold">
                      Total
                    </Text>
                    <Text fontSize="xl" fontWeight="bold">
                      ${total.toFixed(2)}
                    </Text>
                  </HStack>
                </Box>

                <Button
                  colorScheme="green"
                  size="lg"
                  onClick={handleCheckout}
                  width="full"
                  isLoading={loading}
                >
                  Place Order
                </Button>
              </VStack>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Layout>
  );
} 