import { Produto } from "./Produto";
import { Usavel } from "./Usavel";

export class ProdutoEscritorio extends Produto implements Usavel {
  constructor(
    id: number,
    nome: string,
    preco: number,
    estoque: number,
    private marca: string,
    private uso: string,
    private descricao: string
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

  public getDescricao(): string {
    return this.descricao;
  }

  public setDescricao(descricao: string): void {
    this.descricao = descricao;
  }

  public override visualizar(): void {
    console.log("=================================");
    console.log("Produto: Produto de Escritório");
    console.log(`ID: ${this.id}`);
    console.log(`Nome: ${this.nome}`);
    console.log(`Preço: R$ ${this.preco.toFixed(2)}`);
    console.log(`Estoque: ${this.estoque}`);
    console.log(`Marca: ${this.marca}`);
    console.log(`Uso: ${this.uso}`);
    console.log(`Descrição: ${this.descricao}`);
  }
}