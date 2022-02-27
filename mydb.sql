
create table portfolio (
id int primary key auto_increment not null,
contactName varchar(45) null,
contactEmail  varchar(45) null,
contactSubject varchar(45) null,
contactMessage varchar(100) null,
date varchar(20) null,
country varchar(45) null,
state varchar(45) null,
city varchar(45) null,
ip varchar(45) null
)

SELECT * FROM mydb.portfolio;
DELETE FROM portfolio WHERE id > 1;
UPDATE portfolio SET date  = 'value' where id = 'value';
INSERT INTO  portfolio 
(contactName,contactEmail,contactSubject,contactMessage,date,country,state,city,ip) 
VALUES 
('${contactName}','${contactEmail}','${contactSubject}','${contactMessage}','${date}','${country}','${state}','${city}','${ip}');

