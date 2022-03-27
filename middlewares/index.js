
// const { validarCampos } = require('../middlewares/validar-campos');
// const { isAdminRole, hasARole } = require('../middlewares/validate-roles');
// const { validateJWT } = require('../middlewares/validate-jwt');

const validarCampos = require('../middlewares/validar-campos');
const validateRoles = require('../middlewares/validate-roles');
const validateJWT = require('../middlewares/validate-jwt');

module.exports = {
    ...validarCampos,
    ...validateRoles,
    ...validateJWT
}