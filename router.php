<?php

class Router {
    public function direcionar($metodo, $dados) {
        if ($metodo === 'GET') {
            // Se for GET, apenas mostra o formulário
            require_once 'view.php';
        } 
        elseif ($metodo === 'POST') {
            // Se for POST, primeiro passa pelo Middleware
            require_once 'middleware.php';
            Middleware::validarCadastro($dados);

            // Se o middleware não deu 'die', chama o Controller
            require_once 'controller.php';
            $controller = new MatriculaController();
            $mensagem = $controller->processarMatricula($dados);
            
            // Depois de processar, mostra a view com a mensagem de sucesso ou erro
            require_once 'view.php';
        }
    }
}