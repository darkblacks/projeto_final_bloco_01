export class EstoqueInsuficienteError extends Error {
  constructor() {
    super("Estoque insuficiente.");
    this.name = "EstoqueInsuficienteError";
  }
}