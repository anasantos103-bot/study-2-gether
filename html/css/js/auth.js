// ==========================================
// 🔒 SISTEMA DE AUTENTICAÇÃO E PERFIL
// ==========================================
const paginaAtual = window.location.pathname.split('/').pop();
const dadosLogado = localStorage.getItem('estudante_logado');
let usuarioLogado = null;

// Tenta interpretar os dados do usuário
if (dadosLogado) { 
    usuarioLogado = JSON.parse(dadosLogado);
}

// Cão de guarda: Expulsa se não tiver logado
if (paginaAtual !== 'index.html' && paginaAtual !== 'login.html' && paginaAtual !== '' && !usuarioLogado) {
    window.location.replace('index.html'); // Aqui assumimos que index.html é o seu Login
}

// Atualizar a interface com o nome do usuário logado (EFEITO UAU)
document.addEventListener('DOMContentLoaded', () => {
    if (usuarioLogado) {
        // Troca o nome em todos os lugares que exibem o nome do usuário
        const elementosNome = document.querySelectorAll('.user-text-small strong, .popover-user-titles h4');
        elementosNome.forEach(el => el.textContent = usuarioLogado.nome);
    }

    // Lógica de Sair da Conta
    const botoesSair = document.querySelectorAll('a[href="sair.html"]');
    botoesSair.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); 
            localStorage.removeItem('estudante_logado'); 
            window.location.replace('index.html'); 
        });
    });
});