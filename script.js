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
    
    // ============ PAGE NAVIGATION ============
    const homePage = document.getElementById('homePage');
    const letterPage = document.getElementById('letterPage');
    const openBtn = document.getElementById('openLetterBtn');
    const backButton = document.getElementById('backButton');
    const backButtonBottom = document.getElementById('backButtonBottom');
    
    // Function to show home page
    function showHomePage() {
        homePage.classList.add('active-page');
        letterPage.classList.remove('active-page');
        document.body.style.overflow = 'auto'; // Ensure scrolling is enabled
        window.scrollTo(0, 0); // Scroll to top
    }
    
    // Function to show letter page
    function showLetterPage() {
        homePage.classList.remove('active-page');
        letterPage.classList.add('active-page');
        document.body.style.overflow = 'auto'; // Ensure scrolling is enabled
        window.scrollTo(0, 0); // Scroll to top of letter
        
        // Animate letter paragraphs (optional subtle fade)
        const paragraphs = document.querySelectorAll('.letter-paragraph');
        paragraphs.forEach((para, index) => {
            para.style.animation = 'none';
            para.offsetHeight;
            para.style.animation = `fadeInParagraph 0.5s ease forwards ${index * 0.05}s`;
        });
    }
    
    // Add fade animation for paragraphs
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInParagraph {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .letter-paragraph {
            opacity: 0;
            animation: fadeInParagraph 0.5s ease forwards;
        }
    `;
    document.head.appendChild(style);
    
    // Event Listeners
    if (openBtn) {
        openBtn.addEventListener('click', showLetterPage);
    }
    
    if (backButton) {
        backButton.addEventListener('click', showHomePage);
    }
    
    if (backButtonBottom) {
        backButtonBottom.addEventListener('click', showHomePage);
    }
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(event) {
        if (letterPage.classList.contains('active-page')) {
            showHomePage();
        }
    });
    
    // ============ THEME TOGGLE ============
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
    
    // ============ IMAGE LOADING ============
    const images = document.querySelectorAll('.polaroid-image');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 1s ease';
        
        img.onload = function() {
            this.style.opacity = '1';
        };
        
        if (img.complete) {
            img.style.opacity = '1';
        }
        
        img.onerror = function() {
            this.style.opacity = '1';
            this.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100%25\' height=\'100%25\'%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'%234A9FF5\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\' fill=\'white\' font-family=\'Arial\'%3EPhoto%3C/text%3E%3C/svg%3E';
        };
    });
    
    // ============ PARALLAX EFFECT (desktop only) ============
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
    
    // ============ DYNAMIC FOOTER ============
    const year = new Date().getFullYear();
    const footer = document.createElement('footer');
    footer.innerHTML = `Made with love for Bal • ${year}`;
    
    // Add footer to both pages
    const homeContainer = document.querySelector('#homePage .container');
    const letterContainer = document.querySelector('#letterPage .letter-container');
    
    if (homeContainer) {
        homeContainer.appendChild(footer.cloneNode(true));
    }
    
    if (letterContainer) {
        letterContainer.appendChild(footer.cloneNode(true));
    }
    
    // ============ TOUCH OPTIMIZATIONS ============
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
    
    // ============ RESIZE HANDLER ============
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Any resize adjustments if needed
        }, 250);
    });
});
