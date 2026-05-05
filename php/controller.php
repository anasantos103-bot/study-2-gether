<?php
require_once 'model.php';
require_once 'service.php';
require_once 'BusinessRuleException.php';

class MatriculaController {
    
    // Variável privada para guardar o serviço
    private $service;

    // 1. Injeção de Dependência no Controller via Construtor
    // O Controller recebe o Service pronto, sem precisar usar 'new' aqui dentro.
    public function __construct(MatriculaService $service) {
        $this->service = $service;
    }

    // Método responsável por salvar os dados (pode se chamar store() ou processarMatricula())
    public function processarMatricula($dados) {
        
        // O Controller não tem mais nenhum If/Else de validação. Tudo é feito no Try-Catch.
        try {
            
            // Tentamos pedir para o Service fazer o trabalho dele
            $this->service->registrarAluno($dados);

            // 2. Se chegou aqui, o Service funcionou perfeitamente (não lançou erros).
            // Redirecionamos o usuário para a página de sucesso.
            header("Location: salas.html");
            exit; // Sempre use exit após um redirecionamento de header

        } catch (BusinessRuleException $e) {
            
            // 3. Se o Service lançar um erro de regra (ex: nome curto, já cadastrado), cai aqui.
            // Pegamos a mensagem de erro e renderizamos a view para o usuário.
            $mensagemErro = $e->getMessage();
            require 'view.php'; // O arquivo view.php vai exibir a variável $mensagemErro na tela
            
        } catch (Exception $e) {
            
            // Se der um erro grave de banco ou falha não mapeada, tratamos também.
            $mensagemErro = "Erro técnico inesperado: " . $e->getMessage();
            require 'view.php';
            
        }
    }
}