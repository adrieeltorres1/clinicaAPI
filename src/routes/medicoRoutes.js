const {
    buscarMedicos,
    criarMedico,
    editarMedico,
    deletarMedico
} = require("../controllers/medicoController");

const router = require("express").Router();

router.get("/", async (req, res) => {
    try {
        const medicos = await buscarMedicos();
        res.json(medicos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar médicos" });
    }
});

router.post("/criarmedico", async (req, res) => {
    try {
        const medico = await criarMedico(req.body);
        res.json(medico);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar médico" });
    }
});

router.put("/editarMedico", async (req, res) => {
    try {
        const medicoAtualizado = await editarMedico(req.body);
        res.json(medicoAtualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao editar médico" });
    }
});

router.delete("/deletarmedico", async (req, res) => {
    try {
        const resultado = await deletarMedico(req.body.cpf_medico);
        res.json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar médico" });
    }
});

module.exports = router;