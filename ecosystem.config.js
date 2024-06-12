module.exports = {
    apps: [
        { 
           name: 'Techno Lock Keys',
           exec_mode: 'cluster',
           instances: 'max', // Or a number of instances
           script: './node_modules/nuxt/bin/nuxt.js',
           args: 'start',
           env: {
               NODE_ENV: "production",
               HOST: 'tlkeys.com',
               PORT: 4000
           }
        }
    ]
}