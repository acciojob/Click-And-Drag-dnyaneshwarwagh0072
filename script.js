document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".items");
    const cubes = document.querySelectorAll(".item");
    let selectedCube = null;
    let offsetX = 0, offsetY = 0;

    cubes.forEach(cube => {
        cube.addEventListener("mousedown", (event) => {
            selectedCube = cube;
            const rect = cube.getBoundingClientRect();
            offsetX = event.clientX - rect.left;
            offsetY = event.clientY - rect.top;
            cube.style.position = "absolute";
            cube.style.zIndex = "1000";
        });
    });

    document.addEventListener("mousemove", (event) => {
        if (!selectedCube) return;

        let x = event.clientX - offsetX;
        let y = event.clientY - offsetY;

        const containerRect = container.getBoundingClientRect();
        const cubeRect = selectedCube.getBoundingClientRect();

        // Ensure cube stays within boundaries
        if (x < containerRect.left) x = containerRect.left;
        if (y < containerRect.top) y = containerRect.top;
        if (x + cubeRect.width > containerRect.right) x = containerRect.right - cubeRect.width;
        if (y + cubeRect.height > containerRect.bottom) y = containerRect.bottom - cubeRect.height;

        selectedCube.style.left = `${x}px`;
        selectedCube.style.top = `${y}px`;
    });

    document.addEventListener("mouseup", () => {
        if (selectedCube) {
            selectedCube.style.zIndex = "1";
            selectedCube = null;
        }
    });
});
