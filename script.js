
// ==========================================
// 1. PAGE / SECTION NAVIGATION
// ==========================================

const sectionIds = ["home", "about", "skills", "projects", "contact"];

const pageSections = sectionIds
    .map(id => document.getElementById(id))
    .filter(section => section !== null);

const navigationLinks = document.querySelectorAll('a[href^="#"]');

function showSection(sectionId) {
    const selectedSection = pageSections.find(
        section => section.id === sectionId
    );

    if (!selectedSection) {
        return;
    }

    // Display only the selected section
    pageSections.forEach(section => {
        section.hidden = section.id !== sectionId;
    });

    // Update the active navigation link
    document.querySelectorAll(".nav-links a").forEach(link => {
        const isActive = link.getAttribute("href") === "#" + sectionId;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    // Close the mobile navigation menu
    if (navLinks) {
        navLinks.classList.remove("active");
    }

    // Start the selected page at the top
    window.scrollTo(0, 0);

    // Activate reveal animations in the selected section
    if (revealObserver) {
        selectedSection.querySelectorAll(".reveal").forEach(element => {
            revealObserver.observe(element);
        });
    }
}

// Handle navigation and buttons that link to sections
navigationLinks.forEach(link => {
    link.addEventListener("click", function (event) {
        const href = this.getAttribute("href");

        if (href === "#") {
            event.preventDefault();
            history.pushState(null, "", "#home");
            showSection("home");
            return;
        }

        const sectionId = href.substring(1);

        if (sectionIds.includes(sectionId)) {
            event.preventDefault();
            history.pushState(null, "", "#" + sectionId);
            showSection(sectionId);
        }
    });
});

// Support browser Back and Forward buttons
window.addEventListener("popstate", function () {
    const sectionId = window.location.hash.substring(1) || "home";
    showSection(sectionId);
});




// ==========================================
// 2. MOBILE NAVIGATION MENU
// ==========================================

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

if (menuButton && navLinks) {
    menuButton.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
}


// ==========================================
// 3. CONTACT FORM
// ==========================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const recipient = "muhammedsiraj1441@gmail.com";

        const emailBody =
            "Name: " + name + "\n" +
            "Email: " + email + "\n\n" +
            "Message:\n" + message;

        const mailtoLink =
            "mailto:" + recipient +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(emailBody);

        window.location.href = mailtoLink;
    });
}


// ==========================================
// 4. SCROLL REVEAL ANIMATION
// ==========================================

const revealElements = document.querySelectorAll(
    ".section-heading, .about-content, .skill-card, .project-card, .contact-container"
);

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    element.classList.add("reveal");
});


// ==========================================
// 5. BACK TO TOP BUTTON
// ==========================================

const backToTopButton = document.getElementById("backToTop");

if (backToTopButton) {
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    });

    backToTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


// Open the correct section when the website first loads
const initialSection = window.location.hash.substring(1) || "home";
showSection(initialSection);

