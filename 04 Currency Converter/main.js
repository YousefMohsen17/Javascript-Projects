const selectFrom = document.querySelector("select[name=from]");
const convertButton = document.querySelector(".convert-button");
const resultContainer = document.querySelector(".result");

const api = async function (to, amountVal) {
  try {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/87bd1435f69bc02e2d2022cc/latest/${selectFrom.value}`
    );
    if (!res.ok) throw new Error("⚠️⚠️ Something Went Wrong");
    const data = await res.json();
    const result = data.conversion_rates[to] * amountVal;
    return result;
  } catch (err) {
    console.error(err.message);
  }
};
convertButton.addEventListener("click", async () => {
  const selectTo = document.querySelector("select[name=to]").value;
  const amount = document.querySelector("input[type=text");
  document.querySelector(".text")?.remove();
  const result = await api(selectTo, +amount.value);
  if (!isNaN(result) && amount.value !== "") {
    const html = `<p class="text">${amount.value} ${
      selectFrom.value
    } = ${result.toFixed(2)} ${selectTo}</p>`;
    resultContainer.insertAdjacentHTML("afterbegin", html);
  } else alert("Please Enter A Number");

  amount.value = "";
});
