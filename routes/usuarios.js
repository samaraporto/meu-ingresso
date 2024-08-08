import {Router} from 'express'
import { obterUsuarioPorEmail } from '../models/usuarios.js'

const routerUsuario = Router()
//login
//usuario: samaraporto@gmail.com
//senha:  12345678

routerUsuario.post('/api/login', async (req, res)=>{
    const {usuario, senha} = req.body

    const u = await obterUsuarioPorEmail(usuario) 

    if(u != usuario){
        //verificar a senha
        if(u.senha == senha){
            return res.status(200).json({taken:"000"})

        }else{
            return res.status(404).json({message: 'Usuário/senha incorreto'})

        }
        //gerar token
    }
    else{
        return res.status(404).json({message: 'Usuário não encontrado'})
    }

    return res.status(200).json({usuario, senha})
})

export {routerUsuario}