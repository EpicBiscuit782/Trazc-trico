<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");



$parametro = $_GET['id'];
$id_user = $_SESSION["id_user"];


if(is_numeric($parametro)){

	$sql = "SELECT produccion.id_produccion, pdc_fecha, produccion.pdc_kilos, produccion.pdc_rejas, venta.vt_precio_reja, venta.vt_precio_kg, venta.vt_subtotal, parcela.pcl_alias, comprador.cmp_nombre, comprador.id_comprador, parcela.id_parcela, produccion.id_gasto, venta.id_venta
            FROM produccion 
            INNER JOIN parcela ON produccion.id_parcela = parcela.id_parcela
    		INNER JOIN venta ON produccion.id_produccion = venta.id_produccion
            INNER JOIN comprador ON venta.id_comprador = comprador.id_comprador
            WHERE parcela.id_productor = '$id_user' and produccion.id_produccion = '$parametro'";

  $sql2 = "SELECT  ctl_gastos.ctl_descripcion, ctl_gastos.id_ctl_gasto, detalle_gasto.dt_precio, detalle_gasto.id_detalle_gasto, produccion.id_gasto
            FROM parcela 
            INNER JOIN produccion ON parcela.id_parcela = produccion.id_parcela
            INNER JOIN gastos ON produccion.id_gasto = gastos.id_gasto
            INNER JOIN detalle_gasto ON gastos.id_gasto = detalle_gasto.id_gasto
        	INNER JOIN ctl_gastos ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
        	INNER JOIN tipo_gasto ON ctl_gastos.id_tipo_gasto = tipo_gasto.id_tipo_gasto
        	WHERE parcela.id_productor = '" .$id_user."' AND tipo_gasto.tpgst_act_descripcion = 'COSECHA' AND produccion.id_produccion = $parametro";

        	//print_r($sql);


	$respuesta = array(
				'err' => false,
				'produccion' => Database::get_row( $sql ),
        'gastos' => Database::get_arreglo($sql2)
			);


}
else {
	$respuesta = array(
				'err' => true,
			);
}

echo json_encode( $respuesta );


?>