/**
 * @file db.js
 * @description Camada de persistência local (IndexedDB) para a plataforma Study2Gether.
 * Arquitetado para ser assíncrono (Promises) e escalável para múltiplas tabelas.
 */

const StudyDB = {
    dbName: "Study2GetherDB",
    dbVersion: 2, // Versão 2: Suporte a múltiplas tabelas
    
    // Tabelas (Object Stores) planejadas para o ecossistema da plataforma
    stores: ["usuarios", "materiais", "eventos"],

    /**
     * 1. Iniciar Banco (Open / Upgrade)
     * Cria ou atualiza a estrutura do banco de dados no navegador.
     */
    iniciar() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            // onupgradeneeded dispara na primeira vez ou quando mudamos a dbVersion
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                console.log("⚙️ Study2GetherDB: Sincronizando tabelas...");
                
                // Cria as tabelas dinamicamente se elas não existirem
                this.stores.forEach(storeName => {
                    if (!db.objectStoreNames.contains(storeName)) {
                        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
                        console.log(`✅ Tabela '${storeName}' criada com sucesso.`);
                    }
                });
            };

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject("❌ Erro ao abrir IndexedDB: " + request.error);
        });
    },

    /**
     * 2. Adicionar ou Atualizar Item (Create / Update)
     * @param {Object} item - Objeto a ser salvo (se tiver 'id', ele atualiza; se não, ele cria).
     * @param {string} storeName - Nome da tabela (padrão: "usuarios")
     */
    async adicionar(item, storeName = "usuarios") {
        const db = await this.iniciar();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([storeName], "readwrite");
            const store = transaction.objectStore(storeName);
            const request = store.put(item); 

            request.onsuccess = () => resolve(request.result); // Retorna o ID gerado
            request.onerror = () => reject(`Erro ao salvar na tabela ${storeName}: ` + request.error);
        });
    },

    /**
     * 3. Buscar Todos os Itens (Read All)
     * @param {string} storeName - Nome da tabela (padrão: "usuarios")
     */
    async buscarTodos(storeName = "usuarios") {
        const db = await this.iniciar();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([storeName], "readonly");
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(`Erro ao buscar itens de ${storeName}: ` + request.error);
        });
    },

    /**
     * 4. Buscar Item Específico por ID (Read One) - NOVO E OTIMIZADO
     * @param {number} id - ID do registro
     * @param {string} storeName - Nome da tabela
     */
    async buscarPorId(id, storeName = "usuarios") {
        const db = await this.iniciar();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([storeName], "readonly");
            const store = transaction.objectStore(storeName);
            const request = store.get(id);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(`Erro ao buscar ID ${id}: ` + request.error);
        });
    },

    /**
     * 5. Deletar Item (Delete - Atende LGPD: Direito ao Esquecimento)
     * @param {number} id - ID a ser deletado
     * @param {string} storeName - Nome da tabela
     */
    async deletar(id, storeName = "usuarios") {
        const db = await this.iniciar();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([storeName], "readwrite");
            const store = transaction.objectStore(storeName);
            const request = store.delete(id);

            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(`Erro ao deletar ID ${id}: ` + request.error);
        });
    },

    /**
     * 6. Limpar Tabela Inteira (Truncate) - NOVO (Útil para testes)
     * @param {string} storeName - Nome da tabela
     */
    async limparTabela(storeName = "usuarios") {
        const db = await this.iniciar();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([storeName], "readwrite");
            const store = transaction.objectStore(storeName);
            const request = store.clear();

            request.onsuccess = () => {
                console.warn(`🧹 Tabela '${storeName}' foi esvaziada.`);
                resolve(true);
            };
            request.onerror = () => reject(`Erro ao limpar tabela ${storeName}: ` + request.error);
        });
    }
};

// Disponibilizando globalmente (Window)
window.db = StudyDB;
