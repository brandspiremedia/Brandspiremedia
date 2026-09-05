/* =========================================================
   BRANDSPIRE MEDIA
   CLEAN MASTER JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------
     MOBILE MENU
  ------------------------------------------------------- */

  const menuBtn = document.getElementById("menuBtn");
  const mobileNav = document.getElementById("mobileNav");

  if (menuBtn && mobileNav) {

    menuBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("active");
    });

    mobileNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("active");
      });
    });
  }


  /* -------------------------------------------------------
     SCROLL REVEAL
  ------------------------------------------------------- */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      (entries, obs) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(element => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  /* -------------------------------------------------------
     YEAR
  ------------------------------------------------------- */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* -------------------------------------------------------
     REVIEW SYSTEM
  ------------------------------------------------------- */

  const reviewOpen = document.getElementById("reviewOpen");
  const reviewClose = document.getElementById("reviewClose");
  const reviewModal = document.getElementById("reviewModal");
  const reviewForm = document.getElementById("reviewForm");
  const reviewsList = document.getElementById("reviewsList");
  const stars = document.querySelectorAll("#stars button");

  let selectedRating = 0;


  function openReviewModal() {
    if (reviewModal) {
      reviewModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }


  function closeReviewModal() {
    if (reviewModal) {
      reviewModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }


  if (reviewOpen) {
    reviewOpen.addEventListener("click", openReviewModal);
  }

  if (reviewClose) {
    reviewClose.addEventListener("click", closeReviewModal);
  }

  if (reviewModal) {
    reviewModal.addEventListener("click", event => {

      if (event.target === reviewModal) {
        closeReviewModal();
      }

    });
  }


  /* -------------------------------------------------------
     STAR RATING
  ------------------------------------------------------- */

  stars.forEach(star => {

    star.addEventListener("click", () => {

      selectedRating = Number(star.dataset.rating);

      stars.forEach(item => {

        const rating = Number(item.dataset.rating);

        item.classList.toggle(
          "active",
          rating <= selectedRating
        );

      });

    });

  });


  /* -------------------------------------------------------
     LOAD REVIEWS
  ------------------------------------------------------- */

  function loadReviews() {

    if (!reviewsList) return;

    const savedReviews =
      JSON.parse(localStorage.getItem("brandspireReviews")) || [];

    if (savedReviews.length === 0) {

      reviewsList.innerHTML = `
        <div class="empty-reviews">
          <span>✦</span>
          <h3>Be Our First Reviewer</h3>
          <p>Your experience can help others discover BrandSpire Media.</p>
        </div>
      `;

      return;
    }


    reviewsList.innerHTML = savedReviews
      .map(review => {

        const starsText =
          "★".repeat(review.rating) +
          "☆".repeat(5 - review.rating);

        return `
          <article class="review-card">
            <div class="review-stars">${starsText}</div>
            <h4>${escapeHTML(review.name)}</h4>
            <p>${escapeHTML(review.text)}</p>
          </article>
        `;

      })
      .join("");

  }


  /* -------------------------------------------------------
     POST REVIEW
  ------------------------------------------------------- */

  if (reviewForm) {

    reviewForm.addEventListener("submit", event => {

      event.preventDefault();

      const name =
        document.getElementById("reviewName").value.trim();

      const text =
        document.getElementById("reviewText").value.trim();


      if (!name || !text) {
        alert("Please complete all fields.");
        return;
      }


      if (selectedRating === 0) {
        alert("Please select a rating.");
        return;
      }


      const reviews =
        JSON.parse(localStorage.getItem("brandspireReviews")) || [];


      reviews.unshift({
        name: name,
        text: text,
        rating: selectedRating
      });


      localStorage.setItem(
        "brandspireReviews",
        JSON.stringify(reviews)
      );


      reviewForm.reset();

      selectedRating = 0;

      stars.forEach(star => {
        star.classList.remove("active");
      });


      closeReviewModal();

      loadReviews();

    });

  }


  /* -------------------------------------------------------
     BASIC HTML ESCAPE
  ------------------------------------------------------- */

  function escapeHTML(value) {

    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }


  loadReviews();

});
