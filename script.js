document.getElementById('send-button').addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    const inputMessage = document.getElementById('input-message').value.trim();
    
    if (username && inputMessage && ws.readyState === WebSocket.OPEN) {
        const messageToSend = `${username}: ${inputMessage}`;
        ws.send(messageToSend);
        addMessage(`You: ${inputMessage}`, 'sent');
        document.getElementById('input-message').value = '';
    } else if (!username) {
        alert('Please enter your name.');
    }
});

const statusDiv = document.getElementById('status');
const messagesDiv = document.getElementById('messages');

const ws = new WebSocket('wss://echo.websocket.org');

ws.onopen = () => {
    statusDiv.innerText = 'Status: Connected';
};

ws.onmessage = (event) => {
    addMessage(`Received: ${event.data}`, 'received');
};

ws.onclose = () => {
    statusDiv.innerText = 'Status: Disconnected';
};

ws.onerror = (error) => {
    addMessage(`Error: ${error.message}`, 'error');
};

function addMessage(message, type) {
    const messageElement = document.createElement('p');
    messageElement.innerText = message;
    messageElement.className = type;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
