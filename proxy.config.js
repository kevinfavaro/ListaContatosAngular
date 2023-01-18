const PROXY_CONFIG = {
    "/api/*": {
        target: 'https://localhost:44383/',
        changeOrigin: true,
        secure: false
    }
};
module.exports = PROXY_CONFIG;