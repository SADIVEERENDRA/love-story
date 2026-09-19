const pages = document.querySelectorAll(".story-page");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const pageNumber = document.getElementById("pageNumber");

let currentPage = 0;

function showPage(index) {
  pages.forEach((page, i) => {
    page.classList.toggle("active", i === index);
  });

  pageNumber.textContent = `${index + 1} / ${pages.length}`;

  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === pages.length - 1;
}

nextBtn.addEventListener("click", () => {
  if (currentPage < pages.length - 1) {
    currentPage++;
    showPage(currentPage);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    showPage(currentPage);
  }
});

// Mobile swipe support
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;

  if (Math.abs(swipeDistance) < 50) return;

  if (swipeDistance < 0 && currentPage < pages.length - 1) {
    currentPage++;
    showPage(currentPage);
  }

  if (swipeDistance > 0 && currentPage > 0) {
    currentPage--;
    showPage(currentPage);
  }
}

showPage(currentPage);