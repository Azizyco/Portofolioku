// Particle system
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        
        this.init();
        this.bindEvents();
        this.animate();
    }
    
    init() {
        this.resizeCanvas();
        this.createParticles();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 24000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.8,
                speedY: (Math.random() - 0.5) * 0.8,
                opacity: Math.random() * 0.8 + 0.2,
                pulseSpeed: Math.random() * 0.02 + 0.01,
                angle: Math.random() * Math.PI * 2
            });
        }
    }
    
    bindEvents() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
        });
        
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    drawParticle(particle, time) {
        const pulse = Math.sin(time * particle.pulseSpeed * 100) * 0.3 + 0.7;
        
        // Mouse interaction
        const dx = this.mouse.x - particle.x;
        const dy = this.mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 120;
        
        if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            particle.x -= dx * force * 0.002;
            particle.y -= dy * force * 0.002;
        }
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.angle += 0.01;
        
        // Add slight orbital motion
        particle.x += Math.sin(particle.angle) * 0.5;
        particle.y += Math.cos(particle.angle) * 0.3;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = this.canvas.width;
        if (particle.x > this.canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = this.canvas.height;
        if (particle.y > this.canvas.height) particle.y = 0;
        
        // Draw glow effect
        this.ctx.save();
        this.ctx.globalAlpha = particle.opacity * pulse * 0.4;
        
        const glowGradient = this.ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 4
        );
        glowGradient.addColorStop(0, '#00c39c');
        glowGradient.addColorStop(0.5, 'rgba(0, 160, 99, 0.4)');
        glowGradient.addColorStop(1, 'rgba(0, 160, 80, 0)');
        
        this.ctx.fillStyle = glowGradient;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw core particle
        this.ctx.globalAlpha = particle.opacity * pulse;
        this.ctx.fillStyle = '#00c39c';
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.restore();
    }
    
    drawConnections() {
        this.ctx.save();
        this.ctx.strokeStyle = 'rgba(0, 93, 160, 0.1)';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.globalAlpha = (100 - distance) / 100 * 0.2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
        
        this.ctx.restore();
    }
    
    animate() {
        const time = Date.now() * 0.001;
        
        // Clear canvas
        this.ctx.fillStyle = '#081b29';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw mouse gradient effect
        if (this.mouse.x && this.mouse.y) {
            const mouseGradient = this.ctx.createRadialGradient(
                this.mouse.x, this.mouse.y, 0,
                this.mouse.x, this.mouse.y, 200
            );
            mouseGradient.addColorStop(0, 'rgba(0, 93, 160, 0.1)');
            mouseGradient.addColorStop(1, 'rgba(0, 93, 160, 0)');
            
            this.ctx.fillStyle = mouseGradient;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
        
        // Draw particle connections
        this.drawConnections();
        
        // Draw particles
        this.particles.forEach(particle => {
            this.drawParticle(particle, time);
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Additional interactive effects
class InteractiveEffects {
    constructor() {
        this.init();
    }
    
    init() {
        this.createStarField();
        this.addScrollEffect();
        this.addButtonEffects();
    }
    
    createStarField() {
        const starField = document.createElement('div');
        starField.className = 'star-field';
        starField.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            pointer-events: none;
        `;
        
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background:rgb(0, 160, 147);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.8 + 0.2};
                animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite alternate;
            `;
            starField.appendChild(star);
        }
        
        document.body.appendChild(starField);
        
        // Add twinkle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes twinkle {
                0% { opacity: 0.2; transform: scale(1); }
                100% { opacity: 1; transform: scale(1.5); }
            }
        `;
        document.head.appendChild(style);
    }
    
    addScrollEffect() {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelectorAll('.light-effect');
            const speed = -0.5;
            
            parallax.forEach(element => {
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }
    
    addButtonEffects() {
        const button = document.querySelector('.cta-button');
        
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
    new InteractiveEffects();
});

// Performance optimization
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        location.reload();
    }, 250);
});