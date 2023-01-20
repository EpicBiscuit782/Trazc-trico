<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;
$id_user = $_SESSION['id_user'];

$id_insumo = $request["id_insumo"];
$id_ins=$id_insumo->id_insumo;
$id_nutricion = $request["id_nutricion"];
$cantidad = $request["cantidad"];
$medida = $request["medida"];
$metodo = "NINGUNO";
$cant_planta = 0;
$costo = 0;

$db = DataBase::getInstancia();
$mysqli = $db->getConnection();

if ($id_user !="" || $id_user != 0) {
	
	try {

		$mysqli->begin_transaction();
        
                    
                    $sql5 = "SELECT (precio/cantidad) as precio 
                        FROM detalle_compra 
                        INNER JOIN compra ON detalle_compra.id_compra = compra.id_compra
                        WHERE id_insumo = $id_ins AND id_productor= $id_user                       ORDER BY  compra.fecha DESC
                        LIMIT 1";
				        $precio = Database::get_valor_query( $sql5, 'precio' );
                    
                    $sql6 = "SELECT medida 
                        FROM detalle_compra 
                        INNER JOIN compra ON detalle_compra.id_compra = compra.id_compra
                        WHERE id_insumo = $id_ins AND id_productor= $id_user                       ORDER BY  compra.fecha DESC
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

					if (isset($request["metodo"]) && isset($request["cant_planta"])) {
						$metodo = $request["metodo"];
						$cant_planta = $request["cant_planta"];
					}

					$sql = "INSERT INTO detalle_nutricion(id_nutricion, cantidad, medida, metodo, cant_planta, costo, id_insumo)
							VALUES ($id_nutricion,$cantidad,'$medida','$metodo','$cant_planta','$costo',$id_ins)";

					$id_detalle = Database::ejecutar_idu( $sql );
					
					if ($medida == "MILILITROS") {
						$cantidad = $cantidad/1000;
					}
					else if ($medida == "GRAMOS") {
						$cantidad = $cantidad/1000;
					}

					if( is_numeric($id_detalle) OR $id_detalle === true ){
						$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
						$sql2 = "SELECT id_inventario FROM inventario where id_insumo = $id_ins AND id_productor = $id_user";
						$id_inventario = Database::get_valor_query( $sql2, 'id_inventario' );
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
				$mysqli->commit();

		} catch (Exception $e) {
				$respuesta = array( 'err'=>true);
				$mysqli->rollback();
		}
}
else {
	$respuesta = array( 'err'=>true);
}

echo json_encode( $respuesta );

?>