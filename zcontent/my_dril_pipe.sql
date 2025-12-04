-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Ноя 06 2025 г., 18:09
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `drill_pipe`
--

-- Удаляем все существующие таблицы перед импортом
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `applications`;
DROP TABLE IF EXISTS `cart`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `feedback`;
DROP TABLE IF EXISTS `order_details`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `services`;
DROP TABLE IF EXISTS `users`;
SET FOREIGN_KEY_CHECKS = 1;

-- --------------------------------------------------------

--
-- Структура таблицы `applications`
--

CREATE TABLE `applications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `status` varchar(50) DEFAULT NULL,
  `issue` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `applications`
--

INSERT INTO `applications` (`id`, `user_id`, `service_id`, `date`, `status`, `issue`) VALUES
(2, 17, 9, '2025-08-08', 'В обработке', 'Мне нужны токарные работы\n'),
(3, 18, 10, '2025-10-02', 'В обработке', 'Нужно выточить переходник резьба 11 на 14 отрицательная 10 штук'),
(4, 33, 14, '2025-10-10', 'Отменено', 'Мне нужна дифектоскопия'),
(5, 35, 9, '2025-10-26', 'В обработке', 'Здравствуйте Артём Витальевич, вы мой Господин');

-- --------------------------------------------------------

--
-- Структура таблицы `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT 1,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `category_name`) VALUES
(1, 'Бурильные трубы'),
(2, 'Долота'),
(3, 'Пластины');

-- --------------------------------------------------------

--
-- Структура таблицы `feedback`
--

DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `feedback_text` text DEFAULT NULL,
  `feedback_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `feedback`
--

INSERT INTO `feedback` (`id`, `user_id`, `feedback_text`, `feedback_date`) VALUES
(4, 18, 'Перезвоните. Это Ратон', '2025-10-02 09:32:25');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `order_date` datetime DEFAULT current_timestamp(),
  `total_price` decimal(10,2) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'В обработке',
  `delivery_address` varchar(522) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `order_date`, `total_price`, `status`, `delivery_address`) VALUES
(1, 17, '2025-10-15 08:07:07', 17700.00, 'Завершено', 'г.Мегион, Сосновая 6'),
(2, 17, '2025-10-15 08:10:44', 5800.00, 'Завершено', 'г.Мегион, Сосновая 6'),
(3, 17, '2025-10-15 08:11:32', 6500.00, 'В обработке', 'г.Мегион, Сосновая 6'),
(4, 18, '2025-10-17 09:40:54', 62900.00, 'В обработке', 'г.Мегион, Сосновая 6'),
(5, 33, '2025-10-17 12:56:20', 107300.00, 'В обработке', 'г.Москва, Кузьмина 45'),
(6, 33, '2025-10-23 18:58:18', 16300.00, 'Отменен', 'г.Москва, Кузьмина 45'),
(7, 35, '2025-10-26 20:35:00', 52600.00, 'В обработке', 'Победы 25');

-- --------------------------------------------------------

--
-- Структура таблицы `order_details`
--

DROP TABLE IF EXISTS `order_details`;
CREATE TABLE `order_details` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `order_details`
--

INSERT INTO `order_details` (`id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(1, 1, 51, 1, 2300.00),
(2, 1, 52, 1, 3500.00),
(3, 1, 53, 1, 6500.00),
(4, 1, 55, 2, 5400.00),
(5, 2, 51, 1, 2300.00),
(6, 2, 52, 1, 3500.00),
(7, 3, 53, 1, 6500.00),
(8, 4, 51, 3, 6900.00),
(9, 4, 52, 1, 3500.00),
(10, 4, 53, 1, 6500.00),
(11, 4, 54, 10, 46000.00),
(12, 5, 51, 11, 25300.00),
(13, 5, 52, 7, 24500.00),
(14, 5, 53, 2, 13000.00),
(15, 5, 57, 4, 18800.00),
(16, 5, 56, 5, 23000.00),
(17, 5, 55, 1, 2700.00),
(18, 6, 51, 1, 2300.00),
(19, 6, 52, 4, 14000.00),
(20, 7, 64, 1, 20000.00),
(21, 7, 62, 1, 2600.00),
(22, 7, 72, 3, 12000.00),
(23, 7, 71, 4, 14000.00),
(24, 7, 70, 1, 4000.00);

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `photo_path` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `name`, `category_id`, `description`, `photo_path`, `price`) VALUES
(50, 'Бурильная труба для установок ГНБ', 1, 'Буровые трубы предназначены для спуска или подъема в скважину инструмента ГНБ, передачи ему крутящего момента от буровой установки.', 'b87fb867-d3f1-4f0f-abb5-99989cfc87f2.jpg', 4000.00),
(51, 'Бурильная труба З-68', 1, 'Буровые трубы предназначены для спуска или подъема в скважину инструмента ГНБ, передачи ему крутящего момента от буровой установки.', '3590c059-14f7-43be-9a23-7cd08c1dd7c3.jpg', 2300.00),
(52, 'Бурильная труба З-74', 1, 'Буровые трубы предназначены для спуска или подъема в скважину инструмента ГНБ, передачи ему крутящего момента от буровой установки.', '8d99a5be-5d87-4b53-b535-78cfec470459.jpg', 3500.00),
(53, 'Бурильная труба З-79', 1, 'Буровые трубы предназначены для спуска или подъема в скважину инструмента ГНБ, передачи ему крутящего момента от буровой установки.', '08500f4c-7732-40e6-a4a5-1cfd2a57abff.jpg', 6500.00),
(54, 'Бурильная труба З-83', 1, 'Буровые трубы предназначены для спуска или подъема в скважину инструмента ГНБ, передачи ему крутящего момента от буровой установки.', '94736254-3219-4be7-9df0-5535dc5d0895.jpg', 4600.00),
(55, 'Бурильная труба З-10', 1, 'Буровые трубы предназначены для спуска или подъема в скважину инструмента ГНБ, передачи ему крутящего момента от буровой установки.', 'a3647aca-4a42-4826-a5f5-22cf9e6a4262.jpg', 2700.00),
(56, 'Бурильная труба З-133', 1, 'Буровые трубы предназначены для спуска или подъема в скважину инструмента ГНБ, передачи ему крутящего момента от буровой установки.', '552abe36-bf62-4f96-9c08-9e7a546e240e.jpg', 4600.00),
(57, 'Бурильная труба З-147', 1, 'Буровые трубы предназначены для спуска или подъема в скважину инструмента ГНБ, передачи ему крутящего момента от буровой установки.', 'b5933f52-4172-41f7-a2f3-dbb65fa25d2e.jpg', 4700.00),
(58, 'Бурильная труба З-157', 1, 'Буровые трубы предназначены для спуска или подъема в скважину инструмента ГНБ, передачи ему крутящего момента от буровой установки.', '4894a24d-9b5c-45b5-a84f-aa376406e301.jpg', 5100.00),
(59, 'Бурильная труба З-209', 1, 'Буровые трубы предназначены для спуска или подъема в скважину инструмента ГНБ, передачи ему крутящего момента от буровой установки.', 'e27fdd50-006e-4a6b-8362-216506cd73a8.jpg', 6200.00),
(60, 'НКТ З-67', 1, 'Буровые трубы предназначены для спуска или подъема в скважину инструмента ГНБ, передачи ему крутящего момента от буровой установки.', 'b5a34b7b-edd5-4c32-985f-299c65ad2d91.jpg', 6700.00),
(61, 'Переводники Бурильные', 1, 'Переводники предназначены для соединения между собой элементов бурильной колонны и присоединения к ней бурового инструмента, применяемого при бурении скважин.', '90634a23-bc60-49dc-8981-11236109081c.jpg', 2500.00),
(62, 'Переводники НКТ', 1, 'Переводники предназначены для соединения между собой элементов бурильной колонны и присоединения к ней бурового инструмента, применяемого при бурении скважин.', 'e41c4112-0895-4798-bc9b-f1cf04ec4243.jpg', 2600.00),
(63, 'Долота двухзаходное', 2, 'Лопастное долото способно работать на высоких скоростях и, при благоприятных условиях, давать внушительные результаты бурения.', '5e8ae483-c3e6-4302-abfd-30b63b45bf5b.jpg', 22000.00),
(64, 'Долото однозаходое', 2, 'Лопастное долото способно работать на высоких скоростях и, при благоприятных условиях, давать внушительные результаты бурения.', '4d1bd5e9-72cb-4048-b669-73fcd509e891.jpg', 20000.00),
(65, 'Долото трапициидальное', 2, 'Лопастное долото способно работать на высоких скоростях и, при благоприятных условиях, давать внушительные результаты бурения.', '26251a88-f12b-43a2-8172-81432b482885.jpg', 23000.00),
(66, 'Долото шеркерное', 2, 'Лопастное долото способно работать на высоких скоростях и, при благоприятных условиях, давать внушительные результаты бурения.', '2087a1d3-cea0-4d2a-8c3f-eb257bb0804d.jpg', 25000.00),
(67, 'Пластина для резьбофрезы 12N-0.75 ISO, внутренняя', 3, 'Односторонние внутренние прямозубые сменные пластины для резьбовых фрез.', 'cc03f637-fcb3-4898-acc7-f4ad9c1ccc8a.jpg', 5000.00),
(68, 'Пластина резьбовая RNIR16-0A55-RAPM-CP2025', 3, 'Односторонние внутренние прямозубые сменные пластины для резьбовых фрез.', 'a021ac2d-767a-4688-9dc6-686d896b2009.jpg', 4000.00),
(69, 'Пластина резьбовая RPER16-W140-RAPM-CP2025', 3, 'Односторонние внутренние прямозубые сменные пластины для резьбовых фрез.', 'b4f13a50-0f0d-4fa3-9b17-e9c30ef82204.jpg', 3500.00),
(70, 'Пластина резьбовая твердый сплав 16IR250ISO-TF PR1115', 3, 'Односторонние внутренние прямозубые сменные пластины для резьбовых фрез.', '8e9a4f3a-6a6c-487f-9e57-90a12489a9cf.jpg', 4000.00),
(71, 'Пластина резьбовая шлифованная твердый сплав 16ERAG60 GW15', 3, 'Односторонние внутренние прямозубые сменные пластины для резьбовых фрез.', '6eb60e60-561a-47e0-a4c0-42ad5e980cf1.jpg', 3500.00),
(72, 'Пластина токарная CCMT060202-TEPM-CP2020', 3, 'Односторонние внутренние прямозубые сменные пластины для резьбовых фрез.', '590e683d-9b2d-4cec-95f8-1334f51d22ef.jpg', 4000.00),
(73, 'Пластина токарная CCMT060204-TFPM-CC1020', 3, 'Односторонние внутренние прямозубые сменные пластины для резьбовых фрез.', '15e66f70-9dc7-49ad-aa16-4b8eb986bacc.jpg', 4200.00),
(74, 'Пластина токарная CCMT060204-TFPM-CP2025', 3, 'Односторонние внутренние прямозубые сменные пластины для резьбовых фрез.', '5eaa3fb6-180b-49a5-88f4-34fa12b0f4da.jpg', 4000.00),
(75, 'Пластина токарная CCMT06320204-TFPM-CF21020', 3, 'Односторонние внутренние прямозубые сменные пластины для резьбовых фрез.', '5a75c697-7477-4f56-989b-2fd44ce6e3b3.jpg', 3500.00),
(76, 'Пластина токарная CNMG120408-TAMS-CP2025', 3, 'Односторонние внутренние прямозубые сменные пластины для резьбовых фрез.', 'de257e0f-e4c2-4d84-b085-a006a9dabbce.jpg', 4200.00),
(77, 'Пластина токарная CNMG120408-TAMS-CP5025', 3, 'Односторонние внутренние прямозубые сменные пластины для резьбовых фрез.', '928ef16f-acf2-4540-a1a0-f93a6d8172ce.jpg', 4000.00),
(78, 'Пластина токарная CNMG12012308-TAMS-CP1025', 3, 'Односторонние внутренние прямозубые сменные пластины для резьбовых фрез.', 'f891a6c5-d5f9-487f-b331-bc0bf5c99bdc.jpg', 4200.00),
(79, 'Пластина токарная VNMG160404-TAMM-CP5015', 3, 'Односторонние внутренние прямозубые сменные пластины для резьбовых фрез.', '18ab8f41-dfdc-4a2f-971f-0f3d7d5eabc0.jpg', 3000.00),
(80, 'Пластина токарная WNMG080408-TBPP-CC1025', 3, 'Односторонние внутренние прямозубые сменные пластины для резьбовых фрез.', '7f4972f9-3d88-4cbf-b338-1b1c680abaf6.jpg', 3800.00),
(81, 'Пластина токарная WNMG080408-TBPP-CC1025', 3, 'Односторонние внутренние прямозубые сменные пластины для резьбовых фрез.', '4b5bfef4-24b7-446a-b4ed-1c5aca61ada8.jpg', 4000.00),
(83, 'Пластина фрезерная APMT1604PDER-MFST-CP1130', 3, 'Односторонние внутренние прямозубые сменные пластины для резьбовых фрез.', '709b2549-ad39-4728-a541-bc7ce05a58cf.jpg', 4000.00);

-- --------------------------------------------------------

--
-- Структура таблицы `services`
--

DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `cost` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `services`
--

INSERT INTO `services` (`id`, `name`, `description`, `photo`, `cost`) VALUES
(8, 'Выполнение токарных работ на 1H983', 'Предлагаем высококачественные токарные работы на универсальном токарном станке 1H983, который идеально подходит для обработки различных металлов и сплавов. Мы выполняем точную обработку деталей, таких как валы, фланцы, кольца, оси и другие компоненты с высокой степенью точности.', '6f4e11a5-dd21-471e-99ff-982301b6310f.jpg', 10000.00),
(9, 'Выполнение токарных работ на 16К20', 'Мы предлагаем услуги токарной обработки на универсальном токарном станке 16К20, который идеально подходит для производства деталей средней и большой сложности. Этот станок способен обрабатывать различные виды металлов, включая сталь, чугун и сплавы, с высокой точностью.', '30a64619-d66e-4a53-8ff0-dc6caaa80518.jpg', 5000.00),
(10, 'Выполнение токарных работ на ДИП-300', 'Мы предлагаем услуги токарной обработки на станке ДИП-300, который является высокопроизводительным и универсальным оборудованием, предназначенным для обработки крупных и тяжелых деталей.', '0e6bc968-e086-46f1-87cd-a026c6b6011f.jpg', 10000.00),
(11, 'Выполнение токарных работ на ДИП-500', 'Предлагаем услуги по выполнению токарных работ на станке ДИП-500, одном из самых мощных и универсальных станков для обработки крупных и тяжелых деталей.', '99aac533-dd02-4e66-a585-093b09a2ebf8.jpg', 15000.00),
(12, 'Выполнение токарных работ на ЧПУ', 'Мы предоставляем услуги по выполнению токарных работ с использованием высокоточных станков с числовым программным управлением (ЧПУ).', 'e845e718-f647-4a7a-abac-4499cfefd7cc.jpg', 20000.00),
(13, 'Выполнение фрезерных работ на СФ-250', 'Мы предлагаем услуги по выполнению фрезерных работ на станке СФ-250, который оснащен современными технологиями для обработки металлических и неметаллических материалов. С помощью этого станка мы производим точную обработку различных деталей, включая фрезерование плоских и объемных поверхностей, создание пазов, отверстий, контурных форм и другие операции с высокой точностью.', '87f540c1-cb6d-4313-b1a3-bfd968191ad6.jpg', 8000.00),
(14, 'Дефектоскопия труб', 'Мы предлагаем услуги по дефектоскопии труб, с использованием современного оборудования и методик для обнаружения внутренних и внешних дефектов трубопроводной продукции. Процесс дефектоскопии включает в себя неразрушающие методы контроля, такие как ультразвуковая, магнитопорошковая и радиографическая диагностика, которые позволяют точно выявлять трещины, коррозию, поры, сварочные дефекты и другие повреждения.', 'a991db59-f798-4ede-9cca-da070aecb888.jpg', 8000.00);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `admin`) VALUES
(17, 'Vit', 'kuvik.93@mail.ru', '$2b$05$poI5zzWfZpna2Iuh0lfd6e9voDdv14.5a6t90J8bI91ZT2XCHcxeK', 0),
(18, 'Артём', 'akuvik.93@mail.ru', '$2b$05$4mzA9ds0sqQtuaQWWz9YAuc4Xqo4iEf6krGufm1cSr/vjodsyVuuu', 1),
(30, 'ыыы', 'artem.kuvik.93@mail.ru', '$2b$05$dVgy7NLi51WSgU4MKlaWq.yvu8s/wG0SzgmlPIRjsI4mTmWJfamim', 0),
(31, 'asdads', 'artem.ku222vik.93@mail.ru', '$2b$05$DoKDumieqa6iApKteheFE.Bs2XuHpz2mZIEqmky0vHr/GGR2bCXH6', 0),
(32, 'Маргарита', 'MargoSoc@mail.ru', '$2b$05$SaKY7DPzmx3ogxyLjfM34uHKM3LiyiTfs1kgVEbcUspuGPq71r0uS', 0),
(33, 'Александр', 'Sany@mail.ru', '$2b$05$wMbXTZDqXqZrI/vOd4y1W.9pqtcGIS.Dr88Xz8KXnaI0DPZFLVFza', 0),
(34, 'Sany123', 'Sany123@mail.ru', '$2b$05$IM9JbqZifvLX4Qq5MMm/lOYgZgozhlktVGIXYcKSCkAjWgztteeWW', 0),
(35, 'Маргарита', 'Margo@mail.ru', '$2b$05$nYu/T1yXhlPSxjVDcym9cuTAqS1/priQZbckvID4oBwnSaDMCzfTG', 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Индексы таблицы `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `applications`
--
ALTER TABLE `applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT для таблицы `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `applications`
--
ALTER TABLE `applications`
  ADD CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
