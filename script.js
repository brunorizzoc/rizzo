const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const sendMessageBtn = document.getElementById('sendMessage');

sendMessageBtn.addEventListener('click', async () => {
    const userMessage = userInput.value.trim();
    if (userMessage !== '') {
        addUserMessage(userMessage);
        userInput.value = '';

        try {
            const apiKey = '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';
            const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    prompt: userMessage,
                    max_tokens: 50
                })
            });

            const data = await response.json();
            const botReply = data.choices[0].text;
            addBotMessage(botReply);
        } catch (error) {
            console.error('Erro ao chamar a API:', error);
        }
    }
});

function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.textContent = message;
    chatContainer.appendChild(messageDiv);
}

function addBotMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.textContent = message;
    chatContainer.appendChild(messageDiv);
}
