const {
    buscarPacientes,
    criarPaciente,
    editarPaciente,
    deletarPaciente
} = require("../controllers/pacienteController");

const router = require("express").Router();

router.get("/", async (req, res) => {
    try {
        const pacientes = await buscarPacientes();
        res.json(pacientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar pacientes" });
    }
});

router.post("/", async (req, res) => {
    try {
        const paciente = await criarPaciente(req.body);
        res.json(paciente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar paciente" });
    }
});

router.put("/editarpacientes", async (req, res) => {
    try {
        const pacienteAtualizado = await editarPaciente(req.body);
        res.json(pacienteAtualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao editar paciente" });
    }
});

router.delete("/deletarpaciente", async (req, res) => {
    try {
        const resultado = await deletarPaciente(req.body.cpf_paciente);
        res.json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar paciente" });
    }
});

module.exports = router;