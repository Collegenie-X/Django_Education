// next.config.mjs

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['http://127.0.0.1'],
  },

  // api 요청 주소 숨김
  async rewrites() {
    return [
      {
        source: '/accounts/update_username',
        destination: `${baseURL}/accounts/users/update_username/`,
      },

      {
        source: '/store/list',
        destination: `${baseURL}/store/problems/`,
      },
      {
        source: '/store/reviews/:id',
        destination: `${baseURL}/reviews/:id/problem/`,
      },
      {
        source: '/reviews/:id',
        destination: `${baseURL}/reviews/:id/`,
      },
      {
        source: '/store/list/:id',
        destination: `${baseURL}/store/problems/:id/`,
      },
      {
        source: '/google/signin',
        destination: `${baseURL}/accounts/signin/google/`,
      },
      {
        source: '/users/info',
        destination: `${baseURL}/accounts/users/info/`,
      },
      {
        source: '/payments/list',
        destination: `${baseURL}/payments/orders/`,
      },
      {
        source: '/download/list',
        destination: `${baseURL}/downloads/`,
      },
      {
        source: '/report/list',
        destination: `${baseURL}/reports/`,
      },
      {
        source: '/payments/confirm',
        destination: `${baseURL}/payments/confirm/`,
      },
      {
        source: '/report/create',
        destination: `${baseURL}/reports/`,
      },
      {
        source: '/verify/token',
        destination: `${baseURL}/accounts/verify/token/`,
      },
      {
        source: '/payment/verify',
        destination: `${baseURL}/payments/check/`,
      },
      {
        source: '/info/notices',
        destination: `${baseURL}/notices/`,
      },
      {
        source: '/store/unit-types',
        destination: `${baseURL}/store/unit-types/`,
      },
      {
        source: '/store/section-types',
        destination: `${baseURL}/store/section-types/`,
      },
      {
        source: '/accounts/login',
        destination: `${baseURL}/accounts/users/login/`,
      },
      {
        source: '/downloads',
        destination: `${baseURL}/downloads/`,
      },
      {
        source: '/downloads/:downloadID',
        destination: `${baseURL}/downloads/:downloadID/`,
      },
    ];
  },
};

export default nextConfig;
