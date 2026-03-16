import { Produto } from "../model/Produto";
import { ProdutoRepository } from "../repository/ProdutoRepository";
import { ProdutoNaoEncontradoError } from "../exception/ProdutoNaoEncontradoError";
import { EstoqueInsuficienteError } from "../exception/EstoqueInsuficienteError";

export class ProdutoController implements ProdutoRepository {
  private listaProdutos: Array<Produto> = [];

  public getProdutos(): Array<Produto> {
    return this.listaProdutos;
  }

  public procurarPorId(id: number): Produto | null {
    return this.listaProdutos.find((produto) => produto.getId() === id) ?? null;
  }

  public buscarObrigatorio(id: number): Produto {
    const produto = this.procurarPorId(id);

    if (!produto) {
      throw new ProdutoNaoEncontradoError();
    }

    return produto;
  }

  public listarTodos(): void {
    if (this.listaProdutos.length === 0) {
      console.log("\nNenhum produto cadastrado.");
      return;
    }

    for (const produto of this.listaProdutos) {
      produto.visualizar();
    }
  }

  public cadastrar(produto: Produto): void {
    this.listaProdutos.push(produto);
  }

  public atualizar(produto: Produto): void {
    const indice = this.listaProdutos.findIndex(
      (item) => item.getId() === produto.getId()
    );

    if (indice === -1) {
      throw new ProdutoNaoEncontradoError();
    }

    this.listaProdutos[indice] = produto;
  }

  public deletar(id: number): void {
    const indice = this.listaProdutos.findIndex(
      (produto) => produto.getId() === id
    );

    if (indice === -1) {
      throw new ProdutoNaoEncontradoError();
    }

    this.listaProdutos.splice(indice, 1);
  }

  public comprar(id: number, quantidade: number): void {
    const produto = this.buscarObrigatorio(id);

    if (quantidade <= 0) {
      throw new Error("A quantidade precisa ser maior que zero.");
    }

    if (produto.getEstoque() < quantidade) {
      throw new EstoqueInsuficienteError();
    }

    produto.setEstoque(produto.getEstoque() - quantidade);
  }
}