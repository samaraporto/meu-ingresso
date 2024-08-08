import {dbPromise} from '../database/db.js'

async function obterUsuarioPorEmail(email){
    const db = await dbPromise

    const usuario = await db.get("select * from usuarios where nome = ?", [email])
    return usuario
}

export {obterUsuarioPorEmail}