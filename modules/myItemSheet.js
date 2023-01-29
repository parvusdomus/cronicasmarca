export default class cronicasItemSheet extends ItemSheet{
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["cronicasmarca", "sheet", "item"],
      width: 600,
      height: 400,
      resizable: false
    });
  }
  get template(){
          return `systems/cronicasmarca/templates/sheets/items/${this.item.type}.html`;
      }
}
