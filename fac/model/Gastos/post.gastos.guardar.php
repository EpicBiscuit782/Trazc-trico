<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;

$subtotal      = $request["subtotal"];
$id_parcela  = $request["id_parcela"];
$fecha = $request["fecha"];


$detalle    = $request["detalle"];
$cont = count($detalle);

$db = DataBase::getInstancia();
$mysqli = $db->getConnection();

try {


	$mysqli->begin_transaction();

			$sql = "INSERT INTO gastos(gst_fecha, gst_subtotal, id_parcela)
						VALUES (
							'". $request['fecha'] . "',
							$subtotal,
							$id_parcela)";
			
			$id_gasto = Database::ejecutar_idu( $sql );
			
			if(  is_numeric( $id_gasto ) && $cont > 0){
					
				for ($i=0; $i < count( $detalle ); $i++) {
			
					$id_ctl_gast  = $detalle[$i]->id_ctl_gasto;
					$precio = $detalle[$i]->dt_precio;
                    $id_tipo_insumo = $detalle[$i]->id_tipo_insumo;
                    $id_ctl_gasto = $detalle[$i]->id_ctl_gasto;
			
                    if($id_ctl_gasto == 11){
                        
                        $sql = "INSERT INTO detalle_gasto(dt_precio, id_ctl_gasto, id_gasto, id_tipo_insumo,aplicacion)
					 			VALUES ($precio,$id_ctl_gast,$id_gasto,$id_tipo_insumo,1)";
                    }else{
                        $sql = "INSERT INTO detalle_gasto(dt_precio, id_ctl_gasto, id_gasto)
					 			VALUES ($precio,$id_ctl_gast,$id_gasto)";
                    }

					
					$hecho = Database::ejecutar_idu( $sql );
			
					if( is_numeric($hecho) OR $hecho === true ){
						$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
					}else{
						$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
						$mysqli->rollback();
					}
					
				}
				
				$mysqli->commit();
			}
			else {
				$respuesta = array( 'err'=>true );
				$mysqli->rollback();
			}
			
		
	} catch (Exception $e) {
	$mysqli->rollback();
}


echo json_encode( $respuesta );











?>