// ==========================================
// 💬 PÁGINA: COMUNIDADE (INTERAÇÕES)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const listaDuvidas = document.getElementById('lista-duvidas');

  if (listaDuvidas) {
    listaDuvidas.addEventListener('click', (event) => {
      const target = event.target;
      const postPai = target.closest('.qa-post');
 
      if (!postPai) return;

      // 1. Mostrar/Ocultar Melhor Resposta
      if (target.classList.contains('btn-show-best')) {
        const bestBox = postPai.querySelector('.best-answer-box');
        if (bestBox) {
          const isHidden = bestBox.style.display === 'none';
          bestBox.style.display = isHidden ? 'block' : 'none';
          target.innerText = isHidden ? '🌟 Esconder Melhor Resposta' : '🌟 Ver Melhor Resposta';
        }
      }

      // 2. Mostrar/Ocultar Todas as Respostas
      if (target.classList.contains('btn-show-all')) {
        const allBox = postPai.querySelector('.all-answers-box');
        if (allBox) {
          const isHidden = allBox.style.display === 'none';
          allBox.style.display = isHidden ? 'block' : 'none';
          // Pega o número atual do texto "(X)" para manter
          const numMatch = target.innerText.match(/\(\d+\)/);
          const numTxt = numMatch ? ` ${numMatch[0]}` : '';
          target.innerText = isHidden ? `Ocultar respostas${numTxt}` : `Ver todas${numTxt}`;
        }
      }

      // 3. Curtir (Like) nas Respostas
      const btnLike = target.closest('.btn-like');
      if (btnLike) {
        const contadorSpan = btnLike.querySelector('.like-count');
        let curtidas = parseInt(contadorSpan.innerText);

        btnLike.classList.toggle('liked');
        
        if (btnLike.classList.contains('liked')) {
          curtidas++;
          // Animação de pulinho
          btnLike.style.transform = 'scale(1.1)';
          setTimeout(() => btnLike.style.transform = 'scale(1)', 150);
        } else {
          curtidas--;
        }
        contadorSpan.innerText = curtidas;
      }

      // 4. Votos da Pergunta Principal (Up/Down)
      if (target.classList.contains('btn-vote')) {
        const grupo = target.closest('.vote-group');
        const contadorSpan = grupo.querySelector('.vote-count');
        let votos = parseInt(contadorSpan.innerText);

        if (target.innerText === '▲') {
           votos++;
           target.style.color = '#00CC66'; // Verde vibrante
        } else if (target.innerText === '▼') {
           votos--;
           target.style.color = '#FF4757'; // Vermelho vibrante
        }
        contadorSpan.innerText = votos;
      }
    });
  }
});