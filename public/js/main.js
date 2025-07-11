/*==================== SIDEBAR SHOW/HIDE ====================*/
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebarClose = document.getElementById('sidebar-close');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const sidebarLinks = document.querySelectorAll('.sidebar__link');

// Show sidebar
if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.add('show-sidebar');
        sidebarOverlay.classList.add('active');
    });
}

// Hide sidebar
if (sidebarClose) {
    sidebarClose.addEventListener('click', () => {
        sidebar.classList.remove('show-sidebar');
        sidebarOverlay.classList.remove('active');
    });
}

// Hide sidebar when clicking overlay
if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('show-sidebar');
        sidebarOverlay.classList.remove('active');
    });
}

// Hide sidebar when clicking on sidebar links (mobile)
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 968) {
            sidebar.classList.remove('show-sidebar');
            sidebarOverlay.classList.remove('active');
        }
    });
});

/*==================== REMOVE SIDEBAR MOBILE ====================*/
const linkAction = () => {
    if (window.innerWidth <= 968) {
        sidebar.classList.remove('show-sidebar');
        sidebarOverlay.classList.remove('active');
    }
};
sidebarLinks.forEach(n => n.addEventListener('click', linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');
        const sectionsClass = document.querySelector('.sidebar__nav a[href*=' + sectionId + ']');

        if (sectionsClass) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                sectionsClass.classList.add('active-link');
            } else {
                sectionsClass.classList.remove('active-link');
            }
        }
    });
};

window.addEventListener('scroll', scrollActive);

/*==================== SIDEBAR SCROLL EFFECT ====================*/
// Optional: Add subtle shadow to sidebar when scrolling
const addSidebarShadow = () => {
    const sidebar = document.getElementById('sidebar');
    if (this.scrollY >= 80) sidebar.style.boxShadow = 'var(--shadow-lg)';
    else sidebar.style.boxShadow = 'none';
};
window.addEventListener('scroll', addSidebarShadow);

/*==================== SHOW SCROLL UP ====================*/
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class
    if (this.scrollY >= 560) scrollUp.classList.add('show');
    else scrollUp.classList.remove('show');
};
window.addEventListener('scroll', scrollUp);

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 2000,
    reset: true
});

// Only run ScrollReveal if the library is available
if (typeof ScrollReveal !== 'undefined') {
    sr.reveal('.hero__content, .section__title', {});
    sr.reveal('.hero__image', { delay: 400 });
    sr.reveal('.about__content, .skills__container', { delay: 600 });
    sr.reveal('.project__card', { interval: 200 });
    sr.reveal('.contact__container', { delay: 800 });
} else {
    // Fallback animation using CSS classes
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.hero__content, .section__title, .hero__image, .about__content, .skills__container, .project__card, .contact__container');
    animateElements.forEach(el => observer.observe(el));
}

/*==================== TYPING EFFECT ====================*/
const typingText = document.querySelector('.hero__subtitle');
const phrases = ['Full Stack Developer', 'Web Designer', 'Problem Solver', 'Tech Enthusiast'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = 100;
    if (isDeleting) {
        typeSpeed = 50;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
};

// Start typing effect after page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
});

/*==================== SKILLS ANIMATION ====================*/
const skillsSection = document.querySelector('.skills');
const skillBars = document.querySelectorAll('.skill__progress');
let skillsAnimated = false;

const animateSkills = () => {
    if (!skillsAnimated && skillsSection) {
        const skillsTop = skillsSection.offsetTop;
        const skillsHeight = skillsSection.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.pageYOffset;

        if (scrollY > skillsTop - windowHeight + skillsHeight / 2) {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 500);
            });
            skillsAnimated = true;
        }
    }
};

window.addEventListener('scroll', animateSkills);

/*==================== CONTACT FORM ====================*/
const contactForm = document.getElementById('contact-form');
const formInputs = document.querySelectorAll('.form__input');

// Form validation
const validateForm = () => {
    let isValid = true;
    
    formInputs.forEach(input => {
        const value = input.value.trim();
        
        // Remove previous error states
        input.classList.remove('error');
        
        // Check if field is empty
        if (value === '') {
            input.classList.add('error');
            isValid = false;
        }
        
        // Email validation
        if (input.type === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                input.classList.add('error');
                isValid = false;
            }
        }
    });
    
    return isValid;
};

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            // Show success message
            showNotification('Message sent successfully!', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Here you would typically send the form data to your server
            // For now, we'll just simulate a successful submission
            console.log('Form submitted successfully');
        } else {
            showNotification('Please fill in all fields correctly.', 'error');
        }
    });
}

/*==================== NOTIFICATION SYSTEM ====================*/
const showNotification = (message, type) => {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        ${type === 'success' ? 'background-color: #10b981;' : 'background-color: #ef4444;'}
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
};

/*==================== DARK MODE TOGGLE ====================*/
// Dark mode functionality with comprehensive error handling
const toggleDarkMode = () => {
    try {
        const htmlElement = document.documentElement;
        const currentTheme = htmlElement.getAttribute('data-theme');
        const isDarkMode = currentTheme === 'dark';
        
        console.log('Current theme:', currentTheme, 'isDarkMode:', isDarkMode);
        
        if (isDarkMode) {
            // Switch to light mode
            htmlElement.removeAttribute('data-theme');
            localStorage.setItem('dark-mode', 'false');
            console.log('✅ Switched to light mode');
        } else {
            // Switch to dark mode
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('dark-mode', 'true');
            console.log('✅ Switched to dark mode');
        }
        
        // Verify the change was applied
        const newTheme = htmlElement.getAttribute('data-theme');
        console.log('New theme after toggle:', newTheme);
        
        // Track theme change
        trackEvent('theme_toggle', {
            theme: isDarkMode ? 'light' : 'dark',
            location: 'sidebar'
        });
        
    } catch (error) {
        console.error('❌ Error in toggleDarkMode:', error);
    }
};

// Enhanced initialization with multiple fallbacks
const initializeThemeToggle = () => {
    console.log('🔄 Attempting to initialize theme toggle...');
    
    // Try multiple selectors to find the element
    const selectors = [
        '#sidebar-theme-toggle',
        '.theme-switch',
        '[data-theme-toggle]'
    ];
    
    let themeToggleElement = null;
    
    for (const selector of selectors) {
        themeToggleElement = document.querySelector(selector);
        if (themeToggleElement) {
            console.log(`✅ Found theme toggle element with selector: ${selector}`);
            break;
        }
    }
    
    if (!themeToggleElement) {
        console.error('❌ Theme toggle element not found with any selector');
        console.log('Available elements:', document.querySelectorAll('[id*="theme"], [class*="theme"]'));
        return;
    }
    
    // Add event listeners with comprehensive handling
    const addClickHandler = (element) => {
        const clickHandler = (e) => {
            console.log('🖱️ Click detected on theme toggle');
            console.log('Event target:', e.target);
            console.log('Current target:', e.currentTarget);
            
            // Don't prevent default or stop propagation for better compatibility
            toggleDarkMode();
        };
        
        element.addEventListener('click', clickHandler, { passive: false });
        console.log('✅ Click handler added');
        
        // Also add to child elements to ensure clicks are captured
        const childElements = element.querySelectorAll('*');
        childElements.forEach(child => {
            child.addEventListener('click', clickHandler, { passive: false });
        });
        
        // Add keyboard support
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                console.log('⌨️ Keyboard toggle activated');
                e.preventDefault();
                toggleDarkMode();
            }
        });
        
        // Add visual feedback
        element.addEventListener('mousedown', () => {
            element.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('mouseup', () => {
            element.style.transform = 'scale(1)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
        });
    };
    
    addClickHandler(themeToggleElement);
    
    // Test click functionality
    console.log('🧪 Testing theme toggle setup...');
    console.log('Element bounds:', themeToggleElement.getBoundingClientRect());
    console.log('Element computed style:', window.getComputedStyle(themeToggleElement));
    
    // Add a manual test button temporarily (remove after testing)
    const testButton = document.createElement('button');
    testButton.textContent = 'Test Toggle';
    testButton.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 9999;
        background: red;
        color: white;
        padding: 10px;
        border: none;
        cursor: pointer;
    `;
    testButton.addEventListener('click', () => {
        console.log('🧪 Manual test button clicked');
        toggleDarkMode();
    });
    document.body.appendChild(testButton);
    
    // Remove test button after 10 seconds
    setTimeout(() => {
        if (testButton.parentNode) {
            testButton.parentNode.removeChild(testButton);
        }
    }, 10000);
};

// Load saved theme with verification
const loadSavedTheme = () => {
    const savedTheme = localStorage.getItem('dark-mode');
    console.log('💾 Loading saved theme:', savedTheme);
    
    const htmlElement = document.documentElement;
    
    if (savedTheme === 'true') {
        htmlElement.setAttribute('data-theme', 'dark');
        console.log('🌙 Dark mode applied from storage');
    } else {
        htmlElement.removeAttribute('data-theme');
        console.log('☀️ Light mode applied from storage');
    }
    
    // Verify theme was applied
    const currentTheme = htmlElement.getAttribute('data-theme');
    console.log('🔍 Current theme after load:', currentTheme);
};

// Multiple initialization strategies
const initializeEverything = () => {
    console.log('🚀 Initializing theme system...');
    loadSavedTheme();
    initializeThemeToggle();
};

// Strategy 1: DOMContentLoaded
document.addEventListener('DOMContentLoaded', initializeEverything);

// Strategy 2: Immediate if DOM is ready
if (document.readyState !== 'loading') {
    console.log('📄 DOM already loaded, initializing immediately...');
    initializeEverything();
}

// Strategy 3: Window load as final fallback
window.addEventListener('load', () => {
    console.log('🏁 Window loaded, ensuring theme toggle is initialized...');
    // Only initialize if not already done
    const element = document.querySelector('#sidebar-theme-toggle');
    if (element && !element.hasAttribute('data-initialized')) {
        element.setAttribute('data-initialized', 'true');
        initializeThemeToggle();
    }
});

// Strategy 4: Manual trigger for testing
window.manualToggleTest = () => {
    console.log('🔧 Manual toggle test triggered');
    toggleDarkMode();
};

console.log('🎯 Theme toggle script loaded');

/*==================== SMOOTH SCROLLING ====================*/
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

smoothScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/*==================== LAZY LOADING IMAGES ====================*/
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

/*==================== PERFORMANCE OPTIMIZATION ====================*/
// Throttle scroll events
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(scrollActive, 100));
window.addEventListener('scroll', throttle(addSidebarShadow, 100));
window.addEventListener('scroll', throttle(scrollUp, 100));
window.addEventListener('scroll', throttle(animateSkills, 100));

/*==================== PRELOADER ====================*/
const preloader = document.createElement('div');
preloader.className = 'preloader';
preloader.innerHTML = `
    <div class="preloader__spinner">
        <div class="preloader__circle"></div>
    </div>
`;
preloader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-color);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    transition: opacity 0.5s ease;
`;

// Add spinner styles
const spinnerStyles = document.createElement('style');
spinnerStyles.textContent = `
    .preloader__spinner {
        width: 50px;
        height: 50px;
        position: relative;
    }
    
    .preloader__circle {
        width: 100%;
        height: 100%;
        border: 4px solid var(--border-color);
        border-top: 4px solid var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

document.head.appendChild(spinnerStyles);
document.body.appendChild(preloader);

// Hide preloader when page is loaded
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1000);
});

/*==================== CURSOR FOLLOW EFFECT ====================*/
const cursor = document.createElement('div');
cursor.className = 'cursor';
cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid var(--primary-color);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    display: none;
`;

document.body.appendChild(cursor);

// Show cursor on desktop only
if (window.innerWidth > 768) {
    cursor.style.display = 'block';
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Scale cursor on hover
    const hoverElements = document.querySelectorAll('a, button, .project__card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

/*==================== ACCESSIBILITY IMPROVEMENTS ====================*/
// Skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#main';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--primary-color);
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 10000;
    transition: top 0.3s ease;
`;

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// Keyboard navigation for mobile sidebar
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('show-sidebar')) {
        sidebar.classList.remove('show-sidebar');
        sidebarOverlay.classList.remove('active');
        sidebarToggle.focus();
    }
});

/*==================== ANALYTICS (PLACEHOLDER) ====================*/
// This is where you would integrate Google Analytics, Mixpanel, etc.
const trackEvent = (eventName, eventData) => {
    // Example: gtag('event', eventName, eventData);
    console.log('Event tracked:', eventName, eventData);
};

// Track contact form submissions
if (contactForm) {
    contactForm.addEventListener('submit', () => {
        trackEvent('contact_form_submit', {
            page: window.location.pathname
        });
    });
}

// Track external link clicks
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.hostname !== window.location.hostname) {
        trackEvent('external_link_click', {
            url: e.target.href,
            text: e.target.textContent
        });
    }
});

/*==================== ERROR HANDLING ====================*/
// Global error handler
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // You could send this to an error reporting service
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // You could send this to an error reporting service
});

/*==================== CONSOLE WELCOME MESSAGE ====================*/
console.log(`
🎉 Welcome to my portfolio!
📧 Contact: your.email@example.com
🔗 LinkedIn: https://linkedin.com/in/yourprofile
🐙 GitHub: https://github.com/yourusername

Thanks for checking out the code! 🚀
`);

/*==================== SEARCH FUNCTIONALITY ====================*/
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

// Sample searchable content (you can expand this)
const searchableContent = [
    {
        title: 'Home',
        content: 'Welcome to my portfolio. I am a software developer.',
        section: 'home'
    },
    {
        title: 'About Me',
        content: 'I am a passionate developer with expertise in modern web technologies.',
        section: 'about'
    },
    {
        title: 'Skills',
        content: 'HTML5, CSS3, JavaScript, React, Node.js, Python, Database',
        section: 'skills'
    },
    {
        title: 'Projects',
        content: 'E-commerce Website, Task Management App, Weather Dashboard',
        section: 'projects'
    },
    {
        title: 'Contact',
        content: 'Get in touch with me for collaborations and opportunities',
        section: 'contact'
    }
];

const performSearch = (query) => {
    if (query.length < 2) {
        searchResults.classList.remove('active');
        return;
    }

    const results = searchableContent.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.content.toLowerCase().includes(query.toLowerCase())
    );

    displaySearchResults(results);
};

const displaySearchResults = (results) => {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
    } else {
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <div class="search-result-title">${result.title}</div>
                <div class="search-result-content">${result.content.substring(0, 100)}...</div>
            `;
            resultItem.addEventListener('click', () => {
                document.getElementById(result.section).scrollIntoView({ behavior: 'smooth' });
                searchResults.classList.remove('active');
                searchInput.value = '';
            });
            searchResults.appendChild(resultItem);
        });
    }
    
    searchResults.classList.add('active');
};

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        performSearch(e.target.value);
    });

    // Hide search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
}

/*==================== DATETIME DISPLAY ====================*/
const datetimeText = document.getElementById('datetime-text');

const updateDateTime = () => {
    const now = new Date();
    
    // Format timezone
    const timezone = 'GMT';
    
    // Format time
    const time = now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    // Format day
    const day = now.toLocaleDateString('en-US', { weekday: 'short' });
    
    // Format date
    const date = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    
    // Update display
    if (datetimeText) {
        datetimeText.textContent = `${timezone} / ${time}    ${day} ${date}`;
    }
};

// Update datetime every second
if (datetimeText) {
    updateDateTime();
    setInterval(updateDateTime, 1000);
}

/*==================== SOCIAL LINKS TRACKING ====================*/
const socialLinks = document.querySelectorAll('.social-links__item');

socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const linkText = link.querySelector('.social-links__text').textContent;
        
        // Track social link clicks
        trackEvent('social_link_click', {
            platform: linkText.toLowerCase(),
            location: 'top_header'
        });
        
        // Add click animation
        link.style.transform = 'translateY(-2px) scale(0.95)';
        setTimeout(() => {
            link.style.transform = 'translateY(-2px) scale(1)';
        }, 150);
    });
});

/*==================== SEARCH KEYBOARD SHORTCUTS ====================*/
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Escape to close search results
    if (e.key === 'Escape' && searchResults.classList.contains('active')) {
        searchResults.classList.remove('active');
        searchInput.blur();
    }
});

/*==================== INITIALIZATION ====================*/
document.addEventListener('DOMContentLoaded', () => {
    // Initialize tooltips, modals, or other components here
    console.log('Portfolio website initialized successfully!');
    
    // Add any initialization code here
    initializeComponents();
});

const initializeComponents = () => {
    // Initialize any third-party libraries or custom components
    // This is where you would set up things like:
    // - Intersection Observer for animations
    // - Third-party plugins
    // - Custom component initialization
    
    console.log('All components initialized');
}; 