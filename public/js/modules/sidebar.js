/**
 * Sidebar Module
 * Handles sidebar navigation, mobile toggle, and active link highlighting
 */

export class Sidebar {
    constructor(options = {}) {
        this.options = {
            sidebarSelector: '#sidebar',
            toggleSelector: '#sidebar-toggle',
            closeSelector: '#sidebar-close',
            overlaySelector: '#sidebar-overlay',
            linkSelector: '.sidebar__link',
            activeClass: 'show-sidebar',
            activeLinkClass: 'active-link',
            mobileBreakpoint: 968,
            ...options
        };
        
        this.elements = {};
        this.isOpen = false;
        
        this.init();
    }

    init() {
        console.log('🗂️ Initializing Sidebar Module...');
        this.findElements();
        this.bindEvents();
        this.setupActiveLinks();
        this.setupResponsive();
    }

    findElements() {
        this.elements = {
            sidebar: document.querySelector(this.options.sidebarSelector),
            toggle: document.querySelector(this.options.toggleSelector),
            close: document.querySelector(this.options.closeSelector),
            overlay: document.querySelector(this.options.overlaySelector),
            links: document.querySelectorAll(this.options.linkSelector)
        };

        // Verify required elements exist
        if (!this.elements.sidebar) {
            console.error('❌ Sidebar element not found');
            return false;
        }

        console.log('✅ Sidebar elements found');
        return true;
    }

    bindEvents() {
        // Toggle sidebar (mobile hamburger)
        if (this.elements.toggle) {
            this.elements.toggle.addEventListener('click', () => {
                console.log('📱 Sidebar toggle clicked');
                this.open();
            });
        }

        // Close sidebar
        if (this.elements.close) {
            this.elements.close.addEventListener('click', () => {
                console.log('❌ Sidebar close clicked');
                this.close();
            });
        }

        // Close on overlay click
        if (this.elements.overlay) {
            this.elements.overlay.addEventListener('click', () => {
                console.log('🎭 Sidebar overlay clicked');
                this.close();
            });
        }

        // Close on link click (mobile)
        this.elements.links.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMobile()) {
                    console.log('🔗 Sidebar link clicked on mobile');
                    this.close();
                }
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                console.log('⌨️ Escape key pressed');
                this.close();
            }
        });

        console.log('✅ Sidebar events bound');
    }

    setupActiveLinks() {
        // Highlight active section based on scroll position
        const sections = document.querySelectorAll('section[id]');
        
        const updateActiveLink = () => {
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 80; // Account for header
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`${this.options.linkSelector}[href*="${sectionId}"]`);
                
                if (navLink) {
                    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                        this.setActiveLink(navLink);
                    }
                }
            });
        };

        // Throttled scroll listener
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateActiveLink();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll);
        updateActiveLink(); // Initial call
    }

    setupResponsive() {
        const handleResize = () => {
            if (!this.isMobile() && this.isOpen) {
                this.close();
            }
        };

        window.addEventListener('resize', handleResize);
    }

    open() {
        if (!this.elements.sidebar) return;

        this.elements.sidebar.classList.add(this.options.activeClass);
        if (this.elements.overlay) {
            this.elements.overlay.classList.add('active');
        }
        
        this.isOpen = true;
        console.log('📖 Sidebar opened');
        
        // Focus management for accessibility
        if (this.elements.close) {
            this.elements.close.focus();
        }
    }

    close() {
        if (!this.elements.sidebar) return;

        this.elements.sidebar.classList.remove(this.options.activeClass);
        if (this.elements.overlay) {
            this.elements.overlay.classList.remove('active');
        }
        
        this.isOpen = false;
        console.log('📕 Sidebar closed');
        
        // Return focus to toggle button
        if (this.elements.toggle) {
            this.elements.toggle.focus();
        }
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    setActiveLink(activeLink) {
        // Remove active class from all links
        this.elements.links.forEach(link => {
            link.classList.remove(this.options.activeLinkClass);
        });
        
        // Add active class to current link
        if (activeLink) {
            activeLink.classList.add(this.options.activeLinkClass);
        }
    }

    isMobile() {
        return window.innerWidth <= this.options.mobileBreakpoint;
    }

    // Public API methods
    isVisible() {
        return this.isOpen;
    }

    navigateToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            if (this.isMobile()) {
                this.close();
            }
        }
    }

    addCustomLink(linkConfig) {
        // Add a custom navigation link
        const { href, text, icon, position = 'end' } = linkConfig;
        
        const listItem = document.createElement('li');
        listItem.className = 'sidebar__item';
        
        const link = document.createElement('a');
        link.href = href;
        link.className = 'sidebar__link';
        link.innerHTML = `
            ${icon ? `<div class="sidebar__icon">${icon}</div>` : ''}
            <span class="sidebar__text">${text}</span>
        `;
        
        listItem.appendChild(link);
        
        const list = this.elements.sidebar.querySelector('.sidebar__list');
        if (list) {
            if (position === 'start') {
                list.insertBefore(listItem, list.firstChild);
            } else {
                list.appendChild(listItem);
            }
        }
        
        // Re-bind events for new link
        link.addEventListener('click', () => {
            if (this.isMobile()) this.close();
        });
    }

    destroy() {
        // Clean up event listeners
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
        console.log('🗑️ Sidebar destroyed');
    }
} 