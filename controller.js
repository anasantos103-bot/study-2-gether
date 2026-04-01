/// 1. O Ponto de Entrada: Aguarda o navegador carregar o HTML
document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Study2Gether: Controller inicializado.");

    // 2. Referência ao Formulário 
    const formulario = document.querySelector('#form-perfil');

    // 3. O Ouvinte de Eventos (Event Listener)
    if (formulario) {
        formulario.addEventListener('submit', async (event) => {
            // Evita que a página recarregue
            event.preventDefault();

            // 4. Captura os dados dinamicamente dos inputs
            const dadosUsuario = {
                nome: document.querySelector('#nome').value,
                instituicao: document.querySelector('#instituicao').value,
                email: document.querySelector('#email') ? document.querySelector('#email').value : "sem-email@study.com",
                nivelXP: 0, // Começa no nível inicial para gamificação
                dataCriacao: new Date().toLocaleDateString('pt-BR')
            };

            try {
                // 5. Chama o banco de dados (que está global no db.js)
                const idGerado = await db.adicionar(dadosUsuario);
                
                console.log(" Dados salvos com sucesso! ID:", idGerado);
                alert(`Perfil de ${dadosUsuario.nome} salvo com sucesso!`);

                // Limpa os campos após o sucesso
                formulario.reset();

            } catch (erro) {
                console.error(" Erro ao salvar no banco:", erro);
                alert("Erro técnico ao salvar dados. Verifique o console.");
            }
        });
    }

    // Função para buscar dados e mostrar no console/tela
    async function atualizarInterface() {
        const todosUsuarios = await db.buscarTodos();
        console.log("Lista atualizada de usuários no banco:");
        console.table(todosUsuarios);
    }

    // Chama uma vez ao carregar a página para ver o que já está salvo
    atualizarInterface();
});
