const jwt = require('jsonwebtoken');

//Se le pasa el arreglo de roles que tienen acceso
const authPage = (permissions) => {
    return(req, res, next) => {
        //Obtiene el token de los headers
        const roleToken = req.headers.role.split(" ")[1];
        jwt.verify(roleToken, "debugkey", (err, decoded) => {
            if (err) {
                // El token no es válido o ha expirado
                return res.status(401).json("No tienes permiso.");
            } else {
                // El token es válido, extrae el rol del token
                const userRole = decoded.role;
                if (permissions.includes(userRole)) {
                    // El rol del usuario está en la lista de roles permitidos, llama a next()
                    next();
                } else {
                    // El rol del usuario no está en la lista de roles permitidos
                    return res.status(401).json("No tienes permiso.");
                }
            }
        });
    }
};

module.exports = {authPage}
