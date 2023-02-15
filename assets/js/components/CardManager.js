var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var CardManager = (function () {
    function CardManager(listElement, cardCountBeforeLoop, observerOptions, observerCallback) {
        this.cardCount = 0;
        this.nextCardNumber = 1;
        this.cardCountBeforeLoop = 0;
        this.cardStateClasses = ["not-loaded", "loading", "loaded"];
        this.observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5,
        };
        this.observerCallback = function () { };
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
        if (observerOptions && typeof observerOptions === "object") {
            this.observerOptions = observerOptions;
        }
        else {
            this.observerOptions = {
                root: null,
                rootMargin: "0px",
                threshold: 0.5,
            };
        }
        if (observerCallback && typeof observerCallback === "function") {
            this.observerCallback = observerCallback;
        }
        else {
            this.observerCallback = function () { };
        }
        this.observer = new IntersectionObserver(this.observerCallback, this.observerOptions);
        for (var i = 0; i < 5; i++) {
            this.createCard();
        }
    }
    CardManager.prototype.createCard = function () {
        this.cardCount++;
        var cardNumber = this.nextCardNumber;
        this.nextCardNumber++;
        if (this.nextCardNumber > this.cardCountBeforeLoop) {
            this.nextCardNumber = 1;
        }
        var cardElement = document.createElement("li");
        cardElement.classList.add("card", this.cardStateClasses[0]);
        cardElement.dataset.id = cardNumber.toString();
        this.listElement.appendChild(cardElement);
        this.observer.observe(cardElement);
    };
    CardManager.prototype.loadCard = function (cardElement) {
        var _this = this;
        this.observer.unobserve(cardElement);
        cardElement.classList.remove(this.cardStateClasses[0]);
        cardElement.classList.add(this.cardStateClasses[1]);
        var cardNumber = parseInt(cardElement.dataset.id);
        this.fetchCardData(cardNumber).then(function (response) {
            if (response) {
                var linkElement = document.createElement("a");
                linkElement.href = "destination.html?id=".concat(response.data[0].id);
                cardElement.appendChild(linkElement);
                var imageElement = document.createElement("img");
                imageElement.src = response.data[0].image;
                linkElement.appendChild(imageElement);
                var titleElement = document.createElement("h2");
                titleElement.textContent = response.data[0].title;
                linkElement.appendChild(titleElement);
                cardElement.classList.remove(_this.cardStateClasses[1]);
                cardElement.classList.add(_this.cardStateClasses[2]);
            }
        });
    };
    CardManager.prototype.fetchCardData = function (cardNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var success, response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        success = false;
                        _a.label = 1;
                    case 1:
                        if (!!success) return [3, 8];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 7]);
                        return [4, fetch("https://airbnb.lvmann.dk/api/destinations?limit=1&offset=".concat(cardNumber - 1))];
                    case 3:
                        response = _a.sent();
                        return [4, response.json()];
                    case 4:
                        data = _a.sent();
                        success = true;
                        return [2, data];
                    case 5:
                        error_1 = _a.sent();
                        success = false;
                        return [4, this.checkInternetConnection()];
                    case 6:
                        _a.sent();
                        return [3, 7];
                    case 7: return [3, 1];
                    case 8: return [2, undefined];
                }
            });
        });
    };
    CardManager.prototype.checkInternetConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection = false;
                        _a.label = 1;
                    case 1:
                        if (!!connection) return [3, 5];
                        if (!navigator.onLine) return [3, 2];
                        connection = true;
                        return [3, 4];
                    case 2: return [4, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3, 1];
                    case 5: return [2, connection];
                }
            });
        });
    };
    return CardManager;
}());
export default CardManager;
//# sourceMappingURL=CardManager.js.map