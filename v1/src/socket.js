let io;
const { createAdapter } = require('@socket.io/redis-adapter');
const { Emitter } = require("@socket.io/redis-emitter");
module.exports = {
    init: httpServer => {
        try {
            io = require('socket.io')(httpServer, {
                cors: {
                    origin: ["*","https://tuhimv2.mobilulasim.com","http://tuhimv2.mobilulasim.com" ,'http://localhost', 'https://localhost', 'capacitor://localhost', 'https://tuhimuat.azurewebsites.net', 'http://tuhimuat.azurewebsites.net', 'https://uat-tuhim.mobilulasim.com', 'http://uat-tuhim.mobilulasim.com'],
                    allowedHeaders: ["*"],
                    credentials: true,
                }
            });
            const pubClient = global.redisCli;
            const subClient = pubClient.duplicate();
            pubClient.on("error", (err) => {
                console.log(err);
            });
            io.adapter(createAdapter(pubClient, subClient));
            return io;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },
    getIO: () => {
        if(!io){
            throw new Error('Socket.io not initialized!');
        }
        const emitterIo = new Emitter(global.redisCli);
        return emitterIo;
    } 
};