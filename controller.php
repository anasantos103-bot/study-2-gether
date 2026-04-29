<?php
require_once 'model.php';
require_once 'service.php';

class MatriculaController {
    public function processarMatricula($dadosPost) {
        try {
            // 1. Instancia o Service para aplicar as regras de negócio (XP e Validação)
            $service = new MatriculaService();
            $dadosProcessados = $service->processarMatricula(
                $dadosPost['nome'], 
                $dadosPost['idade'], 
                $dadosPost['curso']
            );

            // 2. Se o Service não lançou Exception, instanciamos o Model para salvar
            $aluno = new AlunoModel();
            $aluno->setNome($dadosProcessados['nome']);
            $aluno->setIdade($dadosProcessados['idade']);
            $aluno->setCurso($dadosProcessados['curso']);

            // 3. Salva no SQLite
            if ($aluno->save()) {
                return " Sucesso! {$dadosProcessados['nome']} foi cadastrado como {$dadosProcessados['categoria']} com {$dadosProcessados['xp_concedido']} XP!";
            } else {
                return " Erro ao salvar no banco de dados.";
            }

        } catch (Exception $e) {
            // Captura o erro lançado pelo Service 
            return "⚠️ Atenção: " . $e->getMessage();
        }
    }
}

// Lógica para capturar o envio do formulário
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $controller = new MatriculaController();
    $mensagem = $controller->processarMatricula($_POST);
}