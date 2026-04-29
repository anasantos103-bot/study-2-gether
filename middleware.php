<?php

class Middleware {
    public static function validarCadastro($dados) {
        // 1. Verificação Básica (Campos Obrigatórios)
        if (empty($dados['nome']) || empty($dados['idade']) || empty($dados['curso'])) {
            die("⚠️ [Middleware] Acesso Negado: O Study2Gether precisa de todos os campos preenchidos para calcular seu XP.");
        }

        // 2. Verificação de Tipo (Idade deve ser número)
        if (!is_numeric($dados['idade'])) {
            die("⚠️ [Middleware] Erro de Formato: A idade precisa ser um número para definirmos se você é Calouro ou Veterano.");
        }

        // 3. Regra de Segurança de Limite 
        if ($dados['idade'] > 100 || $dados['idade'] < 0) {
            die("⚠️ [Middleware] Dados Suspeitos: Por favor, insira uma idade válida.");
        }

        return true; 
    }
}