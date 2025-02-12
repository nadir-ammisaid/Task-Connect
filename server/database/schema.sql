CREATE TABLE user (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role ENUM('customer', 'tasker', 'both') NOT NULL,
    password VARCHAR(255) NOT NULL,
    average_rating DECIMAL(3,2) DEFAULT NULL,
    total_reviews INT UNSIGNED DEFAULT 0
);

CREATE TABLE customer (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    total_requests INT UNSIGNED DEFAULT 0,
    user_id INT UNSIGNED UNIQUE NOT NULL,
    CONSTRAINT fk_customer_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE tasker (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    total_tasks INT UNSIGNED DEFAULT 0,
    user_id INT UNSIGNED UNIQUE NOT NULL,
    CONSTRAINT fk_tasker_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE category (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name ENUM('DIY', 'Gardening', 'Moving', 'Cleaning', 'Other') NOT NULL
);

CREATE TABLE task (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255),
    image VARCHAR(255),
    status ENUM('open', 'assigned', 'completed', 'cancelled') NOT NULL DEFAULT 'open',
    selected_offer INT UNSIGNED DEFAULT NULL,
    customer_id INT UNSIGNED NOT NULL,
    category_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_task_customer FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE,
    CONSTRAINT fk_task_category FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);

CREATE TABLE offer (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    price DECIMAL(10,2) UNSIGNED NOT NULL,
    currency VARCHAR(10) NOT NULL,
    comment TEXT,
    tasker_id INT UNSIGNED NOT NULL,
    task_id INT UNSIGNED NOT NULL,
    status ENUM('pending', 'accepted') DEFAULT 'pending',
    CONSTRAINT fk_offer_tasker FOREIGN KEY (tasker_id) REFERENCES tasker(id) ON DELETE CASCADE,
    CONSTRAINT fk_offer_task FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE
);

-- Ajout de la contrainte de clé étrangère pour selected_offer après la création de la table offer
ALTER TABLE task
ADD CONSTRAINT fk_task_selected_offer 
FOREIGN KEY (selected_offer) REFERENCES offer(id) ON DELETE SET NULL;

CREATE TABLE review (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    rating TINYINT UNSIGNED CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    reviewer_id INT UNSIGNED NOT NULL,
    reviewee_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_reviewer FOREIGN KEY (reviewer_id) REFERENCES user(id) ON DELETE CASCADE,
    CONSTRAINT fk_reviewee FOREIGN KEY (reviewee_id) REFERENCES user(id) ON DELETE CASCADE,
    CONSTRAINT chk_reviewer_reviewee CHECK (reviewer_id <> reviewee_id)
);

-- Insertions des données de test
INSERT INTO user (firstname, lastname, email, role, password, average_rating, total_reviews) VALUES
('John', 'Doe', 'john.doe@example.com', 'customer', '$2b$10$fakeHashedPassword1', 4.5, 3),
('Jane', 'Smith', 'jane.smith@example.com', 'tasker', '$2b$10$fakeHashedPassword2', 4.8, 5),
('Mike', 'Johnson', 'mike.johnson@example.com', 'both', '$2b$10$fakeHashedPassword3', 4.2, 4),
('Sarah', 'Williams', 'sarah.williams@example.com', 'customer', '$2b$10$fakeHashedPassword4', 4.7, 2),
('David', 'Brown', 'david.brown@example.com', 'tasker', '$2b$10$fakeHashedPassword5', 4.9, 6);

INSERT INTO customer (user_id, total_requests) VALUES
((SELECT id FROM user WHERE email = 'john.doe@example.com'), 3),
((SELECT id FROM user WHERE email = 'sarah.williams@example.com'), 2);

INSERT INTO tasker (user_id, total_tasks) VALUES
((SELECT id FROM user WHERE email = 'jane.smith@example.com'), 5),
((SELECT id FROM user WHERE email = 'david.brown@example.com'), 2);

INSERT INTO category (name) VALUES
('DIY'),
('Gardening'),
('Moving'),
('Cleaning'),
('Other');

INSERT INTO task (title, description, location, image, status, customer_id, category_id) VALUES
('Réparer une étagère', 'Besoin d\'aide pour fixer une étagère dans le salon', 'Paris', NULL, 'open', 
    (SELECT id FROM customer WHERE user_id = (SELECT id FROM user WHERE email = 'john.doe@example.com')), 
    (SELECT id FROM category WHERE name = 'DIY')),('Installation climatisation murale', 'Installation d\'une climatisation réversible dans le séjour, prévoir perçage du mur extérieur', 'Lyon', NULL, 'open', 
    (SELECT id FROM customer WHERE user_id = (SELECT id FROM user WHERE email = 'john.doe@example.com')), 
    (SELECT id FROM category WHERE name = 'DIY')),
('Déménagement studio 30m²', 'Aide au déménagement d\'un studio au 2ème étage sans ascenseur, principalement des meubles et cartons', 'Nice', NULL, 'open', 
    (SELECT id FROM customer WHERE user_id = (SELECT id FROM user WHERE email = 'sarah.williams@example.com')), 
    (SELECT id FROM category WHERE name = 'Moving')),
('Tondre la pelouse', 'Tonte complète du jardin', 'Marseille', NULL, 'assigned', 
    (SELECT id FROM customer WHERE user_id = (SELECT id FROM user WHERE email = 'sarah.williams@example.com')), 
    (SELECT id FROM category WHERE name = 'Gardening'));

INSERT INTO offer (price, currency, comment, tasker_id, task_id, status) VALUES
(50.00, 'EUR', 'Je peux le faire rapidement', 
    (SELECT id FROM tasker WHERE user_id = (SELECT id FROM user WHERE email = 'jane.smith@example.com')), 
    (SELECT id FROM task WHERE title = 'Réparer une étagère'), 
    'pending'),
(80.00, 'EUR', 'Expertise garantie', 
    (SELECT id FROM tasker WHERE user_id = (SELECT id FROM user WHERE email = 'david.brown@example.com')), 
    (SELECT id FROM task WHERE title = 'Réparer une étagère'), 
    'pending');

INSERT INTO review (rating, comment, reviewer_id, reviewee_id) VALUES
(4, 'Très bon travail', 
    (SELECT id FROM user WHERE email = 'john.doe@example.com'), 
    (SELECT id FROM user WHERE email = 'jane.smith@example.com')),
(5, 'Parfait, rapide et efficace', 
    (SELECT id FROM user WHERE email = 'sarah.williams@example.com'), 
    (SELECT id FROM user WHERE email = 'jane.smith@example.com')),
(5, 'Service impeccable', 
    (SELECT id FROM user WHERE email = 'mike.johnson@example.com'), 
    (SELECT id FROM user WHERE email = 'david.brown@example.com')),
(4, 'Très professionnel', 
    (SELECT id FROM user WHERE email = 'john.doe@example.com'), 
    (SELECT id FROM user WHERE email = 'david.brown@example.com'));