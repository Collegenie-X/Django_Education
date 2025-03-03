'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

import { useAuth } from '@/context/AuthContext';
import { cookieUtils } from '@/utiles/cookieUtils';

interface JwtPayload {
  exp: number;
}

const UserAutoLogout = () => {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  // eslint-disable-next-line consistent-return
  const logoutOnClick = async () => {
    const refresh = cookieUtils.getCookie('refresh');
    if (refresh) {
      try {
        await axios.post('/account/logout', { refresh });
        cookieUtils.deleteCookie('token');
        cookieUtils.deleteCookie('refresh');
        setIsLoggedIn(false);
        return router.push('/en');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedToken = cookieUtils.getCookie('token');
    setToken(storedToken); // 토큰을 상태에 설정
  }, [isLoggedIn]);

  useEffect(() => {
    if (!token) return;

    if (isLoggedIn) {
      let decoded: JwtPayload;
      try {
        decoded = jwtDecode<JwtPayload>(token);
      } catch (error) {
        logoutOnClick().catch((e) => {
          console.error(e);
        });
        return;
      }

      const tokenExpiry = decoded.exp;
      const currentTime = Math.floor(Date.now() / 1000);
      console.log('토큰만료시간', tokenExpiry);
      console.log('현재시간', Date());

      if (tokenExpiry > 0 && currentTime >= tokenExpiry) {
        console.log('토큰 만료되어서 로그아웃을 진행한다.');
        logoutOnClick().catch((error) => console.error(error));
        return;
      }

      const timeout = (tokenExpiry - currentTime) * 1000;
      const timeoutInMinutes = timeout / (1000 * 60);
      console.log(`토큰 유효시간: ${timeoutInMinutes} 분`);
      if (timeout > 0) {
        const timer = setTimeout(() => {
          console.log('토큰 만료되어서 로그아웃을 진행한다.');
          logoutOnClick().catch((error) => console.error(error));
        }, timeout);
        // eslint-disable-next-line consistent-return
        return () => clearTimeout(timer);
      }
    }
  }, [token, router]);
  return null;
};

export default UserAutoLogout;
