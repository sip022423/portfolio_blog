document.addEventListener("DOMContentLoaded", () => {
  // === Mobile Menu ===
  const menu = document.getElementById("menu");
  const closeButton = document.getElementById("close-mobile");
  const nav = document.getElementById("nav-mobile");
  const navLinks = document.querySelectorAll(".nav-link");

  menu.addEventListener("click", () => {
    nav.classList.add("show");
    menu.style.display = "none";
  });

  closeButton.addEventListener("click", () => {
    nav.classList.remove("show");
    menu.style.display = "block";
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("show");
      menu.style.display = "block";
    });
  });

  // === Contact Form Submission ===
  document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        alert('Your message has been sent successfully!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('There was an error sending your message.');
      });
  });

  // === Typing Text Effect ===
  const phrases = [
    "Web Developer",
    "Software Developer",
    "Photographer",
    "Videographer",
    "App Developer",
  ];
  const changingTextElement = document.getElementById("changing-text");
  const cursorElement = document.createElement("span");
  cursorElement.id = "cursor";
  changingTextElement.after(cursorElement);

  let currentPhraseIndex = 0;
  let letterIndex = 0;
  let isDeleting = false;

  function type() {
    const currentPhrase = phrases[currentPhraseIndex];
    if (isDeleting) {
      changingTextElement.textContent = currentPhrase.slice(0, letterIndex--);
    } else {
      changingTextElement.textContent = currentPhrase.slice(0, letterIndex++);
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && letterIndex === currentPhrase.length) {
      setTimeout(() => {
        isDeleting = true;
        type();
      }, 1000);
      return;
    }

    if (isDeleting && letterIndex === 0) {
      isDeleting = false;
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      setTimeout(type, 500);
      return;
    }

    setTimeout(type, speed);
  }

  type();

  // === Skills Progress Animation ===
  document.querySelectorAll(".skill-box").forEach((box) => {
    const percent = parseInt(box.getAttribute("data-percent"));
    const progress = box.querySelector(".progress");
    const text = box.querySelector(".percentage");
    const dashOffset = 100 - percent;

    setTimeout(() => {
      progress.style.strokeDashoffset = dashOffset;
      text.textContent = percent + "%";
    }, 300);

    const img = box.querySelector("img");
    const label = box.querySelector(".skill-name");
    if (img && label) {
      label.textContent = img.alt;
    }
  });

  // === Projects Modal Setup ===
  const projects = [
    {
      id: "project1",
      title: "Photography",
      description: "Capture stunning moments.",
      image: "image/camera.webp",
      subProjects: [
        {
          title: "BAGBAG",
          description: "Victoria, Sual, Pangasinan 2025",
          image: "photography/bagbag.jpg",
        },
        {
          title: "Tagalog River",
          description: "Mabini, Pangasinan 2025",
          image: "photography/wow.jpg",
        },
      ],
    },
    {
      id: "project2",
      title: "Development Projects",
      description: "Build modern and responsive system, websites, and apps.",
      image: "image/computer.png",
      subProjects: [
        {
          title: "BookMate",
          description: "A Capstone project for a book management system of Dasol Catholic School.",
          image: "development/lbms.png",
        },
        {
          title: "Matching Game",
          description: "A fun and interactive matching game built with Android Studio.",
          image: "development/matchgame.png",
        },
      ],
    },
    {
      id: "project3",
      title: "Videography",
      description: "Create cinematic videos.",
      image: "image/vid.png",
      subProjects: [
        {
          title: "",
          description: "Folder Empty",
          image: "",
        },
      ],
    },
  ];

  const projectsContainer = document.querySelector(".projects");

  projects.forEach((project) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("project-wrapper");

    const element = document.createElement("div");
    element.classList.add("clickable_picture");
    element.dataset.project = project.id;
    element.innerHTML = `
      <img src="${project.image}" alt="${project.title}" />
      <div class="hover-description">Click to view</div>
    `;

    const title = document.createElement("p");
    title.classList.add("project-title");
    title.textContent = project.title;

    wrapper.appendChild(element);
    wrapper.appendChild(title);
    projectsContainer.appendChild(wrapper);

    element.addEventListener("click", () => {
      openProjectModal(project);
    });
  });

  function openProjectModal(project) {
    const modal = document.getElementById("project-modal");
    const modalBody = document.getElementById("modal-body");

    const subProjectsHTML = project.subProjects.map((sub) => `
      <div class="sub-project">
        <img src="${sub.image}" alt="${sub.title}" />
        <h3>${sub.title}</h3>
        <p>${sub.description}</p>
      </div>
    `).join("");

    modalBody.innerHTML = `
      <h2>${project.title}</h2>
      <p>${project.description}</p>
      <div class="sub-projects">${subProjectsHTML}</div>
    `;

    modal.style.display = "block";
  }

  document.querySelector(".modal .close").addEventListener("click", () => {
    document.getElementById("project-modal").style.display = "none";
  });

  window.addEventListener("click", (e) => {
    const modal = document.getElementById("project-modal");
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // === Carousel Slide Highlight (preserved) ===
  const slides = document.querySelectorAll(".slide");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle("active", entry.isIntersecting);
    });
  }, { threshold: 0.5 });

  slides.forEach(slide => observer.observe(slide));

    // === Event Delegation for Flip ===
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider");
    const items = document.querySelectorAll(".item");
    let isPaused = false; // Track the rotation state
  
    // Add click event listener to each card
    items.forEach((item) => {
      item.addEventListener("click", () => {
        item.classList.toggle("flipped"); // Flip the card
  
        // Toggle rotation state
        if (isPaused) {
          slider.style.animationPlayState = "running"; // Resume rotation
          isPaused = false;
        } else {
          slider.style.animationPlayState = "paused"; // Pause rotation
          isPaused = true;
        }
      });
    });
  });
  document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider");
    const items = document.querySelectorAll(".item");
    let isPaused = false;
  
    items.forEach((item) => {
      item.addEventListener("click", () => {
        console.log("Card clicked!"); // Debugging
        item.classList.toggle("flipped");
  
        if (isPaused) {
          slider.style.animationPlayState = "running";
          isPaused = false;
          console.log("Carousel resumed");
        } else {
          slider.style.animationPlayState = "paused";
          isPaused = true;
          console.log("Carousel paused");
        }
      });
    });
  });