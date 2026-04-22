// ==========================================
// 📚 PÁGINA: BIBLIOTECA (BUSCA REAL)
// ==========================================
const formBiblioteca = document.querySelector(".library-form");
if (formBiblioteca) {
  formBiblioteca.addEventListener("submit", (event) => {
    event.preventDefault();  
 
    // Pega o que o usuário digitou
    const termoBusca = document.getElementById("busca-material")?.value.toLowerCase() || "";
    const cards = document.querySelectorAll(".material-card");
    let encontrouAlgo = false;

    // Passa por cada material na tela escondendo ou mostrando
    cards.forEach(card => {
        const titulo = card.querySelector(".material-title").innerText.toLowerCase();
        const desc = card.querySelector(".material-desc").innerText.toLowerCase();
        
        if (titulo.includes(termoBusca) || desc.includes(termoBusca)) {
            card.style.display = "flex"; // Mostra
            encontrouAlgo = true;
        } else {
            card.style.display = "none"; // Esconde
        }
    });

    if (!encontrouAlgo) {
        alert("Nenhum material encontrado com esses termos.");
    }
  });
}

// ==========================================
// 📚 POSTAGEM DE MATERIAIS
// ==========================================
const formPostMaterial = document.querySelector(".library-form");
if (formPostMaterial) {
  formPostMaterial.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Coletar dados do formulário
    const titulo = document.getElementById("titulo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const materia = document.getElementById("post-materia").value;
    const tipo = document.getElementById("post-tipo").value;
    const assunto = document.getElementById("post-assunto").value.trim();
    const nivel = document.getElementById("post-nivel").value;
    const ano = document.getElementById("post-ano").value.trim();
    const tags = document.getElementById("post-tags").value.trim();
    const arquivo = document.getElementById("post-arquivo").files[0];

    // Validações básicas
    if (!titulo || !materia || !tipo || !arquivo) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      // Simular upload do arquivo (em produção, seria para um servidor)
      const arquivoURL = URL.createObjectURL(arquivo);

      // Criar objeto do material
      const novoMaterial = {
        titulo,
        descricao,
        materia,
        tipo,
        assunto,
        nivel,
        ano: ano ? parseInt(ano) : null,
        tags: tags ? tags.split(",").map(tag => tag.trim()) : [],
        arquivoNome: arquivo.name,
        arquivoTamanho: arquivo.size,
        arquivoTipo: arquivo.type,
        arquivoURL,
        autor: "Cloud", // Em produção, pegar do usuário logado
        dataPostagem: new Date().toISOString(),
        likes: 0,
        comentarios: 0
      };

      // Salvar no IndexedDB
      await StudyDB.adicionar(novoMaterial, "materiais");

      // Limpar formulário
      formPostMaterial.reset();

      // Recarregar materiais
      await carregarMateriais();

      alert("Material postado com sucesso!");

    } catch (error) {
      console.error("Erro ao postar material:", error);
      alert("Erro ao postar material. Tente novamente.");
    }
  });
}

// ==========================================
// 📚 CARREGAR MATERIAIS
// ==========================================
async function carregarMateriais() {
  try {
    const materiais = await StudyDB.buscarTodos("materiais");
    const feedContainer = document.querySelector(".library-feed-container");

    if (!feedContainer) return;

    // Ordenar por data (mais recentes primeiro)
    materiais.sort((a, b) => new Date(b.dataPostagem) - new Date(a.dataPostagem));

    // Limpar feed atual
    const materiaisExistentes = feedContainer.querySelectorAll(".material-card");
    materiaisExistentes.forEach(card => card.remove());

    // Adicionar materiais
    materiais.forEach(material => {
      const card = criarCardMaterial(material);
      feedContainer.appendChild(card);
    });

  } catch (error) {
    console.error("Erro ao carregar materiais:", error);
  }
}

// ==========================================
// 📚 CRIAR CARD DE MATERIAL
// ==========================================
function criarCardMaterial(material) {
  const card = document.createElement("article");
  card.className = "material-card card";

  const dataFormatada = new Date(material.dataPostagem).toLocaleDateString("pt-BR");
  const tamanhoFormatado = formatarTamanho(material.arquivoTamanho);

  card.innerHTML = `
    <div class="material-header">
      <div class="material-badges">
        <span class="badge badge--${getBadgeClass(material.materia)}">${material.materia}</span>
        <span class="badge badge--${getBadgeClass(material.tipo)}">${material.tipo}</span>
      </div>
      <span class="material-date">Postado ${dataFormatada}</span>
    </div>

    <h4 class="material-title">${material.titulo}</h4>
    <p class="material-desc">${material.descricao}</p>

    <div class="material-meta-grid">
      <div class="meta-item">
        <span class="meta-label">Autor</span>
        <span class="meta-value author-link">@${material.autor}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Nível</span>
        <span class="meta-value">${material.nivel}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Ano</span>
        <span class="meta-value">${material.ano || "N/A"}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Tamanho</span>
        <span class="meta-value">${tamanhoFormatado} (${material.arquivoTipo.split("/")[1].toUpperCase()})</span>
      </div>
    </div>

    ${material.tags && material.tags.length > 0 ? `
    <div class="material-tags">
      ${material.tags.map(tag => `<span>#${tag}</span>`).join("")}
    </div>
    ` : ""}

    <div class="material-footer">
      <div class="material-social">
        <button class="social-btn" title="Curtir">👍 ${material.likes || 0}</button>
        <button class="social-btn" title="Comentários">💬 ${material.comentarios || 0}</button>
      </div>
      <button type="button" class="btn-primary-sm" onclick="baixarMaterial(\"${material.arquivoURL}\", \"${material.arquivoNome}\")">Baixar Arquivo</button>
    </div>
  `;

  return card;
}

// ==========================================
// 📚 UTILITÁRIOS
// ==========================================
function getBadgeClass(tipo) {
  const classes = {
    "matematica": "solved",
    "fisica": "warning",
    "quimica": "warning",
    "biologia": "solved",
    "resumo": "open",
    "exercicios": "mentor",
    "mapa-mental": "open",
    "simulado": "warning",
    "prova": "mentor",
    "apostila": "solved",
    "flashcards": "open",
    "anotacoes": "open"
  };
  return classes[tipo] || "open";
}

function formatarTamanho(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function baixarMaterial(url, nome) {
  const link = document.createElement("a");
  link.href = url;
  link.download = nome;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ==========================================
// 📚 INICIALIZAÇÃO
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  carregarMateriais();
});
