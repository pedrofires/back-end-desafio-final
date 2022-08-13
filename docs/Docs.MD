# API - Cubos Academy

# Rotas de Usuarios:

## Cadastro do usuário:

<h2 
style="border-left: 10px solid #5bc0de;
background: #f4f8fa;
color: #28a1c5;
padding: 10px;">
    POST: '/usuarios'
</h2>

### Esse endpoint deverá realizar o cadastro.

<br>

## `Parâmetros:`

### Nenhum parâmetro

<br>

## `Entrada:`

```javascript
{
    "nome": "Fred Flintstone",
    "email": "fred@pedras.com",
    "senha": "fred1234"
}
```

## `Resposta:`

```javascript
"usuario": {
    "id": 1,
    "nome": "Fred",
    "email": "fred@pedras.com"
}
```

---

<br>

## Login do usuário:

<h2 
style="border-left: 10px solid #5bc0de;
background: #f4f8fa;
color: #28a1c5;
padding: 10px;">
    POST: '/login'
</h2>

### Esse endpoint deverá realizar o login.

<br>

## `Parâmetros:`

### Nenhum parâmetro

<br>

## `Entrada:`

```javascript
{
    "email": "fred@pedras.com",
    "senha": "fred1234"
}
```

## `Resposta:`

```javascript
{
"usuario": {
	"id": 1,
	"nome": "Fred",
	"email": "fred@pedras.com"
},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6IkZyZWQiLCJlbWFpbCI6ImZyZWRAcGVkcmFzLmNvbSIsImlhdCI6MTY1NDU3MTgyMiwiZXhwIjoxNjU0NTc1NDIyfQ.ovkSe7PSVzb5RtROYkNhRmDYLejpI4VOv5NWKZP4iKA"
}
```

---

<br>

## 🔒 Atualizar usuário

<h2 style="border-left: 10px solid #f0ad4e;
background: #fcf8f2;;
color: #df8a13;
padding: 10px;">PUT: '/usuario'</h2>

### Esse endpoint deverá atualizar o usuário.

<br>

## `Parâmetros:`

### Nenhum parâmetro

<br>

## `Entrada:`

```javascript
{
	"nome":"Beto",
	"email":"beto@teste.com",
	"senha":"12345678",
        "cpf":"12312345620",
        "telefone":"85991366360"
}
```

## `Resposta:`

```javascript
{
	"mensagem": "O usuário foi atualizado"
}
```

---

<br>

## 🔒 Obter perfil do usuário

<h2 style="border-left: 10px solid #5cb85c;
background: #f1f9f1;;
color: #3d8b3d;
padding: 10px;">GET: '/usuario'</h2>

### Esse endpoint deverá retornar um objeto com os campos que compõem o usuário menos a senha. Esse endpoint só pode ser realizado depois de efetuar login pois esse método identifica o usuário através do token passado no endpoint de login.

<br>

## `Parâmetros:`

### Nenhum parâmetro

<br>

## `Entrada:`

Esse endpoint se aproveita dos dados enviados no body da requisição de login.

## `Resposta:`

```javascript
{
	"id": 1,
	"nome": "Beto",
	"email": "beto@teste.com",
	"cpf": "12312345623",
	"telefone": "85991366360"
}
```

---

<br>

# 🔒Rotas de Clientes:

## 🔒 Cadastrar Cliente

<h2 
style="border-left: 10px solid #5bc0de;
background: #f4f8fa;
color: #28a1c5;
padding: 10px;">
    POST: '/cliente'
</h2>

### Esse endpoint deverá realizar o cadastro de Cliente.

<br>

## `Parâmetros:`

### Nenhum parâmetro

<br>

## `Entrada:`

```javascript
{
	"nome":"Antonio",
	"email":"antonio@teste.com",
	"cpf":"12345678947",
	"telefone":"08533821639",
	"cep":"61900530",
	"logradouro":"Rua 28",
	"complemento":"Número 275",
	"bairro":"Jereissati I",
	"cidade":"Maracanaú",
	"estado":"CE"
}
```

## `Resposta:`

```javascript
{
	"id": 6,
	"nome": "Antonio",
	"email": "antonio@teste.com",
	"cpf": "12345678947",
	"telefone": "08533821639",
	"cep": "61900530",
	"logradouro": "Rua 28",
	"complemento": "Número 275",
	"bairro": "Jereissati I",
	"cidade": "Maracanaú",
	"estado": "CE"
}
```

---

<br>

## 🔒 Listar Clientes

<h2 style="border-left: 10px solid #5cb85c;
background: #f1f9f1;;
color: #3d8b3d;
padding: 10px;">GET: '/clientes'</h2>

### Esse endpoint deverá retornar um array de Clientes.

<br>

## `Parâmetros:`

### Nenhum parâmetro

<br>

## `Entrada:`

Sem entrada

## `Resposta:`

```javascript
[
   {
      id: 1,
      nome: "José",
      email: "jose@teste.com",
      cpf: "12345678945",
      telefone: "08533821632",
      cep: "61900530",
      logradouro: "Rua 28",
      complemento: "Número 275",
      bairro: "Jereissati I",
      cidade: "Maracanaú",
      estado: "CE",
   },
   {
      id: 5,
      nome: "Jó",
      email: "jo@teste.com",
      cpf: "12345678946",
      telefone: "08533821631",
      cep: "61900530",
      logradouro: "Rua 28",
      complemento: "Número 275",
      bairro: "Jereissati I",
      cidade: "Maracanaú",
      estado: "CE",
   },
];
```

---

<br>

## 🔒 Obter Resumo de Clientes

<h2 style="border-left: 10px solid #5cb85c;
background: #f1f9f1;;
color: #3d8b3d;
padding: 10px;">GET: '/clientes/resumo'</h2>

### Esse endpoint deverá retornar um objeto com resumo de clientes em dia e inadimplentes.

<br>

## `Parâmetros:`

### Nenhum parâmetro

<br>

## `Entrada:`

Sem entrada

## `Resposta:`

```javascript
[
   {
      clientesEmDia: {
         clientesEmDia: [
            {
               nome: "Emília ",
               id: 4,
               cpf: "231.798.546-00",
               status: "Em dia",
            },
            {
               nome: "Januario",
               id: 1,
               cpf: "567.567.567-00",
               status: "Em dia",
            },
         ],
         quantidade: 2,
      },
      clientesInadimplentes: {
         clientesInadimplentes: [
            {
               nome: "Pedrinho ",
               id: 3,
               cpf: "362.159.874-00",
               status: "Inadimplente",
            },
         ],
         quantidade: 1,
      },
   },
];
```

---

<br>

## 🔒 Deletar Cliente

<h2 style="border-left: 10px solid #d9534f;
background: #fdf7f7;;
color: #b52b27;
padding: 10px;">DELETE: '/excluircliente/{id}'</h2>

### Esse endpoint deverá excluir um Cliente do banco de dados.

<br>

## `Parâmetros:`

### id do cliente

<br>

## `Entrada:`

### Sem entrada

## `Resposta:`

```javascript
{
	"mensagem": "Cliente excluido com sucesso."
}
```

---

<br>

## 🔒 Editar Cliente

<h2 style="border-left: 10px solid #f0ad4e;
background: #fcf8f2;;
color: #df8a13;
padding: 10px;">PUT: '/cliente/{id}'</h2>

### Esse endpoint deverá editar um objeto Cliente.

<br>

## `Parâmetros:`

### id do cliente

<br>

## `Entrada:`

```javascript
{
	"nome": "Antonio",
	"email": "antonio2@teste.com",
	"cpf": "12345678947",
	"telefone": "08533821639",
	"cep": "61900530",
	"logradouro": "Rua 28",
	"complemento": "Número 275",
	"bairro": "Jereissati I",
	"cidade": "Maracanaú",
	"estado": "CE"
}
```

## `Resposta:`

```javascript
{
	"mensagem": "Cliente editado com sucesso."
}
```

---

<br>

## 🔒 Obter Cliente

<h2 style="border-left: 10px solid #5cb85c;
background: #f1f9f1;;
color: #3d8b3d;
padding: 10px;">GET: '/cliente/{id}'</h2>

### Esse endpoint deverá retornar um objeto Cliente.

<br>

## `Parâmetros:`

### id do cliente

<br>

## `Entrada:`

### Sem entrada

## `Resposta:`

```javascript
{
	"id": 6,
	"nome": "Antonio",
	"email": "antonio2@teste.com",
	"cpf": "12345678947",
	"telefone": "08533821639",
	"cep": "61900530",
	"logradouro": "Rua 28",
	"complemento": "Número 275",
	"bairro": "Jereissati I",
	"cidade": "Maracanaú",
	"estado": "CE"
}
```

---

<br>

# 🔒Rotas de Cobranças:

## 🔒 Cadastrar Cobrança

<h2 
style="border-left: 10px solid #5bc0de;
background: #f4f8fa;
color: #28a1c5;
padding: 10px;">
    POST: '/cobranca'
</h2>

### Esse endpoint deverá cadastrar uma cobrança.

<br>

## `Parâmetros:`

### Nenhum parâmetro

<br>

## `Entrada:`

```javascript
{
	"id_cliente":6,
	"descricao":"Teste",
	"status":"pendente",
	"valor":12000,
	"vencimento":"30-12-2022"
}
```

## `Resposta:`

```javascript
{
    "id": 2,
    "id_cliente": 6,
    "descricao": "Teste",
    "status": "pendente",
    "valor": "12000",
    "vencimento": "2022-12-30T03:00:00.000Z"
}
```

---

<br>

## 🔒 Obter Cobranças do Cliente

<h2 style="border-left: 10px solid #5cb85c;
background: #f1f9f1;;
color: #3d8b3d;
padding: 10px;">GET: '/cobrancas/{id}'</h2>

### Esse endpoint deverá retornar um objeto Cobrança.

<br>

## `Parâmetros:`

### id do Cliente

<br>

## `Entrada:`

Sem entrada

## `Resposta:`

```javascript
{
	"id": 6,
	"nome": "Antonio",
	"email": "antonio2@teste.com",
	"cpf": "12345678947",
	"telefone": "08533821639",
	"cep": "61900530",
	"logradouro": "Rua 28",
	"complemento": "Número 275",
	"bairro": "Jereissati I",
	"cidade": "Maracanaú",
	"estado": "CE"
}
```

---

<br>

## 🔒 Listar Cobranças

<h2 style="border-left: 10px solid #5cb85c;
background: #f1f9f1;;
color: #3d8b3d;
padding: 10px;">GET: '/cobrancas'</h2>

### Esse endpoint deverá listar todas as cobranças.

<br>

## `Parâmetros:`

### Nenhum parâmetro

<br>

## `Entrada:`

### Sem entrada

## `Resposta:`

```javascript
[
   {
      id: 1,
      id_cliente: 6,
      descricao: "Teste",
      status: "pendente",
      valor: "12000",
      vencimento: "2022-12-30T03:00:00.000Z",
      nome: "Antonio",
   },
   {
      id: 3,
      id_cliente: 6,
      descricao: "Panela de pressão",
      status: "pendente",
      valor: "12000",
      vencimento: "2022-12-30T03:00:00.000Z",
      nome: "Antonio",
   },
];
```

---

<br>

## 🔒 Obter Cobrança

<h2 style="border-left: 10px solid #5cb85c;
background: #f1f9f1;;
color: #3d8b3d;
padding: 10px;">GET: '/cobranca/:id'</h2>

### Esse endpoint deverá trazer uma cobrança pelo id.

<br>

## `Parâmetros:`

### "id"

<br>

## `Entrada:`

### Sem entrada

## `Resposta:`

```javascript
[
   {
      id: 1,
      id_cliente: 6,
      descricao: "Teste",
      status: "pendente",
      valor: "12000",
      vencimento: "2022-12-30T03:00:00.000Z",
      nome: "Antonio",
   },
];
```

---

<br>

## 🔒 Obter Resumo de Cobranças

<h2 style="border-left: 10px solid #5cb85c;
background: #f1f9f1;;
color: #3d8b3d;
padding: 10px;">GET: '/cobrancas/resumo'</h2>

### Esse endpoint deverá um objeto com as cobranças pagas, vencidas, pendentes.

<br>

## `Parâmetros:`

### "Nenhum parâmetro"

<br>

## `Entrada:`

### Sem entrada

## `Resposta:`

```javascript
[
   {
      CobrancasPagas: {
         lista: [
            {
               id: 3,
               valor: "9000",
               status: "Pago",
               nome: "Pedrinho ",
            },
         ],
         total: 9000,
         quantidade: 1,
      },
      CobrancasVencidas: {
         lista: [],
         total: 0,
         quantidade: 0,
      },
      CobrancasPendentes: {
         lista: [
            {
               id: 2,
               valor: "9000",
               status: "Vencido",
               nome: "Pedrinho ",
            },
            {
               id: 10,
               valor: "9000",
               status: "Vencido",
               nome: "Pedrinho ",
            },
         ],
         total: 18000,
         quantidade: 2,
      },
   },
];
```

---

<br>

## 🔒 Editar Cobrança

<h2 style="border-left: 10px solid #f0ad4e;
background: #fcf8f2;;
color: #df8a13;
padding: 10px;">PUT: '/cobrancas/{id}'</h2>

### Esse endpoint deverá editar uma cobrança.

<br>

## `Parâmetros:`

### id da cobrança

<br>

## `Entrada:`

```javascript
{
	"id_cliente":6,
	"descricao":"Panela de pressão",
	"status":"pendente",
	"valor":13000,
	"vencimento":"30-12-2022"
}
```

## `Resposta:`

```javascript
{
	"mensagem": "Cobrança atualizada com sucesso."
}
```

---

<br>

## 🔒 Deletar Cobrança

<h2 style="border-left: 10px solid #d9534f;
background: #fdf7f7;;
color: #b52b27;
padding: 10px;">DELETE: '/cobrancas/{id}'</h2>

### Esse endpoint deverá excluir uma cobrança do banco de dados.

<br>

## `Parâmetros:`

### id da cobrança

<br>

## `Entrada:`

### Sem entrada

## `Resposta:`

```javascript
{
	"mensagem": "Cobrança excluída com sucesso."
}
```

---

<br>
