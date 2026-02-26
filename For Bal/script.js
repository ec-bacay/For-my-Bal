// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Create loading screen
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = 'Loading...';
    document.body.appendChild(loading);
    
    // Remove loading screen after content loads
    setTimeout(() => {
        loading.classList.add('fade-out');
        setTimeout(() => loading.remove(), 500);
    }, 800);
    
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    }
    
    // Letter Button to Open Modal
    const openBtn = document.getElementById('openLetterBtn');
    const modal = document.getElementById('poemModal');
    const closeBtn = document.getElementById('closeModal');
    const modalBody = document.querySelector('.modal-body');
    
    // Open modal when button is clicked
    openBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Reset scroll position to top
        if (modalBody) {
            modalBody.scrollTop = 0;
        }
        
        // Reset and animate poem lines
        const poemLines = document.querySelectorAll('.poem-line');
        poemLines.forEach((line, index) => {
            line.style.animation = 'none';
            line.offsetHeight; // Trigger reflow
            line.style.animation = `fadeInLine 0.5s ease forwards ${index * 0.1}s`;
        });
    });
    
    // Close modal when clicking X
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });
    
    // Close modal when clicking outside the content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Handle escape key to close modal
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Prevent body scroll when modal is open on touch devices
    modal.addEventListener('touchmove', function(e) {
        if (e.target === modal) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Allow scrolling inside modal body
    if (modalBody) {
        // Stop propagation of wheel events so they only affect the modal body
        modalBody.addEventListener('wheel', function(e) {
            e.stopPropagation();
        });
        
        // Handle touch events for mobile scrolling
        modalBody.addEventListener('touchstart', function(e) {
            // Let touch events pass through for scrolling
        }, { passive: true });
        
        modalBody.addEventListener('touchmove', function(e) {
            e.stopPropagation(); // Prevent modal from capturing touch moves
        }, { passive: true });
    }
    
    // Lazy load images with fade effect
    const images = document.querySelectorAll('.polaroid-image');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 1s ease';
        
        img.onload = function() {
            this.style.opacity = '1';
        };
        
        // If image is already cached
        if (img.complete) {
            img.style.opacity = '1';
        }
        
        // Handle image loading errors
        img.onerror = function() {
            this.style.opacity = '1';
            this.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100%25\' height=\'100%25\'%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'%234A9FF5\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\' fill=\'white\' font-family=\'Arial\'%3EPhoto%3C/text%3E%3C/svg%3E';
        };
    });
    
    // Responsive touch handling for polaroid cards
    const polaroids = document.querySelectorAll('.polaroid-card');
    polaroids.forEach(polaroid => {
        polaroid.addEventListener('touchstart', function() {
            this.style.transform = 'rotate(0deg) scale(1.02)';
        });
        
        polaroid.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Subtle parallax effect for bubbles (optional, disabled on mobile for performance)
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const bubbles = document.querySelectorAll('.bubble');
            
            bubbles.forEach((bubble, index) => {
                const speed = (index % 5) + 1;
                bubble.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
            });
        });
    }
    
    // Add dynamic copyright year
    const year = new Date().getFullYear();
    const footer = document.createElement('footer');
    footer.innerHTML = `Made with love for Bal • Under the Sea • ${year}`;
    document.querySelector('.container').appendChild(footer);
    
    // Handle window resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        // Debounce resize events
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Adjust any dynamic elements if needed
            if (modal.style.display === 'block' && modalBody) {
                // Ensure modal body is still scrollable
                modalBody.style.maxHeight = window.innerHeight > 600 ? 'calc(80vh - 100px)' : 'calc(70vh - 80px)';
            }
        }, 250);
    });
});