// Function to fetch data from MongoDB
var host = window.location.hostname;
var postId = document.head.dataset.postid;

function fetchData() {
  let endpoint = "https://us-east-1.aws.data.mongodb-api.com/app/azoio-evvkb/endpoint/quizzes?host=" + host;
  if (postId) { endpoint = endpoint + "&postId=" + postId; }
  fetch(
    endpoint,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => generateHTML(data))
    .catch((error) => {
      console.log("Error:", error);
    });
}

// Function to generate HTML
function generateHTML(data) {
  const quizzesDiv = document.getElementById("quizzes"); // Get reference to the div

  data = [data];
  console.log("path", window.location.pathname);
  wrapperclass = window.location.pathname == "/" ? "" : " mx-auto max-w-2xl px-8";
  data.forEach((item) => {
    // Generate new HTML content
    const newHtml = `
            <div class="my-2 ${wrapperclass}">
                <div class="mx-auto max-w-7xl py-8 sm:py-16">
                <div class="flex gap-x-6">
                  <p class="text-sm font-semibold text-pink-600">Allwomenstalk Quiz</p>
                  <a href="javaScript:fetchData()" class="text-sm font-semibold leading-6 text-gray-500">Change topic <span aria-hidden="true">↻</span></a>
                </div>
                <h2 class="my-10 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">${item.title}</h2>
                <div class="flex items-center gap-x-6">
                    <a href="https://quiz.allwomenstalk.com/${item._id}/?postId=${postId}&host=${host}" class="rounded-md bg-pink-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">Start Quiz</a>
                    <a href="https://quiz.allwomenstalk.com/" class="text-sm font-semibold leading-6 text-gray-900">Explore More <span aria-hidden="true">→</span></a>
                </div>
                </div>
            </div>      
            `;

    // Append the new HTML content to the specific div
    quizzesDiv.innerHTML = newHtml;
  });
}

// Intersection Observer
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("Intersecting");
        fetchData();
        observer.disconnect(); // Stop observing after first intersection
      }
    });
  },
  { rootMargin: "0px 0px -10px 0px" }
); // Adjust rootMargin as needed to control when the fetch happens

observer.observe(document.getElementById("quizzes")); // Observe the #quizzes div
