<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");



$parametro = $_GET['id'];


if(is_numeric($parametro)){

	$sql = "SELECT enfermedad.id_enfermedad, enfermedad.enfermedad
			FROM enfermedad INNER JOIN tipo_enfermedad
			ON enfermedad.id_tipo_enfermedad = tipo_enfermedad.id_tipo_enfermedad
			WHERE tipo_enfermedad.id_tipo_enfermedad = '$parametro'";
	//print_r($sql);

	$respuesta = array(
				'err' => false,
				'tipos' => Database::get_arreglo( $sql )
			);


}
else {
	$respuesta = array(
				'err' => true
			);
}

echo json_encode( $respuesta );


?>
