const { buscarEspecialidades, buscaUmaEspecialidade, criaUmaEspecialidade, deletaUmaEspecialidade, editaUmaEspecialidade } = require("../controllers/especialidadeController");

const router = require("express").Router();

router.get("/", async (req, res) => {
    res.send(await buscarEspecialidades());
});
router.get("/:id", async (req, res) => {
    res.send(await buscaUmaEspecialidade(req.params.id));
});

router.post("/", async (req, res) => {
    res.send(await criaUmaEspecialidade(req.body));
});
router.put("/:id", async (req, res) => {
    res.send(await editaUmaEspecialidade(req.body, req.params.id));
});
router.delete("/:id", async (req, res) => {
    res.send(await deletaUmaEspecialidade(req.params.id));
});

module.exports = router;
