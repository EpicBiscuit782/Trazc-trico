<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");  
include_once("../clases/class.Database.php");

$request = json_decode($_POST['data']);
$request = (array) $request;

$id_parcela = json_decode($_POST['id_parcela']);

$fecha = explode("T", $request['fecha']);

if( isset( $request['id_analisis_agua'] )  ){  // ACTUALIZAR

	$sql = "UPDATE analisis_agua
				SET
					fecha    			= '". $fecha[0] ."',
					fuente   	    = '". $request['fuente'] ."',
					ph		        = '". $request['ph'] ."',
					conductividad = '". $request['conductividad'] ."',
					calcio   			= '". $request['calcio'] ."',
					ca 					  = '". $request['ca'] ."',
					magnesio 			= '". $request['magnesio'] ."',
					mg 					  = '". $request['mg'] ."',
					sodio 				= '". $request['sodio'] ."',
					na 					  = '". $request['na'] ."',
					potasio 			= '". $request['potasio'] ."',
					k 					  = '". $request['k'] ."',
					ras 					= '". $request['ras'] ."',
					psi 					= '". $request['psi'] ."',
					cloruros 			= '". $request['cloruros'] ."',
					ci 					  = '". $request['ci'] ."',
					sulfatos 			= '". $request['sulfatos'] ."',
					so 					  = '". $request['so'] ."',
					carbonatos 		= '". $request['carbonatos'] ."',
					co 					  = '". $request['co'] ."',
					bicarbonatos 	= '". $request['bicarbonatos'] ."',
					hco 					= '". $request['hco'] ."',
					csr 					= '". $request['csr'] ."',
					salpot 				= '". $request['salpot'] ."',
					salefect 			= '". $request['salefect'] ."',
					clasificacion = '". $request['clasificacion'] ."',
					boro 					= '". $request['boro'] ."',
					dureza 				= '". $request['dureza'] ."',
					solidos 			= '". $request['solidos'] ."',
					id_parcela 		= '". $id_parcela ."'

			WHERE id_analisis_agua =" . $request['id_analisis_agua'];

	$hecho = Database::ejecutar_idu( $sql );


	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro actualizado' );
        
        if(!empty($_FILES['fileEvi']['name'])){
                $count = count($_FILES['fileEvi']['name']);
                foreach ($_FILES['fileEvi']['name'] as $key => $filename){
                    $newFilename = time() . "_" . $filename;

                    $path = '../../imagenes/' . $newFilename;

                    if(move_uploaded_file($_FILES['fileEvi']['tmp_name'][$key], $path)){
                        $sql = "INSERT INTO imagenes(imagen,tipo,id_tabla,id_registro) VALUES ('$newFilename',2,0,".$request['id_analisis_agua'].")";
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

	$sql = "INSERT INTO analisis_agua(fecha,fuente,ph,conductividad,calcio,ca,magnesio,mg,sodio,na,potasio,k,ras,psi,cloruros,ci,sulfatos,so,carbonatos,co,bicarbonatos,hco,csr,salpot,salefect,clasificacion,boro,dureza,solidos,id_parcela)
	 			VALUES
	  				('". $fecha[0] . "',
	  				'". $request['fuente'] . "',
	  				'". $request['ph'] . "',
	  				'". $request['conductividad'] . "',
	  				'". $request['calcio'] . "',
	  				'". $request['ca'] . "',
	  				'". $request['magnesio'] . "',
	  				'". $request['mg'] . "',
	  				'". $request['sodio'] . "',
	  				'". $request['na'] . "',
	  				'". $request['potasio'] . "',
	  				'". $request['k'] . "',
	  				'". $request['ras'] . "',
	  				'". $request['psi'] . "',
	  				'". $request['cloruros'] . "',
	  				'". $request['ci'] . "',
	  				'". $request['sulfatos'] . "',
	  				'". $request['so'] . "',
	  				'". $request['carbonatos'] . "',
	  				'". $request['co'] . "',
	  				'". $request['bicarbonatos'] . "',
	  				'". $request['hco'] . "',
	  				'". $request['csr'] . "',
	  				'". $request['salpot'] . "',
	  				'". $request['salefect'] . "',
	  				'". $request['clasificacion'] . "',
	  				'". $request['boro'] . "',
	  				'". $request['dureza'] . "',
	  				'". $request['solidos'] . "',
	  				'". $id_parcela . "')";

	$id_analisis = Database::ejecutar_idu( $sql );

	if( is_numeric($id_analisis) OR $id_analisis === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );
        
            if(!empty($_FILES['fileEvi']['name'])){
                $count = count($_FILES['fileEvi']['name']);
                foreach ($_FILES['fileEvi']['name'] as $key => $filename){
                    $newFilename = time() . "_" . $filename;

                    $path = '../../imagenes/' . $newFilename;

                    if(move_uploaded_file($_FILES['fileEvi']['tmp_name'][$key], $path)){
                        $sql = "INSERT INTO imagenes(imagen,tipo,id_tabla,id_registro) VALUES ('$newFilename',2,0,$id_analisis)";
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
