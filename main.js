document.addEventListener("DOMContentLoaded", function() {
    // container
    const container = document.createElement('div');
    container.classList.add('container');

    // gallows container
    const gallowsContainer = document.createElement('div');
    gallowsContainer.classList.add('gallows-container');

    // Set background image for gallows container
    gallowsContainer.style.backgroundImage = "url('assets/gallows.png')";
    gallowsContainer.style.backgroundSize = 'contain';
    gallowsContainer.style.backgroundRepeat = 'no-repeat';

    // Append elements to body
    document.body.appendChild(container);
    container.appendChild(gallowsContainer);

});
