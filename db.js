const StudyDB = {
    dbName: "Study2GetherDB",
    dbVersion: 1,
    storeName: "usuarios",
    // 1. Iniciar Banco (Open)
    iniciar() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            // Criar estrutura se for a primeira vez ou versão nova
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    // Criamos a store usando 'id' como chave primária (RF01)
                    db.createObjectStore(this.storeName, { keyPath: "id", autoIncrement: true });
                }
            };

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject("Erro ao abrir IndexedDB: " + request.error);
        });
    },

    // 2. Adicionar Item (Create/Update)
    async adicionar(item) {
        const db = await this.iniciar();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([this.storeName], "readwrite");
            const store = transaction.objectStore(this.storeName);
            const request = store.put(item); // put adiciona ou atualiza

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject("Erro ao salvar item: " + request.error);
        });
    },

    // 3. Buscar Todos os Itens (Read)
    async buscarTodos() {
        const db = await this.iniciar();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([this.storeName], "readonly");
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject("Erro ao buscar itens: " + request.error);
        });
    },

    // 4. Deletar Item (Delete - Atende RF17: Direito ao Esquecimento)
    async deletar(id) {
        const db = await this.iniciar();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([this.storeName], "readwrite");
            const store = transaction.objectStore(this.storeName);
            const request = store.delete(id);

            request.onsuccess = () => resolve(true);
            request.onerror = () => reject("Erro ao deletar item: " + request.error);
        });
    }
};

// Disponibilizando globalmente (Window)
window.db = StudyDB;
