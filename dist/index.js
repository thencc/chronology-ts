"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chronology = void 0;
__exportStar(require("./utils"), exports); // for lib users
const Conversation_1 = require("./Conversation");
class Chronology {
    constructor(apiKey, origin = 'https://api.openai.com/v1') {
        this.convos = {}; // arr or obj?
        this.apiKey = apiKey;
        this.origin = origin;
    }
    createConversation() {
        const convo = new Conversation_1.Conversation(this.apiKey, this.origin);
        this.convos[new Date().getTime()] = convo;
        return convo;
    }
}
exports.Chronology = Chronology;
exports.default = Chronology;
//# sourceMappingURL=index.js.map