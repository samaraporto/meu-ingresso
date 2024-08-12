import {dbPromise} from '../database/db.js'

async function obterUsuarioPorEmail(email){
    const db = await dbPromise

    const usuario = await db.get("select * from usuarios where nome = ?", [email])
    return usuario
}
async function cadastrarUsuario(nome, senha){
    const db = await dbPromise
    await db.run('insert into usuarios (nome, senha) values (?, ?)',[nome, senha])
}
export {obterUsuarioPorEmail, cadastrarUsuario}