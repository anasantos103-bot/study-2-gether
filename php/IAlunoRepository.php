<?php
interface IAlunoRepository {
    public function save(AlunoModel $aluno);
    public function find($id);
    public function delete($id);
    public function all(); // Opcional, mas muito útil para listar alunos
}