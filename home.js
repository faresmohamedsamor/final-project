AOS.init();

var testimonialSwiper = new Swiper(".testimonials-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 4000,
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        },
    },
});

var swiper = new Swiper(".upcomingSwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 5000,
    },
    breakpoints: {
        768: {
            slidesPerView: 2
        },
        992: {
            slidesPerView: 3
        }
    }
});

function showSweetAlert(message = "تمت العملية بنجاح!") {
    Swal.fire({
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 2000
    });
}

function showToast() {
    const toastEl = document.getElementById('liveToast');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

const heroImage = document.querySelector('#hero .col-md-6.text-center img');

document.querySelector('#hero').addEventListener('mousemove', (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const moveX = (x - rect.width / 2) * 0.02;
    const moveY = (y - rect.height / 2) * 0.02;

    heroImage.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
});

document.querySelector('#hero').addEventListener('mouseleave', () => {
    heroImage.style.transform = 'translate(0,0) scale(1)';
});

// Featured Books functionality
const featuredBooksContainer = document.getElementById("featuredBooksContainer");
const apiUrl = 'https://edu-me01.github.io/Json-Data/Digital-Library.json';

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const books = data.books;
        const featuredBooks = books.slice(0, 4);

        const featuredTitle = document.querySelector('#featured h2');
        if (featuredTitle) {
            featuredTitle.textContent = "Hand-Picked Reads You’ll Love";
            featuredTitle.style.textAlign = "center";
        }

        featuredBooks.forEach((book, index) => {
            const imgSrc = book.coverImage && book.coverImage.trim() !== "" ?
                book.coverImage :
                'https://via.placeholder.com/300x250?text=No+Image';

            const swiperSlide = document.createElement('div');
            swiperSlide.className = 'swiper-slide';

            // AOS Animation added here with staggered delay
            swiperSlide.setAttribute("data-aos", "fade-up");
            swiperSlide.setAttribute("data-aos-delay", `${index * 100}`);

            swiperSlide.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <img src="${imgSrc}" class="card-img-top book-img" alt="${book.title}"
                        onerror="this.src='https://via.placeholder.com/300x250?text=No+Image';">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text"><strong>Author:</strong> ${book.author}</p>
                        <p class="card-text"><strong>Price:</strong> $${book.price}</p>
                        <a href="booksdetails.html?id=${book.id}" class="btn btn-outline-primary btn-sm mt-2">View Details</a>
                    </div>
                </div>
            `;
            featuredBooksContainer.appendChild(swiperSlide);
        });

        // Reinitialize AOS after DOM updates
        AOS.refresh();

        var featuredSwiper = new Swiper(".featuredSwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                },
                1200: {
                    slidesPerView: 4,
                }
            },
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        featuredBooksContainer.innerHTML = '<p class="text-center text-danger">Failed to load featured books. Please try again later.</p>';
    });
    document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("notifyForm");
      
        if (form) {
          form.addEventListener("submit", function (e) {
            e.preventDefault();
      
            const emailInput = document.getElementById("notifyEmail");
            const email = emailInput.value.trim();
      
            if (email === "") {
              Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Please enter a valid email address.',
                background: '#1e1203',
                color: '#FFD700',
                confirmButtonColor: '#FFD700',
                customClass: {
                  popup: 'border border-warning rounded-4 shadow-lg',
                  title: 'fw-bold',
                  confirmButton: 'px-4 py-2'
                },
                buttonsStyling: true
              });
              return;
            }
      
            Swal.fire({
              icon: 'success',
              title: ' Subscribed Successfully!',
              html: `<span style="color: #FFD700; font-weight: bold;">You will be notified at:</span><br><span style="color: #fff;">${email}</span>`,
              background: '#1e1203',
              color: '#FFD700',
              confirmButtonColor: '#FFD700',
              customClass: {
                popup: 'border border-warning rounded-4 shadow-lg',
                title: 'fw-bold',
                confirmButton: 'px-4 py-2 golden-shine'
              },
              buttonsStyling: true
            });
      
            emailInput.value = "";
          });
        }
      });
      document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault(); // منع الريلود
    
        const emailInput = this.querySelector("input[type='email']");
        const email = emailInput.value.trim();
    
        if (email) {
          Swal.fire({
            title: `<i class="fas fa-check-circle me-2 text-warning"></i>Subscribed Successfully!`,
            html: `<span style="color: #FFD700; font-weight: bold;">You will be notified at:</span><br><span style="color: #fff;">${email}</span>`,
            background: '#1e1203',
            color: '#FFD700',
            confirmButtonColor: '#FFD700',
            customClass: {
              popup: 'border border-warning rounded-4 shadow-lg',
              title: 'fw-bold',
              confirmButton: 'px-4 py-2 golden-shine'
            },
            buttonsStyling: true
          });
    
          emailInput.value = ""; // تفريغ الحقل
        }
      });
   
