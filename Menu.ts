import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import {
  branco,
  azul,
  verde,
  vermelho,
  amarelo,
  cabecalho,
  pausaVisual,
  linha
} from "./comandtext";
import { ProdutoController } from "./controller/ProdutoController";
import { Livro } from "./model/Livro";
import { ProdutoEscritorio } from "./model/ProdutoEscritorio";
import { Eletronico } from "./model/Eletronico";

/* =========================
   VARIÁVEIS E CONSTANTES GLOBAIS
========================= */

const leia = readline.createInterface({ input, output });
const produtoController = new ProdutoController();

let opcaoPrincipal: string = "";
let opcaoUsuario: string = "";
let opcaoAdm: string = "";
let opcaoEditar: string = "";
let opcaoEditarBase: string = "";
let opcaoEditarConteudo: string = "";
let idProdutoEdicao: number = 0;
let proximoId: number = 1;

type CompraRealizada = {
  idProduto: number;
  nomeProduto: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
};

const historicoCompras: CompraRealizada[] = [];
let gastoTotal: number = 0;

/* =========================
   FUNÇÕES AUXILIARES
========================= */

async function aguardarEnter(): Promise<void> {
  await leia.question(amarelo("\nPressione ENTER para continuar... "));
}

async function lerNumero(mensagem: string): Promise<number> {
  const valor = Number(await leia.question(azul(mensagem)));

  if (isNaN(valor)) {
    throw new Error("Digite um número válido.");
  }

  return valor;
}

async function lerTexto(mensagem: string): Promise<string> {
  const texto = (await leia.question(azul(mensagem))).trim();

  if (texto === "") {
    throw new Error("O campo não pode ficar vazio.");
  }

  return texto;
}

async function perguntarSimOuNao(mensagem: string): Promise<string> {
  let resposta = "";

  do {
    resposta = (await leia.question(amarelo(mensagem))).trim().toUpperCase();

    if (resposta !== "S" && resposta !== "N") {
      console.log(vermelho("\nDigite apenas S para sim ou N para não."));
    }
  } while (resposta !== "S" && resposta !== "N");

  return resposta;
}

/* =========================
   TELA INICIAL
========================= */

function telaBoasVindas(): void {
  cabecalho("livrariatech.com", "Livros, escritório e tecnologia em um só lugar");
  console.log(branco("Bem-vinda ao terminal da livrariatech.com."));
  console.log(branco("Aqui conhecimento, produtividade e tecnologia andam juntos."));
  console.log("");
  console.log(verde("Destaques da loja:"));
  console.log(branco("- Livros para estudo, carreira e lazer"));
  console.log(branco("- Itens de escritório para organizar sua rotina"));
  console.log(branco("- Eletrônicos para turbinar sua produtividade"));
  pausaVisual();
  console.log(branco("01 - Entrar como Usuário"));
  console.log(branco("02 - Entrar como Administrador"));
  console.log(vermelho("00 - Sair"));
  linha();
}

/* =========================
   MENU USUÁRIO
========================= */

function menuUsuario(): void {
  cabecalho("ÁREA DO USUÁRIO", "Navegue, descubra e compre");
  console.log(branco("01 - Ver catálogo"));
  console.log(branco("02 - Comprar produto"));
  console.log(branco("03 - Buscar produto por ID"));
  console.log(branco("04 - Ver produtos comprados"));
  console.log(amarelo("09 - Voltar"));
  console.log(vermelho("00 - Sair"));
  linha();
}

function exibirCatalogo(): void {
  cabecalho("CATÁLOGO", "Produtos disponíveis na livrariatech.com");

  const produtos = produtoController.getProdutos();

  if (produtos.length === 0) {
    console.log(amarelo("\nNenhum produto cadastrado no momento."));
    return;
  }

  for (const produto of produtos) {
    produto.visualizar();
  }
}

function exibirComprasRealizadas(): void {
  cabecalho("PRODUTOS COMPRADOS", "Histórico de compras do usuário");

  if (historicoCompras.length === 0) {
    console.log(amarelo("\nNenhuma compra foi realizada até o momento."));
    return;
  }

  for (const compra of historicoCompras) {
    console.log(branco(`ID do Produto: ${compra.idProduto}`));
    console.log(branco(`Nome: ${compra.nomeProduto}`));
    console.log(branco(`Quantidade: ${compra.quantidade}`));
    console.log(branco(`Preço Unitário: R$ ${compra.precoUnitario.toFixed(2)}`));
    console.log(branco(`Subtotal: R$ ${compra.subtotal.toFixed(2)}`));
    pausaVisual();
  }

  console.log(verde(`\nGasto total acumulado: R$ ${gastoTotal.toFixed(2)}`));
}

async function comprarProduto(): Promise<void> {
  cabecalho("COMPRA", "Fluxo do usuário");

  try {
    const id = await lerNumero("Digite o ID do produto: ");
    const quantidade = await lerNumero("Digite a quantidade: ");

    const produto = produtoController.buscarObrigatorio(id);
    produtoController.comprar(id, quantidade);

    const subtotal = produto.getPreco() * quantidade;

    historicoCompras.push({
      idProduto: produto.getId(),
      nomeProduto: produto.getNome(),
      quantidade,
      precoUnitario: produto.getPreco(),
      subtotal
    });

    gastoTotal += subtotal;

    console.log(verde("\nCompra concluída com sucesso."));
    console.log(branco(`Produto: ${produto.getNome()}`));
    console.log(branco(`Quantidade: ${quantidade}`));
    console.log(branco(`Subtotal da compra: R$ ${subtotal.toFixed(2)}`));
    console.log(verde(`Gasto total acumulado: R$ ${gastoTotal.toFixed(2)}`));
  } catch (error: any) {
    console.log(vermelho(`\nErro: ${error.message}`));
  }

  await aguardarEnter();
}

async function buscarProdutoPorId(): Promise<void> {
  cabecalho("BUSCA DE PRODUTO", "Encontre rapidamente o que deseja");

  try {
    const id = await lerNumero("Digite o ID do produto: ");
    const produto = produtoController.buscarObrigatorio(id);

    console.log(verde("\nProduto localizado com sucesso."));
    produto.visualizar();
  } catch (error: any) {
    console.log(vermelho(`\nErro: ${error.message}`));
  }

  await aguardarEnter();
}

async function areaUsuario(): Promise<void> {
  do {
    menuUsuario();
    opcaoUsuario = await leia.question(azul("Escolha uma opção: "));

    try {
      switch (opcaoUsuario) {
        case "01":
          exibirCatalogo();
          await aguardarEnter();
          break;
        case "02":
          await comprarProduto();
          break;
        case "03":
          await buscarProdutoPorId();
          break;
        case "04":
          exibirComprasRealizadas();
          await aguardarEnter();
          break;
        case "09":
          console.log(amarelo("\nVoltando ao menu principal..."));
          break;
        case "00":
          console.log(vermelho("\nSistema encerrado."));
          break;
        default:
          console.log(vermelho("\nOpção inválida."));
          await aguardarEnter();
      }
    } catch {
      console.log(vermelho("\nErro inesperado na área do usuário."));
      await aguardarEnter();
    }
  } while (opcaoUsuario !== "09" && opcaoUsuario !== "00");
}

/* =========================
   MENU ADMINISTRADOR
========================= */

function menuAdministrador(): void {
  cabecalho("ÁREA DO ADMINISTRADOR", "Gerencie o catálogo da loja");
  console.log(branco("01 - Adicionar produto"));
  console.log(branco("02 - Remover produto"));
  console.log(branco("03 - Editar produto"));
  console.log(amarelo("09 - Voltar"));
  console.log(vermelho("00 - Sair"));
  linha();
}

async function adicionarProduto(): Promise<void> {
  let desejaContinuar = "S";

  do {
    cabecalho("ADICIONAR PRODUTO", "Cadastro inicial");
    console.log(branco("01 - Livro"));
    console.log(branco("02 - Produto de Escritório"));
    console.log(branco("03 - Eletrônico"));
    pausaVisual();

    try {
      const tipo = await leia.question(azul("Escolha o tipo do produto: "));
      const nome = await lerTexto("Nome do produto: ");
      const preco = await lerNumero("Preço: ");
      const estoque = await lerNumero("Estoque: ");

      switch (tipo) {
        case "01": {
          const autor = await lerTexto("Autor: ");
          const genero = await lerTexto("Gênero: ");

          const livro = new Livro(
            proximoId++,
            nome,
            preco,
            estoque,
            autor,
            genero
          );

          produtoController.cadastrar(livro);
          console.log(verde("\nLivro cadastrado com sucesso."));
          break;
        }

        case "02": {
          const marca = await lerTexto("Marca: ");
          const uso = await lerTexto("Uso: ");
          const descricao = await lerTexto("Descrição: ");

          const produtoEscritorio = new ProdutoEscritorio(
            proximoId++,
            nome,
            preco,
            estoque,
            marca,
            uso,
            descricao
          );

          produtoController.cadastrar(produtoEscritorio);
          console.log(verde("\nProduto de Escritório cadastrado com sucesso."));
          break;
        }

        case "03": {
          const marca = await lerTexto("Marca: ");
          const uso = await lerTexto("Uso: ");

          const eletronico = new Eletronico(
            proximoId++,
            nome,
            preco,
            estoque,
            marca,
            uso
          );

          produtoController.cadastrar(eletronico);
          console.log(verde("\nEletrônico cadastrado com sucesso."));
          break;
        }

        default:
          throw new Error("Tipo de produto inválido.");
      }
    } catch (error: any) {
      console.log(vermelho(`\nErro: ${error.message}`));
    }

    desejaContinuar = await perguntarSimOuNao("\nQuer adicionar um novo produto? (S/N): ");
  } while (desejaContinuar === "S");

  await aguardarEnter();
}

async function removerProduto(): Promise<void> {
  cabecalho("REMOVER PRODUTO", "Remoção do catálogo");

  try {
    const id = await lerNumero("Digite o ID do produto que deseja remover: ");
    produtoController.deletar(id);

    console.log(verde("\nProduto removido com sucesso."));
  } catch (error: any) {
    console.log(vermelho(`\nErro: ${error.message}`));
  }

  await aguardarEnter();
}

/* =========================
   EDIÇÃO DE PRODUTO
========================= */

function menuEditarProduto(): void {
  cabecalho("EDITAR PRODUTO", "Escolha o tipo de edição");
  console.log(branco("01 - Editar dados base do produto"));
  console.log(branco("02 - Editar conteúdo do produto"));
  console.log(amarelo("09 - Voltar"));
  console.log(vermelho("00 - Sair"));
  linha();
}

function menuEditarBase(): void {
  cabecalho("EDITAR DADOS BASE", "Campos comuns a qualquer produto");
  console.log(branco("01 - Nome do Produto"));
  console.log(branco("02 - Preço"));
  console.log(branco("03 - Estoque"));
  console.log(amarelo("09 - Voltar"));
  console.log(vermelho("00 - Sair"));
  linha();
}

function menuEditarConteudo(): void {
  cabecalho("EDITAR CONTEÚDO DO PRODUTO", "Campos que mudam conforme a classe");
  console.log(branco("01 - Conteúdo de Livro"));
  console.log(branco("02 - Conteúdo de Produto de Escritório"));
  console.log(branco("03 - Conteúdo de Eletrônico"));
  console.log(amarelo("09 - Voltar"));
  console.log(vermelho("00 - Sair"));
  linha();
}

function menuConteudoLivro(): void {
  cabecalho("EDITAR LIVRO", "Atributos específicos da classe Livro");
  console.log(branco("01 - Autor"));
  console.log(branco("02 - Gênero"));
  console.log(amarelo("09 - Voltar"));
  console.log(vermelho("00 - Sair"));
  linha();
}

function menuConteudoEscritorio(): void {
  cabecalho("EDITAR PRODUTO DE ESCRITÓRIO", "Atributos específicos da classe ProdutoEscritorio");
  console.log(branco("01 - Marca"));
  console.log(branco("02 - Uso"));
  console.log(branco("03 - Descrição"));
  console.log(amarelo("09 - Voltar"));
  console.log(vermelho("00 - Sair"));
  linha();
}

function menuConteudoEletronico(): void {
  cabecalho("EDITAR ELETRÔNICO", "Atributos específicos da classe Eletronico");
  console.log(branco("01 - Marca"));
  console.log(branco("02 - Uso"));
  console.log(amarelo("09 - Voltar"));
  console.log(vermelho("00 - Sair"));
  linha();
}

async function selecionarProdutoParaEdicao(): Promise<void> {
  cabecalho("SELEÇÃO DE PRODUTO", "Escolha o produto que deseja editar");

  try {
    const id = await lerNumero("Digite o ID do produto: ");
    const produto = produtoController.buscarObrigatorio(id);

    idProdutoEdicao = id;

    console.log(verde("\nProduto selecionado com sucesso."));
    produto.visualizar();
  } catch (error: any) {
    console.log(vermelho(`\nErro: ${error.message}`));
    idProdutoEdicao = 0;
  }

  await aguardarEnter();
}

async function fluxoEditarBase(): Promise<void> {
  do {
    menuEditarBase();
    opcaoEditarBase = await leia.question(azul("Escolha uma opção: "));

    try {
      const produto = produtoController.buscarObrigatorio(idProdutoEdicao);

      switch (opcaoEditarBase) {
        case "01": {
          const novoNome = await lerTexto("Novo nome: ");
          produto.setNome(novoNome);
          produtoController.atualizar(produto);
          console.log(verde("\nNome atualizado com sucesso."));
          await aguardarEnter();
          break;
        }
        case "02": {
          const novoPreco = await lerNumero("Novo preço: ");
          produto.setPreco(novoPreco);
          produtoController.atualizar(produto);
          console.log(verde("\nPreço atualizado com sucesso."));
          await aguardarEnter();
          break;
        }
        case "03": {
          const novoEstoque = await lerNumero("Novo estoque: ");
          produto.setEstoque(novoEstoque);
          produtoController.atualizar(produto);
          console.log(verde("\nEstoque atualizado com sucesso."));
          await aguardarEnter();
          break;
        }
        case "09":
          break;
        case "00":
          console.log(vermelho("\nSistema encerrado."));
          break;
        default:
          console.log(vermelho("\nOpção inválida."));
          await aguardarEnter();
      }
    } catch (error: any) {
      console.log(vermelho(`\nErro: ${error.message}`));
      await aguardarEnter();
    }
  } while (opcaoEditarBase !== "09" && opcaoEditarBase !== "00");
}

async function fluxoConteudoLivro(): Promise<void> {
  let opcao = "";

  do {
    menuConteudoLivro();
    opcao = await leia.question(azul("Escolha uma opção: "));

    try {
      const produto = produtoController.buscarObrigatorio(idProdutoEdicao);

      if (!(produto instanceof Livro)) {
        throw new Error("O produto selecionado não é um Livro.");
      }

      switch (opcao) {
        case "01": {
          const autor = await lerTexto("Novo autor: ");
          produto.setAutor(autor);
          produtoController.atualizar(produto);
          console.log(verde("\nAutor atualizado com sucesso."));
          await aguardarEnter();
          break;
        }
        case "02": {
          const genero = await lerTexto("Novo gênero: ");
          produto.setGenero(genero);
          produtoController.atualizar(produto);
          console.log(verde("\nGênero atualizado com sucesso."));
          await aguardarEnter();
          break;
        }
        case "09":
          break;
        case "00":
          console.log(vermelho("\nSistema encerrado."));
          break;
        default:
          console.log(vermelho("\nOpção inválida."));
          await aguardarEnter();
      }
    } catch (error: any) {
      console.log(vermelho(`\nErro: ${error.message}`));
      await aguardarEnter();
    }
  } while (opcao !== "09" && opcao !== "00");
}

async function fluxoConteudoEscritorio(): Promise<void> {
  let opcao = "";

  do {
    menuConteudoEscritorio();
    opcao = await leia.question(azul("Escolha uma opção: "));

    try {
      const produto = produtoController.buscarObrigatorio(idProdutoEdicao);

      if (!(produto instanceof ProdutoEscritorio)) {
        throw new Error("O produto selecionado não é um Produto de Escritório.");
      }

      switch (opcao) {
        case "01": {
          const marca = await lerTexto("Nova marca: ");
          produto.setMarca(marca);
          produtoController.atualizar(produto);
          console.log(verde("\nMarca atualizada com sucesso."));
          await aguardarEnter();
          break;
        }
        case "02": {
          const uso = await lerTexto("Novo uso: ");
          produto.setUso(uso);
          produtoController.atualizar(produto);
          console.log(verde("\nUso atualizado com sucesso."));
          await aguardarEnter();
          break;
        }
        case "03": {
          const descricao = await lerTexto("Nova descrição: ");
          produto.setDescricao(descricao);
          produtoController.atualizar(produto);
          console.log(verde("\nDescrição atualizada com sucesso."));
          await aguardarEnter();
          break;
        }
        case "09":
          break;
        case "00":
          console.log(vermelho("\nSistema encerrado."));
          break;
        default:
          console.log(vermelho("\nOpção inválida."));
          await aguardarEnter();
      }
    } catch (error: any) {
      console.log(vermelho(`\nErro: ${error.message}`));
      await aguardarEnter();
    }
  } while (opcao !== "09" && opcao !== "00");
}

async function fluxoConteudoEletronico(): Promise<void> {
  let opcao = "";

  do {
    menuConteudoEletronico();
    opcao = await leia.question(azul("Escolha uma opção: "));

    try {
      const produto = produtoController.buscarObrigatorio(idProdutoEdicao);

      if (!(produto instanceof Eletronico)) {
        throw new Error("O produto selecionado não é um Eletrônico.");
      }

      switch (opcao) {
        case "01": {
          const marca = await lerTexto("Nova marca: ");
          produto.setMarca(marca);
          produtoController.atualizar(produto);
          console.log(verde("\nMarca atualizada com sucesso."));
          await aguardarEnter();
          break;
        }
        case "02": {
          const uso = await lerTexto("Novo uso: ");
          produto.setUso(uso);
          produtoController.atualizar(produto);
          console.log(verde("\nUso atualizado com sucesso."));
          await aguardarEnter();
          break;
        }
        case "09":
          break;
        case "00":
          console.log(vermelho("\nSistema encerrado."));
          break;
        default:
          console.log(vermelho("\nOpção inválida."));
          await aguardarEnter();
      }
    } catch (error: any) {
      console.log(vermelho(`\nErro: ${error.message}`));
      await aguardarEnter();
    }
  } while (opcao !== "09" && opcao !== "00");
}

async function fluxoEditarConteudo(): Promise<void> {
  do {
    menuEditarConteudo();
    opcaoEditarConteudo = await leia.question(azul("Escolha uma opção: "));

    try {
      switch (opcaoEditarConteudo) {
        case "01":
          await fluxoConteudoLivro();
          break;
        case "02":
          await fluxoConteudoEscritorio();
          break;
        case "03":
          await fluxoConteudoEletronico();
          break;
        case "09":
          break;
        case "00":
          console.log(vermelho("\nSistema encerrado."));
          break;
        default:
          console.log(vermelho("\nOpção inválida."));
          await aguardarEnter();
      }
    } catch {
      console.log(vermelho("\nErro ao editar conteúdo do produto."));
      await aguardarEnter();
    }
  } while (opcaoEditarConteudo !== "09" && opcaoEditarConteudo !== "00");
}

async function editarProduto(): Promise<void> {
  await selecionarProdutoParaEdicao();

  if (idProdutoEdicao === 0) {
    return;
  }

  do {
    menuEditarProduto();
    opcaoEditar = await leia.question(azul("Escolha uma opção: "));

    try {
      switch (opcaoEditar) {
        case "01":
          await fluxoEditarBase();
          break;
        case "02":
          await fluxoEditarConteudo();
          break;
        case "09":
          console.log(amarelo("\nVoltando ao menu do administrador..."));
          break;
        case "00":
          console.log(vermelho("\nSistema encerrado."));
          break;
        default:
          console.log(vermelho("\nOpção inválida."));
          await aguardarEnter();
      }
    } catch {
      console.log(vermelho("\nErro durante a edição do produto."));
      await aguardarEnter();
    }
  } while (opcaoEditar !== "09" && opcaoEditar !== "00");
}

async function areaAdministrador(): Promise<void> {
  do {
    menuAdministrador();
    opcaoAdm = await leia.question(azul("Escolha uma opção: "));

    try {
      switch (opcaoAdm) {
        case "01":
          await adicionarProduto();
          break;
        case "02":
          await removerProduto();
          break;
        case "03":
          await editarProduto();
          break;
        case "09":
          console.log(amarelo("\nVoltando ao menu principal..."));
          break;
        case "00":
          console.log(vermelho("\nSistema encerrado."));
          break;
        default:
          console.log(vermelho("\nOpção inválida."));
          await aguardarEnter();
      }
    } catch {
      console.log(vermelho("\nErro inesperado na área do administrador."));
      await aguardarEnter();
    }
  } while (opcaoAdm !== "09" && opcaoAdm !== "00");
}

/* =========================
   FUNÇÃO PRINCIPAL
========================= */

async function main(): Promise<void> {
  do {
    telaBoasVindas();
    opcaoPrincipal = await leia.question(azul("Escolha uma opção: "));

    try {
      switch (opcaoPrincipal) {
        case "01":
          await areaUsuario();
          break;
        case "02":
          await areaAdministrador();
          break;
        case "00":
          cabecalho("livrariatech.com", "Sessão encerrada");
          console.log(verde("Obrigada por utilizar nosso terminal."));
          console.log(branco("Até a próxima leitura, compra ou upgrade de produtividade."));
          break;
        default:
          console.log(vermelho("\nOpção inválida. Digite 01, 02 ou 00."));
          await aguardarEnter();
      }
    } catch {
      console.log(vermelho("\nErro inesperado no menu principal."));
      await aguardarEnter();
    }
  } while (opcaoPrincipal !== "00");

  leia.close();
}

main();