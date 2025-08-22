// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotFab = document.querySelector('.chatbot-fab');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSendBtn = document.querySelector('.chatbot-input button');
    
    // Toggle chatbot visibility on mobile
    if (chatbotFab) {
        chatbotFab.addEventListener('click', function() {
            chatbotContainer.classList.toggle('active');
        });
    }
    
    // Toggle minimize/maximize chatbot
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', function() {
            chatbotContainer.classList.toggle('minimized');
            
            // Update toggle icon
            if (chatbotContainer.classList.contains('minimized')) {
                chatbotToggle.innerHTML = '<i class="bx bx-expand-alt"></i>';
            } else {
                chatbotToggle.innerHTML = '<i class="bx bx-minus"></i>';
            }
        });
    }
    
    // Send message function
    function sendMessage() {
        const message = chatbotInput.value.trim();
        
        if (message !== '') {
            // Add user message to chat
            addMessage(message, 'user');
            
            // Clear input
            chatbotInput.value = '';
            
            // Show typing indicator
            showTypingIndicator();
            
            // Simulate bot response (replace with actual API call later)
            setTimeout(() => {
                // Remove typing indicator
                removeTypingIndicator();
                
                // Add bot response
                addMessage('Ini adalah wadah chatbot saja. Integrasi dengan database akan dilakukan sendiri oleh pengguna.', 'bot');
            }, 1500);
        }
    }
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(sender + '-message');
        messageElement.textContent = text;
        
        chatbotMessages.appendChild(messageElement);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('typing-indicator');
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        
        chatbotMessages.appendChild(typingIndicator);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Send message on button click
    if (chatbotSendBtn) {
        chatbotSendBtn.addEventListener('click', sendMessage);
    }
    
    // Send message on Enter key
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Add initial bot message
    setTimeout(() => {
        addMessage('Halo! Ini adalah wadah chatbot. Silakan kirim pesan untuk melihat tampilan percakapan.', 'bot');
    }, 500);
});