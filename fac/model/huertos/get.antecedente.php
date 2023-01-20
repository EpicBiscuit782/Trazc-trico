<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$parametro = $_GET['id'];
$id_user = $_SESSION['id_user'];


if(is_numeric($parametro)){

	$sql = "SELECT id_antecedente, peligros, acciones
					FROM antecedente 
                    INNER JOIN parcela ON antecedente.id_parcela = parcela.id_parcela
					WHERE parcela.id_parcela = '$parametro' AND parcela.id_productor = '$id_user' ";

	$respuesta = array(
				'err' => false,
				'ant' => Database::get_row( $sql )
			);

}
else {
	$respuesta = array(
				'err' => true
			);
}

echo json_encode( $respuesta );


?>
