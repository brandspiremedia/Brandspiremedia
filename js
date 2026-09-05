const header =
  document.querySelector("#siteHeader");

const menu =
  document.querySelector("#menuToggle");

const nav =
  document.querySelector("#mainNav");


/* =========================
   MOBILE MENU
========================= */

menu?.addEventListener(
  "click",
  () => {

    const open =
      nav.classList.toggle("open");

    menu.setAttribute(
      "aria-expanded",
      open ? "true" : "false"
    );

    menu.setAttribute(
      "aria-label",
      open
        ? "Close menu"
        : "Open menu"
    );

  }
);


/* =========================
   CLOSE MOBILE MENU
========================= */

document
  .querySelectorAll(
    ".nav a[href^='#']"
  )
  .forEach(
    link => {

      link.addEventListener(
        "click",
        () => {

          nav?.classList.remove(
            "open"
          );

          menu?.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    }
  );


/* =========================
   SMOOTH SCROLL
========================= */

document
  .querySelectorAll(
    "a[href^='#']"
  )
  .forEach(
    link => {

      link.addEventListener(
        "click",
        event => {

          const id =
            link.getAttribute("href");

          if (
            !id ||
            id === "#"
          ) {
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

          const y =
            target
              .getBoundingClientRect()
              .top +
            window.scrollY -
            headerHeight -
            8;

          window.scrollTo({

            top: y,

            behavior: "smooth"

          });

        }
      );

    }
  );


/* =========================
   HEADER
========================= */

function headerState() {

  if (!header) {
    return;
  }

  header.classList.toggle(
    "scrolled",
    window.scrollY > 20
  );

}

window.addEventListener(
  "scroll",
  headerState,
  {
    passive: true
  }
);

headerState();


/* =========================
   SCROLL ANIMATION
========================= */

const reveals =
  document.querySelectorAll(
    ".reveal"
  );


if (
  "IntersectionObserver"
  in window
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


  reveals.forEach(
    element => {

      observer.observe(element);

    }
  );

} else {

  reveals.forEach(
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
  document.querySelector(
    "#backTop"
  );


function backTopState() {

  backTop?.classList.toggle(
    "show",
    window.scrollY > 500
  );

}

window.addEventListener(
  "scroll",
  backTopState,
  {
    passive: true
  }
);

backTopState();


backTop?.addEventListener(
  "click",
  () => {

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  }
);


/* =========================
   YEAR
========================= */

const year =
  document.querySelector(
    "#year"
  );

if (year) {

  year.textContent =
    new Date().getFullYear();

}


/* =================================================
   REVIEW SYSTEM
================================================= */

const modal =
  document.querySelector(
    "#reviewModal"
  );

const openReview =
  document.querySelector(
    "#reviewButton"
  );

const closeReview =
  document.querySelector(
    "#closeModal"
  );

const form =
  document.querySelector(
    "#reviewForm"
  );

const grid =
  document.querySelector(
    "#reviewGrid"
  );

const ratingValue =
  document.querySelector(
    "#ratingValue"
  );

const ratingButtons =
  [
    ...document.querySelectorAll(
      "#rating button"
    )
  ];

const REVIEW_KEY =
  "brandspire_reviews_v3";

let reviews = [];


/* Load saved reviews */

try {

  reviews =
    JSON.parse(
      localStorage.getItem(
        REVIEW_KEY
      ) || "[]"
    );

  if (
    !Array.isArray(reviews)
  ) {

    reviews = [];

  }

} catch {

  reviews = [];

}


/* =========================
   SECURITY
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
        Number(value) || 5
      )
    );

  if (ratingValue) {

    ratingValue.value =
      value;

  }

  ratingButtons.forEach(
    button => {

      button.classList.toggle(
        "active",
        Number(
          button.dataset.rating
        ) <= value
      );

    }
  );

}


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


setRating(5);


/* =========================
   REVIEW CARD
========================= */

function createReviewCard(
  review
) {

  const card =
    document.createElement(
      "article"
    );

  card.className =
    "review-card reveal visible";


  const rating =
    Math.max(
      1,
      Math.min(
        5,
        Number(review.rating) || 5
      )
    );


  const stars =
    "★".repeat(rating) +
    "☆".repeat(5 - rating);


  card.innerHTML = `

    <div class="stars">
      ${stars}
    </div>

    <p>
      “${escapeHTML(review.text)}”
    </p>

    <strong>
      ${escapeHTML(review.name)}
    </strong>

  `;


  return card;

}


/* =========================
   LOAD REVIEWS
========================= */

reviews.forEach(
  review => {

    grid?.appendChild(
      createReviewCard(review)
    );

  }
);


/* =========================
   OPEN MODAL
========================= */

openReview?.addEventListener(
  "click",
  () => {

    modal?.classList.add(
      "open"
    );

    modal?.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow =
      "hidden";

    setTimeout(
      () => {

        document
          .querySelector(
            "#reviewName"
          )
          ?.focus();

      },
      80
    );

  }
);


/* =========================
   CLOSE MODAL
========================= */

function closeModal() {

  modal?.classList.remove(
    "open"
  );

  modal?.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow =
    "";

}


closeReview?.addEventListener(
  "click",
  closeModal
);


/* Outside click */

modal?.addEventListener(
  "click",
  event => {

    if (
      event.target === modal
    ) {

      closeModal();

    }

  }
);


/* Escape */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      modal?.classList.contains(
        "open"
      )
    ) {

      closeModal();

    }

  }
);


/* =========================
   SUBMIT REVIEW
========================= */

form?.addEventListener(
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
      nameInput.value.trim();

    const text =
      textInput.value.trim();

    const rating =
      Number(
        ratingValue.value
      ) || 5;


    if (!name) {

      nameInput.focus();

      return;

    }


    if (!text) {

      textInput.focus();

      return;

    }


    const review = {

      name,

      text,

      rating

    };


    reviews.unshift(
      review
    );


    try {

      localStorage.setItem(
        REVIEW_KEY,
        JSON.stringify(
          reviews
        )
      );

    } catch {

      /* Continue even if storage fails */

    }


    /* Show immediately */

    grid?.prepend(
      createReviewCard(review)
    );


    /* Reset */

    form.reset();

    setRating(5);

    closeModal();


    /* Scroll back to testimonials */

    setTimeout(
      () => {

        document
          .querySelector(
            "#testimonials"
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

      },
      100
    );

  }
);


/* =========================
   CLICK OUTSIDE MOBILE MENU
========================= */

document.addEventListener(
  "click",
  event => {

    if (
      !nav ||
      !menu
    ) {
      return;
    }

    const insideNav =
      nav.contains(
        event.target
      );

    const insideButton =
      menu.contains(
        event.target
      );

    if (
      !insideNav &&
      !insideButton &&
      nav.classList.contains(
        "open"
      )
    ) {

      nav.classList.remove(
        "open"
      );

      menu.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  }
);
