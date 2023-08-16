CREATE TABLE `products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `price` FLOAT(10,2) NOT NULL,
  `size` ENUM('S', 'M', 'L') NOT NULL,
  `photo` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `products` (`name`, `price`, `size`, `photo`)
VALUES ('Camiseta PP on Heart', 20.00, 'M', 'caminho/para/foto1.jpg');

INSERT INTO `products` (`name`, `price`, `size`, `photo`)
VALUES ('Camiseta Paypal Logo', 10.00, 'P', 'caminho/para/foto2.jpg');
