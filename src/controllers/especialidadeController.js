const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function buscarEspecialidades(){
    return await prisma.especialidades.findMany();
}

async function buscaUmaEspecialidade(id) {
    return await prisma.especialidades.findFirst({
        where: { 
            id_especialidade: Number(id)
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
            nome_especialidade: dados.nome_especialidade
        },
        where: {
            id_especialidade: Number(id)  
        }
    });
}

async function deletaUmaEspecialidade(id) {
    return await prisma.especialidades.delete({
        where: {
            id_especialidade: Number(id)
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