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
          this._calculaValores(data);
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

    //CALCULO LOS VALORES DE BONUS DE LAS CARACTER??STICAS
    _calculaValores(actorData) {
        const sheetData = actorData;
        this.actor.update ({ 'system.atributos.fue.bono': this.calculaBono (this.actor.system.atributos.fue.valor)})
        this.actor.update ({ 'system.atributos.des.bono': this.calculaBono (this.actor.system.atributos.des.valor)})
        this.actor.update ({ 'system.atributos.con.bono': this.calculaBono (this.actor.system.atributos.con.valor)})
        this.actor.update ({ 'system.atributos.int.bono': this.calculaBono (this.actor.system.atributos.int.valor)})
        this.actor.update ({ 'system.atributos.sab.bono': this.calculaBono (this.actor.system.atributos.sab.valor)})
        this.actor.update ({ 'system.atributos.car.bono': this.calculaBono (this.actor.system.atributos.car.valor)})
    }
    calculaBono (atributo){
        switch(atributo){
            case 1: return -4;
            case 2:
            case 3: return -3;
            case 4:
            case 5: return -2;
            case 6:
            case 7:
            case 8: return -1;
            case 9:
            case 10:
            case 11:
            case 12: return 0;
            case 13:
            case 14:
            case 15: return 1;
            case 16:
            case 17: return 2;
            case 18:
            case 19: return 3;
            case 20:
            case 21: return 4;
            case 22:
            case 23: return 5;
            case 24:
            case 25: return 6;
            default: return 0;
        }
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