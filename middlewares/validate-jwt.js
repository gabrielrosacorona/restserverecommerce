const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario');

const Usuario = require('../models/usuario');

const validateJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: "no hay token en la peticion"
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVETEKEY);
        
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en db'
            });
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no válido - status false'
            });
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }



}

module.exports = {
    validateJWT
}