const passLength = document.querySelector("input[type=text]");
const generateButton = document.querySelector("button");
const passContainer = document.querySelector(".pass-appearance");
const numbersCheckBox = document.querySelector("#num");
const charCheckBox = document.querySelector("#special");
const passGenerated = document.querySelector(".all-passwords");
let str = "";
// Make Validation for input field
passLength.addEventListener("input", () => {
  let value = passLength.value;
  value = value.replace(/\D/g, "");
  passLength.value = value;
  if (value !== "") {
    if (passLength.value > 32) {
      passLength.value = 32;
    }
    if (passLength.value < 1) {
      passLength.value = 1;
    }
  }
});
const generatePassword = function () {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+";
  //   Collect all characters with a condition to check if the user check the numbers or special characters when click on button
  const all = lowercase.concat(
    uppercase,
    numbersCheckBox.checked ? numbers : "",
    charCheckBox.checked ? symbols : ""
  );
  const passwords = JSON.parse(localStorage.getItem("passwords")) || [];
  for (let i = 0; i < +passLength.value; i++) {
    str += all[Math.floor(Math.random() * all.length)];
  }
  //   Make a condition if passwords are more than 10 delete first one in array and push the new one
  passwords.length < 10 ? "" : passwords.splice(0, 1);
  passwords.push(str);
  localStorage.setItem("passwords", JSON.stringify(passwords));
};
const listGeneratedPasswords = function () {
  const passwords = JSON.parse(localStorage.getItem("passwords")) || [];
  //   Reverse the passwords array to make the new password in array appear ai first
  passwords.reverse().forEach((pass, index) => {
    const html = `   <div>
              <span>${index + 1}</span>
              <span>${pass}</span>
            </div>`;
    passGenerated.insertAdjacentHTML("beforeend", html);
  });
};
listGeneratedPasswords();
generateButton.addEventListener("click", () => {
  str = "";
  passGenerated.innerHTML = "";
  passContainer.innerHTML = "";
  generatePassword();
  passContainer.insertAdjacentHTML("beforeend", str);
  listGeneratedPasswords();
});
