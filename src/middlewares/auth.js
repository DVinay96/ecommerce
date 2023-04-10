const jwt = require('json-web-token')

module.exports = (req, res, next) => {
    // extraemos token de la peticion

    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token'
        })
    }

    try {
        //confirmamos verifiacion del token con JWT
        const openToken = jwt.verify(token, process.env.SECRET)

        // Si esta bien, anclamos una propiedad adicional llamada user
        req.user = openToken.user

        next()
    } catch (error) {
        res.json({
            msg: 'Hubo un error',
            error,
        })

    }
}    
