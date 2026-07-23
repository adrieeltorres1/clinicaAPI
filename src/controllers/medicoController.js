const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function buscarMedicos() {
    const medicos = await prisma.medicos.findMany({
        include: { especialidades: true }
    });

    // o front-end espera "especialidade" (singular), mas a relação no Prisma
    // é "especialidades" (por causa do nome do model). Mapeamos aqui:
    return medicos.map((medico) => ({
        ...medico,
        especialidade: medico.especialidades
    }));
}

async function criarMedico(dados) {
    return await prisma.medicos.create({
        data: dados
    });
}

async function editarMedico(dados) {
    const { cpf_medico, ...resto } = dados;

    return await prisma.medicos.update({
        where: { cpf_medico },
        data: resto
    });
}

async function deletarMedico(cpf_medico) {
    return await prisma.medicos.delete({
        where: { cpf_medico }
    });
}

module.exports = {
    buscarMedicos,
    criarMedico,
    editarMedico,
    deletarMedico
};