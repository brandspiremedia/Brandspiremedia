/* ==================================================
   BRANDSPPIRE MEDIA
   MAIN WEBSITE JAVASCRIPT
================================================== */


/* ==================================================
   ELEMENTS
================================================== */

const header =
  document.getElementById("header");

const menuBtn =
  document.getElementById("menuBtn");

const navigation =
  document.getElementById("navigation");


/* ==================================================
   MOBILE MENU
================================================== */

if (menuBtn && navigation) {

  menuBtn.addEventListener(
    "click",
    () => {

      const isOpen =
        navigation.classList.toggle(
          "open"
        );

      menuBtn.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      menuBtn.setAttribute(
        "aria-label",
        isOpen
          ? "Close menu"
          : "Open menu"
      );

    }
  );

}


/* ==================================================
   CLOSE MOBILE MENU AFTER CLICK
================================================== */

document
  .querySelectorAll(
    "#navigation a"
  )
  .forEach(
    link => {

      link.addEventListener(
        "click",
        () => {

          navigation?.classList.remove(
            "open"
          );

          menuBtn?.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    }
  );


/* ==================================================
   SMOOTH INTERNAL NAVIGATION
================================================== */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach(
    link => {

      link.addEventListener(
        "click",
        event => {

          const targetID =
            link.getAttribute(
              "href"
            );

          if (
            !targetID ||
            targetID === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(
              targetID
            );

          if (!target) {
            return;
          }

          event.preventDefault();

          const headerHeight =
            header
              ? header.offsetHeight
              : 0;

          const position =
            target.getBoundingClientRect()
              .top
            +
            window.scrollY
            -
            headerHeight
            -
            8;

          window.scrollTo({

            top: position,

            behavior: "smooth"

          });

        }
      );

    }
  );


/* ==================================================
   HEADER SCROLL EFFECT
================================================== */

function updateHeader() {

  if (!header) {
    return;
  }

  if (window.scrollY > 20) {

    header.classList.add(
      "scrolled"
    );

  } else {

    header.classList.remove(
      "scrolled"
    );

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


/* ==================================================
   SCROLL REVEAL
================================================== */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


if (
  "IntersectionObserver"
  in window
) {

  const revealObserver =
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

              revealObserver.unobserve(
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

      revealObserver.observe(
        element
      );

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


/* ==================================================
   BACK TO TOP
================================================== */

const backTop =
  document.getElementById(
    "backTop"
  );


function updateBackTop() {

  if (!backTop) {
    return;
  }

  if (window.scrollY > 500) {

    backTop.classList.add(
      "show"
    );

  } else {

    backTop.classList.remove(
      "show"
    );

  }

}

window.addEventListener(
  "scroll",
  updateBackTop,
  {
    passive: true
  }
);

updateBackTop();


backTop?.addEventListener(
  "click",
  () => {

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  }
);


/* ==================================================
   FOOTER YEAR
================================================== */

const year =
  document.getElementById(
    "year"
  );

if (year) {

  year.textContent =
    new Date().getFullYear();

}


/* ==================================================
   REVIEW SYSTEM
================================================== */

const reviewModal =
  document.getElementById(
    "reviewModal"
  );

const openReview =
  document.getElementById(
    "openReview"
  );

const closeReview =
  document.getElementById(
    "closeReview"
  );

const reviewForm =
  document.getElementById(
    "reviewForm"
  );

const reviewGrid =
  document.getElementById(
    "reviewGrid"
  );

const ratingValue =
  document.getElementById(
    "ratingValue"
  );

const ratingButtons =
  [
    ...document.querySelectorAll(
      "#rating button"
    )
  ];

const REVIEW_STORAGE_KEY =
  "brandspire_reviews_final";


let reviews = [];


/* ==================================================
   LOAD REVIEWS
================================================== */

try {

  const savedReviews =
    localStorage.getItem(
      REVIEW_STORAGE_KEY
    );

  if (savedReviews) {

    reviews =
      JSON.parse(
        savedReviews
      );

  }

  if (
    !Array.isArray(reviews)
  ) {

    reviews = [];

  }

} catch {

  reviews = [];

}


/* ==================================================
   ESCAPE USER CONTENT
================================================== */

function escapeHTML(value) {

  return String(value)
    .replace(
      /[&<>"']/g,
      character => {

        const characters = {

          "&": "&amp;",

          "<": "&lt;",

          ">": "&gt;",

          '"': "&quot;",

          "'": "&#039;"

        };

        return characters[
          character
        ];

      }
    );

}


/* ==================================================
   RATING
================================================== */

function setRating(value) {

  let rating =
    Number(value);

  if (
    !Number.isFinite(
      rating
    )
  ) {

    rating = 5;

  }

  rating =
    Math.max(
      1,
      Math.min(
        5,
        rating
      )
    );


  if (ratingValue) {

    ratingValue.value =
      rating;

  }


  ratingButtons.forEach(
    button => {

      const buttonRating =
        Number(
          button.dataset.rating
        );

      button.classList.toggle(
        "active",
        buttonRating <= rating
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


/* ==================================================
   CREATE REVIEW CARD
================================================== */

function createReviewCard(
  review
) {

  const card =
    document.createElement(
      "article"
    );

  card.className =
    "review-card reveal visible";


  let rating =
    Number(
      review.rating
    );

  rating =
    Math.max(
      1,
      Math.min(
        5,
        rating || 5
      )
    );


  const fullStars =
    "★".repeat(
      rating
    );

  const emptyStars =
    "☆".repeat(
      5 - rating
    );


  card.innerHTML = `

    <div class="stars">
      ${fullStars}${emptyStars}
    </div>

    <p>
      “${escapeHTML(
        review.text
      )}”
    </p>

    <strong>
      ${escapeHTML(
        review.name
      )}
    </strong>

  `;


  return card;

}


/* ==================================================
   DISPLAY SAVED REVIEWS
================================================== */

reviews.forEach(
  review => {

    reviewGrid?.appendChild(
      createReviewCard(
        review
      )
    );

  }
);


/* ==================================================
   OPEN REVIEW MODAL
================================================== */

openReview?.addEventListener(
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

    setTimeout(
      () => {

        document
          .getElementById(
            "reviewName"
          )
          ?.focus();

      },
      100
    );

  }
);


/* ==================================================
   CLOSE REVIEW MODAL
================================================== */

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


closeReview?.addEventListener(
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


/* ==================================================
   SUBMIT REVIEW
================================================== */

reviewForm?.addEventListener(
  "submit",
  event => {

    event.preventDefault();


    const nameInput =
      document.getElementById(
        "reviewName"
      );

    const textInput =
      document.getElementById(
        "reviewText"
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


    const newReview = {

      name: name,

      text: text,

      rating: rating

    };


    reviews.unshift(
      newReview
    );


    /* Save */

    try {

      localStorage.setItem(
        REVIEW_STORAGE_KEY,
        JSON.stringify(
          reviews
        )
      );

    } catch {

      /* The review still appears
         even if browser storage
         is unavailable. */

    }


    /* Immediately display */

    if (reviewGrid) {

      reviewGrid.prepend(
        createReviewCard(
          newReview
        )
      );

    }


    /* Reset form */

    reviewForm.reset();

    setRating(5);

    closeReviewModal();


    /* Return to testimonials */

    setTimeout(
      () => {

        document
          .getElementById(
            "testimonials"
          )
          ?.scrollIntoView({

            behavior: "smooth",

            block: "start"

          });

      },
      150
    );

  }
);


/* ==================================================
   CLOSE MENU WHEN CLICKING OUTSIDE
================================================== */

document.addEventListener(
  "click",
  event => {

    if (
      !navigation ||
      !menuBtn
    ) {
      return;
    }


    const clickedNavigation =
      navigation.contains(
        event.target
      );

    const clickedMenu =
      menuBtn.contains(
        event.target
      );


    if (
      !clickedNavigation &&
      !clickedMenu &&
      navigation.classList.contains(
        "open"
      )
    ) {

      navigation.classList.remove(
        "open"
      );

      menuBtn.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  }
);
