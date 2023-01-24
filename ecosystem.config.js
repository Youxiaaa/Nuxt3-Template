module.exports = {
  apps: [
    {
      name: 'Nuxt3-Template',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      max_memory_restart: '512M',
      watch: true,
      autorestart: true
    }
  ]
}
