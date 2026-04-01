const API_KEY = "DEMO_KEY";

async function getImage() {
  const date = document.getElementById("dateInput").value;

  const loading = document.getElementById("loading");
  const result = document.getElementById("result");

  loading.style.display = "block";
  result.style.display = "none";

  try {
    const response = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=" + API_KEY + "&date=" + date
    );

    const data = await response.json();

    document.getElementById("title").innerText = data.title;
    document.getElementById("image").src = data.url;
    document.getElementById("description").innerText = data.explanation;

    loading.style.display = "none";
    result.style.display = "block";

  } catch (error) {
    loading.innerText = "Error fetching data";
  }
}