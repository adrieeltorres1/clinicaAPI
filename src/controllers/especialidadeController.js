const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function buscarEspecialidades(){
    return await prisma.especialidades.findMany();
}

async function buscaUmaEspecialidade(id) {
    return await prisma.especialidades.findFirst({
        where: { 
            especialidade_id: Number(id)
        }
    });
}

async function criaUmaEspecialidade(dados) {
    return await prisma.especialidades.create({
        data: dados
    })
}

async function editaUmaEspecialidade(dados, id) {
    return await prisma.especialidades.update({
        data: {
            especialidade_nome: dados.especialidade_nome
        },
        where: {
            especialidade_id: Number(id)  
        }
    });
}


async function deletaUmaEspecialidade(id) {
    return await prisma.especialidades.delete({
        where: {
            especialidade_id: Number(id)
        }
    })
}

module.exports = {
    buscarEspecialidades,
    buscaUmaEspecialidade,
    criaUmaEspecialidade,
    editaUmaEspecialidade,
    deletaUmaEspecialidade
}