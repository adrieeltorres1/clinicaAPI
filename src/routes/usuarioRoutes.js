const { criarUsuario, login, getUsers, deletaUmUsuario } = require('../controllers/usuarioController');
const { safeMode } = require('../utils');

const router = require('express').Router();

router.post("/", safeMode, async (req, res) => {
    res.send(await criarUsuario(req.body));
})

router.post("/login", async (req, res) => {
    res.send(await login(req.body));
})

router.get("/", async (req, res) => {
    res.send(await getUsers());
});

router.delete("/:id", async (req, res) => {
    try {
        const resultado = await deletaUmUsuario(req.params.id);
        res.json({
            type: "success",
            message: "Usuário deletado com sucesso!",
            data: resultado
        });
    } catch (error) {
        res.status(500).json({
            type: "error",
            message: error.message
        });
    }
});


module.exports = router;
