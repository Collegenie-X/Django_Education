module.exports = {
  apps: [
    {
      name: 'studyola',
      cwd: './',
      script: 'server.js',
      exec_mode: 'cluster',
      instances: 2,
      autorestart: true,
      listen_timeout: 50000,
      kill_timeout: 5000,
      max_memory_restart: '2G',

      env: {
        NODE_ENV: 'production',
        PORT: '3000',
        // NODE_OPTIONS: "--trace-warnings" // NODE_OPTIONS 환경 변수를 추가합니다.
      },
    },
  ],
};
