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
  Select,
  Grid,
  GridItem,
  FormErrorMessage,
  Link,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAuth } from '../../src/contexts/AuthContext';
import Layout from '../../src/components/Layout';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'user' | 'admin';
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  payment: {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
  };
}

export default function Register() {
  const router = useRouter();
  const toast = useToast();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
    payment: {
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
    },
  });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\+?[1-9]\d{1,14}$/.test(phone);
  };

  const validateCardNumber = (cardNumber: string) => {
    return /^\d{16}$/.test(cardNumber.replace(/\s/g, ''));
  };

  const validateExpiryDate = (expiryDate: string) => {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate);
  };

  const validateCVV = (cvv: string) => {
    return /^\d{3,4}$/.test(cvv);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!validateEmail(formData.email)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    if (!validatePhone(formData.phone)) {
      toast({
        title: 'Invalid phone number',
        description: 'Please enter a valid phone number',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    if (!validateCardNumber(formData.payment.cardNumber)) {
      toast({
        title: 'Invalid card number',
        description: 'Please enter a valid 16-digit card number',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    if (!validateExpiryDate(formData.payment.expiryDate)) {
      toast({
        title: 'Invalid expiry date',
        description: 'Please enter a valid expiry date (MM/YY)',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    if (!validateCVV(formData.payment.cvv)) {
      toast({
        title: 'Invalid CVV',
        description: 'Please enter a valid 3 or 4-digit CVV',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    try {
      await register(formData);
      toast({
        title: 'Account created',
        description: 'Your account has been created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
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
      <Container maxW="container.md" py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading size="xl">Join the OKEETROPICS Family</Heading>
            <Text color="gray.600" mt={2}>
              Your journey to fresh, organic produce starts here
            </Text>
          </Box>

          <Box bg="white" p={8} borderRadius="lg" boxShadow="sm">
            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6} width="full">
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel>Full Name</FormLabel>
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </FormControl>
                  </GridItem>

                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </FormControl>
                  </GridItem>

                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel>Password</FormLabel>
                      <Input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                    </FormControl>
                  </GridItem>

                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel>Confirm Password</FormLabel>
                      <Input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      />
                    </FormControl>
                  </GridItem>

                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel>Phone Number</FormLabel>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </FormControl>
                  </GridItem>

                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel>Role</FormLabel>
                      <Select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value as 'user' | 'admin' })}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </Select>
                    </FormControl>
                  </GridItem>
                </Grid>

                <Box width="full">
                  <Heading size="md" mb={4}>Address Information</Heading>
                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                    <GridItem colSpan={2}>
                      <FormControl isRequired>
                        <FormLabel>Street Address</FormLabel>
                        <Input
                          value={formData.address.street}
                          onChange={(e) => setFormData({
                            ...formData,
                            address: { ...formData.address, street: e.target.value }
                          })}
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel>City</FormLabel>
                        <Input
                          value={formData.address.city}
                          onChange={(e) => setFormData({
                            ...formData,
                            address: { ...formData.address, city: e.target.value }
                          })}
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel>State</FormLabel>
                        <Input
                          value={formData.address.state}
                          onChange={(e) => setFormData({
                            ...formData,
                            address: { ...formData.address, state: e.target.value }
                          })}
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel>ZIP Code</FormLabel>
                        <Input
                          value={formData.address.zipCode}
                          onChange={(e) => setFormData({
                            ...formData,
                            address: { ...formData.address, zipCode: e.target.value }
                          })}
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel>Country</FormLabel>
                        <Input
                          value={formData.address.country}
                          onChange={(e) => setFormData({
                            ...formData,
                            address: { ...formData.address, country: e.target.value }
                          })}
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                </Box>

                <Box width="full">
                  <Heading size="md" mb={4}>Payment Information</Heading>
                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                    <GridItem colSpan={2}>
                      <FormControl isRequired>
                        <FormLabel>Card Number</FormLabel>
                        <Input
                          value={formData.payment.cardNumber}
                          onChange={(e) => setFormData({
                            ...formData,
                            payment: { ...formData.payment, cardNumber: e.target.value }
                          })}
                          placeholder="1234 5678 9012 3456"
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel>Card Holder Name</FormLabel>
                        <Input
                          value={formData.payment.cardHolder}
                          onChange={(e) => setFormData({
                            ...formData,
                            payment: { ...formData.payment, cardHolder: e.target.value }
                          })}
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel>Expiry Date</FormLabel>
                        <Input
                          value={formData.payment.expiryDate}
                          onChange={(e) => setFormData({
                            ...formData,
                            payment: { ...formData.payment, expiryDate: e.target.value }
                          })}
                          placeholder="MM/YY"
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel>CVV</FormLabel>
                        <Input
                          value={formData.payment.cvv}
                          onChange={(e) => setFormData({
                            ...formData,
                            payment: { ...formData.payment, cvv: e.target.value }
                          })}
                          placeholder="123"
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                </Box>

                <Button
                  type="submit"
                  colorScheme="green"
                  size="lg"
                  width="full"
                  isLoading={loading}
                >
                  Create Account
                </Button>

                <Text textAlign="center">
                  Already part of our family?{' '}
                  <Link color="farm.primary" href="/auth/login">
                    Sign In
                  </Link>
                </Text>
              </VStack>
            </form>
          </Box>
        </VStack>
      </Container>
    </Layout>
  );
} 