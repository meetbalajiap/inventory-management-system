import { Box, Icon, Text, VStack } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface StatCardProps {
  title: string;
  value: string;
  icon: IconType;
  color: string;
}

export default function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <Box
      p={6}
      bg="white"
      borderRadius="lg"
      boxShadow="sm"
      borderWidth="1px"
      borderColor="gray.200"
      _hover={{ boxShadow: 'md' }}
      transition="all 0.2s"
    >
      <VStack spacing={3} align="stretch">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Text fontSize="sm" color="gray.600">{title}</Text>
          <Icon as={icon} w={5} h={5} color={`${color}.500`} />
        </Box>
        <Text fontSize="2xl" fontWeight="bold" color="gray.800">
          {value}
        </Text>
      </VStack>
    </Box>
  );
} 