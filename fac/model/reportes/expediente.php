<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;


$inicio = explode('T', $request['inicio']);
$fin = explode('T', $request['fin']);
$id_parcela = $request['id_parcela'];


$id_user = $_SESSION["id_user"];

	$sql = "SELECT produccion.pdc_fecha, parcela.id_parcela, SUM(produccion.pdc_rejas) AS rejas, SUM(venta.vt_precio_reja) AS preja, SUM(produccion.pdc_kilos) AS kilos, SUM(venta.vt_precio_kg) AS pkilo, SUM(venta.vt_subtotal) AS subtotal
					FROM produccion INNER JOIN venta
					ON produccion.id_produccion = venta.id_produccion
          INNER JOIN parcela ON produccion.id_parcela = parcela.id_parcela
					WHERE parcela.id_productor = $id_user AND parcela.id_parcela = $id_parcela AND  produccion.pdc_fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "' GROUP BY produccion.pdc_fecha";


	$sql2 = "SELECT  gastos.gst_fecha,gastos.id_parcela, ctl_gastos.ctl_descripcion AS gasto, detalle_gasto.dt_precio
		 FROM parcela INNER JOIN produccion
		 ON parcela.id_parcela = produccion.id_parcela
		 INNER JOIN gastos
        	 ON parcela.id_parcela = gastos.id_parcela
        	 INNER JOIN detalle_gasto
        	 ON gastos.id_gasto = detalle_gasto.id_gasto
        	 INNER JOIN ctl_gastos
        	 ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
        	 INNER JOIN tipo_gasto
        	 ON ctl_gastos.id_tipo_gasto = tipo_gasto.id_tipo_gasto
        	 WHERE parcela.id_productor = $id_user AND parcela.id_parcela = $id_parcela AND tipo_gasto.tpgst_act_descripcion = 'COSECHA' AND  gastos.gst_fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "'
           	 GROUP BY gastos.id_parcela, ctl_gastos.ctl_descripcion, gastos.gst_fecha";

	$sql3 = "SELECT gastos.gst_fecha, tipo_gasto.tpgst_act_descripcion AS tipo_actividad,  ctl_gastos.ctl_descripcion AS actividad, SUM(detalle_gasto.dt_precio) AS costo
		 FROM parcela INNER JOIN gastos ON parcela.id_parcela = gastos.id_parcela
		 INNER JOIN detalle_gasto ON gastos.id_gasto = detalle_gasto.id_gasto
		 INNER JOIN ctl_gastos ON ctl_gastos.id_ctl_gasto = detalle_gasto.id_ctl_gasto
		 INNER JOIN tipo_gasto ON ctl_gastos.id_tipo_gasto = tipo_gasto.id_tipo_gasto
		 WHERE parcela.id_productor = $id_user AND parcela.id_parcela = $id_parcela AND tipo_gasto.tpgst_act_descripcion != 'COSECHA' AND  gastos.gst_fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "'
           	 GROUP BY gastos.id_parcela, ctl_gastos.ctl_descripcion, gastos.gst_fecha";

	$sql4 = "SELECT fecha, SUM(costo) AS costo
				 	 FROM riego INNER JOIN detalle_riego
				 	 ON riego.id_riego = detalle_riego.id_riego
				 	 WHERE riego.id_productor = '". $id_user . "' AND detalle_riego.id_parcela = $id_parcela AND riego.fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] ."' ";

	$sql5 = "SELECT fecha, SUM(subtotal) AS subtotal FROM compra WHERE id_productor = $id_user AND fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] ."' ";

    $sql6 = "
  SELECT DATE_FORMAT(nutricion.fecha, '%Y') AS year, DATE_FORMAT(nutricion.fecha, '%M-%Y') as md, SUM(detalle_nutricion.cantidad) as cantidad, (detalle_nutricion.medida) as medida, sum(detalle_nutricion.costo) as costo
  FROM detalle_nutricion
  INNER JOIN nutricion ON detalle_nutricion.id_nutricion = nutricion.id_nutricion
  INNER JOIN parcela ON nutricion.id_parcela = parcela.id_parcela
  INNER JOIN insumo ON detalle_nutricion.id_insumo = insumo.id_insumo
  INNER JOIN tipo_insumo ON insumo.id_insumo = tipo_insumo.id_tipo_insumo
  WHERE nutricion.fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] ."' AND parcela.id_productor = $id_user AND parcela.id_parcela = $id_parcela AND tipo_insumo.id_tipo_insumo=1
  GROUP BY md";

$sql7 = "SELECT DATE_FORMAT(nutricion.fecha, '%Y') AS year, DATE_FORMAT(nutricion.fecha, '%M-%Y') as md, SUM(detalle_nutricion.cantidad) as cantidad, (detalle_nutricion.medida) as medida, sum(detalle_nutricion.costo) as costo
  FROM detalle_nutricion
  INNER JOIN nutricion ON detalle_nutricion.id_nutricion = nutricion.id_nutricion
  INNER JOIN parcela ON nutricion.id_parcela = parcela.id_parcela
  INNER JOIN insumo ON detalle_nutricion.id_insumo = insumo.id_insumo
  INNER JOIN tipo_insumo ON insumo.id_insumo = tipo_insumo.id_tipo_insumo 
  WHERE nutricion.fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] ."' AND parcela.id_productor = $id_user AND parcela.id_parcela = $id_parcela AND tipo_insumo.id_tipo_insumo=4
GROUP BY md, tipo_insumo.id_tipo_insumo ";

$sql8 = "SELECT DATE_FORMAT(nutricion.fecha, '%Y') AS year, DATE_FORMAT(nutricion.fecha, '%M-%Y') as md, SUM(detalle_nutricion.cantidad) as cantidad, (detalle_nutricion.medida) as medida, sum(detalle_nutricion.costo) as costo
  FROM detalle_nutricion
  INNER JOIN nutricion ON detalle_nutricion.id_nutricion = nutricion.id_nutricion
  INNER JOIN parcela ON nutricion.id_parcela = parcela.id_parcela
  INNER JOIN insumo ON detalle_nutricion.id_insumo = insumo.id_insumo
  INNER JOIN tipo_insumo ON insumo.id_insumo = tipo_insumo.id_tipo_insumo 
  WHERE nutricion.fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] ."' AND parcela.id_productor = $id_user AND parcela.id_parcela = $id_parcela AND tipo_insumo.id_tipo_insumo=2
GROUP BY md, tipo_insumo.id_tipo_insumo ";

$sql9 = "SELECT DATE_FORMAT(nutricion.fecha, '%Y') AS year, DATE_FORMAT(nutricion.fecha, '%M-%Y') as md, SUM(detalle_nutricion.cantidad) as cantidad, (detalle_nutricion.medida) as medida, sum(detalle_nutricion.costo) as costo
  FROM detalle_nutricion
  INNER JOIN nutricion ON detalle_nutricion.id_nutricion = nutricion.id_nutricion
  INNER JOIN parcela ON nutricion.id_parcela = parcela.id_parcela
  INNER JOIN insumo ON detalle_nutricion.id_insumo = insumo.id_insumo
  INNER JOIN tipo_insumo ON insumo.id_insumo = tipo_insumo.id_tipo_insumo 
  WHERE nutricion.fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] ."' AND parcela.id_productor = $id_user AND parcela.id_parcela = $id_parcela AND tipo_insumo.id_tipo_insumo=3 AND nutricion.tipo_aplicacion='FOLIAR'
GROUP BY md, tipo_insumo.id_tipo_insumo ";

$sql10 = "SELECT DATE_FORMAT(nutricion.fecha, '%Y') AS year, DATE_FORMAT(nutricion.fecha, '%M-%Y') as md, SUM(detalle_nutricion.cantidad) as cantidad, (detalle_nutricion.medida) as medida, sum(detalle_nutricion.costo) as costo
  FROM detalle_nutricion
  INNER JOIN nutricion ON detalle_nutricion.id_nutricion = nutricion.id_nutricion
  INNER JOIN parcela ON nutricion.id_parcela = parcela.id_parcela
  INNER JOIN insumo ON detalle_nutricion.id_insumo = insumo.id_insumo
  INNER JOIN tipo_insumo ON insumo.id_insumo = tipo_insumo.id_tipo_insumo 
  WHERE nutricion.fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] ."' AND parcela.id_productor = $id_user AND parcela.id_parcela = $id_parcela AND tipo_insumo.id_tipo_insumo=3 AND nutricion.tipo_aplicacion='SUELO'
GROUP BY md, tipo_insumo.id_tipo_insumo ";


	$respuesta = array(
				'err' => true,
				'reporte' => Database::get_arreglo($sql),
				'gastos' => Database::get_arreglo($sql2),
				'gastos_varios' => Database::get_arreglo($sql3),
				'riego' => Database::get_row($sql4),
				'compra' => Database::get_row($sql5),
				'maleza' => Database::get_arreglo($sql6),
				'insecticida' => Database::get_arreglo($sql7),
				'fungicida' => Database::get_arreglo($sql8),
				'fertilizante' => Database::get_arreglo($sql9),
				'fertilizante_suelo' => Database::get_arreglo($sql10)
			);


echo json_encode( $respuesta );


?>