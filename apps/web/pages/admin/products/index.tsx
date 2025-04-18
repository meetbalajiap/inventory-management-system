import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Image,
  Badge,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Layout from '../../../src/components/Layout';
import { useState } from 'react';

// Mock product data - replace with actual API call
const initialProducts = [
  {
    id: 1,
    name: 'Organic Tomatoes',
    price: 2.99,
    image: '/images/tomatoes.jpg',
    category: 'Vegetables',
    stock: 50,
    status: 'In Stock',
  },
  {
    id: 2,
    name: 'Fresh Apples',
    price: 1.99,
    image: '/images/apples.jpg',
    category: 'Fruits',
    stock: 100,
    status: 'In Stock',
  },
];

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  status: string;
}

export default function AdminProducts() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const toast = useToast();

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: products.length + 1,
    };
    setProducts([...products, newProduct]);
    toast({
      title: 'Product added',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  const handleEditProduct = (product: Product) => {
    setProducts(products.map(p => p.id === product.id ? product : p));
    toast({
      title: 'Product updated',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: 'Product deleted',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    onOpen();
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'red' };
    if (stock < 10) return { label: 'Low Stock', color: 'yellow' };
    return { label: 'In Stock', color: 'green' };
  };

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <HStack justify="space-between">
            <Box>
              <Heading size="lg" color="farm.primary">Product Management</Heading>
              <Text color="gray.600">Manage your product inventory</Text>
            </Box>
            <Button
              leftIcon={<FiPlus />}
              colorScheme="green"
              onClick={() => {
                setEditingProduct(null);
                onOpen();
              }}
            >
              Add Product
            </Button>
          </HStack>

          <Box
            bg="white"
            borderRadius="lg"
            boxShadow="sm"
            overflow="hidden"
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Image</Th>
                  <Th>Name</Th>
                  <Th>Category</Th>
                  <Th>Price</Th>
                  <Th>Stock</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((product) => (
                  <Tr key={product.id}>
                    <Td>
                      <Image
                        src={product.image}
                        alt={product.name}
                        boxSize="50px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                    </Td>
                    <Td fontWeight="medium">{product.name}</Td>
                    <Td>{product.category}</Td>
                    <Td>${product.price.toFixed(2)}</Td>
                    <Td>{product.stock}</Td>
                    <Td>
                      <Badge colorScheme={getStockStatus(product.stock).color}>
                        {getStockStatus(product.stock).label}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          icon={<FiEdit2 />}
                          aria-label="Edit product"
                          size="sm"
                          colorScheme="blue"
                          variant="ghost"
                          onClick={() => openEditModal(product)}
                        />
                        <IconButton
                          icon={<FiTrash2 />}
                          aria-label="Delete product"
                          size="sm"
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => handleDeleteProduct(product.id)}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </VStack>

        {/* Add/Edit Product Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </ModalHeader>
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Product Name</FormLabel>
                  <Input
                    placeholder="Enter product name"
                    defaultValue={editingProduct?.name}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select
                    placeholder="Select category"
                    defaultValue={editingProduct?.category}
                  >
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Herbs">Herbs</option>
                    <option value="Other">Other</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Price</FormLabel>
                  <NumberInput
                    min={0}
                    precision={2}
                    defaultValue={editingProduct?.price}
                  >
                    <NumberInputField />
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Stock</FormLabel>
                  <NumberInput
                    min={0}
                    defaultValue={editingProduct?.stock}
                  >
                    <NumberInputField />
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel>Image URL</FormLabel>
                  <Input
                    placeholder="Enter image URL"
                    defaultValue={editingProduct?.image}
                  />
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="green"
                onClick={() => {
                  // Mock save - replace with actual API call
                  if (editingProduct) {
                    handleEditProduct({
                      ...editingProduct,
                      // Add form values here
                    });
                  } else {
                    handleAddProduct({
                      name: 'New Product',
                      price: 0,
                      image: '/images/default.jpg',
                      category: 'Other',
                      stock: 0,
                      status: 'In Stock',
                    });
                  }
                }}
              >
                {editingProduct ? 'Save Changes' : 'Add Product'}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </Layout>
  );
} 