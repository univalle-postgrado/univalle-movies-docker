-- Inserción de categorías
INSERT INTO categories (title, description, enabled) VALUES
('Acción', 'Películas de alta intensidad', true),
('Comedia', 'Películas divertidas y entretenidas', true),
('Drama', 'Películas que exploran emociones profundas', true),
('Ciencia ficción', 'Películas que exploran temas de ciencia y tecnología', true),
('Terror', 'Películas diseñadas para asustar', true),
('Animación', 'Películas creadas a partir de dibujos o imágenes generadas por computadora', true);

-- Inserción de películas de Acción
INSERT INTO movies (title, synopsis, director, release_date, poster_url, rating, category_id) VALUES
('John Wick: Capítulo 4', 'Un ex-asesino se enfrenta a una poderosa organización criminal en una búsqueda de venganza global.', 'Chad Stahelski', '2023-03-24', 'https://example.com/johnwick4.jpg', 8.6, 1),
('Mad Max: Fury Road', 'En un mundo post-apocalíptico, una mujer lucha por escapar.', 'George Miller', '2015-05-15', 'https://example.com/madmax.jpg', 8.1, 1),
('The Matrix', 'Un programador descubre la verdadera naturaleza de la realidad.', 'Lana Wachowski', '1999-03-31', 'https://example.com/matrix.jpg', 8.7, 1),
('Misión Imposible: Fallout', 'Ethan Hunt y su equipo se enfrentan a una misión casi imposible para evitar que una organización terrorista adquiera armas nucleares.', 'Christopher McQuarrie', '2018-07-27', 'https://example.com/missionimpossiblefallout.jpg', 7.8, 1),
('Atomic Blonde', 'Una espía de élite debe infiltrarse en Berlín Oriental durante la Guerra Fría para recuperar una lista de agentes dobles.', 'David Leitch', '2017-07-28', 'https://example.com/atomicblonde.jpg', 6.9, 1);

-- Inserción de películas de Comedia
INSERT INTO movies (title, synopsis, director, release_date, poster_url, rating, category_id) VALUES
('Todo en todas partes al mismo tiempo', 'Una mujer de mediana edad es arrastrada a una aventura interdimensional donde debe conectar con versiones alternativas de sí misma para salvar el multiverso.', 'Daniel Kwan', '2023-03-31', 'https://example.com/todoentodaspartes.jpg', 8.0, 2),
('The Big Lebowski', 'Un holgazán se ve envuelto en una serie de eventos extraños.', 'Joel Coen', '1998-03-06', 'https://example.com/biglebowski.jpg', 8.1, 2),
('Bridesmaids', 'Una mujer lucha por ser la dama de honor perfecta.', 'Paul Feig', '2011-05-13', 'https://example.com/bridesmaids.jpg', 6.9, 2),
('The Hangover', 'Un grupo de amigos trata de recordar lo que pasó en una despedida de soltero.', 'Todd Phillips', '2009-06-5', 'https://example.com/hangover.jpg', 7.8, 2),
('Superbad', 'Dos adolescentes inseparables intentan conseguir alcohol para una fiesta antes de ir a la universidad.', 'Greg Mottola', '2007-08-17', 'https://example.com/superbad.jpg', 7.6, 2);

-- Inserción de películas de Drama
INSERT INTO movies (title, synopsis, director, release_date, poster_url, rating, category_id) VALUES
('El padrino', 'La historia de una poderosa familia mafiosa italiana en Estados Unidos.', 'Francis Ford Coppola', '1972-03-15', 'https://example.com/elpadrino.jpg', 9.2, 3),
('12 años de esclavitud', 'La verdadera historia de Solomon Northup, un hombre libre que fue secuestrado y vendido como esclavo.', 'Steve McQueen', '2013-10-18', 'https://example.com/12añosdeesclavitud.jpg', 8.1, 3),
('La lista de Schindler', 'Un empresario alemán salva la vida de más de mil judíos durante el Holocausto.', 'Steven Spielberg', '1993-12-15', 'https://example.com/lalistadeschindler.jpg', 8.9, 3),
('El pianista', 'La historia de un pianista polaco que lucha por sobrevivir en el gueto de Varsovia durante la Segunda Guerra Mundial.', 'Roman Polanski', '2002-12-15', 'https://example.com/elpianista.jpg', 8.5, 3),
('Call Me by Your Name', 'Una historia de amor entre un joven de 17 años y un estudiante de posgrado en Italia durante los años 80.', 'Luca Guadagnino', '2017-11-24', 'https://example.com/callmebyyourname.jpg', 8.4, 3);

-- Inserción de películas de Ciencia Ficción
INSERT INTO movies (title, synopsis, director, release_date, poster_url, rating, category_id) VALUES
('Interstellar', 'Un grupo de astronautas emprende un viaje a través de un agujero de gusano para encontrar un nuevo hogar para la humanidad.', 'Christopher Nolan', '2014-11-07', 'https://example.com/interstellar.jpg', 8.6, 4),
('Blade Runner 2049', 'Un nuevo "blade runner" descubre un secreto que podría poner en peligro la sociedad.', 'Denis Villeneuve', '2017-10-06', 'https://example.com/bladerunner2049.jpg', 8.0, 4),
('Dune', 'Un joven noble debe viajar a un planeta desértico para asegurar el futuro de su familia y su pueblo.', 'Denis Villeneuve', '2021-10-21', 'https://example.com/dune.jpg', 8.3, 4),
('Arrival', 'Una lingüista intenta comunicarse con extraterrestres que han llegado a la Tierra.', 'Denis Villeneuve', '2016-11-11', 'https://example.com/arrival.jpg', 8.0, 4),
('Matrix', 'Un programador descubre la verdadera naturaleza de la realidad.', 'Lana Wachowski', '1999-03-31', 'https://example.com/matrix.jpg', 8.7, 4);

-- Inserción de películas de Terror
INSERT INTO movies (title, synopsis, director, release_date, poster_url, rating, category_id) VALUES
('El exorcista', 'Una niña es poseída por una fuerza demoníaca y su madre busca la ayuda de un sacerdote para exorcizarla.', 'William Friedkin', '1973-12-26', 'https://example.com/elexorcista.jpg', 8.1, 5),
('El resplandor', 'Un escritor lleva a su familia a un hotel aislado durante el invierno, donde comienzan a ocurrir eventos sobrenaturales.', 'Stanley Kubrick', '1980-05-23', 'https://example.com/elresplandor.jpg', 8.4, 5),
('El conjuro', 'Una pareja de investigadores paranormales ayuda a una familia a deshacerse de una presencia demoníaca en su casa.', 'James Wan', '2013-07-19', 'https://example.com/elconjuro.jpg', 7.5, 5),
('It', 'Un grupo de niños debe enfrentarse a un antiguo mal que toma la forma de un payaso asesino.', 'Andrés Muschietti', '2017-09-8', 'https://example.com/it.jpg', 7.3, 5),
('Us', 'Una familia se encuentra con versiones siniestras de sí mismos durante unas vacaciones en la playa.', 'Jordan Peele', '2019-03-22', 'https://example.com/us.jpg', 7.1, 5);

-- Inserción de películas de Animación
INSERT INTO movies (title, synopsis, director, release_date, poster_url, rating, category_id) VALUES
('Soul', 'Un músico de jazz recibe la oportunidad de explorar qué significa realmente tener alma.', 'Pete Docter', '2020-12-25', 'https://example.com/soul.jpg', 8.3, 6),
('Spider-Man: Un nuevo universo', 'Miles Morales, un adolescente afro-latino, se convierte en Spider-Man y se une a otros Spider-Men de diferentes dimensiones.', 'Bob Persichetti', '2018-12-14', 'https://example.com/spidermanunnuevouniverso.jpg', 8.7, 6),
('Coco', 'Un niño de 12 años viaja a la Tierra de los Muertos para reunirse con su bisabuelo y descubrir la verdadera historia de su familia.', 'Lee Unkrich', '2017-11-22', 'https://example.com/coco.jpg', 8.4, 6),
('Toy Story', 'Un grupo de juguetes cobra vida cuando sus dueños no están.', 'John Lasseter', '1995-11-22', 'https://example.com/toystory.jpg', 8.3, 6),
('Moana', 'Una adolescente polinesia emprende una aventura para salvar a su pueblo y encontrar su propio camino.', 'Ron Clements', '2016-11-23', 'https://example.com/moana.jpg', 7.6, 6);