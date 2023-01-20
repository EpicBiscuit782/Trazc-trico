var app = angular.module('coeplimApp.gastos_cosechaCtrl', []);

	app.controller('gastos_cosechaCtrl', ['$scope','$http', '$routeParams', 'Parcelas', 'Cosecha', 'Productores', function($scope,$http,$routeParams,Parcelas,Cosecha,Productores){

		$scope.repGastCosec = {};
		$scope.fecha = {};
		$scope.gastos = [];
		$scope.corteT = 0;
		$scope.acarreoT = 0;
		$scope.cargaT = 0;

		$scope.consulta = function(year){
			Cosecha.reporte_cosecha_anual(year).then(function(){


			//console.log(Cosecha.gastosCosec);
				var banC = false;
				var banA = false;
				var banD = false;
				var corte1 = 0, corte2=0,corte3=0,corte4=0,corte5=0,corte6=0,corte7=0,corte8=0,corte9=0,corte10=0,corte11=0,corte12=0;
				var acarreo1 = 0, acarreo2=0,acarreo3=0,acarreo4=0,acarreo5=0,acarreo6=0,acarreo7=0,acarreo8=0,acarreo9=0,acarreo10=0,acarreo11=0,acarreo12=0;
				var carga1 = 0,carga2=0,carga3=0,carga4=0,carga5=0,carga6=0,carga7=0,carga8=0,carga9=0,carga10=0,carga11=0,carga12=0;


				//console.log(Cosecha.gastosCosec.length);
				//console.log(Cosecha.gastosCosec);
			if (Cosecha.gastosCosec.length > 0) {


				for(var i in Cosecha.gastosCosec)
				{
					$scope.corteT = 0;
					$scope.acarreoT = 0;
					$scope.cargaT = 0;
					//console.log("valor:"+ i);

					if (Cosecha.gastosCosec[i].mes == '01' && Cosecha.gastosCosec[i].ctl_descripcion == 'CORTE POR REJA') {
						corte1 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.corteT += corte1;
					}
					else if (Cosecha.gastosCosec[i].mes == '01' && Cosecha.gastosCosec[i].ctl_descripcion == 'ACARREO') {
						acarreo1 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.acarreoT += acarreo1;
					}
					else if (Cosecha.gastosCosec[i].mes == '01' && Cosecha.gastosCosec[i].ctl_descripcion == 'CARGA Y DESCARGA') {
						carga1 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.cargaT += carga1;
					}

					if (Cosecha.gastosCosec[i].mes == '02' && Cosecha.gastosCosec[i].ctl_descripcion == 'CORTE POR REJA') {
						corte2 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.corteT += corte2;
					}
					else if (Cosecha.gastosCosec[i].mes == '02' && Cosecha.gastosCosec[i].ctl_descripcion == 'ACARREO') {
						acarreo2 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.acarreoT += acarreo2;
					}
					else if (Cosecha.gastosCosec[i].mes == '02' && Cosecha.gastosCosec[i].ctl_descripcion == 'CARGA Y DESCARGA') {
						carga2 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.cargaT += carga2;
					}

					if (Cosecha.gastosCosec[i].mes == '03' && Cosecha.gastosCosec[i].ctl_descripcion == 'CORTE POR REJA') {
						corte3 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.corteT += corte3;
					}
					else if (Cosecha.gastosCosec[i].mes == '03' && Cosecha.gastosCosec[i].ctl_descripcion == 'ACARREO') {
						acarreo3 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.acarreoT += acarreo3;
					}
					else if (Cosecha.gastosCosec[i].mes == '03' && Cosecha.gastosCosec[i].ctl_descripcion == 'CARGA Y DESCARGA') {
						carga3 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.cargaT += carga3;
					}

					if (Cosecha.gastosCosec[i].mes == '04' && Cosecha.gastosCosec[i].ctl_descripcion == 'CORTE POR REJA') {
						corte4 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.corteT += corte4;
					}
					else if (Cosecha.gastosCosec[i].mes == '04' && Cosecha.gastosCosec[i].ctl_descripcion == 'ACARREO') {
						acarreo4 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.acarreoT += acarreo4;
					}
					else if (Cosecha.gastosCosec[i].mes == '04' && Cosecha.gastosCosec[i].ctl_descripcion == 'CARGA Y DESCARGA') {
						carga4 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.cargaT += carga4;
					}
					if (Cosecha.gastosCosec[i].mes == '05' && Cosecha.gastosCosec[i].ctl_descripcion == 'CORTE POR REJA') {
						corte5 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.corteT += corte5;
					}
					else if (Cosecha.gastosCosec[i].mes == '05' && Cosecha.gastosCosec[i].ctl_descripcion == 'ACARREO') {
						acarreo5 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.acarreoT += acarreo5;
					}
					else if (Cosecha.gastosCosec[i].mes == '05' && Cosecha.gastosCosec[i].ctl_descripcion == 'CARGA Y DESCARGA') {
						carga5 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.cargaT += carga5;
					}
					if (Cosecha.gastosCosec[i].mes == '06' && Cosecha.gastosCosec[i].ctl_descripcion == 'CORTE POR REJA') {
						corte6 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.corteT += corte6;
					}
					else if (Cosecha.gastosCosec[i].mes == '06' && Cosecha.gastosCosec[i].ctl_descripcion == 'ACARREO') {
						acarreo6 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.acarreoT += acarreo6;
					}
					else if (Cosecha.gastosCosec[i].mes == '06' && Cosecha.gastosCosec[i].ctl_descripcion == 'CARGA Y DESCARGA') {
						carga6 += parseInt(Cosecha.gastosCosec[i].dt_precio);
							$scope.cargaT += carga6;
					}
					if (Cosecha.gastosCosec[i].mes == '07' && Cosecha.gastosCosec[i].ctl_descripcion == 'CORTE POR REJA') {
						corte7 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.corteT += corte7;
					}
					else if (Cosecha.gastosCosec[i].mes == '07' && Cosecha.gastosCosec[i].ctl_descripcion == 'ACARREO') {
						acarreo7 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.acarreoT += acarreo7;
					}
					else if (Cosecha.gastosCosec[i].mes == '07' && Cosecha.gastosCosec[i].ctl_descripcion == 'CARGA Y DESCARGA') {
						carga7 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.cargaT += carga7;
					}
					if (Cosecha.gastosCosec[i].mes == '08' && Cosecha.gastosCosec[i].ctl_descripcion == 'CORTE POR REJA') {
						corte8 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.corteT += corte8;
					}
					else if (Cosecha.gastosCosec[i].mes == '08' && Cosecha.gastosCosec[i].ctl_descripcion == 'ACARREO') {
						acarreo8 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.acarreoT += acarreo8;
					}
					else if (Cosecha.gastosCosec[i].mes == '08' && Cosecha.gastosCosec[i].ctl_descripcion == 'CARGA Y DESCARGA') {
						carga8 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.cargaT += carga8;
					}
					if (Cosecha.gastosCosec[i].mes == '09' && Cosecha.gastosCosec[i].ctl_descripcion == 'CORTE POR REJA') {
						corte9 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.corteT += corte9;
					}
					else if (Cosecha.gastosCosec[i].mes == '09' && Cosecha.gastosCosec[i].ctl_descripcion == 'ACARREO') {
						acarreo9 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.acarreoT += acarreo9;
					}
					else if (Cosecha.gastosCosec[i].mes == '09' && Cosecha.gastosCosec[i].ctl_descripcion == 'CARGA Y DESCARGA') {
						carga9 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.cargaT += carga9;
					}
					if (Cosecha.gastosCosec[i].mes == '10' && Cosecha.gastosCosec[i].ctl_descripcion == 'CORTE POR REJA') {
						corte10 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.corteT += corte10;
					}
					else if (Cosecha.gastosCosec[i].mes == '10' && Cosecha.gastosCosec[i].ctl_descripcion == 'ACARREO') {
						acarreo10 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.acarreoT += acarreo10;
					}
					else if (Cosecha.gastosCosec[i].mes == '10' && Cosecha.gastosCosec[i].ctl_descripcion == 'CARGA Y DESCARGA') {
						carga10 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.cargaT += carga10;
					}
					if (Cosecha.gastosCosec[i].mes == '11' && Cosecha.gastosCosec[i].ctl_descripcion == 'CORTE POR REJA') {
						corte11 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.corteT += corte11;
					}
					else if (Cosecha.gastosCosec[i].mes == '11' && Cosecha.gastosCosec[i].ctl_descripcion == 'ACARREO') {
						acarreo11 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.acarreoT += acarreo11;
					}
					else if (Cosecha.gastosCosec[i].mes == '11' && Cosecha.gastosCosec[i].ctl_descripcion == 'CARGA Y DESCARGA') {
						carga11 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.cargaT += carga11;
					}
					if (Cosecha.gastosCosec[i].mes == '12' && Cosecha.gastosCosec[i].ctl_descripcion == 'CORTE POR REJA') {
						corte12 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.corteT += corte12;
					}
					else if (Cosecha.gastosCosec[i].mes == '12' && Cosecha.gastosCosec[i].ctl_descripcion == 'ACARREO') {
						acarreo12 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.acarreoT += acarreo12;
					}
					else if (Cosecha.gastosCosec[i].mes == '12' && Cosecha.gastosCosec[i].ctl_descripcion == 'CARGA Y DESCARGA') {
						carga12 += parseInt(Cosecha.gastosCosec[i].dt_precio);
						$scope.cargaT += carga12;
					}

					//console.log(i + "= " + Cosecha.gastosCosec.length)


					if (i == Cosecha.gastosCosec.length -1 ) {
						//console.log("hola");
					$scope.ene =
						{ mes: 'ENERO',
						  corte: corte1,
						  acarreo: acarreo1,
						  carga: carga1,
						};

					$scope.gastos.push($scope.ene);
					$scope.feb =
						{ mes: 'FEBRERO',
						  corte: corte2,
						  acarreo: acarreo2,
						  carga: carga2,
						};

					$scope.gastos.push($scope.feb);
					$scope.marz =
						{ mes: 'MARZO',
						  corte: corte3,
						  acarreo: acarreo3,
						  carga: carga3,
						};

					$scope.gastos.push($scope.marz);
					$scope.abr =
						{ mes: 'ABRIL',
						  corte: corte4,
						  acarreo: acarreo4,
						  carga: carga4,
						};

					$scope.gastos.push($scope.abr);
					$scope.may =
						{ mes: 'MAYO',
						  corte: corte5,
						  acarreo: acarreo5,
						  carga: carga5,
						};

					$scope.gastos.push($scope.may);
						$scope.jun =
						{ mes: 'JUNIO',
						  corte: corte6,
						  acarreo: acarreo6,
						  carga: carga6,
						};

					$scope.gastos.push($scope.jun);
						$scope.jul =
						{ mes: 'JULIO',
						  corte: corte7,
						  acarreo: acarreo7,
						  carga: carga7,
						};

					$scope.gastos.push($scope.jul);
						$scope.agos =
						{ mes: 'AGOSTO',
						  corte: corte8,
						  acarreo: acarreo8,
						  carga: carga8,
						};

					$scope.gastos.push($scope.agos);
						$scope.sep =
						{ mes: 'SEPTIEMBRE',
						  corte: corte9,
						  acarreo: acarreo9,
						  carga: carga9,
						};

					$scope.gastos.push($scope.sep);
						$scope.oct =
						{ mes: 'OCTUBRE',
						  corte: corte10,
						  acarreo: acarreo10,
						  carga: carga10,
						};

					$scope.gastos.push($scope.oct);
						$scope.nov =
						{ mes: 'NOVIEMBRE',
						  corte: corte11,
						  acarreo: acarreo11,
						  carga: carga11
						};

					$scope.gastos.push($scope.nov);
						$scope.dic =
						{ mes: 'DICIEMBRE',
						  corte: corte12,
						  acarreo: acarreo12,
						  carga: carga12
						};

					$scope.gastos.push($scope.dic);


					}

					//console.log($scope.cosecha);
					console.log($scope.corteT);


				}//fin for

			}//fin if
				else{
					$scope.gastos = [];
				}


			});



		}

	}]);
