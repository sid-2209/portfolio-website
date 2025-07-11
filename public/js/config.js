/**
 * Portfolio Website Configuration
 * Customize your website behavior by modifying these settings
 */

export const portfolioConfig = {
    // Theme Toggle Settings
    themeToggle: {
        selector: '#sidebar-theme-toggle',
        defaultTheme: 'light',
        storageKey: 'portfolio-theme',
        onToggle: (theme) => {
            console.log(`🎨 Theme switched to: ${theme}`);
            // Add custom theme change logic here
        }
    },

    // Sidebar Navigation Settings
    sidebar: {
        sidebarSelector: '#sidebar',
        toggleSelector: '#sidebar-toggle',
        closeSelector: '#sidebar-close',
        overlaySelector: '#sidebar-overlay',
        linkSelector: '.sidebar__link',
        activeClass: 'show-sidebar',
        activeLinkClass: 'active-link',
        mobileBreakpoint: 968
    },

    // Search Functionality Settings
    search: {
        inputSelector: '#search-input',
        resultsSelector: '#search-results',
        placeholder: "What's your name?",
        minQueryLength: 2,
        maxResults: 8,
        debounceDelay: 300,
        onSearch: (query, results) => {
            console.log(`🔍 Search: "${query}" found ${results.length} results`);
        },
        onSelect: (sectionId) => {
            console.log(`📍 Navigated to: ${sectionId}`);
        }
    },

    // Top Header Settings
    topHeader: {
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
        onSocialClick: (platform, url, event) => {
            console.log(`🔗 Social link clicked: ${platform} -> ${url}`);
            // Add custom social link tracking here
        }
    },

    // Analytics Settings
    analytics: {
        enabled: true,
        trackEvents: true,
        service: 'custom', // 'google', 'mixpanel', 'custom', etc.
        trackingId: '', // Your tracking ID
        customEvents: {
            pageView: true,
            themeToggle: true,
            searchUsage: true,
            socialClicks: true,
            formSubmissions: true
        }
    },

    // Accessibility Settings
    accessibility: {
        enabled: true,
        announcements: true,
        keyboardShortcuts: true,
        focusManagement: true,
        skipLinks: true
    },

    // Performance Settings
    performance: {
        enableLazyLoading: true,
        enableAnimations: true,
        throttleScrollEvents: true,
        preloadCriticalResources: true,
        enableServiceWorker: false // Set to true for PWA features
    },

    // Animation Settings
    animations: {
        enableScrollReveal: true,
        enableHoverEffects: true,
        enableLoadingAnimations: true,
        skillsAnimationDelay: 100,
        typingEffectSpeed: 100
    },

    // Contact Form Settings
    contactForm: {
        selector: '#contact-form',
        endpoint: '', // Your form submission endpoint
        method: 'POST',
        showSuccessMessage: true,
        successMessage: 'Thank you! Your message has been sent.',
        errorMessage: 'Sorry, there was an error sending your message.',
        validationRules: {
            name: { required: true, minLength: 2 },
            email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
            subject: { required: true, minLength: 5 },
            message: { required: true, minLength: 10 }
        }
    },

    // Skills Animation Settings
    skills: {
        animateOnScroll: true,
        animationDelay: 500,
        animationDuration: 1000,
        animationStagger: 100
    },

    // Custom Social Links (can be added dynamically)
    customSocialLinks: [
        // Example: Add Dribbble
        // {
        //     href: 'https://dribbble.com/yourusername',
        //     title: 'Dribbble',
        //     text: 'Dribbble',
        //     icon: '<svg>...</svg>',
        //     position: 'end'
        // }
    ],

    // Search Data (can be extended)
    customSearchData: [
        // Example: Add blog posts
        // {
        //     title: 'Blog',
        //     content: 'Read my latest thoughts on web development and technology',
        //     section: 'blog',
        //     type: 'page'
        // }
    ],

    // Development Settings
    development: {
        enableDebugMode: false,
        enableConsoleMessages: true,
        showPerformanceMetrics: false,
        enableTestButtons: false
    }
};

// Export specific configurations for easy imports
export const themeConfig = portfolioConfig.themeToggle;
export const sidebarConfig = portfolioConfig.sidebar;
export const searchConfig = portfolioConfig.search;
export const headerConfig = portfolioConfig.topHeader;

// Easy customization functions
export const customizeTheme = (options) => {
    Object.assign(portfolioConfig.themeToggle, options);
};

export const customizeSearch = (options) => {
    Object.assign(portfolioConfig.search, options);
};

export const addSocialLink = (linkConfig) => {
    portfolioConfig.customSocialLinks.push(linkConfig);
};

export const addSearchData = (dataConfig) => {
    portfolioConfig.customSearchData.push(dataConfig);
};

// Usage examples:
/*

// Customize theme behavior
customizeTheme({
    defaultTheme: 'dark',
    onToggle: (theme) => {
        document.body.style.transition = 'background-color 0.3s ease';
    }
});

// Add custom search data
addSearchData({
    title: 'Resume',
    content: 'Download my resume and view my professional experience',
    section: 'resume',
    type: 'document'
});

// Add custom social link
addSocialLink({
    href: 'https://youtube.com/yourchannel',
    title: 'YouTube',
    text: 'YouTube',
    icon: '<svg>...</svg>'
});

*/ 