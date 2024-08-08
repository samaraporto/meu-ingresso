import express from "express"
import { routerFilmes } from './routes/filmes.js'
import { routerUsuario } from "./routes/usuarios.js";

const app = express();

app.use(express.json())
app.use(express.static("public"));

app.use(routerFilmes)
app.use(routerUsuario)

app.listen(3000, () => console.log("Servidor executando na porta 3000"));