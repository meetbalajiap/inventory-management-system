import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Text,
  Divider,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import Layout from '../src/components/Layout';
import { useAuth } from '../src/contexts/AuthContext';

export default function Profile() {
  const { user, loading } = useAuth();
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    ...(user?.role === 'user' ? {
      address: {
        street: user?.address?.street || '',
        city: user?.address?.city || '',
        state: user?.address?.state || '',
        zipCode: user?.address?.zipCode || '',
        country: user?.address?.country || '',
      },
      payment: {
        cardNumber: user?.payment?.cardNumber || '',
        cardHolder: user?.payment?.cardHolder || '',
        expiryDate: user?.payment?.expiryDate || '',
        cvv: user?.payment?.cvv || '',
      },
    } : {}),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as object),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Mock API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: 'Profile updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: 'Failed to update profile',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <Container maxW="container.xl" py={8}>
          <Box>Loading...</Box>
        </Container>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Heading size="lg">Profile</Heading>

          <Box
            bg={useColorModeValue('white', 'gray.700')}
            p={6}
            rounded="lg"
            shadow="md"
          >
            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                <HStack spacing={4} w="full">
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      isDisabled={!isEditing}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      isDisabled={!isEditing}
                    />
                  </FormControl>
                </HStack>

                <FormControl>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    isDisabled={!isEditing}
                  />
                </FormControl>

                {user.role === 'user' && (
                  <>
                    <Divider />

                    <Heading size="md">Address</Heading>
                    <VStack spacing={4} w="full">
                      <FormControl>
                        <FormLabel>Street</FormLabel>
                        <Input
                          name="address.street"
                          value={formData.address?.street}
                          onChange={handleInputChange}
                          isDisabled={!isEditing}
                        />
                      </FormControl>
                      <HStack spacing={4} w="full">
                        <FormControl>
                          <FormLabel>City</FormLabel>
                          <Input
                            name="address.city"
                            value={formData.address?.city}
                            onChange={handleInputChange}
                            isDisabled={!isEditing}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>State</FormLabel>
                          <Input
                            name="address.state"
                            value={formData.address?.state}
                            onChange={handleInputChange}
                            isDisabled={!isEditing}
                          />
                        </FormControl>
                      </HStack>
                      <HStack spacing={4} w="full">
                        <FormControl>
                          <FormLabel>ZIP Code</FormLabel>
                          <Input
                            name="address.zipCode"
                            value={formData.address?.zipCode}
                            onChange={handleInputChange}
                            isDisabled={!isEditing}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Country</FormLabel>
                          <Input
                            name="address.country"
                            value={formData.address?.country}
                            onChange={handleInputChange}
                            isDisabled={!isEditing}
                          />
                        </FormControl>
                      </HStack>
                    </VStack>

                    <Divider />

                    <Heading size="md">Payment Information</Heading>
                    <VStack spacing={4} w="full">
                      <FormControl>
                        <FormLabel>Card Number</FormLabel>
                        <Input
                          name="payment.cardNumber"
                          value={formData.payment?.cardNumber}
                          onChange={handleInputChange}
                          isDisabled={!isEditing}
                        />
                      </FormControl>
                      <HStack spacing={4} w="full">
                        <FormControl>
                          <FormLabel>Card Holder</FormLabel>
                          <Input
                            name="payment.cardHolder"
                            value={formData.payment?.cardHolder}
                            onChange={handleInputChange}
                            isDisabled={!isEditing}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Expiry Date</FormLabel>
                          <Input
                            name="payment.expiryDate"
                            value={formData.payment?.expiryDate}
                            onChange={handleInputChange}
                            isDisabled={!isEditing}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>CVV</FormLabel>
                          <Input
                            name="payment.cvv"
                            value={formData.payment?.cvv}
                            onChange={handleInputChange}
                            isDisabled={!isEditing}
                          />
                        </FormControl>
                      </HStack>
                    </VStack>
                  </>
                )}

                <HStack spacing={4} justify="flex-end" w="full">
                  {!isEditing ? (
                    <Button colorScheme="blue" onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button variant="ghost" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button colorScheme="blue" type="submit">
                        Save Changes
                      </Button>
                    </>
                  )}
                </HStack>
              </VStack>
            </form>
          </Box>
        </VStack>
      </Container>
    </Layout>
  );
} 