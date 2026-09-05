/* =========================================================
   BRANDSPIRE MEDIA
   MAIN JAVASCRIPT
========================================================= */


/* ================= YEAR ================= */

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}


/* ================= MOBILE MENU ================= */

const menuButton = document.getElementById("menuButton");
const mobileNav = document.getElementById("mobileNav");

if (menuButton && mobileNav) {

  menuButton.addEventListener("click", () => {

    const isOpen = mobileNav.classList.toggle("active");

    menuButton.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

  });


  mobileNav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      mobileNav.classList.remove("active");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });

}


/* ================= SMOOTH NAVIGATION ================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", function(event) {

    const targetId = this.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    const headerHeight = 75;

    const position =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerHeight;

    window.scrollTo({
      top: position,
      behavior: "smooth"
    });

  });

});


/* ================= SCROLL REVEAL ================= */

const revealElements =
  document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

  const revealObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            revealObserver.unobserve(
              entry.target
            );

          }

        });

      },

      {
        threshold: 0.12
      }

    );


  revealElements.forEach(element => {

    revealObserver.observe(element);

  });

} else {

  revealElements.forEach(element => {

    element.classList.add("visible");

  });

}


/* ================= SERVICE DATA ================= */

const serviceData = {

  social: {

    number: "01",

    title: "Social Media Management",

    description:
      "We manage your social presence with strategy, consistency and creative content designed to build a stronger audience and recognizable brand.",

    list: [
      "Content strategy and monthly planning",
      "Social media management",
      "Community management & DM handling",
      "Content calendars",
      "Hashtag and trend research",
      "Performance reporting"
    ]

  },


  content: {

    number: "02",

    title: "Content Creation",

    description:
      "We create scroll-stopping content that communicates your brand clearly and gives your audience a reason to stop, watch and remember.",

    list: [
      "Social media creatives",
      "Reels and short-form content",
      "Copywriting and captions",
      "Story and carousel creation",
      "Campaign creative direction",
      "Brand-consistent visual content"
    ]

  },


  branding: {

    number: "03",

    title: "Branding & Design",

    description:
      "We create distinctive visual identities that help your business look professional, recognizable and consistent across every touchpoint.",

    list: [
      "Logo design",
      "Brand identity systems",
      "Colour and typography direction",
      "Business card and stationery design",
      "Social media brand kit",
      "Visual templates"
    ]

  },


  visual: {

    number: "04",

    title: "Photography & Videography",

    description:
      "Professional visual production that captures your brand, products, people and experiences in a way that feels authentic and premium.",

    list: [
      "Product photography",
      "Brand photography",
      "Reels and video production",
      "Event coverage",
      "Brand films",
      "Creative visual direction"
    ]

  },


  influencer: {

    number: "05",

    title: "Influencer Marketing",

    description:
      "We connect brands with relevant creators and help structure partnerships that reach the right audience in an authentic way.",

    list: [
      "Creator research",
      "Influencer selection",
      "Campaign planning",
      "Creator outreach",
      "Campaign coordination",
      "Performance tracking"
    ]

  },


  website: {

    number: "06",

    title: "Website Creation",

    description:
      "We create modern, responsive websites designed around your brand, your audience and your business goals.",

    list: [
      "Website strategy",
      "UI/UX design",
      "Responsive development",
      "Mobile-first layouts",
      "Performance optimization",
      "SEO-ready structure"
    ]

  }

};


/* ================= SERVICE MODAL ================= */

const serviceModal =
  document.getElementById("serviceModal");

const modalOverlay =
  document.getElementById("modalOverlay");

const modalClose =
  document.getElementById("modalClose");

const modalNumber =
  document.getElementById("modalNumber");

const modalTitle =
  document.getElementById("modalTitle");

const modalDescription =
  document.getElementById("modalDescription");

const modalList =
  document.getElementById("modalList");


function openService(serviceKey) {

  const service =
    serviceData[serviceKey];

  if (!service) {
    return;
  }

  modalNumber.textContent =
    service.number;

  modalTitle.textContent =
    service.title;

  modalDescription.textContent =
    service.description;

  modalList.innerHTML = "";

  service.list.forEach(item => {

    const li =
      document.createElement("li");

    li.textContent = item;

    modalList.appendChild(li);

  });

  serviceModal.classList.add("active");

  document.body.classList.add("modal-open");

}


function closeService() {

  serviceModal.classList.remove("active");

  document.body.classList.remove("modal-open");

}


document.querySelectorAll(".learn-more")
  .forEach(button => {

    button.addEventListener("click", () => {

      const service =
        button.dataset.service;

      openService(service);

    });

  });


if (modalClose) {

  modalClose.addEventListener(
    "click",
    closeService
  );

}


if (modalOverlay) {

  modalOverlay.addEventListener(
    "click",
    closeService
  );

}


document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      serviceModal.classList.contains("active")
    ) {

      closeService();

    }

  }
);


/* ================= BACK TO TOP ================= */

const backTop =
  document.getElementById("backTop");


window.addEventListener(
  "scroll",
  () => {

    if (window.scrollY > 700) {

      backTop.classList.add("show");

    } else {

      backTop.classList.remove("show");

    }

  },
  { passive: true }
);


if (backTop) {

  backTop.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );

}


/* ================= HEADER EFFECT ================= */

const header =
  document.getElementById("header");


window.addEventListener(
  "scroll",
  () => {

    if (window.scrollY > 30) {

      header.style.background =
        "rgba(8,8,13,.94)";

    } else {

      header.style.background =
        "rgba(8,8,13,.76)";

    }

  },
  { passive: true }
);


/* ================= CARD TILT ================= */

const cards =
  document.querySelectorAll(
    ".service-card, .why-card"
  );


if (
  window.matchMedia(
    "(pointer:fine)"
  ).matches
) {

  cards.forEach(card => {

    card.addEventListener(
      "mousemove",
      event => {

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const rotateX =
          ((y / rect.height) - .5) * -3;

        const rotateY =
          ((x / rect.width) - .5) * 3;

        card.style.transform =
          `perspective(800px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-5px)`;

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform = "";

      }
    );

  });

}
