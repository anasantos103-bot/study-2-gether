<?php
require_once 'model.php';
require_once 'IAlunoRepository.php';
require_once 'BusinessRuleException.php';

class MatriculaService {
    private $repository;

    // Aqui está a Injeção de Dependência que o professor pediu!
    public function __construct(AlunoRepository $repository) {
        $this->repository = $repository;
    }

    public function registrarAluno($dados) {
        // 1. Validação (Regra de Negócio)
        if (empty($dados['nome']) || strlen($dados['nome']) < 3) {
            throw new BusinessRuleException("Nome inválido! O nome deve ter pelo menos 3 caracteres.");
        }

        // 2. Lógica de XP (Sua regra dos veteranos do Study2Gether)
        $xpInicial = ($dados['idade'] >= 25) ? 600 : 100;

        // 3. Criar a Entidade (O Model "limpo")
        $aluno = new AlunoModel();
        $aluno->setNome($dados['nome']);
        $aluno->setIdade($dados['idade']);
        $aluno->setCurso($dados['curso']);

        // 4. Salvar usando o Repositório injetado
        $sucesso = $this->repository->save($aluno);

        if (!$sucesso) {
            throw new BusinessRuleException("Falha técnica ao salvar o aluno no banco de dados.");
        }

        return [
            'mensagem' => "Aluno cadastrado com sucesso!",
            'xp' => $xpInicial
        ];
    }
}