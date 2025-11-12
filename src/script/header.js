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
        console.log('Document clicked, closeing dropdowns if needed');
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
    // Hide all dropdowns first
    this.closeAllDropdowns();

    const dropdownId = `${id}-dropdown`;
    // Toggle the selected dropdown
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
        dropdown.classList.toggle('invisible');
    }
  }

  closeAllDropdowns() {
    // Hide all dropdowns first
    document.querySelectorAll('div[id$="-dropdown"]').forEach(el => {
        el.classList.add('invisible');
    });
  }
}