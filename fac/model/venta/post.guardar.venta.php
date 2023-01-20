<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;


	if ($request['tipo'] == "kilos") {
		$kilos = $request['precio'];
		$rejas = 0;
	}else{
		$rejas = $request['precio'];
		$kilos = 0;
	}

//print_r($request);


	$sql2 = "SELECT COUNT(*) as existe FROM produccion";
	$cont = Database::get_valor_query( $sql2, 'existe' );
	//print_r($cont);
	if ($cont == 0) {
		$cont = 1;
	}


	$sql = "INSERT INTO venta(vt_fecha, vt_precio_reja, vt_precio_kg, vt_subtotal, id_comprador, id_parcela, id_produccion)
			 VALUES
				( '". $request['fecha'] . "',
				    '". $rejas ."',
				 	'". $kilos . "',
				 	'". $request['total'] . "',
				 	'". $request['id_comprador'] . "',
				 	'". $request['id_parcela'] . "',
				 	'". $cont . "'
				)";
	//print_r($sql);

	$hecho = Database::ejecutar_idu( $sql );


	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}




echo json_encode( $respuesta );



?>
