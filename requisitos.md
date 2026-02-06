📋 Lista Estruturada de Requisitos Funcionais
Com base em nossa entrevista, compilei os requisitos essenciais para o desenvolvimento do Study2Gether. Eles estão organizados por categorias e priorizados para garantir uma base sólida.

1. Gestão de Perfil e Onboarding
RF01 (Alta): O sistema deve permitir o cadastro de usuários coletando Nome, Email, Instituição, Nível de Escolaridade e Curso.

RF02 (Alta): O sistema deve oferecer um questionário de onboarding para capturar semestre atual, disciplinas cursadas e interesses.

RF03 (Média): O sistema deve validar documentos de formação (diplomas/registros) para conceder o status de Expert Verificado.

2. Sistema de Perguntas e Respostas (Q&A)
RF04 (Alta): O sistema deve permitir a publicação de dúvidas categorizadas por disciplina e tags.

RF05 (Alta): O sistema deve implementar o modelo de validação híbrida (Marca do Autor + Votação da Comunidade + Endosso de Mentor).

RF06 (Média): O sistema deve ordenar respostas por relevância técnica (Experts) e popularidade (Upvotes).

3. Biblioteca de Materiais Acadêmicos
RF07 (Alta): O sistema deve permitir o upload de materiais com obrigatoriedade de metadados (Título, Disciplina, Tipo e Ano).

RF08 (Alta): O sistema deve aplicar automaticamente uma marca d'água digital invisível em cada arquivo baixado para rastreio de autoria.

RF09 (Média): O sistema deve arquivar automaticamente materiais que recebam avaliações abaixo de 3 estrelas após 30 dias.

4. Salas de Estudo Virtuais
RF10 (Alta): O sistema deve gerenciar salas síncronas (com vídeo/chat/lousa) e manter um log assíncrono (replay) por 7 dias.

RF11 (Alta): O sistema deve disponibilizar um Timer Pomodoro Coletivo e um Tracker de Foco sincronizado em tempo real.

5. Calendário e Organização
RF12 (Alta): O sistema deve permitir a criação de eventos individuais e a sugestão de eventos comunitários (ex: datas de prova).

RF13 (Média): O sistema deve converter sugestões comunitárias em eventos "Confirmados" após atingir um limite de validação social (consenso).

6. Gamificação e Comunicação
RF14 (Alta): O sistema deve gerenciar o acúmulo de XP e níveis, desbloqueando benefícios como maior limite de upload e criação de salas grandes.

RF15 (Alta): O sistema deve restringir o chat privado (MP) baseado em contexto comum (mesma instituição ou interação prévia) para evitar spam.

RF16 (Média): O sistema deve enviar notificações inteligentes (Push imediato para urgências e Resumos Batch para secundários).

7. Privacidade e Moderação (LGPD)
RF17 (Alta): O sistema deve permitir a exclusão total de conta e dados (Direito ao Esquecimento) de forma automatizada.

RF18 (Alta): O sistema deve manter os dados de desempenho (erros/acertos) estritamente privados, permitindo o compartilhamento anônimo com Mentores apenas via opt-in.
-----------------------------------------------------------------------------
🏗️ Requisitos Não Funcionais (RNF)
1. Desempenho e Escalabilidade
RNF01 (Alta): O sistema deve suportar até 5.000 usuários simultâneos em períodos de pico (épocas de prova) sem degradação perceptível de performance.

RNF02 (Alta): O tempo de resposta para ações críticas (como enviar uma mensagem no chat da sala de estudo ou votar em uma resposta) não deve exceder 200ms.

RNF03 (Média): O carregamento inicial da biblioteca de materiais e do feed inteligente não deve ultrapassar 2 segundos em conexões 4G estáveis.

2. Segurança e Privacidade (LGPD)
RNF04 (Crítica): Todos os dados em trânsito e em repouso devem ser criptografados utilizando protocolos AES-256 e TLS 1.3.

RNF05 (Crítica): O sistema deve estar em conformidade total com a LGPD, garantindo que o usuário possa baixar seus dados ou excluir sua conta permanentemente via painel de configurações.

RNF06 (Alta): Deve ser implementada a autenticação de dois fatores (2FA) opcional para usuários e obrigatória para administradores e Mentores.

3. Disponibilidade e Confiabilidade
RNF07 (Alta): A plataforma deve manter um uptime (tempo de atividade) de 99,5%, com janelas de manutenção programadas apenas em horários de baixo uso (ex: 03:00 AM).

RNF08 (Média): Em caso de falha crítica no servidor, o sistema de backup deve permitir a recuperação total dos dados em no máximo 4 horas (RTO - Recovery Time Objective).

4. Usabilidade e Acessibilidade
RNF09 (Alta): A interface deve ser responsiva, garantindo 100% de funcionalidade em dispositivos móveis (Android/iOS) e desktops.

RNF10 (Média): O sistema deve seguir as diretrizes da WCAG 2.1 nível AA, garantindo acessibilidade para usuários com deficiências visuais (contraste adequado, suporte a leitores de tela).

RNF11 (Baixa): A interface deve suportar "Modo Escuro" (Dark Mode) para reduzir o cansaço visual durante estudos noturnos.

5. Interoperabilidade e Tecnologia
RNF12 (Média): A API do sistema deve ser documentada (Swagger/OpenAPI) para facilitar futuras integrações com sistemas acadêmicos (ex: Moodle, Canvas).

RNF13 (Alta): O sistema de vídeo e áudio das salas de estudo deve utilizar o protocolo WebRTC para garantir baixa latência na comunicação síncrona.
