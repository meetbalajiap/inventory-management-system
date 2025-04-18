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
  VStack,
  HStack,
  Text,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { useState, useMemo } from 'react';
import { useAuth } from '../../src/contexts/AuthContext';
import Layout from '../../src/components/Layout';
import { SearchIcon } from '@chakra-ui/icons';

// Mock user data - replace with actual API call
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'admin',
    status: 'pending',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'user',
    status: 'active',
  },
];

type SortField = 'name' | 'email' | 'role' | 'status';
type SortDirection = 'asc' | 'desc';

export default function AdminUsers() {
  const { user } = useAuth();
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const toast = useToast();

  const handleApproveAdmin = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: 'active' } : u
    ));
    toast({
      title: 'Admin approved',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleRevokeAdmin = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, role: 'user' } : u
    ));
    toast({
      title: 'Admin access revoked',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = [...users];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(u => 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(u => u.role === roleFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const modifier = sortDirection === 'asc' ? 1 : -1;

      if (aValue < bValue) return -1 * modifier;
      if (aValue > bValue) return 1 * modifier;
      return 0;
    });

    return filtered;
  }, [users, searchTerm, roleFilter, sortField, sortDirection]);

  if (!user || user.role !== 'super_admin') {
    return (
      <Layout>
        <Container maxW="container.xl" py={8}>
          <Heading size="lg" color="red.500">
            Access Denied
          </Heading>
          <Text mt={4}>
            You do not have permission to access this page.
          </Text>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading size="xl">User Management</Heading>
            <Text color="gray.600" mt={2}>
              Manage user accounts and permissions
            </Text>
          </Box>

          <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
            <HStack spacing={4} mb={6}>
              <InputGroup maxW="300px">
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
              <Select
                maxW="200px"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="user">Users</option>
                <option value="admin">Admins</option>
              </Select>
            </HStack>

            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th 
                    cursor="pointer" 
                    onClick={() => handleSort('name')}
                    _hover={{ bg: 'gray.100' }}
                  >
                    Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </Th>
                  <Th 
                    cursor="pointer" 
                    onClick={() => handleSort('email')}
                    _hover={{ bg: 'gray.100' }}
                  >
                    Email {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </Th>
                  <Th 
                    cursor="pointer" 
                    onClick={() => handleSort('role')}
                    _hover={{ bg: 'gray.100' }}
                  >
                    Role {sortField === 'role' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </Th>
                  <Th 
                    cursor="pointer" 
                    onClick={() => handleSort('status')}
                    _hover={{ bg: 'gray.100' }}
                  >
                    Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredAndSortedUsers.map((user) => (
                  <Tr key={user.id}>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>
                      <Badge
                        colorScheme={user.role === 'admin' ? 'purple' : 'gray'}
                      >
                        {user.role}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge
                        colorScheme={user.status === 'active' ? 'green' : 'yellow'}
                      >
                        {user.status}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        {user.role === 'admin' && user.status === 'pending' && (
                          <Button
                            size="sm"
                            colorScheme="green"
                            onClick={() => handleApproveAdmin(user.id)}
                          >
                            Approve
                          </Button>
                        )}
                        {user.role === 'admin' && user.status === 'active' && (
                          <Button
                            size="sm"
                            colorScheme="red"
                            variant="outline"
                            onClick={() => handleRevokeAdmin(user.id)}
                          >
                            Revoke Admin
                          </Button>
                        )}
                      </HStack>
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