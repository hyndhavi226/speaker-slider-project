document.addEventListener('DOMContentLoaded', () => {
    
    const cards = document.querySelectorAll('.speaker-slider__card');
    const overlay = document.getElementById('speaker-overlay');
    const closeOverlayBtn = document.getElementById('closeOverlay');
    const overlayName = document.getElementById('overlayName');
    const overlayPosition = document.getElementById('overlayPosition');
    const overlayBio = document.getElementById('overlayBio');
    const overlayImage = document.getElementById('overlayImage');

    
    const speakerModal = document.getElementById('speakerModal');
    const modalClose = document.getElementById('modalClose');
    const modalName = document.getElementById('modalName');
    const modalPosition = document.getElementById('modalPosition');
    const modalCompany = document.getElementById('modalCompany');
    const modalBio = document.getElementById('modalBio');
    const modalImage = document.getElementById('modalImage');

    
    const container = document.getElementById('speakerContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    
    const seeProgramBtn = document.getElementById('seeProgramBtn');
    const fullProgramSection = document.getElementById('fullProgramSection');
    const fullProgramSpeakers = document.getElementById('fullProgramSpeakers');
    const closeProgramBtn = document.getElementById('closeProgramBtn');

    
    let currentIndex = 0;
    const visibleCards = 4; 
    const totalCards = container.children.length; 

    
    const updateCarousel = () => {
        const start = currentIndex;
        const end = start + visibleCards;

        
        [...container.children].forEach((card, index) => {
            card.style.display = (index >= start && index < end) ? 'block' : 'none';
        });
    };

    
    const openOverlay = (card) => {
        const name = card.getAttribute('data-name');
        const position = card.getAttribute('data-position');
        const bio = card.getAttribute('data-bio');
        const imageSrc = card.querySelector('img').src;

        overlayName.textContent = name;
        overlayPosition.textContent = position;
        overlayBio.textContent = bio;
        overlayImage.src = imageSrc;

        overlay.style.display = 'block';
        overlay.setAttribute('aria-hidden', 'false');
        closeOverlayBtn.focus();
    };

    
    const closeOverlay = () => {
        overlay.style.display = 'none';
        overlay.setAttribute('aria-hidden', 'true');
    };

    
    const openModal = (card) => {
        const name = card.getAttribute('data-name');
        const position = card.getAttribute('data-position');
        const company = card.getAttribute('data-company') || '';
        const bio = card.getAttribute('data-bio');
        const imageSrc = card.querySelector('img').src;

        modalName.textContent = name;
        modalPosition.textContent = position;
        modalCompany.textContent = company;
        modalBio.textContent = bio;
        modalImage.src = imageSrc;

        speakerModal.style.display = 'flex';
        speakerModal.setAttribute('aria-hidden', 'false');
    };

   
    const closeModal = () => {
        speakerModal.style.display = 'none';
        speakerModal.setAttribute('aria-hidden', 'true');
    };

    
    cards.forEach(card => {
        card.addEventListener('click', () => openOverlay(card));
        card.addEventListener('dblclick', () => openModal(card)); 
    });

    
    closeOverlayBtn.addEventListener('click', closeOverlay);

    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (overlay.style.display === 'block') closeOverlay();
            if (speakerModal.style.display === 'flex') closeModal();
        }
    });

    
    modalClose.addEventListener('click', closeModal);

    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex -= visibleCards;
            currentIndex = Math.max(currentIndex, 0);
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex + visibleCards < totalCards) {
            currentIndex += visibleCards;
            updateCarousel();
        }
    });

    
    updateCarousel();

    
    const populateFullProgram = () => {
        fullProgramSpeakers.innerHTML = '';

        cards.forEach(card => {
            const speakerDiv = document.createElement('div');
            speakerDiv.classList.add('full-program__speaker');

            const img = document.createElement('img');
            img.src = card.querySelector('img').src;
            img.alt = card.getAttribute('data-name');

            const name = document.createElement('h3');
            name.classList.add('full-program__speaker-name');
            name.textContent = card.getAttribute('data-name');

            const position = document.createElement('p');
            position.classList.add('full-program__speaker-position');
            position.textContent = card.getAttribute('data-position');

            const company = document.createElement('p');
            company.classList.add('full-program__speaker-company');
            company.textContent = card.getAttribute('data-company');

            speakerDiv.append(img, name, position, company);
            fullProgramSpeakers.appendChild(speakerDiv);
        });
    };

    
    seeProgramBtn.addEventListener('click', () => {
        populateFullProgram();
        fullProgramSection.style.display = 'block';
        fullProgramSection.setAttribute('aria-hidden', 'false');
    });

    
    closeProgramBtn.addEventListener('click', () => {
        fullProgramSection.style.display = 'none';
        fullProgramSection.setAttribute('aria-hidden', 'true');
    });
});
