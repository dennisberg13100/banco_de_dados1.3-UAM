# banco_de_dados1.3-UAM

Este repositório se refera a atividade 3 da matéria de banco de daos 1 do curso de sistemas para internet da faculdade UAM. 

A principio a ideia er criar duas tabelas, uma de clientes e outra com cidades e relacionar os clientes com as cidades e cadastrar 20 clientes e 5 cidades. 

Como achei a atividade monótona resolvi craia 20 ações diferentes com os banco de dados, como criar, inserir dados, ler os dados, alterar os dados e por fim deletar os dados e as tabelas também. 

Para poder rodar o código é necessário baixar o MySQL, as instruções de instalação podem ser encontradas na documentação:
https://dev.mysql.com/doc/refman/8.0/en/installing.html

tanbém é necessário conectar ao banco de dados:
$> mysql -h host -u user -p
Enter password: ********

e criar um arquico .env na pasta root do projeto seguindo o exemplo do arquivo .env.example

O código roda em node e tem duas dependências, o dotenv e o mysql2 para instalar tudo basta usar o comando 
$> npm install 