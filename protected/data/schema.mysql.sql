CREATE TABLE tbl_user (
    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL
);

INSERT INTO tbl_user (username, password, email) VALUES ('test1', 'pass1', 'test1@example.com');
INSERT INTO tbl_user (username, password, email) VALUES ('test2', 'pass2', 'test2@example.com');
INSERT INTO tbl_user (username, password, email) VALUES ('test3', 'pass3', 'test3@example.com');
INSERT INTO tbl_user (username, password, email) VALUES ('test4', 'pass4', 'test4@example.com');
INSERT INTO tbl_user (username, password, email) VALUES ('test5', 'pass5', 'test5@example.com');
INSERT INTO tbl_user (username, password, email) VALUES ('test6', 'pass6', 'test6@example.com');
INSERT INTO tbl_user (username, password, email) VALUES ('test7', 'pass7', 'test7@example.com');
INSERT INTO tbl_user (username, password, email) VALUES ('test8', 'pass8', 'test8@example.com');
INSERT INTO tbl_user (username, password, email) VALUES ('test9', 'pass9', 'test9@example.com');
INSERT INTO tbl_user (username, password, email) VALUES ('test10', 'pass10', 'test10@example.com');
INSERT INTO tbl_user (username, password, email) VALUES ('test11', 'pass11', 'test11@example.com');
INSERT INTO tbl_user (username, password, email) VALUES ('test12', 'pass12', 'test12@example.com');
INSERT INTO tbl_user (username, password, email) VALUES ('test13', 'pass13', 'test13@example.com');
INSERT INTO tbl_user (username, password, email) VALUES ('test14', 'pass14', 'test14@example.com');
INSERT INTO tbl_user (username, password, email) VALUES ('test15', 'pass15', 'test15@example.com');
INSERT INTO tbl_user (username, password, email) VALUES ('test16', 'pass16', 'test16@example.com');
INSERT INTO tbl_user (username, password, email) VALUES ('test17', 'pass17', 'test17@example.com');
INSERT INTO tbl_user (username, password, email) VALUES ('test18', 'pass18', 'test18@example.com');
INSERT INTO tbl_user (username, password, email) VALUES ('test19', 'pass19', 'test19@example.com');
INSERT INTO tbl_user (username, password, email) VALUES ('test20', 'pass20', 'test20@example.com');
INSERT INTO tbl_user (username, password, email) VALUES ('test21', 'pass21', 'test21@example.com');



CREATE TABLE estado (
    id_estado INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nm_estado VARCHAR(45) NOT NULL
);

INSERT INTO estado (nm_estado) VALUES ('rs');
INSERT INTO estado (nm_estado) VALUES ('rj');
INSERT INTO estado (nm_estado) VALUES ('sp');



CREATE TABLE cidade (
    id_cidade INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nm_cidade VARCHAR(45) NOT NULL,
    id_estado int,
    FOREIGN KEY (id_estado) REFERENCES estado (id_estado)
);

INSERT INTO cidade (nm_cidade,id_estado) VALUES ('Porto Alegre',1);
INSERT INTO cidade (nm_cidade,id_estado) VALUES ('Rio de Janeiro',2);
INSERT INTO cidade (nm_cidade,id_estado) VALUES ('São Bernardo',3);



CREATE TABLE pessoa (
    id_pessoa INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nm_pessoa VARCHAR(45) NOT NULL,
    id_cidade int,
    FOREIGN KEY (id_cidade) REFERENCES cidade (id_cidade)
);

INSERT INTO pessoa (nm_pessoa,id_cidade) VALUES ('Márcio',1);
INSERT INTO pessoa (nm_pessoa,id_cidade) VALUES ('Fábio',1);
INSERT INTO pessoa (nm_pessoa,id_cidade) VALUES ('Neymar',2);
INSERT INTO pessoa (nm_pessoa,id_cidade) VALUES ('Hulk',3);