<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");  
include_once("../clases/class.Database.php");

$request = json_decode($_POST['data']);
$request = (array) $request;

$id_parcela = json_decode($_POST['id_parcela']);

$fecha = explode("T", $request['fecha']);


if( isset( $request['id_analisis_foliar'] )  ){  // ACTUALIZAR

	$sql = "UPDATE analisis_foliar
				SET
					fecha    			= '". $fecha[0] ."',
					fosforo      	= '". $request['fosforo'] ."',
					p   				  = '". $request['p'] ."',
					potasio				= '". $request['potasio'] ."',
					k 					  = '". $request['k'] ."',
					calcio 				= '". $request['calcio'] ."',
					ca 					  = '". $request['ca'] ."',
					magnesio 		  = '". $request['magnesio'] ."',
					mg 					  = '". $request['mg'] ."',
					hierro 				= '". $request['hierro'] ."',
					cobre 				= '". $request['cobre'] ."',
					manganeso 		= '". $request['manganeso'] ."',
					zinc 					= '". $request['zinc'] ."',
					boro 					= '". $request['boro'] ."',
					sodio 				= '". $request['sodio'] ."',
					id_parcela 				= '". $id_parcela ."'
			WHERE id_analisis_foliar =" . $request['id_analisis_foliar'];

	$hecho = Database::ejecutar_idu( $sql );


	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro actualizado' );
        
        if(!empty($_FILES['fileEvi']['name'])){
                $count = count($_FILES['fileEvi']['name']);
                foreach ($_FILES['fileEvi']['name'] as $key => $filename){
                    $newFilename = time() . "_" . $filename;

                    $path = '../../imagenes/' . $newFilename;

                    if(move_uploaded_file($_FILES['fileEvi']['tmp_name'][$key], $path)){
                        $sql = "INSERT INTO imagenes(imagen,tipo,id_tabla,id_registro) VALUES ('$newFilename',2,1,".$request['id_analisis_foliar'].")";
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

	$sql = "INSERT INTO analisis_foliar(fecha,fosforo,p,potasio,k,calcio,ca,magnesio,mg,hierro,cobre,manganeso,zinc,boro,sodio,id_parcela)
	 			VALUES
	  				('". $fecha[0] . "',
	  				'". $request['fosforo'] . "',
	  				'". $request['p'] . "',
	  				'". $request['potasio'] . "',
	  				'". $request['k'] . "',
	  				'". $request['calcio'] . "',
	  				'". $request['ca'] . "',
	  				'". $request['magnesio'] . "',
	  				'". $request['mg'] . "',
	  				'". $request['hierro'] . "',
	  				'". $request['cobre'] . "',
	  				'". $request['manganeso'] . "',
	  				'". $request['zinc'] . "',
	  				'". $request['boro'] . "',
	  				'". $request['sodio'] . "',
	  				'". $id_parcela ."')";
    
	$id_analisis = Database::ejecutar_idu( $sql );


	if( is_numeric($id_analisis) OR $id_analisis === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
                
        if(!empty($_FILES['fileEvi']['name'])){
                $count = count($_FILES['fileEvi']['name']);
                foreach ($_FILES['fileEvi']['name'] as $key => $filename){
                    $newFilename = time() . "_" . $filename;

                    $path = '../../imagenes/' . $newFilename;

                    if(move_uploaded_file($_FILES['fileEvi']['tmp_name'][$key], $path)){
                        $sql = "INSERT INTO imagenes(imagen,tipo,id_tabla,id_registro) VALUES ('$newFilename',2,1,$id_analisis)";
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
