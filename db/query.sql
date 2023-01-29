SELECT * from game_shop.games LEFT JOIN game_shop.game_category ON game_shop.games.id = game_shop.game_category.game_id INNER JOIN game_shop.categories ON game_shop.categories.id = game_shop.game_category.category_id;

CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `game_shop`.`all_categories` AS
    SELECT 
        `game_shop`.`games`.`name` AS `name`,
        `game_shop`.`games`.`description` AS `description`,
        `game_shop`.`games`.`rating` AS `rating`,
        `game_shop`.`games`.`image` AS `image`,
        `game_shop`.`categories`.`name` AS `category`,
        `game_shop`.`games`.`id` AS `id`
    FROM
        ((`game_shop`.`games`
        LEFT JOIN `game_shop`.`game_category` ON ((`game_shop`.`games`.`id` = `game_shop`.`game_category`.`game_id`)))
        JOIN `game_shop`.`categories` ON ((`game_shop`.`categories`.`id` = `game_shop`.`game_category`.`category_id`)))

CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `game_shop`.`all_consoles` AS
    SELECT 
        `game_shop`.`games`.`name` AS `name`,
        `game_shop`.`games`.`description` AS `description`,
        `game_shop`.`games`.`rating` AS `rating`,
        `game_shop`.`games`.`image` AS `image`,
        `game_shop`.`consoles`.`name` AS `console`,
        `game_shop`.`games`.`id` AS `id`
    FROM
        ((`game_shop`.`games`
        LEFT JOIN `game_shop`.`game_console` ON ((`game_shop`.`games`.`id` = `game_shop`.`game_console`.`game_id`)))
        JOIN `game_shop`.`consoles` ON ((`game_shop`.`consoles`.`id` = `game_shop`.`game_console`.`console_id`)))