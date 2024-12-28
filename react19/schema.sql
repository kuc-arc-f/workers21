DROP TABLE IF EXISTS Customers;
CREATE TABLE Customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdAt TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP(3) NULL,
  CompanyName TEXT NOT NULL,
  ContactName TEXT NOT NULL
);

INSERT INTO Customers (CompanyName, ContactName) VALUES ('Alfreds Futterkiste', 'Maria Anders');
INSERT INTO Customers (CompanyName, ContactName) VALUES ('Around the Horn', 'Thomas Hardy');
INSERT INTO Customers (CompanyName, ContactName) VALUES ('Bs Beverages', 'Victoria Ashworth');

---todos
CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

---
CREATE TABLE IF NOT EXISTS todo2 (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  public BOOLEAN NOT NULL DEFAULT false,
  foodOrange BOOLEAN NOT NULL DEFAULT false,
  foodApple BOOLEAN NOT NULL DEFAULT false,
  foodBanana BOOLEAN NOT NULL DEFAULT false,
  pubDate TEXT NOT NULL,
  qty1 TEXT NOT NULL,
  qty2 TEXT NOT NULL,
  qty3 TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

---
CREATE TABLE IF NOT EXISTS todo3 (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT,
  contentType TEXT,
  age TEXT,
  public BOOLEAN DEFAULT false,
  foodOrange BOOLEAN DEFAULT false,
  foodApple BOOLEAN DEFAULT false,
  foodBanana BOOLEAN DEFAULT false,
  foodMelon BOOLEAN DEFAULT false,
  foodGrape BOOLEAN DEFAULT false,
  datePublish TEXT,
  dateUpdate TEXT,
  postNumber TEXT,
  addressCountry TEXT,
  addressPref TEXT,
  addressCity TEXT,
  address1 TEXT,
  address2 TEXT,
  textOption1 TEXT,
  textOption2 TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

---
CREATE TABLE IF NOT EXISTS todo4 (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

---
CREATE TABLE IF NOT EXISTS todo5 (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  public BOOLEAN NOT NULL DEFAULT 0,
  foodOrange BOOLEAN NOT NULL DEFAULT 0,
  foodApple BOOLEAN NOT NULL DEFAULT 0,
  foodBanana BOOLEAN NOT NULL DEFAULT 0,
  pubDate TEXT NOT NULL,
  qty1 TEXT NOT NULL,
  qty2 TEXT NOT NULL,
  qty3 TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);
---todo11
CREATE TABLE IF NOT EXISTS todo11 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
---todo12
CREATE TABLE todo12 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    public INTEGER NOT NULL DEFAULT 0,
    food_orange INTEGER NOT NULL DEFAULT 0,
    food_apple INTEGER NOT NULL DEFAULT 0,
    food_banana INTEGER NOT NULL DEFAULT 0,
    pub_date TEXT NOT NULL,
    qty1 TEXT,
    qty2 TEXT,
    qty3 TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
---todo13
CREATE TABLE todo13 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT,
    content_type TEXT,
    is_public BOOLEAN DEFAULT false,
    food_orange BOOLEAN DEFAULT false,
    food_apple BOOLEAN DEFAULT false,
    food_banana BOOLEAN DEFAULT false,
    food_melon BOOLEAN DEFAULT false,
    food_grape BOOLEAN DEFAULT false,
    pub_date1 DATE,
    pub_date2 DATE,
    pub_date3 DATE,
    pub_date4 DATE,
    pub_date5 DATE,
    pub_date6 DATE,
    qty1 TEXT,
    qty2 TEXT,
    qty3 TEXT,
    qty4 TEXT,
    qty5 TEXT,
    qty6 TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


---todo14
CREATE TABLE todo14 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

---todo15
CREATE TABLE todo15 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    public_type TEXT,
    food_orange BOOLEAN,
    food_apple BOOLEAN,
    food_banana BOOLEAN,
    pub_date1 TEXT,
    pub_date2 TEXT,
    pub_date3 TEXT,
    qty1 TEXT,
    qty2 TEXT,
    qty3 TEXT
);
---todo16
CREATE TABLE todo16 (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  content TEXT,
  content_type TEXT,
  public_type TEXT,
  food_orange BOOLEAN,
  food_apple BOOLEAN,
  food_banana BOOLEAN,
  food_melon BOOLEAN,
  food_grape BOOLEAN,
  category_food BOOLEAN,
  category_drink BOOLEAN,
  category_gadget BOOLEAN,
  category_sport BOOLEAN,
  category_government BOOLEAN,
  category_internet BOOLEAN,
  category_smartphone BOOLEAN,
  country_jp TEXT,
  country_en TEXT,
  prefecture_jp TEXT,
  prefecture_en TEXT,
  post_no_jp TEXT,
  post_no_en TEXT,
  address_1_jp TEXT,
  address_1_en TEXT,
  address_2_jp TEXT,
  address_2_en TEXT,
  address_other_jp TEXT,
  address_other_en TEXT,
  pub_date1 TEXT,
  pub_date2 TEXT,
  pub_date3 TEXT,
  pub_date4 TEXT,
  pub_date5 TEXT,
  pub_date6 TEXT,
  qty1 TEXT,
  qty2 TEXT,
  qty3 TEXT,
  qty4 TEXT,
  qty5 TEXT,
  qty6 TEXT
);
---todo17
CREATE TABLE todo17 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT,
    content_type TEXT,
    public_type TEXT,
    food_orange INTEGER DEFAULT 0,
    food_apple INTEGER DEFAULT 0,
    food_banana INTEGER DEFAULT 0,
    food_melon INTEGER DEFAULT 0,
    food_grape INTEGER DEFAULT 0,
    category_food INTEGER DEFAULT 0,
    category_drink INTEGER DEFAULT 0,
    category_gadget INTEGER DEFAULT 0,
    category_sport INTEGER DEFAULT 0,
    category_government INTEGER DEFAULT 0,
    category_internet INTEGER DEFAULT 0,
    category_smartphone INTEGER DEFAULT 0,
    country_jp TEXT,
    country_en TEXT,
    prefecture_jp TEXT,
    prefecture_en TEXT,
    post_no_jp TEXT,
    post_no_en TEXT,
    address_1_jp TEXT,
    address_1_en TEXT,
    address_2_jp TEXT,
    address_2_en TEXT,
    address_other_jp TEXT,
    address_other_en TEXT,
    pub_date1 TEXT,
    pub_date2 TEXT,
    pub_date3 TEXT,
    pub_date4 TEXT,
    pub_date5 TEXT,
    pub_date6 TEXT,
    qty1 TEXT,
    qty2 TEXT,
    qty3 TEXT,
    qty4 TEXT,
    qty5 TEXT,
    qty6 TEXT
);
---
CREATE TABLE todo21 (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);




