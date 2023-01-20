<?php
// ======================================================
// Clase: class.Database.php

// ======================================================

//session_start();
//print_r($_SESSION );
if(!isset($_SESSION)){ session_start(); }

class Database{

	
	private $_connection;
	private $_host = "localhost";
	private $_user = "root";
	private $_pass = "";
	private $_db   = "coeplim";


	// Almacenar una unica instancia
	private static $_instancia;

	//===========-._.-EpicBuiscuit782=================== here
	Public static function get_pcc( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

			// $n= $_SESSION["id_user"];

		$sql = "SELECT count(*) as cuantos from $tabla";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}


		$sql = "SELECT id_pcc, etiquetappc, etapa, limite, vigilancia, medidas, registros
						FROM pcc
				    limit $desde, $por_pagina";

		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina+1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;

	}
	
	Public static function get_Etapas( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();


		$n= $_SESSION["id_user"];

		$sql = "SELECT count(*) as cuantos from tipo_etapa";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}


		$sql = "SELECT tpeta_act_descripcion
				FROM tipo_etapa DESC limit $desde, $por_pagina";


		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina+1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;

	}

	Public static function get_PP( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();


		$n= $_SESSION["id_user"];

		$sql = "SELECT count(*) as cuantos from pp";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}


		$sql = "SELECT nombre_pp
				FROM pp DESC limit $desde, $por_pagina";


		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina+1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;

	}
	
	//==================================================


	// ================================================
	// Metodo para obtener instancia de base de datos
	// ================================================
	public static function getInstancia(){

		if(!isset(self::$_instancia)){
			self::$_instancia = new self;
		}


		return self::$_instancia;
	}

	// ================================================
	// Constructor de la clase Base de datos
	// ================================================

	//aqui :v
	public function __construct(){
		$this->_connection = new mysqli($this->_host,$this->_user,$this->_pass,$this->_db);

		// Manejar error en base de datos
		if (mysqli_connect_error()) {
			trigger_error('Falla en la conexion de base de datos'. mysqli_connect_error(), E_USER_ERROR );
		}
	}

	// Metodo vacio __close para evitar duplicacion
	private function __close(){}

	// Metodo para obtener la conexion a la base de datos
	public function getConnection(){
		$this->_connection->set_charset("utf8");
		return $this->_connection;
	}

	// Metodo que revisa el String SQL
	private static function es_string($sql){
		if (!is_string($sql)) {
			trigger_error('class.Database.inc: $SQL enviado no es un string: ' .$sql);
			return false;
		}
		return true;
	}

	// ==================================================
	// 	Funcion que ejecuta el SQL y retorna un ROW
	// 		Esta funcion esta pensada para SQLs,
	// 		que retornen unicamente UNA sola línea
	// ==================================================
	public static function get_row($sql){

		if(!self::es_string($sql))
			exit();

		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();
		$resultado = $mysqli->query($sql);

		if($row = $resultado->fetch_assoc()){
			return $row;
		}else{
			return array();
		}
	}

	// ==================================================
	// 	Funcion que ejecuta el SQL y retorna un CURSOR
	// 		Esta funcion esta pensada para SQLs,
	// 		que retornen multiples lineas (1 o varias)
	// ==================================================
	public static function get_cursor($sql){

		if(!self::es_string($sql))
			exit();


		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

		$resultado = $mysqli->query($sql);
		return $resultado; // Este resultado se puede usar así:  while ($row = $resultado->fetch_assoc()){...}
	}

	// ==================================================
	// 	Funcion que ejecuta el SQL y retorna un jSon
	// 	data: [{...}] con N cantidad de registros
	// ==================================================
	public static function get_json_rows($sql){

		if(!self::es_string($sql))
			exit();

		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();


		$resultado = $mysqli->query($sql);


		// Si hay un error en el SQL, este es el error de MySQL
		if (!$resultado ) {
		    return "class.Database.class: error ". $mysqli->error;
		}

		$i = 0;
		$registros = array();

		while($row = $resultado->fetch_assoc()){
			array_push( $registros, $row );
			// $registros[$i]= $row;
			// $i++;
		};
		return json_encode( $registros );
	}


	// ==================================================
	// 	Funcion que ejecuta el SQL y retorna un Arreglo
	// ==================================================
	public static function get_arreglo($sql){

		if(!self::es_string($sql))
			exit();

		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

$mysqli->query("SET lc_time_names = 'es_MX'");
		$resultado = $mysqli->query($sql);


		// Si hay un error en el SQL, este es el error de MySQL
		if (!$resultado ) {
		    return "class.Database.class: error ". $mysqli->error;
		}

		$i = 0;
		$registros = array();

		while($row = $resultado->fetch_assoc()){
			array_push( $registros, $row );
		};
		return $registros;
	}



	// ==================================================
	// 	Funcion que ejecuta el SQL y retorna un jSon
	// 	de una sola linea. Ideal para imprimir un
	// 	Query que solo retorne una linea
	// ==================================================
	public static function get_json_row($sql){

		if(!self::es_string($sql))
			exit();

		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

		$resultado = $mysqli->query($sql);

		// Si hay un error en el SQL, este es el error de MySQL
		if (!$resultado ) {
		    return "class.Database.class: error ". $mysqli->error;
		}


		if(!$row = $resultado->fetch_assoc()){
			return "{}";
		}
		return json_encode( $row );
	}

	// ====================================================================
	// 	Funcion que ejecuta el SQL y retorna un valor
	// 	Ideal para count(*), Sum, cosas que retornen una fila y una columna
	// ====================================================================
	public static function get_valor_query($sql,$columna){

		if(!self::es_string($sql,$columna))
			exit();

		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

		$resultado = $mysqli->query($sql);

		// Si hay un error en el SQL, este es el error de MySQL
		if (!$resultado ) {
		    return "class.Database.class: error ". $mysqli->error;
		}

		$Valor = NULL;
		//Trae el primer valor del arreglo
        if ($row = $resultado->fetch_assoc()) {
            // $Valor = array_values($row)[0];
            $Valor = $row[$columna];
        }

        return $Valor;
	}

	// ====================================================================
	// 	Funcion que ejecuta el SQL de inserción, actualización y eliminación
	// ====================================================================
	public static function ejecutar_idu($sql){

		if(!self::es_string($sql))
			exit();

		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

		//try{
			//	$mysqli->begin_transaction();

				$resultado = $mysqli->query($sql);

				//$mysqli->commit();



		if (!$resultado ) {
		    return "class.Database.class: error ". $mysqli->error;
		}else{
			return $mysqli->insert_id;
		}

        return $resultado;

			//}catch(Exception $e){
				//$mysqli->rollback();
		  //}
	}



    // ================================================
	//   Funcion que pagina cualquier TABLA
	// ================================================
	Public static function get_todo_paginado( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

		$sql = "SELECT count(*) as cuantos from $tabla";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}


		$sql = "SELECT * from $tabla limit $desde, $por_pagina";

		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina + 1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;

	}


	 // ================================================
	//   Funcion que pagina cualquier TABLA tipo gasto Again
	// ================================================
	Public static function get_todo_paginados( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

		$sql = "SELECT count(*) as cuantos from $tabla";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}

		$n=$_SESSION["id_user"];

		$sql = "SELECT * from $tabla INNER JOIN tipo_gasto ON ctl_gastos.id_tipo_gasto = tipo_gasto.id_tipo_gasto  limit $desde, $por_pagina";

		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina+1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;

	}

	Public static function get_noticias( $tabla, $pagina = 1, $por_pagina = 6 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

		$sql = "SELECT count(*) as cuantos from $tabla";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}


		$sql = "SELECT * from $tabla ORDER BY fecha DESC limit $desde, $por_pagina";

		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina + 1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;

	}

Public static function get_parcelas( $tabla ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

		$id = $_SESSION["id_user"];
		$correo = $_SESSION["email"];

		$sql2 = "SELECT count(*) as existe FROM productor where pdt_email = '$correo'  AND id_productor= '$id' ";
		$parcela = Database::get_valor_query( $sql2, 'existe' );


		if ($parcela > 0) {
			$sql = "SELECT * FROM parcela where id_productor = '$id' ";
			$datos = Database::get_arreglo( $sql );
			$resultado = $mysqli->query($sql);


			$respuesta = array(

				$tabla => $datos,

				);
		}
		else{
			$respuesta = array(
				'err' => true,
				'msg' => "Parcelas no registradas"
			);
		}



		return  $respuesta;

	}

	Public static function getParcelas( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

			$n = $_SESSION["id_user"];

		$sql = "SELECT count(*) as cuantos from $tabla where id_productor = '$n'";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}


		$sql = "SELECT *	FROM parcela
				WHERE id_productor = '$n' limit $desde, $por_pagina";

		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina+1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;

	}

	Public static function getAdministradores( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

			$n= $_SESSION["id_user"];

		$sql = "SELECT count(*) as cuantos from $tabla";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}


		$sql = "SELECT id_usuario, usr_nombre_completo, usr_email
                FROM usuarios
                WHERE rol = 1
				limit $desde, $por_pagina";

		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina+1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;

	}
    
    Public static function getMiembros( $tabla, $pagina = 1, $por_pagina = 20 ){

		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

			$n= $_SESSION["id_user"];

		$sql = "SELECT count(*) as cuantos from $tabla";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}


		$sql = "SELECT id_usuario, usr_nombre_completo, usr_email
				FROM usuarios
                WHERE rol = 2
				limit $desde, $por_pagina";

		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina+1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;

	}

	Public static function get_Productores( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

			$n= $_SESSION["id_user"];

		$sql = "SELECT count(*) as cuantos from $tabla";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}


		$sql = "SELECT id_productor, pdt_nombre_completo, pdt_curp, pdt_rfc, pdt_domicilio_completo, pdt_telefono, pdt_email, pdt_activo
						FROM productor
				    limit $desde, $por_pagina";

		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina+1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;

	}

	Public static function get_compras( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

			$n = $_SESSION["id_user"];

		$sql = "SELECT count(*) as cuantos from $tabla where id_productor = '$n'";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}


		$sql = "SELECT *	FROM compra
				WHERE id_productor = '$n'  ORDER BY fecha DESC
				limit $desde, $por_pagina";

		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina+1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;

	}

	Public static function get_proveedores( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

			$n = $_SESSION["id_user"];

		$sql = "SELECT count(*) as cuantos from $tabla where id_productor = '$n'";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}


		$sql = "SELECT *	FROM proveedor
				WHERE id_productor = '$n' limit $desde, $por_pagina";

		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina+1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;

	}


	Public static function get_analisis_suelo( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

			$n = $_SESSION["id_user"];

		$sql = "SELECT count(*) as cuantos from $tabla INNER JOIN parcela ON analisis_suelo.id_parcela = parcela.id_parcela where parcela.id_productor = '$n'";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}


		$sql = "SELECT id_analisis_suelo,fecha,ph,nitrogeno,fosforo,potasio,calcio,magnesio,sodio, parcela.pcl_alias	FROM analisis_suelo
						INNER JOIN parcela ON analisis_suelo.id_parcela = parcela.id_parcela
						WHERE parcela.id_productor = '$n' ORDER BY analisis_suelo.fecha DESC limit $desde, $por_pagina";

		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina+1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;

	}
    
    Public static function get_analisis_suelo_All( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

		$sql = "SELECT count(*) as cuantos from $tabla INNER JOIN parcela ON analisis_suelo.id_parcela = parcela.id_parcela";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}


		$sql = "SELECT id_analisis_suelo,fecha,ph,nitrogeno,fosforo,potasio,calcio,magnesio,sodio, parcela.pcl_alias	
            FROM analisis_suelo
            INNER JOIN parcela ON analisis_suelo.id_parcela = parcela.id_parcela
            ORDER BY analisis_suelo.fecha DESC limit $desde, $por_pagina";

		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina+1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;

	}

	Public static function get_analisis_foliar( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

		$n= $_SESSION["id_user"];

		$sql = "SELECT count(*) as cuantos from $tabla INNER JOIN parcela ON analisis_foliar.id_parcela = parcela.id_parcela where parcela.id_productor = '$n' ";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}



		$sql = "SELECT id_analisis_foliar,fecha, fosforo,potasio,calcio,magnesio, parcela.pcl_alias	FROM analisis_foliar
						INNER JOIN parcela ON analisis_foliar.id_parcela = parcela.id_parcela
						WHERE parcela.id_productor = '$n' ORDER BY analisis_foliar.fecha DESC limit $desde, $por_pagina";

		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina+1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;

	}
    
    Public static function get_analisis_foliar_All( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();


		$sql = "SELECT count(*) as cuantos from $tabla INNER JOIN parcela ON analisis_foliar.id_parcela = parcela.id_parcela ";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}



		$sql = "SELECT id_analisis_foliar,fecha, fosforo,potasio,calcio,magnesio, parcela.pcl_alias	FROM analisis_foliar
						INNER JOIN parcela ON analisis_foliar.id_parcela = parcela.id_parcela
						ORDER BY analisis_foliar.fecha DESC limit $desde, $por_pagina";

		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina+1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;

	}


	Public static function get_analisis_agua( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

		$n = $_SESSION["id_user"];

		$sql = "SELECT count(*) as cuantos from $tabla INNER JOIN parcela ON analisis_agua.id_parcela = parcela.id_parcela where parcela.id_productor = '$n'";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}



		$sql = "SELECT id_analisis_agua,fecha,calcio,magnesio,sodio,potasio, parcela.pcl_alias FROM analisis_agua
						INNER JOIN parcela ON analisis_agua.id_parcela = parcela.id_parcela
						WHERE parcela.id_productor = '$n' ORDER BY analisis_agua.fecha DESC limit $desde, $por_pagina";

		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina+1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;
	}
    
    
    Public static function get_analisis_agua_All( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

		$sql = "SELECT count(*) as cuantos from $tabla INNER JOIN parcela ON analisis_agua.id_parcela = parcela.id_parcela";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}



		$sql = "SELECT id_analisis_agua,fecha,calcio,magnesio,sodio,potasio, parcela.pcl_alias FROM analisis_agua
						INNER JOIN parcela ON analisis_agua.id_parcela = parcela.id_parcela
						ORDER BY analisis_agua.fecha DESC limit $desde, $por_pagina";

		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina+1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;
	}



	Public static function get_riegos( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

		$n = $_SESSION["id_user"];

		$sql = "SELECT count(*) as cuantos from $tabla where id_productor = '$n'";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}


		$sql = "SELECT riego.fecha, SUM(detalle_riego.cantidad) AS cantidad, SUM(detalle_riego.costo) AS costo, parcela.pcl_alias, detalle_riego.tipo, detalle_riego.observacion
						FROM riego INNER JOIN detalle_riego ON riego.id_riego = detalle_riego.id_riego
						INNER JOIN parcela ON parcela.id_parcela = detalle_riego.id_parcela
						WHERE riego.id_productor = '$n'
						GROUP BY riego.fecha, parcela.pcl_alias ORDER BY riego.fecha DESC
						limit $desde, $por_pagina";

		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina+1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;

	}

	Public static function get_enfermedades( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

		$sql = "SELECT count(*) as cuantos from $tabla";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}

		//$n=$_SESSION["id_user"];

		$sql = "SELECT id_enfermedad, enfermedad, descripcion, agente, sintomas, manejo, tipo_enfermedad.id_tipo_enfermedad, tipo_enfermedad.tipo_enfermedad
				FROM enfermedad INNER JOIN tipo_enfermedad
				ON enfermedad.id_tipo_enfermedad = tipo_enfermedad.id_tipo_enfermedad
				limit $desde, $por_pagina";

		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina+1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;

	}


	Public static function get_huertos( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion timeline
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

		$n= $_SESSION["id_user"];

		$sql = "SELECT count(*) as cuantos from $tabla INNER JOIN parcela ON huerto.id_parcela = parcela.id_parcela WHERE parcela.id_productor = '$n' ";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}

		//$n=$_SESSION["id_user"];

		$sql = "SELECT fecha,id_huerto, parcela.pcl_alias, tipo_riego, variedad.variedad, portainjerto.nom_portainjerto
				FROM huerto INNER JOIN parcela ON huerto.id_parcela = parcela.id_parcela
				INNER JOIN variedad ON huerto.id_variedad = variedad.id_variedad
				INNER JOIN portainjerto ON huerto.id_portainjerto = portainjerto.id_portainjerto
				WHERE parcela.id_productor = '$n' ORDER BY huerto.fecha DESC limit $desde, $por_pagina";

		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina+1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;

	}

		Public static function get_controles( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

		$n = $_SESSION["id_user"];

		$sql = "SELECT count(*) as cuantos from $tabla INNER JOIN parcela ON control.id_parcela = parcela.id_parcela WHERE parcela.id_productor = '$n'";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}

		//$n=$_SESSION["id_user"];

		$sql = "SELECT id_control, fecha, parcela.pcl_alias, enfermedad.enfermedad, tipo_enfermedad.tipo_enfermedad, muestras,individuos, decision, responsable.nombre
				FROM control INNER JOIN parcela ON control.id_parcela = parcela.id_parcela
				INNER JOIN enfermedad ON control.id_enfermedad = enfermedad.id_enfermedad
				INNER JOIN responsable ON control.id_responsable = responsable.id_responsable
				INNER JOIN tipo_enfermedad ON enfermedad.id_tipo_enfermedad = tipo_enfermedad.id_tipo_enfermedad
				WHERE parcela.id_productor = '$n' ORDER BY control.fecha DESC
				limit $desde, $por_pagina";
		//print_r($_SESSION);

		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina+1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;

	}

		Public static function get_manejos( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

		$n= $_SESSION["id_user"];

		$sql = "SELECT count(*) as cuantos from $tabla INNER JOIN parcela ON manejo.id_parcela = parcela.id_parcela WHERE parcela.id_productor = '$n'";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}

		$sql = "SELECT id_manejo, fecha, parcela.pcl_alias, enfermedad.enfermedad, tipo_enfermedad.tipo_enfermedad, inicio, fin, siguiente, responsable.nombre
				FROM manejo INNER JOIN parcela ON manejo.id_parcela = parcela.id_parcela
				INNER JOIN enfermedad ON manejo.id_enfermedad = enfermedad.id_enfermedad
				INNER JOIN responsable ON manejo.id_responsable = responsable.id_responsable
				INNER JOIN tipo_enfermedad ON enfermedad.id_tipo_enfermedad = tipo_enfermedad.id_tipo_enfermedad
				WHERE parcela.id_productor = '$n' ORDER BY manejo.fecha DESC
				limit $desde, $por_pagina";
            
        $sql2 = "SELECT manejo.id_manejo, parcela.pcl_alias, detalle_manejo.fecha_aplicacion, insumo.nombre_com, detalle_manejo.dosis, detalle_manejo.medida, detalle_manejo.metodo, enfermedad.enfermedad, responsable.nombre
				FROM manejo INNER JOIN parcela ON manejo.id_parcela = parcela.id_parcela
				INNER JOIN detalle_manejo ON manejo.id_manejo = detalle_manejo.id_manejo
				INNER JOIN insumo ON detalle_manejo.id_insumo = insumo.id_insumo
                INNER JOIN enfermedad ON manejo.id_enfermedad = enfermedad.id_enfermedad
				INNER JOIN responsable ON manejo.id_responsable = responsable.id_responsable
				WHERE parcela.id_productor = '$n' 
                ORDER BY manejo.fecha DESC
				limit $desde, $por_pagina";

		$datos = Database::get_arreglo( $sql );
		$det_datos = Database::get_arreglo( $sql2 );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		  => false,
				'conteo' 		  => $cuantos,
				$tabla 			  => $datos,
				'detalle_manejos' => $det_datos,
				'pag_actual'      => ($pagina+1),
				'pag_siguiente'   => $pag_siguiente,
				'pag_anterior'    => $pag_anterior,
				'total_paginas'   => $total_paginas,
				'paginas'	      => $arrPaginas
				);


		return  $respuesta;

	}

		Public static function get_nutricions( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

		$n= $_SESSION["id_user"];

		$sql = "SELECT count(*) as cuantos from $tabla INNER JOIN parcela ON nutricion.id_parcela = parcela.id_parcela WHERE parcela.id_productor = '$n'";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}


		$sql = "SELECT id_nutricion, fecha, parcela.pcl_alias, tipo_aplicacion
				FROM nutricion INNER JOIN parcela ON nutricion.id_parcela = parcela.id_parcela
				WHERE parcela.id_productor = '$n' ORDER BY nutricion.fecha DESC limit $desde, $por_pagina";


		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina+1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;

	}
//here
	Public static function get_insumosP( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

		$n= $_SESSION["id_user"];

		$sql = "SELECT count(*) as cuantos from $tabla WHERE id_productor = '$n'";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}


		$sql = "SELECT  insumo.nombre_com, insumo.ingrediente_act,cantidad,medida, precio, descripcion
				    FROM inventario 
                        INNER JOIN insumo ON inventario.id_insumo = insumo.id_insumo
                        INNER JOIN tipo_insumo ON insumo.id_tipo_insumo = tipo_insumo.id_tipo_insumo
						WHERE inventario.id_productor = '$n' limit $desde, $por_pagina";


		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i + 1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina + 1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;

	}
    
    Public static function get_insumos( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

		$n= $_SESSION["id_user"];

		$sql = "SELECT count(*) as cuantos from $tabla";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}


		$sql = "SELECT  nombre_com, ingrediente_act, descripcion, num_registro
				    FROM insumo 
                        INNER JOIN tipo_insumo ON insumo.id_tipo_insumo = tipo_insumo.id_tipo_insumo
				        limit $desde, $por_pagina";


		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i + 1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina + 1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;

	}

	Public static function get_Cosecha( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

		$n= $_SESSION["id_user"];

		$sql = "SELECT count(*) as cuantos from $tabla INNER JOIN parcela ON produccion.id_parcela = parcela.id_parcela WHERE parcela.id_productor = '$n'";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}


		$sql = "SELECT produccion.id_produccion, pdc_fecha, parcela.pcl_alias, (pdc_kilos +(pdc_rejas * 28)) AS kilos, comprador.cmp_nombre
						FROM produccion INNER JOIN parcela
    				ON produccion.id_parcela = parcela.id_parcela
    				INNER JOIN venta
  					ON produccion.id_produccion = venta.id_produccion
    				INNER JOIN comprador ON venta.id_comprador = comprador.id_comprador
						WHERE parcela.id_productor = '$n' ORDER BY produccion.pdc_fecha DESC limit $desde, $por_pagina";


		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina+1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;

	}

	Public static function get_Gastos( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();


		$n= $_SESSION["id_user"];

		$sql = "SELECT count(*) as cuantos from $tabla INNER JOIN parcela
		ON gastos.id_parcela = parcela.id_parcela
		WHERE parcela.id_productor = '$n'";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}


		$sql = "SELECT id_gasto, gst_fecha, gst_subtotal, parcela.pcl_alias
				FROM gastos INNER JOIN parcela
				ON gastos.id_parcela = parcela.id_parcela
				INNER JOIN productor ON parcela.id_productor = productor.id_productor
				WHERE productor.id_productor = '$n'  ORDER BY gastos.gst_fecha DESC limit $desde, $por_pagina";


		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina+1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;

	}

	Public static function get_compradores( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

			$n= $_SESSION["id_user"];

		$sql = "SELECT count(*) as cuantos from $tabla where id_productor = '$n'";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}


		$sql = "SELECT *	FROM comprador
				WHERE id_productor = '$n' limit $desde, $por_pagina";

		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina+1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;

	}

	Public static function get_responsables( $tabla, $pagina = 1, $por_pagina = 20 ){

		// Core de la funcion
		$db = DataBase::getInstancia();
		$mysqli = $db->getConnection();

			$n= $_SESSION["id_user"];

		$sql = "SELECT count(*) as cuantos from $tabla where id_productor = '$n'";

		$cuantos       = Database::get_valor_query( $sql, 'cuantos' );
		$total_paginas = ceil( $cuantos / $por_pagina );

		if( $pagina > $total_paginas ){
			$pagina = $total_paginas;
		}


		$pagina -= 1;  // 0
		$desde   = $pagina * $por_pagina; // 0 * 20 = 0

		if( $pagina >= $total_paginas-1 ){
			$pag_siguiente = 1;
		}else{
			$pag_siguiente = $pagina + 2;
		}

		if( $pagina < 1 ){
			$pag_anterior = $total_paginas;
		}else{
			$pag_anterior = $pagina;
		}

		if( $desde <=0 ){
			$desde = 0;
		}


		$sql = "SELECT *	FROM responsable
				WHERE id_productor = '$n' limit $desde, $por_pagina";

		$datos = Database::get_arreglo( $sql );

		$resultado = $mysqli->query($sql);

		$arrPaginas = array();
		for ($i=0; $i < $total_paginas; $i++) {
			array_push($arrPaginas, $i+1);
		}


		$respuesta = array(
				'err'     		=> false,
				'conteo' 		=> $cuantos,
				$tabla 			=> $datos,
				'pag_actual'    => ($pagina+1),
				'pag_siguiente' => $pag_siguiente,
				'pag_anterior'  => $pag_anterior,
				'total_paginas' => $total_paginas,
				'paginas'	    => $arrPaginas
				);


		return  $respuesta;

	}


	// ================================================
	//   Esta funcion recibe un parametro y retorna
	//   todo lo que coincida en la tabla con ese parametro
	// ================================================
	Public static function get_por_nombre($tabla, $campo, $parametro ){

		$sql = "SELECT * FROM $tabla where ". Database::where_palabras_query($campo, $parametro);;


		$data = Database::get_arreglo($sql);

		$respuesta = array(
				'err' => false,
				$tabla => $data
			);

		// return $respuesta;
		return $respuesta;

	}

	Public static function where_palabras_query( $campo, $parametro ){

		$palabras = explode(" ", $parametro );
		$retorno  = "";

		for ($i=0; $i < count($palabras) ; $i++) {

			if( $i == 0){
				$retorno = "$campo like '%$palabras[0]%'";
			}else{
				$retorno .= " and $campo like '%$palabras[$i]%'";
			}

		}

		return $retorno;

	}

}




?>