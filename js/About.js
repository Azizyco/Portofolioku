
let sections = document.querySelectorAll('section');

window.onscroll = () => {
    sections.forEach(sec =>{
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        
        if (top >= offset && top < offset + height) {
            sec.classList.add('show-animate');
            console.log('Animasi CV aktif');
        } else {
            sec.classList.remove('show-animate');
        }
        
    })
}


if (window.innerWidth <= 768) {
    sections.forEach(sec => {
        sec.style.transition = 'transform 1s ease-out'; // Sesuaikan durasi untuk layar kecil
    });
}


if (window.innerWidth <= 520) {
    sections.forEach(sec => {
        sec.style.transition = 'opacity 0.8s ease-out'; // Lebih cepat lagi di layar sangat kecil
    });
}
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}




let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 10;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {

            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + '] ').classList.add('active');
            });
            sec.classList.add('show-animate');
        }
        else {
            sec.classList.remove('show-animate');
        }
    });

 

    let header = document.querySelector('header');
    header.classList.toggle('sticky',window.scrollY > 10);
    
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    
}
