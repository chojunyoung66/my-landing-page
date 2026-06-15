import { Injector } from "./injector.js";

const injector = new Injector();
const rootScreen = injector.inject();
rootScreen.run();
