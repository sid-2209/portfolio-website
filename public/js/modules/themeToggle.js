/**
 * Theme Toggle Module
 * Handles light/dark mode switching with persistent storage
 */

export class ThemeToggle {
    constructor(options = {}) {
        this.options = {
            selector: '#sidebar-theme-toggle',
            storageKey: 'dark-mode',
            defaultTheme: 'light',
            onToggle: null,
            ...options
        };
        
        this.element = null;
        this.currentTheme = this.options.defaultTheme;
        
        this.init();
    }

    init() {
        console.log('🎯 Initializing Theme Toggle Module...');
        this.findElement();
        this.loadSavedTheme();
        this.bindEvents();
        this.addVisualFeedback();
    }

    findElement() {
        this.element = document.querySelector(this.options.selector);
        
        if (!this.element) {
            console.error(`❌ Theme toggle element not found: ${this.options.selector}`);
            return false;
        }
        
        console.log('✅ Theme toggle element found');
        return true;
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem(this.options.storageKey);
        console.log('💾 Loading saved theme:', savedTheme);
        
        if (savedTheme === 'true' || savedTheme === 'dark') {
            this.setTheme('dark');
        } else {
            this.setTheme('light');
        }
    }

    setTheme(theme) {
        const htmlElement = document.documentElement;
        
        if (theme === 'dark') {
            htmlElement.setAttribute('data-theme', 'dark');
            this.currentTheme = 'dark';
            console.log('🌙 Dark mode applied');
        } else {
            htmlElement.removeAttribute('data-theme');
            this.currentTheme = 'light';
            console.log('☀️ Light mode applied');
        }
        
        localStorage.setItem(this.options.storageKey, theme === 'dark' ? 'true' : 'false');
        
        // Call custom callback if provided
        if (this.options.onToggle && typeof this.options.onToggle === 'function') {
            this.options.onToggle(this.currentTheme);
        }
    }

    toggle() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        console.log(`🔄 Toggling theme: ${this.currentTheme} → ${newTheme}`);
        this.setTheme(newTheme);
        
        // Track the toggle event
        this.trackToggle(newTheme);
    }

    bindEvents() {
        if (!this.element) return;

        // Click event with event delegation
        this.element.addEventListener('click', (e) => {
            console.log('🖱️ Theme toggle clicked');
            this.toggle();
        });

        // Keyboard support
        this.element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                console.log('⌨️ Theme toggle keyboard activation');
                this.toggle();
            }
        });

        console.log('✅ Theme toggle events bound');
    }

    addVisualFeedback() {
        if (!this.element) return;

        this.element.addEventListener('mousedown', () => {
            this.element.style.transform = 'scale(0.98)';
        });

        this.element.addEventListener('mouseup', () => {
            this.element.style.transform = 'scale(1)';
        });

        this.element.addEventListener('mouseleave', () => {
            this.element.style.transform = 'scale(1)';
        });
    }

    trackToggle(theme) {
        // Analytics tracking (if available)
        if (typeof window.trackEvent === 'function') {
            window.trackEvent('theme_toggle', {
                theme: theme,
                location: 'sidebar',
                timestamp: new Date().toISOString()
            });
        }
    }

    // Public API methods
    getCurrentTheme() {
        return this.currentTheme;
    }

    setDarkMode() {
        this.setTheme('dark');
    }

    setLightMode() {
        this.setTheme('light');
    }

    destroy() {
        if (this.element) {
            this.element.removeEventListener('click', this.toggle);
            this.element.removeEventListener('keydown', this.toggle);
        }
        console.log('🗑️ Theme toggle destroyed');
    }
} 