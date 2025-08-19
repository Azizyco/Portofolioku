// Script untuk menangani responsivitas elemen floating dan light-effect
document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk menyesuaikan ukuran elemen berdasarkan ukuran viewport
    function adjustElementSizes() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Menyesuaikan ukuran container floating-elements
        const floatingContainer = document.querySelector('.floating-elements');
        if (floatingContainer) {
            floatingContainer.style.height = viewportHeight + 'px';
        }
        
        // Menyesuaikan posisi elemen float-element agar tetap dalam container
        const floatElements = document.querySelectorAll('.float-element');
        floatElements.forEach(element => {
            // Pastikan elemen tidak keluar dari container saat animasi
            const currentLeft = parseFloat(element.style.left);
            const currentTop = parseFloat(element.style.top);
            
            // Batasi posisi agar tidak terlalu dekat dengan tepi
            if (currentLeft < 5) element.style.left = '5%';
            if (currentLeft > 95) element.style.left = '95%';
            if (currentTop < 5) element.style.top = '5%';
            if (currentTop > 95) element.style.top = '95%';
        });
        
        // Menyesuaikan ukuran light-effect berdasarkan viewport
        const lightEffects = document.querySelectorAll('.light-effect');
        lightEffects.forEach(effect => {
            // Pastikan ukuran tidak terlalu besar pada layar kecil
            if (viewportWidth < 480) {
                effect.style.transform = 'scale(0.7)';
            } else if (viewportWidth < 768) {
                effect.style.transform = 'scale(0.85)';
            } else {
                effect.style.transform = 'scale(1)';
            }
        });
    }
    
    // Panggil fungsi saat halaman dimuat
    adjustElementSizes();
    
    // Panggil fungsi saat ukuran window berubah
    window.addEventListener('resize', adjustElementSizes);
    
    // Panggil fungsi saat orientasi perangkat berubah (untuk mobile)
    window.addEventListener('orientationchange', adjustElementSizes);
});