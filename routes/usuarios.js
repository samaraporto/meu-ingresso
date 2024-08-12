import {Router} from 'express'
import { obterUsuarioPorEmail, cadastrarUsuario } from '../models/usuarios.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


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
//cadastro de novo usuario
routerUsuario.post('/api/cadastro', async (req,res)=>{
    const {usuario,senha} = req.body
    const u = await obterUsuarioPorEmail(usuario)

    if(u){
        return res.status(400).json({message: 'usuario ja cadastrado'})
    }else{
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha,salt)
       await  cadastrarUsuario(usuario, senha)
       return res.status(201).json({message: 'usuarios cadastrado com sucesso'})
    }
})

routerUsuario.post('/api/login', async (req, res)=>{
    const {usuario, senha} = req.body

    const u = await obterUsuarioPorEmail(usuario) 

    const éIgual = bcrypt.compare(senha, u.senha)
    if(éIgual){
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