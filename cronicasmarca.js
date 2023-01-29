import cronicasActorSheet from "./modules/myActorSheet.js";
import cronicasItemSheet from "./modules/myItemSheet.js";

import { preloadHandlebarsTemplates } from "./modules/preloadTemplates.js";

Hooks.once("init", function(){
    console.log("test | Initializing Crónicas de la Marca");

    Actors.unregisterSheet("core", ActorSheet);
    Items.unregisterSheet("core", ItemSheet);
    Actors.registerSheet("cdb", cronicasActorSheet, {makeDefault: true, types: ["Aventurero"]});
    Items.registerSheet("cdb", cronicasItemSheet, {makeDefault: true, types: ["Arma"]});

    console.log("test | CHARSHEETS READY"); 

    console.log ("test | LOADING TEMPLATES");
    preloadHandlebarsTemplates();
    console.log ("test | DONE LOADING TEMPLATES");
});