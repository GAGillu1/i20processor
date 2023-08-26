create Table  Institutions(
	institutionId  uniqueidentifier DEFAULT NEWID(),
	institutionName varchar(255) Not Null unique,
	systemType varchar(255) not null ,
	primary key (institutionId, institutionName)

	)

	
CREATE TABLE InsitutionAdministrators (
  adminId uniqueidentifier DEFAULT NEWID(),
  fullname VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  userRole VARCHAR(50)NOT NULL,
  institutionId int NOT NULL,
  primary key (adminId ,fullname ),
  FOREIGN KEY (institutionId) REFERENCES Institutions(institutionId)
);

create Table users(
	userId uniqueidentifier DEFAULT NEWID(), 
	fullname VARCHAR(255),
	userName varchar(255) not null,
	email varchar(100) not null ,
	userRole varchar(100) not null,
	institutionId int  NOT NULL,
	salt varchar(255) not null,
	hash varchar(255) not null,
	active bit not null,
	last_login DATETIME ,
	inactive_date Datetime,
	new_login bit ,
	primary key (userId, fullname),
  FOREIGN KEY (institutionId) REFERENCES Institutions(institutionId)
  );

create Table signatures(
	signatureID uniqueidentifier DEFAULT NEWID() ,
	fullName varchar(255) not null unique, 
	userName varchar(255) not null unique,
	email varchar(255) not null,
	signatureLength int not null, 
	signatureWidth int not null, 
	signatureXCordinate int not null, 
	signatureYCordinate int not null,
	institutionId int  NOT NULL,
	primary key (signatureID,fullName),
  FOREIGN KEY (institutionId) REFERENCES Institutions(institutionId))

create Table processed(
	proId uniqueidentifier DEFAULT NEWID(),
	processedDate  DATETIME  not null,
	processedBy varchar(255) not null, 
	processedMsg text not null,
	institutionId  int not null,
	result varchar(255) not null ,
	primary key(proID, processedBy),
	FOREIGN KEY (institutionId) REFERENCES Institutions(institutionId))


create table  instance(
	instanceID uniqueidentifier DEFAULT NEWID(),
	instanceUrl varchar(255) not null ,
	instanceMsg varchar(10) not null,
	username varchar(255) not null ,
	instancePassword varchar(255) not null ,
	instancekey varchar(255) not null,
	institutionID int not null, 
	primary key (instanceId,instanceUrl),
	foreign key (institutionId) references Institutions(institutionId))

CREATE SEQUENCE intitutionIdseq
start with 1
increment by 1
minvalue 0
maxvalue 1000000000
NO cycle;

CREATE SEQUENCE InsitutionAdministratorsseq
start with 1
increment by 1
minvalue 0
maxvalue 1000000000
NO cycle;


CREATE SEQUENCE DSOseq
start with 1
increment by 1
minvalue 0
maxvalue 1000000000
NO cycle;


CREATE SEQUENCE usersseq
start with 1
increment by 1
minvalue 0
maxvalue 1000000000
NO cycle;

CREATE SEQUENCE signatureseq
start with 1
increment by 1
minvalue 0
maxvalue 1000000000
NO cycle;


CREATE SEQUENCE processedseq
start with 1
increment by 1
minvalue 0
maxvalue 1000000000
NO cycle;

CREATE SEQUENCE instanceseq
start with 1
increment by 1
minvalue 0
maxvalue 1000000000
NO cycle;




select * from institutions
select * from users
select * from InsitutionAdministrators
select * from signatures
select * from processed
select * from instance


CREATE TABLE MyTable (
  ID uniqueidentifier DEFAULT NEWID(),
  Name nvarchar(50)
);


drop table institutions;
drop table users;
drop table instance;
drop table InsitutionAdministrators;
drop table signatures;
drop table processed;
