const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete } = require('../controllers/usuarios');

const {
   validarCampos,
   isAdminRole,
   hasARole,
   validateJWT
} = require('../middlewares');

const { isValidRole, 
    isExistEmail, 
    isExistUserById } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isExistUserById),
    check('rol').custom(isValidRole),
    validarCampos
],usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser más de 6 caracteres').isLength({min: 6}),
    check('correo', 'El correo no el válido').isEmail(),
    check('correo').custom(isExistEmail),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( isValidRole ),
    validarCampos
],usuariosPost);

router.delete('/:id', [
    validateJWT,
    // isAdminRole,
    hasARole('VENTAS_ROLE', 'ADMIN_ROLE', 'NOSE_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isExistUserById),
    validarCampos
],usuariosDelete);


module.exports = router;