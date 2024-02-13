const generateButton = document.querySelector('.generate-button');
const colorPreview = document.querySelector('.color-preview');
const colorText = document.querySelector('.color-text');
const colorHeading = document.querySelector('.color-heading');

document.addEventListener('DOMContentLoaded', function() {
   
    generateButton.addEventListener('click', function() {
        const randomColor = generateRandomColor();
        colorText.innerText = randomColor;
        colorPreview.style.backgroundColor = randomColor;
    });

    setInterval(function() {
        const randomColor = generateRandomColor();
        colorHeading.style.color = randomColor;
    }, 2000);

    function generateRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
