// ==========================================
// 🔒 1. SISTEMA DE AUTENTICAÇÃO E PERFIL
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


// ==========================================
// 🚀 2. UTILITÁRIOS GLOBAIS (UI)
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


// ==========================================
// 📚 3. PÁGINA: BIBLIOTECA (BUSCA REAL)
// ==========================================
const formBiblioteca = document.querySelector('.library-form');
if (formBiblioteca) {
  formBiblioteca.addEventListener('submit', (event) => {
    event.preventDefault(); 

    // Pega o que o usuário digitou
    const termoBusca = document.getElementById('busca-material')?.value.toLowerCase() || "";
    const cards = document.querySelectorAll('.material-card');
    let encontrouAlgo = false;

    // Passa por cada material na tela escondendo ou mostrando
    cards.forEach(card => {
        const titulo = card.querySelector('.material-title').innerText.toLowerCase();
        const desc = card.querySelector('.material-desc').innerText.toLowerCase();
        
        if (titulo.includes(termoBusca) || desc.includes(termoBusca)) {
            card.style.display = 'flex'; // Mostra
            encontrouAlgo = true;
        } else {
            card.style.display = 'none'; // Esconde
        }
    });

    if (!encontrouAlgo) {
        alert("Nenhum material encontrado com esses termos.");
    }
  });
}


// ==========================================
// 💬 4. PÁGINA: COMUNIDADE (INTERAÇÕES)
// ==========================================
const sessaoComunidade = document.querySelector('.qa-list');
if (sessaoComunidade) {
  sessaoComunidade.addEventListener('click', (event) => {
    const botaoClicado = event.target;

    // UPVOTE FUNCIONAL
    if (botaoClicado.ariaLabel === 'Dar upvote' || botaoClicado.innerText === '▲') {
      botaoClicado.classList.toggle('voted');
      if (botaoClicado.classList.contains('voted')) {
          botaoClicado.style.color = "var(--brand-green)";
          botaoClicado.style.transform = "scale(1.2)";
      } else {
          botaoClicado.style.color = "";
          botaoClicado.style.transform = "scale(1)";
      }
    }

    // EXPANDIR RESPOSTA (Simulação)
    if (botaoClicado.classList.contains('btn--outline') && botaoClicado.innerText === 'Ver Resposta') {
      botaoClicado.innerText = 'Esconder Resposta';
      botaoClicado.style.background = 'var(--active)';
    } else if (botaoClicado.innerText === 'Esconder Resposta') {
      botaoClicado.innerText = 'Ver Resposta';
      botaoClicado.style.background = 'transparent';
    }
  });
}


// ==========================================
// 📅 5. PÁGINA: CALENDÁRIO (CRIAR EVENTO)
// ==========================================
const formCalendario = document.querySelector('.calendar-form');
const listaEventos = document.querySelector('.calendar-list');

if (formCalendario && listaEventos) {
  formCalendario.addEventListener('submit', (event) => {
    event.preventDefault();

    const titulo = document.getElementById('titulo-evento').value;
    const data = document.getElementById('data-evento').value;
    const hora = document.getElementById('hora-evento').value;
    const tipo = document.getElementById('tipo-evento').value;

    if (!titulo || !data) return alert("Preencha pelo menos o título e a data!");

    const novoEvento = document.createElement('article');
    novoEvento.classList.add('calendar-item');
    // Efeito visual de entrada
    novoEvento.style.opacity = '0';
    novoEvento.style.transform = 'translateY(-10px)';
    
    novoEvento.innerHTML = `
      <h4>${titulo}</h4>
      <p><strong>Data:</strong> ${data.split('-').reverse().join('/')}</p>
      <p><strong>Hora:</strong> ${hora || "--:--"}</p>
      <p><strong>Tipo:</strong> ${tipo}</p>
    `;

    // Adiciona ao topo da lista
    listaEventos.insertBefore(novoEvento, listaEventos.children[1]);
    formCalendario.reset();

    // Animação suave
    setTimeout(() => {
        novoEvento.style.transition = 'all 0.3s ease';
        novoEvento.style.opacity = '1';
        novoEvento.style.transform = 'translateY(0)';
    }, 50);
  });
}


// ==========================================
// 🎧 6. PÁGINA: SALAS DE ESTUDO (POMODORO)
// ==========================================

// Metas com Strikethrough (riscado)
const listaMetas = document.querySelector('.goals');
if (listaMetas) {
  listaMetas.addEventListener('change', (event) => {
    if (event.target.type === 'checkbox') {
      const textoLabel = event.target.closest('label');
      textoLabel.style.textDecoration = event.target.checked ? 'line-through' : 'none';
      textoLabel.style.color = event.target.checked ? 'var(--text-2)' : 'var(--text)';
    }
  });
}

// ⏱️ TRACKER POMODORO REAL
const secaoTracker = document.querySelector('.tracker');
if (secaoTracker) {
    const statusFoco = secaoTracker.querySelector('.tracker-status');
    
    // Injeta os botões do Pomodoro na interface dinamicamente
    statusFoco.innerHTML = `
        <div id="pomodoro-display" style="font-size: 2rem; font-weight: bold; color: var(--brand-blue); text-align: center; margin: 10px 0;">25:00</div>
        <div style="display: flex; gap: 10px; justify-content: center;">
            <button id="btn-start-pomodoro" class="btn-primary-sm">Iniciar</button>
            <button id="btn-reset-pomodoro" class="btn-subtle-sm">Zerar</button>
        </div>
    `;

    let tempoSegundos = 25 * 60;
    let timer = null;
    let rodando = false;

    const display = document.getElementById('pomodoro-display');
    const btnStart = document.getElementById('btn-start-pomodoro');
    const btnReset = document.getElementById('btn-reset-pomodoro');

    function atualizarDisplay() {
        const min = String(Math.floor(tempoSegundos / 60)).padStart(2, '0');
        const seg = String(tempoSegundos % 60).padStart(2, '0');
        display.textContent = `${min}:${seg}`;
    }

    btnStart.addEventListener('click', () => {
        if (!rodando) {
            rodando = true;
            btnStart.textContent = "Pausar";
            btnStart.style.background = "var(--warning)";
            
            timer = setInterval(() => {
                if (tempoSegundos > 0) {
                    tempoSegundos--;
                    atualizarDisplay();
                } else {
                    clearInterval(timer);
                    alert("Pomodoro concluído! Hora de uma pausa.");
                    rodando = false;
                    btnStart.textContent = "Iniciar";
                }
            }, 1000);
        } else {
            rodando = false;
            btnStart.textContent = "Continuar";
            btnStart.style.background = "var(--brand-blue)";
            clearInterval(timer);
        }
    });

    btnReset.addEventListener('click', () => {
        rodando = false;
        clearInterval(timer);
        tempoSegundos = 25 * 60;
        atualizarDisplay();
        btnStart.textContent = "Iniciar";
        btnStart.style.background = "var(--brand-blue)";
    });
}
// ==========================================
// 🚪 7. LÓGICA DE ENTRAR/SAIR DAS SALAS
// ==========================================
const roomsListView = document.getElementById('rooms-list-view');
const roomLiveView = document.getElementById('room-live-view');
const botoesEntrarSala = document.querySelectorAll('.btn-entrar-sala');
const btnSairSala = document.getElementById('btn-sair-sala');
const liveRoomTitle = document.getElementById('live-room-title');
const chatMeuNome = document.getElementById('chat-meu-nome');

if (roomsListView && roomLiveView) {
    
    // Atualiza o nome no chat para o nome do usuário logado (Efeito UAU)
    if (usuarioLogado && chatMeuNome) {
        chatMeuNome.innerText = usuarioLogado.nome + ":";
    }

    // Ação ao clicar em "Entrar na Sala" em qualquer card
    botoesEntrarSala.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Pega o card pai do botão clicado
            const roomCard = e.target.closest('.room-card');
            // Pega o título (h4) dentro desse card
            const roomName = roomCard.querySelector('h4').innerText;

            // 1. Atualiza o título da live para o nome da sala escolhida
            liveRoomTitle.innerText = `Sala: ${roomName}`;

            // 2. Esconde a lista e mostra a sala com animação
            roomsListView.classList.add('hidden');
            roomsListView.style.display = 'none';
            
            roomLiveView.style.display = 'block';
            
            // Joga a tela para o topo para ver o vídeo
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });

    // Ação ao clicar em "Sair da Sala"
    if (btnSairSala) {
        btnSairSala.addEventListener('click', () => {
            const confirmacao = confirm("Tem certeza que deseja sair da sessão de estudos?");
            
            if (confirmacao) {
                // Esconde a sala e mostra a lista novamente
                roomLiveView.style.display = 'none';
                roomsListView.style.display = 'block';
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
  // --- LÓGICA DO POMODORO ---
  let pomodoroInterval;
  let timeLeft;
  let isRunning = false;

  const display = document.getElementById('pomodoro-display');
  const input = document.getElementById('pomodoro-input');
  const btnStart = document.getElementById('btn-start');
  const btnReset = document.getElementById('btn-reset');

  // Só executa se estiver na página de salas
  if (display && input && btnStart && btnReset) {
    
    function updateDisplay(seconds) {
      const m = Math.floor(seconds / 60).toString().padStart(2, '0');
      const s = (seconds % 60).toString().padStart(2, '0');
      display.textContent = `${m}:${s}`;
    }

    function startTimer() {
      if (!timeLeft) {
        timeLeft = parseInt(input.value) * 60;
      }
      
      isRunning = true;
      btnStart.textContent = 'Pausar';
      
      pomodoroInterval = setInterval(() => {
        timeLeft--;
        updateDisplay(timeLeft);
        
        if (timeLeft <= 0) {
          clearInterval(pomodoroInterval);
          isRunning = false;
          btnStart.textContent = 'Iniciar';
          timeLeft = null;
          alert("⏰ Tempo esgotado! Faça uma pausa.");
        }
      }, 1000);
    }

    function pauseTimer() {
      clearInterval(pomodoroInterval);
      isRunning = false;
      btnStart.textContent = 'Retomar';
    }

    btnStart.addEventListener('click', () => {
      if (isRunning) {
        pauseTimer();
      } else {
        startTimer();
      }
    });

    btnReset.addEventListener('click', () => {
      clearInterval(pomodoroInterval);
      isRunning = false;
      timeLeft = parseInt(input.value) * 60;
      updateDisplay(timeLeft);
      btnStart.textContent = 'Iniciar';
    });

    // Atualiza o display instantaneamente se o usuário mudar o valor no input antes de iniciar
    input.addEventListener('change', () => {
      if (!isRunning) {
        timeLeft = parseInt(input.value) * 60;
        updateDisplay(timeLeft);
      }
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  // --- LÓGICA DA CHAMADA DE VÍDEO (JITSI) ---
  const jitsiContainer = document.getElementById('jitsi-container');

  if (jitsiContainer) {
    const domain = 'meet.jit.si';
    const options = {
      // O nome da sala. Pode ser dinâmico no futuro (ex: 'Study2Gether-Matematica')
      roomName: 'Study2Gether_SalaFoco_Oficial_2026',
      width: '100%',
      height: '100%',
      parentNode: jitsiContainer,
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: [
          'microphone', 'camera', 'desktop', 'fullscreen',
          'fodeviceselection', 'hangup', 'chat', 'settings'
        ],
      },
    };
    
    // Inicia a API do Jitsi dentro da sua div
    const api = new JitsiMeetExternalAPI(domain, options);
  }
});
