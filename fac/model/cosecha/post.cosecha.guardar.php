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

		//gastosCosec************************

		$sql = "INSERT INTO gastos(gst_fecha, gst_subtotal, id_parcela)
						VALUES (
						'". $request['fecha'] . "',
						'". $request['subtotal']. "',
						'". $request['id_parcela']. "')";


		$id_gasto = Database::ejecutar_idu( $sql );
		//print_r($id_gasto);

		if(  is_numeric( $id_gasto ) && $cont > 0){
				$cont = 1;
			// Insertamos los detalles
			for ($i=0; $i < count( $detalle ); $i++) {

				$id_ctl_gast  = $detalle[$i]->id_ctl_gasto;
				$precio = $detalle[$i]->dt_precio;

				$sql = "INSERT INTO detalle_gasto( dt_precio, id_ctl_gasto, id_gasto)
								VALUES ($precio,$id_ctl_gast,$id_gasto)";
								$cont += 1;

				$hecho = Database::ejecutar_idu( $sql );

				if( is_numeric($hecho) OR $hecho === true ){
					$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
				}else{
					$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
					$mysqli->rollback();
				}
			}// fin for

			/****************** cosecha *******/
			$sql = "INSERT INTO produccion(pdc_fecha,pdc_kilos,pdc_rejas,id_parcela,id_gasto)
					 VALUES
						( '". $request['fecha'] . "',
						 '". $request['kilos'] .  "',
						 '". $request['rejas'] . "',
						 '". $request['id_parcela'] . "',
						 '". $id_gasto . "'
						)";


			$id_produccion = Database::ejecutar_idu( $sql );

			if (is_numeric( $id_produccion )) {

				$sql = "INSERT INTO venta(vt_fecha, vt_precio_reja, vt_precio_kg, vt_subtotal, id_comprador, id_parcela, id_produccion)
						 VALUES
							( '". $request['fecha'] . "',
									'". $request['rprecio'] ."',
								'". $request['kprecio'] . "',
								'". $request['total'] . "',
								'". $request['id_comprador'] . "',
								'". $request['id_parcela'] . "',
								'". $id_produccion . "'
							)";

							$id_venta = Database::ejecutar_idu( $sql );


							if( is_numeric($id_venta) OR $id_venta === true ){
								$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
							}else{
								$respuesta = array( 'err'=>true, 'Mensaje'=>$id_venta );
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
			$respuesta = array( 'err'=>true, 'Mensaje'=>$id_gasto );
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