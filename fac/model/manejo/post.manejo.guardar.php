<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;

$detalle    = $request["detalle"];
$id_user = $_SESSION['id_user'];
$cont = count($detalle);
//print_r($request);
	
	$db = DataBase::getInstancia();
$mysqli = $db->getConnection();



if ($id_user !="" || $id_user != 0) {

	try {


		$mysqli->begin_transaction();

				$sql = "INSERT INTO manejo (fecha, inicio, fin, siguiente, id_enfermedad, id_responsable, id_parcela) VALUES
							('". $request['fecha'] . "',
							 '". $request['inicio'] . "',
							 '". $request['fin'] . "',
							 '". $request['siguiente'] . "',
							 '". $request['id_enfermedad'] . "',
							 '". $request['id_responsable'] . "',
							'". $request['id_parcela'] . "')";

				$id_manejo = Database::ejecutar_idu( $sql );

				if(  is_numeric( $id_manejo ) && $cont > 0){

					// Insertamos los detalles
					for ($i=0; $i < count( $detalle ); $i++) {

						$metodo = $detalle[$i]->metodo;
						$medida = $detalle[$i]->medida;
						$dosis = $detalle[$i]->dosis;
						$agua = $detalle[$i]->agua;
						$f_aplicacion = $request['fecha_aplicacion'];
						$id_insumo = $detalle[$i]->id_insumo;
                        

				        $sql3 = "SELECT (precio/cantidad) as precio 
                        FROM detalle_compra 
                        INNER JOIN compra ON detalle_compra.id_compra = compra.id_compra
                        WHERE id_insumo = $id_insumo AND id_productor= $id_user                       ORDER BY  compra.fecha DESC
                        LIMIT 1";
				        $precio = Database::get_valor_query( $sql3, 'precio' );
                        
                        $sql4 = "SELECT medida 
                        FROM detalle_compra 
                        INNER JOIN compra ON detalle_compra.id_compra = compra.id_compra
                        WHERE id_insumo = $id_insumo AND id_productor= $id_user                       ORDER BY  compra.fecha DESC
                        LIMIT 1";
				        $med = Database::get_valor_query( $sql4, 'medida' );
                        $dos=$dosis;
                        if ($med == $medida) {
							$costo = $precio*$dosis;
						}
						else if ($medida == "LITROS" && $med == "MILILITROS") {
							$dos = $dosis*1000;
                            $costo = $precio*$dos;
						}
                        else if ($medida == "MILILITROS" && $med == "LITROS") {
							$dos = $dosis/1000;
                            $costo = $precio*$dos;
						}
						else if ($medida == "KILOGRAMOS" && $med == "GRAMOS") {
							$dos = $dosis*1000;
                            $costo = $precio*$dos;
						}
                        else if ($medida == "GRAMOS" && $med == "KILOGRAMOS") {
							$dos = $dosis/1000;
                            $costo = $precio*$dos;
						}

						$sql = "INSERT INTO detalle_manejo(id_manejo, metodo, medida, dosis, agua, fecha_aplicacion, costo, id_insumo) VALUES ('$id_manejo','$metodo','$medida','$dosis','$agua','$f_aplicacion','$costo','$id_insumo')";

						$id_detalle = Database::ejecutar_idu( $sql );
						
						if ($medida == "MILILITROS") {
							$dosis = $dosis/1000;
						}
						else if ($medida == "GRAMOS") {
							$dosis = $dosis/1000;
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
											cantidad    =  cantidad - $dosis

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

					}// fin for
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
    } // fin if 1
else {
	$respuesta = array( 'err'=>true);
}

echo json_encode( $respuesta );



?>