<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;


$detalle    = $request["detalle"];
$cont = count($detalle);

$db = DataBase::getInstancia();
$mysqli = $db->getConnection();

		try {

		$mysqli->begin_transaction();


		$sql = "UPDATE gastos SET 
                gst_fecha = '". $request['pdc_fecha'] . "', 
                gst_subtotal = '". $request['subtotal']. "', 
                id_parcela = '". $request['id_parcela']. "'
                WHERE id_gasto = '". $request['id_gasto']. "'";


		$hecho = Database::ejecutar_idu( $sql );
        if( is_numeric($hecho) OR $hecho === true ){
            $respuesta = array( 'err'=>false, 'Mensaje'=>'Registro actualizado' );
        }else{
            $respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
            $mysqli->rollback();
        }

		if(is_numeric($hecho) OR $hecho === true && $cont > 0){

			$sql = "UPDATE produccion SET
                    pdc_fecha = '". $request['pdc_fecha'] . "',
                    pdc_kilos = '". $request['pdc_kilos'] . "',
                    pdc_rejas = '". $request['pdc_rejas'] . "',
                    id_parcela = '". $request['id_parcela'] . "'
				    WHERE id_produccion = '". $request['id_produccion'] . "'";


			$hecho = Database::ejecutar_idu( $sql );
            
            if( is_numeric($hecho) OR $hecho === true ){
					$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro actualizado' );
				}else{
					$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
					$mysqli->rollback();
				}

			if (is_numeric($hecho) OR $hecho === true) {

				$sql = "UPDATE venta SET 
                        vt_fecha = '". $request['pdc_fecha'] . "', 
                        vt_precio_reja = '". $request['vt_precio_reja'] . "', 
                        vt_precio_kg = '". $request['vt_precio_kg'] . "', 
                        vt_subtotal = '". $request['total'] . "', 
                        id_comprador = '". $request['id_comprador'] . "', 
                        id_parcela = '". $request['id_parcela'] . "'
                        WHERE id_venta = '". $request['id_venta'] . "'";

							$hecho = Database::ejecutar_idu( $sql );


							if( is_numeric($hecho) OR $hecho === true ){
								$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
							}else{
								$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
								$mysqli->rollback();
							}
				}
				else {
							$respuesta = array( 'err'=>true );
							$mysqli->rollback();
				}

				$mysqli->commit();

		}
		else {
			$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
			$mysqli->rollback();
		}
		// fin gastosCosec ******************************************************



			} catch (Exception $e) {
				$respuesta = array( 'err'=>true );
				$mysqli->rollback();
			}
//}

echo json_encode( $respuesta );



?>