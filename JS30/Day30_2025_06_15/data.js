function openModal() {
            document.getElementById('myModal').style.display = "flex";
            document.querySelectorAll('.progress-1').forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }

        function closeModal() {
            document.getElementById('myModal').style.display = "none";
        }

        window.onclick = function(event) {
            const modal = document.getElementById('myModal');
            if (event.target == modal) {
                closeModal();
            }
        }

           // JavaScript để kích hoạt hiệu ứng khi cuộn vào tầm nhìn
        document.addEventListener('DOMContentLoaded', function() {
            const items = document.querySelectorAll('.timeline-item');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, {
                threshold: 0.3
            });

            items.forEach(item => observer.observe(item));
        });


        //hiệu ứng chuyển cảnh slide 
          let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        // Tự động chuyển slide mỗi 3 giây
        setInterval(nextSlide, 3000);

