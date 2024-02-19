BEGIN;

SET CLIENT_ENCODING TO 'UTF-8';

TRUNCATE "admin", "customer", "product" RESTART IDENTITY;

INSERT INTO "admin" 
("role", "email", "lastname", "firstname", "password", "created_date")
VALUES 
('1', 'admin1@admin.com', 'Admin', 'Yann', '$2b$10$ba2iLjcnp3ujUKHoZC7tZewWRw3jDf.F2e/oas.uQwh2HKSZ6gxEe', CURRENT_TIMESTAMP),
('2', 'admin2@admin.com', 'Admin', 'Bénédicte', '$2b$10$ba2iLjcnp3ujUKHoZC7tZewWRw3jDf.F2e/oas.uQwh2HKSZ6gxEe', CURRENT_TIMESTAMP);

INSERT INTO "product"
("title","name","type","img_url","price","description","quantity","created_date","updated_date","admin_id") 
VALUES 
('New iPad','iPad','tablet','https://picsum.photos/id/1/200/300',1000,'New iPad !!',10,'2023-11-28 21:02:31','2023-11-28 21:02:31',1),
('New iPhone','iPhone','smartphone','https://picsum.photos/id/6/200/300',1200,'New iPhone !!',5,'2023-11-28 21:04:25','2023-11-28 21:04:25',1),
('iPhone','iPhone','smartphone','https://picsum.photos/id/7/200/300',900,'Old iPhone but always actualy',2,'2023-11-28 21:04:25','2023-11-28 21:04:25',1),
('Display Samsung','Display s','dispay','https://picsum.photos/id/62/200/300',400,'Greatest display for your game better',3,'2023-11-28 21:04:25','2023-11-28 21:04:25',1),
('New Pixel Phone','Pixel Phone','smartphone','https://picsum.photos/id/111/200/300',900,'New Pixel Google Phone !!!',5,'2023-11-28 21:38:53','2023-11-28 21:38:53',2),
('New Samsung','Samsung S23','smartphone','https://picsum.photos/id/21/200/300',1000,'New Samsung S23 !!',2,'2023-11-28 21:46:45','2023-11-28 21:46:45',1),
('Samsung tab','Samsung tab 5','tablet','https://picsum.photos/id/69/200/300',111,'New Samsung tab',1,'2023-11-28 21:48:23','2023-11-28 21:48:23',2);

INSERT INTO "customer" 
("email", "lastname", "firstname", "password", "number", "city", "address", "zip_code", "phone", "created_date")
VALUES 
('c1@email.com', 'Bouillavette', 'Georgette', '$2b$10$ba2iLjcnp3ujUKHoZC7tZewWRw3jDf.F2e/oas.uQwh2HKSZ6gxEe', 69, 'Lyon', 'Rue de la poupée qui tousse', '69001', '', CURRENT_TIMESTAMP), 
('c2@email.com', 'Chnicavette', 'Bernadette', '$2b$10$ba2iLjcnp3ujUKHoZC7tZewWRw3jDf.F2e/oas.uQwh2HKSZ6gxEe', null, '', '', '', '', CURRENT_TIMESTAMP);

INSERT INTO "cart" 
("id_customer", "created_date")
VALUES 
(1, CURRENT_TIMESTAMP), (2, CURRENT_TIMESTAMP);

INSERT INTO "cart_item" 
("id_cart", "id_product", "quantity", "created_date")
VALUES 
(1, 1, 1, CURRENT_TIMESTAMP), (2, 2, 1, CURRENT_TIMESTAMP);

COMMIT;