<?php

class Middleware {
    public static function validarCadastro($dados) {
        
        // 1. SANITIZAÇÃO (A Proteção contra XSS)
        // Aqui nós filtramos o que o usuário digitou, neutralizando tags HTML/JavaScript
        $dadosLimpos = [];
        $dadosLimpos['nome'] = filter_var($dados['nome'] ?? '', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
        $dadosLimpos['curso'] = filter_var($dados['curso'] ?? '', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
        // Para a idade, garantimos que só passem números inteiros
        $dadosLimpos['idade'] = filter_var($dados['idade'] ?? '', FILTER_SANITIZE_NUMBER_INT);

        // 2. Verificação Básica (Campos Obrigatórios) usando os dados limpos!
        if (empty($dadosLimpos['nome']) || empty($dadosLimpos['idade']) || empty($dadosLimpos['curso'])) {
            die("⚠️ [Middleware] Acesso Negado: O Study2Gether precisa de todos os campos preenchidos para calcular seu XP.");
        }

        // 3. Verificação de Tipo (Idade deve ser número)
        if (!is_numeric($dadosLimpos['idade'])) {
            die("⚠️ [Middleware] Erro de Formato: A idade precisa ser um número para definirmos se você é Calouro ou Veterano.");
        }

        // 4. Regra de Segurança de Limite 
        if ($dadosLimpos['idade'] > 100 || $dadosLimpos['idade'] < 0) {
            die("⚠️ [Middleware] Dados Suspeitos: Por favor, insira uma idade válida.");
        }

        // 5. Retornamos os dados higienizados para o Controller usar com segurança
        return $dadosLimpos; 
    }
}