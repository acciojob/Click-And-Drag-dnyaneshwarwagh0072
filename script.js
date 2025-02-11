document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".items");
    const items = document.querySelectorAll(".item");
    
    let selectedItem = null;
    let offsetX = 0, offsetY = 0;
    
    items.forEach(item => {
        item.addEventListener("mousedown", (e) => {
            selectedItem = e.target;
            const rect = selectedItem.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            selectedItem.style.zIndex = 1000; // Bring to front
        });
    });
    
    document.addEventListener("mousemove", (e) => {
        if (!selectedItem) return;
        
        const containerRect = container.getBoundingClientRect();
        let newX = e.clientX - containerRect.left - offsetX;
        let newY = e.clientY - containerRect.top - offsetY;
        
        // Boundary constraints
        newX = Math.max(0, Math.min(containerRect.width - selectedItem.clientWidth, newX));
        newY = Math.max(0, Math.min(containerRect.height - selectedItem.clientHeight, newY));
        
        selectedItem.style.position = "absolute";
        selectedItem.style.left = `${newX}px`;
        selectedItem.style.top = `${newY}px`;
    });
    
    document.addEventListener("mouseup", () => {
        if (selectedItem) {
            selectedItem.style.zIndex = 1;
            selectedItem = null;
        }
    });
});
