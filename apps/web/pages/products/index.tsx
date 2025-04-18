import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  Image,
  Button,
  VStack,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../src/components/Layout';
import { useCart } from '../../src/contexts/CartContext';
import { useAuth } from '../../src/contexts/AuthContext';

// Mock products data - replace with actual API call
const products = [
  {
    id: '1',
    name: 'Fresh Organic Tomatoes',
    description: 'Locally grown, pesticide-free tomatoes',
    price: 2.99,
    image: '/images/placeholder.jpg',
    category: 'Vegetables',
    stock: 50,
  },
  {
    id: '2',
    name: 'Organic Lettuce',
    description: 'Fresh, crisp lettuce from our farm',
    price: 1.99,
    image: '/images/placeholder.jpg',
    category: 'Vegetables',
    stock: 30,
  },
  {
    id: '3',
    name: 'Organic Carrots',
    description: 'Sweet and crunchy organic carrots',
    price: 3.49,
    image: '/images/placeholder.jpg',
    category: 'Vegetables',
    stock: 40,
  },
];

export default function Products() {
  const router = useRouter();
  const toast = useToast();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    products.reduce((acc, product) => ({ ...acc, [product.id]: 1 }), {})
  );

  const handleQuantityChange = (productId: string, value: number) => {
    setQuantities(prev => ({ ...prev, [productId]: value }));
  };

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantities[product.id],
    });
    setSelectedProduct(product);
    onOpen();
  };

  const handleContinueShopping = () => {
    onClose();
  };

  const handleProceedToCheckout = async () => {
    if (!user) {
      router.push('/auth/login?redirect=/checkout');
      return;
    }

    addToCart({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.image,
      quantity: quantities[selectedProduct.id],
    });

    onClose();
    router.push('/checkout');
  };

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading size="xl">Our Products</Heading>
            <Text color="gray.600" mt={2}>
              Fresh, organic produce from our farm
            </Text>
          </Box>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8}>
            {products.map((product) => (
              <GridItem key={product.id}>
                <Box
                  bg="white"
                  p={6}
                  borderRadius="lg"
                  boxShadow="sm"
                  _hover={{ boxShadow: 'md' }}
                  transition="all 0.2s"
                >
                  <VStack spacing={4} align="stretch">
                    <Image
                      src={product.image}
                      alt={product.name}
                      borderRadius="lg"
                      fallbackSrc="/images/placeholder.jpg"
                    />

                    <Box>
                      <Heading size="md">{product.name}</Heading>
                      <Text color="gray.600" mt={1}>
                        {product.category}
                      </Text>
                    </Box>

                    <Text fontSize="xl" fontWeight="bold" color="farm.primary">
                      ${product.price.toFixed(2)}
                    </Text>

                    <Text color="gray.600">{product.description}</Text>

                    <Text color="gray.600">
                      <strong>Stock:</strong> {product.stock} units available
                    </Text>

                    <HStack spacing={4}>
                      <NumberInput
                        value={quantities[product.id]}
                        onChange={(_, value) => handleQuantityChange(product.id, value)}
                        min={1}
                        max={product.stock}
                        width="120px"
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>

                      <Button
                        leftIcon={<FiShoppingCart />}
                        colorScheme="green"
                        onClick={() => handleAddToCart(product)}
                        flex={1}
                      >
                        Add to Cart
                      </Button>
                    </HStack>
                  </VStack>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </VStack>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Added to Cart</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              {quantities[selectedProduct?.id] || 1} {selectedProduct?.name} has been added to your cart.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleContinueShopping}>
              Continue Shopping
            </Button>
            <Button colorScheme="green" onClick={handleProceedToCheckout}>
              Proceed to Checkout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
} 