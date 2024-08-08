import { dbPromise } from "./db.js";

async function criarTabelas(){
    const db = await dbPromise

    await db.run(`create table if not exists filmes(
        id text primary key,
        img text, 
        titulo text,
        genero text,
        ano integer, 
        direcao text,
        descricao text,
        valor real
        )`)

    await db.run(`
        create table if not exists usuarios(
            id integer primary key autoincrement,
            nome text unique not null,
            senha text not null
        )
        `)
}

criarTabelas()