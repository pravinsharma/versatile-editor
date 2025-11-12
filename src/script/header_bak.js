export class HeaderMenu {
    constructor() {
        this.init();
    }

    init() {
        // Initialize dropdowns
        this.fileDropdown = document.getElementById('file-dropdown');
        this.editDropdown = document.getElementById('edit-dropdown');
        this.viewDropdown = document.getElementById('view-dropdown');
        this.helpDropdown = document.getElementById('help-dropdown');

        // Add click handlers for main menu items
        document.querySelectorAll('.relative-group a').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const dropdownId = e.target.nextElementSibling.id;
                this.toggleDropdown(dropdownId);
            });
        });

        // Close dropdowns when clicking outside or inside
        document.addEventListener('click', (e) => {
            const isInsideDropdown = e.target.closest('.relative-group');
            if (!isInsideDropdown) {
                this.closeAllDropdowns();
            } else {
                // If click is inside a dropdown, close all dropdowns except the clicked one
                const dropdownId = e.target.closest('.relative-group').dataset.menuItem;
                this.toggleDropdown(dropdownId);
            }
        });
    }

    toggleDropdown(id) {
        if (!id) return;
        this.closeAllDropdowns();

        const dropdown = document.getElementById(id);
        if (dropdown.classList.contains('invisible')) {
            dropdown.classList.remove('invisible');
        } else {
            dropdown.classList.add('invisible');
        }
    }

    closeAllDropdowns() {console.log('Closing all dropdowns');
        [this.fileDropdown, this.editDropdown, this.viewDropdown, this.helpDropdown].forEach(
            dropdown => {
                if (dropdown.classList.contains('invisible')) return;
                dropdown.classList.add('invisible');
            }
        );
    }
}

// Initialize the header menu
document.addEventListener('DOMContentLoaded', () => {console.log('Initializing HeaderMenu');
    new HeaderMenu();
});