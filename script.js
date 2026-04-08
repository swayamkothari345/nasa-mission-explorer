let allData = [];
const API_KEY = "DEMO_KEY";

async function getImage() {
  const date = document.getElementById("dateInput").value;
  const loading = document.getElementById("loading");
  const result = document.getElementById("result");

  loading.style.display = "block";
  result.style.display = "none";

  try {
    if (!date) {
      alert("Please select a date");
      loading.style.display = "none";
      return;
    }

    const selectedDate = new Date(date);
    const today = new Date();

    // Prevent future date
    if (selectedDate > today) {
      alert("Future dates not allowed");
      loading.style.display = "none";
      return;
    }
    const pastDate = new Date(selectedDate);
    pastDate.setDate(selectedDate.getDate() - 7);

    const start = pastDate.toISOString().split("T")[0];
    const end = selectedDate.toISOString().split("T")[0];

    const response = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=" + API_KEY +
      "&start_date=" + start + "&end_date=" + end
    );

    const data = await response.json();
    if (data.error) {
      loading.innerText = data.error.message;
      return;
    }

    allData = data;
    displayData(allData);

    loading.style.display = "none";
    result.style.display = "block";

  } catch (error) {
    loading.innerText = "Error fetching data";
  }
}
function displayData(dataArray) {
  const result = document.getElementById("result");

  result.innerHTML = "";

  const html = dataArray.map(function(item, index) {
    if (item.media_type !== "image") {
      return "";
    }

    return `
      <div class="card">
        <h3>${item.title}</h3>
        <img src="${item.url}">
        <p>${item.date}</p>

        <button onclick="toggleDesc(${index})">View More</button>
        <p id="desc-${index}" style="display:none;">
          ${item.explanation}
        </p>
      </div>
    `;
  });

  result.innerHTML = html.join("");
}
function searchData() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();

  const filtered = allData.filter(function(item) {
    return item.title.toLowerCase().includes(keyword) ||
           item.explanation.toLowerCase().includes(keyword);
  });

  displayData(filtered);
}
function sortAsc() {
  const sorted = allData.slice().sort(function(a, b) {
    return new Date(a.date) - new Date(b.date);
  });

  displayData(sorted);
}

function sortDesc() {
  const sorted = allData.slice().sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  displayData(sorted);
}
function toggleDesc(index) {
  const desc = document.getElementById("desc-" + index);

  if (desc.style.display === "none") {
    desc.style.display = "block";
  } else {
    desc.style.display = "none";
  }
}