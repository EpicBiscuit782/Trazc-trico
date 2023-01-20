<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); include_once("../clases/class.Database.php");

$request = json_decode($_POST['data']);
$request = (array) $request;

$id_parcela = json_decode($_POST['id_parcela']);

$fecha = explode("T", $request['fecha']);


if( isset( $request['id_analisis_suelo'] )  ){  // ACTUALIZAR

	$sql = "UPDATE analisis_suelo
				SET
					fecha    			= '". $fecha[0] ."',
					ph 					  = '". $request['ph'] ."',
					materia_org 	= '". $request['materia_org'] ."',
					nitrogeno     = '". $request['nitrogeno'] ."',
					fosforo 			= '". $request['fosforo'] ."',
					potasio 			= '". $request['potasio'] ."',
					calcio 				= '". $request['calcio'] ."',
					magnesio 			= '". $request['magnesio'] ."',
					sodio 				= '". $request['sodio'] ."',
					cobre 				= '". $request['cobre'] ."',
					fierro 				= '". $request['fierro'] ."',
					manganeso 		= '". $request['manganeso'] ."',
					zinc 					= '". $request['zinc'] ."',
					carbonatos 		= '". $request['carbonatos'] ."',
					arcilla 			= '". $request['arcilla'] ."',
					arena 				= '". $request['arena'] ."',
					limo 				  = '". $request['limo'] ."',
					textura 			= '". strtoupper($request['textura']) ."',
					capacidad 		= '". $request['capacidad'] ."',
					humedad 			= '". $request['humedad'] ."',
					punto 			= '". $request['punto'] ."',
					id_parcela 			= '". $id_parcela ."'

			WHERE id_analisis_suelo =" . $request['id_analisis_suelo'];

	$hecho = Database::ejecutar_idu( $sql );


	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro actualizado' );
            
        if(!empty($_FILES['fileEvi']['name'])){
                $count = count($_FILES['fileEvi']['name']);
                foreach ($_FILES['fileEvi']['name'] as $key => $filename){
                    $newFilename = time() . "_" . $filename;

                    $path = '../../imagenes/' . $newFilename;

                    if(move_uploaded_file($_FILES['fileEvi']['tmp_name'][$key], $path)){
                        $sql = "INSERT INTO imagenes(imagen,tipo,id_tabla,id_registro) VALUES ('$newFilename',2,2,".$request['id_analisis_suelo'].")";
                        $hecho = Database::ejecutar_idu( $sql );

                        if( is_numeric($hecho) OR $hecho === true ){
                            $respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
                        }else{
                            $respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
                        }
                    }
                }
            }
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}



}else{  // INSERT

	$sql = "INSERT INTO analisis_suelo(fecha,ph,materia_org,nitrogeno,fosforo,potasio,calcio,magnesio,sodio,cobre,fierro,manganeso,zinc,carbonatos,arcilla,arena,limo,textura,capacidad,humedad,punto,id_parcela)
			VALUES
				('".  $fecha[0] . "',
				'". $request['ph'] . "',
				'". $request['materia_org'] . "',
				'". $request['nitrogeno'] . "',
				'". $request['fosforo'] . "',
				'". $request['potasio'] . "',
				'". $request['calcio'] . "',
				'". $request['magnesio'] . "',
				'". $request['sodio'] . "',
				'". $request['cobre'] . "',
				'". $request['fierro'] . "',
				'". $request['manganeso'] . "',
				'". $request['zinc'] . "',
				'". $request['carbonatos'] . "',
				'". $request['arcilla'] . "',
				'". $request['arena'] . "',
				'". $request['limo'] . "',
				'". strtoupper($request['textura']) . "',
				'". $request['capacidad'] . "',
				'". $request['humedad'] . "',
				'". $request['punto'] . "',
				'". $id_parcela . "')";

	$hecho = Database::ejecutar_idu( $sql );


	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
            
        if(!empty($_FILES['fileEvi']['name'])){
                $count = count($_FILES['fileEvi']['name']);
                foreach ($_FILES['fileEvi']['name'] as $key => $filename){
                    $newFilename = time() . "_" . $filename;

                    $path = '../../imagenes/' . $newFilename;

                    if(move_uploaded_file($_FILES['fileEvi']['tmp_name'][$key], $path)){
                        $sql = "INSERT INTO imagenes(imagen,tipo,id_tabla,id_registro) VALUES ('$newFilename',2,2,$hecho)";
                        $hecho = Database::ejecutar_idu( $sql );

                        if( is_numeric($hecho) OR $hecho === true ){
                            $respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
                        }else{
                            $respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
                        }
                    }
                }
            }
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}

}
    



echo json_encode( $respuesta );



?>
