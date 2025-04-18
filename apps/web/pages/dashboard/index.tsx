import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { useAuth } from '../../src/contexts/AuthContext';
import Layout from '../../src/components/Layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const cardBg = useColorModeValue('white', 'gray.700');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="farm.primary" />
      </Center>
    );
  }

  // Mock data - replace with actual API calls
  const orderStats = {
    totalOrders: 24,
    totalSpent: 1250.50,
    discountEligible: true,
    discountPercentage: 15,
  };

  const referralStats = {
    totalReferrals: 8,
    activeReferrals: 5,
    referralDiscount: 10,
  };

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading size="lg" color="farm.primary">
              Welcome, {user?.name || 'User'}!
            </Heading>
            <Text color="gray.600">
              {user?.farmName ? `Farm: ${user.farmName}` : 'Manage your orders and referrals'}
            </Text>
          </Box>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
            {/* Order Statistics */}
            <GridItem>
              <Card bg={cardBg}>
                <CardHeader>
                  <Heading size="md">Order Statistics</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <Stat>
                      <StatLabel>Total Orders</StatLabel>
                      <StatNumber>{orderStats.totalOrders}</StatNumber>
                      <StatHelpText>All-time orders placed</StatHelpText>
                    </Stat>

                    <Stat>
                      <StatLabel>Total Spent</StatLabel>
                      <StatNumber>${orderStats.totalSpent.toFixed(2)}</StatNumber>
                      <StatHelpText>Total amount spent</StatHelpText>
                    </Stat>

                    {orderStats.discountEligible && (
                      <Box p={4} bg="farm.background" borderRadius="md">
                        <HStack justify="space-between">
                          <Text fontWeight="bold">Volume Discount</Text>
                          <Badge colorScheme="green" fontSize="md">
                            {orderStats.discountPercentage}% OFF
                          </Badge>
                        </HStack>
                        <Text fontSize="sm" mt={2}>
                          You qualify for a volume-based discount on your next order!
                        </Text>
                      </Box>
                    )}
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>

            {/* Referral Statistics */}
            <GridItem>
              <Card bg={cardBg}>
                <CardHeader>
                  <Heading size="md">Referral Program</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <Stat>
                      <StatLabel>Total Referrals</StatLabel>
                      <StatNumber>{referralStats.totalReferrals}</StatNumber>
                      <StatHelpText>People you've referred</StatHelpText>
                    </Stat>

                    <Stat>
                      <StatLabel>Active Referrals</StatLabel>
                      <StatNumber>{referralStats.activeReferrals}</StatNumber>
                      <StatHelpText>Referrals who made purchases</StatHelpText>
                    </Stat>

                    <Box p={4} bg="farm.background" borderRadius="md">
                      <HStack justify="space-between">
                        <Text fontWeight="bold">Referral Discount</Text>
                        <Badge colorScheme="yellow" fontSize="md">
                          {referralStats.referralDiscount}% OFF
                        </Badge>
                      </HStack>
                      <Text fontSize="sm" mt={2}>
                        You earn {referralStats.referralDiscount}% discount for each successful referral
                      </Text>
                    </Box>
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>

          {/* Recent Orders Section */}
          <Card bg={cardBg}>
            <CardHeader>
              <Heading size="md">Recent Orders</Heading>
            </CardHeader>
            <CardBody>
              <Text color="gray.500">No recent orders to display</Text>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Layout>
  );
};

export default Dashboard; 