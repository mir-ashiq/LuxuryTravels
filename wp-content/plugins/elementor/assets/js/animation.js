document.addEventListener('DOMContentLoaded', function() {
    function animateCounter(element) {
        let start = parseInt(element.getAttribute('data-from-value'), 10);
        let end = parseInt(element.getAttribute('data-to-value'), 10);
        let duration = parseInt(element.getAttribute('data-duration'), 10);
        let range = end - start;
        let increment = end > start ? 1 : -1;
        let stepTime = Math.abs(Math.floor(duration / range));
        let current = start;
        let timer = setInterval(function() {
            current += increment;
            element.textContent = current.toLocaleString();
            if (current == end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    let counters = document.querySelectorAll('.elementor-counter-number');
    counters.forEach(counter => {
        let observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 1.0 });

        observer.observe(counter);
    });
});