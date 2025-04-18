import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
} from '@chakra-ui/react';
import Layout from '../src/components/Layout';
import { useAuth } from '../src/contexts/AuthContext';

// Mock dashboard data - replace with actual API calls
const mockDashboardData = {
  totalOrders: 150,
  totalRevenue: 12500,
  activeUsers: 45,
  pendingOrders: 12,
};

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login?redirect=/dashboard');
    }
  }, [user, loading, router]);

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
    return null; // Will redirect in useEffect
  }

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <Heading size="lg" mb={6}>Dashboard</Heading>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          <Stat
            bg={useColorModeValue('white', 'gray.700')}
            p={6}
            rounded="lg"
            shadow="md"
          >
            <StatLabel>Total Orders</StatLabel>
            <StatNumber>{mockDashboardData.totalOrders}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>

          <Stat
            bg={useColorModeValue('white', 'gray.700')}
            p={6}
            rounded="lg"
            shadow="md"
          >
            <StatLabel>Total Revenue</StatLabel>
            <StatNumber>${mockDashboardData.totalRevenue}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              15.42%
            </StatHelpText>
          </Stat>

          <Stat
            bg={useColorModeValue('white', 'gray.700')}
            p={6}
            rounded="lg"
            shadow="md"
          >
            <StatLabel>Active Users</StatLabel>
            <StatNumber>{mockDashboardData.activeUsers}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              8.12%
            </StatHelpText>
          </Stat>

          <Stat
            bg={useColorModeValue('white', 'gray.700')}
            p={6}
            rounded="lg"
            shadow="md"
          >
            <StatLabel>Pending Orders</StatLabel>
            <StatNumber>{mockDashboardData.pendingOrders}</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              3.48%
            </StatHelpText>
          </Stat>
        </SimpleGrid>
      </Container>
    </Layout>
  );
} 