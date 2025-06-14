// Wait for the DOM to be fully loaded before running script
document.addEventListener('DOMContentLoaded', () => {

    // --- index.html ---
    const initiateChatBtn = document.getElementById('initiateChatBtn');
    const anonymousCheckbox = document.getElementById('anonymousCheckbox');

    if (initiateChatBtn) {
        initiateChatBtn.addEventListener('click', () => {
            const isAnonymous = anonymousCheckbox ? anonymousCheckbox.checked : false;
            const userData = {
                // userId: null, // Backend could generate a temporary ID or session for anonymous users
                isAnonymous: isAnonymous,
                timestamp: new Date().toISOString()
            };

            alert(`Searching for an ally... (User is ${isAnonymous ? 'anonymous' : 'not anonymous'})` +
                  `\n\n--- Simulation ---` +
                  `\nThis would ideally send a request to the backend.`);

            // TODO: Backend Integration for Chat Initiation:
            // 1. Send user data (userData) to a backend endpoint (e.g., POST /api/chat/request).
            // 2. Backend adds user to a queue or attempts to match with an available ally.
            //    - Ally availability could be tracked via their logged-in status and 'active' flag.
            //    - Matching logic could be FIFO, or based on other criteria.
            // 3. Client might then poll for status, or backend uses WebSockets to notify client
            //    once an ally is found and a chat room is created.
            // 4. On successful match, redirect user to chat.html?roomId=<chat_room_id>.
            // Example: fetch('/api/chat/request', { method: 'POST', body: JSON.stringify(userData), headers: {'Content-Type': 'application/json'} });

            // For now, simulation:
            // window.location.href = 'chat.html'; // Or a waiting page
        });
    }

    // --- ally_login.html ---
    const allyLoginForm = document.getElementById('allyLoginForm');
    if (allyLoginForm) {
        allyLoginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent actual form submission
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value; // Get password

            if (username && password) {
                alert(`Simulating login for ally: ${username}` +
                      `\n\n--- Simulation ---` +
                      `\nBackend would verify credentials here over HTTPS.`);

                // TODO: Backend Integration for Ally Login:
                // 1. Send credentials { username, password } to a secure backend endpoint (e.g., POST /api/ally/login).
                //    - ALWAYS USE HTTPS for login.
                // 2. Backend verifies credentials against a database.
                // 3. On success, backend creates a session (e.g., JWT token returned to client, or HTTP-only cookie).
                //    - Token would be stored securely by client (localStorage/sessionStorage for JWT).
                // 4. Redirect to ally_dashboard.html. Client should then also establish WebSocket connection for notifications.
                // Example:
                // fetch('/api/ally/login', {
                //   method: 'POST',
                //   body: JSON.stringify({ username, password }),
                //   headers: {'Content-Type': 'application/json'}
                // })
                // .then(response => response.json())
                // .then(data => {
                //   if(data.token) { /* Store token */ window.location.href = 'ally_dashboard.html'; }
                //   else { /* Handle login error */ }
                // });

                window.location.href = 'ally_dashboard.html'; // Simulated redirect
            } else {
                alert('Please enter both username and password.');
            }
        });
    }

    // --- ally_dashboard.html ---
    const chatRequestsContainer = document.getElementById('chatRequestsContainer');
    if (chatRequestsContainer) {
        // TODO: Backend Integration for Ally Dashboard - Real-time Chat Requests:
        // 1. After login, client (ally_dashboard.js) establishes a WebSocket connection to the backend.
        //    Example: const socket = new WebSocket('wss://yourserver.com/ally-notifications?token=<AUTH_TOKEN>');
        // 2. Backend sends messages over WebSocket when a new user requests a chat and is assigned to this ally.
        //    Example WebSocket message from server:
        //    {
        //      type: 'NEW_CHAT_REQUEST',
        //      data: {
        //        requestId: 'some_unique_id',
        //        userId: 'user_temp_id_or_name',
        //        isAnonymous: true,
        //        timestamp: '...'
        //      }
        //    }
        // 3. Client listens for these messages and dynamically adds them to `chatRequestsContainer`.

        // Simulate receiving a chat request:
        setTimeout(() => {
            const requestDiv = document.createElement('div');
            requestDiv.className = 'chat-request';
            const simulatedRequestId = 'req_' + Date.now();
            requestDiv.innerHTML = `
                <p>User (Anonymous) wants to chat. (ID: ${simulatedRequestId})</p>
                <button class="acceptChatBtn" data-request-id="${simulatedRequestId}">Accept</button>
            `;

            const noRequestsMsg = chatRequestsContainer.querySelector('p');
            if (noRequestsMsg && noRequestsMsg.textContent.includes('No active requests')) {
                chatRequestsContainer.innerHTML = '';
            }
            chatRequestsContainer.appendChild(requestDiv);

            const acceptChatBtn = requestDiv.querySelector('.acceptChatBtn');
            if (acceptChatBtn) {
                acceptChatBtn.addEventListener('click', (e) => {
                    const requestId = e.target.dataset.requestId;
                    alert('Chat accepted for request ID: ' + requestId + '\nRedirecting to chat room...' +
                          `\n\n--- Simulation ---` +
                          `\nBackend would establish connection and create/assign a chat room.`);

                    // TODO: Backend Integration for Accepting Chat:
                    // 1. Client sends a message to backend (WebSocket or HTTP POST /api/chat/accept) indicating acceptance.
                    //    Example WebSocket message: { type: 'ACCEPT_CHAT', payload: { requestId: '...' } }
                    // 2. Backend:
                    //    - Marks the request as accepted.
                    //    - Creates a unique chat room ID.
                    //    - Notifies both the user and the ally of the chat room ID, possibly redirecting them.
                    //    - Example: Redirect to chat.html?roomId=<chat_room_id>
                    window.location.href = `chat.html?roomId=${requestId}`; // Simulate with request ID as room ID
                });
            }
        }, 3000);
    }

    // --- chat.html ---
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const messageInput = document.getElementById('messageInput');
    const messagesArea = document.getElementById('messagesArea');

    if (sendMessageBtn && messageInput && messagesArea) {
        // TODO: Backend Integration for Chat Page:
        // 1. On page load, extract roomId from URL (e.g., using URLSearchParams).
        // 2. Client (chat.js) establishes a WebSocket connection to a chat-specific endpoint.
        //    Example: const chatSocket = new WebSocket('wss://yourserver.com/chat-room/<ROOM_ID>?token=<AUTH_TOKEN>');
        // 3. Authenticate user/ally for this room.

        sendMessageBtn.addEventListener('click', () => {
            const messageText = messageInput.value.trim();
            if (messageText) {
                const messagePayload = {
                    // senderId: 'current_user_or_ally_id', // From client session/token
                    // roomId: 'current_room_id',         // From URL
                    text: messageText,
                    timestamp: new Date().toISOString()
                };

                // TODO: Backend Integration - Sending a Message:
                // 1. Send the messagePayload over the WebSocket connection.
                //    Example WebSocket message from client:
                //    { type: 'CHAT_MESSAGE', payload: messagePayload }
                // 2. Backend receives message, broadcasts to other participant(s) in the room.
                //    Backend might also persist the message to a database.

                // Simulate local display:
                const messageElement = document.createElement('p');
                messageElement.classList.add('message');
                // This 'You' should be dynamically set based on whether it's the user or ally.
                // For now, it's generic.
                messageElement.innerHTML = `<strong>You:</strong> ${escapeHTML(messageText)}`;
                messagesArea.appendChild(messageElement);
                messageInput.value = '';
                messagesArea.scrollTop = messagesArea.scrollHeight;
            }
        });

        // TODO: Backend Integration - Receiving Messages:
        // chatSocket.onmessage = (event) => {
        //    const messageData = JSON.parse(event.data);
        //    if (messageData.type === 'CHAT_MESSAGE') {
        //        const messageElement = document.createElement('p');
        //        messageElement.classList.add('message');
        //        // Differentiate self vs other: if(messageData.payload.senderId === myId) { ... }
        //        messageElement.innerHTML = `<strong>${messageData.payload.senderName || 'Other'}:</strong> ${escapeHTML(messageData.payload.text)}`;
        //        messagesArea.appendChild(messageElement);
        //        messagesArea.scrollTop = messagesArea.scrollHeight;
        //    } else if (messageData.type === 'USER_JOINED' || messageData.type === 'USER_LEFT') {
        //        // Handle notifications for users joining/leaving
        //    }
        // };

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
