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

INSERT INTO category (name) VALUES
('DIY'),
('Gardening'),
('Moving'),
('Cleaning'),
('Other');

INSERT INTO user (firstname, lastname, email, role, password, average_rating, total_reviews) VALUES
('Nadir', 'AMMI SAID', 'nadir.ammisaid@gmail.com', 'customer', '$2b$10$fakeHashedPassword0', 4.9, 8),
('Lucas', 'Moreau', 'lucas.moreau@gmail.com', 'customer', '$2b$10$fakeHashedPassword1', 4.5, 3),
('Camille', 'Dubois', 'camille.dubois@gmail.com', 'tasker', '$2b$10$fakeHashedPassword2', 4.8, 5),
('Antoine', 'Lemoine', 'antoine.lemoine@gmail.com', 'both', '$2b$10$fakeHashedPassword3', 4.2, 4),
('Émilie', 'Renard', 'emilie.renard@gmail.com', 'customer', '$2b$10$fakeHashedPassword4', 4.7, 2),
('Julien', 'Bernard', 'julien.bernard@gmail.com', 'tasker', '$2b$10$fakeHashedPassword5', 4.9, 6);

INSERT INTO customer (user_id, total_requests) VALUES
((SELECT id FROM user WHERE email = 'nadir.ammisaid@gmail.com'), 1),
((SELECT id FROM user WHERE email = 'lucas.moreau@gmail.com'), 3),
((SELECT id FROM user WHERE email = 'antoine.lemoine@gmail.com'), 5),
((SELECT id FROM user WHERE email = 'camille.dubois@gmail.com'), 4),
((SELECT id FROM user WHERE email = 'emilie.renard@gmail.com'), 2);

INSERT INTO tasker (user_id, total_tasks) VALUES
((SELECT id FROM user WHERE email = 'julien.bernard@gmail.com'), 2);

INSERT INTO task (title, description, location, image, status, customer_id, category_id) VALUES
('Kitchen furniture installation', 'Need help installing a complete IKEA kitchen in a 70m² apartment. The kitchen includes wall and base units, a worktop, a sink and built-in appliances. Furniture is already on site. Please bring necessary tools. Estimated work time: full day.', 'Villeurbanne - 69100', "/uploads/kitchen.png", 'open', 
    (SELECT id FROM customer WHERE user_id = (SELECT id FROM user WHERE email = 'antoine.lemoine@gmail.com')), 
    (SELECT id FROM category WHERE name = 'DIY')),

('Deep house cleaning', 'Deep cleaning of an 85m² apartment before moving out. 4 rooms + kitchen and bathroom. Includes window cleaning, floor cleaning, bathroom sanitizing and descaling. Products and equipment must be provided by the service provider.', 'Vénissieux - 69200', "/uploads/house-cleaning-service-florida.jpg", 'assigned', 
    (SELECT id FROM customer WHERE user_id = (SELECT id FROM user WHERE email = 'lucas.moreau@gmail.com')), 
    (SELECT id FROM category WHERE name = 'Cleaning')),

('Garden maintenance and hedge trimming', 'Large garden requiring 25-meter hedge trimming, 200m² lawn mowing, and flower bed weeding. Equipment can be provided on site. Estimated work: full day job. Garden is well maintained, just needs regular upkeep.', 'Caluire-et-Cuire - 69300', "/uploads/garden.jpg", 'open', 
    (SELECT id FROM customer WHERE user_id = (SELECT id FROM user WHERE email = 'nadir.ammisaid@gmail.com')), 
    (SELECT id FROM category WHERE name = 'Gardening')),

('House moving 120m²', 'Moving a family house to another location 15km away. Furniture to be dismantled and reassembled, about 50 boxes to transport. 20m3 truck needed. Easy access on both sides, no stairs. Need help with packing and unpacking.', 'Bron - 69500', "/uploads/moving-boxes.jpg", 'assigned', 
    (SELECT id FROM customer WHERE user_id = (SELECT id FROM user WHERE email = 'emilie.renard@gmail.com')), 
    (SELECT id FROM category WHERE name = 'Moving')),

('Bathroom leak repair', 'Leak in shower joint causing infiltration. Requires replacement of silicone joint and potentially part of the wall tiling (2-3 tiles). Urgent intervention needed. Bathroom is on first floor, easy access.', 'Vaulx-en-Velin - 69120', "/uploads/bathroom.png", 'open', 
    (SELECT id FROM customer WHERE user_id = (SELECT id FROM user WHERE email = 'camille.dubois@gmail.com')), 
    (SELECT id FROM category WHERE name = 'DIY')),

('Electric awning installation', 'Installation of two electric awnings on a terrace. Awnings already purchased (Somfy), surface 4m x 3m each. Requires drilling in facade and electrical connection. Height: 2.5m. Professional experience required.', 'Écully - 69130', "/uploads/electrical-awning.jpg", 'assigned', 
    (SELECT id FROM customer WHERE user_id = (SELECT id FROM user WHERE email = 'lucas.moreau@gmail.com')), 
    (SELECT id FROM category WHERE name = 'DIY')),

('Student studio renovation', 'Complete cleaning of a 25m² student studio after 2 years of rental. Includes wall washing, window cleaning, bathroom descaling, kitchen degreasing. Minor repairs expected. All cleaning supplies must be provided.', 'Oullins - 69600', "/uploads/studio.jpg", 'open', 
    (SELECT id FROM customer WHERE user_id = (SELECT id FROM user WHERE email = 'antoine.lemoine@gmail.com')), 
    (SELECT id FROM category WHERE name = 'Cleaning')),

('Flower bed creation', 'Creation of a 15m² flower bed: soil preparation, planting perennials and shrubs, installation of automatic watering system. Plants will be provided. Ground already cleared. Looking for someone with gardening experience.', 'Saint-Priest - 69800', "/uploads/flower.png", 'assigned', 
    (SELECT id FROM customer WHERE user_id = (SELECT id FROM user WHERE email = 'camille.dubois@gmail.com')), 
    (SELECT id FROM category WHERE name = 'Gardening')),

('Wardrobe furniture assembly', 'Assembly of several IKEA PAX wardrobe units: 3 wardrobes with sliding doors, interior shelves and drawers. Total dimensions: 3.5m wide x 2.4m high. Furniture already on site. Experience with IKEA furniture required.', 'Tassin-la-Demi-Lune - 69160', "/uploads/furniture-assembler.png", 'open', 
    (SELECT id FROM customer WHERE user_id = (SELECT id FROM user WHERE email = 'lucas.moreau@gmail.com')), 
    (SELECT id FROM category WHERE name = 'DIY')),

('Urgent moving help needed', 'Urgent move from a 2-bedroom apartment on 4th floor without elevator to a 1-bedroom on 2nd floor with elevator. About 30 boxes and some furniture to dismantle/reassemble. 5km distance. Minimum 2 people needed.', 'Décines-Charpieu - 69150', "/uploads/local-moving-help.jpg", 'assigned', 
    (SELECT id FROM customer WHERE user_id = (SELECT id FROM user WHERE email = 'emilie.renard@gmail.com')), 
    (SELECT id FROM category WHERE name = 'Moving')),

('Montage étagères et fixation au mur', 'Besoin d''aide pour monter et fixer 3 étagères IKEA au mur dans un salon. Hauteur 2m, mur en béton, chevilles et vis fournies. Outils de base disponibles. Travail estimé à 2-3 heures. Personne soigneuse et expérimentée en bricolage recherchée.', 'Villeurbanne - 69100', "/uploads/shelves.jpg", 'open', 
    (SELECT id FROM customer WHERE user_id = (SELECT id FROM user WHERE email = 'nadir.ammisaid@gmail.com')), 
    (SELECT id FROM category WHERE name = 'DIY'));


-- INSERT INTO offer (price, currency, comment, tasker_id, task_id, status) VALUES
-- (150.00, 'EUR', 'I can do this quickly, I have experience with IKEA kitchens', 
--     (SELECT id FROM tasker WHERE user_id = (SELECT id FROM user WHERE email = 'camille.dubois@gmail.com')), 
--     2,
--     'pending'),
-- (180.00, 'EUR', 'Professional experience, all tools provided', 
--     (SELECT id FROM tasker WHERE user_id = (SELECT id FROM user WHERE email = 'julien.bernard@gmail.com')), 
--     2,
--     'pending'),
-- (120.00, 'EUR', 'Available immediately, 5 years of experience', 
--     (SELECT id FROM tasker WHERE user_id = (SELECT id FROM user WHERE email = 'camille.dubois@gmail.com')), 
--     3,
--     'pending');

-- INSERT INTO review (rating, comment, reviewer_id, reviewee_id) VALUES
-- (4, 'Très bon travail', 
--     (SELECT id FROM user WHERE email = 'lucas.moreau@gmail.com'), 
--     (SELECT id FROM user WHERE email = 'camille.dubois@gmail.com')),
-- (5, 'Parfait, rapide et efficace', 
--     (SELECT id FROM user WHERE email = 'emilie.renard@gmail.com'), 
--     (SELECT id FROM user WHERE email = 'camille.dubois@gmail.com')),
-- (5, 'Service impeccable', 
--     (SELECT id FROM user WHERE email = 'antoine.lemoine@gmail.com'), 
--     (SELECT id FROM user WHERE email = 'julien.bernard@gmail.com')),
-- (4, 'Très professionnel', 
--     (SELECT id FROM user WHERE email = 'lucas.moreau@gmail.com'), 
--     (SELECT id FROM user WHERE email = 'julien.bernard@gmail.com'));