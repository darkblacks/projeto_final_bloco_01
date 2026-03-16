import { Produto } from "./Produto";
import { Usavel } from "./Usavel";

export class Eletronico extends Produto implements Usavel {
  constructor(
    id: number,
    nome: string,
    preco: number,
    estoque: number,
    private marca: string,
    private uso: string
  ) {
    super(id, nome, preco, estoque);
  }

  public getMarca(): string {
    return this.marca;
  }

  public setMarca(marca: string): void {
    this.marca = marca;
  }

  public getUso(): string {
    return this.uso;
  }

  public setUso(uso: string): void {
    this.uso = uso;
  }

  public override visualizar(): void {
    console.log("=================================");
    console.log("Produto: Eletrônico");
    console.log(`ID: ${this.id}`);
    console.log(`Nome: ${this.nome}`);
    console.log(`Preço: R$ ${this.preco.toFixed(2)}`);
    console.log(`Estoque: ${this.estoque}`);
    console.log(`Marca: ${this.marca}`);
    console.log(`Uso: ${this.uso}`);
  }
}