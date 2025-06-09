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