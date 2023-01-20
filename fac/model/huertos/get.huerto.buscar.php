<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$parametro = $_GET['id'];
$id_user = $_SESSION['id_user'];

//print_r($parametro);

if(is_numeric($parametro)){

	$sql = "SELECT id_huerto, fecha, huerto.id_parcela, tipo_riego, id_variedad, id_portainjerto, parcela.pcl_alias, id_origen, id_responsable, cultivo
					FROM huerto INNER JOIN parcela
					ON huerto.id_parcela = parcela.id_parcela
					WHERE id_huerto = '$parametro' AND parcela.id_productor = '$id_user' ";

	$respuesta = array(
				'err' => false,
				'huerto' => Database::get_row( $sql )
			);


}
else {
	$respuesta = array(
				'err' => true
			);
}

echo json_encode( $respuesta );


?>
