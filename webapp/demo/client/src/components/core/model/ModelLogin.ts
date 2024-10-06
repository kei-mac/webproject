export default class ModelLogin {
    phrase: string;

    constructor(phrase: string) {
        this.phrase = phrase
    }

    public sayPhrase(element: HTMLElement | null) {
        if (element) {
            element.innerText = this.phrase
        }
    }
}
