# Portfolio Website - Modular JavaScript Architecture

## 📂 Module Structure

This portfolio website is built with a clean, modular architecture that makes it easy to customize, maintain, and extend.

```
js/
├── app.js                 # Main application entry point
├── config.js              # Configuration file for easy customization
├── main.js                # Legacy fallback for older browsers
├── modules/
│   ├── themeToggle.js     # Dark/light theme switching
│   ├── sidebar.js         # Sidebar navigation
│   ├── search.js          # Website search functionality
│   └── topHeader.js       # Header with datetime and social links
└── README.md              # This documentation
```

## 🚀 Quick Start

### Basic Usage
The application automatically initializes when the page loads:

```html
<!-- Use ES6 modules for modern browsers -->
<script type="module" src="js/app.js"></script>

<!-- Fallback for older browsers -->
<script nomodule src="js/main.js"></script>
```

### Customization
Modify `js/config.js` to customize behavior:

```javascript
// Change theme toggle behavior
customizeTheme({
    defaultTheme: 'dark',
    onToggle: (theme) => {
        console.log(`Theme changed to: ${theme}`);
    }
});

// Add custom search data
addSearchData({
    title: 'Blog',
    content: 'Read my latest posts',
    section: 'blog',
    type: 'page'
});
```

## 🧩 Modules

### ThemeToggle Module
Handles light/dark mode switching with persistent storage.

**Features:**
- iOS-style sliding toggle
- Persistent theme storage
- Custom callback support
- Keyboard accessibility

**Usage:**
```javascript
import { ThemeToggle } from './modules/themeToggle.js';

const themeToggle = new ThemeToggle({
    selector: '#sidebar-theme-toggle',
    defaultTheme: 'light',
    onToggle: (theme) => console.log(`Theme: ${theme}`)
});

// Public API
themeToggle.setDarkMode();
themeToggle.setLightMode();
themeToggle.getCurrentTheme();
```

### Sidebar Module
Manages navigation sidebar with responsive behavior.

**Features:**
- Responsive mobile/desktop behavior
- Active link highlighting
- Smooth scroll to sections
- Keyboard navigation

**Usage:**
```javascript
import { Sidebar } from './modules/sidebar.js';

const sidebar = new Sidebar({
    mobileBreakpoint: 968,
    activeClass: 'show-sidebar'
});

// Public API
sidebar.open();
sidebar.close();
sidebar.navigateToSection('about');
sidebar.addCustomLink({
    href: '#blog',
    text: 'Blog',
    icon: '<svg>...</svg>'
});
```

### Search Module
Provides real-time search functionality.

**Features:**
- Real-time search results
- Keyboard navigation
- Highlight matching text
- Customizable search data

**Usage:**
```javascript
import { Search } from './modules/search.js';

const search = new Search({
    minQueryLength: 2,
    maxResults: 5,
    onSelect: (sectionId) => console.log(`Selected: ${sectionId}`)
});

// Public API
search.addSearchData({
    title: 'Portfolio',
    content: 'View my work',
    section: 'portfolio'
});
search.focusInput();
search.clearSearch();
```

### TopHeader Module
Manages the top header with datetime and social links.

**Features:**
- Live datetime updates
- Social link tracking
- Responsive visibility
- Timezone customization

**Usage:**
```javascript
import { TopHeader } from './modules/topHeader.js';

const topHeader = new TopHeader({
    timezone: 'PST',
    updateInterval: 1000,
    onSocialClick: (platform, url) => console.log(`${platform}: ${url}`)
});

// Public API
topHeader.updateTimezone('EST');
topHeader.addSocialLink({
    href: 'https://dribbble.com/user',
    title: 'Dribbble',
    text: 'Dribbble',
    icon: '<svg>...</svg>'
});
```

## 🔧 Configuration

### Global Configuration
All modules can be configured through `js/config.js`:

```javascript
export const portfolioConfig = {
    themeToggle: {
        defaultTheme: 'light',
        storageKey: 'theme'
    },
    sidebar: {
        mobileBreakpoint: 968
    },
    search: {
        placeholder: 'Search...',
        maxResults: 8
    },
    topHeader: {
        timezone: 'GMT',
        updateInterval: 1000
    }
};
```

### Environment-Specific Settings
```javascript
// Development settings
development: {
    enableDebugMode: true,
    enableConsoleMessages: true,
    showPerformanceMetrics: true
},

// Production settings
analytics: {
    enabled: true,
    service: 'google',
    trackingId: 'GA-XXXXXXXXX'
}
```

## 🎨 Customization Examples

### 1. Change Theme Toggle Style
```javascript
// In config.js
customizeTheme({
    onToggle: (theme) => {
        document.body.style.transition = 'all 0.3s ease';
        if (theme === 'dark') {
            document.body.style.backgroundColor = '#1a1a1a';
        }
    }
});
```

### 2. Add Custom Search Categories
```javascript
// Add blog posts to search
addSearchData({
    title: 'Latest Blog Post',
    content: 'JavaScript ES2024 features and improvements',
    section: 'blog',
    type: 'blog-post',
    url: '/blog/es2024-features'
});
```

### 3. Customize Social Links
```javascript
// Add YouTube channel
addSocialLink({
    href: 'https://youtube.com/@yourhandle',
    title: 'YouTube Channel',
    text: 'YouTube',
    icon: `<svg viewBox="0 0 24 24">...</svg>`,
    position: 'end'
});
```

### 4. Add Custom Keyboard Shortcuts
```javascript
// In your custom JavaScript
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'h') {
        portfolioApp.getModule('topHeader').hide();
    }
});
```

## 🔌 Extension Points

### Adding New Modules
1. Create a new module file in `js/modules/`
2. Export a class with standard methods:
   ```javascript
   export class MyModule {
       constructor(options = {}) {
           this.options = { ...defaults, ...options };
           this.init();
       }
       
       init() {
           // Initialize module
       }
       
       destroy() {
           // Cleanup
       }
   }
   ```
3. Import and initialize in `app.js`

### Custom Event Handling
```javascript
// Listen for app initialization
document.addEventListener('portfolioAppReady', (event) => {
    console.log('App ready:', event.detail);
    
    // Access modules
    const themeToggle = event.detail.modules.themeToggle;
});
```

### Plugin System
```javascript
// Create a plugin
const MyPlugin = {
    name: 'MyPlugin',
    init(app) {
        console.log('Plugin initialized');
        // Add functionality
    }
};

// Register plugin
portfolioApp.registerPlugin(MyPlugin);
```

## 🧪 Testing & Debugging

### Debug Mode
```javascript
// Enable debug mode in config
development: {
    enableDebugMode: true,
    enableTestButtons: true
}
```

### Console Commands
```javascript
// Access app globally
window.portfolioApp.getModule('themeToggle').toggle();
window.portfolioApp.getModule('search').focusInput();

// Test theme toggle
window.manualToggleTest();
```

### Performance Monitoring
```javascript
// Monitor module performance
console.time('ThemeToggle Init');
const themeToggle = new ThemeToggle();
console.timeEnd('ThemeToggle Init');
```

## 📱 Browser Support

- **Modern Browsers**: Full ES6 module support
- **Legacy Browsers**: Fallback to compiled main.js
- **Mobile**: Responsive design with touch support
- **Accessibility**: WCAG 2.1 AA compliant

## 🚀 Production Optimization

### Bundle for Production
```bash
# Using Rollup or Webpack
npm run build

# Manual optimization
# 1. Minify modules
# 2. Tree-shake unused code
# 3. Bundle critical CSS
# 4. Optimize images
```

### Performance Best Practices
- Modules are lazy-loaded when needed
- Event listeners use passive mode where possible
- Scroll events are throttled with requestAnimationFrame
- Images use lazy loading with Intersection Observer

## 🤝 Contributing

When adding new features:
1. Follow the existing module pattern
2. Add configuration options to `config.js`
3. Include proper error handling
4. Add JSDoc comments
5. Test on multiple devices

## 📄 License

This modular architecture is part of the portfolio website template and follows the same MIT license. 