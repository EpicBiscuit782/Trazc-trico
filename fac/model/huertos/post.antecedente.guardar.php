<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");  
include_once("../clases/class.Database.php");

$db = DataBase::getInstancia();
$mysqli = $db->getConnection();

$request = json_decode($_POST['data']);
$request = (array) $request;
print_r($request);

$id_parcela = json_decode($_POST['id_parcela']);

try {
    $mysqli->begin_transaction();
    
    if( isset( $request['id_antecedente'] )  ){  // ACTUALIZAR

        $sql = "UPDATE antecedente
                    SET
                        peligros  = '". $request['peligros'] ."',
                        acciones  = '". $request['acciones'] ."'
                WHERE id_antecedente =" . $request['id_antecedente'];

        $id_ant = Database::ejecutar_idu( $sql );
        
            if(!empty($_FILES['fileCroquis']['name'])){
                $count = count($_FILES['fileCroquis']['name']);
                foreach ($_FILES['fileCroquis']['name'] as $key => $filename){
                    $newFilename = time() . "_" . $filename;

                    $path = '../../imagenes/' . $newFilename;

                    if(move_uploaded_file($_FILES['fileCroquis']['tmp_name'][$key], $path)){
                        $sql = "INSERT INTO imagenes(imagen,tipo,id_tabla,id_registro) VALUES ('$newFilename',0,5,".$request['id_antecedente'].")";
                        $hecho = Database::ejecutar_idu( $sql );

                        if( is_numeric($hecho) OR $hecho === true ){
                            $respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
                        }else{
                            $respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
                            $mysqli->rollback();
                        }
                    }
                }
            }  
            if(!empty($_FILES['fileAnt']['name'])){
                $count = count($_FILES['fileAnt']['name']);
                foreach ($_FILES['fileAnt']['name'] as $key => $filename){
                    $newFilename = time() . "_" . $filename;

                    $path = '../../imagenes/' . $newFilename;

                    if(move_uploaded_file($_FILES['fileAnt']['tmp_name'][$key], $path)){
                        $sql = "INSERT INTO imagenes(imagen,tipo,id_tabla,id_registro) VALUES ('$newFilename',1,5,".$request['id_antecedente'].")";
                        $hecho = Database::ejecutar_idu( $sql );

                        if( is_numeric($hecho) OR $hecho === true ){
                            $respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
                        }else{
                            $respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
                            $mysqli->rollback();
                        }
                    }
                }
            }
            if(!empty($_FILES['fileEvi']['name'])){
                $count = count($_FILES['fileEvi']['name']);
                foreach ($_FILES['fileEvi']['name'] as $key => $filename){
                    $newFilename = time() . "_" . $filename;

                    $path = '../../imagenes/' . $newFilename;

                    if(move_uploaded_file($_FILES['fileEvi']['tmp_name'][$key], $path)){
                        $sql = "INSERT INTO imagenes(imagen,tipo,id_tabla,id_registro) VALUES ('$newFilename',2,5,".$request['id_antecedente'].")";
                        $hecho = Database::ejecutar_idu( $sql );

                        if( is_numeric($hecho) OR $hecho === true ){
                            $respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
                        }else{
                            $respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
                            $mysqli->rollback();
                        }
                    }
                }
            }


        if( is_numeric($id_ant) OR $id_ant === true ){
            $respuesta = array( 'err'=>false, 'Mensaje'=>'Registro actualizado' );
        }else{
            $respuesta = array( 'err'=>true, 'Mensaje'=>$id_ant );
            $mysqli->rollback();
        }
    }else{  // INSERT

        $sql = "INSERT INTO antecedente (id_parcela,acciones,peligros) VALUES
                    ('". $id_parcela . "',
                     '". $request['acciones'] . "',
                     '". $request['peligros'] . "')";

        $id_ant = Database::ejecutar_idu( $sql );

        if( is_numeric($id_ant) OR $id_ant === true ){
            $respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
            
            if(!empty($_FILES['fileCroquis']['name'])){
                $count = count($_FILES['fileCroquis']['name']);
                foreach ($_FILES['fileCroquis']['name'] as $key => $filename){
                    $newFilename = time() . "_" . $filename;

                    $path = '../../imagenes/' . $newFilename;

                    if(move_uploaded_file($_FILES['fileCroquis']['tmp_name'][$key], $path)){
                        $sql = "INSERT INTO imagenes(imagen,tipo,id_tabla,id_registro) VALUES ('$newFilename',0,5,$id_ant)";
                        $hecho = Database::ejecutar_idu( $sql );

                        if( is_numeric($hecho) OR $hecho === true ){
                            $respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
                        }else{
                            $respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
                            $mysqli->rollback();
                        }
                    }
                }
            }            
            
            if(!empty($_FILES['fileAnt']['name'])){
                $count = count($_FILES['fileAnt']['name']);
                foreach ($_FILES['fileAnt']['name'] as $key => $filename){
                    $newFilename = time() . "_" . $filename;

                    $path = '../../imagenes/' . $newFilename;

                    if(move_uploaded_file($_FILES['fileAnt']['tmp_name'][$key], $path)){
                        $sql = "INSERT INTO imagenes(imagen,tipo,id_tabla,id_registro) VALUES ('$newFilename',1,5,$id_ant)";
                        $hecho = Database::ejecutar_idu( $sql );

                        if( is_numeric($hecho) OR $hecho === true ){
                            $respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
                        }else{
                            $respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
                            $mysqli->rollback();
                        }
                    }
                }
            }
            if(!empty($_FILES['fileEvi']['name'])){
                $count = count($_FILES['fileEvi']['name']);
                foreach ($_FILES['fileEvi']['name'] as $key => $filename){
                    $newFilename = time() . "_" . $filename;

                    $path = '../../imagenes/' . $newFilename;

                    if(move_uploaded_file($_FILES['fileEvi']['tmp_name'][$key], $path)){
                        $sql = "INSERT INTO imagenes(imagen,tipo,id_tabla,id_registro) VALUES ('$newFilename',2,5,$id_ant)";
                        $hecho = Database::ejecutar_idu( $sql );

                        if( is_numeric($hecho) OR $hecho === true ){
                            $respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
                        }else{
                            $respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
                            $mysqli->rollback();
                        }
                    }
                }
            }
        }else{
            $respuesta = array( 'err'=>true, 'Mensaje'=>$id_ant );
            $mysqli->rollback();
        }
    }


} catch (Exception $e) {
    $respuesta = array( 'err'=>true );
    $mysqli->rollback();
}
	echo json_encode($respuesta);

?>

