<?php
session_start();
require_once("../clases/class.Database.php");


$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request =  (array) $request;


$respuesta = array(
				'err' => true,
				'mensaje' => 'Correo/Contraseña incorrectos',
			);


// ================================================
//   Encriptar la contraseña maestra (UNICA VEZ)
// ================================================
// encriptar_usuario();

$correo = addslashes( $request['correo'] );
$pass = addslashes( $request['contrasena'] );

if(  isset( $request['correo'] ) && isset( $request['contrasena'] ) ){ // ACTUALIZAR

	//$user = strtoupper($user);


	// Verificar que el usuario exista ADMIN
	$sqlAdmin = "SELECT count(*) as existe FROM usuarios where usr_email = '$correo'";
	$existeAdm = Database::get_valor_query( $sqlAdmin, 'existe' );

	$sqlClient = "SELECT count(*) as existe FROM productor where pdt_email = '$correo'";
	$existeClient = Database::get_valor_query( $sqlClient, 'existe' );

	//print_r($existeAdm);

	if( $existeAdm == 1 ){

		$sql = "SELECT AES_DECRYPT(usr_password,'GEOVA ES MI PASTOR 23') AS usr_password FROM usuarios where usr_email = '$correo' ";
		$data_pass = Database::get_valor_query( $sql, 'usr_password' );

		//print_r($data_pass);

		$s = "SELECT usr_password  FROM usuarios where usr_email = '$correo'";
		$data_p = Database::get_valor_query( $s, 'usr_password' );


		if( $data_pass == $pass ){
		//if( $iguales ){

			$sqll = "select id_usuario from usuarios where usr_email='".$correo ."' AND usr_password= '$data_p'";
			$id = Database::get_valor_query($sqll,'id_usuario');

			$sql2 = "select usr_nombre_completo from usuarios where usr_email='".$correo ."' AND usr_password= '$data_p'";
			$nom = Database::get_valor_query($sql2,'usr_nombre_completo');


			$respuesta = array(
				'err' => false,
				'mensaje' => 'Login válido',
				'url' => '../fac/',
				'id' => $id,
				'user' => $nom
			);


			$_SESSION['id_user'] = $id;
			$_SESSION['user'] = $nom;
			$_SESSION['email'] = $correo;

			//print_r($_SESSION);

		}


	}
	else if ($existeClient == 1) {

		$sq = "SELECT AES_DECRYPT(pdt_password,'GEOVA ES MI PASTOR 23') AS pdt_password FROM productor where pdt_email = '$correo'";
		$data_pas = Database::get_valor_query( $sq, 'pdt_password' );

		$s = "SELECT pdt_password  FROM productor where pdt_email = '$correo'";
		$data_p = Database::get_valor_query( $s, 'pdt_password' );


		if( $pass = $data_pas ){
		//if( $iguales){

			$sqll2 = "select id_productor from productor where pdt_email='".$correo ."' AND pdt_password='$data_p'";
			$idS = Database::get_valor_query($sqll2,'id_productor');

			$sql21 = "select pdt_nombre_completo from productor where pdt_email='".$correo ."' AND pdt_password= '$data_p' ";
			$nomB = Database::get_valor_query($sql21,'pdt_nombre_completo');

			$respuesta = array(
				'err' => false,
				'mensaje' => 'Login válido',
				'url' => '../fac/',
				'id' => $idS,
				'user' => $nomB
			);


			$_SESSION['id_user'] = $idS;
			$_SESSION['user'] = $nomB;
			$_SESSION['email'] = $correo;

			//print_r($_SESSION);


			// actualizar ultimo acceso
			//$sql = "UPDATE usuarios set ultimoacceso = NOW() where codigo = '$user'";
			//Database::ejecutar_idu($sql);
		}
	}

}


// sleep(1.5);
echo json_encode( $respuesta );








// Esto se puede borrar despues
// ================================================
//   Funcion para Encriptar
// ================================================
// function encriptar_usuario(){

// 	$usuario_id = '1';
// 	$contrasena = '123456';
// 	$contrasena_crypt = Database::crypt( $contrasena );

// 	$sql = "UPDATE usuarios set contrasena = '$contrasena_crypt' where id = '$usuario_id'";
// 	Database::ejecutar_idu($sql);

// }


?>
