<?php

class MatriculaService {

    /**
     * Regra de Negócio: Sistema de Experiência (XP) por Senioridade
     */
    public function processarMatricula($nome, $idade, $curso) {
        
        // 1. Validação de Segurança/Negócio (Lançando Exception)
        if (empty($curso) || strlen($curso) < 3) {
            throw new Exception("O curso informado é inválido para o registro na plataforma.");
        }

        if ($idade < 16) {
            throw new Exception("A idade mínima para participar da rede Study2Gether é 16 anos.");
        }

        // 2. Lógica Especializada: Bônus de XP por Senioridade (Veteranos)
        // Simulamos que quanto maior a idade, mais XP inicial o aluno possui
        $xpBase = 100;
        $bonusVeterano = 0;

        if ($idade >= 25) {
            $bonusVeterano = 500; // Veterano experiente
        } elseif ($idade >= 22) {
            $bonusVeterano = 300; // Aluno de meio de curso
        } elseif ($idade >= 19) {
            $bonusVeterano = 100; // Aluno iniciando transição
        } else {
            $bonusVeterano = 50;  // Calouro
        }

        $xpFinal = $xpBase + $bonusVeterano;

        // 3. Retorno dos dados processados 
        return [
            'nome' => $nome,
            'idade' => $idade,
            'curso' => $curso,
            'xp_concedido' => $xpFinal,
            'categoria' => ($bonusVeterano >= 300) ? "Mentor/Veterano" : "Estudante"
        ];
    }
}