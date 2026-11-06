# language: pt

Funcionalidade: Consulta de CEP na API do ViaCEP
  Como o formulário de cadastro pede CEP, cidade e estado
  Quero saber como a API pública do ViaCEP responde
  Para poder usar ela para preencher a cidade e o estado sozinhos

  # ---------- Fluxo principal ----------

  Cenário: Consultar um CEP que existe
    Quando faço um GET em "/ws/80010000/json/"
    Então o status da resposta é 200
    E a resposta vem em JSON
    E a "localidade" é "Curitiba"
    E a "uf" é "PR"
    E o "cep" vem formatado como "80010-000"

  # ---------- Fluxo alternativo ----------

  Cenário: Consultar um CEP escrito com hífen
    Quando faço um GET em "/ws/80010-000/json/"
    Então o status da resposta é 200
    E a "localidade" é "Curitiba"

  # ---------- Exceções ----------

  Cenário: Consultar um CEP no formato certo que não existe
    Quando faço um GET em "/ws/99999999/json/"
    Então o status da resposta é 200
    E a resposta tem só o campo "erro"

  Esquema do Cenário: Consultar um CEP no formato errado
    Quando faço um GET em "/ws/<cep>/json/"
    Então o status da resposta é 400

    Exemplos:
      | cep       | motivo               |
      | 800       | poucos dígitos       |
      | 8001000a  | letra no meio        |
      | 800100000 | dígito a mais        |

  Cenário: Usar um método que a API não aceita
    Quando faço um POST em "/ws/80010000/json/"
    Então o status da resposta é 405
