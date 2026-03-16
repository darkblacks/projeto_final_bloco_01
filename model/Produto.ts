export abstract class Produto {
  constructor(
    protected id: number,
    protected nome: string,
    protected preco: number,
    protected estoque: number
  ) {}

  public getId(): number {
    return this.id;
  }

  public getNome(): string {
    return this.nome;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public getPreco(): number {
    return this.preco;
  }

  public setPreco(preco: number): void;
  public setPreco(preco: string): void;
  public setPreco(preco: number | string): void {
    const valor = typeof preco === "string" ? Number(preco) : preco;

    if (isNaN(valor) || valor <= 0) {
      throw new Error("Preço inválido.");
    }

    this.preco = valor;
  }

  public getEstoque(): number {
    return this.estoque;
  }

  public setEstoque(estoque: number): void;
  public setEstoque(estoque: string): void;
  public setEstoque(estoque: number | string): void {
    const valor = typeof estoque === "string" ? Number(estoque) : estoque;

    if (isNaN(valor) || valor < 0) {
      throw new Error("Estoque inválido.");
    }

    this.estoque = valor;
  }

  public abstract visualizar(): void;
}