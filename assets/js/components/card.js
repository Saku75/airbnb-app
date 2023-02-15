var CardManager = (function () {
    function CardManager(listElement, cardCountBeforeLoop) {
        this.cardCount = 0;
        this.cardCountBeforeLoop = 0;
        this.cardStateClasses = ["not-loaded", "loading", "loaded"];
        if (listElement && listElement instanceof Element) {
            this.listElement = listElement;
        }
        else {
            throw new Error("listElement is required");
        }
        if (cardCountBeforeLoop && typeof cardCountBeforeLoop === "number") {
            this.cardCountBeforeLoop = cardCountBeforeLoop;
        }
        else {
            this.cardCountBeforeLoop = 0;
        }
        for (var i = 0; i < 20; i++) {
            this.createCard();
        }
    }
    CardManager.prototype.createCard = function () {
        this.cardCount++;
        var cardNumber = this.cardCount;
        var card = document.createElement("li");
        card.classList.add("card");
        card.classList.add(this.cardStateClasses[0]);
        card.dataset.id = cardNumber.toString();
        this.listElement.appendChild(card);
    };
    return CardManager;
}());
export default CardManager;
//# sourceMappingURL=card.js.map