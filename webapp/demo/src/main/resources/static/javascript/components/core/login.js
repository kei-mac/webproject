"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ModelLogin_1 = __importDefault(require("./model/ModelLogin"));
const demo = document.getElementById("demo");
const phrase = new ModelLogin_1.default("Hello world");
phrase.sayPhrase(demo);
//# sourceMappingURL=login.js.map