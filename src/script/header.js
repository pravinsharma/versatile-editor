export default class HeaderMenu {
  constructor() {
    this.init();
  }

  init() {
    console.log('Initializing HeaderMenu');

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.bindEvents());
    } else {
      this.bindEvents();
    }

    // Close dropdowns when clicking outside or inside
    document.addEventListener('click', (e) => {
        const isInsideDropdown = e.target.closest('.relative-group');
        if (!isInsideDropdown) {
            this.closeAllDropdowns();
        }
    });
  }

  bindEvents() {
    const menuItems = ['file', 'edit', 'view', 'help'];
    
    // For each menu item, find the anchor and attach click event
    menuItems.forEach(id => {
      const anchor = document.querySelector(`a[data-menu="${id}"]`);
      
      if (anchor) {
        anchor.addEventListener('click', () => {
          console.log(`Clicked: ${id}`);
          this.toggleDropdown(id);
        });
      }
    });

    // Bind logout button
    const logoutButton = document.querySelector('[data-action="logout"]');
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        window.logout();
      });
    }
  }

  toggleDropdown(id) {
    // Use the global function from header.js — ensure it's imported!
    const dropdownId = `${id}-dropdown`;
    if (typeof window.toggleDropdown === 'function') {
      window.toggleDropdown(dropdownId);
    } else {
      console.error(`toggleDropdown is not defined!`);
    }
  }

  closeAllDropdowns() {
    document.querySelectorAll('.relative-group > div').forEach(button => {
        button.classList.add('invisible');
    });
  }
}