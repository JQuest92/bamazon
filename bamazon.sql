DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL(10,2),
    stock_quantity INT,
    primary key(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES	("Yu-Gi-Oh! Trading Card Game Savage Strike", "Hobby", 3.99, 100),
		("Pokemon Trading Card Game TagTeam GX", "Hobby", 4.12, 100),
        ("Force of Will Trading Card Game Valhala Cluster", "Hobby", 3.99, 100),
        ("Cardfight! Vangaurd Trading Card Game Starter Deck", "Hobby", 9.99, 100),
        ("Halo: Combat Evolved", "Digital Entertainment", 39.99, 100),
        ("The Elder Scrolls Online", "Digital Entertainment", 29.99, 100),
        ("Yu-Gi-Oh! Duel Links", "Digital Entertainment", .99, 100),
        ("Digimon Cyber Sleuth", "Digital Entertainment", 19.99, 100),
        ("Female Anime Body Pillow", "Comfort", 199.99, 100),
        ("Male Anime Body Pillow", "Comfort", 199.99, 100);
        
        select * from products
        
;
