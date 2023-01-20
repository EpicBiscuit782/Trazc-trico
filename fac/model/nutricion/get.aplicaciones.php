<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$id_user = $_SESSION["id_user"];


$sql = "SELECT nutricion.id_nutricion, fecha, tipo_aplicacion, parcela.pcl_alias, insumo.nombre_com, detalle_nutricion.cantidad, detalle_nutricion.medida
        from nutricion 
        INNER JOIN parcela ON nutricion.id_parcela = parcela.id_parcela
        INNER JOIN detalle_nutricion ON nutricion.id_nutricion = detalle_nutricion.id_nutricion
        INNER JOIN insumo ON detalle_nutricion.id_insumo = insumo.id_insumo
		WHERE parcela.id_productor = '$id_user' ";

	$respuesta = array(
				'err' => false,
				'aplicaciones' => Database::get_arreglo( $sql )
			);


    	echo json_encode( $respuesta );


?>
