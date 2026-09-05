/* =========================================================
   BRANDSPIRE MEDIA
   WEBSITE INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNavigation = document.querySelector(".mobile-navigation");

  if (menuToggle && mobileNavigation) {

    menuToggle.addEventListener("click", () => {

      mobileNavigation.classList.toggle("active");

      const isOpen =
        mobileNavigation.classList.contains("active");

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );

    });

    /* Close mobile menu after clicking a link */

    mobileNavigation
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener("click", () => {

          mobileNavigation.classList.remove("active");

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

        });

      });

  }


  /* =======================================================
     SMOOTH SCROLL
  ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener("click", function (event) {

        const targetId =
          this.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) {
          return;
        }

        event.preventDefault();

        const header =
          document.querySelector(".site-header");

        const headerHeight =
          header
            ? header.offsetHeight
            : 0;

        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });

      });

    });


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add("visible");

              observer.unobserve(entry.target);

            }

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
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


  /* =======================================================
     SERVICE MODALS
  ======================================================= */

  const serviceButtons =
    document.querySelectorAll(".service-link");

  const serviceModal =
    document.querySelector(".service-modal");

  const modalTitle =
    serviceModal?.querySelector(".modal h2");

  const modalNumber =
    serviceModal?.querySelector(".modal-number");

  const modalDescription =
    serviceModal?.querySelector(".modal > p");

  const modalList =
    serviceModal?.querySelector(".modal ul");

  const modalClose =
    document.querySelector(".modal-close");

  const modalBackground =
    document.querySelector(".modal-background");


  const serviceData = {

    "Social Media Management": {
      number: "01 / SOCIAL MEDIA",
      description:
        "We manage your social presence with a clear strategy designed to keep your brand consistent, active, relevant, and connected with the right audience.",
      points: [
        "Content planning and monthly calendars",
        "Community management and DM handling",
        "Platform-specific content strategy",
        "Hashtag and trend research",
        "Monthly performance reporting"
      ]
    },

    "Content Creation": {
      number: "02 / CONTENT",
      description:
        "We create scroll-stopping content that communicates your message clearly while keeping every piece aligned with your brand identity.",
      points: [
        "Creative concepts and content ideas",
        "Social media posts and campaigns",
        "Copywriting and captions",
        "Stories and carousel content",
        "Brand-consistent visual direction"
      ]
    },

    "Branding & Design": {
      number: "03 / BRANDING",
      description:
        "We build visual identities that make your business recognizable, memorable, and professionally positioned.",
      points: [
        "Logo and brand identity",
        "Color and typography systems",
        "Social media templates",
        "Business card and stationery design",
        "Brand guidelines"
      ]
    },

    "Photography & Videography": {
      number: "04 / PRODUCTION",
      description:
        "Professional photography and video production that gives your brand a stronger visual presence across digital platforms.",
      points: [
        "Product photography",
        "Brand photography",
        "Short-form video production",
        "Reels and promotional videos",
        "Event and campaign coverage"
      ]
    },

    "Influencer Marketing": {
      number: "05 / INFLUENCER MARKETING",
      description:
        "We connect brands with relevant creators and help build partnerships that put your message in front of the right audience.",
      points: [
        "Influencer research",
        "Creator selection",
        "Campaign planning",
        "Outreach and coordination",
        "Campaign performance tracking"
      ]
    },

    "Website Creation": {
      number: "06 / WEBSITE",
      description:
        "We create modern, responsive websites designed to represent your brand professionally and turn visitors into potential customers.",
      points: [
        "Modern responsive design",
        "Mobile-first experience",
        "Business website development",
        "SEO-ready structure",
        "Website maintenance and handling"
      ]
    }

  };


  function openServiceModal(serviceName) {

    if (!serviceModal) {
      return;
    }

    const data =
      serviceData[serviceName];

    if (!data) {
      return;
    }

    if (modalNumber) {
      modalNumber.textContent =
        data.number;
    }

    if (modalTitle) {
      modalTitle.textContent =
        serviceName;
    }

    if (modalDescription) {
      modalDescription.textContent =
        data.description;
    }

    if (modalList) {

      modalList.innerHTML =
        data.points
          .map(point => `<li>${point}</li>`)
          .join("");

    }

    serviceModal.classList.add("active");

    document.body.classList.add("modal-open");

  }


  function closeServiceModal() {

    if (!serviceModal) {
      return;
    }

    serviceModal.classList.remove("active");

    document.body.classList.remove("modal-open");

  }


  serviceButtons.forEach(button => {

    button.addEventListener("click", () => {

      const card =
        button.closest(".service-card");

      const title =
        card?.querySelector("h3");

      if (!title) {
        return;
      }

      openServiceModal(
        title.textContent.trim()
      );

    });

  });


  if (modalClose) {

    modalClose.addEventListener(
      "click",
      closeServiceModal
    );

  }


  if (modalBackground) {

    modalBackground.addEventListener(
      "click",
      closeServiceModal
    );

  }


  /* ESC closes modal */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {
        closeServiceModal();
      }

    }
  );


  /* =======================================================
     BACK TO TOP
  ======================================================= */

  const backToTop =
    document.querySelector(".back-to-top");

  if (backToTop) {

    window.addEventListener(
      "scroll",
      () => {

        if (window.scrollY > 600) {

          backToTop.classList.add("show");

        } else {

          backToTop.classList.remove("show");

        }

      },
      { passive: true }
    );


    backToTop.addEventListener(
      "click",
      () => {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );

  }


  /* =======================================================
     HEADER SCROLL EFFECT
  ======================================================= */

  const header =
    document.querySelector(".site-header");

  if (header) {

    window.addEventListener(
      "scroll",
      () => {

        if (window.scrollY > 40) {

          header.style.background =
            "rgba(7,7,7,0.96)";

        } else {

          header.style.background =
            "rgba(7,7,7,0.86)";

        }

      },
      { passive: true }
    );

  }


  /* =======================================================
     SERVICE CARD HOVER DEPTH
  ======================================================= */

  document
    .querySelectorAll(".service-card")
    .forEach(card => {

      card.addEventListener(
        "mousemove",
        event => {

          if (window.innerWidth < 768) {
            return;
          }

          const rect =
            card.getBoundingClientRect();

          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;

          const rotateX =
            ((y / rect.height) - 0.5) * -2;

          const rotateY =
            ((x / rect.width) - 0.5) * 2;

          card.style.transform =
            `translateY(-7px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform =
            "";

        }
      );

    });


  /* =======================================================
     HERO PARALLAX
  ======================================================= */

  const hero =
    document.querySelector(".hero");

  const heroCircles =
    document.querySelectorAll(".hero-circle");

  if (
    hero &&
    heroCircles.length
  ) {

    window.addEventListener(
      "mousemove",
      event => {

        if (window.innerWidth < 900) {
          return;
        }

        const x =
          (event.clientX /
            window.innerWidth -
            0.5);

        const y =
          (event.clientY /
            window.innerHeight -
            0.5);

        heroCircles.forEach(
          (circle, index) => {

            const strength =
              (index + 1) * 7;

            circle.style.transform =
              `translate(${x * strength}px, ${y * strength}px)`;

          }
        );

      }
    );

  }


  /* =======================================================
     CURRENT YEAR
  ======================================================= */

  const year =
    document.querySelector("#year");

  if (year) {

    year.textContent =
      new Date().getFullYear();

  }


  /* =======================================================
     PREVENT BROKEN IMAGE ICONS
  ======================================================= */

  document
    .querySelectorAll("img")
    .forEach(image => {

      image.addEventListener(
        "error",
        () => {

          image.style.visibility =
            "hidden";

        }
      );

    });


  /* =======================================================
     ACCESSIBILITY
  ======================================================= */

  if (menuToggle) {

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Open menu"
    );

  }


  /* =======================================================
     MAKE REVEAL CONTENT VISIBLE IF JS LOADS LATE
  ======================================================= */

  setTimeout(() => {

    document
      .querySelectorAll(".reveal")
      .forEach(element => {

        if (
          !element.classList.contains(
            "visible"
          )
        ) {

          const rect =
            element.getBoundingClientRect();

          if (
            rect.top <
            window.innerHeight
          ) {

            element.classList.add(
              "visible"
            );

          }

        }

      });

  }, 500);


});
