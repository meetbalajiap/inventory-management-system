import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import Layout from '../../../src/components/Layout';

interface Article {
  title: string;
  content: string;
  description: string;
  imageUrl?: string;
  author: string;
  publishedAt: string;
  category: string;
}

export default function ArticlePage() {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const fetchArticle = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${slug}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError("Oops, we haven't got JSON!");
      }
      const data = await response.json();
      setArticle(data);
    } catch (error) {
      console.error('Error fetching article:', error);
      // Set a default article if the API fails
      setArticle({
        title: "Article Not Found",
        content: "The article you're looking for is not available at the moment.",
        description: "Please try again later or contact support.",
        author: "System",
        publishedAt: new Date().toISOString(),
        category: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Container maxW="container.xl" py={8}>
          <Text>Loading...</Text>
        </Container>
      </Layout>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <Layout>
      <Box bg={bgColor} py={8}>
        <Container maxW="container.xl">
          <VStack spacing={8} align="stretch">
            <Box>
              <Heading as="h1" size="2xl" color={textColor}>
                {article.title}
              </Heading>
              <HStack spacing={4} mt={4}>
                <Text color="gray.500">By {article.author}</Text>
                <Text color="gray.500">•</Text>
                <Text color="gray.500">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </Text>
                <Text color="gray.500">•</Text>
                <Text color="gray.500" textTransform="capitalize">
                  {article.category}
                </Text>
              </HStack>
            </Box>

            {article.imageUrl && (
              <Image
                src={article.imageUrl}
                alt={article.title}
                borderRadius="lg"
                objectFit="cover"
                maxH="500px"
                w="100%"
              />
            )}

            <Divider />

            <Text fontSize="xl" color={textColor} whiteSpace="pre-line">
              {article.content}
            </Text>
          </VStack>
        </Container>
      </Box>
    </Layout>
  );
} 