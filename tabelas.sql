USE api_crud;

CREATE TABLE ongAmbientalAna (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    telefone VARCHAR(20),
    cidade VARCHAR(50),
);

create table animaisResgatados (
    ID int primary key auto_increment,
    especie varchar(100),
    local_resgate varchar(150),
    estado_saude varchar(100),
    data_resgate date
);
