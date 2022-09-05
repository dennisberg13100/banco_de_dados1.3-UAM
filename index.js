#!/usr/bin/env node

const mysql = require('mysql2');
require('dotenv').config();
const env = process.env
const connection = mysql.createConnection({
    host: env.DB_HOST,
    user: env.DB_USER, 
    password: env.DB_PASSWORD, 
    database: env.DB_DATABASE
})

connection.connect();

// Apenas uma forma de controlar se o meu bnco de dados está conectado
// Caso conecte retorna 2 caso contrário retorna o erro 
connection.query('SELECT 1 + 1 AS solution',  (error, result, fields) => {
    if (error) throw error;
    console.log('The solution is: ', result[0].solution);
})

// 01 Criando a tabela Cidade caso ela ainda não exista.
connection.query(`CREATE TABLE if not exists CIDADE(
    COD_CIDADE INTEGER, 
    DCR_CIDADE VARCHAR(50)
);`)

// 02 Definindo entidade COD_CIDADE como NOT NULL.
connection.query(`ALTER TABLE CIDADE MODIFY COD_CIDADE INTEGER NOT NULL;`)

// 03 Definindo entidade DCR_CIDADE como NOT NULL. 
connection.query(`ALTER TABLE CIDADE MODIFY DCR_CIDADE VARCHAR(50) NOT NULL`)

// 04 Definindo entidade COD_CIDADE como PRIMARY KEY
connection.query(`ALTER TABLE CIDADE ADD PRIMARY KEY (COD_CIDADE)`)

// 05 configurando AUTOINCREMENT na PRIMARY KEY de CIDADE
connection.query(`ALTER TABLE CIDADE CHANGE COD_CIDADE COD_CIDADE INTEGER AUTO_INCREMENT`)

// 06 Inserindo um dado na tabela CIDADE.
connection.query(`INSERT INTO CIDADE (DCR_CIDADE) VALUES ("Pinhais")`, (error, result, field) => {
    if (error) throw error
}) 

// 07 Inserindo mais um dado na tabela CIDADE.
connection.query(`INSERT INTO CIDADE (DCR_CIDADE) VALUES ("Arapoti")`, (error, result, field) => {
    if (error) throw error
}) 

// 08 Selecionando todos os dados da tabela CIDADE
connection.query(`SELECT * FROM CIDADE`, (error, result, field) => {
    if (error) throw error
    console.log("Selecionando todos os dados da tabela CIDADE")
    console.log(result)
})

// 09 Selecionando o COD_CIDADE da cidade de Arapoti
connection.query(`SELECT COD_CIDADE FROM CIDADE WHERE DCR_CIDADE = 'Arapoti'`, (error, result, field) => {
    if (error) throw error
    console.log("Selecionando o COD_CIDADE da cidade de Arapoti")
    console.log(result)
})

// 10 Criando a tabela de CLIENTE
connection.query(`CREATE TABLE if not exists CLIENTE(
    CODIGO INTEGER NOT NULL AUTO_INCREMENT, 
    NOME VARCHAR(50)NOT NULL,
    CPF BIGINT(11), 
    CONTATO VARCHAR(20),
    DATA_NASC DATE,
    SEXO CHAR(1), 
    BAIRRO VARCHAR(50),
    COD_CIDADE INTEGER,
    PRIMARY KEY (CODIGO),
    FOREIGN KEY (COD_CIDADE) REFERENCES CIDADE (COD_CIDADE)
);`)

// 11 Adicionando um CLIENTE
connection.query(`INSERT INTO CLIENTE 
    (NOME, CPF, CONTATO, DATA_NASC, SEXO, BAIRRO, COD_CIDADE)
    VALUES
    ('Anderson', '11111111111' , '(43) 99999-1234' ,'1995-09-07', 'M', 'Colônia Holandesa', '2')
`)

// 11 Adicionando mais um CLIENTE
connection.query(`INSERT INTO CLIENTE 
    (NOME, CPF, CONTATO, DATA_NASC, SEXO, BAIRRO, COD_CIDADE)
    VALUES
    ('Laura', '22222222222' , '(41) 99999-4321' ,'1995-06-19', 'F', 'Centro', '1')
`)

// 12 Selecionando todos os dados de CLIENTES
connection.query(`SELECT * FROM CLIENTE`, (error, result, field) => {
    if (error) throw error
    console.log("Selecionando todos os dados de CLIENTES")
    console.log(result)
})

// 13 Selecionando todos os dados de CLIENTES com o nome das cidades 
connection.query(`SELECT * FROM CLIENTE 
    INNER JOIN CIDADE ON CLIENTE.COD_CIDADE=CIDADE.COD_CIDADE`,
    (error, result, field) => {
        if (error) throw error
        console.log("Selecionando todos os dados de CLIENTES com o nome das cidades")
        console.log(result)
    }
)

// 14 Atualizando o nome da cidade 
connection.query(`UPDATE CIDADE SET DCR_CIDADE = 'Curitiba' WHERE DCR_CIDADE = 'Pinhais'`)

// 15 Verificando a atualização
connection.query("SELECT DCR_CIDADE FROM CIDADE WHERE COD_CIDADE = '1'", 
    (error, result, field) => {
        if (error) throw error
        console.log("Como ninguém conhece a cidade de Pinhais, vamos dizer que moramos em Curitiba!")
        console.log(result)
    }
)

// 16 Alterando a cidade do Anderson 
connection.query(`UPDATE CLIENTE SET COD_CIDADE='1' WHERE NOME = 'Anderson'`)

// 17 Excluindo um cliente 
connection.query(`DELETE FROM CLIENTE WHERE CODIGO = '2'`) 

// 18 Exibindo todos os valoers da tabela CLIENTE
connection.query(`SELECT * FROM CLIENTE`, (error, result, field) => {
    if(error) throw error
    console.log("Exibindo todos os valores da tabela CLIENTE")
    console.log(result)
})

// 19 Excluindo a tabela CLIENTE
connection.query(`DROP TABLE CLIENTE`)

// 20 Excluindo a tabela CIDADE
connection.query(`DROP TABLE CIDADE;`) 

connection.end();