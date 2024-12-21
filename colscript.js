document.addEventListener('DOMContentLoaded', () => {
    const templateSelect = document.getElementById('templateSelect');
    const gridControls = document.getElementById('gridControls');
    const columnsInput = document.getElementById('columns');
    const rowsInput = document.getElementById('rows');
    const imageUpload = document.getElementById('imageUpload');
    const collageContainer = document.getElementById('collageContainer');
    const drawCustomBtn = document.getElementById('drawCustom');

    let images = [];

    // Handle template selection
    templateSelect.addEventListener('change', () => {
        const template = templateSelect.value;
        if (template === 'grid') {
            gridControls.style.display = 'flex';
            collageContainer.className = 'grid';
            collageContainer.style.columnCount = '';
        } else if (template === 'masonry') {
            gridControls.style.display = 'none';
            collageContainer.className = 'masonry';
        } else {
            gridControls.style.display = 'none';
            collageContainer.className = 'custom';
            // Implement custom frame logic
            // This can be extended with canvas drawing, etc.
            alert('Custom frame drawing is not yet implemented.');
        }
        generateCollage();
    });

    // Handle grid input changes
    [columnsInput, rowsInput].forEach(input => {
        input.addEventListener('change', generateCollage);
    });

    // Handle image uploads
    imageUpload.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    images.push(event.target.result);
                    generateCollage();
                };
                reader.readAsDataURL(file);
            }
        });
    });

    // Handle custom frame drawing
    drawCustomBtn.addEventListener('click', () => {
        // Implement custom frame drawing functionality
        // This could involve using a library like Fabric.js
        alert('Custom frame drawing feature coming soon!');
    });

    // Generate collage based on selected template and images
    function generateCollage() {
        collageContainer.innerHTML = '';
        const template = templateSelect.value;

        if (template === 'grid') {
            const cols = parseInt(columnsInput.value) || 3;
            const rows = parseInt(rowsInput.value) || 3;
            collageContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
            for (let i = 0; i < cols * rows; i++) {
                const item = createCollageItem(images[i]);
                collageContainer.appendChild(item);
            }
        } else if (template === 'masonry') {
            images.forEach(src => {
                const item = createCollageItem(src);
                collageContainer.appendChild(item);
            });
        } else {
            // Custom template logic
        }
    }

    // Create individual collage item
    function createCollageItem(src) {
        const div = document.createElement('div');
        div.classList.add('collage-item');
        if (src) {
            const img = document.createElement('img');
            img.src = src;
            div.appendChild(img);
        }
        return div;
    }
});
