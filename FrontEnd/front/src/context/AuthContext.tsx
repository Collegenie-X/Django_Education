'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { verifyToken } from '@/api/ApiUser'; // tokenVerify API 호출 함수
import { useQuery } from '@tanstack/react-query';
import { cookieUtils } from '@/utiles/cookieUtils';
import PopupGoogleLogin from '@/components/Auth/PopupGoogleLogin';
// cookieUtils를 적절한 경로에서 import

interface AuthContextType {
  isLoggedIn: boolean;
  email: string;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setEmail: (email: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  email: '',
  setIsLoggedIn: () => {},
  setEmail: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    cookieUtils.getCookie('isLoggedIn') === 'true' || false,
  );
  const [email, setEmail] = useState<string>(
    cookieUtils.getCookie('email') || '',
  );

  const {
    data: isValidToken,
    error,
    isError,
  } = useQuery({
    queryKey: ['verifyToken'],
    queryFn: verifyToken,
    staleTime: 60 * 1000 * 5, // 5분
    retry: 1,
  });

  useEffect(() => {
    if (isValidToken?.is_valid && isValidToken?.user?.storedEmail) {
      setIsLoggedIn(true);
      setEmail(isValidToken?.user?.storedEmail);
    } else {
      setIsLoggedIn(false);
      setEmail('');
    }
  }, [isValidToken]);

  if (isError) {
    console.error('Error fetching token:', error);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        email,
        setEmail,
      }}
    >
      {children}

      <PopupGoogleLogin
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        onLoginSuccess={() => window.location.reload()}
        onLoginCancel={() => setDialogOpen(false)}
      />
    </AuthContext.Provider>
  );
};
