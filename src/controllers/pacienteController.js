const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function buscarPacientes() {
    return await prisma.pacientes.findMany({
        include: { planos: true }
    });
}

async function criarPaciente(dados) {
    return await prisma.pacientes.create({
        data: dados
    });
}

async function editarPaciente(dados) {
    const { cpf_paciente, ...resto } = dados;

    return await prisma.pacientes.update({
        where: { cpf_paciente },
        data: resto
    });
}

async function deletarPaciente(cpf_paciente) {
    return await prisma.pacientes.delete({
        where: { cpf_paciente }
    });
}

module.exports = {
    buscarPacientes,
    criarPaciente,
    editarPaciente,
    deletarPaciente
};