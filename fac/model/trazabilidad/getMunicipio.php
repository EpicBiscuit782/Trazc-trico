<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");



$id = $_GET['id'];

//print_r($id);


if(is_numeric($id)){

	$sql = "SELECT produccion.id_parcela, parcela.pcl_municipio, Date_format(pdc_fecha,'%d') AS dia, Date_format(pdc_fecha,'%m') AS mes ,
                                                               Date_format(pdc_fecha,'%y') AS year, Date_format(pdc_fecha,'%Y') AS fullyear
          FROM produccion INNER JOIN parcela
          ON produccion.id_parcela = parcela.id_parcela
          WHERE produccion.id_produccion = $id";
//print_r($sql);

	$respuesta = array(
				'err' => false,
				'municipio' => Database::get_row( $sql )
			);


}
else {
	$respuesta = array(
				'err' => true
			);
}

echo json_encode( $respuesta );


?>
