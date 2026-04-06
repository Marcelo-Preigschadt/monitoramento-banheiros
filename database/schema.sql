CREATE TABLE banheiros (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE usos (
    id SERIAL PRIMARY KEY,
    banheiro_id INT REFERENCES banheiros(id),
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE limpezas (
    id SERIAL PRIMARY KEY,
    banheiro_id INT REFERENCES banheiros(id),
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
