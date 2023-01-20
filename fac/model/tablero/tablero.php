<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;

$id_parcela = $request['id_parcela'];
$user = $request['user'];
$inicio = explode('T', $request['inicio']);
$fin = explode('T', $request['fin']);

$id_user = $_SESSION["id_user"];

if($user == FALSE){
    	$sql = "SELECT produccion.pdc_fecha as fecha, 
            DATE_FORMAT(produccion.pdc_fecha, '%Y') AS anio,                                    DATE_FORMAT(produccion.pdc_fecha, '%M-%Y') as mes,                                  DATE_FORMAT(produccion.pdc_fecha, '%m') as mes_num,
            ROUND(SUM(venta.vt_subtotal)) AS subtotal, SUM(produccion.pdc_kilos) AS kilos, SUM(produccion.pdc_rejas) AS rejas,
            AVG(venta.vt_precio_kg) AS pkilo,
            AVG(venta.vt_precio_reja) AS preja
            FROM produccion 
            INNER JOIN venta ON produccion.id_produccion = venta.id_produccion
            INNER JOIN parcela ON produccion.id_parcela = parcela.id_parcela
            WHERE produccion.pdc_fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "'
            GROUP BY anio, mes
            ORDER BY anio, mes_num";
    
    $sql2 = "SELECT SUM(dt_precio) AS costo, ctl_gastos.ctl_descripcion
		    FROM gastos 
            INNER JOIN detalle_gasto ON gastos.id_gasto = detalle_gasto.id_gasto
            INNER JOIN ctl_gastos ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
            INNER JOIN tipo_gasto ON ctl_gastos.id_tipo_gasto = tipo_gasto.id_tipo_gasto
            INNER JOIN parcela ON gastos.id_parcela = parcela.id_parcela
            WHERE gastos.gst_fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "' AND tipo_gasto.id_tipo_gasto = 1
            GROUP BY 2";
    
    $sql3 = "SELECT compra.fecha as fecha, DATE_FORMAT(compra.fecha, '%Y') AS anio, DATE_FORMAT(compra.fecha, '%M-%Y') as mes, DATE_FORMAT(compra.fecha, '%m') as mes_num,
            SUM(detalle_compra.precio*detalle_compra.cant_insumos) AS subtotal,detalle_compra.precio,detalle_compra.cant_insumos, insumo.nombre_com
            FROM compra 
            INNER JOIN detalle_compra ON compra.id_compra = detalle_compra.id_compra
            INNER JOIN insumo ON detalle_compra.id_insumo = insumo.id_insumo
            WHERE compra.fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "' 
            GROUP BY nombre_com
            ORDER BY anio, mes_num";
    
        
    $sql4 = "SELECT SUM(detalle_nutricion.cantidad) as cantidad, (detalle_nutricion.medida) as medida, sum(detalle_nutricion.costo) as costo, tipo_insumo.descripcion
              FROM detalle_nutricion
              INNER JOIN nutricion ON detalle_nutricion.id_nutricion = nutricion.id_nutricion
              INNER JOIN parcela ON nutricion.id_parcela = parcela.id_parcela
              INNER JOIN insumo ON detalle_nutricion.id_insumo = insumo.id_insumo
              INNER JOIN tipo_insumo ON insumo.id_tipo_insumo = tipo_insumo.id_tipo_insumo 
              WHERE nutricion.fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "' 
            GROUP BY detalle_nutricion.medida, insumo.id_tipo_insumo";
    
    $sql5 = "SELECT SUM(dt_precio) AS costo, ctl_gastos.ctl_descripcion
		    FROM gastos 
            INNER JOIN detalle_gasto ON gastos.id_gasto = detalle_gasto.id_gasto
            INNER JOIN ctl_gastos ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
            INNER JOIN tipo_gasto ON ctl_gastos.id_tipo_gasto = tipo_gasto.id_tipo_gasto
            INNER JOIN parcela ON gastos.id_parcela = parcela.id_parcela
            WHERE gastos.gst_fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "' AND tipo_gasto.id_tipo_gasto = 3
            GROUP BY 2";
    
    $sql6 = "SELECT SUM(dt_precio) AS costo, ctl_gastos.ctl_descripcion
		    FROM gastos 
            INNER JOIN detalle_gasto ON gastos.id_gasto = detalle_gasto.id_gasto
            INNER JOIN ctl_gastos ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
            INNER JOIN tipo_gasto ON ctl_gastos.id_tipo_gasto = tipo_gasto.id_tipo_gasto
            INNER JOIN parcela ON gastos.id_parcela = parcela.id_parcela
            WHERE gastos.gst_fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "' AND tipo_gasto.id_tipo_gasto = 2
            GROUP BY 2";
    
    $sql7 = "SELECT SUM(parcela.pcl_hectareas) as hectareas, SUM(parcela.pcl_arboles) as arboles
		    FROM parcela";
    
    $sql8 = "SELECT SUM(costo) AS costo
            FROM riego 
            INNER JOIN detalle_riego ON riego.id_riego = detalle_riego.id_riego
            WHERE riego.fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "'";
    
    $sql9 = "SELECT SUM(detalle_nutricion.cantidad) as cantidad, (detalle_nutricion.medida) as medida, sum(detalle_nutricion.costo) as costo, insumo.nombre_com
              FROM detalle_nutricion
              INNER JOIN nutricion ON detalle_nutricion.id_nutricion = nutricion.id_nutricion
              INNER JOIN parcela ON nutricion.id_parcela = parcela.id_parcela
              INNER JOIN insumo ON detalle_nutricion.id_insumo = insumo.id_insumo
              INNER JOIN tipo_insumo ON insumo.id_tipo_insumo = tipo_insumo.id_tipo_insumo 
              WHERE nutricion.fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "' 
            GROUP BY detalle_nutricion.medida, insumo.id_insumo";
    

	$respuesta = array(
				'err' => true,
				'ventas' => Database::get_arreglo($sql),
				'gastos' => Database::get_arreglo($sql2),
				'compras' => Database::get_arreglo($sql3),
				'costo_insumo' => Database::get_arreglo($sql4),
				'gastos_variables' => Database::get_arreglo($sql5),
				'gastos_cosecha' => Database::get_arreglo($sql6),
				'parcela' => Database::get_arreglo($sql7),
				'riego' => Database::get_arreglo($sql8),
				'costo_insumo2' => Database::get_arreglo($sql9)
			);
}elseif($id_parcela=='0'){
	$sql = "SELECT produccion.pdc_fecha as fecha, 
            DATE_FORMAT(produccion.pdc_fecha, '%Y') AS anio,                                    DATE_FORMAT(produccion.pdc_fecha, '%M-%Y') as mes,                                  DATE_FORMAT(produccion.pdc_fecha, '%m') as mes_num,
            ROUND(SUM(venta.vt_subtotal)) AS subtotal, SUM(produccion.pdc_kilos) AS kilos, SUM(produccion.pdc_rejas) AS rejas,
            AVG(venta.vt_precio_kg) AS pkilo,
            AVG(venta.vt_precio_reja) AS preja
            FROM produccion 
            INNER JOIN venta ON produccion.id_produccion = venta.id_produccion
            INNER JOIN parcela ON produccion.id_parcela = parcela.id_parcela
            WHERE parcela.id_productor= $id_user AND  produccion.pdc_fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "'
            GROUP BY anio, mes
            ORDER BY anio, mes_num";
    
    $sql2 = "SELECT SUM(dt_precio) AS costo, ctl_gastos.ctl_descripcion
		    FROM gastos 
            INNER JOIN detalle_gasto ON gastos.id_gasto = detalle_gasto.id_gasto
            INNER JOIN ctl_gastos ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
            INNER JOIN tipo_gasto ON ctl_gastos.id_tipo_gasto = tipo_gasto.id_tipo_gasto
            INNER JOIN parcela ON gastos.id_parcela = parcela.id_parcela
            WHERE parcela.id_productor = $id_user AND gastos.gst_fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "' AND tipo_gasto.id_tipo_gasto = 1
            GROUP BY 2";
    
    $sql3 = "SELECT compra.fecha as fecha, DATE_FORMAT(compra.fecha, '%Y') AS anio, DATE_FORMAT(compra.fecha, '%M-%Y') as mes, DATE_FORMAT(compra.fecha, '%m') as mes_num,
            SUM(detalle_compra.precio*detalle_compra.cant_insumos) AS subtotal,detalle_compra.precio,detalle_compra.cant_insumos, insumo.nombre_com
            FROM compra 
            INNER JOIN detalle_compra ON compra.id_compra = detalle_compra.id_compra
            INNER JOIN insumo ON detalle_compra.id_insumo = insumo.id_insumo
            WHERE compra.id_productor= $id_user AND compra.fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "' 
            GROUP BY nombre_com
            ORDER BY anio, mes_num";
    
        
    $sql4 = "SELECT SUM(detalle_nutricion.cantidad) as cantidad, (detalle_nutricion.medida) as medida, sum(detalle_nutricion.costo) as costo, tipo_insumo.descripcion
              FROM detalle_nutricion
              INNER JOIN nutricion ON detalle_nutricion.id_nutricion = nutricion.id_nutricion
              INNER JOIN parcela ON nutricion.id_parcela = parcela.id_parcela
              INNER JOIN insumo ON detalle_nutricion.id_insumo = insumo.id_insumo
              INNER JOIN tipo_insumo ON insumo.id_tipo_insumo = tipo_insumo.id_tipo_insumo 
              WHERE parcela.id_productor = $id_user AND nutricion.fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "' 
            GROUP BY detalle_nutricion.medida, insumo.id_tipo_insumo";
    
    $sql5 = "SELECT SUM(dt_precio) AS costo, ctl_gastos.ctl_descripcion
		    FROM gastos 
            INNER JOIN detalle_gasto ON gastos.id_gasto = detalle_gasto.id_gasto
            INNER JOIN ctl_gastos ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
            INNER JOIN tipo_gasto ON ctl_gastos.id_tipo_gasto = tipo_gasto.id_tipo_gasto
            INNER JOIN parcela ON gastos.id_parcela = parcela.id_parcela
            WHERE parcela.id_productor = $id_user AND gastos.gst_fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "' AND tipo_gasto.id_tipo_gasto = 3
            GROUP BY 2";
    
    $sql6 = "SELECT SUM(dt_precio) AS costo, ctl_gastos.ctl_descripcion
		    FROM gastos 
            INNER JOIN detalle_gasto ON gastos.id_gasto = detalle_gasto.id_gasto
            INNER JOIN ctl_gastos ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
            INNER JOIN tipo_gasto ON ctl_gastos.id_tipo_gasto = tipo_gasto.id_tipo_gasto
            INNER JOIN parcela ON gastos.id_parcela = parcela.id_parcela
            WHERE parcela.id_productor = $id_user AND gastos.gst_fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "' AND tipo_gasto.id_tipo_gasto = 2
            GROUP BY 2";
    
    $sql7 = "SELECT SUM(parcela.pcl_hectareas) as hectareas, SUM(parcela.pcl_arboles) as arboles, parcela.id_productor
		    FROM parcela
            WHERE parcela.id_productor = $id_user
            GROUP BY 3";
    
    $sql8 = "SELECT SUM(costo) AS costo, id_productor
            FROM riego 
            INNER JOIN detalle_riego ON riego.id_riego = detalle_riego.id_riego
            WHERE riego.id_productor = $id_user AND riego.fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "'
            GROUP BY 2";
    
    $sql9 = "SELECT SUM(detalle_nutricion.cantidad) as cantidad, (detalle_nutricion.medida) as medida, sum(detalle_nutricion.costo) as costo, insumo.nombre_com
              FROM detalle_nutricion
              INNER JOIN nutricion ON detalle_nutricion.id_nutricion = nutricion.id_nutricion
              INNER JOIN parcela ON nutricion.id_parcela = parcela.id_parcela
              INNER JOIN insumo ON detalle_nutricion.id_insumo = insumo.id_insumo
              INNER JOIN tipo_insumo ON insumo.id_tipo_insumo = tipo_insumo.id_tipo_insumo 
              WHERE parcela.id_productor = $id_user AND nutricion.fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "' 
            GROUP BY detalle_nutricion.medida, insumo.id_insumo";
    

	$respuesta = array(
				'err' => true,
				'ventas' => Database::get_arreglo($sql),
				'gastos' => Database::get_arreglo($sql2),
				'compras' => Database::get_arreglo($sql3),
				'costo_insumo' => Database::get_arreglo($sql4),
				'gastos_variables' => Database::get_arreglo($sql5),
				'gastos_cosecha' => Database::get_arreglo($sql6),
				'parcela' => Database::get_arreglo($sql7),
				'riego' => Database::get_arreglo($sql8),
				'costo_insumo2' => Database::get_arreglo($sql9)
			);
}else{
    $sql = "SELECT produccion.pdc_fecha as fecha, 
            DATE_FORMAT(produccion.pdc_fecha, '%Y') AS anio,
            DATE_FORMAT(produccion.pdc_fecha, '%M-%Y') as mes,                                  DATE_FORMAT(produccion.pdc_fecha, '%m') as mes_num,
            ROUND(SUM(venta.vt_subtotal)) AS subtotal, SUM(produccion.pdc_kilos) AS kilos, SUM(produccion.pdc_rejas) AS rejas,
            AVG(venta.vt_precio_kg) AS pkilo,
            AVG(venta.vt_precio_reja) AS preja
            FROM produccion 
            INNER JOIN venta ON produccion.id_produccion = venta.id_produccion
            INNER JOIN parcela ON produccion.id_parcela = parcela.id_parcela
            WHERE parcela.id_parcela = $id_parcela AND  produccion.pdc_fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "'
            GROUP BY anio, mes
            ORDER BY anio, mes_num";

    $sql2 = "SELECT SUM(dt_precio) AS costo, ctl_gastos.ctl_descripcion
		    FROM gastos 
            INNER JOIN detalle_gasto ON gastos.id_gasto = detalle_gasto.id_gasto
            INNER JOIN ctl_gastos ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
            INNER JOIN tipo_gasto ON ctl_gastos.id_tipo_gasto = tipo_gasto.id_tipo_gasto
            INNER JOIN parcela ON gastos.id_parcela = parcela.id_parcela
            WHERE parcela.id_parcela = $id_parcela AND parcela.id_productor = $id_user AND gastos.gst_fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "' AND tipo_gasto.id_tipo_gasto != 3
            GROUP BY 2";
    
    $sql3 = "SELECT compra.fecha as fecha, DATE_FORMAT(compra.fecha, '%Y') AS anio, DATE_FORMAT(compra.fecha, '%M-%Y') as mes, DATE_FORMAT(compra.fecha, '%m') as mes_num,
            SUM(detalle_compra.precio*detalle_compra.cant_insumos) AS subtotal, insumo.nombre_com
            FROM compra 
            INNER JOIN detalle_compra ON compra.id_compra = detalle_compra.id_compra
            INNER JOIN insumo ON detalle_compra.id_insumo = insumo.id_insumo
            WHERE compra.id_productor= $id_user AND compra.fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "' 
            GROUP BY nombre_com
            ORDER BY anio, mes_num";
    
    $sql4 = "SELECT SUM(detalle_nutricion.cantidad) as cantidad, (detalle_nutricion.medida) as medida, sum(detalle_nutricion.costo) as costo, tipo_insumo.descripcion
              FROM detalle_nutricion
              INNER JOIN nutricion ON detalle_nutricion.id_nutricion = nutricion.id_nutricion
              INNER JOIN parcela ON nutricion.id_parcela = parcela.id_parcela
              INNER JOIN insumo ON detalle_nutricion.id_insumo = insumo.id_insumo
              INNER JOIN tipo_insumo ON insumo.id_tipo_insumo = tipo_insumo.id_tipo_insumo 
              WHERE parcela.id_parcela = $id_parcela AND parcela.id_productor = $id_user AND nutricion.fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "' 
            GROUP BY detalle_nutricion.medida, insumo.id_tipo_insumo";
    
    $sql5 = "SELECT SUM(dt_precio) AS costo, ctl_gastos.ctl_descripcion
		    FROM gastos 
            INNER JOIN detalle_gasto ON gastos.id_gasto = detalle_gasto.id_gasto
            INNER JOIN ctl_gastos ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
            INNER JOIN tipo_gasto ON ctl_gastos.id_tipo_gasto = tipo_gasto.id_tipo_gasto
            INNER JOIN parcela ON gastos.id_parcela = parcela.id_parcela
            WHERE parcela.id_parcela = $id_parcela AND parcela.id_productor = $id_user AND gastos.gst_fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "' AND tipo_gasto.id_tipo_gasto = 3
            GROUP BY 2";
    
    
    $sql6 = "SELECT SUM(dt_precio) AS costo, ctl_gastos.ctl_descripcion
		    FROM gastos 
            INNER JOIN detalle_gasto ON gastos.id_gasto = detalle_gasto.id_gasto
            INNER JOIN ctl_gastos ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
            INNER JOIN tipo_gasto ON ctl_gastos.id_tipo_gasto = tipo_gasto.id_tipo_gasto
            INNER JOIN parcela ON gastos.id_parcela = parcela.id_parcela
            WHERE parcela.id_parcela = $id_parcela AND parcela.id_productor = $id_user AND gastos.gst_fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "' AND tipo_gasto.id_tipo_gasto = 2
            GROUP BY 2";
    
    $sql7 = "SELECT SUM(parcela.pcl_hectareas) as hectareas, SUM(parcela.pcl_arboles) as arboles, parcela.id_productor
		    FROM parcela
            WHERE parcela.id_productor = $id_user AND parcela.id_parcela = $id_parcela
            GROUP BY 3";
    
        
    $sql8 = "SELECT SUM(costo) AS costo, id_productor
            FROM riego 
            INNER JOIN detalle_riego ON riego.id_riego = detalle_riego.id_riego
            WHERE riego.id_productor = $id_user AND detalle_riego.id_parcela = $id_parcela AND riego.fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "'
            GROUP BY 2";
    
    $sql9 = "SELECT SUM(detalle_nutricion.cantidad) as cantidad, (detalle_nutricion.medida) as medida, sum(detalle_nutricion.costo) as costo, insumo.nombre_com
            FROM detalle_nutricion
            INNER JOIN nutricion ON detalle_nutricion.id_nutricion = nutricion.id_nutricion
            INNER JOIN parcela ON nutricion.id_parcela = parcela.id_parcela
            INNER JOIN insumo ON detalle_nutricion.id_insumo = insumo.id_insumo
            INNER JOIN tipo_insumo ON insumo.id_tipo_insumo = tipo_insumo.id_tipo_insumo 
            WHERE parcela.id_productor = $id_user AND parcela.id_parcela = $id_parcela AND nutricion.fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] . "' 
            GROUP BY detalle_nutricion.medida, insumo.id_insumo";

	$respuesta = array(
				'err' => true,
				'ventas' => Database::get_arreglo($sql),
				'gastos' => Database::get_arreglo($sql2),
				'compras' => Database::get_arreglo($sql3),
				'costo_insumo' => Database::get_arreglo($sql4),
				'gastos_variables' => Database::get_arreglo($sql5),
				'gastos_cosecha' => Database::get_arreglo($sql6),
				'parcela' => Database::get_arreglo($sql7),
				'riego' => Database::get_arreglo($sql8),
				'costo_insumo2' => Database::get_arreglo($sql9)
			);
}


echo json_encode( $respuesta );


?>