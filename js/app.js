/**
 * Portfolio Website Application
 * Main application entry point that initializes all modules
 */

import { ThemeToggle } from './modules/themeToggle.js';
import { Sidebar } from './modules/sidebar.js';
import { Search } from './modules/search.js';
import { TopHeader } from './modules/topHeader.js';

class PortfolioApp {
    constructor(config = {}) {
        this.config = {
            // Module configurations
            themeToggle: {
                selector: '#sidebar-theme-toggle',
                onToggle: (theme) => console.log(`Theme changed to: ${theme}`)
            },
            sidebar: {
                mobileBreakpoint: 968
            },
            search: {
                placeholder: "What's your name?",
                minQueryLength: 2,
                onSelect: (sectionId) => console.log(`Navigated to: ${sectionId}`)
            },
            topHeader: {
                timezone: 'GMT',
                updateInterval: 1000,
                onSocialClick: (platform, url) => console.log(`Social click: ${platform}`)
            },
            // Global settings
            analytics: {
                enabled: true,
                trackEvents: true
            },
            accessibility: {
                enabled: true,
                announcements: true
            },
            performance: {
                enableLazyLoading: true,
                enableAnimations: true
            },
            ...config
        };

        this.modules = {};
        this.isInitialized = false;
        
        this.init();
    }

    async init() {
        console.log('🚀 Initializing Portfolio Application...');
        
        try {
            // Wait for DOM to be ready
            await this.waitForDOM();
            
            // Initialize core modules
            await this.initializeModules();
            
            // Setup global features
            this.setupGlobalFeatures();
            
            // Setup analytics
            this.setupAnalytics();
            
            // Setup accessibility features
            this.setupAccessibility();
            
            // Setup performance optimizations
            this.setupPerformanceOptimizations();
            
            this.isInitialized = true;
            console.log('✅ Portfolio Application initialized successfully');
            
            // Dispatch custom event
            this.dispatchInitEvent();
            
        } catch (error) {
            console.error('❌ Failed to initialize application:', error);
        }
    }

    waitForDOM() {
        return new Promise((resolve) => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve);
            } else {
                resolve();
            }
        });
    }

    async initializeModules() {
        console.log('🔧 Initializing modules...');
        
        try {
            // Initialize theme toggle
            this.modules.themeToggle = new ThemeToggle(this.config.themeToggle);
            console.log('✅ Theme toggle module initialized');
            
            // Initialize sidebar
            this.modules.sidebar = new Sidebar(this.config.sidebar);
            console.log('✅ Sidebar module initialized');
            
            // Initialize search
            this.modules.search = new Search(this.config.search);
            console.log('✅ Search module initialized');
            
            // Initialize top header
            this.modules.topHeader = new TopHeader(this.config.topHeader);
            console.log('✅ Top header module initialized');
            
        } catch (error) {
            console.error('❌ Error initializing modules:', error);
            throw error;
        }
    }

    setupGlobalFeatures() {
        console.log('🌍 Setting up global features...');
        
        // Smooth scrolling for all hash links
        this.setupSmoothScrolling();
        
        // Scroll to top functionality
        this.setupScrollToTop();
        
        // Global keyboard shortcuts
        this.setupKeyboardShortcuts();
        
        // Form handling
        this.setupFormHandling();
        
        // Skills animation
        this.setupSkillsAnimation();
    }

    setupSmoothScrolling() {
        const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
        
        smoothScrollLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupScrollToTop() {
        const scrollTopButton = document.getElementById('scroll-top');
        
        if (scrollTopButton) {
            const toggleVisibility = () => {
                if (window.pageYOffset >= 560) {
                    scrollTopButton.classList.add('show');
                } else {
                    scrollTopButton.classList.remove('show');
                }
            };
            
            // Throttled scroll listener
            let ticking = false;
            const handleScroll = () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        toggleVisibility();
                        ticking = false;
                    });
                    ticking = true;
                }
            };
            
            window.addEventListener('scroll', handleScroll);
            toggleVisibility(); // Initial call
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Global keyboard shortcuts
            if (e.altKey && e.key === 't') {
                // Alt + T for theme toggle
                e.preventDefault();
                this.modules.themeToggle?.toggle();
            }
            
            if (e.altKey && e.key === 's') {
                // Alt + S for search
                e.preventDefault();
                this.modules.search?.focusInput();
            }
            
            if (e.altKey && e.key === 'm') {
                // Alt + M for mobile menu
                e.preventDefault();
                this.modules.sidebar?.toggle();
            }
        });
    }

    setupFormHandling() {
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactForm(e.target);
            });
        }
    }

    handleContactForm(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        console.log('📧 Contact form submitted:', data);
        
        // Here you would typically send to your backend
        this.showNotification('Message sent successfully!', 'success');
        form.reset();
        
        // Track form submission
        this.trackEvent('contact_form_submit', data);
    }

    setupSkillsAnimation() {
        const skillsSection = document.querySelector('.skills');
        const skillBars = document.querySelectorAll('.skill__progress');
        
        if (skillsSection && skillBars.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        skillBars.forEach((bar, index) => {
                            setTimeout(() => {
                                const width = bar.style.width;
                                bar.style.width = '0%';
                                requestAnimationFrame(() => {
                                    bar.style.width = width;
                                });
                            }, index * 100);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(skillsSection);
        }
    }

    setupAnalytics() {
        if (!this.config.analytics.enabled) return;
        
        console.log('📊 Setting up analytics...');
        
        // Global event tracking function
        window.trackEvent = (eventName, data = {}) => {
            console.log('📈 Analytics Event:', eventName, data);
            
            // Here you would integrate with your analytics service
            // Example: gtag('event', eventName, data);
            // Example: mixpanel.track(eventName, data);
        };
        
        // Track page view
        this.trackEvent('page_view', {
            page: window.location.pathname,
            title: document.title,
            timestamp: new Date().toISOString()
        });
    }

    setupAccessibility() {
        if (!this.config.accessibility.enabled) return;
        
        console.log('♿ Setting up accessibility features...');
        
        // Skip to main content link
        this.createSkipLink();
        
        // Focus management
        this.setupFocusManagement();
        
        // Announce dynamic changes
        this.setupAriaLiveRegion();
    }

    createSkipLink() {
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
    }

    setupFocusManagement() {
        // Ensure focus is visible for keyboard users
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    setupAriaLiveRegion() {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'visually-hidden';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
        
        // Function to announce messages
        window.announceToScreenReader = (message) => {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        };
    }

    setupPerformanceOptimizations() {
        if (!this.config.performance.enableLazyLoading) return;
        
        console.log('⚡ Setting up performance optimizations...');
        
        // Lazy load images
        this.setupLazyLoading();
        
        // Preload critical resources
        this.preloadCriticalResources();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if (images.length > 0) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }

    preloadCriticalResources() {
        // Preload critical fonts, images, etc.
        const criticalResources = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'style';
            document.head.appendChild(link);
        });
    }

    // Utility methods
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
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
            ${type === 'success' ? 'background-color: #10b981;' : 
              type === 'error' ? 'background-color: #ef4444;' : 
              'background-color: #3b82f6;'}
        `;
        
        document.body.appendChild(notification);
        
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
        });
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    trackEvent(eventName, data = {}) {
        if (typeof window.trackEvent === 'function') {
            window.trackEvent(eventName, data);
        }
    }

    dispatchInitEvent() {
        const event = new CustomEvent('portfolioAppReady', {
            detail: {
                modules: Object.keys(this.modules),
                config: this.config,
                timestamp: new Date().toISOString()
            }
        });
        
        document.dispatchEvent(event);
    }

    // Public API
    getModule(moduleName) {
        return this.modules[moduleName];
    }

    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
    }

    restart() {
        this.destroy();
        this.init();
    }

    destroy() {
        console.log('🗑️ Destroying Portfolio Application...');
        
        Object.values(this.modules).forEach(module => {
            if (module && typeof module.destroy === 'function') {
                module.destroy();
            }
        });
        
        this.modules = {};
        this.isInitialized = false;
    }
}

// Initialize the application
const portfolioApp = new PortfolioApp();

// Make it globally available for debugging
window.portfolioApp = portfolioApp;

export default PortfolioApp; 