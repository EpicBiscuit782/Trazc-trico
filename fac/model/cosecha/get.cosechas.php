<?php
include_once("../clases/class.Database.php");

$id_user = $_SESSION["id_user"];

    	$sql = "SELECT produccion.pdc_fecha, produccion.pdc_kilos, produccion.pdc_rejas, produccion.id_parcela, parcela.pcl_alias, comprador.cmp_nombre
          FROM produccion 
          INNER JOIN parcela ON produccion.id_parcela = parcela.id_parcela
          INNER JOIN venta ON produccion.id_produccion = venta.id_produccion
          INNER JOIN comprador ON venta.id_comprador = comprador.id_comprador
          WHERE parcela.id_productor = '".$id_user."'";

		$respuesta = array(
				'repCosecha' => Database::get_arreglo($sql)
			);


echo json_encode( $respuesta );


?>
