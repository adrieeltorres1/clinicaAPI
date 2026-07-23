const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function buscarPlanos() {
    return await prisma.planos.findMany();
}

async function buscaUmPlano(id) {
    return await prisma.planos.findFirst({
        where: {
            id_plano: Number(id)
        }
    });
}

async function criaUmPlano(dados) {
    return await prisma.planos.create({
        data: {
            nome_plano: dados.nome_plano,
            preco: Number(dados.preco ?? 0)
        }
    });
}

async function editaUmPlano(dados, id) {
    return await prisma.planos.update({
        data: {
            nome_plano: dados.nome_plano,
            preco: Number(dados.preco ?? 0)
        },
        where: {
            id_plano: Number(id)
        }
    });
}

async function deletaUmPlanoPorNome(nomePlano) {
    return await prisma.planos.delete({
        where: {
            nome_plano: nomePlano
        }
    });
}

module.exports = {
    buscarPlanos,
    buscaUmPlano,
    criaUmPlano,
    editaUmPlano,
    deletaUmPlanoPorNome
};
