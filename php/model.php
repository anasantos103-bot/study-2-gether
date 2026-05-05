<?php
// Sem o SQL

class AlunoModel {
    private $nome;
    private $idade;
    private $curso;

    // Setters (Para gravar os dados no objeto)
    public function setNome($nome) { $this->nome = $nome; }
    public function setIdade($idade) { $this->idade = $idade; }
    public function setCurso($curso) { $this->curso = $curso; }

    // Getters (IMPORTANTE: O Repository vai usar esses para ler os dados e salvar no SQL)
    public function getNome() { return $this->nome; }
    public function getIdade() { return $this->idade; }
    public function getCurso() { return $this->curso; }
}