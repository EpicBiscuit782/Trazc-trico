<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;
$id_user = $_SESSION['id_user'];

//print_r($request);

$id_parcela   = $request["id_parcela"];
$detalle    = $request["detalle"];
$cont = count($detalle);

$db = DataBase::getInstancia();
$mysqli = $db->getConnection();

if ($id_user !="" || $id_user != 0) {
	
	try {

		$mysqli->begin_transaction();

			$sqli = "INSERT INTO nutricion(fecha, tipo_aplicacion, id_parcela)
					VALUES (
						'". $request['fecha'] . "',
						'". $request['tipo'] . "',
						$id_parcela)";

			$id_nutricion = Database::ejecutar_idu( $sqli );


			if(  is_numeric( $id_nutricion ) && $cont > 0 ){
			// Insertamos los detalles
				for ($i=0; $i < count( $detalle ); $i++) {

					$id_insumo = $detalle[$i]->id_insumo;
					$cantidad = $detalle[$i]->cantidad;
					$medida = $detalle[$i]->medida;
					$metodo = "NINGUNO";
					$cant_planta = 0;
                    
                    $sql5 = "SELECT (precio/cantidad) as precio 
                        FROM detalle_compra 
                        INNER JOIN compra ON detalle_compra.id_compra = compra.id_compra
                        WHERE id_insumo = $id_insumo AND id_productor= $id_user                       ORDER BY  compra.fecha DESC
                        LIMIT 1";
				        $precio = Database::get_valor_query( $sql5, 'precio' );
                    
                    $sql6 = "SELECT medida 
                        FROM detalle_compra 
                        INNER JOIN compra ON detalle_compra.id_compra = compra.id_compra
                        WHERE id_insumo = $id_insumo AND id_productor= $id_user                       ORDER BY  compra.fecha DESC
                        LIMIT 1";
				        $med = Database::get_valor_query( $sql6, 'medida' );
                        $dosis=$cantidad;
                        if ($med == $medida) {
							$costo = $precio*$dosis;
						}
						else if ($medida == "LITROS" && $med == "MILILITROS") {
							$dosis = $dosis*1000;
                            $costo = $precio*$dosis;
						}
                        else if ($medida == "MILILITROS" && $med == "LITROS") {
							$dosis = $dosis/1000;
                            $costo = $precio*$dosis;
						}
						else if ($medida == "KILOGRAMOS" && $med == "GRAMOS") {
							$dosis = $dosis*1000;
                            $costo = $precio*$dosis;
						}
                        else if ($medida == "GRAMOS" && $med == "KILOGRAMOS") {
							$dosis = $dosis/1000;
                            $costo = $precio*$dosis;
						}

					if (isset($detalle[$i]->metodo) && isset($detalle[$i]->cant_planta)) {
						$metodo = $detalle[$i]->metodo;
						$cant_planta = $detalle[$i]->cant_planta;
					}

					$sql = "INSERT INTO detalle_nutricion(id_nutricion, cantidad, medida, metodo, cant_planta, costo, id_insumo)
							VALUES ($id_nutricion,$cantidad,'$medida','$metodo','$cant_planta','$costo',$id_insumo)";

					$id_detalle = Database::ejecutar_idu( $sql );
					
					if ($medida == "MILILITROS") {
						$cantidad = $cantidad/1000;
					}
					else if ($medida == "GRAMOS") {
						$cantidad = $cantidad/1000;
					}

					if( is_numeric($id_detalle) OR $id_detalle === true ){
						$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
						$sql2 = "SELECT id_inventario FROM inventario where id_insumo = $id_insumo AND id_productor= $id_user";
										//$id_inventario = Database::get_json_row( $sql2);
						$id_inventario = Database::get_valor_query( $sql2, 'id_inventario' );
										//print_r($id_inventario);
							if ($id_inventario > 0) {

								$sql4 = "UPDATE inventario
									    SET
										cantidad    =  cantidad - $cantidad
										WHERE id_inventario=" . $id_inventario;

								$hecho = Database::ejecutar_idu( $sql4 );
								if( is_numeric($hecho) OR $hecho === true ){
									$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
								}else{
									$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
									$mysqli->rollback();
								}
							}

					}else{
						$respuesta = array( 'err'=>true, 'Mensaje'=>$id_detalle );
						$mysqli->rollback();
					}

				}//fin for

				$mysqli->commit();

			}// fin if 2
			else {
				$respuesta = array( 'err'=>true);
				$mysqli->rollback();
							}
		} catch (Exception $e) {
				$respuesta = array( 'err'=>true);
				$mysqli->rollback();
		}
}// fin if 1
else {
	$respuesta = array( 'err'=>true);
}



	




echo json_encode( $respuesta );



?>