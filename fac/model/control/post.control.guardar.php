<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;

$db = DataBase::getInstancia();
$mysqli = $db->getConnection();

	try {


		$mysqli->begin_transaction();



				$sql = "INSERT INTO control (fecha, muestras, individuos, decision, id_enfermedad, id_parcela,id_responsable) VALUES
							('". $request['fecha'] . "',
							 '". $request['muestras'] . "',
							 '". $request['individuos'] . "',
							 '". $request['decision'] . "',
							 '". $request['id_enfermedad'] . "',
							 '". $request['id_parcela'] . "',
							'". $request['id_responsable'] . "')";

				$hecho = Database::ejecutar_idu( $sql );


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






echo json_encode( $respuesta );



?>