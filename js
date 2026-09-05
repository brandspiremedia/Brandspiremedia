/* =========================================================
   BRANDSPIRE MEDIA
   WEBSITE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const header = document.getElementById("header");
    const menuBtn = document.getElementById("menuBtn");
    const nav = document.getElementById("nav");
    const backTop = document.getElementById("backTop");

    /* ================= HEADER ================= */

    function updateHeader() {

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        if (window.scrollY > 500) {
            backTop.classList.add("show");
        } else {
            backTop.classList.remove("show");
        }
    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* ================= MOBILE MENU ================= */

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("active");

    });


    /* ================= NAVIGATION ================= */

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

            nav.classList.remove("active");

            const headerHeight = header.offsetHeight;

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


    /* ================= CLOSE MOBILE MENU ================= */

    document.addEventListener("click", event => {

        const clickedInsideNav =
            nav.contains(event.target);

        const clickedMenu =
            menuBtn.contains(event.target);

        if (!clickedInsideNav && !clickedMenu) {
            nav.classList.remove("active");
        }

    });


    /* ================= REVEAL ANIMATION ================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");

                            observer.unobserve(entry.target);

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


    /* ================= BACK TO TOP ================= */

    backTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* ================= YEAR ================= */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       REVIEWS
    ===================================================== */

    const openReview =
        document.getElementById("openReview");

    const closeReview =
        document.getElementById("closeReview");

    const reviewModal =
        document.getElementById("reviewModal");

    const reviewForm =
        document.getElementById("reviewForm");

    const reviewsGrid =
        document.getElementById("reviewsGrid");

    const ratingButtons =
        document.querySelectorAll(
            ".rating-input button"
        );


    let selectedRating = 5;


    /* ================= OPEN REVIEW ================= */

    if (openReview) {

        openReview.addEventListener("click", () => {

            reviewModal.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    }


    /* ================= CLOSE REVIEW ================= */

    function closeReviewModal() {

        reviewModal.classList.remove("active");

        document.body.style.overflow = "";

    }


    if (closeReview) {

        closeReview.addEventListener(
            "click",
            closeReviewModal
        );

    }


    /* ================= RATING ================= */

    function updateStars() {

        ratingButtons.forEach(button => {

            const rating =
                Number(button.dataset.rating);

            if (rating <= selectedRating) {

                button.classList.add("active");

            } else {

                button.classList.remove("active");

            }

        });

    }


    ratingButtons.forEach(button => {

        button.addEventListener("click", () => {

            selectedRating =
                Number(button.dataset.rating);

            updateStars();

        });

    });


    updateStars();


    /* ================= ESC KEY ================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeReviewModal();

        }

    });


    /* ================= CLICK OUTSIDE MODAL ================= */

    if (reviewModal) {

        reviewModal.addEventListener("click", event => {

            if (event.target === reviewModal) {

                closeReviewModal();

            }

        });

    }


    /* =====================================================
       LOCAL REVIEW STORAGE
    ===================================================== */

    const storageKey =
        "brandspire_reviews_v1";


    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }


    function getReviews() {

        try {

            const saved =
                localStorage.getItem(storageKey);

            if (!saved) {
                return [];
            }

            return JSON.parse(saved);

        } catch {

            return [];

        }

    }


    function saveReviews(reviews) {

        localStorage.setItem(
            storageKey,
            JSON.stringify(reviews)
        );

    }


    function renderReviews() {

        const reviews =
            getReviews();

        reviewsGrid.innerHTML = "";


        /* Default card */

        if (reviews.length === 0) {

            const defaultCard =
                document.createElement("article");

            defaultCard.className =
                "review-card reveal visible";

            defaultCard.innerHTML = `

                <div class="stars">★★★★★</div>

                <p>
                    "BrandSpire brings creativity and professionalism
                    together. Looking forward to building great things."
                </p>

                <div class="review-author">

                    <strong>Client Reviews</strong>

                    <span>
                        More coming soon
                    </span>

                </div>

            `;

            reviewsGrid.appendChild(defaultCard);

            return;

        }


        /* User reviews */

        reviews.forEach(review => {

            const card =
                document.createElement("article");

            card.className =
                "review-card reveal visible";


            const stars =
                "★".repeat(review.rating) +
                "☆".repeat(5 - review.rating);


            card.innerHTML = `

                <div class="stars">
                    ${stars}
                </div>

                <p>
                    "${escapeHTML(review.text)}"
                </p>

                <div class="review-author">

                    <strong>
                        ${escapeHTML(review.name)}
                    </strong>

                    <span>
                        Verified visitor review
                    </span>

                </div>

            `;


            reviewsGrid.appendChild(card);

        });

    }


    /* ================= SUBMIT REVIEW ================= */

    if (reviewForm) {

        reviewForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document
                        .getElementById("reviewName")
                        .value
                        .trim();


                const text =
                    document
                        .getElementById("reviewText")
                        .value
                        .trim();


                if (!name || !text) {

                    return;

                }


                const reviews =
                    getReviews();


                reviews.unshift({

                    name: name,

                    rating: selectedRating,

                    text: text,

                    date: new Date().toISOString()

                });


                saveReviews(reviews);


                renderReviews();


                reviewForm.reset();


                selectedRating = 5;

                updateStars();


                closeReviewModal();


                /* Scroll to reviews */

                document
                    .getElementById("testimonials")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    }


    renderReviews();

});
