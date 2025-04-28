// ******
const websiteText = document.querySelector(".website-text");
const websiteUrl = document.querySelector(".website-url");
const categoryName = document.querySelector(".category-name");
const categoriesList = document.querySelector(".categories-list");
const addButton = document.querySelector(".add-bookmark-btn");
const bookmarksContainer = document.querySelector(".bookmarks");
const filterContainer = document.querySelector(".filter-bookmarks");
const showAllBookmarks = document.querySelector(".show-bookmarks");
// *******
const handleAddBookmark = function () {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  // Create New Set To Clear Duplicates In Category Name
  const addedCategories = new Set();
  while (filterContainer.children.length > 1)
    filterContainer.removeChild(filterContainer.lastElementChild);
  while (categoriesList.children.length > 1)
    categoriesList.removeChild(categoriesList.lastElementChild);
  bookmarksContainer.innerHTML = "";
  bookmarks.map((bookmark) => {
    // Add Bookmark To Bookmarks Container After The User Submitted His Information
    const html = ` <div class="bookmark">
  <p>${bookmark.category}</p>
  <a href="${bookmark.url}">${bookmark.text}</a>
  <button class="btn delete-btn">Delete</button>
  </div> `;
    bookmarksContainer.insertAdjacentHTML("beforeend", html);
    // Add Category Name To Categories List
    if (!addedCategories.has(bookmark.category)) {
      categoriesList.insertAdjacentHTML(
        "beforeend",
        `<span class="category-list">${
          bookmark.category.charAt(0).toUpperCase() +
          bookmark.category.slice(1).toLowerCase()
        } </span>`
      );
      // Add Category Name To Filter Bookmarks
      filterContainer.insertAdjacentHTML(
        "beforeend",
        `<span class="all-bookmarks">${
          bookmark.category.charAt(0).toUpperCase() +
          bookmark.category.slice(1).toLowerCase()
        }</span>`
      );
    }
    addedCategories.add(bookmark.category);
  });
};
handleAddBookmark();

addButton.addEventListener("click", (e) => {
  // Prevent Page From Refreshing When Click On Button
  e.preventDefault();
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  // Check The User Fill All The Fields
  if (
    websiteText.vlaue === "" ||
    websiteUrl.value === "" ||
    categoryName.value === ""
  ) {
    alert("Please Fill All Fields");
    return;
  }
  // Create a bookmark object
  const bookmark = {
    text: websiteText.value,
    url: websiteUrl.value,
    category: categoryName.value,
  };
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  handleAddBookmark();
  // Clear All Input Fields After Submitting
  websiteText.value = websiteUrl.value = categoryName.value = "";
});

categoriesList.addEventListener("click", (e) => {
  if (e.target.closest(".category-list"))
    categoryName.value = e.target.innerHTML;
});
bookmarksContainer.addEventListener("click", (e) => {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  const allBookmarks = Array.from(document.querySelectorAll(".bookmark"));
  const indexOfTargetBookmark = allBookmarks.indexOf(e.target.parentElement);
  if (e.target.closest(".delete-btn")) {
    e.target.parentElement.remove();
    bookmarks.splice(indexOfTargetBookmark, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    handleAddBookmark();
  }
});
filterContainer.addEventListener("click", (e) => {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

  if (e.target.closest("span")) {
    bookmarksContainer.innerHTML = "";
    document.querySelectorAll(".all-bookmarks").forEach((b) => {
      b.classList.remove("active");
    });

    e.target.classList.add("active");
    let counter = 1;
    bookmarks.forEach((bookmark) => {
      if (
        e.target.innerHTML ===
        bookmark.category.charAt(0).toUpperCase() +
          bookmark.category.slice(1).toLowerCase()
      ) {
        const html = ` <div class="bookmark">
        <p class="number">${counter}</p>
        <a href="${bookmark.url}">${bookmark.text}</a>
        <button class="btn delete-btn">Delete</button>
        </div> `;
        bookmarksContainer.insertAdjacentHTML("beforeend", html);
        counter++;
      }
    });
  }
});
showAllBookmarks.addEventListener("click", handleAddBookmark);
