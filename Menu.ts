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
  linha,
  emBreve
} from "./comandtext";

/* =========================
   VARIÁVEIS E CONSTANTES GLOBAIS
========================= */

const leia = readline.createInterface({ input, output });

let opcaoPrincipal: string = "";
let opcaoUsuario: string = "";
let opcaoAdm: string = "";
let opcaoEditar: string = "";
let opcaoEditarBase: string = "";
let opcaoEditarConteudo: string = "";

type ProdutoMenu = {
  id: number;
  tipo: string;
  nome: string;
};

const produtos: ProdutoMenu[] = [];

/* =========================
   FUNÇÕES AUXILIARES DO MENU
========================= */

async function aguardarEnter(): Promise<void> {
  await leia.question(amarelo("\nPressione ENTER para continuar... "));
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
  console.log(amarelo("09 - Voltar"));
  console.log(vermelho("00 - Sair"));
  linha();
}

function exibirCatalogo(): void {
  cabecalho("CATÁLOGO", "Produtos disponíveis na livrariatech.com");
  emBreve("Exibição do catálogo");
}

async function comprarProduto(): Promise<void> {
  cabecalho("COMPRA", "Fluxo inicial do usuário");
  emBreve("Compra de produto");
  await aguardarEnter();
}

async function buscarProdutoPorId(): Promise<void> {
  cabecalho("BUSCA DE PRODUTO", "Encontre rapidamente o que deseja");
  emBreve("Busca de produto por ID");
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
    } catch (error) {
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
  cabecalho("ADICIONAR PRODUTO", "Cadastro inicial");
  console.log(branco("Tipos planejados para a loja:"));
  console.log(branco("01 - Livro"));
  console.log(branco("02 - Produto de Escritório"));
  console.log(branco("03 - Eletrônico"));
  pausaVisual();
  emBreve("Cadastro de produto");
  await aguardarEnter();
}

async function removerProduto(): Promise<void> {
  cabecalho("REMOVER PRODUTO", "Remoção do catálogo");
  emBreve("Remoção de produto");
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
  emBreve("Seleção de produto para edição");
  await aguardarEnter();
}

async function fluxoEditarBase(): Promise<void> {
  do {
    menuEditarBase();
    opcaoEditarBase = await leia.question(azul("Escolha uma opção: "));

    try {
      switch (opcaoEditarBase) {
        case "01":
          emBreve("Edição do nome do produto");
          await aguardarEnter();
          break;
        case "02":
          emBreve("Edição do preço");
          await aguardarEnter();
          break;
        case "03":
          emBreve("Edição do estoque");
          await aguardarEnter();
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
    } catch (error) {
      console.log(vermelho("\nErro ao editar dados base."));
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
      switch (opcao) {
        case "01":
          emBreve("Edição do autor");
          await aguardarEnter();
          break;
        case "02":
          emBreve("Edição do gênero");
          await aguardarEnter();
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
    } catch (error) {
      console.log(vermelho("\nErro ao editar conteúdo do livro."));
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
      switch (opcao) {
        case "01":
          emBreve("Edição da marca");
          await aguardarEnter();
          break;
        case "02":
          emBreve("Edição do uso");
          await aguardarEnter();
          break;
        case "03":
          emBreve("Edição da descrição");
          await aguardarEnter();
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
    } catch (error) {
      console.log(vermelho("\nErro ao editar conteúdo do produto de escritório."));
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
      switch (opcao) {
        case "01":
          emBreve("Edição da marca");
          await aguardarEnter();
          break;
        case "02":
          emBreve("Edição do uso");
          await aguardarEnter();
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
    } catch (error) {
      console.log(vermelho("\nErro ao editar conteúdo do eletrônico."));
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
    } catch (error) {
      console.log(vermelho("\nErro ao editar conteúdo do produto."));
      await aguardarEnter();
    }
  } while (opcaoEditarConteudo !== "09" && opcaoEditarConteudo !== "00");
}

async function editarProduto(): Promise<void> {
  await selecionarProdutoParaEdicao();

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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
      console.log(vermelho("\nErro inesperado no menu principal."));
      await aguardarEnter();
    }
  } while (opcaoPrincipal !== "00");

  leia.close();
}

main();