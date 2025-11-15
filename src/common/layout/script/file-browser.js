export class FileBrowser {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.init();
    }

    init() {
        // Initialize toggle functionality
        this.setupToggle();
        
        // Set initial state based on screen size
        this.updateState();
        
        // Add resize event listener for responsiveness
        window.addEventListener('resize', () => {
            this.updateState();
        });
    }

    setupToggle() {
        if (!this.container) return;

        const toggleButton = this.container.querySelector('[aria-label="Toggle sidebar"]');
        if (toggleButton) {
            toggleButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleSidebar();
            });
        }
    }

    toggleSidebar() {
        if (!this.container) return;
        
        // Check current width
        const currentWidth = this.container.offsetWidth;
        
        if (currentWidth === 0) {
            // Expand sidebar
            this.container.classList.add('w-64');
            this.container.classList.remove('w-0');
        } else {
            // Collapse sidebar
            this.container.classList.add('w-0');
            this.container.classList.remove('w-64');
        }
    }

    updateState() {
        if (!this.container) return;
        
        const currentWidth = window.innerWidth;
        
        // On small screens, collapse sidebar by default (below 768px)
        if (currentWidth < 768 && this.container.offsetWidth === 0) {
            this.container.classList.add('w-0');
            this.container.classList.remove('w-64');
        } 
        else if (currentWidth >= 768 && this.container.offsetWidth === 0) {
            // On larger screens, expand sidebar
            this.container.classList.add('w-64');
            this.container.classList.remove('w-0');
        }
    }

    // Method to show/hide sidebar programmatically
    show() {
        if (this.container) {
            this.container.classList.add('w-64');
            this.container.classList.remove('w-0');
        }
    }

    hide() {
        if (this.container) {
            this.container.classList.add('w-0');
            this.container.classList.remove('w-64');
        }
    }
}

// Export a function to initialize the file browser
export function initFileBrowser(containerId = 'file-browser-sidebar') {
    const fileBrowser = new FileBrowser(containerId);
    return fileBrowser;
}

// Initialize the file browser on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    new FileBrowser('file-browser-sidebar');
});

// Optional: If you want to support closing on click outside, add more logic later.