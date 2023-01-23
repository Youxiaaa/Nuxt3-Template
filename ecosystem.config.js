module.exports = {
  apps: [
    {
      name: 'Nuxt3-Template',
      exec_mode: 'cluster',
      instances: '1',
      script: './.output/server/index.mjs'
    }
  ]
}
