-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-12-2023 a las 18:38:45
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectoframeworks`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `certificados`
--

CREATE TABLE `certificados` (
  `certificadoID` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL,
  `habilidades` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `certificados`
--

INSERT INTO `certificados` (`certificadoID`, `nombre`, `fechaInicio`, `fechaFin`, `habilidades`) VALUES
(14, 'Bases de datos', '2023-08-25', '2023-10-28', 'Manejo de SQL, diseño de esquemas de base de datos, normalización, indexación'),
(15, 'Gestión de proyectos', '2023-08-25', '2023-10-27', 'Planificación de proyectos, gestión de riesgos, liderazgo de equipos, metodologías ágiles'),
(16, 'Patrones de diseño', '2023-08-26', '2023-10-28', 'Conocimiento de patrones de diseño comunes, principios SOLID, refactorización de código'),
(17, 'Sistemas embebidos', '2023-08-22', '2023-10-27', 'Programación en C/C++, conocimiento de microcontroladores, diseño de sistemas en tiempo real'),
(18, 'Selenium Webdriver', '2023-08-25', '2023-10-28', 'Automatización de pruebas, manejo de Selenium WebDriver, pruebas de regresión'),
(19, 'SQL for Data Science', '2023-08-26', '2023-10-28', 'Manejo avanzado de SQL, análisis de datos, visualización de datos'),
(20, 'Visualización de datos con Python', '2023-08-25', '2023-10-27', 'Manejo de bibliotecas como Matplotlib y Seaborn, creación de gráficos informativos, limpieza de datos'),
(21, 'Fotografía creativa para redes sociales', '2023-08-25', '2023-10-27', 'Técnicas de fotografía, edición de imágenes, estrategias de publicación en redes sociales'),
(22, 'Hardware Mantenance', '2023-08-26', '2023-10-28', 'Diagnóstico de problemas de hardware, reparación de componentes, mantenimiento preventivo'),
(25, 'Node JS 2', '2023-12-08', '2023-12-22', 'No se 2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `relaciones`
--

CREATE TABLE `relaciones` (
  `relacionID` int(11) NOT NULL,
  `alumnoID` int(11) NOT NULL,
  `certificadoID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `relaciones`
--

INSERT INTO `relaciones` (`relacionID`, `alumnoID`, `certificadoID`) VALUES
(14, 273304, 14),
(15, 273304, 15),
(16, 307097, 20),
(17, 307097, 19),
(20, 273304, 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usuarioID` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usuarioID`, `nombre`, `apellidos`, `password`, `rol`) VALUES
(273304, 'Cristian Julian', 'Melgar Zarrabal', '12345', 'Estudiante'),
(276722, 'Gael Alejandro ', 'Rodríguez González', '12345', 'Estudiante'),
(278883, 'Miguel Ángel ', 'Romero Reséndiz', '12345', 'Estudiante'),
(307011, 'Erick', 'Díaz Villegas', 'prueba123', 'Admin'),
(307040, 'Francisco', 'Olvera Pérez', '12345', 'Estudiante'),
(307046, 'Ximena', 'Ordaz Rebollo', '12345', 'Estudiante'),
(307049, 'Humberto ', 'Paz Ibarra ', '12345', 'Estudiante'),
(307058, 'Hugo Alejandro', 'Ramirez Hernandez', '12345', 'Estudiante'),
(307066, 'Mauricio', 'Arredondo Moreno', '12345', 'Estudiante'),
(307072, 'Pedro Oswaldo', 'Benitez Morales', '12345', 'Estudiante'),
(307077, 'Carlos Zahid', 'Hernandez Garcia', '12345', 'Admin'),
(307083, 'Sebastián Alberto', 'Gómez Orizaga', '12345', 'Estudiante'),
(307089, 'Carlos Tomas', 'Rodríguez Nieto', '12345', 'Estudiante'),
(307097, 'Rodrigo', 'Anaya Hurtado', '12345', 'Estudiante'),
(307101, 'Alessandra Beyonce', 'Ortiz Villafuerte', '12345', 'Estudiante'),
(307107, 'Miguel Armando', 'Arroyo Narváez', '12345', 'Estudiante');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `certificados`
--
ALTER TABLE `certificados`
  ADD PRIMARY KEY (`certificadoID`);

--
-- Indices de la tabla `relaciones`
--
ALTER TABLE `relaciones`
  ADD PRIMARY KEY (`relacionID`),
  ADD KEY `certificadoID` (`certificadoID`),
  ADD KEY `alumnoID` (`alumnoID`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuarioID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `certificados`
--
ALTER TABLE `certificados`
  MODIFY `certificadoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `relaciones`
--
ALTER TABLE `relaciones`
  MODIFY `relacionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuarioID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=307108;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `relaciones`
--
ALTER TABLE `relaciones`
  ADD CONSTRAINT `relaciones_ibfk_1` FOREIGN KEY (`certificadoID`) REFERENCES `certificados` (`certificadoID`),
  ADD CONSTRAINT `relaciones_ibfk_2` FOREIGN KEY (`alumnoID`) REFERENCES `usuarios` (`usuarioID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
