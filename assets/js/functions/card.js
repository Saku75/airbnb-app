"use strict";
var Card = (function () {
    function Card(listElement, cardCountBeforeLoop) {
        this.cardCount = 0;
        this.cardCountBeforeLoop = 0;
        if (listElement && listElement instanceof HTMLElement) {
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
    Card.prototype.createCard = function () {
        this.cardCount++;
        var cardNumber = this.cardCount;
        var card = document.createElement("li");
        card.classList.add("card");
        card.dataset.id = cardNumber.toString();
        this.listElement.appendChild(card);
    };
    return Card;
}());
//# sourceMappingURL=card.js.map