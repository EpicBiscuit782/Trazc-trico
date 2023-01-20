-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-01-2023 a las 04:22:12
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `coeplim`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `analisis_agua`
--

CREATE TABLE `analisis_agua` (
  `id_analisis_agua` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `fuente` varchar(40) NOT NULL,
  `ph` float NOT NULL,
  `conductividad` float NOT NULL DEFAULT 0,
  `calcio` varchar(7) NOT NULL DEFAULT '0',
  `ca` varchar(7) NOT NULL DEFAULT '0',
  `magnesio` varchar(7) NOT NULL DEFAULT '0',
  `mg` varchar(7) NOT NULL DEFAULT '0',
  `sodio` varchar(7) NOT NULL DEFAULT '0',
  `na` varchar(7) NOT NULL DEFAULT '0',
  `potasio` varchar(7) NOT NULL DEFAULT '0',
  `k` varchar(7) NOT NULL DEFAULT '0',
  `ras` varchar(7) NOT NULL DEFAULT '0',
  `psi` varchar(7) NOT NULL DEFAULT '0',
  `cloruros` varchar(7) NOT NULL DEFAULT '0',
  `ci` varchar(7) NOT NULL DEFAULT '0',
  `sulfatos` varchar(7) NOT NULL DEFAULT '0',
  `so` varchar(7) NOT NULL DEFAULT '0',
  `carbonatos` varchar(7) NOT NULL DEFAULT '0',
  `co` varchar(7) NOT NULL DEFAULT '0',
  `bicarbonatos` varchar(7) NOT NULL DEFAULT '0',
  `hco` varchar(7) NOT NULL DEFAULT '0',
  `csr` varchar(7) NOT NULL DEFAULT '0',
  `salpot` varchar(7) NOT NULL DEFAULT '0',
  `salefect` varchar(7) NOT NULL DEFAULT '0',
  `clasificacion` varchar(7) NOT NULL DEFAULT '0',
  `boro` varchar(7) NOT NULL DEFAULT '0',
  `dureza` varchar(7) NOT NULL DEFAULT '0',
  `solidos` varchar(7) NOT NULL DEFAULT '0',
  `id_parcela` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `analisis_agua`
--

INSERT INTO `analisis_agua` (`id_analisis_agua`, `fecha`, `fuente`, `ph`, `conductividad`, `calcio`, `ca`, `magnesio`, `mg`, `sodio`, `na`, `potasio`, `k`, `ras`, `psi`, `cloruros`, `ci`, `sulfatos`, `so`, `carbonatos`, `co`, `bicarbonatos`, `hco`, `csr`, `salpot`, `salefect`, `clasificacion`, `boro`, `dureza`, `solidos`, `id_parcela`) VALUES
(16, '2022-11-05', 'POZO', 1, 3, '7', '7', '7', '7', '77', '7', '7', '77', '3', '7', '7', '0', '8', '8', '8', '8', '8', '8', '88', '8', '8', '8', '8', '8', '8', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `analisis_foliar`
--

CREATE TABLE `analisis_foliar` (
  `id_analisis_foliar` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `fosforo` varchar(7) NOT NULL DEFAULT '0',
  `p` varchar(7) NOT NULL DEFAULT '0',
  `potasio` varchar(7) NOT NULL DEFAULT '0',
  `k` varchar(7) NOT NULL DEFAULT '0',
  `calcio` varchar(7) NOT NULL DEFAULT '0',
  `ca` varchar(7) NOT NULL DEFAULT '0',
  `magnesio` varchar(7) NOT NULL DEFAULT '0',
  `mg` varchar(7) NOT NULL DEFAULT '0',
  `hierro` varchar(7) NOT NULL DEFAULT '0',
  `cobre` varchar(7) NOT NULL DEFAULT '0',
  `manganeso` varchar(7) NOT NULL DEFAULT '0',
  `zinc` varchar(7) NOT NULL DEFAULT '0',
  `boro` varchar(7) NOT NULL DEFAULT '0',
  `sodio` varchar(7) NOT NULL DEFAULT '0',
  `id_parcela` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `analisis_foliar`
--

INSERT INTO `analisis_foliar` (`id_analisis_foliar`, `fecha`, `fosforo`, `p`, `potasio`, `k`, `calcio`, `ca`, `magnesio`, `mg`, `hierro`, `cobre`, `manganeso`, `zinc`, `boro`, `sodio`, `id_parcela`) VALUES
(1, '2022-11-04', '3', '3', '4', '4', '4', '4', '4', '4', '4', '6', '6', '4', '6', '6', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `analisis_suelo`
--

CREATE TABLE `analisis_suelo` (
  `id_analisis_suelo` bigint(20) NOT NULL,
  `fecha` date NOT NULL,
  `ph` varchar(7) NOT NULL DEFAULT '0',
  `materia_org` varchar(7) NOT NULL DEFAULT '0',
  `nitrogeno` varchar(7) NOT NULL DEFAULT '0',
  `fosforo` varchar(7) NOT NULL DEFAULT '0',
  `potasio` varchar(7) NOT NULL DEFAULT '0',
  `calcio` varchar(7) NOT NULL DEFAULT '0',
  `magnesio` varchar(7) NOT NULL DEFAULT '0',
  `sodio` varchar(7) NOT NULL DEFAULT '0',
  `cobre` varchar(7) NOT NULL DEFAULT '0',
  `fierro` varchar(7) NOT NULL DEFAULT '0',
  `manganeso` varchar(7) NOT NULL DEFAULT '0',
  `zinc` varchar(7) NOT NULL DEFAULT '0',
  `carbonatos` varchar(7) NOT NULL DEFAULT '0',
  `arcilla` varchar(7) NOT NULL DEFAULT '0',
  `arena` varchar(7) NOT NULL DEFAULT '0',
  `limo` varchar(7) NOT NULL DEFAULT '0',
  `textura` varchar(40) NOT NULL,
  `capacidad` varchar(7) NOT NULL DEFAULT '0',
  `humedad` varchar(7) NOT NULL DEFAULT '0',
  `punto` varchar(7) NOT NULL DEFAULT '0',
  `id_parcela` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `analisis_suelo`
--

INSERT INTO `analisis_suelo` (`id_analisis_suelo`, `fecha`, `ph`, `materia_org`, `nitrogeno`, `fosforo`, `potasio`, `calcio`, `magnesio`, `sodio`, `cobre`, `fierro`, `manganeso`, `zinc`, `carbonatos`, `arcilla`, `arena`, `limo`, `textura`, `capacidad`, `humedad`, `punto`, `id_parcela`) VALUES
(2, '2022-11-03', '1', '3', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '2', '2', '3', 'ARENOSO', '3', '3', '4', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `antecedente`
--

CREATE TABLE `antecedente` (
  `id_antecedente` int(11) NOT NULL,
  `id_parcela` int(11) NOT NULL,
  `peligros` text NOT NULL,
  `acciones` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `antecedente`
--

INSERT INTO `antecedente` (`id_antecedente`, `id_parcela`, `peligros`, `acciones`) VALUES
(16, 0, 'peligro de contaminacion', 'accion correctiva'),
(17, 10, 'pc', 'aca');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra`
--

CREATE TABLE `compra` (
  `id_compra` bigint(20) NOT NULL,
  `fecha` date NOT NULL,
  `subtotal` decimal(8,2) NOT NULL DEFAULT 0.00,
  `id_productor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `compra`
--

INSERT INTO `compra` (`id_compra`, `fecha`, `subtotal`, `id_productor`) VALUES
(19, '2023-01-03', '123.00', 29);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comprador`
--

CREATE TABLE `comprador` (
  `id_comprador` int(11) NOT NULL,
  `cmp_nombre` varchar(60) NOT NULL,
  `rep_legal` varchar(60) NOT NULL,
  `localizacion` varchar(50) NOT NULL,
  `telefono` varchar(30) NOT NULL,
  `correo` varchar(30) NOT NULL,
  `marcas` varchar(100) NOT NULL,
  `mercado_destino` varchar(100) NOT NULL,
  `puntos_distribucion` varchar(100) NOT NULL,
  `id_productor` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `comprador`
--

INSERT INTO `comprador` (`id_comprador`, `cmp_nombre`, `rep_legal`, `localizacion`, `telefono`, `correo`, `marcas`, `mercado_destino`, `puntos_distribucion`, `id_productor`) VALUES
(15, 'WALMART', 'JOSE WAL MART', 'Niños Heroes #235', '3122344567', 'walmart@correo.com', 'Limoncin', 'Granel', 'Supermercado', 29);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `control`
--

CREATE TABLE `control` (
  `id_control` bigint(20) NOT NULL,
  `fecha` date NOT NULL,
  `muestras` int(11) NOT NULL,
  `individuos` int(11) NOT NULL,
  `decision` varchar(250) NOT NULL,
  `id_enfermedad` int(11) NOT NULL,
  `id_parcela` bigint(20) NOT NULL,
  `id_responsable` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `control`
--

INSERT INTO `control` (`id_control`, `fecha`, `muestras`, `individuos`, `decision`, `id_enfermedad`, `id_parcela`, `id_responsable`) VALUES
(5, '2022-11-03', 32, 12, 'corte', 14, 10, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ctl_gastos`
--

CREATE TABLE `ctl_gastos` (
  `id_ctl_gasto` int(11) NOT NULL,
  `ctl_descripcion` varchar(50) NOT NULL,
  `id_tipo_gasto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ctl_gastos`
--

INSERT INTO `ctl_gastos` (`id_ctl_gasto`, `ctl_descripcion`, `id_tipo_gasto`) VALUES
(11, 'APLICACIóN DE NUTRIENTES', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_compra`
--

CREATE TABLE `detalle_compra` (
  `id_compra` bigint(20) NOT NULL,
  `id_insumo` bigint(20) NOT NULL,
  `cantidad` float NOT NULL DEFAULT 0,
  `medida` varchar(10) NOT NULL,
  `precio` decimal(7,2) NOT NULL DEFAULT 0.00,
  `cant_insumos` int(11) NOT NULL DEFAULT 0,
  `id_responsable` tinyint(4) NOT NULL,
  `id_proveedor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `detalle_compra`
--

INSERT INTO `detalle_compra` (`id_compra`, `id_insumo`, `cantidad`, `medida`, `precio`, `cant_insumos`, `id_responsable`, `id_proveedor`) VALUES
(19, 125, 1, 'LITROS', '123.00', 1, 6, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_enfermedad`
--

CREATE TABLE `detalle_enfermedad` (
  `id` int(11) NOT NULL,
  `dosis` varchar(30) NOT NULL,
  `medida` varchar(15) NOT NULL,
  `intervalo` varchar(30) NOT NULL,
  `id_enfermedad` int(11) NOT NULL,
  `id_insumo` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `detalle_enfermedad`
--

INSERT INTO `detalle_enfermedad` (`id`, `dosis`, `medida`, `intervalo`, `id_enfermedad`, `id_insumo`) VALUES
(46, '0.500 ml', '', '3 dias', 14, 125);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_gasto`
--

CREATE TABLE `detalle_gasto` (
  `id_detalle_gasto` int(11) NOT NULL,
  `dt_precio` decimal(7,0) NOT NULL DEFAULT 0,
  `id_ctl_gasto` int(11) NOT NULL,
  `id_tipo_insumo` int(11) NOT NULL DEFAULT 0,
  `id_gasto` bigint(20) NOT NULL,
  `aplicacion` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `detalle_gasto`
--

INSERT INTO `detalle_gasto` (`id_detalle_gasto`, `dt_precio`, `id_ctl_gasto`, `id_tipo_insumo`, `id_gasto`, `aplicacion`) VALUES
(641, '1000', 11, 13, 636, 1),
(642, '1312', 11, 13, 636, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_manejo`
--

CREATE TABLE `detalle_manejo` (
  `id_manejo` bigint(20) NOT NULL,
  `metodo` varchar(30) NOT NULL,
  `medida` varchar(10) NOT NULL,
  `dosis` float NOT NULL DEFAULT 0,
  `agua` float NOT NULL,
  `fecha_aplicacion` date DEFAULT NULL,
  `id_insumo` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_nutricion`
--

CREATE TABLE `detalle_nutricion` (
  `id_det_nutricion` int(10) UNSIGNED NOT NULL,
  `cantidad` float NOT NULL DEFAULT 0,
  `medida` varchar(11) NOT NULL,
  `metodo` varchar(15) NOT NULL,
  `cant_planta` float NOT NULL DEFAULT 0,
  `costo` float NOT NULL DEFAULT 0,
  `id_nutricion` bigint(20) NOT NULL,
  `id_insumo` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `detalle_nutricion`
--

INSERT INTO `detalle_nutricion` (`id_det_nutricion`, `cantidad`, `medida`, `metodo`, `cant_planta`, `costo`, `id_nutricion`, `id_insumo`) VALUES
(123, 23, 'LITROS', 'NINGUNO', 0, 0, 33, 125);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_riego`
--

CREATE TABLE `detalle_riego` (
  `id_riego` bigint(20) NOT NULL,
  `cantidad` float NOT NULL DEFAULT 0,
  `observacion` varchar(250) NOT NULL DEFAULT 'NINGUNA',
  `tipo` varchar(20) NOT NULL,
  `costo` float NOT NULL DEFAULT 0,
  `id_parcela` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `detalle_riego`
--

INSERT INTO `detalle_riego` (`id_riego`, `cantidad`, `observacion`, `tipo`, `costo`, `id_parcela`) VALUES
(118, 23, 'na', 'TURNO', 1230, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enfermedad`
--

CREATE TABLE `enfermedad` (
  `id_enfermedad` int(11) NOT NULL,
  `enfermedad` varchar(60) NOT NULL,
  `descripcion` longtext NOT NULL,
  `agente` longtext NOT NULL,
  `sintomas` longtext NOT NULL,
  `manejo` longtext NOT NULL,
  `id_tipo_enfermedad` int(11) NOT NULL,
  `pcc` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `etapa` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `enfermedad`
--

INSERT INTO `enfermedad` (`id_enfermedad`, `enfermedad`, `descripcion`, `agente`, `sintomas`, `manejo`, `id_tipo_enfermedad`, `pcc`, `etapa`) VALUES
(14, 'MUERTE DE ARBOLES', 'ARBOLES CON TIERRA CUBIENDO SU TRONCO', 'AHOGAMIENTO', 'APARICION DE LLAGAS', 'APLICACION DE FUNGICIDAS', 6, 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gastos`
--

CREATE TABLE `gastos` (
  `id_gasto` bigint(20) NOT NULL,
  `gst_fecha` date NOT NULL,
  `gst_subtotal` decimal(7,0) NOT NULL DEFAULT 0,
  `id_parcela` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `gastos`
--

INSERT INTO `gastos` (`id_gasto`, `gst_fecha`, `gst_subtotal`, `id_parcela`) VALUES
(636, '2022-11-02', '1000', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `huerto`
--

CREATE TABLE `huerto` (
  `id_huerto` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `id_parcela` bigint(20) NOT NULL,
  `tipo_riego` varchar(20) NOT NULL,
  `id_variedad` int(11) NOT NULL,
  `id_portainjerto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `huerto`
--

INSERT INTO `huerto` (`id_huerto`, `fecha`, `id_parcela`, `tipo_riego`, `id_variedad`, `id_portainjerto`) VALUES
(1, '2023-01-01', 1, '1', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `id_imagen` int(11) UNSIGNED NOT NULL,
  `imagen` varchar(255) CHARACTER SET utf8 NOT NULL,
  `tipo` tinyint(4) UNSIGNED NOT NULL DEFAULT 0 COMMENT '0:croquis, 1:constancia ant, 2:evidencia fotográfica,3:nota de venta/factura',
  `id_tabla` tinyint(4) UNSIGNED NOT NULL DEFAULT 0 COMMENT '0: analisis agua, 1:analisis foliar, 2:analisis suelo, 3:compra, 4:gastos, 5:ant, 6:proveedor',
  `id_registro` int(11) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `insumo`
--

CREATE TABLE `insumo` (
  `id_insumo` bigint(20) NOT NULL,
  `nombre_com` varchar(80) NOT NULL,
  `ingrediente_act` varchar(60) NOT NULL,
  `id_tipo_insumo` int(11) NOT NULL,
  `num_registro` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `insumo`
--

INSERT INTO `insumo` (`id_insumo`, `nombre_com`, `ingrediente_act`, `id_tipo_insumo`, `num_registro`) VALUES
(125, 'MATAHONGIN', 'HONGIMUNOS', 13, '18100027');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `id_inventario` bigint(20) NOT NULL,
  `cantidad` float NOT NULL DEFAULT 0,
  `medida` varchar(10) NOT NULL,
  `precio` float NOT NULL DEFAULT 0,
  `id_insumo` bigint(20) NOT NULL,
  `id_productor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `inventario`
--

INSERT INTO `inventario` (`id_inventario`, `cantidad`, `medida`, `precio`, `id_insumo`, `id_productor`) VALUES
(18, 1, 'LITROS', 123, 125, 29);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `manejo`
--

CREATE TABLE `manejo` (
  `id_manejo` bigint(20) NOT NULL,
  `fecha` date NOT NULL,
  `inicio` date NOT NULL,
  `fin` date NOT NULL,
  `siguiente` date NOT NULL,
  `id_enfermedad` int(11) NOT NULL,
  `id_responsable` int(11) NOT NULL,
  `id_parcela` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticia`
--

CREATE TABLE `noticia` (
  `id_noticia` bigint(20) NOT NULL,
  `titulo` varchar(70) NOT NULL,
  `cuerpo` longtext NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `noticia`
--

INSERT INTO `noticia` (`id_noticia`, `titulo`, `cuerpo`, `fecha`) VALUES
(3, 'Nuevo Biologo', 'Se une al equipo HACCP un nuevo integrante para fortalezer las actividades', '2022-10-20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nutricion`
--

CREATE TABLE `nutricion` (
  `id_nutricion` bigint(20) NOT NULL,
  `fecha` date NOT NULL,
  `tipo_aplicacion` varchar(10) NOT NULL,
  `id_parcela` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `nutricion`
--

INSERT INTO `nutricion` (`id_nutricion`, `fecha`, `tipo_aplicacion`, `id_parcela`) VALUES
(33, '2022-11-01', 'FOLIAR', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parcela`
--

CREATE TABLE `parcela` (
  `id_parcela` bigint(20) NOT NULL,
  `pcl_alias` varchar(60) NOT NULL,
  `pcl_municipio` varchar(30) NOT NULL,
  `pcl_localidad` varchar(60) NOT NULL,
  `pcl_latitud` varchar(20) NOT NULL,
  `pcl_longitud` varchar(20) NOT NULL,
  `pcl_fecha_plantacion` date NOT NULL,
  `pcl_ancho` int(11) NOT NULL DEFAULT 0,
  `pcl_largo` int(11) NOT NULL DEFAULT 0,
  `pcl_marco_plantacion` int(11) NOT NULL DEFAULT 0,
  `pcl_hectareas` int(11) NOT NULL DEFAULT 0,
  `pcl_arboles` int(11) NOT NULL DEFAULT 0,
  `pcl_primera_cosecha` date NOT NULL,
  `pcl_estado` varchar(10) NOT NULL,
  `pcl_ejido` varchar(30) NOT NULL,
  `id_productor` bigint(20) NOT NULL,
  `id_regimen` int(11) NOT NULL,
  `cod_parcela` varchar(20) NOT NULL COMMENT 'código de parcela interno o emitido por SENASICA'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `parcela`
--

INSERT INTO `parcela` (`id_parcela`, `pcl_alias`, `pcl_municipio`, `pcl_localidad`, `pcl_latitud`, `pcl_longitud`, `pcl_fecha_plantacion`, `pcl_ancho`, `pcl_largo`, `pcl_marco_plantacion`, `pcl_hectareas`, `pcl_arboles`, `pcl_primera_cosecha`, `pcl_estado`, `pcl_ejido`, `id_productor`, `id_regimen`, `cod_parcela`) VALUES
(10, 'LA BIBLIOTECA', 'MANZANILLO', 'EL ARCA', '125', '123', '2000-10-10', 117, 117, 13689, 117, 85, '2001-09-10', 'PROPIA', '', 29, 3, '06/007/01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pcc`
--

CREATE TABLE `pcc` (
  `id_pcc` smallint(5) UNSIGNED NOT NULL,
  `etapa` varchar(100) NOT NULL,
  `limite` varchar(100) NOT NULL,
  `vigilancia` varchar(100) NOT NULL,
  `medidas` varchar(255) NOT NULL,
  `registros` varchar(100) NOT NULL,
  `etiquetappc` varchar(150) NOT NULL,
  `fk_enfermedad` int(11) DEFAULT NULL,
  `fk_id_productor` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pcc`
--

INSERT INTO `pcc` (`id_pcc`, `etapa`, `limite`, `vigilancia`, `medidas`, `registros`, `etiquetappc`, `fk_enfermedad`, `fk_id_productor`) VALUES
(32, '', '', '', '', '', '', NULL, 0),
(33, 'Nueva plantacion', 'Mal drenaje', 'semanal', 'adaptar el terreno', 'tacos de', '', NULL, 0),
(31, 'Nutrición', 'Mal drenaje', 'durante seleccion de terreno', 'Aplicación de fungicida', 'tacos de', '', NULL, 0),
(30, 'Nutrición', 'Mohosis', 'semanal', 'Aplicación de fungicida', 'Manejo integral', '', NULL, 0),
(21, 'Nueva plantacion', 'Mal drenaje', 'durante seleccion de terreno', 'adaptar el terreno', 'tacos de', '', NULL, 0),
(22, 'Nueva plantacion', 'Mal drenaje', 'durante seleccion de terreno', 'adaptar el terreno', 'tacos de', '', NULL, 0),
(23, 'Nueva plantacion', 'Mal drenaje', 'durante seleccion de terreno', 'adaptar el terreno', 'tacos de', '', NULL, 0),
(24, 'Nueva plantacion', 'Mal drenaje', 'durante seleccion de terreno', 'adaptar el terreno', 'tacos de', '', NULL, 0),
(25, 'Nueva plantacion', 'Mal drenaje', 'durante seleccion de terreno', 'adaptar el terreno', 'tacos de', '', NULL, 0),
(26, 'Nueva plantacion', 'Mal drenaje', 'durante seleccion de terreno', 'adaptar el terreno', 'tacos de', '', NULL, 0),
(27, 'Nueva plantacion', 'Mal drenaje', 'durante seleccion de terreno', 'adaptar el terreno', 'tacos de', '', NULL, 0),
(28, 'Nueva plantacion', 'Mal drenaje', 'durante seleccion de terreno', 'adaptar el terreno', 'tacos de', '', NULL, 0),
(29, 'Nueva plantacion', 'Mal drenaje', 'durante seleccion de terreno', 'adaptar el terreno', 'tacos de', '', NULL, 0),
(34, '', 'Fruto Seco', 'Durante el Empaque', 'Cambiar consumidor final', 'Manejo integral', 'Frutos deshidratados', NULL, 0),
(35, '7', 'Fruto Seco', 'Durante el Empaque', 'Cambiar consumidor final', 'Manejo integral', 'Frutos deshidratados', NULL, 0),
(36, '', 'araña roja', 'durante riegos y cosecha', 'aplicacion de insecticida', 'Manejo integral', 'Araña roja', NULL, 0),
(37, '6', 'araña roja', 'durante riegos y cosecha', 'aplicacion de insecticida', 'Manejo integral', 'Araña roja', NULL, 0),
(38, '6', 'araña roja', 'durante riegos y cosecha', 'aplicacion de insecticida', 'Manejo integral', 'Araña roja', NULL, 0),
(39, 'NUTRICIóN', 'araña roja', 'semanal', 'aplicacion de insecticida', 'Manejo integral', 'Araña roja', NULL, 0),
(40, 'NUTRICIóN', 'Caída de fruto', 'semanal', 'aplicación de nutrientes', 'Manejo integral', 'Fruto muerto', NULL, 0),
(41, 'COSECHA', 'Caída de fruto', 'Durante el corte', 'No sacudir el arbol', 'Manejo integral', 'Caída de fruto', NULL, 0),
(42, 'COSECHA', 'araña roja', 'durante riegos y cosecha', 'adaptar el terreno', 'tacos de', 'Araña roja', NULL, 0),
(43, 'RIEGO', 'Mohosis', 'semanal', 'adaptar el terreno', 'Manejo integral', 'Caída de fruto', NULL, 0),
(44, 'NUTRICIóN', 'Mohosis', 'durante seleccion de terreno', 'Aplicación de fungicida', 'tacos de', 'Araña roja', NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `portainjerto`
--

CREATE TABLE `portainjerto` (
  `id_portainjerto` int(11) NOT NULL,
  `nom_portainjerto` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `portainjerto`
--

INSERT INTO `portainjerto` (`id_portainjerto`, `nom_portainjerto`) VALUES
(7, 'PORTAINGERTO1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pp`
--

CREATE TABLE `pp` (
  `id_pp` int(11) NOT NULL,
  `nombre_pp` varchar(50) NOT NULL,
  `descripcion_pp` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pp`
--

INSERT INTO `pp` (`id_pp`, `nombre_pp`, `descripcion_pp`) VALUES
(1, 'Fomosis', 'aparece hongo en el ARBOL'),
(2, 'fruto seco', 'las ramas están cafés'),
(3, 'Fomosis', 'las ramas están cafés'),
(4, 'fruto seco', 'el fruto no crece'),
(5, 'fruto seco', 'aparece hongo en el ARBOL');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `produccion`
--

CREATE TABLE `produccion` (
  `id_produccion` bigint(20) NOT NULL,
  `pdc_fecha` date NOT NULL,
  `pdc_kilos` decimal(7,0) NOT NULL DEFAULT 0,
  `pdc_rejas` int(11) NOT NULL DEFAULT 0,
  `id_parcela` bigint(20) NOT NULL,
  `id_gasto` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productor`
--

CREATE TABLE `productor` (
  `id_productor` bigint(20) NOT NULL,
  `pdt_nombre_completo` varchar(70) NOT NULL,
  `pdt_curp` varchar(25) NOT NULL,
  `pdt_rfc` varchar(25) NOT NULL,
  `pdt_domicilio_completo` varchar(50) NOT NULL,
  `pdt_telefono` varchar(20) NOT NULL,
  `pdt_email` varchar(70) NOT NULL,
  `pdt_password` blob NOT NULL,
  `pdt_activo` varchar(10) NOT NULL,
  `rol` varchar(1) NOT NULL DEFAULT '2'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `productor`
--

INSERT INTO `productor` (`id_productor`, `pdt_nombre_completo`, `pdt_curp`, `pdt_rfc`, `pdt_domicilio_completo`, `pdt_telefono`, `pdt_email`, `pdt_password`, `pdt_activo`, `rol`) VALUES
(29, 'PRODUCTOR', 'MWNO001123HPLRLA4', 'MWNO001123PL3', 'RICARDO #234', '4241000692', 'Productor@gmailcom', 0x02085f3299bd3cdb7fe82d6bd8ec36ca, 'activo', '2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propiedad`
--

CREATE TABLE `propiedad` (
  `id_regimen` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `propiedad`
--

INSERT INTO `propiedad` (`id_regimen`, `nombre`) VALUES
(3, 'PARCELA 117');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `id_proveedor` int(11) NOT NULL,
  `empresa` varchar(80) NOT NULL,
  `area` varchar(15) NOT NULL,
  `localizacion` varchar(60) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `direccion_elect` varchar(80) DEFAULT NULL,
  `certificacion` varchar(25) NOT NULL,
  `id_productor` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`id_proveedor`, `empresa`, `area`, `localizacion`, `telefono`, `direccion_elect`, `certificacion`, `id_productor`) VALUES
(6, 'DETODO', 'PRODUCCIÓN', 'NIñOS HEROES #235', '3122344567', 'iscv@gmail.com', '124092', 29);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `responsable`
--

CREATE TABLE `responsable` (
  `id_responsable` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(120) NOT NULL,
  `telefono` varchar(12) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `puesto` varchar(40) NOT NULL,
  `id_productor` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `responsable`
--

INSERT INTO `responsable` (`id_responsable`, `nombre`, `direccion`, `telefono`, `correo`, `puesto`, `id_productor`) VALUES
(6, 'JAVIER', 'MORELOS #343', '4531338923', 'responsable1@gmail.com', 'INOCUIDAD', 29),
(7, 'PEDRO', 'DOLORES #456', '3122344564', 'responsable2@gmail.com', 'COSECHA', 29);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `riego`
--

CREATE TABLE `riego` (
  `id_riego` bigint(20) NOT NULL,
  `fecha` date NOT NULL,
  `total` double NOT NULL DEFAULT 0,
  `id_productor` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `riego`
--

INSERT INTO `riego` (`id_riego`, `fecha`, `total`, `id_productor`) VALUES
(118, '2022-11-08', 23, 29);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `terreno`
--

CREATE TABLE `terreno` (
  `id_terreno` bigint(20) NOT NULL,
  `tipo` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_enfermedad`
--

CREATE TABLE `tipo_enfermedad` (
  `id_tipo_enfermedad` int(11) NOT NULL,
  `tipo_enfermedad` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipo_enfermedad`
--

INSERT INTO `tipo_enfermedad` (`id_tipo_enfermedad`, `tipo_enfermedad`) VALUES
(6, 'FOMOSIS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_etapa`
--

CREATE TABLE `tipo_etapa` (
  `id_tipo_etapa` int(11) NOT NULL,
  `tpeta_act_descripcion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipo_etapa`
--

INSERT INTO `tipo_etapa` (`id_tipo_etapa`, `tpeta_act_descripcion`) VALUES
(5, 'NUEVA PLANTACIóN'),
(6, 'NUTRICIóN'),
(7, 'COSECHA'),
(8, 'RIEGO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_gasto`
--

CREATE TABLE `tipo_gasto` (
  `id_tipo_gasto` int(11) NOT NULL,
  `tpgst_act_descripcion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipo_gasto`
--

INSERT INTO `tipo_gasto` (`id_tipo_gasto`, `tpgst_act_descripcion`) VALUES
(4, 'NUTRICIóN'),
(5, 'RIEGO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_insumo`
--

CREATE TABLE `tipo_insumo` (
  `id_tipo_insumo` int(11) NOT NULL,
  `descripcion` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipo_insumo`
--

INSERT INTO `tipo_insumo` (`id_tipo_insumo`, `descripcion`) VALUES
(13, 'FUNGICIDA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `usr_nombre_completo` varchar(50) NOT NULL,
  `usr_email` varchar(60) NOT NULL,
  `usr_password` blob NOT NULL,
  `rol` varchar(1) NOT NULL DEFAULT '1',
  `responsabilidades` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `usr_nombre_completo`, `usr_email`, `usr_password`, `rol`, `responsabilidades`) VALUES
(119, 'NOé MORALES WALLE', 'iscvcorporacion@gmail.com', 0x02085f3299bd3cdb7fe82d6bd8ec36ca, '1', ''),
(121, 'JAVIER', 'abogado@correo.com', 0x02085f3299bd3cdb7fe82d6bd8ec36ca, '2', 'Abogado'),
(122, 'ADMIN', 'admin@gmail.com', 0xc621d588252e7a78843ac7c5e6b00316, '1', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `variedad`
--

CREATE TABLE `variedad` (
  `id_variedad` int(11) NOT NULL,
  `variedad` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `variedad`
--

INSERT INTO `variedad` (`id_variedad`, `variedad`) VALUES
(4, 'AMARILLOS V');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta`
--

CREATE TABLE `venta` (
  `id_venta` bigint(20) NOT NULL,
  `vt_fecha` date NOT NULL,
  `vt_precio_reja` float NOT NULL DEFAULT 0,
  `vt_precio_kg` float NOT NULL DEFAULT 0,
  `vt_subtotal` float NOT NULL DEFAULT 0,
  `id_comprador` int(11) NOT NULL,
  `id_parcela` bigint(20) NOT NULL,
  `id_produccion` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `analisis_agua`
--
ALTER TABLE `analisis_agua`
  ADD PRIMARY KEY (`id_analisis_agua`);

--
-- Indices de la tabla `analisis_foliar`
--
ALTER TABLE `analisis_foliar`
  ADD PRIMARY KEY (`id_analisis_foliar`);

--
-- Indices de la tabla `analisis_suelo`
--
ALTER TABLE `analisis_suelo`
  ADD PRIMARY KEY (`id_analisis_suelo`);

--
-- Indices de la tabla `antecedente`
--
ALTER TABLE `antecedente`
  ADD PRIMARY KEY (`id_antecedente`);

--
-- Indices de la tabla `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`id_compra`);

--
-- Indices de la tabla `comprador`
--
ALTER TABLE `comprador`
  ADD PRIMARY KEY (`id_comprador`);

--
-- Indices de la tabla `control`
--
ALTER TABLE `control`
  ADD PRIMARY KEY (`id_control`);

--
-- Indices de la tabla `ctl_gastos`
--
ALTER TABLE `ctl_gastos`
  ADD PRIMARY KEY (`id_ctl_gasto`);

--
-- Indices de la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
  ADD PRIMARY KEY (`id_compra`,`id_insumo`);

--
-- Indices de la tabla `detalle_enfermedad`
--
ALTER TABLE `detalle_enfermedad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalle_gasto`
--
ALTER TABLE `detalle_gasto`
  ADD PRIMARY KEY (`id_detalle_gasto`);

--
-- Indices de la tabla `detalle_manejo`
--
ALTER TABLE `detalle_manejo`
  ADD PRIMARY KEY (`id_manejo`,`id_insumo`);

--
-- Indices de la tabla `detalle_nutricion`
--
ALTER TABLE `detalle_nutricion`
  ADD PRIMARY KEY (`id_det_nutricion`);

--
-- Indices de la tabla `detalle_riego`
--
ALTER TABLE `detalle_riego`
  ADD PRIMARY KEY (`id_riego`,`id_parcela`);

--
-- Indices de la tabla `enfermedad`
--
ALTER TABLE `enfermedad`
  ADD PRIMARY KEY (`id_enfermedad`);

--
-- Indices de la tabla `gastos`
--
ALTER TABLE `gastos`
  ADD PRIMARY KEY (`id_gasto`);

--
-- Indices de la tabla `huerto`
--
ALTER TABLE `huerto`
  ADD PRIMARY KEY (`id_huerto`);

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id_imagen`);

--
-- Indices de la tabla `insumo`
--
ALTER TABLE `insumo`
  ADD PRIMARY KEY (`id_insumo`);

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id_inventario`);

--
-- Indices de la tabla `manejo`
--
ALTER TABLE `manejo`
  ADD PRIMARY KEY (`id_manejo`);

--
-- Indices de la tabla `noticia`
--
ALTER TABLE `noticia`
  ADD PRIMARY KEY (`id_noticia`);

--
-- Indices de la tabla `nutricion`
--
ALTER TABLE `nutricion`
  ADD PRIMARY KEY (`id_nutricion`);

--
-- Indices de la tabla `parcela`
--
ALTER TABLE `parcela`
  ADD PRIMARY KEY (`id_parcela`);

--
-- Indices de la tabla `pcc`
--
ALTER TABLE `pcc`
  ADD PRIMARY KEY (`id_pcc`);

--
-- Indices de la tabla `portainjerto`
--
ALTER TABLE `portainjerto`
  ADD PRIMARY KEY (`id_portainjerto`);

--
-- Indices de la tabla `pp`
--
ALTER TABLE `pp`
  ADD PRIMARY KEY (`id_pp`);

--
-- Indices de la tabla `produccion`
--
ALTER TABLE `produccion`
  ADD PRIMARY KEY (`id_produccion`);

--
-- Indices de la tabla `productor`
--
ALTER TABLE `productor`
  ADD PRIMARY KEY (`id_productor`);

--
-- Indices de la tabla `propiedad`
--
ALTER TABLE `propiedad`
  ADD PRIMARY KEY (`id_regimen`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`id_proveedor`);

--
-- Indices de la tabla `responsable`
--
ALTER TABLE `responsable`
  ADD PRIMARY KEY (`id_responsable`);

--
-- Indices de la tabla `riego`
--
ALTER TABLE `riego`
  ADD PRIMARY KEY (`id_riego`);

--
-- Indices de la tabla `terreno`
--
ALTER TABLE `terreno`
  ADD PRIMARY KEY (`id_terreno`);

--
-- Indices de la tabla `tipo_enfermedad`
--
ALTER TABLE `tipo_enfermedad`
  ADD PRIMARY KEY (`id_tipo_enfermedad`);

--
-- Indices de la tabla `tipo_etapa`
--
ALTER TABLE `tipo_etapa`
  ADD PRIMARY KEY (`id_tipo_etapa`);

--
-- Indices de la tabla `tipo_gasto`
--
ALTER TABLE `tipo_gasto`
  ADD PRIMARY KEY (`id_tipo_gasto`);

--
-- Indices de la tabla `tipo_insumo`
--
ALTER TABLE `tipo_insumo`
  ADD PRIMARY KEY (`id_tipo_insumo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `variedad`
--
ALTER TABLE `variedad`
  ADD PRIMARY KEY (`id_variedad`);

--
-- Indices de la tabla `venta`
--
ALTER TABLE `venta`
  ADD PRIMARY KEY (`id_venta`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `analisis_agua`
--
ALTER TABLE `analisis_agua`
  MODIFY `id_analisis_agua` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `analisis_foliar`
--
ALTER TABLE `analisis_foliar`
  MODIFY `id_analisis_foliar` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `analisis_suelo`
--
ALTER TABLE `analisis_suelo`
  MODIFY `id_analisis_suelo` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `antecedente`
--
ALTER TABLE `antecedente`
  MODIFY `id_antecedente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `compra`
--
ALTER TABLE `compra`
  MODIFY `id_compra` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `comprador`
--
ALTER TABLE `comprador`
  MODIFY `id_comprador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `control`
--
ALTER TABLE `control`
  MODIFY `id_control` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `ctl_gastos`
--
ALTER TABLE `ctl_gastos`
  MODIFY `id_ctl_gasto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `detalle_enfermedad`
--
ALTER TABLE `detalle_enfermedad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT de la tabla `detalle_gasto`
--
ALTER TABLE `detalle_gasto`
  MODIFY `id_detalle_gasto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=643;

--
-- AUTO_INCREMENT de la tabla `detalle_nutricion`
--
ALTER TABLE `detalle_nutricion`
  MODIFY `id_det_nutricion` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT de la tabla `enfermedad`
--
ALTER TABLE `enfermedad`
  MODIFY `id_enfermedad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `gastos`
--
ALTER TABLE `gastos`
  MODIFY `id_gasto` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=637;

--
-- AUTO_INCREMENT de la tabla `huerto`
--
ALTER TABLE `huerto`
  MODIFY `id_huerto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id_imagen` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `insumo`
--
ALTER TABLE `insumo`
  MODIFY `id_insumo` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id_inventario` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `manejo`
--
ALTER TABLE `manejo`
  MODIFY `id_manejo` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `noticia`
--
ALTER TABLE `noticia`
  MODIFY `id_noticia` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `nutricion`
--
ALTER TABLE `nutricion`
  MODIFY `id_nutricion` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `parcela`
--
ALTER TABLE `parcela`
  MODIFY `id_parcela` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `pcc`
--
ALTER TABLE `pcc`
  MODIFY `id_pcc` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `portainjerto`
--
ALTER TABLE `portainjerto`
  MODIFY `id_portainjerto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `pp`
--
ALTER TABLE `pp`
  MODIFY `id_pp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `produccion`
--
ALTER TABLE `produccion`
  MODIFY `id_produccion` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=626;

--
-- AUTO_INCREMENT de la tabla `productor`
--
ALTER TABLE `productor`
  MODIFY `id_productor` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `propiedad`
--
ALTER TABLE `propiedad`
  MODIFY `id_regimen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `id_proveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `responsable`
--
ALTER TABLE `responsable`
  MODIFY `id_responsable` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `riego`
--
ALTER TABLE `riego`
  MODIFY `id_riego` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT de la tabla `terreno`
--
ALTER TABLE `terreno`
  MODIFY `id_terreno` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_enfermedad`
--
ALTER TABLE `tipo_enfermedad`
  MODIFY `id_tipo_enfermedad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tipo_etapa`
--
ALTER TABLE `tipo_etapa`
  MODIFY `id_tipo_etapa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tipo_gasto`
--
ALTER TABLE `tipo_gasto`
  MODIFY `id_tipo_gasto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tipo_insumo`
--
ALTER TABLE `tipo_insumo`
  MODIFY `id_tipo_insumo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT de la tabla `variedad`
--
ALTER TABLE `variedad`
  MODIFY `id_variedad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `venta`
--
ALTER TABLE `venta`
  MODIFY `id_venta` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=626;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
