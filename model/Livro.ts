import { Produto } from "./Produto";

export class Livro extends Produto {
  constructor(
    id: number,
    nome: string,
    preco: number,
    estoque: number,
    private autor: string,
    private genero: string
  ) {
    super(id, nome, preco, estoque);
  }

  public getAutor(): string {
    return this.autor;
  }

  public setAutor(autor: string): void {
    this.autor = autor;
  }

  public getGenero(): string {
    return this.genero;
  }

  public setGenero(genero: string): void {
    this.genero = genero;
  }

  public override visualizar(): void {
    console.log("=================================");
    console.log("Produto: Livro");
    console.log(`ID: ${this.id}`);
    console.log(`Nome: ${this.nome}`);
    console.log(`Preço: R$ ${this.preco.toFixed(2)}`);
    console.log(`Estoque: ${this.estoque}`);
    console.log(`Autor: ${this.autor}`);
    console.log(`Gênero: ${this.genero}`);
  }
}