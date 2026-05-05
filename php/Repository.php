<?php
require_once 'Database.php';
require_once 'model.php';
require_once 'IAlunoRepository.php';

class AlunoRepository implements IAlunoRepository {
    private $pdo;

    public function __construct() {
        $this->pdo = Database::getConnection();
    }

    public function save(AlunoModel $aluno) {
        $sql = "INSERT INTO alunos (nome, idade, curso) VALUES (:nome, :idade, :curso)";
        $stmt = $this->pdo->prepare($sql);
        
        return $stmt->execute([
            ':nome'  => $aluno->getNome(),
            ':idade' => $aluno->getIdade(),
            ':curso' => $aluno->getCurso()
        ]);
    }

    public function find($id) {
        $sql = "SELECT * FROM alunos WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function delete($id) {
        $sql = "DELETE FROM alunos WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([':id' => $id]);
    }

    public function all() {
        $sql = "SELECT * FROM alunos";
        return $this->pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }
}