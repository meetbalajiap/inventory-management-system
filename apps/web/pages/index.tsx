import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  Grid,
  GridItem,
  Image,
  Badge,
  HStack,
  Avatar,
  SimpleGrid,
  useColorModeValue,
  Icon,
  Flex,
  Wrap,
  WrapItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { FiShoppingCart, FiStar, FiTruck, FiThumbsUp, FiClock } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Layout from '../src/components/Layout';
import NextLink from 'next/link';
import FarmArticles from '../src/components/FarmArticles';
import { ChevronDownIcon } from '@chakra-ui/icons';

// Mock featured products data
const featuredProducts = [
  {
    id: 1,
    name: 'Organic Tomatoes',
    price: 2.99,
    image: '/images/tomatoes.jpg',
    category: 'Vegetables',
    stock: 50,
    comingSoon: false,
  },
  {
    id: 2,
    name: 'Fresh Apples',
    price: 1.99,
    image: '/images/apples.jpg',
    category: 'Fruits',
    stock: 100,
    comingSoon: false,
  },
  {
    id: 3,
    name: 'Seasonal Mangoes',
    price: 4.99,
    image: '/images/placeholder.jpg',
    category: 'Fruits',
    stock: 0,
    comingSoon: true,
  },
  {
    id: 4,
    name: 'Fresh Herbs',
    price: 3.49,
    image: '/images/placeholder.jpg',
    category: 'Herbs',
    stock: 0,
    comingSoon: true,
  },
];

// Mock customer reviews
const reviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    comment: "The freshest produce I've ever had! The tomatoes are amazing.",
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    name: 'Mike Thompson',
    rating: 5,
    comment: 'Great quality and fast delivery. Will definitely order again!',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 3,
    name: 'Emily Davis',
    rating: 4,
    comment: 'Love the variety of organic products available.',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
];

export default function Home() {
  const router = useRouter();
  const cardBg = useColorModeValue('white', 'gray.700');

  return (
    <Layout>
      {/* Hero Section */}
      <Box bg="farm.background" py={12}>
        <Container maxW="container.xl">
          <VStack spacing={8} align="center" textAlign="center">
            <VStack spacing={4} maxW="800px">
              <Heading size="2xl" color="farm.primary" lineHeight="1.2">
                Fresh Farm Products Delivered Daily
              </Heading>
              <Text fontSize="lg" color="gray.600" mb={4}>
                Experience the taste of fresh, locally sourced produce straight from our farm
              </Text>
              <HStack spacing={4}>
                <Text fontWeight="medium">100% locally sourced</Text>
                <Text>•</Text>
                <Text fontWeight="medium">Farm to table</Text>
                <Text>•</Text>
                <Text fontWeight="medium">Sustainable farming</Text>
              </HStack>
              <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={6} width="100%" pt={4}>
                <VStack spacing={2}>
                  <Icon as={FiTruck} w={8} h={8} color="farm.primary" />
                  <Text fontWeight="medium">Same-day delivery</Text>
                </VStack>
                <VStack spacing={2}>
                  <Icon as={FiThumbsUp} w={8} h={8} color="farm.primary" />
                  <Text fontWeight="medium">100% locally sourced</Text>
                </VStack>
                <VStack spacing={2}>
                  <Icon as={FiClock} w={8} h={8} color="farm.primary" />
                  <Text fontWeight="medium">Fresh harvest</Text>
                </VStack>
              </SimpleGrid>
              <HStack spacing={4} pt={4}>
                <Button
                  as={NextLink}
                  href="/products"
                  size="lg"
                  colorScheme="green"
                >
                  Shop Now
                </Button>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    size="lg"
                    variant="outline"
                    colorScheme="green"
                  >
                    Learn More
                  </MenuButton>
                  <MenuList>
                    <MenuItem as={NextLink} href="/articles/local-usa-produce">
                      Local USA Produce
                    </MenuItem>
                    <MenuItem as={NextLink} href="/articles/seasonal-specials">
                      Seasonal Specials
                    </MenuItem>
                    <MenuItem as={NextLink} href="/articles/farm-to-fork">
                      Farm to Fork Journey
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            </VStack>
          </VStack>
        </Container>
      </Box>

      {/* Articles Section */}
      <Box py={12}>
        <Container maxW="container.xl">
          <FarmArticles />
        </Container>
      </Box>

      {/* Featured Products Section */}
      <Container maxW="container.xl" py={12}>
        <VStack spacing={8}>
          <Box textAlign="center">
            <Heading size="xl" color="farm.primary" mb={2}>
              Featured Products
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Fresh from our farm to your table
            </Text>
          </Box>

          <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
            {featuredProducts.map((product) => (
              <GridItem key={product.id}>
                <Box
                  bg={cardBg}
                  p={4}
                  borderRadius="lg"
                  boxShadow="sm"
                  transition="all 0.2s"
                  _hover={{ transform: 'scale(1.02)' }}
                >
                  <VStack spacing={3}>
                    <Box position="relative" width="100%" pb="100%">
                      <Image
                        src={product.image}
                        alt={product.name}
                        objectFit="cover"
                        position="absolute"
                        top={0}
                        left={0}
                        width="100%"
                        height="100%"
                        borderRadius="md"
                      />
                    </Box>
                    <Badge colorScheme={product.comingSoon ? 'yellow' : 'green'}>
                      {product.comingSoon ? 'Coming Soon' : product.category}
                    </Badge>
                    <Heading size="md">{product.name}</Heading>
                    <Text fontSize="xl" fontWeight="bold" color="farm.primary">
                      ${product.price.toFixed(2)}
                    </Text>
                    <Button
                      leftIcon={<FiShoppingCart />}
                      colorScheme="green"
                      isDisabled={product.comingSoon}
                      onClick={() => router.push(`/products/${product.id}`)}
                      width="full"
                    >
                      {product.comingSoon ? 'Coming Soon' : 'View Product'}
                    </Button>
                  </VStack>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </VStack>
      </Container>

      {/* Customer Reviews Section */}
      <Box bg="gray.50" py={12}>
        <Container maxW="container.xl">
          <VStack spacing={8}>
            <Box textAlign="center">
              <Heading size="xl" color="farm.primary" mb={2}>
                Customer Reviews
              </Heading>
              <Text fontSize="lg" color="gray.600">
                What our customers say about us
              </Text>
            </Box>

            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
              {reviews.map((review) => (
                <GridItem key={review.id}>
                  <Box
                    bg={cardBg}
                    p={6}
                    borderRadius="lg"
                    boxShadow="sm"
                    height="100%"
                  >
                    <VStack spacing={4} align="stretch" height="100%">
                      <HStack>
                        <Avatar src={review.avatar} name={review.name} />
                        <Box>
                          <Heading size="sm">{review.name}</Heading>
                          <HStack>
                            {[...Array(review.rating)].map((_, i) => (
                              <Icon key={i} as={FiStar} color="yellow.400" />
                            ))}
                          </HStack>
                        </Box>
                      </HStack>
                      <Text color="gray.600" flex="1">
                        "{review.comment}"
                      </Text>
                    </VStack>
                  </Box>
                </GridItem>
              ))}
            </Grid>
          </VStack>
        </Container>
      </Box>
    </Layout>
  );
} 