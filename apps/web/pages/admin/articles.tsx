import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
  Text,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import Layout from '../../src/components/Layout';
import { useAuth } from '../../src/contexts/AuthContext';

interface Article {
  _id: string;
  title: string;
  description: string;
  content: string;
  status: 'draft' | 'published';
  slug: string;
  author: string;
  publishedAt: string;
}

export default function ManageArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchArticles();
    }
  }, [user]);

  const fetchArticles = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/admin/all`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      const data = await response.json();
      setArticles(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch articles',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    try {
      const url = editingArticle._id
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${editingArticle._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/articles`;
      
      const response = await fetch(url, {
        method: editingArticle._id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(editingArticle),
      });

      if (!response.ok) {
        throw new Error('Failed to save article');
      }

      toast({
        title: 'Success',
        description: `Article ${editingArticle._id ? 'updated' : 'created'} successfully`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onClose();
      fetchArticles();
    } catch (error) {
      console.error('Error saving article:', error);
      toast({
        title: 'Error',
        description: 'Failed to save article',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete article');
      }

      toast({
        title: 'Success',
        description: 'Article deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete article',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!user || (user.role !== 'admin' && user.role !== 'super_admin')) {
    return (
      <Layout>
        <Box p={4}>
          <Text>You do not have permission to access this page.</Text>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={8}>
          <Heading size="lg">Manage Articles</Heading>
          <Button
            colorScheme="green"
            onClick={() => {
              setEditingArticle({
                _id: '',
                title: '',
                description: '',
                content: '',
                status: 'draft',
                slug: '',
                author: user.name,
                publishedAt: new Date().toISOString(),
              });
              onOpen();
            }}
          >
            Create New Article
          </Button>
        </Box>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Status</Th>
              <Th>Author</Th>
              <Th>Published At</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {articles.map((article) => (
              <Tr key={article._id}>
                <Td>{article.title}</Td>
                <Td>{article.status}</Td>
                <Td>{article.author}</Td>
                <Td>{new Date(article.publishedAt).toLocaleDateString()}</Td>
                <Td>
                  <Button
                    size="sm"
                    mr={2}
                    onClick={() => {
                      setEditingArticle(article);
                      onOpen();
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDelete(article._id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {editingArticle?._id ? 'Edit Article' : 'Create Article'}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <form onSubmit={handleSubmit}>
                <FormControl mb={4}>
                  <FormLabel>Title</FormLabel>
                  <Input
                    value={editingArticle?.title || ''}
                    onChange={(e) =>
                      setEditingArticle({
                        ...editingArticle!,
                        title: e.target.value,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                      })
                    }
                    required
                  />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={editingArticle?.description || ''}
                    onChange={(e) =>
                      setEditingArticle({
                        ...editingArticle!,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel>Content</FormLabel>
                  <Textarea
                    value={editingArticle?.content || ''}
                    onChange={(e) =>
                      setEditingArticle({
                        ...editingArticle!,
                        content: e.target.value,
                      })
                    }
                    required
                    minH="200px"
                  />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel>Status</FormLabel>
                  <Select
                    value={editingArticle?.status || 'draft'}
                    onChange={(e) =>
                      setEditingArticle({
                        ...editingArticle!,
                        status: e.target.value as 'draft' | 'published',
                      })
                    }
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </Select>
                </FormControl>

                <Button type="submit" colorScheme="blue" mr={3}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </Layout>
  );
} 