CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE reg_state AS ENUM ('unregistered', 'registered');

CREATE TABLE IF NOT EXISTS  Organizations (
    id uuid DEFAULT uuid_generate_v1() UNIQUE,
    name varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Users (
    uid uuid DEFAULT uuid_generate_v1() UNIQUE,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    admin boolean DEFAULT FALSE,
    PRIMARY KEY (uid)
);


CREATE TABLE IF NOT EXISTS Hackathons (
    hid uuid DEFAULT uuid_generate_v1() UNIQUE,
    name varchar(255) NOT NULL,
    start_date timestamp NOT NULL,
    end_date timestamp NOT NULL,
    location varchar(255) NOT NULL,
    max_reg smallint,
    reg_deadline timestamp NOT NULL,
    draft boolean DEFAULT true,
    PRIMARY KEY (hid)
);

CREATE TABLE IF NOT EXISTS Hackathon_Details (
    did uuid DEFAULT uuid_generate_v1() UNIQUE,
    hid uuid REFERENCES Hackathons(hid) ON DELETE CASCADE NOT NULL,
    detail text NOT NULL,
    index SMALLINT,
    PRIMARY KEY(did)
);

CREATE TABLE IF NOT EXISTS Registrants (
    uid uuid REFERENCES Users(uid) ON DELETE CASCADE NOT NULL,
    hid uuid REFERENCES Hackathons(hid) ON DELETE CASCADE NOT NULL,
    state reg_state DEFAULT 'unregistered',
    PRIMARY KEY (uid, hid)
);

CREATE TABLE IF NOT EXISTS Reg_Questions (
    qid uuid DEFAULT uuid_generate_v1() UNIQUE,
    hid uuid REFERENCES Hackathons(hid) ON DELETE CASCADE NOT NULL,
    question text NOT NULL,
    descr text NOT NULL,
    required bool,
    index SMALLINT,
    type varchar(255),
    PRIMARY KEY (qid)
);

CREATE TABLE IF NOT EXISTS Reg_Options (
    oid uuid DEFAULT uuid_generate_v1() UNIQUE,
    qid uuid REFERENCES Reg_Questions(qid) ON DELETE CASCADE NOT NULL,
    option varchar(255) NOT NULL,
    index SMALLINT,
    PRIMARY KEY (oid)
);

CREATE TABLE IF NOT EXISTS Reg_Answers (
    aid uuid DEFAULT uuid_generate_v1() UNIQUE,
    uid uuid REFERENCES Users(uid) ON DELETE CASCADE NOT NULL,
    qid uuid REFERENCES Reg_Questions(qid) ON DELETE CASCADE NOT NULL,
    oid uuid REFERENCES Reg_Options(oid) ON DELETE CASCADE,
    answer text,
    PRIMARY KEY (aid)
);