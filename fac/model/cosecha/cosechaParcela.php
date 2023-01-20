<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;


$id = $request['id_parcela'];
$year = $request['year'];

//print_r($request);
$id_user = $_SESSION["id_user"];

if($id==null){
	$sql = "SELECT Date_format(pdc_fecha,'%m') AS mes, SUM(pdc_kilos + (pdc_rejas)*28) AS kilos
          FROM produccion 
          INNER JOIN parcela ON produccion.id_parcela = parcela.id_parcela
          WHERE YEAR(pdc_fecha) = '". $year ."' AND parcela.id_productor = '".$id_user ."'
          GROUP BY 1";

		$respuesta = array(
				'err' => true,
				'repCosecha' => Database::get_arreglo($sql)
			);

}else if($year==null){
    	$sql = "SELECT Date_format(pdc_fecha,'%m') AS mes, Date_format(pdc_fecha,'%Y') AS año, SUM(pdc_kilos + (pdc_rejas)*28) AS kilos
          FROM produccion 
          INNER JOIN parcela ON produccion.id_parcela = parcela.id_parcela
          WHERE produccion.id_parcela = '". $id ."' AND parcela.id_productor = '".$id_user ."'
          GROUP BY 1";

		$respuesta = array(
				'err' => true,
				'repCosecha' => Database::get_arreglo($sql)
			);
}else{
        $sql = "SELECT Date_format(pdc_fecha,'%m') AS mes, SUM(pdc_kilos + (pdc_rejas)*28) AS kilos
          FROM produccion 
          INNER JOIN parcela ON produccion.id_parcela = parcela.id_parcela
          WHERE YEAR(pdc_fecha) = '". $year ."' AND produccion.id_parcela = '". $id ."' AND parcela.id_productor = '".$id_user ."'
          GROUP BY 1";

		$respuesta = array(
				'err' => true,
				'repCosecha' => Database::get_arreglo($sql)
			);
}

echo json_encode( $respuesta );


?>
