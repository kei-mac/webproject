"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ModelLogin {
    constructor(phrase) {
        this.phrase = phrase;
    }
    sayPhrase(element) {
        if (element) {
            element.innerText = this.phrase;
        }
    }
}
exports.default = ModelLogin;
//# sourceMappingURL=ModelLogin.js.map