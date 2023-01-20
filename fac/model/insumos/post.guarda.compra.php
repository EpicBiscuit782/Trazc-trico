<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); 
include_once("../clases/class.Database.php");

$request = json_decode($_POST['data']);
$request = (array) $request;


$id_productor = $_SESSION['id_user'];
$subtotal    = $request["subtotal"];
$fecha = $request["fecha"];


$db = DataBase::getInstancia();
$mysqli = $db->getConnection();

$detalle = $request["detalle"];
if ($id_productor !="" || $id_productor != 0) {

	try {

		$mysqli->begin_transaction();

			$sql = "INSERT INTO compra(fecha, subtotal, id_productor)
						VALUES (
							'". $request['fecha'] . "',
								$subtotal,
								$id_productor)";

			$id_compra = Database::ejecutar_idu( $sql );

		if(  is_numeric( $id_compra ) ){
            
            if(!empty($_FILES['fileEvi']['name'])){
                $count = count($_FILES['fileEvi']['name']);
                foreach ($_FILES['fileEvi']['name'] as $key => $filename){
                    $newFilename = time() . "_" . $filename;

                    $path = '../../imagenes/' . $newFilename;

                    if(move_uploaded_file($_FILES['fileEvi']['tmp_name'][$key], $path)){
                        $sql = "INSERT INTO imagenes(imagen,tipo,id_tabla,id_registro) VALUES ('$newFilename',3,3,".$id_compra.")";
                        $hecho = Database::ejecutar_idu( $sql );

                        if( is_numeric($hecho) OR $hecho === true ){
                            $respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
                        }else{
                            $respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
                        }
                    }
                }
            }

			// Insertamos los detalles
			for ($i=0; $i < count( $detalle ); $i++) {

				$id_insumo  = $detalle[$i]->id_insumo;
				$precio = $detalle[$i]->precio;
				$cantidad = $detalle[$i]->cantidad;
				$medida = $detalle[$i]->medida;
				$cant_insum = $detalle[$i]->cant_insumos;
				$id_proveedor = $detalle[$i]->id_proveedor;
				$id_responsable = $detalle[$i]->id_responsable;
				$total = $cantidad * $cant_insum; //almacena total de litros


				$sql = "INSERT INTO detalle_compra(id_compra, id_insumo, cantidad, medida, precio, cant_insumos, id_responsable, id_proveedor)
				 			VALUES ($id_compra,$id_insumo,$cantidad,'$medida',$precio,$cant_insum,$id_responsable,$id_proveedor)";

				$id_detalle = Database::ejecutar_idu( $sql );
				
				if ($medida == "MILILITROS") {
					$conver = $cantidad/1000;
					$total = $conver * $cant_insum; //almacena total de litros
					$medida = "LITROS";
				}
				else if ($medida == "GRAMOS") {
					$conver = $cantidad/1000;
					$total = $conver * $cant_insum; //almacena total de litros
					$medida = "KILOGRAMOS";
				}


				if( is_numeric($id_detalle) OR $id_detalle === true ){
					$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
					$sql2 = "SELECT id_inventario FROM inventario where id_insumo = $id_insumo AND id_productor = $id_productor";
					$id_inventario = Database::get_valor_query( $sql2, 'id_inventario' );
					if ($id_inventario > 0) {

						$sql4 = "UPDATE inventario
								SET
									cantidad    =  cantidad + $total,
									precio    =  $precio

								WHERE id_inventario= $id_inventario";

						$hecho = Database::ejecutar_idu( $sql4 );

						if( is_numeric($hecho) OR $hecho === true ){
							$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
						}else{
							$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
							$mysqli->rollback();
						}
					}
					else {

						$sql3 = "INSERT INTO inventario(cantidad, medida, precio, id_insumo, id_productor)
						 			VALUES ($total,'$medida',$precio,$id_insumo,$id_productor)";

						$id_invent = Database::ejecutar_idu( $sql3);
						if( is_numeric($id_invent) OR $id_invent === true ){
							$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
						}else{
							$respuesta = array( 'err'=>true, 'Mensaje'=>$id_invent );
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
		else{
			$respuesta = array( 'err'=>true );
			$mysqli->rollback();
		}

	} catch (Exception $e) {
	$respuesta = array( 'err'=>true );
		$mysqli->rollback();
	}

}
	else {
		$respuesta = array( 'err'=>true );
		$mysqli->rollback();
	}




echo json_encode( $respuesta );



?>