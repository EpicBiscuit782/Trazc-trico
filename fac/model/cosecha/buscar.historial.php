<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");


	$sql = "SELECT produccion.id_produccion, pdc_fecha, parcela.pcl_alias, comprador.cmp_nombre
					FROM produccion INNER JOIN parcela
    			ON produccion.id_parcela = parcela.id_parcela
    			INNER JOIN venta ON produccion.id_produccion = venta.id_produccion
    			INNER JOIN comprador ON venta.id_comprador = comprador.id_comprador
                ORDER BY produccion.id_produccion DESC
                LIMIT 1";
    
    $sql2 = "SELECT control.fecha, enfermedad.enfermedad, responsable.nombre
				FROM produccion 
				INNER JOIN parcela ON produccion.id_parcela = parcela.id_parcela
    			INNER JOIN control ON produccion.id_parcela = control.id_parcela
    			INNER JOIN enfermedad ON control.id_enfermedad = enfermedad.id_enfermedad
    			INNER JOIN responsable ON control.id_responsable = responsable.id_responsable
				WHERE  produccion.id_produccion = 4
				AND control.fecha BETWEEN (produccion.pdc_fecha - INTERVAL 18 MONTH) AND produccion.pdc_fecha
                ORDER BY control.fecha ASC";
    
    $sql3 = "SELECT insumo.nombre_com, detalle_nutricion.cantidad, detalle_nutricion.medida, nutricion.fecha, nutricion.tipo_aplicacion
				FROM produccion 
				INNER JOIN parcela ON produccion.id_parcela = parcela.id_parcela
    			INNER JOIN nutricion ON produccion.id_parcela = nutricion.id_parcela
    			INNER JOIN detalle_nutricion ON nutricion.id_nutricion = detalle_nutricion.id_nutricion
    			INNER JOIN insumo ON detalle_nutricion.id_insumo = insumo.id_insumo
				WHERE produccion.id_produccion = 4
				AND nutricion.fecha BETWEEN (produccion.pdc_fecha - INTERVAL 18 MONTH) AND (produccion.pdc_fecha - INTERVAL 1 MONTH)
                ORDER BY nutricion.fecha ASC";  
    
    $sql4 = "SELECT gastos.gst_fecha as fecha, ctl_gastos.ctl_descripcion
				FROM produccion 
				INNER JOIN parcela ON produccion.id_parcela = parcela.id_parcela
    			INNER JOIN gastos ON produccion.id_parcela = gastos.id_parcela
    			INNER JOIN detalle_gasto ON gastos.id_gasto = detalle_gasto.id_gasto
    			INNER JOIN ctl_gastos ON detalle_gasto.id_ctl_gasto = ctl_gastos.id_ctl_gasto
				WHERE produccion.id_produccion = 4
				AND gastos.gst_fecha BETWEEN (produccion.pdc_fecha - INTERVAL 18 MONTH) AND produccion.pdc_fecha 
				AND ctl_gastos.id_tipo_gasto = 1
                ORDER BY gastos.gst_fecha ASC";

	$respuesta = array(
				'err' => false,
				'produccion' => Database::get_row( $sql ),
				'enfermedades' => Database::get_arreglo( $sql2 ),
				'aplicaciones' => Database::get_arreglo( $sql3 ),
				'gastos' => Database::get_arreglo( $sql4 )
			);


echo json_encode( $respuesta );


?>
