//import {statRoll} from "./PJ_Rolls.js";
//import {skillRoll} from "./PJ_Rolls.js";
export default class cronicasActorSheet extends ActorSheet{
    static get defaultOptions() {
            return mergeObject(super.defaultOptions, {
                classes: ["cronicasmarca", "sheet", "actor"],
                template: "systems/cronicasmarca/templates/sheets/actors/aventurero.html",
                width: 800,
                height: 760,
                resizable: true
                //,tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".main_page", initial: "skills" }]
            });
    }

    getData() {
        const data = super.getData();
        if (this.actor.type == 'Aventurero') {
          //this._prepareCharacterItems(data);
          //this._calculaValores(data);
        }
        return data;
    }

    _prepareCharacterItems(sheetData) {
        const actorData = sheetData;
  
        // Inicializo arrays para meter los objetos por tipo.
         const Items = [];
         const Armors = [];
         const Skills = [];
         const Runes = [];
         // Ordena los objetos por tipo y los mete en el array correspondiente
        for (let i of sheetData.items) {
          let item = i.system;
          i.img = i.img || DEFAULT_TOKEN;
          if (i.type === 'Item') {
                if (Items.length < 10){
                    Items.push(i);
                }
                else
                {
                    ui.notifications.warn("You have the maximum number of items: 10. You can't add more until you delete some.");
                    this.actor.deleteEmbeddedDocuments("Item", [i._id])
                }
                
            }
          else if (i.type === 'Armor') {
                if (Armors.length < 4){
                    Armors.push(i);
                }
                else
                {
                    ui.notifications.warn("You have the maximum number of armors: 4. You can't add more until you delete some.");
                    this.actor.deleteEmbeddedDocuments("Item", [i._id])
                }
            }
           else if (i.type === "Skill") {
                if (Skills.length < 6){
                    Skills.push(i);
                }
                else
                {
                    ui.notifications.warn("You have the maximum number of skills: 7. You can't add more until you delete some.");
                    this.actor.deleteEmbeddedDocuments("Item", [i._id])
                }   
            }
            else if (i.type === "Rune") {
                if (Runes.length < 4){
                    Runes.push(i);
                }
                else
                {
                    ui.notifications.warn("You have the maximum number of runes: 4. You can't add more until you delete some.");
                    this.actor.deleteEmbeddedDocuments("Item", [i._id])
                }
               }
        }
        //Asigno cada array al actordata
        actorData.Items = Items;
        actorData.Armors = Armors;
        actorData.Skills = Skills;
        actorData.Runes = Runes;
    }

    //CALCULO LOS VALORES DE BONUS DE LAS CARACTERÍSTICAS
    _calculaValores(actorData) {
        const sheetData = actorData;
       // let Power_Bonus=0;
       
        for (let i of sheetData.items) {
            if (i.type === "Rune"){
                if (i.system.Advance == 3){
                    Power_Bonus+=Number(i.system.Bonus.Power);
                   
                }
            } else
            if (i.type === "Item" || i.type === "Armor"){
                if (i.system.Hits.value < i.system.Hits.max){
                    Power_Bonus+=Number(i.system.Bonus.Power);
                  
                }
            }
            else
            {
                Power_Bonus+=Number(i.system.Bonus.Power);
               
            }


            
        }
        //let Power_Total= Power_Bonus + Number(this.actor.system.Power.value);
        
        //this.actor.update ({ 'system.Power.bonus': Power_Bonus });
        
    }

    /*COSAS DE EVENTOS Y CLICKS VARIOS */

    activateListeners(html) {
        super.activateListeners(html);
        if (!this.options.editable) return;

        /*Modificar Stats*/
        html.find('.mod_skill').click(ev => {
            const element = ev.currentTarget;
            const dataset = element.dataset;
            const skill=dataset.skill;
            const update = {};
            update.data = {};
            var valor_actual=Number(this.actor.system[skill].value)
            var valor_minimo=Number(this.actor.system[skill].min)
            var valor_nuevo=valor_actual+1
            if (valor_nuevo>6){valor_nuevo=valor_minimo}
            const habilidad='system.'+skill+'.value'
            update[habilidad] = valor_nuevo;
            update.id = this.actor.id;
            this.actor.update(update, {diff: true});
        });
    }
}