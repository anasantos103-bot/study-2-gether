<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Cadastro - Study2Gether</title>
    <style>
        body { font-family: sans-serif; background: #f4f7f6; display: flex; justify-content: center; padding: 50px; }
        .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); width: 300px; }
        input { width: 100%; margin: 10px 0; padding: 8px; box-sizing: border-box; }
        button { width: 100%; background: #4A90E2; color: white; border: none; padding: 10px; cursor: pointer; border-radius: 4px; }
        .msg { margin-bottom: 20px; padding: 10px; border-radius: 4px; font-size: 14px; }
    </style>
</head>
<body>
    <div class="card">
        <h2>Study2Gether</h2>
        <p>Registro de Aluno</p>

        <?php if (isset($mensagem)): ?>
            <div class="msg"><?php echo $mensagem; ?></div>
        <?php endif; ?>

        <form action="view.php" method="POST">
            <input type="text" name="nome" placeholder="Nome Completo" required>
            <input type="number" name="idade" placeholder="Idade" required>
            <input type="text" name="curso" placeholder="Seu Curso" required>
            <button type="submit">Cadastrar e Ganhar XP</button>
        </form>
    </div>
</body>
</html>