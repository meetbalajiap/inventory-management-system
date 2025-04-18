import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Container,
  Image,
  Badge,
  useToast,
  Icon,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FiShoppingCart } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';

const NavLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
  const router = useRouter();
  const isActive = router.pathname === href;
  
  return (
    <Button
      variant="ghost"
      color={isActive ? 'farm.primary' : 'gray.600'}
      _hover={{
        textDecoration: 'none',
        color: 'farm.primary',
      }}
      onClick={() => router.push(href)}
    >
      {children}
    </Button>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const { items } = useCart();
  const toast = useToast();
  const isLandingPage = router.pathname === '/';
  const [cartCount, setCartCount] = useState(0);

  // Update cart count whenever items change
  useEffect(() => {
    setCartCount(items.length);
  }, [items]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Super admin menu items - access to everything
  const superAdminMenuItems = [
    { label: 'Manage Users', href: '/admin/users' },
  ];

  // Admin menu items
  const adminMenuItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Orders', href: '/orders' },
    { label: 'Manage Orders', href: '/admin/orders' },
    { label: 'Manage Products', href: '/admin/products' },
    { label: 'Referrals', href: '/referrals' },
  ];

  // Customer menu items
  const customerMenuItems = [
    { label: 'Order History', href: '/orders' },
    { label: 'Referrals', href: '/referrals' },
  ];

  // Get menu items based on user role
  const menuItems = user?.role === 'super_admin' 
    ? superAdminMenuItems 
    : user?.role === 'admin' 
      ? adminMenuItems 
      : customerMenuItems;

  // User menu items (shown in dropdown)
  const userMenuItems = [
    { label: 'Profile', href: '/profile' },
  ];

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
      >
        <Container maxW="container.xl">
          <Flex
            flex={{ base: 1 }}
            justify={{ base: 'space-between', md: 'space-between' }}
            align="center"
          >
            <NextLink href="/" passHref>
              <HStack spacing={4} cursor="pointer">
                <Image
                  src="/images/logo.png"
                  alt="OKEETROPICS"
                  height="40px"
                  width="40px"
                />
                <Text
                  display={{ base: 'none', md: 'block' }}
                  fontSize="2xl"
                  fontWeight="bold"
                  color="farm.primary"
                >
                  OKEETROPICS
                </Text>
              </HStack>
            </NextLink>

            <Flex
              flex={{ base: 1, md: 'auto' }}
              ml={{ base: -2 }}
              display={{ base: 'flex', md: 'none' }}
            >
              <IconButton
                onClick={onOpen}
                icon={
                  isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                }
                variant={'ghost'}
                aria-label={'Toggle Navigation'}
              />
            </Flex>

            <Stack
              flex={{ base: 1, md: 0 }}
              justify={'flex-end'}
              direction={'row'}
              spacing={6}
            >
              {!user && (
                <>
                  <Button
                    as={NextLink}
                    href="/auth/login"
                    fontSize={'sm'}
                    fontWeight={400}
                    variant={'ghost'}
                  >
                    Sign In
                  </Button>
                  <Button
                    as={NextLink}
                    href="/auth/register"
                    display={{ base: 'none', md: 'inline-flex' }}
                    fontSize={'sm'}
                    fontWeight={600}
                    color={'white'}
                    bg={'farm.primary'}
                    _hover={{
                      bg: 'farm.secondary',
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}

              {/* Only show cart for regular users */}
              {user?.role === 'user' && (
                <Box 
                  as={NextLink}
                  href={user ? "/checkout" : "/auth/login?redirect=/checkout"}
                  position="relative"
                  cursor="pointer"
                  display="flex"
                  alignItems="center"
                >
                  <Icon as={FiShoppingCart} w={6} h={6} />
                  {cartCount > 0 && (
                    <Badge
                      position="absolute"
                      top="-1"
                      right="-1"
                      colorScheme="red"
                      borderRadius="full"
                      fontSize="xs"
                    >
                      {cartCount}
                    </Badge>
                  )}
                </Box>
              )}

              {user && (
                <>
                  {/* Desktop Navigation */}
                  <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
                    {menuItems.map((item) => (
                      <Button
                        key={item.href}
                        as={NextLink}
                        href={item.href}
                        variant="ghost"
                        color={router.pathname === item.href ? 'farm.primary' : 'gray.600'}
                        _hover={{
                          color: 'farm.primary',
                        }}
                      >
                        {item.label}
                      </Button>
                    ))}
                  </HStack>

                  {/* Mobile Menu Button */}
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      minW={0}
                    >
                      <Avatar
                        size={'sm'}
                        name={user.name || user.email}
                      />
                    </MenuButton>
                    <MenuList>
                      {userMenuItems.map((item) => (
                        <MenuItem
                          key={item.href}
                          as={NextLink}
                          href={item.href}
                        >
                          {item.label}
                        </MenuItem>
                      ))}
                      <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
                    </MenuList>
                  </Menu>
                </>
              )}
            </Stack>
          </Flex>
        </Container>
      </Box>

      <Box p={4}>{children}</Box>

      {!isLandingPage && (
        <Box as="footer" py={6} bg={useColorModeValue('white', 'gray.900')} mt="auto">
          <Container maxW="container.xl">
            <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
              <Text color="gray.600">
                © {new Date().getFullYear()} OKEETROPICS. All rights reserved.
              </Text>
              <HStack spacing={4} mt={{ base: 4, md: 0 }}>
                <Text color="gray.600">Contact: info@okeetropics.com</Text>
                <Text color="gray.600">Phone: +1 (555) 123-4567</Text>
              </HStack>
            </Flex>
          </Container>
        </Box>
      )}
    </Box>
  );
} 