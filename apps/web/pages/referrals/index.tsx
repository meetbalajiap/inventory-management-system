import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Grid,
  GridItem,
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
} from '@chakra-ui/react';
import { FiCopy, FiShare2 } from 'react-icons/fi';
import Layout from '../../src/components/Layout';

// Mock referral data - replace with actual API call
const referralStats = {
  totalReferrals: 8,
  activeReferrals: 5,
  totalEarnings: 125.50,
  referralCode: 'OKEE-FRIEND-123',
  referralLink: 'https://okeetropics.com/ref/OKEE-FRIEND-123',
  discountRate: 10,
};

const referralHistory = [
  {
    id: 1,
    name: 'John Doe',
    date: '2024-03-10',
    status: 'Active',
    earnings: 25.00,
  },
  {
    id: 2,
    name: 'Jane Smith',
    date: '2024-03-08',
    status: 'Active',
    earnings: 30.50,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    date: '2024-03-05',
    status: 'Pending',
    earnings: 0,
  },
];

export default function Referrals() {
  const toast = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Referral link copied to clipboard',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading size="lg" color="farm.primary">Referral Program</Heading>
            <Text color="gray.600">Invite friends and earn rewards</Text>
          </Box>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
            <GridItem>
              <Card>
                <CardBody>
                  <Stat>
                    <StatLabel>Total Referrals</StatLabel>
                    <StatNumber>{referralStats.totalReferrals}</StatNumber>
                    <StatHelpText>People you've referred</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
            </GridItem>

            <GridItem>
              <Card>
                <CardBody>
                  <Stat>
                    <StatLabel>Active Referrals</StatLabel>
                    <StatNumber>{referralStats.activeReferrals}</StatNumber>
                    <StatHelpText>Successfully converted</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
            </GridItem>

            <GridItem>
              <Card>
                <CardBody>
                  <Stat>
                    <StatLabel>Total Earnings</StatLabel>
                    <StatNumber>${referralStats.totalEarnings.toFixed(2)}</StatNumber>
                    <StatHelpText>From referral rewards</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>

          <Card>
            <CardHeader>
              <Heading size="md">Share Your Referral Link</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4}>
                <Text>
                  Share this link with friends and they'll get {referralStats.discountRate}% off their first order.
                  You'll earn rewards when they make a purchase!
                </Text>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    value={referralStats.referralLink}
                    readOnly
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => handleCopy(referralStats.referralLink)}
                      leftIcon={<FiCopy />}
                    >
                      Copy
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Button
                  leftIcon={<FiShare2 />}
                  colorScheme="green"
                  width="full"
                >
                  Share Link
                </Button>
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <Heading size="md">Referral History</Heading>
            </CardHeader>
            <CardBody>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Date</Th>
                    <Th>Status</Th>
                    <Th>Earnings</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {referralHistory.map((referral) => (
                    <Tr key={referral.id}>
                      <Td>{referral.name}</Td>
                      <Td>{new Date(referral.date).toLocaleDateString()}</Td>
                      <Td>
                        <Badge
                          colorScheme={referral.status === 'Active' ? 'green' : 'yellow'}
                        >
                          {referral.status}
                        </Badge>
                      </Td>
                      <Td>${referral.earnings.toFixed(2)}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Layout>
  );
} 