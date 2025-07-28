import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import api from '../services/api';

// --- Define the data structures ---
interface User {
  name: string;
}

interface Pool {
  id: number;
  destination: string;
  origin: string;
  departureTime: string;
  availableSeats: number;
  postedBy: string;
  description: string;
}

interface AppContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  pools: Pool[];
  isLoading: boolean;
  addPool: (poolData: Omit<Pool, 'id' | 'postedBy'>) => void;
}

// --- Create the context ---
const AppContext = createContext<AppContextType | undefined>(undefined);

// --- Mock Data (used as the starting point) ---
const mockPools = [
    { id: 1, destination: 'Chennai', origin: 'Katpadi Junction', departureTime: '7:30 PM', availableSeats: 2, postedBy: 'Mohit', description: 'Love discussing F1 and tech startups.' },
    { id: 2, destination: 'WhiteFields', origin: 'Main Gate', departureTime: '8:00 PM', availableSeats: 3, postedBy: 'Maria', description: 'Hoping for a Valorant companion for a few games!' },
    { id: 3, destination: 'VITV', origin: 'Mangalore Railway station', departureTime: '8:15 PM', availableSeats: 1, postedBy: 'Riya', description: 'Just need a quiet ride to finish my assignment.' },
];

// --- Create the Provider Component ---
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [pools, setPools] = useState<Pool[]>(mockPools); // Using mock data as initial state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPools = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/pools');
        // If the API call is successful, it will replace the mock data with real data
        setPools(response.data);
      } catch (error) {
        console.error("Failed to fetch pools:", error);
        // If the API call fails, the mock data will remain
      } finally {
        setIsLoading(false);
      }
    };

    fetchPools();
  }, []); // The empty array [] means this effect runs only once

  const login = (userData: User) => setUser(userData);

  const logout = () => setUser(null);

  const addPool = (poolData: Omit<Pool, 'id' | 'postedBy'>) => {
    const newPool: Pool = {
      id: Math.random(),
      postedBy: user?.name || 'Unknown',
      ...poolData,
    };
    setPools(prevPools => [newPool, ...prevPools]);
  };

  const isAuthenticated = !!user;

  return (
    <AppContext.Provider value={{ user, login, logout, isAuthenticated, pools, isLoading, addPool }}>
      {children}
    </AppContext.Provider>
  );
};

// --- Create the custom hook ---
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};