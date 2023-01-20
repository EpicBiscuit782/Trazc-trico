<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");




$parametro = $_GET['id'];
$id_user = $_SESSION["id_user"];

if(is_numeric($parametro)){

	$sql = "SELECT id_analisis_suelo,fecha,ph,materia_org,nitrogeno,fosforo,potasio,calcio,magnesio,sodio,cobre,fierro,manganeso,zinc,carbonatos,arcilla,arena,limo,textura,capacidad,humedad,punto,analisis_suelo.id_parcela, parcela.pcl_alias	FROM analisis_suelo
					INNER JOIN parcela ON analisis_suelo.id_parcela = parcela.id_parcela
			    WHERE id_analisis_suelo = '$parametro' AND parcela.id_productor = '$id_user'";

	$respuesta = array(
				'err' => false,
				'analisis_suelo' => Database::get_row( $sql )
			);

}
else {
	$respuesta = array(
				'err' => true
			);
}

echo json_encode( $respuesta );


?>
