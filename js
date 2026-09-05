/* =========================================================
   BRANDSPIRE MEDIA
   MAIN JAVASCRIPT
========================================================= */


/* =========================
   ELEMENTS
========================= */

const header =
  document.querySelector("#header");

const menuButton =
  document.querySelector("#menuButton");

const navigation =
  document.querySelector("#navigation");


/* =========================
   MOBILE MENU
========================= */

if (menuButton && navigation) {

  menuButton.addEventListener(
    "click",
    () => {

      const isOpen =
        navigation.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      menuButton.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation"
          : "Open navigation"
      );

    }
  );

}


/* =========================
   CLOSE MENU AFTER CLICK
========================= */

document
  .querySelectorAll(
    ".navigation a[href^='#']"
  )
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        navigation?.classList.remove("open");

        menuButton?.setAttribute(
          "aria-expanded",
          "false"
        );

        menuButton?.setAttribute(
          "aria-label",
          "Open navigation"
        );

      }
    );

  });


/* =========================
   SMOOTH SCROLL
========================= */

document
  .querySelectorAll(
    "a[href^='#']"
  )
  .forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const id =
          link.getAttribute("href");

        if (!id || id === "#") {
          return;
        }

        const target =
          document.querySelector(id);

        if (!target) {
          return;
        }

        event.preventDefault();

        const headerHeight =
          header
            ? header.offsetHeight
            : 0;

        const position =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight -
          5;

        window.scrollTo({
          top: position,
          behavior: "smooth"
        });

      }
    );

  });


/* =========================
   HEADER SCROLL EFFECT
========================= */

function updateHeader() {

  if (!header) {
    return;
  }

  if (window.scrollY > 15) {

    header.classList.add("scrolled");

  } else {

    header.classList.remove("scrolled");

  }

}

window.addEventListener(
  "scroll",
  updateHeader,
  {
    passive: true
  }
);

updateHeader();


/* =========================
   REVEAL ANIMATIONS
========================= */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


if (
  "IntersectionObserver" in window
) {

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(
    element => {

      observer.observe(element);

    }
  );

} else {

  revealElements.forEach(
    element => {

      element.classList.add(
        "visible"
      );

    }
  );

}


/* =========================
   BACK TO TOP
========================= */

const backTop =
  document.querySelector("#backTop");


function updateBackTop() {

  if (!backTop) {
    return;
  }

  if (window.scrollY > 400) {

    backTop.classList.add("show");

  } else {

    backTop.classList.remove("show");

  }

}


window.addEventListener(
  "scroll",
  updateBackTop,
  {
    passive: true
  }
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
   YEAR
========================= */

const year =
  document.querySelector("#year");

if (year) {

  year.textContent =
    new Date().getFullYear();

}


/* =========================================================
   REVIEW SYSTEM
========================================================= */

const reviewModal =
  document.querySelector("#reviewModal");

const reviewButton =
  document.querySelector("#reviewButton");

const closeModal =
  document.querySelector("#closeModal");

const reviewForm =
  document.querySelector("#reviewForm");

const reviewGrid =
  document.querySelector("#reviewGrid");

const ratingValue =
  document.querySelector("#ratingValue");

const ratingButtons =
  Array.from(
    document.querySelectorAll(
      "#rating button"
    )
  );


/* =========================
   REVIEW STORAGE
========================= */

const REVIEW_KEY =
  "brandspire_reviews_v2";

let reviews = [];


try {

  reviews =
    JSON.parse(
      localStorage.getItem(
        REVIEW_KEY
      ) || "[]"
    );

  if (!Array.isArray(reviews)) {

    reviews = [];

  }

} catch {

  reviews = [];

}


/* =========================
   ESCAPE TEXT
========================= */

function escapeHTML(value) {

  return String(value).replace(
    /[&<>"']/g,
    character => {

      const map = {

        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"

      };

      return map[character];

    }
  );

}


/* =========================
   RATING
========================= */

function setRating(value) {

  value =
    Math.max(
      1,
      Math.min(
        5,
        Number(value)
      )
    );

  if (ratingValue) {

    ratingValue.value =
      value;

  }

  ratingButtons.forEach(
    button => {

      const number =
        Number(
          button.dataset.rating
        );

      button.classList.toggle(
        "active",
        number <= value
      );

    }
  );

}


/* Default */

setRating(5);


/* Rating click */

ratingButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        setRating(
          button.dataset.rating
        );

      }
    );

  }
);


/* =========================
   OPEN MODAL
========================= */

reviewButton?.addEventListener(
  "click",
  () => {

    reviewModal?.classList.add(
      "open"
    );

    reviewModal?.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow =
      "hidden";

  }
);


/* =========================
   CLOSE MODAL
========================= */

function closeReviewModal() {

  reviewModal?.classList.remove(
    "open"
  );

  reviewModal?.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow =
    "";

}


closeModal?.addEventListener(
  "click",
  closeReviewModal
);


/* Click outside */

reviewModal?.addEventListener(
  "click",
  event => {

    if (
      event.target ===
      reviewModal
    ) {

      closeReviewModal();

    }

  }
);


/* Escape */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      reviewModal?.classList.contains(
        "open"
      )
    ) {

      closeReviewModal();

    }

  }
);


/* =========================
   CREATE REVIEW CARD
========================= */

function createReviewCard(
  review
) {

  const article =
    document.createElement(
      "article"
    );

  article.className =
    "review-card";


  const rating =
    Math.max(
      1,
      Math.min(
        5,
        Number(review.rating)
      )
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
   SHOW REVIEW
========================= */

function showReview(
  review,
  first = true
) {

  if (!reviewGrid) {
    return;
  }

  const card =
    createReviewCard(
      review
    );


  if (first) {

    reviewGrid.prepend(card);

  } else {

    reviewGrid.appendChild(card);

  }

}


/* =========================
   LOAD SAVED REVIEWS
========================= */

reviews.forEach(
  review => {

    showReview(
      review,
      false
    );

  }
);


/* =========================
   SUBMIT REVIEW
========================= */

reviewForm?.addEventListener(
  "submit",
  event => {

    event.preventDefault();


    const nameInput =
      document.querySelector(
        "#reviewName"
      );

    const textInput =
      document.querySelector(
        "#reviewText"
      );


    const name =
      nameInput
        ?.value
        .trim() || "";


    const text =
      textInput
        ?.value
        .trim() || "";


    const rating =
      Number(
        ratingValue
          ?.value || 5
      );


    /* Validate */

    if (!name) {

      nameInput?.focus();

      return;

    }


    if (!text) {

      textInput?.focus();

      return;

    }


    /* New review */

    const newReview = {

      name,

      rating:
        Math.max(
          1,
          Math.min(
            5,
            rating
          )
        ),

      text

    };


    /* Save */

    reviews.unshift(
      newReview
    );


    try {

      localStorage.setItem(
        REVIEW_KEY,
        JSON.stringify(
          reviews
        )
      );

    } catch (error) {

      console.log(
        "Could not save review.",
        error
      );

    }


    /* Immediately display */

    showReview(
      newReview,
      true
    );


    /* Reset */

    reviewForm.reset();

    setRating(5);


    /* Close */

    closeReviewModal();


    /* Scroll to testimonials */

    const testimonials =
      document.querySelector(
        "#testimonials"
      );


    if (testimonials) {

      setTimeout(
        () => {

          const headerHeight =
            header
              ? header.offsetHeight
              : 0;

          const position =
            testimonials
              .getBoundingClientRect()
              .top +
            window.scrollY -
            headerHeight -
            5;


          window.scrollTo({

            top:
              position,

            behavior:
              "smooth"

          });

        },
        100
      );

    }

  }
);


/* =========================
   CLOSE MENU WHEN
   CLICKING OUTSIDE
========================= */

document.addEventListener(
  "click",
  event => {

    if (
      !navigation ||
      !menuButton
    ) {
      return;
    }


    const insideNavigation =
      navigation.contains(
        event.target
      );

    const insideButton =
      menuButton.contains(
        event.target
      );


    if (
      !insideNavigation &&
      !insideButton &&
      navigation.classList.contains(
        "open"
      )
    ) {

      navigation.classList.remove(
        "open"
      );

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

      menuButton.setAttribute(
        "aria-label",
        "Open navigation"
      );

    }

  }
);
