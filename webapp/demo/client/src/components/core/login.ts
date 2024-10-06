import Greeting from "./model/ModelLogin";

const demo: HTMLElement | null = document.getElementById("demo");

const phrase = new Greeting("Hello world");

phrase.sayPhrase(demo);
