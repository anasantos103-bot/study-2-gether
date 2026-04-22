// ==========================================
// 🎧 PÁGINA: SALAS DE ESTUDO (POMODORO, ENTRAR/SAIR, JITSI)
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
// 🚪 LÓGICA DE ENTRAR/SAIR DAS SALAS
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