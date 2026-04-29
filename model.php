<?php

class AlunoModel {
    // Propriedades privadas (Regra de Ouro: ninguém acessa de fora diretamente)
    private $nome;
    private $idade;
    private $curso;

    // Métodos Públicos: SETTERS (para definir os valores)
    public function setNome($nome) {
        $this->nome = $nome;
    }

    public function setIdade($idade) {
        $this->idade = $idade;
    }

    public function setCurso($curso) {
        $this->curso = $curso;
    }

    // Métodos Públicos: GETTERS (para recuperar os valores, se necessário)
    public function getNome() {
        return $this->nome;
    }

    public function getIdade() {
        return $this->idade;
    }

    public function getCurso() {
        return $this->curso;
    }

    // Método para salvar no banco de dados SQLite
    public function save() {
        try {
            $pdo = new PDO("sqlite:database.sqlite");
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $sql = "INSERT INTO alunos (nome, idade, curso) VALUES (?, ?, ?)";
            $stmt = $pdo->prepare($sql);

            $stmt->execute([
                $this->nome,
                $this->idade,
                $this->curso
            ]);

            return true; // Sucesso
        } catch (PDOException $e) {
            echo "Erro ao salvar aluno: " . $e->getMessage();
            return false;
        }
    }
}