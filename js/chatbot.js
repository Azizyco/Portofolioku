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
    // Mencegah zoom saat input di fokus pada perangkat mobile
    const metaViewport = document.querySelector('meta[name=viewport]');
    if (metaViewport) {
        metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
    }
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
    
    // Mencari parent form jika ada
    const chatbotForm = chatbotInput ? chatbotInput.closest('form') : null;
    
    // Jika input berada dalam form, tambahkan event listener untuk mencegah submit default
    if (chatbotForm) {
        chatbotForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Mencegah form submit default yang menyebabkan refresh
            sendMessage();
        });
    }
    
    // Send message on button click (untuk desktop dan mobile)
    if (chatbotSendBtn) {
        // Event untuk klik mouse
        chatbotSendBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Mencegah perilaku default
            sendMessage();
        });
        
        // Event untuk sentuhan pada perangkat mobile
        chatbotSendBtn.addEventListener('touchstart', function(e) {
            e.preventDefault(); // Mencegah perilaku default
            sendMessage();
        });
    }
    
    // Send message on Enter key (keypress event)
    if (chatbotInput) {
        // Gunakan input event untuk menangani keyboard virtual pada mobile
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault(); // Mencegah perilaku default
                sendMessage();
            }
        });
        
        // Tambahkan event listener untuk keyboard virtual pada mobile
        chatbotInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault(); // Mencegah perilaku default
                sendMessage();
            }
        });
        
        // Tambahkan event listener untuk focus dan blur untuk mengatasi masalah keyboard virtual
        chatbotInput.addEventListener('focus', function() {
            // Scroll ke input saat keyboard muncul
            setTimeout(function() {
                chatbotInput.scrollIntoView(false);
            }, 300);
        });
    }
    
    // Add initial bot message
    setTimeout(() => {
        addMessage('Silahkan tanya terkait potofolio atau data yang perlu ditanyakan dalam portofolio ini.', 'bot');
    }, 500);
});