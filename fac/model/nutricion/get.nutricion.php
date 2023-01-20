<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


$parametro = $_GET['id'];
$id_user = $_SESSION["id_user"];

if (is_numeric($parametro)) {

$sql = "SELECT nutricion.id_nutricion, fecha, tipo_aplicacion, parcela.pcl_alias
        from nutricion INNER JOIN parcela
        ON nutricion.id_parcela = parcela.id_parcela
		WHERE id_nutricion = '$parametro' AND parcela.id_productor = '$id_user' ";


$respuesta = Database::get_row($sql);


$respuesta = array(
      'err' => false,
      'det' => Database::get_row( $sql )
    );
}
else{
  $respuesta = array(
        'err' => true
      );
}

    	echo json_encode( $respuesta );


?>
