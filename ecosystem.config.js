module.exports = {
  apps: [
    {
      name: "yujian-frontend",
      cwd: "./prediction-market-frontend",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
        PORT: 3000
      },
      watch: false,
      autorestart: true,
      max_restarts: 10,
      min_uptime: "10s"
    },
    {
      name: "yujian-backend",
      cwd: "./prediction-market-backend",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
        PORT: 9000
      },
      watch: false,
      autorestart: true,
      max_restarts: 10,
      min_uptime: "10s"
    }
  ]
}
