import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Image,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAuth } from '../../src/contexts/AuthContext';
import Layout from '../../src/components/Layout';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      // Redirect based on role
      if (formData.email === 'meetbalajiap@gmail.com') {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Invalid email or password',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container maxW="container.sm" py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading size="xl" color="farm.primary" mb={2}>
              Welcome Back to OKEETROPICS
            </Heading>
            <Text color="gray.600" fontSize="lg">
              Sign in to your account
            </Text>
          </Box>

          <Box
            as="form"
            onSubmit={handleSubmit}
            bg="white"
            p={8}
            borderRadius="lg"
            boxShadow="sm"
          >
            <VStack spacing={6}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="green"
                width="full"
                isLoading={loading}
              >
                Sign In
              </Button>
            </VStack>
          </Box>

          <Text textAlign="center">
            Don't have an account?{' '}
            <Button
              variant="link"
              color="farm.primary"
              onClick={() => router.push('/auth/register')}
            >
              Create one
            </Button>
          </Text>
        </VStack>
      </Container>
    </Layout>
  );
} 