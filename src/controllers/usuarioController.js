const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function criarUsuario(dados) {
    try {
        let senhaCriptografada = await bcrypt.hash(dados.usuario_senha, 10);
        dados = { ...dados, usuario_senha: senhaCriptografada };
        const checarEmail = await prisma.usuarios.count({
            where: {
                usuario_email: dados.usuario_email
            }
        })

        if (checarEmail > 0) {
            throw new Error("Este email já está cadastrado!");
        }

        const request = await prisma.usuarios.create({
            data: dados
        })

        if (request) {
            return {
                type: "success",
                message: "Registro cadastrado com sucesso!"
            }
        }
        return {
            type: "error",
            message: "Ocorreu um erro!"
        }
    } catch (error) {
        return {
            type: "error",
            message: error.message
        }
    }
}

async function login(dados) {
    try {
        const usuario = await prisma.usuarios.findFirst({
            where: {
                usuario_email: dados.usuario_email
            }
        })

        const logado = await bcrypt.compare(dados.usuario_senha, usuario.usuario_senha);

        if (logado) {
            let token = jwt.sign({ data: usuario.usuario_senha }, process.env.SEGREDO, { expiresIn: '1h' });
            return {
                type: "success",
                message: "Usuario logado!",
                token
            }
        } else {
            return {
                type: "warning",
                message: "Email ou senha incorretos"
            }
        }
    } catch (error) {
        return {
            type: "error",
            message: error.message
        }
    }
}
async function getUsers() {
    try {
        const usuarios = await prisma.usuarios.findMany();
        return usuarios;
    } catch (error) {
        return {
            type: "error",
            message: error.message
        };
    }
}

async function deletaUmUsuario(id) {
    return await prisma.usuarios.delete({
        where: {
            usuario_name: nome
        }
    })
}

module.exports = {
    criarUsuario,
    login,
    getUsers,
    deletaUmUsuario
}