productapiurl = "https://us-central1.gcp.data.mongodb-api.com/app/ezali-pcrzc/endpoint/widget?count=4";
redirectapiurl = "https://us-central1.gcp.data.mongodb-api.com/app/ezali-pcrzc/endpoint/url";
let widgetLoaded = false;


// Function to create product blocks
function createProductBlock(product) {
    return `
    <div class="group relative">
    <div class="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 ">
        <img src="${product.image}" alt="${product.name}" class="h-full w-full object-cover object-center">
    </div>
    <p class="mt-2 text-sm font-medium text-gray-900">$${product.price}</p>
    <h3 class="mt-2 text-sm text-gray-700 text-left">
        <button onclick="redirectToProduct('${product._id}')" class="text-left">
        <span class="absolute inset-0"></span>
        ${product.title}
        </button>
    </h3>
    </div>
`;
}

// Function to fetch and display products
async function fetchAndDisplayProducts() {
    try {
        const response = await fetch(productapiurl);
        const data = await response.json();
        console.log(data);

        // const productContainer = document.getElementById("productcontainer"); #}
        let productsHtml = "";

        data.forEach((product) => {
            productsHtml += createProductBlock(product);
        });

        productContainer.innerHTML = `
      <div class="">
        <div class="mx-auto max-w-xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-3xl lg:px-8">
          <div class="md:flex md:items-center md:justify-between">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">SHOP NOW<br> Trending Products ⚡️</h2>
          </div>
      
          <div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
            ${productsHtml}
          </div>
      
          <div class="mt-8 text-sm md:hidden">
          </div>
        </div>
      </div>
    `;
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Function to fetch the widget data and display it
function loadWidgetIfVisible(entries) {
    const container = document.getElementById("productcontainer");
    const isVisible = entries[0].isIntersecting;

    if (isVisible && !widgetLoaded) {
        // Call the function to fetch and display products
        fetchAndDisplayProducts();
        widgetLoaded = true;
    }
}

// Intersection Observer to load the widget when the container is visible
const productContainer = document.getElementById("productcontainer");
const observer = new IntersectionObserver(loadWidgetIfVisible, {
    root: null, // Use the viewport as the root
    rootMargin: "0px", // No margin for intersection
    threshold: 0.5, // 50% visibility threshold for loading
});
observer.observe(productContainer);


async function redirectToProduct(productId) {
    
    try {
        const apiUrl = `${redirectapiurl}?id=${productId}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data && data.url) {
            window.location.href = data.url;
        } else {
            console.error("URL not found for product ID:", productId);
        }
    } catch (error) {
        console.error("Error fetching product URL:", error);
    }
}

// Fetch and display products when the page loads
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded! 🚀");
});