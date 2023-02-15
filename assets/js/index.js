import CardManager from "./components/CardManager.js";
var listElement = document.querySelector(".card-list");
if (listElement) {
    var cardManager_1 = new CardManager(listElement, 15, {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    }, function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                cardManager_1.createCard();
                cardManager_1.loadCard(entry.target);
            }
        });
    });
}
//# sourceMappingURL=index.js.map