
exports.configureRoutes= (server)=>{
    return server.route([
            {
                method: 'GET',
                path: '/',
                 handler: getHandler
            },])
        }