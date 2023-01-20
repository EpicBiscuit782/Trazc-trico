<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;

$monto      = $request["monto"];
$impuesto   = $request["impuesto"];
$monto_neto = $request["monto_neto"];
$estado     = $request["estado"];
$comentario = $request["comentario"];
$cliente_id = $request["cliente_id"];

$detalle    = $request["detalle"];

$comentario = htmlspecialchars( $comentario );
$comentario = str_replace("'", "\'", $comentario);

$sql = "INSERT INTO facturas(fecha_solicitado, monto, impuesto, monto_neto, estado, comentario, cliente_id) 
			VALUES (
				now(),
				$monto,
				$impuesto,
				$monto_neto,
				'$estado',
				'$comentario',
				$cliente_id)";

$factura_id = Database::ejecutar_idu( $sql );

if(  is_numeric( $factura_id ) ){

	// Insertamos los detalles
	for ($i=0; $i < count( $detalle ); $i++) { 

		$producto_id  = $detalle[$i]->producto_id;
		$cantidad     = $detalle[$i]->cantidad;
		$precio_venta = $detalle[$i]->precio_venta;

		$sql = "INSERT INTO facturas_detalle(numero_factura, producto_id, cantidad, precio_unitario) 
		 			VALUES ($factura_id,$producto_id,$cantidad,$precio_venta)";

		// Seria bueno verificar cada insercion,
		// en caso de que una linea de error... 
		// se deberia de hacer un rollback o borrar lo insertado
		Database::ejecutar_idu( $sql );
	}

}
	

$respuesta = array('err' => false,
				   'facturaid'=> $factura_id );



echo json_encode( $respuesta );



?>