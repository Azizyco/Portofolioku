// Script untuk memastikan animasi pada home-sci berfungsi dengan benar
document.addEventListener('DOMContentLoaded', function() {
    // Mencegah refresh halaman saat animasi AOS ditampilkan
    window.addEventListener('scroll', function(e) {
        // Mencegah refresh halaman saat scroll (yang mungkin memicu animasi AOS)
        const aosElements = document.querySelectorAll('[data-aos]');
        if (aosElements.length > 0) {
            // Jika ada elemen dengan data-aos yang terlihat, cegah perilaku default
            aosElements.forEach(function(element) {
                const rect = element.getBoundingClientRect();
                const isVisible = (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
                
                if (isVisible) {
                    // Jika elemen terlihat, pastikan tidak ada refresh halaman
                    element.style.pointerEvents = 'none'; // Mencegah klik yang mungkin menyebabkan refresh
                    setTimeout(function() {
                        element.style.pointerEvents = 'auto'; // Kembalikan pointer events setelah animasi selesai
                    }, 1000); // Sesuaikan dengan durasi animasi
                }
            });
        }
    }, { passive: true }); // Gunakan passive: true untuk performa yang lebih baik

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