// Footer.tsx
'use client';
import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import { CONTENT_WIDTH } from '@/config/config';
// 메뉴 항목 불러오기

// 스타일드 컴포넌트 생성
const FooterContainer = styled(Box)({
  marginTop: 50,
  paddingTop: 30,
  backgroundColor: '#1f1f1f',
  color: '#ececec',
  textAlign: 'center',
});

const FooterNav = styled(Box)({
  display: 'flex',
  marginBottom: '40px',
});

const FooterLink = styled(Link)({
  color: '#ececec',
  textDecoration: 'none',
  fontSize: '18px',
  fontWeight: 'bold',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const FooterText = styled(Typography)({
  fontSize: '14px',
  color: '#9c9c9c',
  marginBottom: '8px',
  textAlign: 'left',
});

const FooterLogo = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginBottom: '20px',
});

const Footer: React.FC = () => {
  // config/menuConfig.ts
  const MENU_ITEMS = [
    { label: 'Notice', href: '/notice' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'About Us', href: 'https://www.essayfit.com/' },
  ];

  return (
    <FooterContainer>
      <Container
        maxWidth="lg"
        sx={{
          maxWidth: {
            xl: `${CONTENT_WIDTH}px`,
            lg: '100%', // lg 이하에서 최대 너비 100%
            md: '100%', // md 이하에서 최대 너비 100%
            sm: '100%', // sm 이하에서 최대 너비 100%
            xs: '100%', // xs 이하에서 최대 너비 100%
          },
          mx: 'auto',
          px: { sm: 10, md: 10, lg: 15, xl: 10 },
          py: 5,
        }}
      >
        <FooterNav
          sx={{
            flexDirection: { xs: 'column', sm: 'column', md: 'row' },
            justifyContent: 'space-between',
            gap: 2,
            textAlign: 'left',
          }}
        >
          {MENU_ITEMS.map((item) => (
            <FooterLink key={item.href} href={item.href}>
              {item.label}
            </FooterLink>
          ))}
        </FooterNav>
        <FooterLogo>
          <Link href={'/'}>
            <Image
              src={'/studyola_store_logo.png'}
              alt={'StudyOla Store Logo'}
              height={100}
              width={200}
            />
          </Link>
        </FooterLogo>
        <FooterText>
          CEO: KIM KWANG IL | F1045, 490-2, Pungsan-dong, Hanam-si, Gyeonggi-do,
          South Korea | Phone: +82-10-5607-2119
        </FooterText>
        <FooterText>
          Business Registration Number: 572-87-01830 | support@essayfit.com |
          Mail-order Business Report Number: 2022-Gyeonggi Hanam-0624
        </FooterText>
        <FooterText>Collegenie AI Co., Ltd.</FooterText>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
