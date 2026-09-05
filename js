document.addEventListener("DOMContentLoaded", () => {

  /* ================= HEADER ================= */

  const header =
    document.getElementById("siteHeader");

  const menu =
    document.getElementById("nav");

  const toggle =
    document.getElementById("menuToggle");

  const backTop =
    document.getElementById("backTop");


  function onScroll() {

    header.classList.toggle(
      "scrolled",
      window.scrollY > 20
    );

    backTop.classList.toggle(
      "show",
      window.scrollY > 500
    );

  }


  window.addEventListener(
    "scroll",
    onScroll,
    {
      passive: true
    }
  );


  onScroll();


  /* ================= MOBILE MENU ================= */

  toggle.addEventListener(
    "click",
    () => {

      const open =
        menu.classList.toggle("open");

      toggle.setAttribute(
        "aria-expanded",
        String(open)
      );

    }
  );


  /* ================= SMOOTH NAVIGATION ================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const id =
            link.getAttribute("href");

          const target =
            document.querySelector(id);


          if (!target) {
            return;
          }


          event.preventDefault();


          menu.classList.remove("open");

          toggle.setAttribute(
            "aria-expanded",
            "false"
          );


          const top =
            target.getBoundingClientRect().top +
            window.scrollY -
            header.offsetHeight +
            1;


          window.scrollTo({

            top: top,

            behavior: "smooth"

          });

        }
      );

    });


  /* ================= BACK TO TOP ================= */

  backTop.addEventListener(
    "click",
    () => {

      window.scrollTo({

        top: 0,

        behavior: "smooth"

      });

    }
  );


  /* ================= ACTIVE NAV ================= */

  const sections =
    [
      ...document.querySelectorAll(
        "main section[id]"
      )
    ];


  const navLinks =
    [
      ...document.querySelectorAll(
        ".nav > a[href^='#']"
      )
    ];


  const sectionObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            navLinks.forEach(
              link => {

                link.classList.toggle(
                  "active",

                  link.getAttribute("href") ===
                  "#" + entry.target.id
                );

              }
            );

          }

        });

      },
      {
        rootMargin:
          "-35% 0px -55% 0px"
      }
    );


  sections.forEach(section => {

    sectionObserver.observe(section);

  });


  /* ================= SCROLL REVEAL ================= */

  const reveals =
    document.querySelectorAll(
      ".reveal"
    );


  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            revealObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.1
      }
    );


  reveals.forEach(element => {

    revealObserver.observe(element);

  });


  /* ================= YEAR ================= */

  document.getElementById(
    "year"
  ).textContent =
    new Date().getFullYear();


  /* =====================================================
     REVIEWS
  ===================================================== */

  const modal =
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


  const form =
    document.getElementById(
      "reviewForm"
    );


  const grid =
    document.getElementById(
      "reviewGrid"
    );


  const starButtons =
    [
      ...document.querySelectorAll(
        "#starsInput button"
      )
    ];


  let selectedRating = 5;


  const storageKey =
    "brandspire_reviews_v2";


  /* ================= ESCAPE HTML ================= */

  function escapeHTML(value) {

    return String(value)
      .replace(
        /[&<>"']/g,
        character => ({

          "&": "&amp;",

          "<": "&lt;",

          ">": "&gt;",

          '"': "&quot;",

          "'": "&#039;"

        }[character])
      );

  }


  /* ================= GET REVIEWS ================= */

  function getReviews() {

    try {

      return JSON.parse(
        localStorage.getItem(
          storageKey
        ) || "[]"
      );

    } catch {

      return [];

    }

  }


  /* ================= DISPLAY REVIEWS ================= */

  function renderReviews() {

    const reviews =
      getReviews();


    grid.innerHTML = "";


    if (reviews.length === 0) {

      grid.innerHTML = `

        <article class="review-card reveal visible">

          <div class="stars">
            ★★★★★
          </div>

          <p>
            “We’re currently collecting feedback
            from our clients. Your experience can
            be the first one featured here.”
          </p>

          <div class="review-author">

            <strong>
              Your Review Could Be Here
            </strong>

            <span>
              Share your experience
            </span>

          </div>

        </article>


        <article class="review-card reveal visible">

          <div class="stars">
            ★★★★★
          </div>

          <p>
            “Real client feedback will be showcased
            here as projects are completed.”
          </p>

          <div class="review-author">

            <strong>
              BrandSpire Media
            </strong>

            <span>
              Growing together
            </span>

          </div>

        </article>

      `;

      return;

    }


    reviews.forEach(review => {

      const card =
        document.createElement(
          "article"
        );


      card.className =
        "review-card reveal visible";


      const stars =
        "★".repeat(
          review.rating
        ) +
        "☆".repeat(
          5 - review.rating
        );


      card.innerHTML = `

        <div class="stars">
          ${stars}
        </div>

        <p>
          “${escapeHTML(
            review.text
          )}”
        </p>

        <div class="review-author">

          <strong>
            ${escapeHTML(
              review.name
            )}
          </strong>

          <span>
            Visitor review
          </span>

        </div>

      `;


      grid.appendChild(card);

    });

  }


  /* ================= OPEN MODAL ================= */

  function openModal() {

    modal.classList.add(
      "open"
    );

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "modal-open"
    );


    document
      .getElementById("reviewName")
      .focus();

  }


  /* ================= CLOSE MODAL ================= */

  function closeModal() {

    modal.classList.remove(
      "open"
    );

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "modal-open"
    );

  }


  openReview.addEventListener(
    "click",
    openModal
  );


  closeReview.addEventListener(
    "click",
    closeModal
  );


  /* ================= CLICK OUTSIDE MODAL ================= */

  modal.addEventListener(
    "click",
    event => {

      if (
        event.target === modal
      ) {

        closeModal();

      }

    }
  );


  /* ================= ESCAPE KEY ================= */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        closeModal();

      }

    }
  );


  /* ================= RATING ================= */

  function paintStars() {

    starButtons.forEach(
      button => {

        button.classList.toggle(

          "selected",

          Number(
            button.dataset.rating
          ) <= selectedRating

        );

      }
    );

  }


  starButtons.forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          selectedRating =
            Number(
              button.dataset.rating
            );

          paintStars();

        }
      );

    }
  );


  paintStars();


  /* ================= SUBMIT REVIEW ================= */

  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const name =
        document
          .getElementById(
            "reviewName"
          )
          .value
          .trim();


      const text =
        document
          .getElementById(
            "reviewText"
          )
          .value
          .trim();


      if (
        !name ||
        !text
      ) {

        return;

      }


      const reviews =
        getReviews();


      reviews.unshift({

        name: name,

        text: text,

        rating:
          selectedRating,

        date:
          new Date()
            .toISOString()

      });


      localStorage.setItem(

        storageKey,

        JSON.stringify(
          reviews
        )

      );


      form.reset();


      selectedRating = 5;

      paintStars();


      renderReviews();


      closeModal();


      document
        .getElementById(
          "testimonials"
        )
        .scrollIntoView({

          behavior: "smooth"

        });

    }
  );


  /* ================= INITIAL REVIEWS ================= */

  renderReviews();

});
