
// Project Category Filter

const buttons = document.querySelectorAll('.category-btn');

const cards = document.querySelectorAll('.project-card');

buttons.forEach(button => {

    button.addEventListener('click', () => {

        buttons.forEach(btn => btn.classList.remove('active'));

        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        cards.forEach(card => {

            if (filter === '*' || card.classList.contains(filter)) {

                card.classList.remove('hidden');

            } else {

                card.classList.add('hidden');
            }
        });
    });
});


  let isOriginal = true;
     function toggleImageColor() {
            isOriginal = !isOriginal;
            const img = document.getElementById('target-image');
            img.style.filter = isOriginal ? 'none' : 'hue-rotate(350deg) saturate(2)';
        }

//Cuộn Mượt cho Liên Kết Điều Hướng

document.querySelectorAll('.nav-links a').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);

        const targetElement = document.getElementById(targetId);

        targetElement.scrollIntoView({

            behavior: 'smooth',
            block: 'start'
        });
    });
});


//skills
const skillBars = document.querySelectorAll('.progress-bar');

const skillsSection = document.querySelector('.container-skills');

const animateBars = (entries) => {

    if (entries[0].isIntersecting) {

        skillBars.forEach(bar => {

            const width = bar.style.width;

            bar.style.width = '0%';

            setTimeout(() => {
                
                bar.style.width = width;

            }, 100);
        });
    }
};


//Thanh Điều Hướng Cố Định với Đánh Dấu Liên Kết Hoạt Động
const sections = document.querySelectorAll('section, .banner, .about-container, .container-skills, .quality-services, .portfolio, .contacts');

const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            navLinks.forEach(link => {

                link.classList.remove('active');

                if (link.getAttribute('href').substring(1) === entry.target.id) {
                    
                    link.classList.add('active');

                }
            });
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));