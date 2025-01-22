document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    gsap.from(mobileMenu, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  const mobileLinks = mobileMenu.getElementsByTagName("a");
  Array.from(mobileLinks).forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
});

gsap.from(".hero-content", {
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 0.5,
});

let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 100) {
    gsap.to(header, {
      y: "-100%",
      duration: 0.3,
    });
  } else {
    gsap.to(header, {
      y: "0%",
      duration: 0.3,
    });
  }

  lastScroll = currentScroll;
});

const sr = ScrollReveal({
  duration: 1000,
  distance: "30px",
  easing: "ease",
  mobile: true,
});

sr.reveal(".stats-item", {
  interval: 200,
});

sr.reveal(".service-card", {
  interval: 200,
  origin: "bottom",
});

sr.reveal(".project-card", {
  interval: 200,
  origin: "bottom",
});

sr.reveal(".about-content", {
  origin: "left",
});

sr.reveal(".about-image", {
  origin: "right",
});

const contactForm = document.querySelector("#contato form");

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);
};

const validatePhone = (phone) => {
  return phone.match(/^\(\d{2}\)\s\d{4,5}-\d{4}$/);
};

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;
  const formData = {
    name: contactForm.querySelector('input[type="text"]').value.trim(),
    email: contactForm.querySelector('input[type="email"]').value.trim(),
    phone: contactForm.querySelector('input[type="tel"]').value.trim(),
    message: contactForm.querySelector("textarea").value.trim(),
  };

  // Clear previous error states
  contactForm.querySelectorAll(".error-message").forEach((el) => el.remove());
  contactForm.querySelectorAll(".error-input").forEach((el) => {
    el.classList.remove("error-input", "border-red-500", "focus:ring-red-500");
  });

  if (formData.name.length < 3) {
    isValid = false;
    showError('input[type="text"]', "Nome deve ter pelo menos 3 caracteres");
  }

  if (!validateEmail(formData.email)) {
    isValid = false;
    showError('input[type="email"]', "Email inválido");
  }

  if (!validatePhone(formData.phone)) {
    isValid = false;
    showError(
      'input[type="tel"]',
      "Telefone inválido. Use o formato (00) 00000-0000"
    );
  }

  if (formData.message.length < 10) {
    isValid = false;
    showError("textarea", "Mensagem deve ter pelo menos 10 caracteres");
  }

  if (isValid) {
    gsap.to(contactForm, {
      scale: 1.02,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
    });

    console.log("Form submitted:", formData);

    const successMessage = document.createElement("div");
    successMessage.className =
      "p-4 mb-4 text-green-700 bg-green-100 rounded-lg";
    successMessage.textContent = "Mensagem enviada com sucesso!";
    contactForm.insertBefore(successMessage, contactForm.firstChild);

    contactForm.reset();

    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  }
});

function showError(selector, message) {
  const input = contactForm.querySelector(selector);
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message text-red-500 text-sm mt-1";
  errorDiv.textContent = message;

  input.classList.add("error-input", "border-red-500", "focus:ring-red-500");
  input.parentNode.appendChild(errorDiv);
}

const phoneInput = contactForm.querySelector('input[type="tel"]');
phoneInput.addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length <= 11) {
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    e.target.value = value;
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: target,
          offsetY: 80,
        },
        ease: "power2.inOut",
      });
    }
  });
          function copyEmail() {
            const email = "Jrgsoldagens@gmail.com";
            navigator.clipboard.writeText(email).then(() => {
              const toast = document.getElementById("toast");
              toast.style.display = "block";
              setTimeout(() => {
                toast.style.display = "none";
              }, 3000);
            });
          }
});
