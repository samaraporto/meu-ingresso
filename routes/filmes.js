import { Router } from 'express'
import {obtemTodosOsFilmes} from '../models/filmes.js'

const routerFilmes = Router()

routerFilmes.get('/api/filmes', async ( requisicao, resposta)=>{
  const filmes = await obtemTodosOsFilmes()
  return resposta.status(200).json(filmes)
})

export { routerFilmes } 