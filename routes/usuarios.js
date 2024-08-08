import {Router} from 'express'
import { obterUsuarioPorEmail } from '../models/usuarios.js'
import jwt from 'jsonwebtoken'


const senha_secreta = "s3nh@sup3rsecreta"
const routerUsuario = Router()
//login
//usuario: samaraporto@gmail.com
//senha:  12345678
routerUsuario.post('/api/token',(req, res)=>{
    const {token} = req.body
   try{
    const isValid = jwt.verify(token, senha_secreta)
    if(isValid){
        return res.status(200).json({message: 'valid'})
    }
   } catch(e){
       return res.status(404).json({message: 'invalid'})

   }
})
routerUsuario.post('/api/login', async (req, res)=>{
    const {usuario, senha} = req.body

    const u = await obterUsuarioPorEmail(usuario) 

    if(u != usuario){
        //verificar a senha
        if(u.senha === senha){
            const token  = jwt.sign({usuario, regrasDeAcesso: "administrador"}, senha_secreta,{ expiresIn: "10s"})
            return res.status(200).json({token})

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