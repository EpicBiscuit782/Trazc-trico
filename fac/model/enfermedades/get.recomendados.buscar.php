<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$parametro = $_GET['id'];


$sql = "SELECT *
        FROM detalle_enfermedad 
        INNER JOIN insumo ON detalle_enfermedad.id_insumo = insumo.id_insumo        
        WHERE detalle_enfermedad.id_enfermedad = '$parametro'";


	$respuesta = array(
				'err' => false,
				'recomendados' => Database::get_arreglo( $sql )
			);

echo json_encode( $respuesta );


?>
