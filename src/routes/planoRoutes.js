const { buscarPlanos, buscaUmPlano, criaUmPlano, editaUmPlano, deletaUmPlanoPorNome } = require("../controllers/planoController");

const router = require("express").Router();

router.get("/", async (req, res) => {
    try {
        const planos = await buscarPlanos();
        res.send(planos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar planos" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const plano = await buscaUmPlano(req.params.id);
        res.send(plano);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar plano" });
    }
});

router.post("/criarplano", async (req, res) => {
    try {
        const planoCriado = await criaUmPlano(req.body);
        res.status(201).json(planoCriado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar plano" });
    }
});

router.put("/editarplanos/:id", async (req, res) => {
    try {
        const planoAtualizado = await editaUmPlano(req.body, req.params.id);
        res.json(planoAtualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao editar plano" });
    }
});

router.delete("/deletarplanos", async (req, res) => {
    try {
        const planoDeletado = await deletaUmPlanoPorNome(req.body.nome_plano);
        res.json(planoDeletado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar plano" });
    }
});

module.exports = router;
