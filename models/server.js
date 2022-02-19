const express = require('express');
const cors = require('cors');


class Server{

    constructor(){
        this.app = express();

        //Puerto
        this.port = process.env.PORT;

        // Endpoints
        this.usuariosPath = '/api/usuarios';

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    };

    middlewares(){
        //CORS
        this.app.use(cors());

        // Lectura y parseo del Body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));
    };

    routes(){

        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    
    };

    listen(){
        this.app.listen(this.port, () => {
            console.log('Sevidor corriendo el puerto ' + this.port);
        });
    };

};

module.exports = Server;