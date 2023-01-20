
    <?php
    //session_start();
    // Incluir el archivo de base de datos
    include_once("../clases/class.Database.php");

    $postdata = file_get_contents("php://input");

    $request = json_decode($postdata);
    $request = (array) $request;


    $id = $request['id_parcela'];
    $inicio = explode('T', $request['inicio']);
    $fin = explode('T', $request['fin']);
    $id_user = $_SESSION['id_user'];

    //print_r($request);
if ($id == 0) {

    	$sql = "SELECT SUM(dt_precio) AS costo, ctl_gastos.ctl_descripcion
      	      FROM gastos INNER JOIN detalle_gasto
              ON gastos.id_gasto = detalle_gasto.id_gasto
              INNER JOIN ctl_gastos ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
              INNER JOIN parcela ON gastos.id_parcela = parcela.id_parcela
              WHERE parcela.id_productor = '". $id_user . "' AND gastos.gst_fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] ."'
              GROUP BY 2 ";

      $sql2 = "SELECT SUM(vt_subtotal) AS total
               FROM venta INNER JOIN parcela
               ON venta.id_parcela = parcela.id_parcela
               WHERE parcela.id_productor = '". $id_user . "' AND venta.vt_fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] ."' ";

      $sql3 = "SELECT SUM(costo) AS costo
               FROM riego INNER JOIN detalle_riego
               ON riego.id_riego = detalle_riego.id_riego
               WHERE riego.id_productor = '". $id_user . "' AND riego.fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] ."' ";

      $sql4 = "SELECT SUM(subtotal) AS subtotal FROM compra WHERE id_productor = $id_user";
    	//print_r($sql);


    	$respuesta = array(
    				'err' => true,
    				'repGastos' => Database::get_arreglo($sql),
            'repVenta' => Database::get_row($sql2),
            'repRiego' => Database::get_row($sql3),
            'repCompra' => Database::get_row($sql4)
    			);

    	//print_r($sql);
}
elseif ($id != 0) {

  $sql = "SELECT SUM(dt_precio) AS costo, ctl_gastos.ctl_descripcion
          FROM gastos INNER JOIN detalle_gasto
          ON gastos.id_gasto = detalle_gasto.id_gasto
          INNER JOIN ctl_gastos ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
          INNER JOIN parcela ON gastos.id_parcela = parcela.id_parcela
          WHERE parcela.id_productor = '". $id_user . "' AND parcela.id_parcela = '". $id ."' AND gastos.gst_fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] ."'
          GROUP BY 2 ";

  $sql2 = "SELECT SUM(vt_subtotal) AS total
           FROM venta INNER JOIN parcela
           ON venta.id_parcela = parcela.id_parcela
           WHERE parcela.id_productor = '". $id_user . "' AND parcela.id_parcela = '". $id ."' AND venta.vt_fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] ."' ";

  $sql3 = "SELECT SUM(costo) AS costo
           FROM riego INNER JOIN detalle_riego
           ON riego.id_riego = detalle_riego.id_riego
           WHERE riego.id_productor = '". $id_user . "' AND detalle_riego.id_parcela = '". $id ."' AND riego.fecha BETWEEN '". $inicio[0] ."' AND '".$fin[0] ."' ";


  //print_r($sql);


  $respuesta = array(
        'err' => true,
        'repGastos' => Database::get_arreglo($sql),
        'repVenta' => Database::get_row($sql2),
        'repRiego' => Database::get_row($sql3)
      );
}


    echo json_encode( $respuesta );


    ?>
