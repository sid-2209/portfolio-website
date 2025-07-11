/**
 * Top Header Module
 * Handles datetime display and social links in the top header bar
 */

export class TopHeader {
    constructor(options = {}) {
        this.options = {
            containerSelector: '.top-header',
            datetimeSelector: '#datetime-text',
            socialLinksSelector: '.social-links__item',
            timezone: 'GMT',
            updateInterval: 1000,
            dateFormat: {
                timeOptions: {
                    hour12: true,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                },
                dayOptions: { weekday: 'short' },
                dateOptions: {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }
            },
            onSocialClick: null,
            ...options
        };
        
        this.elements = {};
        this.updateTimer = null;
        
        this.init();
    }

    init() {
        console.log('📊 Initializing Top Header Module...');
        this.findElements();
        this.setupDateTime();
        this.setupSocialLinks();
        this.setupResponsive();
    }

    findElements() {
        this.elements = {
            container: document.querySelector(this.options.containerSelector),
            datetime: document.querySelector(this.options.datetimeSelector),
            socialLinks: document.querySelectorAll(this.options.socialLinksSelector)
        };

        if (!this.elements.container) {
            console.error('❌ Top header container not found');
            return false;
        }

        console.log('✅ Top header elements found');
        return true;
    }

    setupDateTime() {
        if (!this.elements.datetime) {
            console.warn('⚠️ Datetime element not found');
            return;
        }

        this.updateDateTime();
        this.startDateTimeUpdates();
        console.log('🕐 DateTime setup complete');
    }

    updateDateTime() {
        if (!this.elements.datetime) return;

        const now = new Date();
        
        try {
            // Format time
            const time = now.toLocaleTimeString('en-US', this.options.dateFormat.timeOptions);
            
            // Format day
            const day = now.toLocaleDateString('en-US', this.options.dateFormat.dayOptions);
            
            // Format date
            const date = now.toLocaleDateString('en-GB', this.options.dateFormat.dateOptions);
            
            // Update display
            const formattedDateTime = `${this.options.timezone} / ${time}    ${day} ${date}`;
            this.elements.datetime.textContent = formattedDateTime;
            
        } catch (error) {
            console.error('❌ Error updating datetime:', error);
            this.elements.datetime.textContent = 'Time unavailable';
        }
    }

    startDateTimeUpdates() {
        // Clear existing timer
        if (this.updateTimer) {
            clearInterval(this.updateTimer);
        }

        // Start new timer
        this.updateTimer = setInterval(() => {
            this.updateDateTime();
        }, this.options.updateInterval);
    }

    stopDateTimeUpdates() {
        if (this.updateTimer) {
            clearInterval(this.updateTimer);
            this.updateTimer = null;
        }
    }

    setupSocialLinks() {
        if (this.elements.socialLinks.length === 0) {
            console.warn('⚠️ No social links found');
            return;
        }

        this.elements.socialLinks.forEach(link => {
            // Hide text labels for LinkedIn, GitHub, and Instagram (keep icons only)
            const linkText = link.querySelector('.social-links__text');
            if (linkText) {
                const text = linkText.textContent.toLowerCase();
                if (text.includes('linkedin') || text.includes('github') || text.includes('instagram')) {
                    linkText.style.display = 'none';
                }
            }

            // Add click tracking
            link.addEventListener('click', (e) => {
                const linkText = link.querySelector('.social-links__text')?.textContent || 'Unknown';
                console.log(`🔗 Social link clicked: ${linkText}`);
                
                // Add visual feedback
                this.addClickFeedback(link);
                
                // Track the click
                this.trackSocialClick(linkText, link.href);
                
                // Call custom callback
                if (this.options.onSocialClick && typeof this.options.onSocialClick === 'function') {
                    this.options.onSocialClick(linkText, link.href, e);
                }
            });

            // Add hover effects
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-2px) scale(1.05)';
            });

            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(-2px) scale(1)';
            });
        });

        console.log(`✅ ${this.elements.socialLinks.length} social links configured`);
    }

    setupResponsive() {
        // Hide/show header based on screen size
        const handleResize = () => {
            if (window.innerWidth <= 968) {
                this.hide();
            } else {
                this.show();
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call

        console.log('📱 Responsive behavior setup');
    }

    addClickFeedback(element) {
        // Temporary scale effect
        element.style.transform = 'translateY(-2px) scale(0.95)';
        
        setTimeout(() => {
            element.style.transform = 'translateY(-2px) scale(1.05)';
        }, 100);
        
        setTimeout(() => {
            element.style.transform = 'translateY(-2px) scale(1)';
        }, 200);
    }

    trackSocialClick(platform, url) {
        // Analytics tracking
        if (typeof window.trackEvent === 'function') {
            window.trackEvent('social_link_click', {
                platform: platform.toLowerCase(),
                url: url,
                location: 'top_header',
                timestamp: new Date().toISOString()
            });
        }
    }

    // Public API methods
    show() {
        if (this.elements.container) {
            this.elements.container.style.display = 'flex';
        }
    }

    hide() {
        if (this.elements.container) {
            this.elements.container.style.display = 'none';
        }
    }

    updateTimezone(timezone) {
        this.options.timezone = timezone;
        this.updateDateTime();
    }

    setUpdateInterval(interval) {
        this.options.updateInterval = interval;
        this.startDateTimeUpdates();
    }

    addSocialLink(linkConfig) {
        const { href, title, icon, text, position = 'end' } = linkConfig;
        
        const linkElement = document.createElement('a');
        linkElement.href = href;
        linkElement.className = 'social-links__item';
        linkElement.title = title;
        linkElement.innerHTML = `
            ${icon}
            <span class="social-links__text">${text}</span>
        `;
        
        const socialContainer = this.elements.container.querySelector('.social-links');
        if (socialContainer) {
            if (position === 'start') {
                socialContainer.insertBefore(linkElement, socialContainer.firstChild);
            } else {
                socialContainer.appendChild(linkElement);
            }
            
            // Add events to new link
            this.setupSingleSocialLink(linkElement);
        }
    }

    setupSingleSocialLink(link) {
        link.addEventListener('click', (e) => {
            const linkText = link.querySelector('.social-links__text')?.textContent || 'Unknown';
            this.addClickFeedback(link);
            this.trackSocialClick(linkText, link.href);
            
            if (this.options.onSocialClick) {
                this.options.onSocialClick(linkText, link.href, e);
            }
        });

        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-2px) scale(1.05)';
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(-2px) scale(1)';
        });
    }

    removeSocialLink(identifier) {
        // Remove by href, title, or text content
        const link = Array.from(this.elements.socialLinks).find(link => 
            link.href === identifier || 
            link.title === identifier || 
            link.querySelector('.social-links__text')?.textContent === identifier
        );
        
        if (link && link.parentNode) {
            link.parentNode.removeChild(link);
        }
    }

    getFormattedDateTime() {
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', this.options.dateFormat.timeOptions);
        const day = now.toLocaleDateString('en-US', this.options.dateFormat.dayOptions);
        const date = now.toLocaleDateString('en-GB', this.options.dateFormat.dateOptions);
        
        return {
            formatted: `${this.options.timezone} / ${time}    ${day} ${date}`,
            time,
            day,
            date,
            timezone: this.options.timezone
        };
    }

    destroy() {
        this.stopDateTimeUpdates();
        window.removeEventListener('resize', this.handleResize);
        console.log('🗑️ Top header destroyed');
    }
} 