// Wait for the DOM to be fully loaded before running script
document.addEventListener('DOMContentLoaded', () => {

    // --- index.html ---
    const initiateChatBtn = document.getElementById('initiateChatBtn');
    const anonymousCheckbox = document.getElementById('anonymousCheckbox');

    if (initiateChatBtn) {
        initiateChatBtn.addEventListener('click', () => {
            const isAnonymous = anonymousCheckbox ? anonymousCheckbox.checked : false;
            alert(`Searching for an ally... (User is ${isAnonymous ? 'anonymous' : 'not anonymous'})` +
                  `\n\n--- Simulation ---` +
                  `\nThis would ideally send a request to the backend.`);
            // TODO: Backend integration: Send request to server, handle ally matching.
            // For now, we can simulate a redirect to the chat page after a delay,
            // or wait for an "ally to accept" on the ally_dashboard.
            // Let's assume for now the user is taken to a waiting state or directly to chat.
            // window.location.href = 'chat.html'; // Or a waiting page
        });
    }

    // --- ally_login.html ---
    const allyLoginForm = document.getElementById('allyLoginForm');
    if (allyLoginForm) {
        allyLoginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent actual form submission
            const username = document.getElementById('username').value;
            if (username) {
                alert(`Simulating login for ally: ${username}` +
                      `\n\n--- Simulation ---` +
                      `\nBackend would verify credentials here.`);
                // TODO: Backend integration: Send credentials to server for verification.
                // On successful login, redirect to ally_dashboard.html
                window.location.href = 'ally_dashboard.html';
            } else {
                alert('Please enter a username.');
            }
        });
    }

    // --- ally_dashboard.html ---
    const chatRequestsContainer = document.getElementById('chatRequestsContainer');
    if (chatRequestsContainer) {
        // Simulate receiving a chat request after a delay
        // TODO: Backend integration: Use WebSockets or polling to get real-time requests.
        setTimeout(() => {
            const requestDiv = document.createElement('div');
            requestDiv.className = 'chat-request';
            requestDiv.innerHTML = `
                <p>User (Anonymous) wants to chat.</p>
                <button class="acceptChatBtn">Accept</button>
            `;

            // Clear the 'No active requests' message if it exists
            const noRequestsMsg = chatRequestsContainer.querySelector('p');
            if (noRequestsMsg && noRequestsMsg.textContent.includes('No active requests')) {
                chatRequestsContainer.innerHTML = ''; // Clear the container
            }
            chatRequestsContainer.appendChild(requestDiv);

            const acceptChatBtn = requestDiv.querySelector('.acceptChatBtn');
            if (acceptChatBtn) {
                acceptChatBtn.addEventListener('click', () => {
                    alert('Chat accepted! Redirecting to chat room...' +
                          `\n\n--- Simulation ---` +
                          `\nBackend would establish connection.`);
                    // TODO: Backend integration: Notify user, establish chat session.
                    window.location.href = 'chat.html';
                });
            }
        }, 3000); // Simulate a request appearing after 3 seconds
    }

    // --- chat.html ---
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const messageInput = document.getElementById('messageInput');
    const messagesArea = document.getElementById('messagesArea');

    if (sendMessageBtn && messageInput && messagesArea) {
        sendMessageBtn.addEventListener('click', () => {
            const messageText = messageInput.value.trim();
            if (messageText) {
                const messageElement = document.createElement('p');
                messageElement.classList.add('message');
                // Simulate message from "You" (could be User or Ally depending on who is viewing)
                // TODO: Differentiate between user and ally messages clearly
                messageElement.innerHTML = `<strong>You:</strong> ${escapeHTML(messageText)}`;
                messagesArea.appendChild(messageElement);
                messageInput.value = '';
                messagesArea.scrollTop = messagesArea.scrollHeight; // Scroll to the bottom

                // TODO: Backend integration: Send message over WebSocket or other channel.
                // TODO: Backend integration: Receive messages from the other party.
            }
        });

        messageInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                sendMessageBtn.click();
            }
        });
    }

    // Helper function to escape HTML to prevent XSS (basic version)
    function escapeHTML(str) {
        return str.replace(/[&<>"']/g, function (match) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            }[match];
        });
    }
});
