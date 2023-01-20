<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");



$parametro = $_GET['id'];
$id_user = $_SESSION["id_user"];

if (is_numeric($parametro)) {


$sql = "SELECT
t1.year,
t1.md,
t1.md2,
IFNULL(t2.costo, 0) AS costo,
coalesce(SUM(t1.amount+t2.amount), 0) AS dosis_total
from
(
  select DATE_FORMAT(a.Date,'%Y') as year,
  DATE_FORMAT(a.Date, '%M-%Y') as md,
  DATE_FORMAT(a.Date, '%m-%Y') as md2,
  '0' as  amount
  from (
    select curdate() - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY as Date
    from (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as a
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as b
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as c
  ) a
  where a.Date <= NOW() and a.Date >= Date_add(Now(),INTERVAL - 11 month)
  group by md
)t1
left join
(
  SELECT DATE_FORMAT(nutricion.fecha, '%Y') AS year, SUM(detalle_nutricion.cantidad) as amount ,DATE_FORMAT(nutricion.fecha, '%M-%Y') as md, DATE_FORMAT(nutricion.fecha, '%m-%Y') as md2, SUM(detalle_nutricion.costo) AS costo
  FROM detalle_nutricion
  INNER JOIN nutricion ON detalle_nutricion.id_nutricion = nutricion.id_nutricion
  INNER JOIN parcela ON nutricion.id_parcela = parcela.id_parcela
  INNER JOIN insumo ON detalle_nutricion.id_insumo = insumo.id_insumo
  where nutricion.fecha <= NOW() and nutricion.fecha >= Date_add(Now(),INTERVAL - 12 MONTH) AND parcela.id_productor = $id_user AND parcela.id_parcela = $parametro and insumo.id_tipo_insumo=1
  GROUP BY md
)t2
on t2.md = t1.md 
group by t1.md
order by t1.year, t1.md2 ASC";
    
$sql2 = "select
t1.year,
t1.md,
t1.md2,
coalesce(SUM(t1.rejas+t2.rejas), 0) AS rejas_total,
IFNULL(t2.preja, 0)  AS preja_total,
coalesce(SUM(t1.kilos+t2.kilos), 0) AS kilos_total,
IFNULL(t2.pkilo, 0) AS pkilo_total,
coalesce(SUM(t1.subtotal+t2.subtotal), 0) AS sub_total
from
(
  select DATE_FORMAT(a.Date,'%Y') as year,
  DATE_FORMAT(a.Date, '%M-%Y') as md,
  DATE_FORMAT(a.Date, '%m-%Y') as md2,
  '0' as  rejas,
  '0' as  kilos,
  '0' as  subtotal
  from (
    select curdate() - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY as Date
    from (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as a
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as b
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as c
  ) a
  where a.Date <= NOW() and a.Date >= Date_add(Now(),INTERVAL - 11 month)
  group by md
)t1
left join
(
  SELECT DATE_FORMAT(produccion.pdc_fecha, '%Y') AS year, DATE_FORMAT(produccion.pdc_fecha, '%M-%Y') as md, DATE_FORMAT(produccion.pdc_fecha, '%m-%Y') as md2, SUM(produccion.pdc_rejas) AS rejas, AVG(venta.vt_precio_reja) AS preja, SUM(produccion.pdc_kilos) AS kilos, AVG(venta.vt_precio_kg) AS pkilo, SUM(venta.vt_subtotal) AS subtotal
FROM produccion 
INNER JOIN venta ON produccion.id_produccion = venta.id_produccion
INNER JOIN parcela ON produccion.id_parcela = parcela.id_parcela
  where produccion.pdc_fecha <= NOW() and produccion.pdc_fecha >= Date_add(Now(),INTERVAL - 12 MONTH) AND parcela.id_productor = $id_user AND parcela.id_parcela = $parametro
  GROUP BY md
)t2
on t2.md = t1.md 
group by t1.md
order by t1.year ASC, t1.md2 ASC";

$sql3 = "SELECT
t1.year,
t1.md,
t1.md2,
coalesce(SUM(t1.cantidad+t2.cantidad), 0) AS cantidad,
coalesce(SUM(t1.costo+t2.costo), 0) AS costo
from
(
  select DATE_FORMAT(a.Date,'%Y') as year,
  DATE_FORMAT(a.Date, '%M-%Y') as md,
  DATE_FORMAT(a.Date, '%m-%Y') as md2,
  '0' as  cantidad,
  '0' as  costo
  from (
    select curdate() - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY as Date
    from (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as a
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as b
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as c
  ) a
  where a.Date <= NOW() and a.Date >= Date_add(Now(),INTERVAL - 11 month)
  group by md
)t1
left join
(
SELECT DATE_FORMAT(nutricion.fecha, '%Y') AS year, DATE_FORMAT(nutricion.fecha, '%M-%Y') as md,DATE_FORMAT(nutricion.fecha, '%m-%Y') as md2, SUM(detalle_nutricion.cantidad) as cantidad, (detalle_nutricion.medida) as medida, sum(detalle_nutricion.costo) as costo
  FROM detalle_nutricion
  INNER JOIN nutricion ON detalle_nutricion.id_nutricion = nutricion.id_nutricion
  INNER JOIN parcela ON nutricion.id_parcela = parcela.id_parcela
  INNER JOIN insumo ON detalle_nutricion.id_insumo = insumo.id_insumo
  INNER JOIN tipo_insumo ON insumo.id_tipo_insumo = tipo_insumo.id_tipo_insumo 
  WHERE nutricion.fecha <= NOW() AND nutricion.fecha >= Date_add(Now(),INTERVAL - 12 MONTH)  AND parcela.id_productor = $id_user AND tipo_insumo.id_tipo_insumo=4 AND parcela.id_parcela = $parametro
GROUP BY md, tipo_insumo.id_tipo_insumo
)t2
on t2.md = t1.md 
group by t1.md
order by t1.year ASC, t1.md2 ASC ";

$sql4 = "select
t1.year,
t1.md,
t1.md2,
coalesce(SUM(t1.cantidad+t2.cantidad), 0) AS cantidad,
coalesce(SUM(t1.costo+t2.costo), 0) AS costo
from
(
  select DATE_FORMAT(a.Date,'%Y') as year,
  DATE_FORMAT(a.Date, '%M-%Y') as md,
  DATE_FORMAT(a.Date, '%m-%Y') as md2,
  '0' as  cantidad,
  '0' as  costo
  from (
    select curdate() - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY as Date
    from (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as a
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as b
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as c
  ) a
  where a.Date <= NOW() and a.Date >= Date_add(Now(),INTERVAL - 11 month)
  group by md
)t1
left join
(
SELECT DATE_FORMAT(nutricion.fecha, '%Y') AS year, DATE_FORMAT(nutricion.fecha, '%M-%Y') as md, DATE_FORMAT(nutricion.fecha, '%m-%Y') as md2, SUM(detalle_nutricion.cantidad) as cantidad, (detalle_nutricion.medida) as medida, sum(detalle_nutricion.costo) as costo
  FROM detalle_nutricion
  INNER JOIN nutricion ON detalle_nutricion.id_nutricion = nutricion.id_nutricion
  INNER JOIN parcela ON nutricion.id_parcela = parcela.id_parcela
  INNER JOIN insumo ON detalle_nutricion.id_insumo = insumo.id_insumo
  INNER JOIN tipo_insumo ON insumo.id_tipo_insumo = tipo_insumo.id_tipo_insumo 
  WHERE nutricion.fecha <= NOW() AND nutricion.fecha >= Date_add(Now(),INTERVAL - 12 MONTH)  AND parcela.id_productor = $id_user AND tipo_insumo.id_tipo_insumo=2 AND parcela.id_parcela = $parametro
GROUP BY md, tipo_insumo.id_tipo_insumo 
)t2
on t2.md = t1.md 
group by t1.md
order by t1.year ASC, t1.md2 ASC";

$sql5 = "select
t1.year,
t1.md,
t1.md2,
coalesce(SUM(t1.cantidad+t2.cantidad), 0) AS cantidad,
coalesce(SUM(t1.costo+t2.costo), 0) AS costo
from
(
  select DATE_FORMAT(a.Date,'%Y') as year,
  DATE_FORMAT(a.Date, '%M-%Y') as md,
  DATE_FORMAT(a.Date, '%m-%Y') as md2,
  '0' as  cantidad,
  '0' as  costo
  from (
    select curdate() - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY as Date
    from (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as a
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as b
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as c
  ) a
  where a.Date <= NOW() and a.Date >= Date_add(Now(),INTERVAL - 11 month)
  group by md
)t1
left join
(
SELECT DATE_FORMAT(nutricion.fecha, '%Y') AS year, DATE_FORMAT(nutricion.fecha, '%M-%Y') as md,DATE_FORMAT(nutricion.fecha, '%m-%Y') as md2, SUM(detalle_nutricion.cantidad) as cantidad, (detalle_nutricion.medida) as medida, sum(detalle_nutricion.costo) as costo
  FROM detalle_nutricion
  INNER JOIN nutricion ON detalle_nutricion.id_nutricion = nutricion.id_nutricion
  INNER JOIN parcela ON nutricion.id_parcela = parcela.id_parcela
  INNER JOIN insumo ON detalle_nutricion.id_insumo = insumo.id_insumo
  INNER JOIN tipo_insumo ON insumo.id_tipo_insumo = tipo_insumo.id_tipo_insumo 
  WHERE nutricion.fecha <= NOW() AND nutricion.fecha >= Date_add(Now(),INTERVAL - 12 MONTH)  AND parcela.id_productor = $id_user AND tipo_insumo.id_tipo_insumo=3 AND nutricion.tipo_aplicacion='FOLIAR' AND parcela.id_parcela = $parametro
GROUP BY md, tipo_insumo.id_tipo_insumo 
)t2
on t2.md = t1.md 
group by t1.md
order by t1.year ASC, t1.md2 ASC";

$sql6 = "select
t1.year,
t1.md,
t1.md2,
coalesce(SUM(t1.cantidad+t2.cantidad), 0) AS cantidad,
coalesce(SUM(t1.costo+t2.costo), 0) AS costo
from
(
  select DATE_FORMAT(a.Date,'%Y') as year,
  DATE_FORMAT(a.Date, '%M-%Y') as md,
  DATE_FORMAT(a.Date, '%m-%Y') as md2,
  '0' as  cantidad,
  '0' as  costo
  from (
    select curdate() - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY as Date
    from (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as a
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as b
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as c
  ) a
  where a.Date <= NOW() and a.Date >= Date_add(Now(),INTERVAL - 11 month)
  group by md
)t1
left join
(
SELECT DATE_FORMAT(nutricion.fecha, '%Y') AS year, DATE_FORMAT(nutricion.fecha, '%M-%Y') as md, DATE_FORMAT(nutricion.fecha, '%m-%Y') as md2, SUM(detalle_nutricion.cantidad) as cantidad, (detalle_nutricion.medida) as medida, sum(detalle_nutricion.costo) as costo
  FROM detalle_nutricion
  INNER JOIN nutricion ON detalle_nutricion.id_nutricion = nutricion.id_nutricion
  INNER JOIN parcela ON nutricion.id_parcela = parcela.id_parcela
  INNER JOIN insumo ON detalle_nutricion.id_insumo = insumo.id_insumo
  INNER JOIN tipo_insumo ON insumo.id_tipo_insumo = tipo_insumo.id_tipo_insumo 
  WHERE nutricion.fecha <= NOW() AND nutricion.fecha >= Date_add(Now(),INTERVAL - 12 MONTH)  AND parcela.id_productor = $id_user AND tipo_insumo.id_tipo_insumo=3 AND nutricion.tipo_aplicacion='SUELO' AND parcela.id_parcela = $parametro
GROUP BY md, tipo_insumo.id_tipo_insumo 
)t2
on t2.md = t1.md 
group by t1.md
order by t1.year ASC, t1.md2 ASC";
    
$sql7 = "SELECT
t1.year,
t1.md,
t1.md2,
coalesce(SUM(t1.ACARREO+t2.ACARREO), 0) AS ACARREO,
coalesce(SUM(t1.CARGA_DESCARGA+t2.CARGA_DESCARGA), 0) AS CARGA_DESCARGA,
coalesce(SUM(t1.CORTE+t2.CORTE), 0) AS CORTE
from
(
  select DATE_FORMAT(a.Date,'%Y') as year,
  DATE_FORMAT(a.Date, '%M-%Y') as md,
  DATE_FORMAT(a.Date, '%m-%Y') as md2,
  '0' as  ACARREO,
  '0' as  CARGA_DESCARGA,
  '0' as  CORTE
  from (
    select curdate() - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY as Date
    from (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as a
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as b
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as c
  ) a
  where a.Date <= NOW() and a.Date >= Date_add(Now(),INTERVAL - 11 month)
  group by md
)t1
left join
(
SELECT x.md, x.md2, sum(x.ACARREO) as ACARREO, sum(x.CARGA_DESCARGA) as CARGA_DESCARGA, sum(x.CORTE) as CORTE
FROM
(
SELECT DATE_FORMAT(gastos.gst_fecha, '%M-%Y') as md, DATE_FORMAT(gastos.gst_fecha, '%m-%Y') as md2,
   SUM(CASE WHEN ctl_gastos.ctl_descripcion = 'ACARREO' THEN detalle_gasto.dt_precio ELSE 0 END)  ACARREO,
   SUM(CASE WHEN ctl_gastos.ctl_descripcion = 'CARGA Y DESCARGA' THEN detalle_gasto.dt_precio ELSE 0 END)  CARGA_DESCARGA,
   SUM(CASE WHEN ctl_gastos.ctl_descripcion = 'CORTE' THEN detalle_gasto.dt_precio ELSE 0 END)  CORTE
FROM detalle_gasto
INNER JOIN gastos ON detalle_gasto.id_gasto = gastos.id_gasto
INNER JOIN ctl_gastos ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
INNER JOIN tipo_gasto ON ctl_gastos.id_tipo_gasto = tipo_gasto.id_tipo_gasto
INNER JOIN parcela ON gastos.id_parcela = parcela.id_parcela
WHERE parcela.id_productor = $id_user AND parcela.id_parcela = $parametro  AND tipo_gasto.tpgst_act_descripcion = 'COSECHA' AND  gastos.gst_fecha <= NOW() AND gastos.gst_fecha >= Date_add(Now(),INTERVAL - 12 MONTH)
GROUP BY ctl_gastos.ctl_descripcion, md) as x
GROUP BY x.md
)t2
on t2.md = t1.md 
group by t1.md
order by t1.year ASC, t1.md2 ASC";
    
$sql8 = "SELECT
t1.year,
t1.md,
t1.md2,
coalesce(SUM(t1.disel+t2.disel), 0) AS disel,
coalesce(SUM(t1.gasolina+t2.gasolina), 0) AS gasolina,
coalesce(SUM(t1.energia+t2.energia), 0) AS energia,
coalesce(SUM(t1.refacciones+t2.refacciones), 0) AS refacciones,
coalesce(SUM(t1.aplicacion+t2.aplicacion), 0) AS aplicacion,
coalesce(SUM(t1.desmamone+t2.desmamone), 0) AS desmamone,
coalesce(SUM(t1.poda+t2.poda), 0) AS poda
from
(
  select DATE_FORMAT(a.Date,'%Y') as year,
  DATE_FORMAT(a.Date, '%M-%Y') as md,
  DATE_FORMAT(a.Date, '%m-%Y') as md2,
  '0' as  disel,
  '0' as  gasolina,
  '0' as  energia,
  '0' as  refacciones,
  '0' as  aplicacion,
  '0' as  desmamone,
  '0' as  poda
  from (
    select curdate() - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY as Date
    from (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as a
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as b
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as c
  ) a
  where a.Date <= NOW() and a.Date >= Date_add(Now(),INTERVAL - 11 month)
  group by md
)t1
left join
(
SELECT x.md, x.md2, sum(x.disel) as disel, sum(x.gasolina) as gasolina, sum(x.energia) as energia, sum(x.refacciones) as refacciones, sum(x.aplicacion) as aplicacion, sum(x.desmamone) as desmamone, sum(x.poda) as poda
FROM
(
SELECT DATE_FORMAT(gastos.gst_fecha, '%M-%Y') as md, DATE_FORMAT(gastos.gst_fecha, '%m-%Y') as md2,
   SUM(CASE WHEN ctl_gastos.ctl_descripcion = 'DISEL' THEN detalle_gasto.dt_precio ELSE 0 END)  disel,
   SUM(CASE WHEN ctl_gastos.ctl_descripcion = 'GASOLINA' THEN detalle_gasto.dt_precio ELSE 0 END)  gasolina,
   SUM(CASE WHEN ctl_gastos.ctl_descripcion = 'ENERGIA' THEN detalle_gasto.dt_precio ELSE 0 END)  energia,
   SUM(CASE WHEN ctl_gastos.ctl_descripcion = 'REFACCIONES' THEN detalle_gasto.dt_precio ELSE 0 END)  refacciones,
   SUM(CASE WHEN ctl_gastos.ctl_descripcion = 'APLICACION DE INSUMO' THEN detalle_gasto.dt_precio ELSE 0 END)  aplicacion,
   SUM(CASE WHEN ctl_gastos.ctl_descripcion = 'DESMAMONE' THEN detalle_gasto.dt_precio ELSE 0 END)  desmamone,
   SUM(CASE WHEN ctl_gastos.ctl_descripcion = 'PODA' THEN detalle_gasto.dt_precio ELSE 0 END)  poda
FROM detalle_gasto
INNER JOIN gastos ON detalle_gasto.id_gasto = gastos.id_gasto
INNER JOIN ctl_gastos ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
INNER JOIN tipo_gasto ON ctl_gastos.id_tipo_gasto = tipo_gasto.id_tipo_gasto
INNER JOIN parcela ON gastos.id_parcela = parcela.id_parcela
WHERE parcela.id_productor = $id_user AND parcela.id_parcela = $parametro AND tipo_gasto.tpgst_act_descripcion != 'COSECHA' AND  gastos.gst_fecha <= NOW() AND gastos.gst_fecha >= Date_add(Now(),INTERVAL - 12 MONTH)
GROUP BY ctl_gastos.ctl_descripcion, md) as x
GROUP BY x.md
)t2
on t2.md = t1.md 
group by t1.md
order by t1.year ASC, t1.md2 ASC";
    
    
$sql9 = "SELECT
t1.year,
t1.md,
t1.md2,
coalesce(SUM(t1.costo+t2.costo), 0) AS costo
from
(
  select DATE_FORMAT(a.Date,'%Y') as year,
  DATE_FORMAT(a.Date, '%M-%Y') as md,
  DATE_FORMAT(a.Date, '%m-%Y') as md2,
  '0' as  costo
  from (
    select curdate() - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY as Date
    from (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as a
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as b
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as c
  ) a
  where a.Date <= NOW() and a.Date >= Date_add(Now(),INTERVAL - 11 month)
  group by md
)t1
left join
(
SELECT DATE_FORMAT(riego.fecha, '%Y') AS year, DATE_FORMAT(riego.fecha, '%M-%Y') as md, DATE_FORMAT(riego.fecha, '%m-%Y') as md2, SUM(costo) AS costo
FROM riego 
INNER JOIN detalle_riego ON riego.id_riego = detalle_riego.id_riego
  WHERE riego.fecha <= NOW() AND riego.fecha >= Date_add(Now(),INTERVAL - 12 MONTH)  AND riego.id_productor = $id_user AND detalle_riego.id_parcela = $parametro
GROUP BY md
)t2
on t2.md = t1.md 
group by t1.md
order by t1.year ASC, t1.md2 ASC";
    
$sql10="SELECT
t1.year,
t1.md,
t1.md2,
t1.md3,
t1.day,
IFNULL(t2.costo, 0) AS costo,
coalesce(SUM(t1.amount+t2.amount), 0) AS dosis_total
from
(
  select DATE_FORMAT(a.Date,'%Y') as year,
  DATE_FORMAT(a.Date, '%M-%Y') as md,
  DATE_FORMAT(a.Date, '%m-%Y') as md2,
  DATE_FORMAT(a.Date, '%m') as md3,
  DATE_FORMAT(a.Date, '%d') AS day,
  '0' as  amount
  from (
    select curdate() - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY as Date
    from (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as a
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as b
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as c
  ) a
  where a.Date <= NOW() and a.Date >= Date_add(Now(),INTERVAL - 11 month)
  group by day, md
)t1
left join
(
  SELECT DATE_FORMAT(nutricion.fecha, '%Y') AS year, DATE_FORMAT(nutricion.fecha, '%d') AS day, SUM(detalle_nutricion.cantidad) as amount, DATE_FORMAT(nutricion.fecha, '%M-%Y') as md, DATE_FORMAT(nutricion.fecha, '%m-%Y') as md2, DATE_FORMAT(nutricion.fecha, '%m') as md3, SUM(detalle_nutricion.costo) AS costo
  FROM detalle_nutricion
  INNER JOIN nutricion ON detalle_nutricion.id_nutricion = nutricion.id_nutricion
  INNER JOIN parcela ON nutricion.id_parcela = parcela.id_parcela
  INNER JOIN insumo ON detalle_nutricion.id_insumo = insumo.id_insumo
  where nutricion.fecha <= NOW() and nutricion.fecha >= Date_add(Now(),INTERVAL - 12 MONTH) AND parcela.id_productor = $id_user AND parcela.id_parcela = $parametro AND insumo.id_tipo_insumo=1
  GROUP BY day, md
)t2
on t2.day = t1.day and t2.md = t1.md
group by t1.day, t1.md
order by t1.year, t1.md2, t1.day ASC";
    
$sql11 = "SELECT
t1.year,
t1.md,
t1.md2,
t1.md3,
t1.day,
coalesce(SUM(t1.disel+t2.disel), 0) AS disel,
coalesce(SUM(t1.gasolina+t2.gasolina), 0) AS gasolina,
coalesce(SUM(t1.energia+t2.energia), 0) AS energia,
coalesce(SUM(t1.refacciones+t2.refacciones), 0) AS refacciones,
coalesce(SUM(t1.aplicacion+t2.aplicacion), 0) AS aplicacion,
coalesce(SUM(t1.desmamone+t2.desmamone), 0) AS desmamone,
coalesce(SUM(t1.poda+t2.poda), 0) AS poda
from
(
  select DATE_FORMAT(a.Date,'%Y') as year,
  DATE_FORMAT(a.Date, '%M-%Y') as md,
  DATE_FORMAT(a.Date, '%m-%Y') as md2,
  DATE_FORMAT(a.Date, '%m') as md3,
  DATE_FORMAT(a.Date, '%d') as day,
  '0' as  disel,
  '0' as  gasolina,
  '0' as  energia,
  '0' as  refacciones,
  '0' as  aplicacion,
  '0' as  desmamone,
  '0' as  poda
  from (
    select curdate() - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY as Date
    from (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as a
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as b
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as c
  ) a
  where a.Date <= NOW() and a.Date >= Date_add(Now(),INTERVAL - 11 month)
  group by day, md
)t1
left join
(
SELECT x.md, x.md2, x.md3, x.day, sum(x.disel) as disel, sum(x.gasolina) as gasolina, sum(x.energia) as energia, sum(x.refacciones) as refacciones, sum(x.aplicacion) as aplicacion, sum(x.desmamone) as desmamone, sum(x.poda) as poda
FROM
(
SELECT DATE_FORMAT(gastos.gst_fecha, '%M-%Y') as md, DATE_FORMAT(gastos.gst_fecha, '%m-%Y') as md2, DATE_FORMAT(gastos.gst_fecha, '%m') as md3, DATE_FORMAT(gastos.gst_fecha, '%d') as day,
   SUM(CASE WHEN ctl_gastos.ctl_descripcion = 'DISEL' THEN detalle_gasto.dt_precio ELSE 0 END)  disel,
   SUM(CASE WHEN ctl_gastos.ctl_descripcion = 'GASOLINA' THEN detalle_gasto.dt_precio ELSE 0 END)  gasolina,
   SUM(CASE WHEN ctl_gastos.ctl_descripcion = 'ENERGIA' THEN detalle_gasto.dt_precio ELSE 0 END)  energia,
   SUM(CASE WHEN ctl_gastos.ctl_descripcion = 'REFACCIONES' THEN detalle_gasto.dt_precio ELSE 0 END)  refacciones,
   SUM(CASE WHEN ctl_gastos.ctl_descripcion = 'APLICACION DE INSUMO' THEN detalle_gasto.dt_precio ELSE 0 END)  aplicacion,
   SUM(CASE WHEN ctl_gastos.ctl_descripcion = 'DESMAMONE' THEN detalle_gasto.dt_precio ELSE 0 END)  desmamone,
   SUM(CASE WHEN ctl_gastos.ctl_descripcion = 'PODA' THEN detalle_gasto.dt_precio ELSE 0 END)  poda
FROM detalle_gasto
INNER JOIN gastos ON detalle_gasto.id_gasto = gastos.id_gasto
INNER JOIN ctl_gastos ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
INNER JOIN tipo_gasto ON ctl_gastos.id_tipo_gasto = tipo_gasto.id_tipo_gasto
INNER JOIN parcela ON gastos.id_parcela = parcela.id_parcela
WHERE parcela.id_productor = $id_user AND parcela.id_parcela = $parametro AND tipo_gasto.tpgst_act_descripcion != 'COSECHA' AND  gastos.gst_fecha <= NOW() AND gastos.gst_fecha >= Date_add(Now(),INTERVAL - 12 MONTH) AND detalle_gasto.id_tipo_insumo=3 AND detalle_gasto.aplicacion = 0
GROUP BY ctl_gastos.ctl_descripcion, day, md) as x
GROUP BY x.day, x.md
)t2
on t2.md = t1.md and t2.day = t1.day
group by t1.day, t1.md
order by t1.year ASC, t1.md2, t1.day ASC";
    
$sql12 = "SELECT
t1.year,
t1.md,
t1.md2,
t1.md3,
t1.day,
coalesce(SUM(t1.aplicacion+t2.aplicacion), 0) AS aplicacion
from
(
  select DATE_FORMAT(a.Date,'%Y') as year,
  DATE_FORMAT(a.Date, '%M-%Y') as md,
  DATE_FORMAT(a.Date, '%m-%Y') as md2,
  DATE_FORMAT(a.Date, '%m') as md3,
  DATE_FORMAT(a.Date, '%d') as day,
  '0' as  aplicacion
  from (
    select curdate() - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY as Date
    from (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as a
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as b
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as c
  ) a
  where a.Date <= NOW() and a.Date >= Date_add(Now(),INTERVAL - 11 month)
  group by day, md
)t1
left join
(
SELECT x.md, x.md2, x.md3, x.day, sum(x.aplicacion) as aplicacion
FROM
(
SELECT DATE_FORMAT(gastos.gst_fecha, '%M-%Y') as md, DATE_FORMAT(gastos.gst_fecha, '%m-%Y') as md2, DATE_FORMAT(gastos.gst_fecha, '%m') as md3, DATE_FORMAT(gastos.gst_fecha, '%d') as day,
   SUM(CASE WHEN ctl_gastos.ctl_descripcion = 'APLICACION DE INSUMO' THEN detalle_gasto.dt_precio ELSE 0 END)  aplicacion
FROM detalle_gasto
INNER JOIN gastos ON detalle_gasto.id_gasto = gastos.id_gasto
INNER JOIN ctl_gastos ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
INNER JOIN parcela ON gastos.id_parcela = parcela.id_parcela
WHERE parcela.id_productor = $id_user AND parcela.id_parcela = $parametro AND detalle_gasto.id_tipo_insumo = 1 AND  gastos.gst_fecha <= NOW() AND gastos.gst_fecha >= Date_add(Now(),INTERVAL - 12 MONTH)
GROUP BY ctl_gastos.ctl_descripcion, day, md) as x
GROUP BY x.day, x.md
)t2
on t2.md = t1.md and t2.day = t1.day
group by t1.day, t1.md
order by t1.year ASC, t1.md2, t1.day ASC";
    
$sql13 = "SELECT
t1.year,
t1.md,
t1.md2,
t1.day,
coalesce(SUM(t1.rejas+t2.rejas), 0) AS rejas_total,
IFNULL(t2.preja, 0)  AS preja_total,
coalesce(SUM(t1.kilos+t2.kilos), 0) AS kilos_total,
IFNULL(t2.pkilo, 0) AS pkilo_total,
coalesce(SUM(t1.subtotal+t2.subtotal), 0) AS sub_total
from
(
  select DATE_FORMAT(a.Date,'%Y') as year,
  DATE_FORMAT(a.Date, '%M-%Y') as md,
  DATE_FORMAT(a.Date, '%m-%Y') as md2,
  DATE_FORMAT(a.Date, '%d') as day,
  '0' as  rejas,
  '0' as  kilos,
  '0' as  subtotal
  from (
    select curdate() - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY as Date
    from (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as a
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as b
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as c
  ) a
  where a.Date <= NOW() and a.Date >= Date_add(Now(),INTERVAL - 11 month)
  group by day, md
)t1
left join
(
  SELECT DATE_FORMAT(produccion.pdc_fecha, '%Y') AS year, DATE_FORMAT(produccion.pdc_fecha, '%d') AS day, DATE_FORMAT(produccion.pdc_fecha, '%M-%Y') as md, DATE_FORMAT(produccion.pdc_fecha, '%m-%Y') as md2, SUM(produccion.pdc_rejas) AS rejas, AVG(NULLIF(venta.vt_precio_reja,0)) AS preja, SUM(produccion.pdc_kilos) AS kilos, AVG(NULLIF(venta.vt_precio_kg,0)) AS pkilo, SUM(venta.vt_subtotal) AS subtotal
FROM produccion 
INNER JOIN venta ON produccion.id_produccion = venta.id_produccion
INNER JOIN parcela ON produccion.id_parcela = parcela.id_parcela
  where produccion.pdc_fecha <= NOW() and produccion.pdc_fecha >= Date_add(Now(),INTERVAL - 12 MONTH) AND parcela.id_productor = $id_user AND parcela.id_parcela = $parametro
  GROUP BY day, md
)t2
on t2.md = t1.md and t2.day = t1.day 
group by t1.day, t1.md
order by t1.year, t1.md2, t1.day ASC";
    
$sql14 = "SELECT
t1.year,
t1.md,
t1.md2,
t1.day,
coalesce(SUM(t1.ACARREO+t2.ACARREO), 0) AS ACARREO,
coalesce(SUM(t1.CARGA_DESCARGA+t2.CARGA_DESCARGA), 0) AS CARGA_DESCARGA,
coalesce(SUM(t1.CORTE+t2.CORTE), 0) AS CORTE
from
(
  select DATE_FORMAT(a.Date,'%Y') as year,
  DATE_FORMAT(a.Date, '%M-%Y') as md,
  DATE_FORMAT(a.Date, '%m-%Y') as md2,
  DATE_FORMAT(a.Date, '%d') as day,
  '0' as  ACARREO,
  '0' as  CARGA_DESCARGA,
  '0' as  CORTE
  from (
    select curdate() - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY as Date
    from (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as a
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as b
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as c
  ) a
  where a.Date <= NOW() and a.Date >= Date_add(Now(),INTERVAL - 11 month)
  group by day, md
)t1
left join
(
SELECT x.md, x.md2, x.day, sum(x.ACARREO) as ACARREO, sum(x.CARGA_DESCARGA) as CARGA_DESCARGA, sum(x.CORTE) as CORTE
FROM
(
SELECT DATE_FORMAT(gastos.gst_fecha, '%M-%Y') as md, DATE_FORMAT(gastos.gst_fecha, '%d') as day, DATE_FORMAT(gastos.gst_fecha, '%m-%Y') as md2,
   SUM(CASE WHEN ctl_gastos.ctl_descripcion = 'ACARREO' THEN detalle_gasto.dt_precio ELSE 0 END)  ACARREO,
   SUM(CASE WHEN ctl_gastos.ctl_descripcion = 'CARGA Y DESCARGA' THEN detalle_gasto.dt_precio ELSE 0 END)  CARGA_DESCARGA,
   SUM(CASE WHEN ctl_gastos.ctl_descripcion = 'CORTE' THEN detalle_gasto.dt_precio ELSE 0 END)  CORTE
FROM detalle_gasto
INNER JOIN gastos ON detalle_gasto.id_gasto = gastos.id_gasto
INNER JOIN ctl_gastos ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
INNER JOIN tipo_gasto ON ctl_gastos.id_tipo_gasto = tipo_gasto.id_tipo_gasto
INNER JOIN parcela ON gastos.id_parcela = parcela.id_parcela
WHERE parcela.id_productor = $id_user AND parcela.id_parcela = $parametro  AND tipo_gasto.tpgst_act_descripcion = 'COSECHA' AND  gastos.gst_fecha <= NOW() AND gastos.gst_fecha >= Date_add(Now(),INTERVAL - 12 MONTH)
GROUP BY ctl_gastos.ctl_descripcion, day, md) as x
GROUP BY x.day, x.md
)t2
ON t2.md = t1.md AND t2.day = t1.day 
GROUP BY t1.day, t1.md
ORDER BY t1.year, t1.md2, t1.day ASC";
    
$sql15 = "SELECT
t1.year,
t1.md,
t1.md2,
t1.day,
coalesce(SUM(t1.cantidad+t2.cantidad), 0) AS cantidad,
coalesce(SUM(t1.costo+t2.costo), 0) AS costo
from
(
  select DATE_FORMAT(a.Date,'%Y') as year,
  DATE_FORMAT(a.Date, '%M-%Y') as md,
  DATE_FORMAT(a.Date, '%m-%Y') as md2,
  DATE_FORMAT(a.Date, '%d') as day,
  '0' as  cantidad,
  '0' as  costo
  from (
    select curdate() - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY as Date
    from (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as a
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as b
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as c
  ) a
  where a.Date <= NOW() and a.Date >= Date_add(Now(),INTERVAL - 11 month)
  group by day, md
)t1
left join
(
SELECT DATE_FORMAT(nutricion.fecha, '%Y') AS year, DATE_FORMAT(nutricion.fecha, '%M-%Y') as md, DATE_FORMAT(nutricion.fecha, '%m-%Y') as md2, DATE_FORMAT(nutricion.fecha, '%d') as day, SUM(detalle_nutricion.cantidad) as cantidad, (detalle_nutricion.medida) as medida, sum(detalle_nutricion.costo) as costo
  FROM detalle_nutricion
  INNER JOIN nutricion ON detalle_nutricion.id_nutricion = nutricion.id_nutricion
  INNER JOIN parcela ON nutricion.id_parcela = parcela.id_parcela
  INNER JOIN insumo ON detalle_nutricion.id_insumo = insumo.id_insumo
  INNER JOIN tipo_insumo ON insumo.id_tipo_insumo = tipo_insumo.id_tipo_insumo 
  WHERE nutricion.fecha <= NOW() AND nutricion.fecha >= Date_add(Now(),INTERVAL - 12 MONTH)  AND parcela.id_productor = $id_user AND tipo_insumo.id_tipo_insumo = 4 AND parcela.id_parcela = $parametro
GROUP BY day, md
)t2
ON t2.md = t1.md AND t2.day = t1.day 
GROUP BY t1.day, t1.md
ORDER BY t1.year, t1.md2, t1.day ASC";
    
$sql16 = "SELECT
t1.year,
t1.md,
t1.md2,
t1.day,
coalesce(SUM(t1.cantidad+t2.cantidad), 0) AS cantidad,
coalesce(SUM(t1.costo+t2.costo), 0) AS costo
from
(
  select DATE_FORMAT(a.Date,'%Y') as year,
  DATE_FORMAT(a.Date, '%M-%Y') as md,
  DATE_FORMAT(a.Date, '%m-%Y') as md2,
  DATE_FORMAT(a.Date, '%d') as day,
  '0' as  cantidad,
  '0' as  costo
  from (
    select curdate() - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY as Date
    from (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as a
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as b
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as c
  ) a
  where a.Date <= NOW() and a.Date >= Date_add(Now(),INTERVAL - 11 month)
  group by day, md
)t1
left join
(
SELECT DATE_FORMAT(nutricion.fecha, '%Y') AS year, DATE_FORMAT(nutricion.fecha, '%M-%Y') as md, DATE_FORMAT(nutricion.fecha, '%d') as day, DATE_FORMAT(nutricion.fecha, '%m-%Y') as md2, SUM(detalle_nutricion.cantidad) as cantidad, (detalle_nutricion.medida) as medida, sum(detalle_nutricion.costo) as costo
  FROM detalle_nutricion
  INNER JOIN nutricion ON detalle_nutricion.id_nutricion = nutricion.id_nutricion
  INNER JOIN parcela ON nutricion.id_parcela = parcela.id_parcela
  INNER JOIN insumo ON detalle_nutricion.id_insumo = insumo.id_insumo
  INNER JOIN tipo_insumo ON insumo.id_tipo_insumo = tipo_insumo.id_tipo_insumo 
  WHERE nutricion.fecha <= NOW() AND nutricion.fecha >= Date_add(Now(),INTERVAL - 12 MONTH)  AND parcela.id_productor = $id_user AND tipo_insumo.id_tipo_insumo = 2 AND parcela.id_parcela = $parametro
GROUP BY day, md
)t2
ON t2.md = t1.md AND t2.day = t1.day
GROUP BY t1.day, t1.md
ORDER BY t1.year, t1.md2, t1.day ASC";
    
$sql17 = "SELECT
t1.year,
t1.md,
t1.md2,
t1.day,
coalesce(SUM(t1.cantidad+t2.cantidad), 0) AS cantidad,
coalesce(SUM(t1.costo+t2.costo), 0) AS costo
from
(
  select DATE_FORMAT(a.Date,'%Y') as year,
  DATE_FORMAT(a.Date, '%M-%Y') as md,
  DATE_FORMAT(a.Date, '%m-%Y') as md2,
  DATE_FORMAT(a.Date, '%d') as day,
  '0' as  cantidad,
  '0' as  costo
  from (
    select curdate() - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY as Date
    from (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as a
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as b
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as c
  ) a
  where a.Date <= NOW() and a.Date >= Date_add(Now(),INTERVAL - 11 month)
  group by day, md
)t1
left join
(
SELECT DATE_FORMAT(nutricion.fecha, '%Y') AS year, DATE_FORMAT(nutricion.fecha, '%M-%Y') as md, DATE_FORMAT(nutricion.fecha, '%m-%Y') as md2, DATE_FORMAT(nutricion.fecha, '%d') as day, SUM(detalle_nutricion.cantidad) as cantidad, (detalle_nutricion.medida) as medida, sum(detalle_nutricion.costo) as costo
  FROM detalle_nutricion
  INNER JOIN nutricion ON detalle_nutricion.id_nutricion = nutricion.id_nutricion
  INNER JOIN parcela ON nutricion.id_parcela = parcela.id_parcela
  INNER JOIN insumo ON detalle_nutricion.id_insumo = insumo.id_insumo
  INNER JOIN tipo_insumo ON insumo.id_tipo_insumo = tipo_insumo.id_tipo_insumo 
  WHERE nutricion.fecha <= NOW() AND nutricion.fecha >= Date_add(Now(),INTERVAL - 12 MONTH)  AND parcela.id_productor = $id_user AND tipo_insumo.id_tipo_insumo=3 AND nutricion.tipo_aplicacion='FOLIAR' AND parcela.id_parcela = $parametro
GROUP BY day, md 
)t2
on t2.md = t1.md and t2.day = t1.day
group by t1.day, t1.md
order by t1.year, t1.md2, t1.day ASC";
    
$sql18 = "SELECT
t1.year,
t1.md,
t1.md2,
t1.day,
coalesce(SUM(t1.cantidad+t2.cantidad), 0) AS cantidad,
coalesce(SUM(t1.costo+t2.costo), 0) AS costo
from
(
  select DATE_FORMAT(a.Date,'%Y') as year,
  DATE_FORMAT(a.Date, '%M-%Y') as md,
  DATE_FORMAT(a.Date, '%m-%Y') as md2,
  DATE_FORMAT(a.Date, '%d') as day,
  '0' as  cantidad,
  '0' as  costo
  from (
    select curdate() - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY as Date
    from (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as a
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as b
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as c
  ) a
  where a.Date <= NOW() and a.Date >= Date_add(Now(),INTERVAL - 11 month)
  group by day, md
)t1
left join
(
SELECT DATE_FORMAT(nutricion.fecha, '%Y') AS year, DATE_FORMAT(nutricion.fecha, '%M-%Y') as md, DATE_FORMAT(nutricion.fecha, '%d') as day, DATE_FORMAT(nutricion.fecha, '%m-%Y') as md2, SUM(detalle_nutricion.cantidad) as cantidad, (detalle_nutricion.medida) as medida, sum(detalle_nutricion.costo) as costo
  FROM detalle_nutricion
  INNER JOIN nutricion ON detalle_nutricion.id_nutricion = nutricion.id_nutricion
  INNER JOIN parcela ON nutricion.id_parcela = parcela.id_parcela
  INNER JOIN insumo ON detalle_nutricion.id_insumo = insumo.id_insumo
  INNER JOIN tipo_insumo ON insumo.id_tipo_insumo = tipo_insumo.id_tipo_insumo 
  WHERE nutricion.fecha <= NOW() AND nutricion.fecha >= Date_add(Now(),INTERVAL - 12 MONTH)  AND parcela.id_productor = $id_user AND tipo_insumo.id_tipo_insumo=3 AND nutricion.tipo_aplicacion='SUELO' AND parcela.id_parcela = $parametro
GROUP BY day, md
)t2
on t2.md = t1.md and t2.day = t1.day
group by t1.day, t1.md
order by t1.year, t1.md2, t1.day ASC";
    
$sql19 = "SELECT
t1.year,
t1.md,
t1.md2,
t1.day,
coalesce(SUM(t1.costo+t2.costo), 0) AS costo
from
(
  select DATE_FORMAT(a.Date,'%Y') as year,
  DATE_FORMAT(a.Date, '%M-%Y') as md,
  DATE_FORMAT(a.Date, '%m-%Y') as md2,
  DATE_FORMAT(a.Date, '%d') as day,
  '0' as  costo
  from (
    select curdate() - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY as Date
    from (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as a
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as b
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as c
  ) a
  where a.Date <= NOW() and a.Date >= Date_add(Now(),INTERVAL - 11 month)
  group by day, md
)t1
left join
(
SELECT DATE_FORMAT(riego.fecha, '%Y') AS year, DATE_FORMAT(riego.fecha, '%M-%Y') as md, DATE_FORMAT(riego.fecha, '%m-%Y') as md2, DATE_FORMAT(riego.fecha, '%d') as day, SUM(costo) AS costo
FROM riego 
INNER JOIN detalle_riego ON riego.id_riego = detalle_riego.id_riego
  WHERE riego.fecha <= NOW() AND riego.fecha >= Date_add(Now(),INTERVAL - 12 MONTH)  AND riego.id_productor = $id_user AND detalle_riego.id_parcela = $parametro
GROUP BY day, md
)t2
on t2.md = t1.md and t2.day = t1.day 
group by t1.day, t1.md
order by t1.year, t1.md2, t1.day ASC";
    
    $sql20 = "SELECT
t1.year,
t1.md,
t1.md2,
coalesce(SUM(t1.aplicacion+t2.aplicacion), 0) AS aplicacion
from
(
  select DATE_FORMAT(a.Date,'%Y') as year,
  DATE_FORMAT(a.Date, '%M-%Y') as md,
  DATE_FORMAT(a.Date, '%m-%Y') as md2,
  '0' as  aplicacion
  from (
    select curdate() - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY as Date
    from (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as a
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as b
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as c
  ) a
  where a.Date <= NOW() and a.Date >= Date_add(Now(),INTERVAL - 11 month)
  group by md
)t1
left join
(
SELECT x.md, x.md2, sum(x.aplicacion) as aplicacion
FROM
(
SELECT DATE_FORMAT(gastos.gst_fecha, '%M-%Y') as md, DATE_FORMAT(gastos.gst_fecha, '%m-%Y') as md2,
   SUM(CASE WHEN ctl_gastos.ctl_descripcion = 'APLICACION DE INSUMO' THEN detalle_gasto.dt_precio ELSE 0 END)  aplicacion
FROM detalle_gasto
INNER JOIN gastos ON detalle_gasto.id_gasto = gastos.id_gasto
INNER JOIN ctl_gastos ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
INNER JOIN parcela ON gastos.id_parcela = parcela.id_parcela
WHERE parcela.id_productor = $id_user AND parcela.id_parcela = $parametro AND detalle_gasto.aplicacion = 0 AND detalle_gasto.id_tipo_insumo=3 AND  gastos.gst_fecha <= NOW() AND gastos.gst_fecha >= Date_add(Now(),INTERVAL - 12 MONTH)
GROUP BY ctl_gastos.ctl_descripcion, md) as x
GROUP BY x.md
)t2
on t2.md = t1.md
group by t1.md
order by t1.year, t1.md2 ASC";
    
$sql21 = "SELECT
t1.md,
t1.year,
t1.md2,
coalesce(SUM(t1.aplicacion+t2.aplicacion), 0) AS aplicacion
from
(
  select DATE_FORMAT(a.Date,'%Y') as year,
  DATE_FORMAT(a.Date, '%M-%Y') as md,
  DATE_FORMAT(a.Date, '%m-%Y') as md2,
  '0' as  aplicacion
  from (
    select curdate() - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY as Date
    from (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as a
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as b
    cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as c
  ) a
  where a.Date <= NOW() and a.Date >= Date_add(Now(),INTERVAL - 11 month)
  group by md
)t1
left join
(
SELECT x.md, x.md2, sum(x.aplicacion) as aplicacion
FROM
(
SELECT DATE_FORMAT(gastos.gst_fecha, '%M-%Y') as md, DATE_FORMAT(gastos.gst_fecha, '%m-%Y') as md2,
   SUM(CASE WHEN ctl_gastos.ctl_descripcion = 'APLICACION DE INSUMO' THEN detalle_gasto.dt_precio ELSE 0 END)  aplicacion
FROM detalle_gasto
INNER JOIN gastos ON detalle_gasto.id_gasto = gastos.id_gasto
INNER JOIN ctl_gastos ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
INNER JOIN parcela ON gastos.id_parcela = parcela.id_parcela
WHERE parcela.id_productor = $id_user AND parcela.id_parcela = $parametro AND detalle_gasto.aplicacion = 1 AND detalle_gasto.id_tipo_insumo = 3 AND  gastos.gst_fecha <= NOW() AND gastos.gst_fecha >= Date_add(Now(),INTERVAL - 12 MONTH)
GROUP BY ctl_gastos.ctl_descripcion, md) as x
GROUP BY x.md
)t2
on t2.md = t1.md
group by t1.md
order by t1.year ASC, t1.md2 ASC";
    
    
$sql22 = "SELECT parcela.pcl_hectareas as hectareas, parcela.pcl_arboles as arboles, parcela.pcl_fecha_plantacion as fecha_plantacion, parcela.pcl_marco_plantacion as marco_plantacion FROM parcela 
WHERE parcela.id_productor = $id_user AND parcela.id_parcela = $parametro";
    

$respuesta = array(
        'err' => false,
        'control_maleza' => Database::get_arreglo($sql),
        'prod_cos' => Database::get_arreglo($sql2),
        'insecticida' => Database::get_arreglo($sql3),
        'fungicida' => Database::get_arreglo($sql4),
        'fertilizante' => Database::get_arreglo($sql5),
        'fertilizante_suelo' => Database::get_arreglo($sql6),
        'gastos_cos' => Database::get_arreglo($sql7),
        'gastos_var' => Database::get_arreglo($sql8),
        'riego' => Database::get_arreglo($sql9),
        'control_maleza_mes' => Database::get_arreglo($sql10),
        'gastos_var_mes' => Database::get_arreglo($sql11),
        'aplicacion_herbicida_mes' => Database::get_arreglo($sql12),
        'prod_cos_mes' => Database::get_arreglo($sql13),
        'gastos_cos_mes' => Database::get_arreglo($sql14),
        'insecticida_mes' => Database::get_arreglo($sql15),
        'fungicida_mes' => Database::get_arreglo($sql16),
        'ferti_mes' => Database::get_arreglo($sql17),
        'ferti_suelo_mes' => Database::get_arreglo($sql18),
        'riego_mes' => Database::get_arreglo($sql19),
        'a_suelo' => Database::get_arreglo($sql20),
        'a_foliar' => Database::get_arreglo($sql21),
        'parcela' => Database::get_arreglo($sql22)
    );
}
else{
  $respuesta = array(
        'err' => true
      );
}

    	echo json_encode( $respuesta );

?>