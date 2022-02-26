const Role = require("../models/role");
const Usuario = require("../models/usuario");


const isValidRole = async( rol = '' ) => {
    const existRol = await Role.findOne({rol});
    if(!existRol){
        throw new Error(`El rol ${ rol } no esta registrado en la DB`)
    }
}

const isExistEmail = async( correo = '' ) => {
    const existEmail = await Usuario.findOne({correo});
    if(existEmail){
        throw new Error(`El email: ${ correo } ya se encuentra registrado en DB`);
    }
}

const isExistUserById = async( id = '' ) => {
    const existUser = await Usuario.findById(id);
    if(!existUser){
        throw new Error(`No existe usuario con ID: ${id}`);
    }
}


module.exports = {
    isValidRole,
    isExistEmail,
    isExistUserById
}