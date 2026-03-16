const RESET = "\x1b[0m";
const BRANCO = "\x1b[37m";
const AZUL = "\x1b[34m";
const VERDE = "\x1b[32m";
const VERMELHO = "\x1b[31m";
const AMARELO = "\x1b[33m";
const CIANO = "\x1b[36m";

export function branco(texto: string): string {
  return `${BRANCO}${texto}${RESET}`;
}

export function azul(texto: string): string {
  return `${AZUL}${texto}${RESET}`;
}

export function verde(texto: string): string {
  return `${VERDE}${texto}${RESET}`;
}

export function vermelho(texto: string): string {
  return `${VERMELHO}${texto}${RESET}`;
}

export function amarelo(texto: string): string {
  return `${AMARELO}${texto}${RESET}`;
}

export function ciano(texto: string): string {
  return `${CIANO}${texto}${RESET}`;
}

export function linha(): void {
  console.log(azul("============================================================"));
}

export function pausaVisual(): void {
  console.log(azul("------------------------------------------------------------"));
}

export function cabecalho(titulo: string, subtitulo?: string): void {
  console.clear();
  linha();
  console.log(branco(`                 ${titulo}`));
  if (subtitulo) {
    console.log(ciano(`         ${subtitulo}`));
  }
  linha();
}

export function emBreve(acao: string): void {
  console.log(verde(`\n${acao} concluída com sucesso!`));
  console.log(
    amarelo("Em breve esta função será substituída pela função que manipula o objeto de verdade.")
  );
}