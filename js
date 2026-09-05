document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  const menu = $("#menu");
  const nav = $("#nav");
  const header = $("#header");
  const backTop = $("#top");
  const year = $("#year");

  // Current year
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // =========================
  // MOBILE MENU
  // =========================

  menu?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menu.setAttribute("aria-expanded", String(isOpen));
    menu.textContent = isOpen ? "✕" : "☰";
  });

  // Close mobile menu after clicking a navigation link
  nav?.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");

      if (menu) {
        menu.setAttribute("aria-expanded", "false");
        menu.textContent = "☰";
      }
    });
  });

  // =========================
  // SMOOTH SCROLL
  // =========================

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: "smooth"
      });

      history.replaceState(null, "", targetId);
    });
  });

  // =========================
  // HEADER ON SCROLL
  // =========================

  const handleScroll = () => {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 15);
    }

    if (backTop) {
      backTop.classList.toggle("show", window.scrollY > 600);
    }
  };

  window.addEventListener("scroll", handleScroll, {
    passive: true
  });

  handleScroll();

  // =========================
  // BACK TO TOP
  // =========================

  backTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // =========================
  // SCROLL ANIMATIONS
  // =========================

  const revealElements = $$(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observerInstance.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // =========================
  // REVIEW SYSTEM
  // =========================

  const reviewModal = $("#reviewModal");
  const openReviewButton = $("#openReview");
  const reviewForm = $("#reviewForm");
  const reviewList = $("#reviewList");

  const storageKey = "brandspire_reviews_v1";

  // Get saved reviews
  function getReviews() {
    try {
      return JSON.parse(
        localStorage.getItem(storageKey) || "[]"
      );
    } catch (error) {
      return [];
    }
  }

  // Protect review text before displaying it
  function escapeHTML(value) {
    return String(value).replace(
      /[&<>"']/g,
      (character) => {
        const characters = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;"
        };

        return characters[character];
      }
    );
  }

  // Display submitted reviews
  function renderReviews() {
    if (!reviewList) return;

    // Remove previously generated reviews
    reviewList
      .querySelectorAll(".user-review")
      .forEach((review) => review.remove());

    const reviews = getReviews();

    reviews
      .slice()
      .reverse()
      .forEach((review) => {
        const reviewElement = document.createElement("article");

        reviewElement.className = "review user-review";

        const stars =
          "★★★★★".slice(0, review.rating) +
          "☆☆☆☆☆".slice(0, 5 - review.rating);

        reviewElement.innerHTML = `
          <div class="stars">${stars}</div>

          <p>
            “${escapeHTML(review.text)}”
          </p>

          <strong>
            ${escapeHTML(review.name)}
          </strong>

          <small>
            Website review
          </small>
        `;

        reviewList.prepend(reviewElement);
      });
  }

  // Open review popup
  openReviewButton?.addEventListener("click", () => {
    if (!reviewModal) return;

    reviewModal.classList.add("open");
    reviewModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    setTimeout(() => {
      $("#reviewName")?.focus();
    }, 100);
  });

  // Close review popup
  function closeReviewModal() {
    if (!reviewModal) return;

    reviewModal.classList.remove("open");
    reviewModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
  }

  reviewModal
    ?.querySelectorAll("[data-close]")
    .forEach((button) => {
      button.addEventListener(
        "click",
        closeReviewModal
      );
    });

  // Close with Escape key
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      reviewModal?.classList.contains("open")
    ) {
      closeReviewModal();
    }
  });

  // Submit review
  reviewForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(reviewForm);

    const name = String(
      formData.get("name") || ""
    ).trim();

    const rating = Number(
      formData.get("rating")
    );

    const text = String(
      formData.get("review") || ""
    ).trim();

    // Validation
    if (
      !name ||
      !text ||
      rating < 1 ||
      rating > 5
    ) {
      return;
    }

    const newReview = {
      name: name,
      rating: rating,
      text: text
    };

    const reviews = getReviews();

    reviews.push(newReview);

    localStorage.setItem(
      storageKey,
      JSON.stringify(reviews)
    );

    // Reset form
    reviewForm.reset();

    // Immediately show review
    renderReviews();

    // Close popup
    closeReviewModal();

    // Scroll to the new review
    setTimeout(() => {
      const latestReview =
        reviewList?.querySelector(".user-review");

      latestReview?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 150);
  });

  // Render existing reviews on page load
  renderReviews();
});
