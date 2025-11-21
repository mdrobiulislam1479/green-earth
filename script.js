// add loading spinner
const loadingSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("plants").classList.add("hidden");
  } else {
    document.getElementById("plants").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};
// categories funtionality
const categories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories));
};
categories();
const displayCatagories = (categories) => {
  const ul = document.getElementById("categories");
  ul.innerHTML = `
            <li
              class="hover:bg-[#15803D] hover:text-white pl-[10px] py-2 rounded-lg font-medium cursor-pointer duration-400" id="all-trees" onclick="allPlants(); allTrees(); "
            >
              <button >All Trees</button>
            </li>
  `;
  categories.forEach((element) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <li
              class="hover:bg-[#15803D] hover:text-white pl-[10px] py-2 rounded-lg font-medium cursor-pointer category-btn duration-400" onclick="category(${element.id})"
              id="category(${element.id})"
            >
              <button >${element.category_name}</button>
            </li>
    `;
    ul.appendChild(li);
  });
  allTrees();
};
// all plants functionality
const allPlants = () => {
  loadingSpinner(true);
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => displayAllPlants(data.plants));
};
allPlants();
const displayAllPlants = (plants) => {
  const plantsDiv = document.getElementById("plants");
  plantsDiv.innerHTML = "";
  plants.forEach((element) => {
    const plantDiv = document.createElement("div");
    plantDiv.innerHTML = `
          <div
              class="bg-white p-4 rounded-lg space-y-3 shadow hover:shadow-lg"
            >
              <img
                src="${element.image}"
                alt=""
                class="h-[220px] rounded-lg w-full object-cover"
              />
              <p class="font-semibold cursor-pointer text-xl" onclick="plantsDetails(${element.id})">${element.name}</p>
              <p class="text-justify text-sm opacity-80 line-clamp-3">
                ${element.description}
              </p>
              <div class="flex justify-between">
                <p class="px-3 py-1 bg-[#DCFCE7] text-[#15803D] rounded-2xl">
                  ${element.category}
                </p>
                <p class="font-semibold">৳${element.price}</p>
              </div>
              <button class="w-full bg-[#15803D] border border-[#15803D] hover:bg-transparent hover:text-[#15803D] py-3 text-white rounded-3xl duration-400" onclick="addCart(${element.id})">
                Add to Cart
              </button>
            </div>
    `;
    plantsDiv.appendChild(plantDiv);
  });
  loadingSpinner(false);
};
// display only clicked category plants and add active class
const category = (id) => {
  loadingSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const catagoryBtn = document.getElementById(`category(${id})`);
      removeClassAllTrees();
      removeClass();
      catagoryBtn.classList.add("active");
      displayCategoryPlant(data.plants);
    });
};
// displayCatagories plants functionality
const displayCategoryPlant = (selectCategory) => {
  const plantsDiv = document.getElementById("plants");
  plantsDiv.innerHTML = "";
  selectCategory.forEach((element) => {
    const plantDiv = document.createElement("div");
    plantDiv.innerHTML = `
            <div
              class="bg-white p-4 rounded-lg space-y-3 shadow hover:shadow-lg"
            >
              <img
                src="${element.image}"
                alt=""
                class="h-[220px] rounded-lg w-full object-cover"
              />
              <p class="font-semibold">${element.name}</p>
              <p class="text-justify text-sm opacity-80 line-clamp-3">
                ${element.description}
              </p>
              <div class="flex justify-between">
                <p class="px-3 py-1 bg-[#DCFCE7] text-[#15803D] rounded-2xl">
                  ${element.category}
                </p>
                <p class="font-semibold">৳${element.price}</p>
              </div>
              <button class="w-full bg-[#15803D] py-3 text-white rounded-3xl" onclick="addCart(${element.id})">
                Add to Cart
              </button>
            </div>
    `;
    plantsDiv.appendChild(plantDiv);
  });
  loadingSpinner(false);
};
// remove active class
const removeClass = () => {
  const catagoryBtn = document.querySelectorAll(".category-btn");
  catagoryBtn.forEach((btn) => btn.classList.remove("active"));
};
// all trees add and remove active class
const allTrees = () => {
  removeClass();
  const allTreesBtn = document.getElementById("all-trees");
  allTreesBtn.classList.add("active");
};
const removeClassAllTrees = () => {
  const allTreesBtn = document.getElementById("all-trees");
  allTreesBtn.classList.remove("active");
};
// plants details show
const plantsDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((data) => displayPlantsDetails(data.plants));
};
const displayPlantsDetails = (details) => {
  const detail = document.getElementById("details");
  detail.innerHTML = `
          <p class="text-2xl font-bold">${details.name}</p>
          <img
            src="${details.image}"
            alt=""
            class="h-[300px] rounded-lg w-full object-cover"
          />
          <p class="text-lg"><span class="font-bold">Category:</span> ${details.category}</p>
          <p class="text-lg"><span class="font-bold">Price:</span> ৳${details.price}</p>
          <p class="text-lg text-justify">
            ${details.description}
          </p>
  `;
  document.getElementById("my_modal_5").showModal();
};
// add to cart functionality
const addCart = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((data) => displayAddCart(data.plants));
};
const displayAddCart = (data) => {
  alert(`${data.name} has been added to the cart.`);
  const cartSection = document.getElementById("cart");
  const addItems = document.createElement("div");
  addItems.innerHTML = `
          <div
            class="flex justify-between items-center mb-2 bg-[#F0FDF4] px-3 py-2 rounded-lg shadow" id="item${data.id}"
          >
            <div>
              <p class="font-semibold mb-1 text-[#1F2937]">${data.name}</p>
              <p class="text-[#8C8C8C]" >৳<span id="price${data.id}">${data.price}</span> x 1</p>
            </div>
            <button class="text-red-500 cursor-pointer" onclick="clearItem(${data.id})">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
  `;
  cartSection.appendChild(addItems);
  const amountText = document.getElementById("total-amount");
  const amount = amountText.innerText;
  const totalAmount = Number(amount) + Number(data.price);
  amountText.innerText = totalAmount;
};
// item clear functionality
const clearItem = (id) => {
  const item = document.getElementById(`item${id}`);
  console.log(item);
  if (item) {
    const itemP = document.getElementById(`price${id}`);
    const itemPrice = itemP.innerText;
    const amountText = document.getElementById("total-amount");
    const amount = amountText.innerText;
    const totalAmount = Number(amount) - Number(itemPrice);
    amountText.innerText = totalAmount;
    item.remove();
  }
};
