import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'super_admin';
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  payment: {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: Omit<User, 'id'>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Test accounts
const TEST_ACCOUNTS = {
  superAdmin: {
    email: 'meetbalajiap@gmail.com',
    password: 'AravindhUdhay@12415',
    role: 'super_admin' as const,
  },
  admin: {
    email: 'admin@okeetropics.com',
    password: 'Admin@123',
    role: 'admin' as const,
  },
  user: {
    email: 'user@okeetropics.com',
    password: 'User@123',
    role: 'user' as const,
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, you would verify the session with your backend
        // For now, we'll just check localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          
          // Redirect to login if accessing protected route without auth
          if (isProtectedRoute(router.pathname) && !parsedUser) {
            router.push(`/auth/login?redirect=${router.pathname}`);
          }
        } else if (isProtectedRoute(router.pathname)) {
          router.push(`/auth/login?redirect=${router.pathname}`);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        if (isProtectedRoute(router.pathname)) {
          router.push(`/auth/login?redirect=${router.pathname}`);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router.pathname]);

  const isProtectedRoute = (path: string) => {
    const protectedRoutes = [
      '/dashboard',
      '/orders',
      '/admin/orders',
      '/admin/products',
      '/admin/users',
      '/profile',
      '/checkout'
    ];
    return protectedRoutes.some(route => path.startsWith(route));
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Check against test accounts
      const account = Object.values(TEST_ACCOUNTS).find(
        acc => acc.email === email && acc.password === password
      );

      if (!account) {
        throw new Error('Invalid email or password');
      }

      // For demo purposes, set a mock user
      const mockUser = {
        id: '1',
        name: email.split('@')[0],
        email,
        role: account.role,
        phone: '+1234567890',
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
        },
        payment: {
          cardNumber: '**** **** **** 1234',
          cardHolder: email.split('@')[0],
          expiryDate: '12/25',
          cvv: '***',
        },
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));

      // Redirect based on user role
      const redirect = router.query.redirect as string;
      if (redirect) {
        router.push(redirect);
      } else {
        switch (account.role) {
          case 'super_admin':
            router.push('/admin/users');
            break;
          case 'admin':
            router.push('/dashboard');
            break;
          case 'user':
            router.push('/');
            break;
          default:
            router.push('/');
        }
      }
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: Omit<User, 'id'>) => {
    setLoading(true);
    try {
      // Mock API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // For demo purposes, set a mock user
      const mockUser = {
        id: '1',
        ...data,
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      router.push('/dashboard');
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 