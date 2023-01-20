<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");



$parametro = $_GET['id'];
$id_user = $_SESSION["id_user"];

if (is_numeric($parametro)) {

$sql = "select
t1.year,
t1.md,
coalesce(SUM(t1.amount+t2.amount), 0) AS costo
from
(
  select DATE_FORMAT(a.Date,'%Y') as year,
  DATE_FORMAT(a.Date, '%m-%Y') as md,
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
  SELECT DATE_FORMAT(gastos.gst_fecha, '%Y') AS year, SUM(detalle_gasto.dt_precio) as amount ,DATE_FORMAT(gastos.gst_fecha, '%m-%Y') as md
  FROM gastos
  INNER JOIN detalle_gasto ON gastos.id_gasto = detalle_gasto.id_gasto
  INNER JOIN ctl_gastos ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
  where gastos.gst_fecha <= NOW() AND gastos.gst_fecha >= Date_add(Now(),INTERVAL - 12 MONTH) AND gastos.id_parcela='$parametro' AND  ctl_gastos.id_ctl_gasto=11
  GROUP BY md
)t2
on t2.md = t1.md 
group by t1.md
order by t1.year ASC, t1.md ASC";
    
    $sql2 = "select
t1.year,
t1.md,
coalesce(SUM(t1.amount+t2.amount), 0) AS costo
from
(
  select DATE_FORMAT(a.Date,'%Y') as year,
  DATE_FORMAT(a.Date, '%m-%Y') as md,
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
  SELECT DATE_FORMAT(gastos.gst_fecha, '%Y') AS year, SUM(detalle_gasto.dt_precio) as amount ,DATE_FORMAT(gastos.gst_fecha, '%m-%Y') as md
  FROM gastos
  INNER JOIN detalle_gasto ON gastos.id_gasto = detalle_gasto.id_gasto
  INNER JOIN ctl_gastos ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
  where gastos.gst_fecha <= NOW() AND gastos.gst_fecha >= Date_add(Now(),INTERVAL - 12 MONTH) AND gastos.id_parcela='$parametro' AND  ctl_gastos.id_ctl_gasto=4
  GROUP BY md
)t2
on t2.md = t1.md 
group by t1.md
order by t1.year ASC, t1.md ASC";
    
    $sql3 = "select
t1.year,
t1.md,
coalesce(SUM(t1.amount+t2.amount), 0) AS costo
from
(
  select DATE_FORMAT(a.Date,'%Y') as year,
  DATE_FORMAT(a.Date, '%m-%Y') as md,
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
  SELECT DATE_FORMAT(gastos.gst_fecha, '%Y') AS year, SUM(detalle_gasto.dt_precio) as amount ,DATE_FORMAT(gastos.gst_fecha, '%m-%Y') as md
  FROM gastos
  INNER JOIN detalle_gasto ON gastos.id_gasto = detalle_gasto.id_gasto
  INNER JOIN ctl_gastos ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
  where gastos.gst_fecha <= NOW() AND gastos.gst_fecha >= Date_add(Now(),INTERVAL - 12 MONTH) AND gastos.id_parcela='$parametro' AND  ctl_gastos.id_ctl_gasto=7
  GROUP BY md
)t2
on t2.md = t1.md 
group by t1.md
order by t1.year ASC, t1.md ASC";

$sql4 = "SELECT
t1.year,
t1.md,
t1.md2,
t1.day,
coalesce(SUM(t1.amount+t2.amount), 0) AS costo
from
(
  select DATE_FORMAT(a.Date,'%Y') as year,
  DATE_FORMAT(a.Date, '%M-%Y') as md,
  DATE_FORMAT(a.Date, '%m-%Y') as md2,
  DATE_FORMAT(a.Date, '%d') as day,
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
  SELECT DATE_FORMAT(gastos.gst_fecha, '%Y') AS year, SUM(detalle_gasto.dt_precio) as amount ,DATE_FORMAT(gastos.gst_fecha, '%M-%Y') as md, DATE_FORMAT(gastos.gst_fecha, '%m-%Y') as md2, DATE_FORMAT(gastos.gst_fecha, '%d') as day
  FROM gastos
  INNER JOIN detalle_gasto ON gastos.id_gasto = detalle_gasto.id_gasto
  INNER JOIN ctl_gastos ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
  where gastos.gst_fecha <= NOW() AND gastos.gst_fecha >= Date_add(Now(),INTERVAL - 12 MONTH) AND gastos.id_parcela='$parametro' AND  ctl_gastos.id_ctl_gasto=4
  GROUP BY day, md
)t2
on t2.md = t1.md and t2.day = t1.day
group by t1.day, t1.md
order by t1.year, t1.md2, t1.day ASC";
    
$sql5 = "SELECT
t1.year,
t1.md,
t1.md2,
t1.day,
coalesce(SUM(t1.amount+t2.amount), 0) AS costo
from
(
  select DATE_FORMAT(a.Date,'%Y') as year,
  DATE_FORMAT(a.Date, '%M-%Y') as md,
  DATE_FORMAT(a.Date, '%m-%Y') as md2,
  DATE_FORMAT(a.Date, '%d') as day,
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
  SELECT DATE_FORMAT(gastos.gst_fecha, '%Y') AS year, SUM(detalle_gasto.dt_precio) as amount ,DATE_FORMAT(gastos.gst_fecha, '%M-%Y') as md, DATE_FORMAT(gastos.gst_fecha, '%m-%Y') as md2, DATE_FORMAT(gastos.gst_fecha, '%d') as day
  FROM gastos
  INNER JOIN detalle_gasto ON gastos.id_gasto = detalle_gasto.id_gasto
  INNER JOIN ctl_gastos ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
  where gastos.gst_fecha <= NOW() AND gastos.gst_fecha >= Date_add(Now(),INTERVAL - 12 MONTH) AND gastos.id_parcela='$parametro' AND  ctl_gastos.id_ctl_gasto=7
  GROUP BY day, md
)t2
on t2.md = t1.md and t2.day = t1.day
group by t1.day, t1.md
order by t1.year, t1.md2, t1.day ASC";

$respuesta = array(
      'err' => false,
      'gastos' => Database::get_arreglo( $sql ),
      'macheteo' => Database::get_arreglo( $sql2 ),
      'rastreo' => Database::get_arreglo( $sql3 ),
      'macheteo_mes' => Database::get_arreglo( $sql4 ),
      'rastreo_mes' => Database::get_arreglo( $sql5 )
    );
}
else{
  $respuesta = array(
        'err' => true
      );
}

    	echo json_encode( $respuesta );

?>
