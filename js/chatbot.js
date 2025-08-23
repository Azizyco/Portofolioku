// Chatbot functionality

// API query function
async function query(data) {
    const response = await fetch(
        "http://localhost:3000/api/v1/prediction/e2f702f9-2b2b-4709-8063-509f84bf9c27",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );
    
    const result = await response.json();
    return result;
}

document.addEventListener('DOMContentLoaded', function() {
    // Prevent document clicks from closing chatbot when it's active
    document.addEventListener('click', function(e) {
        const chatbotContainer = document.querySelector('.chatbot-container');
        const chatbotFab = document.querySelector('.chatbot-fab');
        
        // If clicking outside chatbot and not on the toggle button, close chatbot
        if (chatbotContainer && chatbotContainer.classList.contains('active')) {
            if (!chatbotContainer.contains(e.target) && e.target !== chatbotFab && !chatbotFab.contains(e.target)) {
                chatbotContainer.classList.remove('active');
            }
        }
    });
    
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
    
    // Prevent chatbot from closing when interacting with input
    if (chatbotContainer) {
        chatbotContainer.addEventListener('click', function(e) {
            // Prevent event from bubbling up to document
            e.stopPropagation();
        });
        
        chatbotContainer.addEventListener('touchstart', function(e) {
            // Prevent event from bubbling up to document
            e.stopPropagation();
        });
        
        chatbotContainer.addEventListener('touchend', function(e) {
            // Prevent event from bubbling up to document
            e.stopPropagation();
        });
    }
    
    // Add event listener to input to prevent closing on focus
    if (chatbotInput) {
        chatbotInput.addEventListener('focus', function(e) {
            e.stopPropagation();
            // Prevent default behavior that might cause refresh
            e.preventDefault();
        });
        
        chatbotInput.addEventListener('click', function(e) {
            e.stopPropagation();
            // Prevent default behavior that might cause refresh
            e.preventDefault();
        });
        
        chatbotInput.addEventListener('touchstart', function(e) {
            e.stopPropagation();
        });
        
        chatbotInput.addEventListener('touchend', function(e) {
            e.stopPropagation();
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
    async function sendMessage() {
        const message = chatbotInput.value.trim();
        
        if (message !== '') {
            // Add user message to chat
            addMessage(message, 'user');
            
            // Clear input
            chatbotInput.value = '';
            
            // Show typing indicator
            showTypingIndicator();
            
            try {
                // Call API with user message
                const response = await query({"question": message});
                
                // Remove typing indicator
                removeTypingIndicator();
                
                // Add bot response
                // Periksa struktur respons API dan tampilkan bagian yang sesuai
                let botResponse = 'Maaf, saya tidak dapat memproses permintaan Anda saat ini.';
                
                if (response) {
                    if (typeof response === 'string') {
                        botResponse = response;
                    } else if (response.response) {
                        botResponse = response.response;
                    } else if (response.message) {
                        botResponse = response.message;
                    } else if (response.output) {
                        botResponse = response.output;
                    } else if (response.text) {
                        botResponse = response.text;
                    } else if (response.answer) {
                        botResponse = response.answer;
                    }
                }
                
                addMessage(botResponse, 'bot');
            } catch (error) {
                console.error('Error querying API:', error);
                
                // Remove typing indicator
                removeTypingIndicator();
                
                // Add error message
                addMessage('Maaf, terjadi kesalahan saat menghubungi server. Silakan coba lagi nanti.', 'bot');
            }
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
        addMessage('Silahkan tanya terkait potofolio atau data yang perlu ditanyakan dalam portofolio ini.', 'bot');
    }, 500);
});