var url = "https://us-central1.gcp.data.mongodb-api.com/app/shopping-axacl/endpoint/products";
var container = document.querySelector("#widget");
var host = "http://shop.allwomenstalk.com";

var headerDiv = document.createElement("div");
headerDiv.className = "md:flex md:items-center md:justify-between";

headerDiv.innerHTML = `
  <h2 class="text-2xl font-bold tracking-tight text-white">Trending products</h2>
  <a href="${host}/collections/best-sellers" class="hidden text-sm font-medium text-pink-600 hover:text-pink-500 md:block">
    Shop the collection
    <span aria-hidden="true"> →</span>
  </a>
`;

container.appendChild(headerDiv);

var wrapperDiv = document.createElement("div");
wrapperDiv.className = "mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8";

fetch(url)
  .then(response => response.json())
  .then(data => {
    var shuffledProducts = shuffleAndSlice(data.products, 4);

    shuffledProducts.forEach(product => {
      var div = document.createElement("div");
      div.className = "group relative border rounded-md p-2 bg-white";

      div.innerHTML = `
        <div class="h-40 max-h-56 w-full overflow-hidden rounded-md bg-white group-hover:opacity-75 lg:h-72 xl:h-80">
          <img src="${product.image.src}" alt="${product.title}" class="p-4 h-full w-full object-contain object-center">
        </div>
        <h3 class="mt-4 text-sm text-gray-700 ">
          <a href="https://perfumerunway.com/products/${product._id}" class="_shopitem">
            <span class="absolute inset-0"></span>
            ${product.title}
          </a>
        </h3>
        <p class="mb-6 mt-1 text-sm text-gray-500">${product.variants[0].price}</p>
        <p class="absolute bottom-2 mt-1 text-sm font-medium text-gray-900">
          <span class="sr-only">Price</span>
          <span class="line-through opacity-50">$${product.variants[0].compare_at_price}</span>
          <span> $${product.variants[0].price}</span>
        </p>
      `;

      wrapperDiv.appendChild(div);
    });

    container.appendChild(wrapperDiv);
  })
  .catch(error => {
    console.log("Error occurred while fetching data:", error);
  });

function shuffleAndSlice(array, size) {
  var shuffled = array.slice(0);
  for (var i = shuffled.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }
  return shuffled.slice(0, size);
}
