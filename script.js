document.addEventListener("DOMContentLoaded", function() {
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach(item => {
    const title = item.querySelector(".accordion-title");
    const content = item.querySelector(".accordion-content");

    title.addEventListener("click", function() {
      const isOpen = item.classList.contains("active");

      accordionItems.forEach(item => {
        item.classList.remove("active");
        item.querySelector(".accordion-content").style.display = "none";
        item.querySelector(".arrow").classList.remove("open");
      });

      if (!isOpen) {
        item.classList.add("active");
        content.style.display = "block";
        title.querySelector(".arrow").classList.add("open");
      }
    });
  });
});
