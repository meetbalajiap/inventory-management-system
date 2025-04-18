import { Box, Container, VStack, Heading, Text, Table, Thead, Tbody, Tr, Th, Td, Badge, Button } from '@chakra-ui/react';
import { FiEye } from 'react-icons/fi';
import Layout from '../../src/components/Layout';
import { useRouter } from 'next/router';

// Mock order data - replace with actual API call
const orders = [
  {
    id: 'ORD001',
    date: '2024-03-15',
    total: 45.97,
    status: 'Delivered',
    items: [
      { name: 'Organic Tomatoes', quantity: 5 },
      { name: 'Fresh Apples', quantity: 3 }
    ]
  },
  {
    id: 'ORD002',
    date: '2024-03-14',
    total: 32.50,
    status: 'Processing',
    items: [
      { name: 'Fresh Apples', quantity: 4 }
    ]
  },
  {
    id: 'ORD003',
    date: '2024-03-13',
    total: 28.99,
    status: 'Shipped',
    items: [
      { name: 'Organic Tomatoes', quantity: 3 }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'green';
    case 'processing':
      return 'blue';
    case 'shipped':
      return 'orange';
    default:
      return 'gray';
  }
};

export default function Orders() {
  const router = useRouter();

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading size="lg" color="farm.primary">My Orders</Heading>
            <Text color="gray.600">View and track your orders</Text>
          </Box>

          <Box
            bg="white"
            borderRadius="lg"
            boxShadow="sm"
            overflow="hidden"
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Order ID</Th>
                  <Th>Date</Th>
                  <Th>Items</Th>
                  <Th>Total</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders.map((order) => (
                  <Tr key={order.id}>
                    <Td fontWeight="medium">{order.id}</Td>
                    <Td>{new Date(order.date).toLocaleDateString()}</Td>
                    <Td>
                      {order.items.map((item, index) => (
                        <Text key={index} fontSize="sm">
                          {item.quantity}x {item.name}
                        </Text>
                      ))}
                    </Td>
                    <Td>${order.total.toFixed(2)}</Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </Td>
                    <Td>
                      <Button
                        leftIcon={<FiEye />}
                        size="sm"
                        variant="ghost"
                        colorScheme="green"
                        onClick={() => router.push(`/orders/${order.id}`)}
                      >
                        View
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </Container>
    </Layout>
  );
} 