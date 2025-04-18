import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  useToast,
  Select,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useAuth } from '../../src/contexts/AuthContext';
import Layout from '../../src/components/Layout';

// Mock orders data - replace with actual API call
const mockOrders = [
  {
    id: '1',
    customerName: 'John Doe',
    email: 'john@example.com',
    items: [
      { name: 'Product 1', quantity: 2, price: 10 },
      { name: 'Product 2', quantity: 1, price: 20 },
    ],
    total: 40,
    status: 'pending',
    date: '2024-03-20',
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    email: 'jane@example.com',
    items: [
      { name: 'Product 3', quantity: 3, price: 15 },
    ],
    total: 45,
    status: 'processing',
    date: '2024-03-19',
  },
];

export default function ManageOrders() {
  const { user } = useAuth();
  const toast = useToast();
  const [orders, setOrders] = useState(mockOrders);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      // Mock API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));

      toast({
        title: 'Order status updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Failed to update order status',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'yellow';
      case 'processing':
        return 'blue';
      case 'completed':
        return 'green';
      case 'cancelled':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={6} align="stretch">
          <Heading size="lg">Manage Orders</Heading>

          <HStack spacing={4}>
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              maxW="300px"
            />
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              maxW="200px"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </Select>
          </HStack>

          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Order ID</Th>
                  <Th>Customer</Th>
                  <Th>Email</Th>
                  <Th>Items</Th>
                  <Th>Total</Th>
                  <Th>Date</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredOrders.map((order) => (
                  <Tr key={order.id}>
                    <Td>{order.id}</Td>
                    <Td>{order.customerName}</Td>
                    <Td>{order.email}</Td>
                    <Td>
                      {order.items.map((item, index) => (
                        <div key={index}>
                          {item.quantity}x {item.name}
                        </div>
                      ))}
                    </Td>
                    <Td>${order.total}</Td>
                    <Td>{order.date}</Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </Td>
                    <Td>
                      <Select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        size="sm"
                        maxW="150px"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </Select>
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