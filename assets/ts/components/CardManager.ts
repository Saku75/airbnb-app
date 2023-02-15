import ApiResponse from "../types/ApiResponse";

class CardManager {
	/**
	 * @type {Element}
	 * @private
	 * @description The list element that contains the cards
	 */
	private listElement: Element;

	/**
	 * @type {number}
	 * @private
	 * @description The number of cards that have been created
	 * @default 0
	 */
	private cardCount: number = 0;

	/**
	 * @type {number}
	 * @private
	 * @description The next card number
	 */
	private nextCardNumber: number = 1;

	/**
	 * @type {number}
	 * @private
	 * @description The number of cards that have been created before looping back to the first card
	 * @default 0
	 */
	private cardCountBeforeLoop: number = 0;

	/**
	 * @type {string[]}
	 * @private
	 * @description The 3 card state classes
	 */
	private cardStateClasses: string[] = ["not-loaded", "loading", "loaded"];

	/**
	 * @type {IntersectionObserver}
	 * @private
	 * @description The IntersectionObserver instance
	 */
	private observer: IntersectionObserver;

	/**
	 * intersectionObserverOptions
	 * @type {IntersectionObserverInit}
	 * @private
	 * @description The IntersectionObserver options
	 */
	private observerOptions: IntersectionObserverInit = {
		root: null,
		rootMargin: "0px",
		threshold: 0.5,
	};

	/**
	 * @type {IntersectionObserverCallback}
	 * @private
	 * @description The IntersectionObserver callback
	 */
	private observerCallback: IntersectionObserverCallback = () => {};

	/**
	 * @param {Element} listElement The list element that contains the cards
	 * @param {number} cardCountBeforeLoop The number of cards that have been created before looping back to the first card
	 * @param {IntersectionObserverInit} observerOptions The IntersectionObserver options
	 * @param {IntersectionObserverCallback} observerCallback The IntersectionObserver callback
	 * @description Creates a new instance of the Card class
	 */
	constructor(
		listElement: Element,
		cardCountBeforeLoop: number,
		observerOptions?: IntersectionObserverInit,
		observerCallback?: IntersectionObserverCallback
	) {
		// Check if the list element is an element and set it
		if (listElement && listElement instanceof Element) {
			this.listElement = listElement;
		} else {
			throw new Error("listElement is required");
		}

		// Check if the cardCountBeforeLoop is a number and set it
		if (cardCountBeforeLoop && typeof cardCountBeforeLoop === "number") {
			this.cardCountBeforeLoop = cardCountBeforeLoop;
		} else {
			this.cardCountBeforeLoop = 0;
		}

		// Check if the observerOptions is an object and set it
		if (observerOptions && typeof observerOptions === "object") {
			this.observerOptions = observerOptions;
		} else {
			this.observerOptions = {
				root: null,
				rootMargin: "0px",
				threshold: 0.5,
			};
		}

		// Check if the observerCallback is a function and set it
		if (observerCallback && typeof observerCallback === "function") {
			this.observerCallback = observerCallback;
		} else {
			this.observerCallback = () => {};
		}

		// Create the observer
		this.observer = new IntersectionObserver(
			this.observerCallback,
			this.observerOptions
		);

		// Create the first cards
		for (let i = 0; i < 5; i++) {
			this.createCard();
		}
	}

	/**
	 * @description Creates a new card with the next card number
	 * @returns {void}
	 * @public
	 */
	public createCard(): void {
		// Increment the card count
		this.cardCount++;

		// Get the next card number
		const cardNumber = this.nextCardNumber;

		// Increment the next card number
		this.nextCardNumber++;

		// If the next card number is greater than the number of cards before looping back to the first card
		if (this.nextCardNumber > this.cardCountBeforeLoop) {
			// Set the next card number back to 1
			this.nextCardNumber = 1;
		}

		// Create the card element
		const cardElement = document.createElement("li");

		// Add the card and not-loaded classes to the card element
		cardElement.classList.add("card", this.cardStateClasses[0]);

		// Add the card number to the id data attribute
		cardElement.dataset.id = cardNumber.toString();

		// Add the card element to the list element
		this.listElement.appendChild(cardElement);

		// Observe the card element
		this.observer.observe(cardElement);
	}

	/**
	 * @param {Element} cardElement The card element
	 * @description Loads the card
	 * @returns {void}
	 * @public
	 */
	public loadCard(cardElement: HTMLElement): void {
		// Unobserve the card element
		this.observer.unobserve(cardElement);

		// Remove the not-loaded class from the card element
		cardElement.classList.remove(this.cardStateClasses[0]);

		// Add the loading class to the card element
		cardElement.classList.add(this.cardStateClasses[1]);

		// Get the card number from the id data attribute as a number
		const cardNumber = parseInt(cardElement.dataset.id!);

		// Fetch the card data from the API
		this.fetchCardData(cardNumber).then((response) => {
			// If the card data exists
			if (response) {
				// Create link element
				const linkElement = document.createElement("a");
				linkElement.href = `destination.html?id=${response.data[0].id}`;
				cardElement.appendChild(linkElement);

				// Create image element
				const imageElement = document.createElement("img");
				imageElement.src = response.data[0].image;
				linkElement.appendChild(imageElement);

				// Create title element
				const titleElement = document.createElement("h2");
				titleElement.textContent = response.data[0].title;
				linkElement.appendChild(titleElement);

				// Remove the loading class from the card element
				cardElement.classList.remove(this.cardStateClasses[1]);

				// Add the loaded class to the card element
				cardElement.classList.add(this.cardStateClasses[2]);
			}
		});
	}

	/**
	 * @param {number} cardNumber The card number
	 * @description Fetches the card data from the API
	 * @returns {Promise<{ data: string }>} The card data
	 */
	private async fetchCardData(
		cardNumber: number
	): Promise<ApiResponse | undefined> {
		// Success variable
		let success = false;

		// Try to fetch the card data from the API until it is successful
		while (!success) {
			// Wait for 1 second
			try {
				// Fetch the card data from the API
				const response = await fetch(
					`https://airbnb.lvmann.dk/api/destinations?limit=1&offset=${
						cardNumber - 1
					}`
				);

				// Get the card data from the response
				const data: ApiResponse = await response.json();

				// Set success to true
				success = true;

				// Return the card data
				return data;
			} catch (error) {
				// Set success to false
				success = false;

				// Check if there is an internet connection
				await this.checkInternetConnection();
			}
		}

		// Return undefined
		return undefined;
	}

	/**
	 * @description Checks if there is an internet connection
	 * @returns {Promise<boolean>} True if there is an internet connection, otherwise false
	 */
	private async checkInternetConnection(): Promise<boolean> {
		// Internet connection variable
		let connection = false;

		// Wait for an internet connection
		while (!connection) {
			// Check if there is an internet connection
			if (navigator.onLine) {
				// Set hasInternetConnection to true
				connection = true;
			} else {
				// Wait for 1 second
				await new Promise((resolve) => setTimeout(resolve, 1000));
			}
		}

		// Return hasInternetConnection
		return connection;
	}
}

export default CardManager;
