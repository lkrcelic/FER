const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "web1-lab3",
  password: "bazepodataka",
  port: 5432,
});

const sql_create_inventory = `DROP TABLE IF EXISTS inventory;
    CREATE TABLE inventory (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL UNIQUE,
    price numeric NOT NULL,
    categoryId int NOT NULL,
    imageUrl text NOT NULL,
    colors text NOT NULL
)`;

const sql_create_categories = `DROP TABLE IF EXISTS categories;
    CREATE TABLE categories (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL UNIQUE,
    description text NOT NULL,
    seasonal text NOT NULL
)`;

const sql_insert_inventory = `INSERT INTO inventory (
    name, price, categoryId, imageUrl, colors)
    VALUES 
    ('Tulip', 10, 1, 'https://i.imgur.com/Ttir6mp.jpg', 'white, red, yellow'),
    ('Lavender', 15, 1, 'https://i.imgur.com/gH33WyT.jpg', 'blue'),
    ('Fuchsia', 50, 1, 'https://i.imgur.com/s27QJBL.jpg', 'red-purple, white-purple, white-pink'),
    ('Daisy', 30, 1, 'https://i.imgur.com/Agarl4v.jpg', 'white'),
    ('Orchid', 90, 2, 'https://i.imgur.com/Dx4q8uE.jpg', 'green, white, purple'),
    ('Fittonia', 80, 2, 'https://i.imgur.com/G9JfR3S.jpg', 'green, red'),
    ('Showel', 150, 3, 'https://i.imgur.com/BcjgzeT.jpg', 'metal'),
    ('Small showel', 50, 3, 'https://i.imgur.com/L80eL1e.jpg', 'metal'),
    ('Rake', 100, 3, 'https://i.imgur.com/I5ctUan.jpg', 'metal'),
    ('Tulip (1 kg)', 200, 4, 'https://i.imgur.com/WUYYzBG.jpg', 'white, mix, yellow');
`;

const sql_insert_category = `INSERT INTO categories (name, description, seasonal) VALUES 
    ('Flowers', 'Flowers make us smile', 'Yes'),
    ('Indoor plants', 'Bring nature inside', 'No'),
    ('Tools', 'Every gardener needs good tools', 'No'),
    ('Seeds', 'Grow your own plants', 'No'),
    ('Pots', 'Many sizes and styles', 'No'),
    ('Fertilizers', 'Essential nutrients', 'No');
`;

const sql_create_buyers = `DROP TABLE IF EXISTS buyers;
    CREATE TABLE buyers (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL,
    surname text NOT NULL,
    country text NOT NULL,
    email text NOT NULL,
    buyersince int NOT NULL,
    buyerof int NOT NULL
)`;

const sql_insert_buyers = `INSERT INTO buyers (name, surname, country, email, buyerSince, buyerOf) VALUES 
    ('Štihić', 'Mihić', 'Croatia', 'stihaca@stihanje.hr', 2002, 7),
    ('Trnić', 'Okić', 'Croatia', 'trn@oko.hr', 2010, 1),
    ('Ivo', 'Ivić', 'Croatia', 'ivo.ivic23423423@flower.com', 2019, 9),
    ('Ivančica', 'Ivić', 'Croatia', 'ivic.ivancica23444@flower.hr', 2011, 5),
    ('Franka', 'Frankić', 'Croatia', 'frankic@cvjetic.hr', 2012, 7),
    ('Goga', 'Gogica', 'Croatia', 'goga.gogica1818@flowerfan.hr', 2000, 1),
    ('Vera', 'Verica', 'Croatia', 'vera.verica81812@flowerfan.hr', 2003, 4),
    ('Slatkica', 'Marelica', 'Croatia', 'slatka@marelica.hr', 2020, 8);
`;

pool.query(sql_create_inventory, [], (err, result) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful creation of the 'inventory' table");
  pool.query(sql_insert_inventory, [], (err, result) => {
    if (err) {
      return console.error(err.message);
    }
  });
});

pool.query(sql_create_categories, [], (err, result) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful creation of the 'categories' table");
  pool.query(sql_insert_category, [], (err, result) => {
    if (err) {
      return console.error(err.message);
    }
  });
});

pool.query(sql_create_buyers, [], (err, result) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful creation of the 'buyers' table");
  pool.query(sql_insert_buyers, [], (err, result) => {
    if (err) {
      return console.error(err.message);
    }
  });
});
