import CardManager from "./components/CardManager.js";

// Get the list element that contains the cards
const listElement = document.querySelector(".card-list");

// Create a new instance of the CardManager class
if (listElement) {
	const cardManager = new CardManager(
		listElement,
		15,
		{
			root: null,
			rootMargin: "0px",
			threshold: 0.1,
		},
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					// Create a new card
					cardManager.createCard();

					// Load the card
					cardManager.loadCard(entry.target as HTMLElement);
				}
			});
		}
	);
}

// fetch(
	// `https://airbnb.lvmann.dk/api/destinations?limit=1&offset=${
	// 	cardNumber - 1
	// }`
// ).then((response) => {
// 	// If the response is ok
// 	if (response.ok) {
// 		// Parse the response as JSON
// 		response.json().then((data: ApiResponse) => {
// 			// Create link element
// 			const linkElement = document.createElement("a");
// 			linkElement.href = `destination.html?id=${data.data[0].id}`;
// 			cardElement.appendChild(linkElement);

// 			// Create image element
// 			const imageElement = document.createElement("img");
// 			imageElement.src = data.data[0].image;
// 			linkElement.appendChild(imageElement);

// 			// Create title element
// 			const titleElement = document.createElement("h2");
// 			titleElement.textContent = data.data[0].title;
// 			linkElement.appendChild(titleElement);

// 			// Remove the loading class from the card element
// 			cardElement.classList.remove(this.cardStateClasses[1]);

// 			// Add the loaded class to the card element
// 			cardElement.classList.add(this.cardStateClasses[2]);
// 		});
// 	}
// });
