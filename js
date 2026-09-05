/* =========================================================
   BRANDSPIRE MEDIA
   Main JavaScript
========================================================= */


/* =========================
   ELEMENTS
========================= */

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#mainNav");


/* =========================
   MOBILE MENU
========================= */

if (menuToggle && nav) {

  menuToggle.addEventListener("click", () => {

    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );

  });

}


/* =========================
   CLOSE MOBILE MENU
   WHEN LINK IS CLICKED
========================= */

document.querySelectorAll('.nav a[href^="#"]').forEach(link => {

  link.addEventListener("click", () => {

    if (!nav || !menuToggle) return;

    nav.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Open menu"
    );

  });

});


/* =========================
   SMOOTH SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", event => {

    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    const headerHeight =
      header ? header.offsetHeight : 0;

    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerHeight -
      8;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });

  });

});


/* =========================
   HEADER ON SCROLL
========================= */

function updateHeader() {

  if (!header) return;

  if (window.scrollY > 20) {

    header.classList.add("scrolled");

  } else {

    header.classList.remove("scrolled");

  }

}

window.addEventListener(
  "scroll",
  updateHeader,
  { passive: true }
);

updateHeader();


/* =========================
   SCROLL REVEAL ANIMATION
========================= */

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

  /* Fallback for older browsers */

  revealElements.forEach(element => {

    element.classList.add("visible");

  });

}


/* =========================
   BACK TO TOP
========================= */

const backTop =
  document.querySelector("#backTop");

function updateBackTop() {

  if (!backTop) return;

  if (window.scrollY > 500) {

    backTop.classList.add("show");

  } else {

    backTop.classList.remove("show");

  }

}

window.addEventListener(
  "scroll",
  updateBackTop,
  { passive: true }
);

backTop?.addEventListener(
  "click",
  () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);

updateBackTop();


/* =========================
   CURRENT YEAR
========================= */

const yearElement =
  document.querySelector("#year");

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}


/* =========================================================
   REVIEW SYSTEM
========================================================= */

const reviewModal =
  document.querySelector("#reviewModal");

const reviewButton =
  document.querySelector("#reviewBtn");

const closeModalButton =
  document.querySelector("#closeModal");

const reviewForm =
  document.querySelector("#reviewForm");

const reviewGrid =
  document.querySelector("#reviewGrid");

const ratingValue =
  document.querySelector("#ratingValue");

const ratingButtons =
  [...document.querySelectorAll(
    "#ratingInput button"
  )];


/* =========================
   REVIEW STORAGE
========================= */

const REVIEW_STORAGE_KEY =
  "brandspire_reviews_v1";

let savedReviews = [];

try {

  savedReviews =
    JSON.parse(
      localStorage.getItem(
        REVIEW_STORAGE_KEY
      ) || "[]"
    );

  if (!Array.isArray(savedReviews)) {
    savedReviews = [];
  }

} catch (error) {

  savedReviews = [];

}


/* =========================
   ESCAPE HTML
========================= */

function escapeHTML(value) {

  return String(value).replace(
    /[&<>"']/g,
    character => {

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


/* =========================
   SET RATING
========================= */

function setRating(rating) {

  if (!ratingValue) return;

  rating = Number(rating);

  if (rating < 1) rating = 1;
  if (rating > 5) rating = 5;

  ratingValue.value = rating;

  ratingButtons.forEach(button => {

    const buttonRating =
      Number(button.dataset.rating);

    button.classList.toggle(
      "active",
      buttonRating <= rating
    );

  });

}


/* Default rating */

setRating(5);


/* =========================
   RATING BUTTONS
========================= */

ratingButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      setRating(
        Number(button.dataset.rating)
      );

    }
  );

});


/* =========================
   OPEN REVIEW MODAL
========================= */

function openReviewModal() {

  if (!reviewModal) return;

  reviewModal.classList.add("open");

  reviewModal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow = "hidden";

  setTimeout(() => {

    document
      .querySelector("#reviewName")
      ?.focus();

  }, 100);

}

reviewButton?.addEventListener(
  "click",
  openReviewModal
);


/* =========================
   CLOSE REVIEW MODAL
========================= */

function closeReviewModal() {

  if (!reviewModal) return;

  reviewModal.classList.remove("open");

  reviewModal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow = "";

}

closeModalButton?.addEventListener(
  "click",
  closeReviewModal
);


/* Close by clicking outside */

reviewModal?.addEventListener(
  "click",
  event => {

    if (event.target === reviewModal) {

      closeReviewModal();

    }

  }
);


/* Close with Escape */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      reviewModal?.classList.contains("open")
    ) {

      closeReviewModal();

    }

  }
);


/* =========================
   CREATE REVIEW CARD
========================= */

function createReviewCard(review) {

  const article =
    document.createElement("article");

  article.className =
    "review-card reveal visible";

  const rating =
    Math.max(
      1,
      Math.min(5, Number(review.rating))
    );

  const stars =
    "★".repeat(rating) +
    "☆".repeat(5 - rating);

  article.innerHTML = `

    <div class="stars">
      ${stars}
    </div>

    <p>
      “${escapeHTML(review.text)}”
    </p>

    <strong>
      — ${escapeHTML(review.name)}
    </strong>

  `;

  return article;

}


/* =========================
   DISPLAY REVIEW
========================= */

function displayReview(
  review,
  addToTop = true
) {

  if (!reviewGrid) return;

  const card =
    createReviewCard(review);

  if (addToTop) {

    reviewGrid.prepend(card);

  } else {

    reviewGrid.appendChild(card);

  }

}


/* =========================
   LOAD SAVED REVIEWS
========================= */

savedReviews.forEach(review => {

  displayReview(
    review,
    false
  );

});


/* =========================
   SUBMIT REVIEW
========================= */

reviewForm?.addEventListener(
  "submit",
  event => {

    event.preventDefault();

    const nameInput =
      document.querySelector("#reviewName");

    const textInput =
      document.querySelector("#reviewText");


    const name =
      nameInput?.value.trim() || "";

    const text =
      textInput?.value.trim() || "";

    const rating =
      Number(
        ratingValue?.value || 5
      );


    /* Validation */

    if (!name) {

      nameInput?.focus();

      return;

    }

    if (!text) {

      textInput?.focus();

      return;

    }


    const newReview = {

      name: name,

      rating:
        Math.max(
          1,
          Math.min(5, rating)
        ),

      text: text

    };


    /* Save review */

    savedReviews.unshift(
      newReview
    );


    try {

      localStorage.setItem(
        REVIEW_STORAGE_KEY,
        JSON.stringify(savedReviews)
      );

    } catch (error) {

      console.warn(
        "Review could not be saved locally.",
        error
      );

    }


    /* Immediately display */

    displayReview(
      newReview,
      true
    );


    /* Reset form */

    reviewForm.reset();

    setRating(5);


    /* Close modal */

    closeReviewModal();


    /* Scroll to testimonials */

    const testimonials =
      document.querySelector(
        "#testimonials"
      );

    if (testimonials) {

      setTimeout(() => {

        const headerHeight =
          header
            ? header.offsetHeight
            : 0;

        const position =
          testimonials.getBoundingClientRect()
            .top +
          window.scrollY -
          headerHeight -
          8;

        window.scrollTo({
          top: position,
          behavior: "smooth"
        });

      }, 100);

    }

  }
);


/* =========================================================
   MOBILE SAFETY
========================================================= */

/*
   Close mobile menu when clicking outside.
*/

document.addEventListener(
  "click",
  event => {

    if (!nav || !menuToggle) return;

    const clickedInsideMenu =
      nav.contains(event.target);

    const clickedToggle =
      menuToggle.contains(event.target);

    if (
      !clickedInsideMenu &&
      !clickedToggle &&
      nav.classList.contains("open")
    ) {

      nav.classList.remove("open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Open menu"
      );

    }

  }
);


/* =========================================================
   PREVENT ACCIDENTAL HORIZONTAL OVERFLOW
========================================================= */

window.addEventListener(
  "load",
  () => {

    document.documentElement.style
      .overflowX = "hidden";

    document.body.style
      .overflowX = "hidden";

  }
);
