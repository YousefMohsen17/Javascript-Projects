// ******************************************
const rightArrow = document.querySelector(".arrow-right");
const leftArrow = document.querySelector(".arrow-left");
const images = Array.from(document.querySelectorAll(".thumbnail img"));
const galleryContainer = document.querySelector(".gallery");
// Clone All Images To Gallery Div
const cloneImages = function () {
  images.forEach((img) => {
    const thumbnail = img.cloneNode(true);
    document.querySelector(".gallery").appendChild(thumbnail);
  });
};
cloneImages();
const galleryImages = document.querySelectorAll(".gallery img");
//    Remove Class Active From All Images
const removeActiveClass = function () {
  images.forEach((img) => {
    img.classList.remove("active");
  });
  galleryImages.forEach((img) => {
    img.classList.remove("active");
  });
};
// ****************************************
// Handle The Next Button Icon
const nextImage = function () {
  // Determine The Index Of Current Image
  const indexOfCurImage = images.findIndex((img) =>
    img.classList.contains("active")
  );
  removeActiveClass();
  //   Set Class Active To The Next Image
  if (indexOfCurImage < images.length - 1) {
    images
      .find((img) => img.dataset.number === `${indexOfCurImage + 1}`)
      .classList.add("active");
    // Set Class Active To Thumbnail Image That is the Same At Gallery Images
    Array.from(galleryImages)
      .find(
        (img) =>
          img.dataset.number ===
          document.querySelector(".thumbnail .active").dataset.number
      )
      .classList.add("active");
  } else {
    //   When you Reach The Last Image Return To first Image Again
    images.find((img) => img.dataset.number === "0").classList.add("active");
    // Set Class Active To Thumbnail Image That is the Same At Gallery Images

    Array.from(galleryImages)
      .find(
        (img) =>
          img.dataset.number ===
          document.querySelector(".thumbnail .active").dataset.number
      )
      .classList.add("active");
  }
};
// Handle The Previous Button Icon
const prevImage = function () {
  // Determine The Index Of Current Image
  const indexOfCurImage = images.findIndex((img) =>
    img.classList.contains("active")
  );
  removeActiveClass();
  //   Set Class Active To The Previous Image
  if (indexOfCurImage > 0) {
    images
      .find((img) => img.dataset.number === `${indexOfCurImage - 1}`)
      .classList.add("active");
    Array.from(galleryImages)
      .find(
        (img) =>
          img.dataset.number ===
          document.querySelector(".thumbnail .active").dataset.number
      )
      .classList.add("active");
  } else {
    //   When you Reach The Last Image Return To first Image Again
    images
      .find((img) => img.dataset.number === `${images.length - 1}`)
      .classList.add("active");
    Array.from(galleryImages)
      .find(
        (img) =>
          img.dataset.number ===
          document.querySelector(".thumbnail .active").dataset.number
      )
      .classList.add("active");
  }
};
const setActiveGalleryImg = function (e) {
  // Add Guard Clause
  if (e.target.tagName !== "IMG") return;
  // Remove All Active Classes From Gallery Images And Add Active To Selected Image
  galleryImages.forEach((img) => img.classList.remove("active"));
  e.target.classList.add("active");
  // Remove Active Class From Thumbnail Images
  images.forEach((img) => {
    img.classList.remove("active");
  });
  // Put Class Active To Thumbnail Image That is the Same At Gallery Images
  images
    .find((img) => img.dataset.number === e.target.dataset.number)
    .classList.add("active");
};

rightArrow.addEventListener("click", nextImage);
leftArrow.addEventListener("click", prevImage);
galleryContainer.addEventListener("click", setActiveGalleryImg);
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
});
