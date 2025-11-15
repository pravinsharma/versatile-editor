// Load and inject the header HTML file, then initialize HeaderMenu

export async function loadHtml(path, targetId) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Failed to load HTML: ${response.status}`);

        const htmlContent = await response.text();
        if (targetId) {
            const target = document.getElementById(targetId);
            if (target) {
                target.innerHTML = htmlContent;
            } else {
                console.error(`Target element #${targetId} not found.`);
            }
        } else {
            document.body.insertAdjacentHTML('afterbegin', htmlContent);
        }
    } catch (error) {
        console.error("Error loading HTML:", error);
    }
}