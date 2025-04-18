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
  const { user, loading } = useAuth();
  const router = useRouter();
  const cardBg = useColorModeValue('white', 'gray.700');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login?redirect=/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="farm.primary" />
      </Center>
    );
  }

  if (!user) {
    return null;
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
            <Heading size="xl">Dashboard</Heading>
            <Text color="gray.600" mt={2}>
              Welcome back, {user.name}
            </Text>
          </Box>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
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
                      <StatHelpText>
                        <Badge colorScheme="green">Active</Badge>
                      </StatHelpText>
                    </Stat>
                    <Stat>
                      <StatLabel>Total Spent</StatLabel>
                      <StatNumber>${orderStats.totalSpent.toFixed(2)}</StatNumber>
                      <StatHelpText>
                        {orderStats.discountEligible && (
                          <Text color="green.500">
                            Eligible for {orderStats.discountPercentage}% discount
                          </Text>
                        )}
                      </StatHelpText>
                    </Stat>
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>

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
                      <StatHelpText>
                        <Badge colorScheme="green">
                          {referralStats.activeReferrals} Active
                        </Badge>
                      </StatHelpText>
                    </Stat>
                    <Stat>
                      <StatLabel>Referral Discount</StatLabel>
                      <StatNumber>{referralStats.referralDiscount}%</StatNumber>
                      <StatHelpText>
                        <Text color="green.500">
                          Earn {referralStats.referralDiscount}% off for each referral
                        </Text>
                      </StatHelpText>
                    </Stat>
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        </VStack>
      </Container>
    </Layout>
  );
};

export default Dashboard; 