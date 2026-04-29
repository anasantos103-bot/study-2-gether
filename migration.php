<?php
// 1. Configura o caminho do banco de dados (o arquivo que será criado)
$databaseFile = 'database.sqlite';

try {
    // Conecta ao SQLite usando PDO 
    $pdo = new PDO("sqlite:" . $databaseFile);
    
    // Configura o PDO para lançar exceções em caso de erro
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    echo "✅ Conexão com o SQLite estabelecida com sucesso!\n";

    // O comando SQL para criar a tabela de alunos 
    $sql = "CREATE TABLE IF NOT EXISTS alunos (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                nome TEXT NOT NULL, 
                idade INTEGER, 
                curso TEXT
            )";

    // Executa o comando no banco de dados
    $pdo->exec($sql);

    echo " Tabela 'alunos' criada ou já existente.\n";
    echo " Preparação concluída! O arquivo $databaseFile já está na sua pasta.";

} catch (PDOException $e) {
    // Caso aconteça algum erro 
    echo " Erro ao preparar o banco de dados: " . $e->getMessage();
}