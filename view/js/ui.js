// ==========================================
// 🚀 UTILITÁRIOS GLOBAIS (UI)
// ==========================================
 
// --- BOTÃO VOLTAR AO TOPO ---
const botaoTopo = document.getElementById("voltarTopo");
if (botaoTopo) {
  window.addEventListener("scroll", () => {
    botaoTopo.style.display = window.scrollY > 200 ? "block" : "none";
  });

  botaoTopo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// --- SIDEBAR MOBILE ---
const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.getElementById('menu-toggle');
const overlay = document.getElementById('overlay'); 

if (sidebar && toggleBtn && overlay) {
  const abrirSidebar = () => {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; 
  }
  const fecharSidebar = () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; 
  }

  toggleBtn.addEventListener('click', () => sidebar.classList.contains('open') ? fecharSidebar() : abrirSidebar());
  overlay.addEventListener('click', fecharSidebar);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fecharSidebar(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 768) fecharSidebar(); });
}

// --- POPOVERS FECHAR AO CLICAR FORA ---
const detalhesMenus = document.querySelectorAll('details.user-profile-wrapper, details.settings-wrapper');
if (detalhesMenus.length > 0) {
  document.addEventListener('click', (event) => {
    detalhesMenus.forEach((detalhe) => {
      if (!detalhe.contains(event.target)) detalhe.removeAttribute('open');
    });
  });
}