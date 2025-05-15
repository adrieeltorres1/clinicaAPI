const { Router } = require('express');
const { criarUsuario, login, getUsers, deletaUmUsuario } = require('../controllers/usuarioController');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
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
    const { id } = req.params;

    const resultado = await prisma.usuarios.delete({
      where: { usuario_id: Number(id) }
    });

    res.json({
      success: true,
      message: "Usuário deletado com sucesso",
      data: { id: resultado.usuario_id }
    });

  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ 
        error: "Usuário não encontrado" 
      });
    }
    res.status(500).json({ 
      error: "Erro interno",
      details: error.message 
    });
  }
});



module.exports = router;
