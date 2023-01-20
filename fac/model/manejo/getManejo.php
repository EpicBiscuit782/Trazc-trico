<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");



$parametro = $_GET['id'];
$id_user = $_SESSION["id_user"];

if (is_numeric($parametro)) {


$sql = "SELECT fecha, parcela.pcl_alias, enfermedad.enfermedad,  inicio, fin, siguiente, responsable.nombre
        FROM manejo INNER JOIN parcela
        ON manejo.id_parcela = parcela.id_parcela
        INNER JOIN enfermedad ON manejo.id_enfermedad = enfermedad.id_enfermedad
        INNER JOIN responsable ON manejo.id_responsable = responsable.id_responsable
        WHERE manejo.id_manejo = '$parametro' AND parcela.id_productor = '$id_user' ";


$sql2 = "SELECT detalle_manejo.metodo, detalle_manejo.dosis, detalle_manejo.medida, detalle_manejo.agua, insumo.nombre_com
         FROM parcela INNER JOIN manejo
         ON parcela.id_parcela = manejo.id_parcela
         INNER JOIN detalle_manejo
         ON manejo.id_manejo = detalle_manejo.id_manejo
         INNER JOIN insumo ON detalle_manejo.id_insumo = insumo.id_insumo
         WHERE manejo.id_manejo = '$parametro' AND parcela.id_productor = '$id_user' ";


$respuesta = array(
      'err' => false,
      'manejo' => Database::get_row( $sql ),
      'detalle' => Database::get_arreglo( $sql2 )
    );
}
else{
  $respuesta = array(
        'err' => true
      );
}

    	echo json_encode( $respuesta );

?>
