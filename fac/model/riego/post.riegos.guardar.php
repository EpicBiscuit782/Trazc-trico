<?php
//session_start();
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;


$id_productor = $_SESSION['id_user'];
$total    = $request["total"];
$fecha = $request["fecha"];
$detalle    = $request["detalle"];
$cont = count($detalle);


$db = DataBase::getInstancia();
$mysqli = $db->getConnection();

if ($id_productor !="" || $id_productor != 0) {

	try {

		$mysqli->begin_transaction();

				$sql = "INSERT INTO riego(fecha, total, id_productor)
					VALUES (
						'". $request['fecha'] . "',
						$total,
						$id_productor)";

				$id_riego = Database::ejecutar_idu( $sql );

					//print_r($id_riego);
				if(  is_numeric( $id_riego ) && $cont > 0 ){
					// Insertamos los detalles
					for ($i=0; $i < count( $detalle ); $i++) {

						$id_parcela  = $detalle[$i]->id_parcela;
						$observacion = "NINGUNA";
						$cantidad = $detalle[$i]->cantidad;
						$tipo = $detalle[$i]->tipo_riego;
						$costo = $detalle[$i]->costo;
						
						if (isset($detalle[$i]->observacion) ) {
							$observacion = $detalle[$i]->observacion;
						}
										
						$sql = "INSERT INTO detalle_riego(id_riego, cantidad, observacion, tipo, costo, id_parcela)
								VALUES ($id_riego,$cantidad,'$observacion','$tipo',$costo,$id_parcela)";

						$hecho = Database::ejecutar_idu( $sql );
						if( is_numeric($hecho) OR $hecho === true ){
							$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
						}else{
							$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
							$mysqli->rollback();
										}
					}//FIN FOR

					$mysqli->commit();

				}
				else {
					$respuesta = array( 'err'=>true);
					$mysqli->rollback();
				}
			} catch (Exception $e) {
						$mysqli->rollback();
			}
	}
	else {
		$respuesta = array( 'err'=>true);
	}




echo json_encode( $respuesta );




?>