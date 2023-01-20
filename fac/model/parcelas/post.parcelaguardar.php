<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;


$marco = $request['pcl_ancho'] * $request['pcl_largo'];
$arboles = ($request['pcl_hectareas'] * 10000)/($request['pcl_ancho'] * $request['pcl_largo']);

$db = DataBase::getInstancia();
$mysqli = $db->getConnection();

//Sprint_r($request['pcl_fecha_plantacion']);

if( isset( $request['id_parcela'] )  ){  // ACTUALIZAR

	try {

		$mysqli->begin_transaction();

			$sql = "UPDATE parcela
						SET
							pcl_alias    			 = '". strtoupper($request['pcl_alias']) ."',
							pcl_municipio    		 = '". strtoupper($request['pcl_municipio']) ."',
							pcl_localidad    		 = '". strtoupper($request['pcl_localidad']) ."',
							pcl_latitud   			 = '". $request['pcl_latitud'] ."',
							pcl_longitud 			 = '". $request['pcl_longitud'] ."',
							pcl_fecha_plantacion  	 	 = '". $request['pcl_fecha_plantacion'] ."',
							pcl_ancho 	 		 = '". $request['pcl_ancho'] ."',
							pcl_largo 	 		 = '". $request['pcl_largo'] ."',
							pcl_marco_plantacion  	 	 = '". $marco ."',
							pcl_hectareas  	 	 	 = '". $request['pcl_hectareas'] ."',
							pcl_arboles  	 	 	 = '". $arboles ."',
							pcl_primera_cosecha  		 = '". $request['pcl_primera_cosecha'] ."',
							pcl_estado  			 = '". strtoupper($request['pcl_estado']) ."',
							pcl_ejido  			 = '". strtoupper($request['pcl_ejido']) ."',
							id_productor  			 = '". $request['id_productor'] ."',
							id_regimen  			 = '". $request['id_regimen'] ."',
							cod_parcela  			 = '". $request['cod_parcela'] ."'
		
		
					WHERE id_parcela =" . $request['id_parcela'];
		
			$hecho = Database::ejecutar_idu( $sql );
		
		
			if( is_numeric($hecho) OR $hecho === true ){
				$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro actualizado' );
				$mysqli->commit();
			}else{
				$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
				$mysqli->rollback();
			}
		
	} catch (Exception $e) {
		$respuesta = array( 'err'=>true );
		$mysqli->rollback();
	}



}else{  // INSERT

	$id_user = $_SESSION["id_user"];

if ($id_user !="" || $id_user != 0) {

	try {

		$mysqli->begin_transaction();


			$sql = "INSERT INTO parcela(pcl_alias, pcl_municipio, pcl_localidad, pcl_latitud, pcl_longitud, pcl_fecha_plantacion, pcl_ancho,pcl_largo, pcl_marco_plantacion,pcl_hectareas, pcl_arboles, pcl_primera_cosecha, pcl_estado, pcl_ejido, id_productor, id_regimen, cod_parcela) VALUES
						('". strtoupper($request['pcl_alias']) . "',
						'". strtoupper($request['pcl_municipio']) . "',
						'". strtoupper($request['pcl_localidad']) . "',
						'". $request['pcl_latitud'] . "',
						'". $request['pcl_longitud'] . "',
						'". $request['pcl_fecha_plantacion'] . "',
						'". $request['pcl_ancho'] . "',
						'". $request['pcl_largo'] . "',
						'". $marco . "',
						'". $request['pcl_hectareas'] . "',
						'". $arboles . "',
						'". $request['pcl_primera_cosecha'] . "',
						'". strtoupper($request['pcl_estado']) . "',
						'". strtoupper($request['pcl_ejido']) . "',
						'". $id_user . "',
						". $request['id_regimen'] . ",
						'". $request['cod_parcela'] . "')";
		
			$hecho = Database::ejecutar_idu( $sql );
		
			//print_r($sql);
			if( is_numeric($hecho) OR $hecho === true ){
				$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
				$mysqli->commit();
			}else{
				$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
				$mysqli->rollback();
			}
			
	} catch (Exception $e) {
		$respuesta = array( 'err'=>true );
		$mysqli->rollback();
	}
	
	
}else {
	$respuesta = array( 'err'=>true );
}
}



echo json_encode( $respuesta );



?>