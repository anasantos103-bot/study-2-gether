/// 1. O Ponto de Entrada: Aguarda o navegador carregar o HTML
document.addEventListener('DOMContentLoaded', async () => {
    console.log("🚀 Study2Gether: Controller inicializado.");

    // Define um ID padrão para o usuário atual (para não criar múltiplos perfis)
    const MEU_ID = 1;

    // Tenta buscar o perfil no banco. Se não existir, cria um padrão vazio.
    let meuPerfil = await db.buscarPorId(MEU_ID);
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
        await db.adicionar(meuPerfil);
    }

    // ==========================================
    // LÓGICA PARA A PÁGINA "MEU PERFIL" (Visualização)
    // ==========================================
    const viewNome = document.getElementById('view-nome');
    if (viewNome) {
        // Preenche os dados na tela
        document.getElementById('view-nome').textContent = meuPerfil.nome;
        document.getElementById('view-status').textContent = meuPerfil.status;
        document.getElementById('view-instituicao').textContent = meuPerfil.instituicao || "—";
        document.getElementById('view-curso').textContent = meuPerfil.curso || "—";
        document.getElementById('view-semestre').textContent = meuPerfil.semestre || "—";
        document.getElementById('view-interesses').textContent = meuPerfil.interesses || "—";
        
        // Atualiza a barra lateral caso os IDs existam nela
        const sidebarNome = document.getElementById('sidebar-nome');
        if (sidebarNome) sidebarNome.textContent = meuPerfil.nome;
    }

    // ==========================================
    // LÓGICA PARA A PÁGINA "EDITAR PERFIL"
    // ==========================================
    const formulario = document.querySelector('#form-perfil');
    if (formulario) {
        
        // 1. Ao carregar a página, PREENCHE os campos com os dados já salvos
        document.querySelector('#nome').value = meuPerfil.nome;
        document.querySelector('#status').value = meuPerfil.status;
        document.querySelector('#instituicao').value = meuPerfil.instituicao;
        document.querySelector('#curso').value = meuPerfil.curso;
        document.querySelector('#semestre').value = meuPerfil.semestre;
        document.querySelector('#interesses').value = meuPerfil.interesses;

        // 2. Ao enviar o formulário, ATUALIZA os dados
        formulario.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evita recarregar a página direto

            // Atualiza o objeto meuPerfil com os novos valores
            meuPerfil.nome = document.querySelector('#nome').value;
            meuPerfil.status = document.querySelector('#status').value;
            meuPerfil.instituicao = document.querySelector('#instituicao').value;
            meuPerfil.curso = document.querySelector('#curso').value;
            meuPerfil.semestre = document.querySelector('#semestre').value;
            meuPerfil.interesses = document.querySelector('#interesses').value;

            try {
                // Salva no banco (como meuPerfil tem ID=1, ele vai ATUALIZAR e não criar novo)
                await db.adicionar(meuPerfil);
                
                alert(`Sucesso! Os dados de ${meuPerfil.nome} foram salvos.`);
                
                // Redireciona o usuário de volta para a página de visualização do perfil
                window.location.href = "perfil.html"; 

            } catch (erro) {
                console.error(" Erro ao salvar no banco:", erro);
                alert("Erro técnico ao salvar dados. Verifique o console.");
            }
        });
    }
});
