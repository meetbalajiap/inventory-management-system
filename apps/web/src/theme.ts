import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    farm: {
      background: '#E8F5E9', // Light yellowish-green background
      primary: '#2E8B57', // Sea green
      secondary: '#8B4513', // Brown
      accent: '#FFD700', // Gold
      text: '#2C3E50', // Dark blue-gray
    },
  },
  styles: {
    global: {
      body: {
        bg: 'farm.background',
        color: 'farm.text',
      },
    },
  },
  fonts: {
    heading: '"Poppins", sans-serif',
    body: '"Open Sans", sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'farm.primary',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
        outline: {
          borderColor: 'farm.primary',
          color: 'farm.primary',
          _hover: {
            bg: 'farm.background',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'white',
          borderRadius: 'lg',
          boxShadow: 'md',
        },
      },
    },
  },
});

export default theme; 