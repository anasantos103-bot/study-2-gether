// ==========================================
// 📅 PÁGINA: CALENDÁRIO (VISUAL E EVENTOS)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const calendarGrid = document.getElementById('calendar-grid');
  const monthYearLabel = document.getElementById('month-year');
  const formAddEvento = document.getElementById('form-add-evento');
  const listaEventos = document.getElementById('lista-eventos');
   
  if (!calendarGrid) return; // Só executa se estiver na página do calendário

  // Lógica do Calendário Visual
  let dataAtual = new Date(); // Inicia na data de hoje
  
  // Lista fictícia para armazenar os eventos na memória do navegador
  let eventosMemoria = [
      { data: "2026-03-18", titulo: "Revisão Física", tipo: "Estudo" },
      { data: "2026-03-20", titulo: "Simulado Mat", tipo: "Prova" }
  ];

  function renderizarCalendario() {
      calendarGrid.innerHTML = ''; // Limpa a grade
      
      const mes = dataAtual.getMonth();
      const ano = dataAtual.getFullYear();
      
      // Atualiza o título (Ex: Março 2026)
      const mesesNomes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
      monthYearLabel.textContent = `${mesesNomes[mes]} ${ano}`;
      
      // Cálculos de dias
      const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
      const diasNoMes = new Date(ano, mes + 1, 0).getDate();
      
      // Células vazias antes do dia 1
      for (let i = 0; i < primeiroDiaSemana; i++) {
          const divMuda = document.createElement('div');
          calendarGrid.appendChild(divMuda);
      }
      
      // Preencher os dias
      const hoje = new Date();
      for (let dia = 1; dia <= diasNoMes; dia++) {
          const celula = document.createElement('div');
          celula.classList.add('day-cell');
          
          // Destaque para o dia de hoje
          if (dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear()) {
              celula.classList.add('today');
          }
          
          celula.innerHTML = `<span class="day-number">${dia}</span>`;
          
          // Formata a data atual do loop para "YYYY-MM-DD" para comparar com eventos
          const dataFormatada = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
          
          // Busca eventos para este dia
          eventosMemoria.forEach(ev => {
              if (ev.data === dataFormatada) {
                  const divEvento = document.createElement('div');
                  divEvento.classList.add('event-dot');
                  if(ev.tipo === 'Prova') divEvento.style.background = '#e74c3c'; // Muda cor se for prova
                  divEvento.textContent = ev.titulo;
                  celula.appendChild(divEvento);
              }
          });
          
          calendarGrid.appendChild(celula);
      }
  }

  // Navegação dos meses
  document.getElementById('prev-month').addEventListener('click', () => {
      dataAtual.setMonth(dataAtual.getMonth() - 1);
      renderizarCalendario();
  });
  
  document.getElementById('next-month').addEventListener('click', () => {
      dataAtual.setMonth(dataAtual.getMonth() + 1);
      renderizarCalendario();
  });

  // Inicializa o calendário visual
  renderizarCalendario();

  // --- ADICIONAR NOVO EVENTO PELO FORMULÁRIO ---
  formAddEvento.addEventListener('submit', (event) => {
      event.preventDefault();

      const titulo = document.getElementById('titulo-evento').value;
      const data = document.getElementById('data-evento').value;
      const hora = document.getElementById('hora-evento').value;
      const tipo = document.getElementById('tipo-evento').value;

      // 1. Adiciona na lista lateral
      const novoEvento = document.createElement('article');
      novoEvento.classList.add('calendar-item');
      
      let badgeClass = "badge-estudo";
      if(tipo === "Prova") badgeClass = "badge-prova";
      
      novoEvento.innerHTML = `
        <div class="item-checkbox">
          <input type="checkbox" class="check-concluido" title="Marcar como concluído">
        </div>
        <div class="item-content">
          <h4>${titulo}</h4>
          <div class="item-meta">
            <span>📅 ${data.split('-').reverse().join('/')}</span>
            <span>⏰ ${hora || "--:--"}</span>
            <span class="badge ${badgeClass}">${tipo}</span>
          </div>
        </div>
      `;

      // Insere logo após o título <h3>
      listaEventos.insertBefore(novoEvento, listaEventos.children[1]);
      
      // 2. Adiciona no calendário visual (salva no array e re-renderiza)
      eventosMemoria.push({ data: data, titulo: titulo, tipo: tipo });
      renderizarCalendario();

      formAddEvento.reset();
  });

  // --- MARCAR EVENTO COMO CONCLUÍDO ---
  // Usamos delegação de eventos para funcionar mesmo em itens criados depois
  listaEventos.addEventListener('change', (event) => {
      if (event.target.classList.contains('check-concluido')) {
          const itemPai = event.target.closest('.calendar-item');
          if (event.target.checked) {
              itemPai.classList.add('concluido');
          } else {
              itemPai.classList.remove('concluido');
          }
      }
  });
});