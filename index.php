<?php
// O index.php é o Front Controller e o nosso "Container de Dependências"
require_once 'router.php';
require_once 'AlunoRepository.php'; 
require_once 'service.php';
require_once 'controller.php';

// 1. MONTANDO O QUEBRA-CABEÇA (Injeção de Dependência)
// Instanciamos as classes de dentro para fora
$repositorio = new AlunoRepository();
$service = new MatriculaService($repositorio);
$controller = new MatriculaController($service); // Entregando o Service pronto para o Controller

$metodo = $_SERVER['REQUEST_METHOD'];
$dados = ($metodo === 'POST') ? $_POST : $_GET;

// 2. Passamos o Controller já montado para o Router poder usá-lo
// (Nota: você precisará garantir que seu router.php esteja preparado para receber ou usar essa variável $controller)
$router = new Router($controller); 
$router->direcionar($metodo, $dados);