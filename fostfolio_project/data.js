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

            //chuyển cảnh slide
            document.addEventListener('DOMContentLoaded', function() {
            const slider = document.querySelector('.slider');
            const slides = document.querySelectorAll('.slide');
            const prevBtn = document.querySelector('.prev');
            const nextBtn = document.querySelector('.next');
            const dots = document.querySelectorAll('.dot');
            
            let currentIndex = 0;
            let intervalId;
            const slideCount = slides.length;
            const startAutoSlide = () => {
                intervalId = setInterval(() => {
                    nextSlide();
                }, 5000);
            };
            
            const stopAutoSlide = () => {
                clearInterval(intervalId);
            };
            
            const goToSlide = (index) => {
                slider.style.transform = `translateX(-${index * 100}%)`;
                
                // Update active class
                slides.forEach((slide, i) => {
                    if (i === index) {
                        slide.classList.add('active');
                    } else {
                        slide.classList.remove('active');
                    }
                });
                
                // Update dots
                dots.forEach((dot, i) => {
                    if (i === index) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
                
                currentIndex = index;
            };
            
            const nextSlide = () => {
                const newIndex = (currentIndex + 1) % slideCount;
                goToSlide(newIndex);
            };
            
            const prevSlide = () => {
                const newIndex = (currentIndex - 1 + slideCount) % slideCount;
                goToSlide(newIndex);
            };
            
            // Button events
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopAutoSlide();
                startAutoSlide();
            });
            
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopAutoSlide();
                startAutoSlide();
            });
            
            // Dot navigation
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    goToSlide(index);
                    stopAutoSlide();
                    startAutoSlide();
                });
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') {
                    nextSlide();
                    stopAutoSlide();
                    startAutoSlide();
                } else if (e.key === 'ArrowLeft') {
                    prevSlide();
                    stopAutoSlide();
                    startAutoSlide();
                }
            });
            
            // Auto slide
            startAutoSlide();
            
            // Pause on hover
            slider.addEventListener('mouseenter', stopAutoSlide);
            slider.addEventListener('mouseleave', startAutoSlide);
        });

        // Lấy tất cả nút filter
        const buttons = document.querySelectorAll('.category-btn');
        const cards = document.querySelectorAll('.project-card');

        // Thêm sự kiện click cho các nút
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Xóa class active khỏi tất cả nút
                buttons.forEach(btn => btn.classList.remove('active'));
                // Thêm class active cho nút được click
                button.classList.add('active');

                // Lấy giá trị data-filter
                const filter = button.getAttribute('data-filter');

                // Lọc các project card
                cards.forEach(card => {
                    if (filter === '*' || card.classList.contains(filter)) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });




