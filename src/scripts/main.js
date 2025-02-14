const hamburgerButton = document.getElementById('hamburgerButton');
const sections = document.querySelectorAll("section");
const menuButtons = document.querySelectorAll(".menuButton");
const menuButtonsMobile = document.querySelectorAll(".menuButtonMobile");
const mobileMenu = document.getElementById('mobileMenu');

let slideIndex = 0;

document.getElementById("currentYear").textContent = new Date().getFullYear();

document.getElementById("contact").addEventListener("contentUpdated", () => {

    let emailText;
    const revealButton = document.getElementById("revealButton");
    const copyButton = document.getElementById("copyButton");

    revealButton.addEventListener("click", () => {
        const email = "0zoltanmolnar" + String.fromCharCode(64) + "gmail.com";
        const emailLink = document.createElement("a");
        emailLink.setAttribute("id", "emailText");
        emailLink.classList.add("text-gray-400");
        emailLink.href = "mailto:" + email;
        emailLink.textContent = email;
        document.getElementById("emailContainer").appendChild(emailLink);
        emailText = email;

        revealButton.classList.replace("flex", "hidden");
        copyButton.classList.replace("hidden", "flex");

    });

    copyButton.addEventListener("click", () => {
        const textCopied = document.getElementById("textCopied");
        
        navigator.clipboard.writeText(emailText)
            .then(() => textCopied.style.display = "flex")
            .catch(error => console.error("Error copying text:", error));
    });

});

document.getElementById("projects").addEventListener("contentUpdated", () => {
    
    const slideNext = document.getElementById("slideNext");
    const slidePrev = document.getElementById("slidePrev");
    const slides = document.querySelectorAll(".slide");
    const slideTitle = document.getElementById("projectTitle");
    const linkGitHub = document.getElementById("linkGitHub");
    const linkWebsite = document.getElementById("linkWebsite");

    slideTitle.textContent = slides[slideIndex].firstElementChild.alt;
    linkGitHub.setAttribute("href", slides[slideIndex].children[1].textContent);
    linkWebsite.setAttribute("href", slides[slideIndex].lastElementChild.textContent);

    slideNext.addEventListener("click", () => {

        slides.forEach((slide) => {
            slide.classList.replace("flex", "hidden");
        });
        slideIndex = slideIndex < slides.length - 1 ? slideIndex + 1 : 0;
        slides[slideIndex].classList.replace("hidden", "flex");
        slideTitle.textContent = slides[slideIndex].firstElementChild.alt;
        linkGitHub.setAttribute("href", slides[slideIndex].children[1].textContent);
        linkWebsite.setAttribute("href", slides[slideIndex].lastElementChild.textContent);

    });

    slidePrev.addEventListener("click", () => {

        slides.forEach((slide) => {
            slide.classList.replace("flex", "hidden");
        });
        slideIndex = slideIndex > 0 ? slideIndex - 1 : slides.length - 1;
        slides[slideIndex].classList.replace("hidden", "flex");
        slideTitle.textContent = slides[slideIndex].firstElementChild.alt;
        linkGitHub.setAttribute("href", slides[slideIndex].children[1].textContent);
        linkWebsite.setAttribute("href", slides[slideIndex].lastElementChild.textContent);

    });

    const svgSlidePrev = `<svg class="slideIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M560.67-213.33 293.33-480.67 560.67-748l74 74-193.34 193.33 193.34 193.34-74 74Z"/></svg>`;
    const svgSlideNext = `<svg class="slideIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M494.67-480.67 301.33-674l74-74 267.34 267.33-267.34 267.34-74-74 193.34-193.34Z"/></svg>`;
    let tempDiv = document.createElement('div');

    tempDiv.innerHTML = svgSlidePrev;
    slidePrev.appendChild(tempDiv.firstChild);

    tempDiv.innerHTML = svgSlideNext;
    slideNext.appendChild(tempDiv.firstChild);

});



hamburgerButton.addEventListener('click', () => {

    const hamburgerIcon = document.getElementById('hamburgerIcon');
    const closeIcon = document.getElementById('closeIcon');
    const navbar = document.getElementById("navbar");

    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
    hamburgerIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');

    if (hamburgerIcon.classList.contains("hidden")) {
        navbar.classList.replace("justify-end", "justify-between")
    }
    else {
        navbar.classList.replace("justify-between", "justify-end")
    }

});



const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            clearMenuButtons(menuButtons);
            clearMenuButtons(menuButtonsMobile);

            setButtonActive(menuButtons, entry.target.id);
            setButtonActive(menuButtonsMobile, entry.target.id);

            // Need to do it for both desktop and mobile in case the user resizes the browser window

        }
    });
}, { threshold: 0.5 }); // Adjust threshold as needed (0.5 means 50% visibility)

sections.forEach(section => observer.observe(section));


function clearMenuButtons(buttons) { // Makes all menu buttons inactive 

    buttons.forEach(button => {
        button.classList.remove("activeButton");
    });

}

function setButtonActive(buttons, sectionID) { // Adds the activeButton class to the menu button that belongs to the current section

    for (const button of buttons) {

        const menuHref = button.href;
        if (menuHref.includes(sectionID)) {
            button.classList.add("activeButton");
            break;
        }                
    }

}