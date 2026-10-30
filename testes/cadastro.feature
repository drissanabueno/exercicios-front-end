# language: pt

Funcionalidade: Cadastro na Primeira Porta
  Como uma pessoa que quer entrar na área de tecnologia
  Quero me cadastrar pelo formulário do site
  Para participar da plataforma como candidato, voluntário ou doador

  Contexto:
    Dado que estou na página "Cadastro" da Primeira Porta

  # ---------- Fluxo principal ----------

  Cenário: Cadastro só com os campos obrigatórios
    Quando preencho "Nome completo" com "Ana Teste"
    E preencho "E-mail" com "ana@teste.com"
    E preencho "CPF" com "11122233344"
    E preencho "Telefone celular" com "41999990000"
    E preencho "CEP" com "80000000"
    E preencho "Cidade" com "Curitiba"
    E preencho "Estado" com "PR"
    E escolho a opção "Candidato"
    E marco a autorização da LGPD
    E clico em "Enviar cadastro"
    Então vejo a mensagem "Cadastro de Ana Teste recebido. Entramos em contato pelo e-mail ana@teste.com."
    E o formulário volta a ficar em branco

  # ---------- Fluxos alternativos ----------

  Cenário: Cadastro com os campos opcionais também preenchidos
    Dado que preenchi todos os campos obrigatórios com dados válidos
    Quando preencho "Data de nascimento" com "15/03/2000"
    E escolho "Front-end" em "Área de interesse"
    E preencho "Conte um pouco da sua história" com "Estou aprendendo HTML e CSS"
    E clico em "Enviar cadastro"
    Então vejo a mensagem de cadastro recebido com o meu nome e e-mail

  Cenário: CPF, telefone e CEP são formatados enquanto digito
    Quando digito "11122233344" no campo "CPF"
    E digito "41999990000" no campo "Telefone celular"
    E digito "80000000" no campo "CEP"
    Então o campo "CPF" mostra "111.222.333-44"
    E o campo "Telefone celular" mostra "(41) 99999-0000"
    E o campo "CEP" mostra "80000-000"

  Cenário: O que eu digitei volta depois de recarregar a página
    Dado que digitei "Ana" no campo "Nome completo"
    Quando recarrego a página
    Então o campo "Nome completo" continua com "Ana"
    E vejo o aviso "Recuperamos o que você tinha começado a preencher. Pode continuar de onde parou."

  Cenário: Botão Limpar apaga o formulário e o rascunho
    Dado que digitei "Ana" no campo "Nome completo"
    Quando clico em "Limpar"
    E recarrego a página
    Então o campo "Nome completo" está vazio

  # ---------- Exceções ----------

  Cenário: Enviar o formulário sem preencher nada
    Quando clico em "Enviar cadastro"
    Então vejo a mensagem "Faltam 9 campo(s): confira as mensagens em vermelho."
    E os campos de texto obrigatórios mostram "Este campo é obrigatório."
    E o grupo "Como você quer participar?" mostra "Escolha uma das opções."
    E a autorização da LGPD mostra "É preciso marcar esta opção para continuar."
    E o cursor vai para o campo "Nome completo"

  Esquema do Cenário: Campo preenchido no formato errado
    Quando digito "<valor>" no campo "<campo>"
    E saio do campo
    Então o campo "<campo>" fica marcado com erro
    E vejo a mensagem "<mensagem>"

    Exemplos:
      | campo            | valor         | mensagem                                            |
      | Nome completo    | An            | Digite pelo menos 3 caracteres.                     |
      | E-mail           | ana.teste.com | Inclua o @ e o domínio, por exemplo nome@email.com. |
      | CPF              | 12345         | Formato: 000.000.000-00                             |
      | Telefone celular | 4199          | Formato: (00) 00000-0000                            |
      | CEP              | 800           | Formato: 00000-000                                  |
      | Estado           | pr            | Sigla com duas letras maiúsculas                    |

  Cenário: Data de nascimento depois do limite
    Quando preencho "Data de nascimento" com "01/01/2015"
    E saio do campo
    Então vejo a mensagem "A data precisa ser até 2010-12-31."

  Cenário: A mensagem de erro some quando corrijo o campo
    Dado que o campo "E-mail" está marcado com erro
    Quando apago o que estava escrito e digito "ana@teste.com"
    Então a mensagem de erro do campo "E-mail" some
