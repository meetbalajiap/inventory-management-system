import { Box, Text, Button, VStack, HStack, IconButton, useColorModeValue } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface Article {
  _id: string;
  title: string;
  description: string;
  slug: string;
}

export default function FarmArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentArticle, setCurrentArticle] = useState(0);
  const [loading, setLoading] = useState(true);
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError("Oops, we haven't got JSON!");
      }
      const data = await response.json();
      setArticles(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setLoading(false);
      // Set some default articles if the API fails
      setArticles([
        {
          _id: '1',
          title: "Fresh Farm Products Delivered Daily",
          description: "Experience the freshness of farm-to-table produce with our daily deliveries.",
          slug: "fresh-farm-products"
        },
        {
          _id: '2',
          title: "Local USA Produce",
          description: "Learn about our commitment to sustainable and locally sourced farming methods.",
          slug: "local-usa-produce"
        }
      ]);
    }
  };

  useEffect(() => {
    if (articles.length > 0) {
      const timer = setInterval(() => {
        setCurrentArticle((prev) => (prev + 1) % articles.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [articles]);

  const nextArticle = () => {
    setCurrentArticle((prev) => (prev + 1) % articles.length);
  };

  const prevArticle = () => {
    setCurrentArticle((prev) => (prev - 1 + articles.length) % articles.length);
  };

  if (loading) {
    return (
      <Box
        bg={bgColor}
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        textAlign="center"
      >
        <Text>Loading articles...</Text>
      </Box>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <Box
      bg={bgColor}
      p={8}
      borderRadius="lg"
      boxShadow="lg"
      position="relative"
      overflow="hidden"
    >
      <VStack spacing={4} align="center">
        <Text fontSize="2xl" fontWeight="bold" color={textColor}>
          {articles[currentArticle].title}
        </Text>
        <Text fontSize="lg" color={textColor} textAlign="center">
          {articles[currentArticle].description}
        </Text>
        <Button
          as={NextLink}
          href={`/articles/${articles[currentArticle].slug}`}
          colorScheme="green"
          size="lg"
        >
          Read More
        </Button>
      </VStack>

      <HStack
        position="absolute"
        bottom={4}
        left={0}
        right={0}
        justify="center"
        spacing={4}
      >
        <IconButton
          aria-label="Previous article"
          icon={<ChevronLeftIcon />}
          onClick={prevArticle}
          variant="ghost"
        />
        <HStack spacing={2}>
          {articles.map((_, index) => (
            <Box
              key={index}
              w={2}
              h={2}
              borderRadius="full"
              bg={index === currentArticle ? 'farm.primary' : 'gray.300'}
              cursor="pointer"
              onClick={() => setCurrentArticle(index)}
            />
          ))}
        </HStack>
        <IconButton
          aria-label="Next article"
          icon={<ChevronRightIcon />}
          onClick={nextArticle}
          variant="ghost"
        />
      </HStack>
    </Box>
  );
} 