<?php
// O index.php é o Front Controller: tudo começa aqui
require_once 'router.php';

$metodo = $_SERVER['REQUEST_METHOD'];
$dados = ($metodo === 'POST') ? $_POST : $_GET;

$router = new Router();
$router->direcionar($metodo, $dados);