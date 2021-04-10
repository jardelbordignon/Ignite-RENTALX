# Cadastro de carro

**RF**
Deve ser possível listar as categorias
Deve ser possível cadastrar um novo carro

**RN**
Não deve ser possível cadastrar um novo carro com uma placa já existente
Não deve ser possível alterar a placa de um carro já cadastrado
Um carro deve ser cadastrado com disponibilidade true por padrão
O usuário resposável pelo cadastro deve ser um administrador


# Listagem de carros

**RF**
Deve ser possível listar os carros disponíveis
Deve ser possível listar os carros disponíveis pelo nome
Deve ser possível listar os carros disponíveis pela marca
Deve ser possível listar os carros disponíveis pela categoria

**RN**
Usuário não precisa estar logado para visualizar os carros disponíveis


# Cadastro de especificação no carro

**RF**
Deve ser possível cadastrar uma especificação para um carro
Deve ser possível listar todas as especificações
Deve ser possível listar todos os carros

**RF**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro
O usuário resposável pelo cadastro deve ser um administrador


# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar até 6 imagens por carro

**RNF**
Utilizar o multer para upload dos arquivos

**RN**
O usuário pode cadastrar mais de uma imagem para o mesmo carro
O usuário resposável pelo cadastro deve ser um administrador


# Locação de um carro
**RF**
Deve ser possível cadastrar uma locação

**RN**
A locação deve ter duração mínima de 24 horas
Não deve ser possível cadastrar uma nova locação caso o carro não exista
Não deve ser possível cadastrar uma nova locação caso já exista uma aberta para o mesmo usuário
Não deve ser possível cadastrar uma nova locação caso já exista uma aberta para o mesmo carro
O usuário deve estar logado na aplicação
Ao realizar a locação, o status do carro deverá ser alterado para indisponível

# Devolução de um carro
**RF**
Deve ser possível realizar a devolução de um carro

**RN**
Se o carro for devolvido antes de 24 horas, deverá ser cobrado diária completa.
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
Caso haja multa, deverá ser somada ao total do aluguel.
O usuário deve estar logado na aplicação.

# Listagem de locações de um usuário
**RF**
Deve ser possível listar as locações realizadas pelo usuário

**RN**
O usuário deve estar logado na aplicação.

# Recuperação de senha
**RF**
Deve ser possível o usuário recuperar a senha informando o e-mail
O usuário deve receber um e-mail com as instruções para recuperar sua senha
O usuário deve inserir uma nova senha

**RN**
O usuário precisa informar uma nova senha
O link enviado para recuperar a senha deve expirar em 3 horas
