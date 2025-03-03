'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/best');
  }, [router]);

  return null; // HomePage 컴포넌트는 아무것도 렌더링하지 않습니다.
};

export default HomePage;
