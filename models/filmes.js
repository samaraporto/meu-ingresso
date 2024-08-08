import {dbPromise} from '../database/db.js'


async function obtemTodosOsFilmes(){
    //obter os dados do bd e encaminhar pro cliente
  const db = await dbPromise

  const filmes = await db.all(`select * from filmes`)
  return filmes
}

export {obtemTodosOsFilmes}