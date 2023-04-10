const User = require('../models/users')
const bcryptjs = require('bcrypt')
const jwt = require('json-web-token')

// como meto el auth?
const getUser = async (request, response) => {
    try {
        const users = await User.find({});
        response.json(users);
    } catch (error) {
        console.log(error);
        response.json({
            message: 'Error'
        })
    }
}

const createUser = async (request, response) => {
    const { userName, email, password } = request.body;
    try {
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        //creamos usuario
        const respuestaDB = await User.create({
            userName,
            email,
            password: hashedPassword
        });
        // creamos JSON WEB TOKEN
        // Payload es un objeto que tendrá el ID del usuario en la base de datos, no agregar inforacion confidencial en el payload
        const payload = {
            user: {
                id: respuestaDB._id,
            },
        }

        //firmar JWT
        jwt.sign(
            payload, //Datos que acompañan el token
            process.env.SECRET, //llave para descrifrar la firma del token
            {
                expiresIn: 360000, //Expiracion del Token
            },
            (error, token) => {
                //callback que devuelve token si hay error
                if (error) throw error
                response.json({ token })
            }
        )
        response.json({
            message: 'User created',
        });
    } catch (error) {
        response.json({
            message: error.message
        })
    }
}


const login = async (req, res) => {
    const { email, password } = req.body

    try {
        let foundUser = await User.findOne({ email: email }) // ENCONTRAMOS UN USUARIO
        if (!foundUser) {
            // SI NO HUBO UN USUARIO ENCONTRADO, DEVOLVEMOS UN ERROR
            return res.status(400).json({ msg: 'El usuario no existe' })
        }

        // SI TODO OK, HACEMOS LA EVALUACIÓN DE LA CONTRASEÑA ENVIADA CONTRA LA BASE DE DATOS
        const passCorrecto = await bcryptjs.compare(password, foundUser.password)

        // SI EL PASSWORD ES INCORRECTO, REGRESAMOS UN MENSAJE SOBRE ESTO
        if (!passCorrecto) {
            return await res.status(400).json({ msg: 'Password incorrecto' })
        }

        // SI TODO CORRECTO, GENERAMOS UN JSON WEB TOKEN
        // 1. DATOS DE ACOMPAÑAMIENTO AL JWT
        const payload = {
            user: {
                id: foundUser.id,
            },
        }

        // 2. FIRMA DEL JWT
        if (email && passCorrecto) {
            jwt.sign(payload, process.env.SECRET, { expiresIn: 3600000 }, (error, token) => {
                if (error) throw error
                res.json({ token })
            })
        } else {
            res.json({ msg: 'Hubo un error', error })
        }
    } catch (error) {
        res.json({ msg: 'Hubo un error', error })
    }
}



const updateUser = async (request, response) => {
    const { email, userName, password } = request.body;
    try {
        const user = await User.findOneAndUpdate({ email }, { email, userName, password }, { new: true })
        if (user === null) {
            return response.json({
                message: error.message,
            })
        }
        response.json({
            message: 'User updated',
            user
        })
    } catch (error) {
        response.json({
            message: error.message,
        })
    }
}

const deleteUser = async (request, response) => {
    const { userName } = request.body;
    try {
        const user = await User.findOneAndDelete({ userName })
        if (user === null) {
            return response.json({
                message: error.message,
            })
        }
        response.json({
            message: 'User Deleted',
            userName
        })
    } catch (error) {
        response.json({
            message: error.message
        })
    }

}

module.exports = { getUser, createUser, updateUser, deleteUser, login }

