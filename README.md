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
Deve ser possível cadastrar a imagem do carro
Deve ser possível listar todos os carros

**RNF**
Utilizar o multer para upload dos arquivos

**RN**
O usuário não pode cadastrar mais de uma imagem para o mesmo carro
O usuário resposável pelo cadastro deve ser um administrador


# Locação de um carro
**RF**
Deve ser possível cadastrar uma locação

**RN**
A locação deve ter duração mínima de 6 horas
Não deve ser possível cadastrar uma nova locação caso já exista uma aberta para o mesmo usuário
Não deve ser possível cadastrar uma nova locação caso já exista uma aberta para o mesmo carro

