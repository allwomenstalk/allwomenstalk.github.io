// Function to fetch data from MongoDB
function fetchData() {
    fetch('https://us-east-1.aws.data.mongodb-api.com/app/azoio-evvkb/endpoint/quizzes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
      .then(data => generateHTML(data))
      .catch((error) => {
        console.log('Error:', error);
    });
}

// Function to generate HTML
function generateHTML(data) {
    const quizzesDiv = document.getElementById('quizzes'); // Get reference to the div

    data = [data]
    console.log(data);
    data.forEach(item => {
        // Generate new HTML content
        const newHtml = `
        <div class="bg-indigo-100">
            <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Engage in a quiz on<br>${item.title}</h2>
            <div class="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
                <a href="https://quiz.allwomenstalk.com/${item._id}" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Start Quiz</a>
                <a href="https://quiz.allwomenstalk.com/" class="text-sm font-semibold leading-6 text-gray-900">Explore more <span aria-hidden="true">→</span></a>
            </div>
            </div>
        </div>      
        `;

        // Append the new HTML content to the specific div
        quizzesDiv.innerHTML += newHtml;
    });
}

// Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            console.log('Intersecting');
            fetchData();
            observer.disconnect(); // Stop observing after first intersection
        }
    });
}, {rootMargin: '0px 0px -10px 0px'}); // Adjust rootMargin as needed to control when the fetch happens

observer.observe(document.getElementById('quizzes')); // Observe the #quizzes div