/// 1. O Ponto de Entrada: Aguarda o navegador carregar o HTML
document.addEventListener('DOMContentLoaded', async () => {
    console.log("🚀 Study2Gether: Controller inicializado.");

    const STORE_USUARIOS = "usuarios";
    const MEU_ID = 1;

    try {
        await db.iniciar();

        let meuPerfil = await db.buscarPorId(MEU_ID, STORE_USUARIOS);
        if (!meuPerfil) { 
            meuPerfil = {
                id: MEU_ID,
                nome: "Visitante",
                status: "Iniciando os estudos",
                instituicao: "—",
                curso: "—",
                semestre: "—",
                interesses: "—",
                nivelXP: 0,
                dataCriacao: new Date().toLocaleDateString('pt-BR')
            };

            await db.adicionar(meuPerfil, STORE_USUARIOS);
        }

        const viewNome = document.getElementById('view-nome');
        if (viewNome) {
            preencherVisualizacao(meuPerfil);
        }

        const formulario = document.querySelector('#form-perfil');
        if (formulario) {
            preencherFormulario(meuPerfil);
            formulario.addEventListener('submit', async (event) => {
                event.preventDefault();
                atualizarPerfil(meuPerfil);

                try {
                    await db.adicionar(meuPerfil, STORE_USUARIOS);
                    alert(`Sucesso! Os dados de ${meuPerfil.nome} foram salvos.`);
                    window.location.href = "perfil.html";
                } catch (erro) {
                    console.error("Erro ao salvar no banco:", erro);
                    alert("Erro técnico ao salvar dados. Verifique o console.");
                }
            });
        }
    } catch (erro) {
        console.error("Erro ao inicializar o banco de dados:", erro);
    }
});

function preencherVisualizacao(perfil) {
    document.getElementById('view-nome').textContent = perfil.nome;
    document.getElementById('view-status').textContent = perfil.status;
    document.getElementById('view-instituicao').textContent = perfil.instituicao || "—";
    document.getElementById('view-curso').textContent = perfil.curso || "—";
    document.getElementById('view-semestre').textContent = perfil.semestre || "—";
    document.getElementById('view-interesses').textContent = perfil.interesses || "—";

    const sidebarNome = document.getElementById('sidebar-nome');
    if (sidebarNome) sidebarNome.textContent = perfil.nome;
}

function preencherFormulario(perfil) {
    document.querySelector('#nome').value = perfil.nome;
    document.querySelector('#status').value = perfil.status;
    document.querySelector('#instituicao').value = perfil.instituicao;
    document.querySelector('#curso').value = perfil.curso;
    document.querySelector('#semestre').value = perfil.semestre;
    document.querySelector('#interesses').value = perfil.interesses;
}

function atualizarPerfil(perfil) {
    perfil.nome = document.querySelector('#nome').value;
    perfil.status = document.querySelector('#status').value;
    perfil.instituicao = document.querySelector('#instituicao').value;
    perfil.curso = document.querySelector('#curso').value;
    perfil.semestre = document.querySelector('#semestre').value;
    perfil.interesses = document.querySelector('#interesses').value;
}