
const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async(req= request, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };


    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    })
}

const usuariosPut = async(req = request, res = response) => {

    const { id } = req.params;
    const { password, google, correo,...request } = req.body;

    if(password){

        // Encrypt the password
        const salt = bcryptjs.genSaltSync();
        request.password = bcryptjs.hashSync(password, salt);

    };

    const usuario = await Usuario.findByIdAndUpdate(id, request, { new: true });

    res.status(200).json({
        msg: "Actualizado correctamente",
        usuario
    })
}

const usuariosPost = async(req = request, res = response) => {

   

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    });

    // Encrypt the password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Save in the DB
    await usuario.save();

    res.status(201).json({
        msg: "Post Api - controlador",
        usuario
    })
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}, {new:true});

    res.json({
        msg: "Usuario borrado correctamente",
        usuario
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
};