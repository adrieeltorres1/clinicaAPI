const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

// importando rotas
const especialidadeRoutes = require("./src/routes/especialidadeRoutes");
const medicoRoutes = require("./src/routes/medicoRoutes");       // ADICIONAR
const pacienteRoutes = require("./src/routes/pacienteRoutes");   // ADICIONAR
const planoRoutes = require("./src/routes/planoRoutes");
const usuarioRoutes = require("./src/routes/usuarioRoutes");


// middlewares = interceptadores
app.use(express.json());
app.use(cors());

// routes/endpoints = rotas 
app.get("/", (req, res) => {
    res.send("Rota default");
});

app.get("/boas-vindas", (req, res) => {
    res.send(`Seja bem-vindo`);
});

app.use("/especialidades", especialidadeRoutes);
app.use("/medicos", medicoRoutes);      
app.use("/pacientes", pacienteRoutes);  
app.use("/planos", planoRoutes);
app.use("/usuarios", usuarioRoutes);


app.get("/boas-vindas/:nome", (req, res) => {
    res.send(`Seja bem-vindo ${req.params.nome}`);
});

app.use((req, res) => {
    res.status(404).send("Rota não encontrada!");
})

app.listen(port, () => {
    console.log(`Servidor de pé: http://localhost:${port}`);
})