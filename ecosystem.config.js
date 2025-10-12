module.exports = {
  apps: [
    {
      name: 'starbucks-app',
      script: 'npm',
      args: 'run preview',
      cwd: '/home/ubuntu/zennit-starbucks',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/home/ubuntu/.pm2/logs/starbucks-app-error.log',
      out_file: '/home/ubuntu/.pm2/logs/starbucks-app-out.log',
      log_file: '/home/ubuntu/.pm2/logs/starbucks-app-combined.log',
      time: true
    }
  ]
};
