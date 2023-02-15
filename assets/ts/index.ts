import CardManager from "./components/CardManager.js";

// Get the list element that contains the cards
const listElement = document.querySelector(".card-list");

fetch("https://airbnb.lvmann.dk/api/destinations/count").then((response) => {
	response.json().then((data) => {
		// Create a new instance of the CardManager class
		if (listElement) {
			const cardManager = new CardManager(
				listElement,
				data.data,
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
	});
});
