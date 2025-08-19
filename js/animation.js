// Script untuk memastikan animasi pada home-sci berfungsi dengan benar
document.addEventListener('DOMContentLoaded', function() {
    // Menambahkan class untuk animasi setelah halaman dimuat
    setTimeout(function() {
        const homeSci = document.querySelector('.home-sci');
        const homeContent = document.querySelector('.home-content');
        const backgroundHome = document.querySelector('.backgroundhome');
        
        if (homeSci) {
            homeSci.style.opacity = '0';
            homeSci.style.transform = 'translateX(-50px)';
            
            // Force reflow
            void homeSci.offsetWidth;
            
            // Mulai animasi
            homeSci.style.transition = 'opacity 1s ease, transform 1s ease';
            homeSci.style.opacity = '1';
            homeSci.style.transform = 'translateX(0)';
        }
        
        // Memastikan animasi lainnya juga berfungsi
        if (homeContent) {
            homeContent.style.opacity = '0';
            homeContent.style.transform = 'translateX(-50px)';
            
            // Force reflow
            void homeContent.offsetWidth;
            
            // Mulai animasi
            homeContent.style.transition = 'opacity 1s ease, transform 1s ease';
            homeContent.style.opacity = '1';
            homeContent.style.transform = 'translateX(0)';
        }
        
        if (backgroundHome) {
            backgroundHome.style.opacity = '0';
            backgroundHome.style.transform = 'translateX(50px)';
            
            // Force reflow
            void backgroundHome.offsetWidth;
            
            // Mulai animasi dengan mempertahankan efek hover
            backgroundHome.style.transition = 'opacity 1s ease, transform 1s ease';
            backgroundHome.style.opacity = '1';
            backgroundHome.style.transform = 'translateX(0)';
            
            // Tambahkan event listener untuk hover
            backgroundHome.addEventListener('mouseenter', function() {
                this.style.opacity = '0.9';
            });
            
            backgroundHome.addEventListener('mouseleave', function() {
                this.style.opacity = '1';
            });
        }
    }, 100); // Sedikit delay untuk memastikan DOM sudah siap
});