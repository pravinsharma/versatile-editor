export default class HeaderMenu {
  constructor() {
    this.init();
  }

  init() {
    console.log('Initializing HeaderMenu');

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

  toggleDropdown(id) {console.log('Toggling dropdown for', id);
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

  logout() {
    console.log('Logout clicked!');
    // Add your logout logic here
  };
}