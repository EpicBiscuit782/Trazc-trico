app.constant('CONFIG', {
 ROL_CURRENT_USER: 1
})

.constant('ROLES', {
 ADMIN: {
 ROL:"1",
 PATH:"/"
 },
 PRODUCTOR: {
 ROL:"2",
 PATH:"/"
 },
 HACCP: {
 ROL:"3",
 PATH:"/"
 },
});


// ================================================
//   Rutas
// ================================================
app.config([ '$routeProvider','ROLES', function($routeProvider,ROLES){



	$routeProvider
		.when('/',{
			templateUrl: 'template/home/home.html',
			controller: 'homeCtrl'
		})
		.when('/home/:id', {
			templateUrl: 'template/home/noticia.html',
			controller: 'homeNoticiaCtrl'
		})

		/*
		EpicBiscuit782
		*/

		.when('/tipo_etapas', {
			templateUrl: 'template/tipo_etapa/tipos_atapas.html',
			controller: 'tipo_etapasCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})

		.when('/tipo_etapa/:id', {
			templateUrl: 'template/tipo_etapa/tipo_etapa.html',
			controller: 'tipo_etapaCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})
		/* **************************************************

								CATALOGOS

		*****************************************************/
		.when('/tipo_etapas', {
			templateUrl: 'template/tipo_etapa/tipos_etapas.html',
			controller: 'tipo_etapasCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})
		.when('/tipo_etapa/:id', {
			templateUrl: 'template/tipo_etapa/tipo_etapa.html',
			controller: 'tipo_etapaCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})

		.when('/newplantacion/:id', {
			templateUrl: 'template/timeline/newplantacion.html',
			controller: 'newplantacionCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})
		
		.when('/tablero', {
			templateUrl: 'template/home/tablero.html',
			controller: 'tableroCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
        .when('/noticias', {
			templateUrl: 'template/noticias/all.html',
			controller: 'noticiasCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})
		.when('/noticia/:id', {
			templateUrl: 'template/noticias/add.html',
			controller: 'noticiaCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})

		.when('/portainjertos', {
			templateUrl: 'template/portainjerto/all.html',
			controller: 'portainjertosCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})
		.when('/portainjerto/:id', {
			templateUrl: 'template/portainjerto/add.html',
			controller: 'portainjertoCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})

		.when('/variedades', {
			templateUrl: 'template/variedad/variedades.html',
			controller: 'variedadesCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})
		.when('/variedad/:id', {
			templateUrl: 'template/variedad/variedad.html',
			controller: 'variedadCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})

		/*.when('/terrenos', {
			templateUrl: 'template/terreno/terrenos.html',
			controller: 'terrenosCtrl'
		})
		.when('/terreno/:id', {
			templateUrl: 'template/terreno/terreno.html',
			controller: 'terrenoCtrl'
		})*/


		.when('/proveedores', {
			templateUrl: 'template/proveedor/proveedores.html',
			controller: 'proveedoresCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
		.when('/proveedor/:id', {
			templateUrl: 'template/proveedor/proveedor.html',
			controller: 'proveedorCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
		.when('/tipo_insumos', {
			templateUrl: 'template/tipo_insumo/tipos_insumos.html',
			controller: 'tipo_insumosCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})
		.when('/tipo_insumo/:id', {
			templateUrl: 'template/tipo_insumo/tipo_insumo.html',
			controller: 'tipo_insumoCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})

		.when('/insumos', {
			templateUrl: 'template/insumos/insumos.html',
			controller: 'insumosCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})
		//here
		.when('/insumo/:id', {
			templateUrl: 'template/insumos/insumo.html',
			controller: 'insumoCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})
		.when('/productores', {
			templateUrl: 'template/productor/productores.html',
			controller: 'productoresCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})
		.when('/productor/:id',{
			templateUrl: 'template/productor/productor.html',
			controller: 'productorCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})
		.when('/parcela/:id', {
			templateUrl: 'template/parcela/parcela.html',
			controller: 'parcelaCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
		.when('/parcelas', {
			templateUrl: 'template/parcela/parcelas.html',
			controller: 'parcelasCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
		.when('/compradores', {
			templateUrl: 'template/comprador/compradores.html',
			controller: 'compradoresCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
		.when('/comprador/:id', {
			templateUrl: 'template/comprador/comprador.html',
			controller: 'compradorCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
		//check
		.when('/tipo_gastos', {
			templateUrl: 'template/tipo_gasto/tipos_gastos.html',
			controller: 'tipo_gastosCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})
		//check
		.when('/tipo_gasto/:id', {
			templateUrl: 'template/tipo_gasto/tipo_gasto.html',
			controller: 'tipo_gastoCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})
		.when('/ctl_gastos', {
			templateUrl: 'template/ctl_gasto/ctl_gastos.html',
			controller: 'ctl_gastosCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})
		.when('/ctl_gasto/:id', {
			templateUrl: 'template/ctl_gasto/ctl_gasto.html',
			controller: 'ctl_gastoCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})
		.when('/propiedades', {
			templateUrl: 'template/regimen/propiedades.html',
			controller: 'regimensCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})
		.when('/propiedad/:id', {
			templateUrl: 'template/regimen/propiedad.html',
			controller: 'regimenCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})
		.when('/cosechaGral', {
			templateUrl: 'template/cosecha/all.html',
			controller: 'cosechaGralCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
		.when('/cosecha', {
			templateUrl: 'template/cosecha/cosecha.html',
			controller: 'cosechaCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
    .when('/detalleCosecha/:id', {
      templateUrl: 'template/cosecha/detalle.html',
      controller: 'detalle_cosechaCtrl',
      data: {
        authorized: [ROLES.PRODUCTOR.ROL]
      }
    })
		.when('/gastosGral', {
			templateUrl: 'template/reportes/gastosProductor.html',
			controller: 'gastosRepCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
		.when('/gastos', {
			templateUrl: 'template/gastos/gastos.html',
			controller: 'GastosCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})

		.when('/tipo_enfermedades', {
			templateUrl: 'template/tipo_enfermedad/all.html',
			controller: 'tipo_enfermedadesCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})
		.when('/tipo_enfermedad/:id', {
			templateUrl: 'template/tipo_enfermedad/add.html',
			controller: 'tipo_enfermedadCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})
		.when('/enfermedades', {
			templateUrl: 'template/enfermedades/all.html',
			controller: 'enfermedadesCtrl',
		})
        .when('/enfermedades_insumos', {
			templateUrl: 'template/enfermedades/recomendados.html',
			controller: 'enfermedadesRecoCtrl',
		})
        .when('/enfermedad_insumos/:id', {
			templateUrl: 'template/enfermedades/add_recomendados.html',
			controller: 'enfermedadRecoCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})
		.when('/enfermedad/:id', {
			templateUrl: 'template/enfermedades/add.html',
			controller: 'enfermedadCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})

		.when('/responsables', {
			templateUrl: 'template/responsable/all.html',
			controller: 'responsablesCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
		.when('/responsable/:id', {
			templateUrl: 'template/responsable/add.html',
			controller: 'responsableCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})

		.when('/administradores', {
			templateUrl: 'template/admin/all.html',
			controller: 'administradoresCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})
		.when('/admin/:id', {
			templateUrl: 'template/admin/add.html',
		  controller: 'adminCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})
        
        .when('/miembros', {
			templateUrl: 'template/haccp/Allequipo.html',
			controller: 'miembrosCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})
		.when('/equipo/:id', {
			templateUrl: 'template/haccp/Addequipo.html',
		  controller: 'equipoCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})

		

		/* ******************************************************

								ANALISIS

		**************************************************************/

		.when('/analisis_suelos', {
			templateUrl: 'template/analisis_suelo/analisis_suelos_gral.html',
			controller: 'analisis_suelosCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
		.when('/analisis_suelo/:id', {
			templateUrl: 'template/analisis_suelo/analisis_suelo.html',
			controller: 'analisis_sueloCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})

		.when('/foliar', {
			templateUrl: 'template/analisis_foliar/all.html',
			controller: 'analisis_foliaresCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
		.when('/analisis_foliar/:id', {
			templateUrl: 'template/analisis_foliar/add.html',
			controller: 'analisis_foliarCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})

		.when('/agua', {
			templateUrl: 'template/analisis_agua/all.html',
			controller: 'analisis_aguasCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
		.when('/analisis_agua/:id', {
			templateUrl: 'template/analisis_agua/add.html',
			controller: 'analisis_aguaCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})




		/************************************************************

								INSUMOS

		*************************************************************/

		.when('/compra', {
			templateUrl: 'template/insumos/compra.html',
			controller: 'CompraCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
		.when('/insumosP', {
			templateUrl: 'template/insumos/insumosP.html',
			controller: 'insumosPCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})

    .when('/compras', {
			templateUrl: 'template/insumos/all.html',
			controller: 'comprasCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})

    .when('/detalleCompra/:id', {
			templateUrl: 'template/insumos/detalle.html',
			controller: 'detalle_compraCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})


		/************************************************************

							HUERTO

		************************************************************/

		.when('/huertos', {
			templateUrl: 'template/huerto/all.html',
			controller: 'huertosCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})

		.when('/huerto/:id', {
			templateUrl: 'template/huerto/add.html',
			controller: 'huertoCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
    
        .when('/antecedentes', {
			templateUrl: 'template/huerto/antecedentes.html',
			controller: 'antecedentesCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
    
        .when('/antecedente/:id', {
			templateUrl: 'template/huerto/add_antecedente.html',
			controller: 'antecedenteCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})


		/************************************************************

								NUTRICIÓN

		************************************************************/


		.when('/nutricions', {
			templateUrl: 'template/nutricion/all.html',
			controller: 'nutricionsCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
		.when('/nutricion', {
			templateUrl: 'template/nutricion/nutricion.html',
			controller: 'nutricionCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})

		.when('/nutricion/:id', {
			templateUrl: 'template/nutricion/detalle.html',
			controller: 'detalle_nutricionCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})



		/*************************************************************

							RIEGO

		*************************************************************/

		.when('/riego/:id', {
			templateUrl: 'template/riego/riego.html',
			controller: 'riegoCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
		.when('/riegos', {
			templateUrl: 'template/riego/all.html',
			controller: 'riegosCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})

		/************************************************************

								ENFERMEDADES

		************************************************************/

		.when('/controles', {
			templateUrl: 'template/manejo/all.html',
			controller: 'controlesCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})

		.when('/control', {
			templateUrl: 'template/manejo/control.html',
			controller: 'controlCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})

		.when('/manejos', {
			templateUrl: 'template/manejo/manejos.html',
			controller: 'manejosCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})

		.when('/manejo', {
			templateUrl: 'template/manejo/manejo.html',
			controller: 'manejoCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})

		.when('/manejo/:id', {
			templateUrl: 'template/manejo/detalle.html',
			controller: 'detalle_manejoCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})



		/************************************************************

								TRAZABILIDAD

		************************************************************/

		.when('/trazabilidad', {
			templateUrl: 'template/trazabilidad/trazabilidad.html',
			controller: 'trazabilidadCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
		.when('/codigo/:id', {
			templateUrl: 'template/trazabilidad/codigo.html',
			controller: 'codigoCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})


		/************************************************************

								GRAFICAS

		************************************************************/

		/*.when('/graficas', {
			templateUrl: 'template/graficas/graficas.html',
			controller: 'graficasCtrl',
		})*/

		/* *********************************************************

								REPORTES

		************************************************************/
		.when('/reportes', {
			templateUrl: 'template/reportes/reportes.html',
			controller: 'reportegralCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
        .when('/reporteCompras', {
			templateUrl: 'template/reportes/reporteCompras.html',
			controller: 'reporteComprasCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
        .when('/reporteCosechas', {
			templateUrl: 'template/reportes/reporteCosechas.html',
			controller: 'reporteCosechasCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
        .when('/reporteGastos', {
			templateUrl: 'template/reportes/reporteGastos.html',
			controller: 'reporteGastosCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
        .when('/reporteAplicacion', {
			templateUrl: 'template/reportes/reporteAplicacion.html',
			controller: 'reporteAplicacionCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
        .when('/expediente', {
			templateUrl: 'template/reportes/expediente.html',
			controller: 'expedienteCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
	/*.when('/parcelasProductor', {
			templateUrl: 'template/reportes/parcelaProductor.html',
			controller: 'parcelasRepCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})*/

		.when('/detalle/:id', {
			templateUrl: 'template/reportes/detalleProductor.html',
			controller: 'gastosRepCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
		/*.when('/ventasP', {
			templateUrl: 'template/reportes/ventasP.html',
			controller: 'reporteVentasCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})*/
		.when('/ventasParcela', {
			templateUrl: 'template/venta/ventParcelaAnual.html',
			controller: 'vtaParcelaAnualCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
		.when('/ventasAnual', {
			templateUrl: 'template/venta/ventasAnual.html',
			controller: 'ventasAnualCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})


/*		.when('/riegoP', {
			templateUrl: 'template/riego/riegoP.html',
			controller: 'reporteRiegosCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
		.when('/riegoParc', {
			templateUrl: 'template/riego/riegoParcela.html',
			controller: 'repRiegParcelaCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
		.when('/riegoAnual', {
			templateUrl: 'template/riego/riegoAnual.html',
			controller: 'riegoAnualCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
*/

		.when('/cosechaProductor', {
			templateUrl: 'template/cosecha/gastosCosecha.html',
			controller: 'gastos_cosechaCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
		.when('/cosechaParc', {
			templateUrl: 'template/cosecha/cosechaParcela.html',
			controller: 'cosechaParcelaCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})
		.when('/cosechAnual', {
			templateUrl: 'template/cosecha/cosechaAnual.html',
			controller: 'cosechaAnualCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})

		/*.when('/gastosGrales', {
			templateUrl: 'template/gastos/gastosGeneral.html',
			controller: 'gastosGeneralCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})

		.when('/gastosParc', {
			templateUrl: 'template/gastos/gastosParcela.html',
			controller: 'gastosParcelaCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		}) */

		.when('/inversion', {
			templateUrl: 'template/gastos/inversion.html',
			controller: 'inversionCtrl',
			data: {
				authorized: [ROLES.PRODUCTOR.ROL]
			}
		})

		// ADMIN

		.when('/cosechaAdmin', {
			templateUrl: 'template/produccion/cosechaTotal.html',
			controller: 'cosechaTotalCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})

		.when('/cosecMunicipio', {
			templateUrl: 'template/produccion/cosechaMunicipio.html',
			controller: 'cosecMunicipioCtrl',
			data: {
				authorized: [ROLES.ADMIN.ROL]
			}
		})

		.otherwise({
			redirectTo: '/'
		})

}]);
