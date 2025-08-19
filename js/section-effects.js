// Script untuk menerapkan efek canvas, floating-elements, dan light-effect di berbagai section
document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk membuat elemen canvas
    function createParticleCanvas(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        const canvas = document.createElement('canvas');
        canvas.id = `particleCanvas-${sectionId}`;
        canvas.className = 'section-particle-canvas';
        canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        `;
        
        // Sisipkan canvas sebagai elemen pertama di section
        section.insertBefore(canvas, section.firstChild);
        
        return canvas;
    }
    
    // Fungsi untuk membuat floating-elements
    function createFloatingElements(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        const floatingContainer = document.createElement('div');
        floatingContainer.className = 'floating-elements';
        floatingContainer.id = `floating-elements-${sectionId}`;
        floatingContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            pointer-events: none;
            overflow: hidden;
        `;
        
        // Buat 15 float-element dengan posisi acak (meningkatkan jumlah dari 6 menjadi 15)
        for (let i = 0; i < 15; i++) {
            const floatElement = document.createElement('div');
            floatElement.className = 'float-element';
            
            // Posisi acak dengan batasan agar tidak terlalu dekat dengan tepi
            const leftPos = 5 + Math.random() * 90; // 5% - 95%
            const topPos = 5 + Math.random() * 90; // 5% - 95%
            const delay = i * 0.8; // Delay animasi berbeda untuk setiap elemen (lebih cepat)
            const size = 3 + Math.random() * 5; // Ukuran bervariasi 3-8px
            const opacity = 0.3 + Math.random() * 0.4; // Opacity bervariasi 0.3-0.7
            
            floatElement.style.cssText = `
                left: ${leftPos}%;
                top: ${topPos}%;
                width: ${size}px;
                height: ${size}px;
                opacity: ${opacity};
                animation-delay: ${delay}s;
                background-color: rgba(0, 195, 156, ${opacity});
            `;
            
            floatingContainer.appendChild(floatElement);
        }
        
        // Sisipkan floating-elements setelah canvas
        const canvas = document.getElementById(`particleCanvas-${sectionId}`);
        if (canvas) {
            section.insertBefore(floatingContainer, canvas.nextSibling);
        } else {
            section.insertBefore(floatingContainer, section.firstChild);
        }
        
        return floatingContainer;
    }
    
    // Fungsi untuk membuat light-effect
    function createLightEffects(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        const lightEffect = document.createElement('div');
        lightEffect.className = 'light-effect';
        lightEffect.id = `light-effect-${sectionId}`;
        lightEffect.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 3;
            pointer-events: none;
            overflow: hidden;
        `;
        
        // Buat 10 titik cahaya dengan posisi acak
        for (let i = 0; i < 10; i++) {
            const lightPoint = document.createElement('div');
            lightPoint.className = 'light-point';
            
            // Posisi acak dengan batasan agar tidak terlalu dekat dengan tepi
            const leftPos = 5 + Math.random() * 90; // 5% - 95%
            const topPos = 5 + Math.random() * 90; // 5% - 90%
            const size = 3 + Math.random() * 5; // Ukuran bervariasi 3-8px
            const opacity = 0.1 + Math.random() * 0.3; // Opacity bervariasi 0.1-0.4
            
            lightPoint.style.cssText = `
                position: absolute;
                left: ${leftPos}%;
                top: ${topPos}%;
                width: ${size}px;
                height: ${size}px;
                background: rgba(0, 195, 156, ${opacity});
                border-radius: 50%;
                filter: blur(2px);
                animation: pulse 4s infinite alternate ${i * 0.5}s;
            `;
            
            lightEffect.appendChild(lightPoint);
        }
        
        // Sisipkan light-effect setelah floating-elements
        const floatingElements = document.getElementById(`floating-elements-${sectionId}`);
        if (floatingElements) {
            section.insertBefore(lightEffect, floatingElements.nextSibling);
        } else {
            section.insertBefore(lightEffect, section.firstChild);
        }
        
        // Tambahkan efek cahaya pada kursor
        section.addEventListener('mousemove', function(e) {
            const cursorLight = document.createElement('div');
            cursorLight.className = 'cursor-light';
            
            // Posisi berdasarkan posisi kursor relatif terhadap section
            const rect = section.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            cursorLight.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 20px;
                height: 20px;
                background: radial-gradient(circle, rgba(0, 162, 226, 0.5) 0%, rgba(0, 107, 195, 0) 70%);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 10;
                opacity: 0.7;
                filter: blur(3px);
                animation: fadeOut 1s forwards;
            `;
            
            lightEffect.appendChild(cursorLight);
            
            // Hapus elemen setelah animasi selesai
            setTimeout(() => {
                if (cursorLight.parentNode === lightEffect) {
                    lightEffect.removeChild(cursorLight);
                }
            }, 1000);
        });
        
        return lightEffect;
    }
    
    // Fungsi untuk menginisialisasi partikel pada canvas
    function initializeParticles(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const particlesArray = [];
        const numberOfParticles = 100; // Meningkatkan jumlah partikel
        
        // Set ukuran canvas
        function resizeCanvas() {
            const section = canvas.parentElement;
            canvas.width = section.offsetWidth;
            canvas.height = section.offsetHeight;
            
            // Reinisialisasi partikel saat ukuran canvas berubah
            if (particlesArray.length > 0) {
                particlesArray.length = 0;
                init();
            }
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Kelas Particle
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1.5; // Ukuran lebih besar
                this.speedX = Math.random() * 0.5 - 0.25; // Kecepatan tetap
                this.speedY = Math.random() * 0.5 - 0.25;
                this.color = `rgba(0, 195, 156, ${Math.random() * 0.5 + 0.1})`; // Opacity lebih tinggi
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Pantul di tepi
                if (this.x > canvas.width || this.x < 0) {
                    this.speedX = -this.speedX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.speedY = -this.speedY;
                }
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Inisialisasi partikel
        function init() {
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }
        
        // Animasi partikel
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            
            // Tambahkan koneksi antar partikel
            connectParticles();
            
            requestAnimationFrame(animate);
        }
        
        // Fungsi untuk menghubungkan partikel dengan garis
        function connectParticles() {
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    const dx = particlesArray[a].x - particlesArray[b].x;
                    const dy = particlesArray[a].y - particlesArray[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        const opacity = 1 - (distance / 100);
                        ctx.strokeStyle = `rgba(0, 195, 156, ${opacity * 0.2})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        init();
        animate();
    }
    
    // Daftar section yang akan ditambahkan efek (termasuk home)
    const sectionIds = ['home', 'about', 'education', 'skills', 'Project', 'contact'];
    
    // Terapkan efek ke setiap section
    sectionIds.forEach(sectionId => {
        // Skip pembuatan canvas untuk home section karena sudah ada
        if (sectionId !== 'home' || !document.getElementById('particleCanvas')) {
            const canvas = createParticleCanvas(sectionId);
            if (canvas && sectionId !== 'home') {
                initializeParticles(canvas.id);
            }
        }
        
        // Skip pembuatan floating-elements untuk home section karena sudah ada
        if (sectionId !== 'home' || !document.querySelector('.home .floating-elements')) {
            createFloatingElements(sectionId);
        }
        
        // Skip pembuatan light-effects untuk home section karena sudah ada
        if (sectionId !== 'home' || !document.querySelector('.home .light-effect')) {
            createLightEffects(sectionId);
        }
        
        // Tambahkan efek hover untuk semua gambar dengan class backgroundhome
        const backgroundImages = document.querySelectorAll('.backgroundhome');
        backgroundImages.forEach(img => {
            // Pastikan event listener hanya ditambahkan sekali
            if (!img.dataset.hoverInitialized) {
                img.dataset.hoverInitialized = 'true';
                
                // Tambahkan event listener untuk hover jika belum ada
                img.addEventListener('mouseenter', function() {
                    this.style.opacity = '0.7';
                });
                
                img.addEventListener('mouseleave', function() {
                    this.style.opacity = '1';
                });
            }
        });
    });
    
    // Tambahkan CSS untuk memastikan posisi relatif pada section
    const style = document.createElement('style');
    style.textContent = `
        section {
            position: relative;
            overflow: hidden;
        }
        
        .section-particle-canvas {
            opacity: 0.5; /* Tingkatkan opacity agar lebih terlihat */
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            pointer-events: none;
        }
        
        /* Sesuaikan ukuran float-element untuk section */
        section .float-element {
            position: absolute;
            width: 8px;
            height: 8px;
            background-color: rgba(0, 195, 156, 0.5);
            border-radius: 50%;
            opacity: 0.6;
            animation: float 15s infinite ease-in-out;
        }
        
        /* Sesuaikan ukuran light-effect untuk section */
        section .light-effect {
            opacity: 0.3; /* Tingkatkan opacity agar lebih terlihat */
        }
        
        /* Animasi untuk light-point */
        @keyframes pulse {
            0% {
                transform: scale(1);
                opacity: 0.2;
            }
            50% {
                transform: scale(1.5);
                opacity: 0.5;
            }
            100% {
                transform: scale(1);
                opacity: 0.2;
            }
        }
        
        /* Animasi untuk cursor-light */
        @keyframes fadeOut {
            0% {
                opacity: 0.7;
                width: 20px;
                height: 20px;
            }
            100% {
                opacity: 0;
                width: 40px;
                height: 40px;
            }
        }
        
        /* Animasi float untuk floating elements */
        @keyframes float {
            0%, 100% {
                transform: translateY(0) translateX(0);
            }
            25% {
                transform: translateY(-15px) translateX(10px);
            }
            50% {
                transform: translateY(-25px) translateX(-10px);
            }
            75% {
                transform: translateY(-15px) translateX(5px);
            }
        }
        
        /* Pastikan efek hover pada backgroundhome berfungsi */
        .backgroundhome {
            transition: opacity 0.5s ease;
        }
        
        .backgroundhome:hover {
            opacity: 0.7 !important;
        }
        
        /* Styling untuk light-point */
        .light-point {
            position: absolute;
            border-radius: 50%;
            filter: blur(2px);
        }
        
        /* Styling untuk cursor-light */
        .cursor-light {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
});