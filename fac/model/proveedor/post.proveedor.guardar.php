<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");  
include_once("../clases/class.Database.php");

$request = json_decode($_POST['data']);
$request = (array) $request;

$id_user = $_SESSION['id_user'];

$db = DataBase::getInstancia();
$mysqli = $db->getConnection();


if( isset( $request['id_proveedor'] )  ){  // ACTUALIZAR

	try {

		$mysqli->begin_transaction();


			$sql = "UPDATE proveedor
						SET
							empresa    = '". strtoupper($request['empresa']) ."',
                            area    = '". strtoupper($request['area']) ."',
							localizacion    = '". strtoupper($request['localizacion']) ."',
							telefono = '". $request['telefono'] ."',
							direccion_elect = '". $request['direccion_elect'] ."',
							certificacion = '". $request['certificacion'] ."'
					WHERE id_proveedor=" . $request['id_proveedor'];
		
			$hecho = Database::ejecutar_idu( $sql );
		
            if(!empty($_FILES['fileEvi']['name'])){
                $count = count($_FILES['fileEvi']['name']);
                foreach ($_FILES['fileEvi']['name'] as $key => $filename){
                    $newFilename = time() . "_" . $filename;

                    $path = '../../imagenes/' . $newFilename;

                    if(move_uploaded_file($_FILES['fileEvi']['tmp_name'][$key], $path)){
                        $sql = "INSERT INTO imagenes(imagen,tipo,id_tabla,id_registro) VALUES ('$newFilename',4,6,".$request['id_proveedor'].")";
                        $hecho = Database::ejecutar_idu( $sql );

                        if( is_numeric($hecho) OR $hecho === true ){
                            $respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
                        }else{
                            $respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
                        }
                    }
                }
            }
		
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

	if ($id_user !="" || $id_user != 0) {

		$sql = "INSERT INTO proveedor(empresa, area, localizacion, telefono, direccion_elect,certificacion,id_productor)
				VALUES ('". strtoupper($request['empresa']) . "',
                    '". strtoupper($request['area']) . "',
					'". strtoupper($request['localizacion']) . "',
					'". $request['telefono'] . "',
					'". $request['direccion_elect'] . "',
					'". $request['certificacion'] . "',
					'". $id_user . "')";
	
		$hecho = Database::ejecutar_idu( $sql );
        
            if(!empty($_FILES['fileEvi']['name'])){
                $count = count($_FILES['fileEvi']['name']);
                foreach ($_FILES['fileEvi']['name'] as $key => $filename){
                    $newFilename = time() . "_" . $filename;

                    $path = '../../imagenes/' . $newFilename;

                    if(move_uploaded_file($_FILES['fileEvi']['tmp_name'][$key], $path)){
                        $sql = "INSERT INTO imagenes(imagen,tipo,id_tabla,id_registro) VALUES ('$newFilename',4,6,".$hecho.")";
                        $hecho = Database::ejecutar_idu( $sql );

                        if( is_numeric($hecho) OR $hecho === true ){
                            $respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
                        }else{
                            $respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
                        }
                    }
                }
            }
	
	
		if( is_numeric($hecho) OR $hecho === true ){
			$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
		}else{
			$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
		}
	}else {
		$respuesta = array( 'err'=>true );
	}

}

echo json_encode( $respuesta );

?>