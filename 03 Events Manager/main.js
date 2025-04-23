// *************
const nameInput = document.querySelector(".input-name");
const eventInput = document.querySelector(".input-event");
const dateInput = document.querySelector(".input-date");
const addEventButton = document.querySelector(".submit-button");
const eventsContainer = document.querySelector(".events");
const events = JSON.parse(localStorage.getItem("event")) || [];
// const eventBox = document.querySelector(".event");
// *************
// Set Minumum Date on Calender
function setMinDate() {
  const today = new Date().toISOString().split("T")[0];

  // eventDate.setAttribute("min", today);
  dateInput.min = today;
  dateInput.addEventListener("input", function () {
    if (dateInput.value < today) dateInput.value = today;
  });
}
setMinDate();
// Restore Events When Closing Or Refreshing
const init = function () {
  events.forEach((event) => {
    eventsContainer.insertAdjacentHTML("beforeend", event);
  });
};
init();
// Get The Remaining Time Between User's Selected Date And Date NOw
const getTimeLeft = function () {
  const now = new Date();
  const selectedDate = new Date(dateInput.value);
  selectedDate.setHours(0, 0, 0, 0);
  const remaningTime = selectedDate - now;
  const days = Math.floor(remaningTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaningTime / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaningTime / (1000 * 60)) % 60);
  const seconds = Math.floor((remaningTime / 1000) % 60);
  return { days, hours, minutes, seconds };
};
// Add Events To Local Storage
const AddEventsToStorage = function () {
  // Add html In The Event Container
  const html = `   <div class="event" data-number="${
    events.length
  }" data-date="${dateInput.value}">
  <h2>${nameInput.value}</h2>
  <div>
  <span>By</span>
  <span>${eventInput.value}</span>
  </div>
  <div>
  <span>On</span>
  <span>${dateInput.value}</span>
  </div>
  <div>
  <span>Time Left</span>
  <span class="countdown">${getTimeLeft().days}d ${getTimeLeft().hours}h ${
    getTimeLeft().minutes
  }m ${getTimeLeft().seconds}s</span>
  </div>
  <button class="btn">Delete</button>
  </div>`;
  events.push(html);
  localStorage.setItem("event", JSON.stringify(events));
  eventsContainer.insertAdjacentHTML("beforeend", html);
};

addEventButton.addEventListener("click", (e) => {
  //  Make Sure The User Filled All The Inputs
  if (
    nameInput.value === "" ||
    eventInput.value === "" ||
    dateInput.value === ""
  ) {
    alert("Please Fill All Fields");
    return;
  }
  // Prevent The Page From Refreshing After Submit Button
  e.preventDefault();
  AddEventsToStorage();
  //  Clear Inputs After Submitting
  nameInput.value = eventInput.value = dateInput.value = "";
});
eventsContainer.addEventListener("click", (e) => {
  // get The Parent Element Of Delete Button
  const targetDiv = e.target.closest(".event");
  // Get The Div From Array
  if (e.target.classList.contains("btn")) {
    const removedDiv = events.find((ev) =>
      ev.includes(`data-number="${targetDiv.dataset.number}"`)
    );
    // Remove From Events Container And Events Array
    targetDiv.remove();
    events.splice(events.indexOf(removedDiv), 1);
    // Clear Local Storage And Re set It Again
    localStorage.removeItem("event");
    localStorage.setItem("event", JSON.stringify(events));
  }
});
setInterval(() => {
  const allEvents = document.querySelectorAll(".event");
  allEvents.forEach((eventEl) => {
    const targetDate = new Date(eventEl.dataset.date);
    targetDate.setHours(0, 0, 0, 0); // set to midnight
    const now = new Date();
    const remaining = targetDate - now;

    if (remaining < 0) {
      eventEl.querySelector(".countdown").textContent = "Expired";
      eventEl.remove();
      return;
    }

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((remaining / (1000 * 60)) % 60);
    const seconds = Math.floor((remaining / 1000) % 60);

    eventEl.querySelector(
      ".countdown"
    ).textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  });
}, 1000); // update every second
