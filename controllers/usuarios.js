
const { request, response } = require('express');

const usuariosGet = (req= request, res = response ) => {

    const { nombre } = req.query;

    res.json({
        msg: "Get Api - controlador",
        nombre
    })
}

const usuariosPut = (req = request, res = response) => {

    const id = req.params.id;

    res.status(400).json({
        msg: "Put Api - controlador",
        id
    })
}

const usuariosPost = (req = request, res = response) => {

    const { nombre, edad } = req.body;

    res.status(201).json({
        msg: "Post Api - controlador",
        nombre,
        edad
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: "Delete Api - controlador"
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
};