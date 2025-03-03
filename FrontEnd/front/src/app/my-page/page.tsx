'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MyPageRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/my-page/0'); // /my-page로 접속 시 /my-page/0으로 리다이렉트
  }, [router]);

  return null;
}
