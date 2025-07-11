/**
 * Search Module
 * Handles website search functionality with real-time results
 */

export class Search {
    constructor(options = {}) {
        this.options = {
            inputSelector: '#search-input',
            resultsSelector: '#search-results',
            placeholder: 'Search...',
            minQueryLength: 2,
            maxResults: 5,
            debounceDelay: 300,
            onSearch: null,
            onSelect: null,
            ...options
        };
        
        this.elements = {};
        this.searchData = [];
        this.debounceTimer = null;
        
        this.init();
    }

    init() {
        console.log('🔍 Initializing Search Module...');
        this.findElements();
        this.setupSearchData();
        this.bindEvents();
        this.setupKeyboardShortcuts();
    }

    findElements() {
        this.elements = {
            input: document.querySelector(this.options.inputSelector),
            results: document.querySelector(this.options.resultsSelector)
        };

        if (!this.elements.input || !this.elements.results) {
            console.error('❌ Search elements not found');
            return false;
        }

        console.log('✅ Search elements found');
        return true;
    }

    setupSearchData() {
        // Default searchable content - can be customized
        this.searchData = [
            {
                title: 'Home',
                content: 'Welcome to my portfolio. I am a software developer.',
                section: 'home',
                type: 'page'
            },
            {
                title: 'About Me',
                content: 'I am a passionate developer with expertise in modern web technologies.',
                section: 'about',
                type: 'page'
            },
            {
                title: 'Skills',
                content: 'HTML5, CSS3, JavaScript, React, Node.js, Python, Database',
                section: 'skills',
                type: 'page'
            },
            {
                title: 'Projects',
                content: 'E-commerce Website, Task Management App, Weather Dashboard',
                section: 'projects',
                type: 'page'
            },
            {
                title: 'Contact',
                content: 'Get in touch with me for collaborations and opportunities',
                section: 'contact',
                type: 'page'
            }
        ];
    }

    bindEvents() {
        if (!this.elements.input) return;

        // Input event with debouncing
        this.elements.input.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Focus events
        this.elements.input.addEventListener('focus', () => {
            this.elements.input.classList.add('focused');
        });

        this.elements.input.addEventListener('blur', () => {
            // Delay hiding results to allow for clicks
            setTimeout(() => {
                this.hideResults();
                this.elements.input.classList.remove('focused');
            }, 200);
        });

        // Click outside to close
        document.addEventListener('click', (e) => {
            if (!this.elements.input.contains(e.target) && 
                !this.elements.results.contains(e.target)) {
                this.hideResults();
            }
        });

        console.log('✅ Search events bound');
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.focusInput();
            }

            // Escape to clear and close search
            if (e.key === 'Escape' && this.elements.results.classList.contains('active')) {
                this.clearSearch();
            }

            // Arrow key navigation in results
            if (this.elements.results.classList.contains('active')) {
                this.handleArrowNavigation(e);
            }
        });
    }

    handleSearch(query) {
        // Clear previous debounce timer
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }

        // Debounce the search
        this.debounceTimer = setTimeout(() => {
            this.performSearch(query);
        }, this.options.debounceDelay);
    }

    performSearch(query) {
        const trimmedQuery = query.trim();

        if (trimmedQuery.length < this.options.minQueryLength) {
            this.hideResults();
            return;
        }

        console.log('🔍 Searching for:', trimmedQuery);

        const results = this.searchData
            .filter(item => this.matchesQuery(item, trimmedQuery))
            .slice(0, this.options.maxResults)
            .map(item => ({
                ...item,
                highlight: this.highlightMatches(item, trimmedQuery)
            }));

        this.displayResults(results);

        // Call custom search callback
        if (this.options.onSearch && typeof this.options.onSearch === 'function') {
            this.options.onSearch(trimmedQuery, results);
        }
    }

    matchesQuery(item, query) {
        const searchText = `${item.title} ${item.content}`.toLowerCase();
        const searchQuery = query.toLowerCase();
        
        return searchText.includes(searchQuery);
    }

    highlightMatches(item, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return {
            title: item.title.replace(regex, '<mark>$1</mark>'),
            content: item.content.replace(regex, '<mark>$1</mark>')
        };
    }

    displayResults(results) {
        if (results.length === 0) {
            this.elements.results.innerHTML = `
                <div class="search-result-item search-result-item--no-results">
                    No results found
                </div>
            `;
        } else {
            this.elements.results.innerHTML = results
                .map((result, index) => `
                    <div class="search-result-item" data-index="${index}" data-section="${result.section}">
                        <div class="search-result-title">${result.highlight.title}</div>
                        <div class="search-result-content">${result.highlight.content.substring(0, 100)}...</div>
                        <div class="search-result-type">${result.type}</div>
                    </div>
                `)
                .join('');

            // Add click handlers to results
            this.elements.results.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    const section = e.currentTarget.dataset.section;
                    if (section) {
                        this.selectResult(section);
                    }
                });
            });
        }

        this.showResults();
    }

    selectResult(sectionId) {
        console.log('📍 Navigating to:', sectionId);
        
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }

        this.clearSearch();

        // Call custom select callback
        if (this.options.onSelect && typeof this.options.onSelect === 'function') {
            this.options.onSelect(sectionId);
        }
    }

    showResults() {
        this.elements.results.classList.add('active');
    }

    hideResults() {
        this.elements.results.classList.remove('active');
    }

    clearSearch() {
        this.elements.input.value = '';
        this.hideResults();
    }

    focusInput() {
        if (this.elements.input) {
            this.elements.input.focus();
            this.elements.input.select();
        }
    }

    handleArrowNavigation(e) {
        const items = this.elements.results.querySelectorAll('.search-result-item');
        if (items.length === 0) return;

        const currentSelected = this.elements.results.querySelector('.search-result-item--selected');
        let newIndex = 0;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (currentSelected) {
                const currentIndex = parseInt(currentSelected.dataset.index);
                newIndex = Math.min(currentIndex + 1, items.length - 1);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (currentSelected) {
                const currentIndex = parseInt(currentSelected.dataset.index);
                newIndex = Math.max(currentIndex - 1, 0);
            } else {
                newIndex = items.length - 1;
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (currentSelected) {
                const section = currentSelected.dataset.section;
                this.selectResult(section);
            }
            return;
        } else {
            return;
        }

        // Update selection
        items.forEach(item => item.classList.remove('search-result-item--selected'));
        items[newIndex].classList.add('search-result-item--selected');
    }

    // Public API methods
    addSearchData(data) {
        if (Array.isArray(data)) {
            this.searchData = [...this.searchData, ...data];
        } else {
            this.searchData.push(data);
        }
    }

    updateSearchData(data) {
        this.searchData = data;
    }

    getSearchData() {
        return this.searchData;
    }

    setPlaceholder(text) {
        if (this.elements.input) {
            this.elements.input.placeholder = text;
        }
    }

    destroy() {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
        console.log('🗑️ Search destroyed');
    }
} 