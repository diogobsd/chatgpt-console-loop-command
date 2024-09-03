(function executeCommandLoop() {
    const TOTAL_COMMANDS = 50;  // Número total de comandos a serem enviados
    const MIN_WAIT_TIME_SEC = 3;  // Tempo mínimo de espera em segundos
    const MAX_WAIT_TIME_SEC = 6; // Tempo máximo de espera em segundos
    const COMMAND_TEXT = 'crie 50 frases novas diferentes da sua base de conhecimento e diferentes das suas respostas anteriores.'; // Texto do comando a ser enviado
    let count = 0;

    function getRandomWaitTime() {
        // Gera um tempo de espera aleatório entre MIN_WAIT_TIME_SEC e MAX_WAIT_TIME_SEC segundos
        return Math.floor(Math.random() * (MAX_WAIT_TIME_SEC - MIN_WAIT_TIME_SEC + 1) + MIN_WAIT_TIME_SEC) * 1000;
    }

    function checkAndSendCommand() {
        // Verifica se o botão de envio está disponível
        const sendButton = document.querySelector('button[data-testid="send-button"]');
        const stopButton = document.querySelector('button[data-testid="stop-button"]');
        
        if (!stopButton && sendButton && count < TOTAL_COMMANDS) {
            // Se o botão de envio está disponível e ainda não atingimos o limite de comandos, envia o próximo comando
            sendCommand();
        } else if (count < TOTAL_COMMANDS) {
            // Aguarda o tempo randomizado e verifica novamente se o botão de envio está disponível
            setTimeout(checkAndSendCommand, 1000); // Verifica a cada segundo
        }
    }

    function sendCommand() {
        // Seleciona o textarea onde o comando será escrito
        const textarea = document.querySelector('textarea#prompt-textarea');
        if (textarea) {
            // Insere o comando armazenado na variável COMMAND_TEXT no textarea
            textarea.value = COMMAND_TEXT;
            
            // Dispara o evento 'input' para simular a digitação no textarea
            textarea.dispatchEvent(new Event('input', { bubbles: true }));

            // Seleciona o botão de envio e dispara um clique
            const sendButton = document.querySelector('button[data-testid="send-button"]');
            if (sendButton) {
                sendButton.click();
                count++;
                
                // Exibe no console o status dos comandos enviados
                console.log(`Executado ${count}, faltam ${TOTAL_COMMANDS - count}`);

                // Após enviar o comando, aguarda o tempo randomizado antes de tentar enviar o próximo
                setTimeout(checkAndSendCommand, getRandomWaitTime());
            } else {
                console.error("Botão de envio não encontrado.");
            }
        } else {
            console.error("Textarea não encontrado.");
        }
    }

    // Inicia o processo
    checkAndSendCommand();
})();