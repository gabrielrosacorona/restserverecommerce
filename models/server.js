const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server{

    constructor(){
        this.app = express();

        //Puerto
        this.port = process.env.PORT;

        // Endpoints
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // Connect DB
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    };

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        // Lectura y parseo del Body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));
    };

    routes(){

        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    
    };

    listen(){
        this.app.listen(this.port, () => {
            console.log('Sevidor corriendo el puerto ' + this.port);
        });
    };

};

module.exports = Server;