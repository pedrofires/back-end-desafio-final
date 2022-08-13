create database loremIpsum

drop table if exists usuarios;

create table usuarios (
	id serial primary key,
  	nome text not null,
  	email text not null unique,
  	senha text not null, 
  	cpf text unique,
  	telefone text unique
);

drop table if exists clientes;

create table clientes (
	id serial primary key,
  	nome text not null,
  	email text not null unique,
  	cpf text not null unique,
  	telefone text not null unique,
  	cep text,
  	logradouro text,
	complemento text,
	bairro text,
	cidade text,
	estado text,
	status text default "Em dia"
);

drop table if exists cobrancas;

create table cobrancas(
    id serial primary key,
    id_cliente integer not null,
    descricao text not null,
    status varchar(8),
    valor bigint not null,
    vencimento date not null,
    foreign key (id_cliente) references clientes(id)
);