<?php

class Database {
    // Variável estática que guardará a conexão (o Singleton)
    private static $instancia = null;

    // Construtor privado: impede que alguém faça "new Database()" fora daqui
    private function __construct() {}

    public static function getConnection() {
        if (self::$instancia === null) {
            try {
                // 1. Lê o arquivo de configuração
                $config = parse_ini_file('config.ini');
                $dbPath = $config['path'];

                // 2. Cria a conexão PDO
                self::$instancia = new PDO("sqlite:" . $dbPath);
                
                // Configura para mostrar erros caso algo falhe
                self::$instancia->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                
            } catch (PDOException $e) {
                die("Erro de conexão: " . $e->getMessage());
            }
        }
        return self::$instancia;
    }
}