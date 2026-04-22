/**
 * @file db.js
 * @description Camada de persistência local (IndexedDB) para a plataforma Study2Gether.
 * Arquitetado para ser assíncrono (Promises) e escalável para múltiplas tabelas.
 */

const StudyDB = {
    dbName: "Study2GetherDB",
    dbVersion: 2, // Versão 2: Suporte a múltiplas tabelas
    stores: ["usuarios", "materiais", "eventos"],

    dbInstance: null,
    openingRequest: null,

    async iniciar() {
        if (this.dbInstance) {
            return this.dbInstance;
        }

        if (this.openingRequest) {
            return this.openingRequest;
        }

        this.openingRequest = new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                console.log("⚙️ Study2GetherDB: Sincronizando tabelas...");

                this.stores.forEach(storeName => {
                    let store;

                    if (!db.objectStoreNames.contains(storeName)) {
                        store = db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
                        console.log(`✅ Tabela '${storeName}' criada com sucesso.`);
                    } else {
                        store = request.transaction.objectStore(storeName);
                    }

                    this._criarIndices(storeName, store);
                }); 
            };

            request.onsuccess = () => {
                const db = request.result;
                this.dbInstance = db;
                this.openingRequest = null;

                db.onversionchange = () => {
                    db.close();
                    alert("Uma nova versão do Study2GetherDB foi detectada. Atualize a página para continuar usando os dados com segurança.");
                };

                if (typeof db.onclose !== 'undefined') {
                    db.onclose = () => {
                        this.dbInstance = null;
                    };
                }

                resolve(db);
            };

            request.onerror = () => {
                this.openingRequest = null;
                reject("❌ Erro ao abrir IndexedDB: " + request.error);
            };

            request.onblocked = () => {
                console.warn("IndexedDB está bloqueado por outra aba. Feche outras abas e atualize esta página.");
                alert("O banco de dados não pôde ser atualizado porque outra aba está usando ele. Feche outras abas do navegador e atualize esta página.");
            };
        });

        return this.openingRequest;
    },

    _criarIndices(storeName, store) {
        if (!store) return;

        if (storeName === "usuarios") {
            if (!store.indexNames.contains("email")) {
                store.createIndex("email", "email", { unique: true });
            }
            if (!store.indexNames.contains("nome")) {
                store.createIndex("nome", "nome", { unique: false });
            }
        }

        if (storeName === "materiais") {
            if (!store.indexNames.contains("materia")) {
                store.createIndex("materia", "materia", { unique: false });
            }
            if (!store.indexNames.contains("titulo")) {
                store.createIndex("titulo", "titulo", { unique: false });
            }
        }

        if (storeName === "eventos") {
            if (!store.indexNames.contains("data")) {
                store.createIndex("data", "data", { unique: false });
            }
        }
    },

    async adicionar(item, storeName = "usuarios") {
        const db = await this.iniciar();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([storeName], "readwrite");
            const store = transaction.objectStore(storeName);
            const request = store.put(item);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(`Erro ao salvar na tabela ${storeName}: ` + request.error);
        });
    },

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

    async buscarPorIndice(storeName = "usuarios", indexName, value) {
        if (!indexName) {
            return Promise.reject("Nome do índice é obrigatório para buscar por índice.");
        }

        const db = await this.iniciar();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([storeName], "readonly");
            const store = transaction.objectStore(storeName);

            if (!store.indexNames.contains(indexName)) {
                reject(`Índice '${indexName}' não existe em '${storeName}'.`);
                return;
            }

            const index = store.index(indexName);
            const request = index.getAll(value);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(`Erro ao buscar por índice '${indexName}': ` + request.error);
        });
    },

    async buscarPorCursor(storeName = "usuarios", options = {}) {
        const { page = 1, pageSize = 20, indexName = null, value = null } = options;
        const db = await this.iniciar();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction([storeName], "readonly");
            const store = transaction.objectStore(storeName);
            const source = indexName ? store.index(indexName) : store;
            const range = value !== null ? IDBKeyRange.only(value) : null;
            const request = range ? source.openCursor(range) : source.openCursor();

            const resultados = [];
            let itensParaPular = Math.max(0, (page - 1) * pageSize);

            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (!cursor) {
                    resolve(resultados);
                    return;
                }

                if (itensParaPular > 0) {
                    itensParaPular -= 1;
                    cursor.continue();
                    return;
                }

                if (resultados.length < pageSize) {
                    resultados.push(cursor.value);
                    cursor.continue();
                    return;
                }

                resolve(resultados);
            };

            request.onerror = () => reject(`Erro ao paginar ${storeName}: ` + request.error);
        });
    },

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

window.db = StudyDB;