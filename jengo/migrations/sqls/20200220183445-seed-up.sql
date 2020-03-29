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
    regDeadline timestamp NOT NULL,
    draft boolean DEFAULT true,
    PRIMARY KEY (hid)
);

CREATE TABLE IF NOT EXISTS Registrants (
    uid uuid REFERENCES Users(uid) NOT NULL,
    hid uuid REFERENCES Hackathons(hid) NOT NULL,
    state reg_state DEFAULT 'unregistered',
    PRIMARY KEY (uid, hid)
);

CREATE TABLE IF NOT EXISTS Questions (
    qid uuid DEFAULT uuid_generate_v1() UNIQUE,
    hid uuid REFERENCES Hackathons(hid) NOT NULL,
    PRIMARY KEY (qid)
);

CREATE TABLE IF NOT EXISTS Txt_Answers (
    uid uuid REFERENCES Users(uid) NOT NULL,
    qid uuid REFERENCES Questions(qid) NOT NULL,
    answer varchar(255) NOT NULL,
    PRIMARY KEY (uid, qid)
);

CREATE TABLE IF NOT EXISTS Options (
    oid uuid DEFAULT uuid_generate_v1() UNIQUE,
    qid uuid REFERENCES Questions(qid) NOT NULL,
    option varchar(255) NOT NULL,
    PRIMARY KEY (oid)
);

CREATE TABLE IF NOT EXISTS MC_Answers (
    uid uuid REFERENCES Users(uid) NOT NULL,
    oid uuid DEFAULT uuid_generate_v1() UNIQUE,
    PRIMARY KEY (uid, oid)
);

CREATE TABLE IF NOT EXISTS Img_Files (
    iid uuid DEFAULT uuid_generate_v1() UNIQUE,
    path varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    PRIMARY KEY (iid)
);

CREATE TABLE IF NOT EXISTS Txt_Files (
    tid uuid DEFAULT uuid_generate_v1() UNIQUE,
    hid uuid REFERENCES Hackathons(hid) NOT NULL,
    path varchar(255) NOT NULL,
    PRIMARY KEY (tid)
);

CREATE TABLE IF NOT EXISTS File_Links (
    iid uuid REFERENCES Img_Files(iid) NOT NULL,
    tid uuid REFERENCES Txt_Files(tid) NOT NULL,
    PRIMARY KEY (iid, tid)
);
