var app = angular.module('coeplimApp.expedienteCtrl', []);

	app.controller('expedienteCtrl', ['$scope','$http', 'Expediente', '$sessionStorage', 'Parcelas', function($scope,$http,Expediente,$sessionStorage,Parcelas){

		$scope.reportes = {};
		$scope.maleza = {};
		$scope.repGastCosec = {};
        var d = new Date();
        d.setFullYear(d.getFullYear() - 1);
		$scope.repGral = {
			'inicio': d,
			'fin': new Date()
		};
        $scope.info = {};
		$scope.totalRejas = 0;
		$scope.totalPrecioRej = 0;
		$scope.totalKilos = 0;
		$scope.totalPrecioKg = 0;
		$scope.subTotal = 0;
		$scope.totalGastos = 0;
		$scope.totalGastosVar = 0;
		$scope.totalGastosCos = 0;
		$scope.total = 0;
		$scope.ganancias = 0;
        $scope.tot_cost_insec=0;
        $scope.tot_cost_ferti=0;
        $scope.tot_cost_ferti_suelo=0;
        $scope.tot_cost_fungi=0;
        $scope.tot_cant_insec=0;
        $scope.tot_cant_ferti_suelo=0;
        $scope.tot_cant_ferti=0;
        $scope.tot_cant_fungi=0;
        $scope.total_costo_ins=0;
        $scope.total_cant_ins=0;

		$scope.errorInicio = false;
		$scope.errorFin = false;

		$scope.sumar = function(valores){
			var suma = 0;
			valores.forEach(function(v){
				suma += parseFloat(v);
			});
			return suma;
		}
        
        $scope.parcelas = {};
        Parcelas.all().then(function(){
            $scope.parcelas = Parcelas.parcelas;
		});
        
        function buscar(){
			for (var i = 0; i < $scope.parcelas.length; i++) {
				if($scope.info.id_parcela == 	$scope.parcelas[i].id_parcela){
				    $scope.alias = $scope.parcelas[i].pcl_alias;
				}
			}
		}
        


        
        $scope.excel = function() {
                Expediente.getExcel($scope.repGral.id_parcela).then(function(){
                $scope.control_maleza = Expediente.control_maleza;
                $scope.control_maleza_mes = Expediente.control_maleza_mes;
                $scope.aplicacion_herbicida_mes = Expediente.aplicacion_herbicida_mes;
                $scope.prod_cos = Expediente.prod_cos;
                $scope.prod_cos_mes = Expediente.prod_cos_mes;
                $scope.insecticida2 = Expediente.insecticida;
                $scope.fungicida2 = Expediente.fungicida;
                $scope.fertilizante2 = Expediente.fertilizante;
                $scope.fertilizante_suelo2 = Expediente.fertilizante_suelo;               
                $scope.insecticida_mes = Expediente.insecticida_mes;
                $scope.fungicida_mes = Expediente.fungicida_mes;
                $scope.fertilizante_mes = Expediente.fertilizante_mes;
                $scope.fertilizante_suelo_mes = Expediente.fertilizante_suelo_mes;
                $scope.gastos_cos = Expediente.gastos_cos;
                $scope.gastos_cos_mes = Expediente.gastos_cos_mes;
				$scope.gastos_var = Expediente.gastos_var;
				$scope.gastos_var_mes = Expediente.gastos_var_mes;
				$scope.riego2 = Expediente.riego;
				$scope.riego_mes = Expediente.riego_mes;
				$scope.a_foliar = Expediente.a_foliar;
				$scope.a_suelo = Expediente.a_suelo;
				$scope.parcela = Expediente.parcela;

            });
        
            
            Expediente.getManejoGastos($scope.repGral.id_parcela).then(function(){
                $scope.gastos = Expediente.gastos;
                $scope.macheteo = Expediente.macheteo;
                $scope.macheteo_mes = Expediente.macheteo_mes;
                $scope.rastreo_mes = Expediente.rastreo_mes;
                $scope.rastreo = Expediente.rastreo;
            });
        }
        
        $scope.prev = function() {
             
             $scope.balance_anual = $scope.prod_cos_mes.reduce(function(r, o) {
                if (r[o.md]){
                    r[o.md].rejas_total += Number(o.rejas_total);
                    r[o.md].kilos_total += Number(o.kilos_total);
                    r[o.md].preja_total += Number(o.preja_total);
                    r[o.md].pkilo_total += Number(o.pkilo_total);
                    r[o.md].sub_total += Number(o.sub_total);
                } else {
                    r[o.md] = {rejas_total: Number(o.rejas_total), preja_total: Number(o.preja_total), pkilo_total: Number(o.pkilo_total), kilos_total: Number(o.kilos_total), sub_total: Number(o.sub_total)};
                }
                return r;
            }, {});
            
            
            var gastos_cos_meses = $scope.gastos_cos_mes.reduce(function(r, o) {
                if (r[o.md]){
                    r[o.md].ACARREO += Number(o.ACARREO);
                    r[o.md].CARGA_DESCARGA += Number(o.CARGA_DESCARGA);
                    r[o.md].CORTE += Number(o.CORTE);
                } else {
                    r[o.md] = {ACARREO: Number(o.ACARREO), CARGA_DESCARGA: Number(o.CARGA_DESCARGA), CORTE: Number(o.CORTE)};
                }
                return r;
            }, {});              
                      
            
            
            $scope.costos_labor = $scope.rastreo_mes.reduce(function(r, o) {
                if (r[o.md]){
                    r[o.md].costo_rastreo += Number(o.costo);
                } else {
                    r[o.md] = {costo_rastreo: Number(o.costo)};
                }
                return r;
            }, {});            
            
            var macheteo_meses = $scope.macheteo_mes.reduce(function(r, o) {
                if (r[o.md]){
                    r[o.md].costo_macheteo += Number(o.costo);
                } else {
                    r[o.md] = {costo_macheteo: Number(o.costo)};
                }
                return r;
            }, {});            
            
            var aplicacion_herbicida_meses = $scope.aplicacion_herbicida_mes.reduce(function(r, o) {
                if (r[o.md]){
                    r[o.md].costo_ap_herb += Number(o.aplicacion);
                } else {
                    r[o.md] = {costo_ap_herb: Number(o.aplicacion)};
                }
                return r;
            }, {});            
            
            var a_foliar_meses = $scope.a_foliar.reduce(function(r, o) {
                if (r[o.md]){
                    r[o.md].costo_ap_foliar += Number(o.aplicacion);
                } else {
                    r[o.md] = {costo_ap_foliar: Number(o.aplicacion)};
                }
                return r;
            }, {}); 
            
            
            var a_suelo_meses = $scope.a_suelo.reduce(function(r, o) {
                if (r[o.md]){
                    r[o.md].costo_ap_suelo += Number(o.aplicacion);
                } else {
                    r[o.md] = {costo_ap_suelo: Number(o.aplicacion)};
                }
                return r;
            }, {});            
            
            
            var riego_meses = $scope.riego_mes.reduce(function(r, o) {
                if (r[o.md]){
                    r[o.md].costo_riego += Number(o.costo);
                } else {
                    r[o.md] = {costo_riego: Number(o.costo)};
                }
                return r;
            }, {});
            
            var gastos_var_meses = $scope.gastos_var_mes.reduce(function(r, o) {
                if (r[o.md]){
                    r[o.md].desmamone += Number(o.desmamone);
                    r[o.md].poda += Number(o.poda);
                } else {
                    r[o.md] = {desmamone: Number(o.desmamone), poda: Number(o.poda)};
                }
                return r;
            }, {});             
            
            
            
            $scope.costos_insumos = $scope.gastos_var_mes.reduce(function(r, o) {
                if (r[o.md]){
                    r[o.md].disel += Number(o.disel);
                    r[o.md].energia += Number(o.energia);
                    r[o.md].refacciones += Number(o.refacciones);
                    r[o.md].gasolina += Number(o.gasolina);
                } else {
                    r[o.md] = {disel: Number(o.disel), refacciones: Number(o.refacciones), gasolina: Number(o.gasolina), energia: Number(o.energia)};
                }
                return r;
            }, {});             
            
            
            var control_maleza_meses = $scope.control_maleza_mes.reduce(function(r, o) {
                if (r[o.md]){
                    r[o.md].costo_herb += Number(o.costo);
                } else {
                    r[o.md] = {costo_herb: Number(o.costo)};
                }
                return r;
            }, {});             
            
            var insecticida_meses = $scope.insecticida_mes.reduce(function(r, o) {
                if (r[o.md]){
                    r[o.md].costo_insec += Number(o.costo);
                    r[o.md].cantidad_insec += Number(o.cantidad);
                } else {
                    r[o.md] = {costo_insec: Number(o.costo), cantidad_insec: Number(o.cantidad)};
                }
                return r;
            }, {});             
            
            var fungicida_meses = $scope.fungicida_mes.reduce(function(r, o) {
                if (r[o.md]){
                    r[o.md].costo_fungi += Number(o.costo);
                    r[o.md].cantidad_fungi += Number(o.cantidad);
                } else {
                    r[o.md] = {cantidad_fungi: Number(o.cantidad), costo_fungi: Number(o.costo)};
                }
                return r;
            }, {});              
            
            var fertilizante_suelo_meses = $scope.fertilizante_suelo_mes.reduce(function(r, o) {
                if (r[o.md]){
                    r[o.md].costo_suelo += Number(o.costo);
                    r[o.md].cantidad_suelo += Number(o.cantidad);
                } else {
                    r[o.md] = {cantidad_suelo: Number(o.cantidad), costo_suelo: Number(o.costo)};
                }
                return r;
            }, {});              
            
            var fertilizante_meses = $scope.fertilizante_mes.reduce(function(r, o) {
                if (r[o.md]){
                    r[o.md].costo_foliar += Number(o.costo);
                    r[o.md].cantidad_foliar += Number(o.cantidad);
                } else {
                    r[o.md] = {cantidad_foliar: Number(o.cantidad), costo_foliar: Number(o.costo)};
                }
                return r;
            }, {});  

            
            
            $.extend(true, $scope.costos_labor, macheteo_meses, aplicacion_herbicida_meses, a_foliar_meses, a_suelo_meses, riego_meses, gastos_var_meses, fertilizante_suelo_meses);
            
            $.extend(true, $scope.costos_insumos, control_maleza_meses, insecticida_meses, fungicida_meses, fertilizante_suelo_meses, fertilizante_meses);
            
            $.extend(true, $scope.balance_anual, gastos_cos_meses, $scope.costos_labor, $scope.costos_insumos );
            

            
            $scope.calculateAverageReja = function(MyData){ 
                var length = 0, total  = 0; 
                for (var mes in MyData) {
                    if(MyData[mes].preja_total>0){
                        total += Number(MyData[mes].preja_total);
                        length++;
                    }
                }

                var average = total / length;

                return average; 
            };            
            
            $scope.calculateAverageKilo = function(MyData){ 
                var length = 0, total  = 0; 
                for (var mes in MyData) {
                    if(MyData[mes].preja_total>0){
                        total += Number(MyData[mes].pkilo_total);
                        length++;
                    }
                }

                var average = total / length;

                return average; 
            };
                                    
        }
        
        


        $scope.crearDocExcel = function() {
        //Crear documento excel -----------------------------------------------------
            var workbook = new $.ig.excel.Workbook($.ig.excel.WorkbookFormat.excel2007);
            //-------------------------Costo Beneficio-------------------------------
            
        
            //-------------------------Control de Malezas-------------------------------
            var sheet = workbook.worksheets().add('Control de Malezas');
            sheet.columns(0).setWidth(110, $.ig.excel.WorksheetColumnWidthUnit.pixel);

            // Add merged regions for regions A1:D2
            var mergedCellA1D2 = sheet.mergedCellsRegions().add(0, 0, 1, 6);
            var mergedCellA3A4 = sheet.mergedCellsRegions().add(2, 0, 3, 0);
            var mergedCellB3C4 = sheet.mergedCellsRegions().add(2, 1, 2, 2);

            // Add two large headers in merged cells above the data
            mergedCellA1D2.value('Control de Malezas');
            mergedCellA1D2.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            mergedCellA1D2.cellFormat().fill($.ig.excel.CellFill.createSolidFill('#ED7D31'));
            mergedCellA1D2.cellFormat().font().colorInfo(new $.ig.excel.WorkbookColorInfo($.ig.excel.WorkbookThemeColorType.light1));
            mergedCellA1D2.cellFormat().font().height(16 * 30);
            mergedCellA1D2.cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);

            mergedCellA3A4.value('Mes');
            mergedCellA3A4.cellFormat().verticalAlignment($.ig.excel.VerticalCellAlignment.center);
            mergedCellA3A4.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            mergedCellB3C4.value('Insumo');
            mergedCellB3C4.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            sheet.getCell('D3').value('Aplicación');
            
            sheet.getCell('E3').value('Macheteo');

            sheet.getCell('F3').value('Rastreo/Desvare');

            // Format some rows and columns that should have similar formatting so we don't have to set it on individual cells.
            sheet.rows(2).cellFormat().font().bold(true);
            sheet.columns(2).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(3).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(4).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(5).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(6).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            
            sheet.columns(1).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(2).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(3).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(4).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(5).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(6).setWidth(120, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            
            sheet.columns(0).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(1).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(2).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(3).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(4).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(5).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(6).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);

            // Add a light color fill to all cells in the A3:G17 region to visually separate it from the rest of the sheet. We can iterate
            // all cells in the regions by getting an enumerator for the region and enumerating each item.
            var light1Fill = $.ig.excel.CellFill.createSolidFill(new $.ig.excel.WorkbookColorInfo($.ig.excel.WorkbookThemeColorType.light1));
            var cells = sheet.getRegion('A3:G18').getEnumerator();
            while (cells.moveNext()) {
                cells.current().cellFormat().fill(light1Fill);
                cells.current().cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                
            }

            // Populate the sheet with data
            sheet.getCell('B4').value('Cantidad');
            sheet.getCell('C4').value('Costo');
            sheet.getCell('D4').value('Costo');
            sheet.getCell('E4').value('Costo');
            sheet.getCell('F4').value('Costo');
            sheet.getCell('G4').value('Total');
            
            
            $n=5;
                for(i in $scope.control_maleza) {
                    var obj = $scope.control_maleza[i];
                         sheet.getCell('A'+$n).value(obj['md']);
                         sheet.getCell('B'+$n).value(parseInt(obj['dosis_total']));
                         sheet.getCell('C'+$n).value(parseInt(obj['costo']));
                         $n++;
                }
            $n=5;
                for(i in $scope.gastos) {
                    var obj = $scope.gastos[i];
                         sheet.getCell('D'+$n).value(parseInt(obj['costo']));
                         $n++;
                }
            $n=5;
                for(i in $scope.macheteo) {
                    var obj = $scope.macheteo[i];
                         sheet.getCell('E'+$n).value(parseInt(obj['costo']));
                         $n++;
                }
            $n=5;
                for(i in $scope.rastreo) {
                    var obj = $scope.rastreo[i];
                         sheet.getCell('F'+$n).value(parseInt(obj['costo']));
                         $n++;
                }
                  
            // Add a grand total which is bold and larger than the rest of the text to call attention to it.
            sheet.getCell('G5').applyFormula("=SUM(C5:F5)");
            sheet.getCell('G6').applyFormula("=SUM(C6:F6)");
            sheet.getCell('G7').applyFormula("=SUM(C7:F7)");
            sheet.getCell('G8').applyFormula("=SUM(C8:F8)");
            sheet.getCell('G9').applyFormula("=SUM(C9:F9)");
            sheet.getCell('G10').applyFormula("=SUM(C10:F10)");
            sheet.getCell('G11').applyFormula("=SUM(C11:F11)");
            sheet.getCell('G12').applyFormula("=SUM(C12:F12)");
            sheet.getCell('G13').applyFormula("=SUM(C13:F13)");
            sheet.getCell('G14').applyFormula("=SUM(C14:F14)");
            sheet.getCell('G15').applyFormula("=SUM(C15:F15)");
            sheet.getCell('G16').applyFormula("=SUM(C16:F16)");
            
            sheet.getCell('A18').value('Total');
            sheet.getCell('B18').applyFormula("=SUM(B5:B16)");
            sheet.getCell('C18').applyFormula("=SUM(C5:C16)");
            sheet.getCell('D18').applyFormula("=SUM(D5:D16)");
            sheet.getCell('E18').applyFormula("=SUM(E5:E16)");
            sheet.getCell('F18').applyFormula("=SUM(F5:F16)");

            
            
            sheet.getCell('E19').value('TOTAL');
            sheet.getCell('E19').cellFormat().font().height(14 * 20);
            sheet.getCell('E19').cellFormat().font().bold(true);

            sheet.getCell('G19').applyFormula("=SUM(G5:G16)");
            sheet.getCell('G19').cellFormat().font().height(14 * 20);
            sheet.getCell('G19').cellFormat().font().bold(true);
                    

            
            
            //-------------------------MESES--------------------------------------------------------
            var y=20;
            var maleza_meses = _.mapValues(_.groupBy($scope.control_maleza_mes, 'md'),
                          clist => clist.map(mes => _.omit(mes, 'md')));
            var macheteo_meses = _.mapValues(_.groupBy($scope.macheteo_mes, 'md'),
                          clist => clist.map(mes => _.omit(mes, 'md')));
            var rastreo_meses = _.mapValues(_.groupBy($scope.rastreo_mes, 'md'),
                          clist => clist.map(mes => _.omit(mes, 'md')));
            var aplicacion_herbicida_meses = _.mapValues(_.groupBy($scope.aplicacion_herbicida_mes, 'md'),clist => clist.map(mes => _.omit(mes, 'md')));
            



            
            
        for(var i in maleza_meses) {
            var mergedCellA1D2 = sheet.mergedCellsRegions().add(0+y, 0, 1+y, 6);
            var mergedCellA3A4 = sheet.mergedCellsRegions().add(2+y, 0, 3+y, 0);
            var mergedCellB3C4 = sheet.mergedCellsRegions().add(2+y, 1, 2+y, 2);

            // Add two large headers in merged cells above the data
            mergedCellA1D2.value(i);
            mergedCellA1D2.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            mergedCellA1D2.cellFormat().fill($.ig.excel.CellFill.createSolidFill('#ED7D31'));
            mergedCellA1D2.cellFormat().font().colorInfo(new $.ig.excel.WorkbookColorInfo($.ig.excel.WorkbookThemeColorType.light1));
            mergedCellA1D2.cellFormat().font().height(16 * 30);
            mergedCellA1D2.cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);

            mergedCellA3A4.value('Día');
            mergedCellA3A4.cellFormat().verticalAlignment($.ig.excel.VerticalCellAlignment.center);
            mergedCellA3A4.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            mergedCellB3C4.value('Insumo');
            mergedCellB3C4.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            sheet.getCell('D'+(3+y)).value('Aplicación');
            
            sheet.getCell('E'+(3+y)).value('Macheteo');

            sheet.getCell('F'+(3+y)).value('Rastreo/Desvare');

            // Format some rows and columns that should have similar formatting so we don't have to set it on individual cells.
            sheet.rows(2+y).cellFormat().font().bold(true);
            sheet.columns(0).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);

            
            var light1Fill = $.ig.excel.CellFill.createSolidFill(new $.ig.excel.WorkbookColorInfo($.ig.excel.WorkbookThemeColorType.light1));
            var cells = sheet.getRegion('A'+(3+y)+':G'+(37+y)).getEnumerator();
            while (cells.moveNext()) {
                cells.current().cellFormat().fill(light1Fill);
                cells.current().cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                
            }

            // Populate the sheet with data
            sheet.getCell('B'+(4+y)).value('Cantidad');
            sheet.getCell('C'+(4+y)).value('Costo');
            sheet.getCell('D'+(4+y)).value('Costo');
            sheet.getCell('E'+(4+y)).value('Costo');
            sheet.getCell('F'+(4+y)).value('Costo');
            sheet.getCell('G'+(4+y)).value('Total');
            $n=5+y;

            for(var j in maleza_meses[i]) {
                var obj = maleza_meses[i][j];
                    sheet.getCell('A'+$n).value(obj['day']);
                    sheet.getCell('B'+$n).value(parseInt(obj['dosis_total']));
                    sheet.getCell('C'+$n).value(parseInt(obj['costo']));
                    $n++;
            }
            // Add a grand total which is bold and larger than the rest of the text to call attention to it.
            for(var i=5; i<=35; i++){
                sheet.getCell('G'+(i+y)).applyFormula("=SUM(C"+(i+y)+":F"+(i+y)+")");
            }

            
            sheet.getCell('A'+(37+y)).value('Total');
            sheet.getCell('B'+(37+y)).applyFormula("=SUM(B"+(5+y)+":B"+(36+y)+")");
            sheet.getCell('C'+(37+y)).applyFormula("=SUM(C"+(5+y)+":C"+(36+y)+")");
            sheet.getCell('D'+(37+y)).applyFormula("=SUM(D"+(5+y)+":D"+(36+y)+")");
            sheet.getCell('E'+(37+y)).applyFormula("=SUM(E"+(5+y)+":E"+(36+y)+")");
            sheet.getCell('F'+(37+y)).applyFormula("=SUM(F"+(5+y)+":F"+(36+y)+")");

            
            
            sheet.getCell('E'+(38+y)).value('TOTAL');
            sheet.getCell('E'+(38+y)).cellFormat().font().height(14 * 20);
            sheet.getCell('E'+(38+y)).cellFormat().font().bold(true);

            sheet.getCell('G'+(38+y)).applyFormula("=SUM(G"+(5+y)+":G"+(36+y)+")");
            sheet.getCell('G'+(38+y)).cellFormat().font().height(14 * 20);
            sheet.getCell('G'+(38+y)).cellFormat().font().bold(true);
            
            y=y+40; 
        }
        y=20;
        for(var i in macheteo_meses) {
            $n=5+y;
            for(var j in macheteo_meses[i]) {
                var obj = macheteo_meses[i][j];
                    sheet.getCell('E'+$n).value(parseInt(obj['costo']));
                    $n++;
            }
            y=y+40; 
        }
        y=20;
        for(var i in rastreo_meses) {
            $n=5+y;
            for(var j in rastreo_meses[i]) {
                var obj = rastreo_meses[i][j];
                    sheet.getCell('F'+$n).value(parseInt(obj['costo']));
                    $n++;
            }
            y=y+40; 
        }
        y=20;
        for(var i in aplicacion_herbicida_meses) {
            $n=5+y;
            for(var j in aplicacion_herbicida_meses[i]) {
                var obj = aplicacion_herbicida_meses[i][j];
                    sheet.getCell('D'+$n).value(parseInt(obj['aplicacion']));
                    $n++;
            }
            y=y+40; 
        }
            
            
            
            
            //-------------------------Producción y Cosecha-------------------------------
            var sheet = workbook.worksheets().add('Producción y Cosecha');
            sheet.columns(0).setWidth(110, $.ig.excel.WorksheetColumnWidthUnit.pixel);

            // Add merged regions for regions A1:D2
            var mergedCellA1D2 = sheet.mergedCellsRegions().add(0, 0, 1, 9);
            var mergedCellA3A4 = sheet.mergedCellsRegions().add(2, 0, 3, 0);
            var mergedCellB3C4 = sheet.mergedCellsRegions().add(2, 1, 2, 2);
            var mergedCellD3E4 = sheet.mergedCellsRegions().add(2, 3, 2, 4);
            var mergedCellG3I3 = sheet.mergedCellsRegions().add(2, 6, 2, 8);

            // Add two large headers in merged cells above the data
            mergedCellA1D2.value('Producción y Cosecha');
            mergedCellA1D2.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            mergedCellA1D2.cellFormat().fill($.ig.excel.CellFill.createSolidFill('#ED7D31'));
            mergedCellA1D2.cellFormat().font().colorInfo(new $.ig.excel.WorkbookColorInfo($.ig.excel.WorkbookThemeColorType.light1));
            mergedCellA1D2.cellFormat().font().height(16 * 30);
            mergedCellA1D2.cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);

            mergedCellA3A4.value('Mes');
            mergedCellA3A4.cellFormat().verticalAlignment($.ig.excel.VerticalCellAlignment.center);
            mergedCellA3A4.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            mergedCellB3C4.value('Producción');
            mergedCellB3C4.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            mergedCellD3E4.value('Precio del Limón');
            mergedCellD3E4.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            mergedCellG3I3.value('Gastos');
            mergedCellG3I3.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            sheet.getCell('F3').value('Subtotal');

            // Format some rows and columns that should have similar formatting so we don't have to set it on individual cells.
            sheet.rows(2).cellFormat().font().bold(true);
            sheet.columns(3).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(4).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(5).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(6).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(7).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(8).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(9).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(9).cellFormat().font().bold(true);
            
            sheet.columns(1).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(2).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(3).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(4).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(5).setWidth(110, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(6).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(7).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(8).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(9).setWidth(110, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            
            sheet.columns(1).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(2).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(3).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(4).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(5).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(6).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(7).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(8).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(9).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);

            // Add a light color fill to all cells in the A3:G17 region to visually separate it from the rest of the sheet. We can iterate
            // all cells in the regions by getting an enumerator for the region and enumerating each item.
            var light1Fill = $.ig.excel.CellFill.createSolidFill(new $.ig.excel.WorkbookColorInfo($.ig.excel.WorkbookThemeColorType.light1));
            var cells = sheet.getRegion('A3:J18').getEnumerator();
            while (cells.moveNext()) {
                cells.current().cellFormat().fill(light1Fill);
                cells.current().cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                
            }

            // Populate the sheet with data
            sheet.getCell('B4').value('Rejas');
            sheet.getCell('C4').value('Kg');
            sheet.getCell('D4').value('$/Reja');
            sheet.getCell('E4').value('$/Kilo');
            sheet.getCell('G4').value('Corte');
            sheet.getCell('H4').value('Acarreo');
            sheet.getCell('I4').value('Carga-Descarga');
            sheet.getCell('J3').value('Total');
            
            
            $n=5;
                for(i in $scope.prod_cos) {
                    var obj = $scope.prod_cos[i];
                         sheet.getCell('A'+$n).value(obj['md']);
                         sheet.getCell('B'+$n).value(parseFloat(obj['rejas_total']));
                         sheet.getCell('C'+$n).value(parseFloat(obj['kilos_total']));
                         sheet.getCell('D'+$n).value(parseFloat(obj['preja_total']));
                         sheet.getCell('E'+$n).value(parseFloat(obj['pkilo_total']));
                         sheet.getCell('F'+$n).value(parseFloat(obj['sub_total']));
                         $n++;
                }
            $n=5;
                for(i in $scope.gastos_cos) {
                    var obj = $scope.gastos_cos[i];
                         sheet.getCell('G'+$n).value(parseFloat(obj['CORTE']));
                         sheet.getCell('H'+$n).value(parseFloat(obj['ACARREO']));
                         sheet.getCell('I'+$n).value(parseFloat(obj['CARGA_DESCARGA']));
                         $n++;
                }

            sheet.getCell('J5').applyFormula("=SUM(F5-G5-H5-I5)");
            sheet.getCell('J6').applyFormula("=SUM(F6-G6-H6-I6)");
            sheet.getCell('J7').applyFormula("=SUM(F7-G7-H7-I7)");
            sheet.getCell('J8').applyFormula("=SUM(F8-G8-H8-I8)");
            sheet.getCell('J9').applyFormula("=SUM(F9-G9-H9-I9)");
            sheet.getCell('J10').applyFormula("=SUM(F10-G10-H10-I10)");
            sheet.getCell('J11').applyFormula("=SUM(F11-G11-H11-I11)");
            sheet.getCell('J12').applyFormula("=SUM(F12-G12-H12-I12)");
            sheet.getCell('J13').applyFormula("=SUM(F13-G13-H13-I13)");
            sheet.getCell('J14').applyFormula("=SUM(F14-G14-H14-I14)");
            sheet.getCell('J15').applyFormula("=SUM(F15-G15-H15-I15)");
            sheet.getCell('J16').applyFormula("=SUM(F16-G16-H16-I16)");
            
            sheet.getCell('A18').value('Total');
            sheet.getCell('B18').applyFormula("=SUM(B5:B16)");
            sheet.getCell('C18').applyFormula("=SUM(C5:C16)");
            sheet.getCell('D18').applyFormula('=AVERAGEIF(D5:D16,"<>0")');
            sheet.getCell('E18').applyFormula('=AVERAGEIF(E5:E16,"<>0")');
            sheet.getCell('F18').applyFormula("=SUM(F5:F16)");
            sheet.getCell('G18').applyFormula("=SUM(G5:G16)");
            sheet.getCell('H18').applyFormula("=SUM(H5:H16)");
            sheet.getCell('I18').applyFormula("=SUM(I5:I16)");

            
            
            sheet.getCell('I19').value('TOTAL');
            sheet.getCell('I19').cellFormat().font().height(14 * 20);
            sheet.getCell('I19').cellFormat().font().bold(true);

            sheet.getCell('J19').applyFormula("=SUM(J5:J16)");
            sheet.getCell('J19').cellFormat().font().height(14 * 20);
            sheet.getCell('J19').cellFormat().font().bold(true);
            
            
            
            
            //-------------------------MESES--------------------------------------------------------
            var y=20;
            var prod_cos_meses = _.mapValues(_.groupBy($scope.prod_cos_mes, 'md'),
                          clist => clist.map(mes => _.omit(mes, 'md')));
            var gastos_cos_meses = _.mapValues(_.groupBy($scope.gastos_cos_mes, 'md'),
                          clist => clist.map(mes => _.omit(mes, 'md')));
            
        for(var i in prod_cos_meses) {

            var mergedCellA1D2 = sheet.mergedCellsRegions().add(0+y, 0, 1+y, 9);
            var mergedCellA3A4 = sheet.mergedCellsRegions().add(2+y, 0, 3+y, 0);
            var mergedCellB3C4 = sheet.mergedCellsRegions().add(2+y, 1, 2+y, 2);
            var mergedCellD3E4 = sheet.mergedCellsRegions().add(2+y, 3, 2+y, 4);
            var mergedCellG3I3 = sheet.mergedCellsRegions().add(2+y, 6, 2+y, 8);

            // Add two large headers in merged cells above the data
            mergedCellA1D2.value(i);
            mergedCellA1D2.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            mergedCellA1D2.cellFormat().fill($.ig.excel.CellFill.createSolidFill('#ED7D31'));
            mergedCellA1D2.cellFormat().font().colorInfo(new $.ig.excel.WorkbookColorInfo($.ig.excel.WorkbookThemeColorType.light1));
            mergedCellA1D2.cellFormat().font().height(16 * 30);
            mergedCellA1D2.cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);

            mergedCellA3A4.value('Día');
            mergedCellA3A4.cellFormat().verticalAlignment($.ig.excel.VerticalCellAlignment.center);
            mergedCellA3A4.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            mergedCellB3C4.value('Producción');
            mergedCellB3C4.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            mergedCellD3E4.value('Precio del Limón');
            mergedCellD3E4.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            mergedCellG3I3.value('Gastos');
            mergedCellG3I3.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            sheet.getCell('F'+(y+3)).value('Subtotal');

            sheet.rows(2+y).cellFormat().font().bold(true);
            sheet.columns(0).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);


            var light1Fill = $.ig.excel.CellFill.createSolidFill(new $.ig.excel.WorkbookColorInfo($.ig.excel.WorkbookThemeColorType.light1));
            var cells = sheet.getRegion('A'+(y+3)+':J'+(y+37)).getEnumerator();
            while (cells.moveNext()) {
                cells.current().cellFormat().fill(light1Fill);
                cells.current().cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                
            }

            // Populate the sheet with data
            sheet.getCell('B'+(y+4)).value('Rejas');
            sheet.getCell('C'+(y+4)).value('Kg');
            sheet.getCell('D'+(y+4)).value('$/Reja');
            sheet.getCell('E'+(y+4)).value('$/Kilo');
            sheet.getCell('G'+(y+4)).value('Corte');
            sheet.getCell('H'+(y+4)).value('Acarreo');
            sheet.getCell('I'+(y+4)).value('Carga-Descarga');
            sheet.getCell('J'+(y+3)).value('Total');
            
            $n=5+y;
            for(var j in prod_cos_meses[i]) {
                var obj = prod_cos_meses[i][j];
                sheet.getCell('A'+$n).value(obj['day']);
                sheet.getCell('B'+$n).value(parseFloat(obj['rejas_total']));
                sheet.getCell('C'+$n).value(parseFloat(obj['kilos_total']));
                sheet.getCell('D'+$n).value(parseFloat(obj['preja_total']));
                sheet.getCell('E'+$n).value(parseFloat(obj['pkilo_total']));
                sheet.getCell('F'+$n).value(parseFloat(obj['sub_total']));
                $n++;
            }

            
            for(var i=5; i<=35; i++){
                sheet.getCell('J'+(i+y)).applyFormula("=SUM(F"+(i+y)+"-G"+(i+y)+"-H"+(i+y)+"-I"+(i+y)+")");
            }
            
            sheet.getCell('A'+(37+y)).value('Total');
            sheet.getCell('B'+(37+y)).applyFormula("=SUM(B"+(5+y)+":B"+(35+y)+")");
            sheet.getCell('C'+(37+y)).applyFormula("=SUM(C"+(5+y)+":C"+(35+y)+")");
            sheet.getCell('D'+(37+y)).applyFormula('=IFERROR(AVERAGEIF(D'+(5+y)+':D'+(35+y)+',"<>0"),"0")');
            sheet.getCell('E'+(37+y)).applyFormula('=IFERROR(AVERAGEIF(E'+(5+y)+':E'+(35+y)+',"<>0"),"0")');
            sheet.getCell('F'+(37+y)).applyFormula("=SUM(F"+(5+y)+":F"+(35+y)+")");
            sheet.getCell('G'+(37+y)).applyFormula("=SUM(G"+(5+y)+":G"+(35+y)+")");
            sheet.getCell('H'+(37+y)).applyFormula("=SUM(H"+(5+y)+":H"+(35+y)+")");
            sheet.getCell('I'+(37+y)).applyFormula("=SUM(I"+(5+y)+":I"+(35+y)+")");

            
            
            sheet.getCell('I'+(38+y)).value('TOTAL');
            sheet.getCell('I'+(38+y)).cellFormat().font().height(14 * 20);
            sheet.getCell('I'+(38+y)).cellFormat().font().bold(true);

            sheet.getCell('J'+(38+y)).applyFormula("=SUM(J"+(5+y)+":J"+(36+y)+")");
            sheet.getCell('J'+(38+y)).cellFormat().font().height(14 * 20);
            sheet.getCell('J'+(38+y)).cellFormat().font().bold(true);
            y=y+40; 

        }
            
        y=20;
        for(var i in gastos_cos_meses) {
            $n=5+y;
            for(var j in gastos_cos_meses[i]) {
                var obj = gastos_cos_meses[i][j];
                    sheet.getCell('G'+$n).value(parseFloat(obj['CORTE']));
                    sheet.getCell('H'+$n).value(parseFloat(obj['ACARREO']));
                    sheet.getCell('I'+$n).value(parseFloat(obj['CARGA_DESCARGA']));
                    $n++;
            }
            y=y+40; 
        }

            
            
            //-------------------------Insecticida Fungicida...-------------------------------
            var sheet = workbook.worksheets().add('Ins - Fung - Fert');
            sheet.columns(0).setWidth(110, $.ig.excel.WorksheetColumnWidthUnit.pixel);

            // Add merged regions for regions A1:D2
            var mergedCellA1D2 = sheet.mergedCellsRegions().add(0, 0, 1, 8);
            var mergedCellA3A4 = sheet.mergedCellsRegions().add(2, 0, 3, 0);
            var mergedCellB3C4 = sheet.mergedCellsRegions().add(2, 1, 2, 2);
            var mergedCellD3E4 = sheet.mergedCellsRegions().add(2, 3, 2, 4);
            var mergedCellF3G4 = sheet.mergedCellsRegions().add(2, 5, 2, 6);
            var mergedCellH3I4 = sheet.mergedCellsRegions().add(2, 7, 2, 8);

            // Add two large headers in merged cells above the data
            mergedCellA1D2.value('Insecticida - Fungicida - Fertilización Foliar/Suelo');
            mergedCellA1D2.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            mergedCellA1D2.cellFormat().fill($.ig.excel.CellFill.createSolidFill('#ED7D31'));
            mergedCellA1D2.cellFormat().font().colorInfo(new $.ig.excel.WorkbookColorInfo($.ig.excel.WorkbookThemeColorType.light1));
            mergedCellA1D2.cellFormat().font().height(16 * 30);
            mergedCellA1D2.cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);

            mergedCellA3A4.value('Mes');
            mergedCellA3A4.cellFormat().verticalAlignment($.ig.excel.VerticalCellAlignment.center);
            mergedCellA3A4.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            mergedCellB3C4.value('Insecticida');
            mergedCellB3C4.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            mergedCellD3E4.value('Fungicida');
            mergedCellD3E4.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            mergedCellF3G4.value('Fertilización Foliar');
            mergedCellF3G4.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            mergedCellH3I4.value('Fertilización Suelo');
            mergedCellH3I4.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            

            // Format some rows and columns that should have similar formatting so we don't have to set it on individual cells.
            sheet.rows(2).cellFormat().font().bold(true);
            sheet.columns(2).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(4).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(6).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(8).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            
            sheet.columns(1).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(2).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(3).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(4).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(5).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(6).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(7).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(8).setWidth(110, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            
            sheet.columns(1).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(2).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(3).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(4).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(5).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(6).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(7).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(8).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);

            // Add a light color fill to all cells in the A3:G17 region to visually separate it from the rest of the sheet. We can iterate
            // all cells in the regions by getting an enumerator for the region and enumerating each item.
            var light1Fill = $.ig.excel.CellFill.createSolidFill(new $.ig.excel.WorkbookColorInfo($.ig.excel.WorkbookThemeColorType.light1));
            var cells = sheet.getRegion('A3:I18').getEnumerator();
            while (cells.moveNext()) {
                cells.current().cellFormat().fill(light1Fill);
                cells.current().cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                
            }

            // Populate the sheet with data
            sheet.getCell('B4').value('Cantidad');
            sheet.getCell('C4').value('Costo');
            sheet.getCell('D4').value('Cantidad');
            sheet.getCell('E4').value('Costo');
            sheet.getCell('F4').value('Cantidad');
            sheet.getCell('G4').value('Costo');
            sheet.getCell('H4').value('Cantidad');
            sheet.getCell('I4').value('Costo');
            
            
            $n=5;
                for(i in $scope.insecticida2) {
                    var obj = $scope.insecticida2[i];
                         sheet.getCell('A'+$n).value(obj['md']);
                         sheet.getCell('B'+$n).value(parseFloat(obj['cantidad']));
                         sheet.getCell('C'+$n).value(parseFloat(obj['costo']));
                         $n++;
                }
            $n=5;
                for(i in $scope.fungicida2) {
                    var obj = $scope.fungicida2[i];
                         sheet.getCell('D'+$n).value(parseFloat(obj['cantidad']));
                         sheet.getCell('E'+$n).value(parseFloat(obj['costo']));
                         $n++;
                }
            $n=5;
                for(i in $scope.fertilizante2) {
                    var obj = $scope.fertilizante2[i];
                         sheet.getCell('F'+$n).value(parseFloat(obj['cantidad']));
                         sheet.getCell('G'+$n).value(parseFloat(obj['costo']));
                         $n++;
                }
            $n=5;
                for(i in $scope.fertilizante_suelo2) {
                    var obj = $scope.fertilizante_suelo2[i];
                         sheet.getCell('H'+$n).value(parseFloat(obj['cantidad']));
                         sheet.getCell('I'+$n).value(parseFloat(obj['costo']));
                         $n++;
                }
                  
            // Add a grand total which is bold and larger than the rest of the text to call attention to it.
            
            sheet.getCell('A18').value('Total');
            sheet.getCell('B18').applyFormula("=SUM(B5:B16)");
            sheet.getCell('C18').applyFormula("=SUM(C5:C16)");
            sheet.getCell('D18').applyFormula("=SUM(D5:D16)");
            sheet.getCell('E18').applyFormula("=SUM(E5:E16)");
            sheet.getCell('F18').applyFormula("=SUM(F5:F16)");
            sheet.getCell('G18').applyFormula("=SUM(F5:F16)");
            sheet.getCell('H18').applyFormula("=SUM(F5:F16)");
            sheet.getCell('I18').applyFormula("=SUM(F5:F16)");

            
            sheet.getCell('H19').value('TOTAL');
            sheet.getCell('H19').cellFormat().font().height(14 * 20);
            sheet.getCell('H19').cellFormat().font().bold(true);

            sheet.getCell('I19').applyFormula("=SUM(B18:I18)");
            sheet.getCell('I19').cellFormat().font().height(14 * 20);
            sheet.getCell('I19').cellFormat().font().bold(true);
            
            
            
                        
            //-------------------------MESES--------------------------------------------------------
            var y=20;
            var inse_meses = _.mapValues(_.groupBy($scope.insecticida_mes, 'md'),
                          clist => clist.map(mes => _.omit(mes, 'md')));
            var fungi_meses = _.mapValues(_.groupBy($scope.fungicida_mes, 'md'),
                          clist => clist.map(mes => _.omit(mes, 'md')));
            var ferti_s_meses = _.mapValues(_.groupBy($scope.fertilizante_suelo_mes, 'md'),
                          clist => clist.map(mes => _.omit(mes, 'md')));
            var ferti_meses = _.mapValues(_.groupBy($scope.fertilizante_mes, 'md'),
                          clist => clist.map(mes => _.omit(mes, 'md')));
            
            
        for(var i in inse_meses) {
            
            var mergedCellA1D2 = sheet.mergedCellsRegions().add(0+y, 0, 1+y, 8);
            var mergedCellA3A4 = sheet.mergedCellsRegions().add(2+y, 0, 3+y, 0);
            var mergedCellB3C4 = sheet.mergedCellsRegions().add(2+y, 1, 2+y, 2);
            var mergedCellD3E4 = sheet.mergedCellsRegions().add(2+y, 3, 2+y, 4);
            var mergedCellF3G4 = sheet.mergedCellsRegions().add(2+y, 5, 2+y, 6);
            var mergedCellH3I4 = sheet.mergedCellsRegions().add(2+y, 7, 2+y, 8);

            // Add two large headers in merged cells above the data
            mergedCellA1D2.value(i);
            mergedCellA1D2.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            mergedCellA1D2.cellFormat().fill($.ig.excel.CellFill.createSolidFill('#ED7D31'));
            mergedCellA1D2.cellFormat().font().colorInfo(new $.ig.excel.WorkbookColorInfo($.ig.excel.WorkbookThemeColorType.light1));
            mergedCellA1D2.cellFormat().font().height(16 * 30);
            mergedCellA1D2.cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);

            mergedCellA3A4.value('Día');
            mergedCellA3A4.cellFormat().verticalAlignment($.ig.excel.VerticalCellAlignment.center);
            mergedCellA3A4.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            mergedCellB3C4.value('Insecticida');
            mergedCellB3C4.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            mergedCellD3E4.value('Fungicida');
            mergedCellD3E4.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            mergedCellF3G4.value('Fertilización Foliar');
            mergedCellF3G4.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            mergedCellH3I4.value('Fertilización Suelo');
            mergedCellH3I4.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            

            // Format some rows and columns that should have similar formatting so we don't have to set it on individual cells.
            sheet.rows(2+y).cellFormat().font().bold(true);
            sheet.columns(0).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);

            // Add a light color fill to all cells in the A3:G17 region to visually separate it from the rest of the sheet. We can iterate
            // all cells in the regions by getting an enumerator for the region and enumerating each item.
            var light1Fill = $.ig.excel.CellFill.createSolidFill(new $.ig.excel.WorkbookColorInfo($.ig.excel.WorkbookThemeColorType.light1));
            var cells = sheet.getRegion('A'+(y+3)+':I'+(y+37)).getEnumerator();
            while (cells.moveNext()) {
                cells.current().cellFormat().fill(light1Fill);
                cells.current().cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                
            }

            // Populate the sheet with data
            sheet.getCell('B'+(y+4)).value('Cantidad');
            sheet.getCell('C'+(y+4)).value('Costo');
            sheet.getCell('D'+(y+4)).value('Cantidad');
            sheet.getCell('E'+(y+4)).value('Costo');
            sheet.getCell('F'+(y+4)).value('Cantidad');
            sheet.getCell('G'+(y+4)).value('Costo');
            sheet.getCell('H'+(y+4)).value('Cantidad');
            sheet.getCell('I'+(y+4)).value('Costo');
            
            
            $n=5+y;
                for(j in inse_meses[i]) {
                    var obj = inse_meses[i][j];
                         sheet.getCell('A'+$n).value(obj['day']);
                         sheet.getCell('B'+$n).value(parseFloat(obj['cantidad']));
                         sheet.getCell('C'+$n).value(parseFloat(obj['costo']));
                         $n++;
                }

                  
            // Add a grand total which is bold and larger than the rest of the text to call attention to it.
            
            sheet.getCell('A'+(y+37)).value('Total');
            sheet.getCell('B'+(y+37)).applyFormula("=SUM(B"+(y+5)+":B"+(y+35)+")");
            sheet.getCell('C'+(y+37)).applyFormula("=SUM(C"+(y+5)+":C"+(y+35)+")");
            sheet.getCell('D'+(y+37)).applyFormula("=SUM(D"+(y+5)+":D"+(y+35)+")");
            sheet.getCell('E'+(y+37)).applyFormula("=SUM(E"+(y+5)+":E"+(y+35)+")");
            sheet.getCell('F'+(y+37)).applyFormula("=SUM(F"+(y+5)+":F"+(y+35)+")");
            sheet.getCell('G'+(y+37)).applyFormula("=SUM(F"+(y+5)+":F"+(y+35)+")");
            sheet.getCell('H'+(y+37)).applyFormula("=SUM(F"+(y+5)+":F"+(y+35)+")");
            sheet.getCell('I'+(y+37)).applyFormula("=SUM(F"+(y+5)+":F"+(y+35)+")");

            
            sheet.getCell('H'+(y+38)).value('TOTAL');
            sheet.getCell('H'+(y+38)).cellFormat().font().height(14 * 20);
            sheet.getCell('H'+(y+38)).cellFormat().font().bold(true);

            sheet.getCell('I'+(y+38)).applyFormula("=SUM(C"+(y+37)+"+E"+(y+37)+"+G"+(y+37)+"+I"+(y+37)+")");
            sheet.getCell('I'+(y+38)).cellFormat().font().height(14 * 20);
            sheet.getCell('I'+(y+38)).cellFormat().font().bold(true);
                        
           y=y+40;
        }
                        
            
        y=20;
        for(var i in fungi_meses) {
            $n=5+y;
            for(var j in fungi_meses[i]) {
                var obj = fungi_meses[i][j];
                    sheet.getCell('D'+$n).value(parseInt(obj['cantidad']));
                    sheet.getCell('E'+$n).value(parseInt(obj['costo']));
                    $n++;
            }
            y=y+40; 
        }
            
        y=20;
        for(var i in ferti_s_meses) {
            $n=5+y;
            for(var j in ferti_s_meses[i]) {
                var obj = ferti_s_meses[i][j];
                    sheet.getCell('H'+$n).value(parseFloat(obj['cantidad']));
                    sheet.getCell('I'+$n).value(parseFloat(obj['costo']));
                    $n++;
            }
            y=y+40; 
        }
            
        y=20;
        for(var i in ferti_meses) {
            $n=5+y;
            for(var j in ferti_meses[i]) {
                var obj = ferti_meses[i][j];
                    sheet.getCell('F'+$n).value(parseInt(obj['cantidad']));
                    sheet.getCell('G'+$n).value(parseInt(obj['costo']));
                    $n++;
            }
            y=y+40; 
        }
            

            
            
            //-------------------------Combustible Refacciones...-------------------------------
            var sheet = workbook.worksheets().add('Combustible y Refacciones');
            sheet.columns(0).setWidth(110, $.ig.excel.WorksheetColumnWidthUnit.pixel);


            // Add merged regions for regions A1:D2
            var mergedCellA1D2 = sheet.mergedCellsRegions().add(0, 0, 1, 5);
            var mergedCellA3A4 = sheet.mergedCellsRegions().add(2, 0, 3, 0);

            // Add two large headers in merged cells above the data
            mergedCellA1D2.value('Combustible y Refacciones');
            mergedCellA1D2.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            mergedCellA1D2.cellFormat().fill($.ig.excel.CellFill.createSolidFill('#ED7D31'));
            mergedCellA1D2.cellFormat().font().colorInfo(new $.ig.excel.WorkbookColorInfo($.ig.excel.WorkbookThemeColorType.light1));
            mergedCellA1D2.cellFormat().font().height(16 * 30);
            mergedCellA1D2.cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);

            mergedCellA3A4.value('Mes');
            mergedCellA3A4.cellFormat().verticalAlignment($.ig.excel.VerticalCellAlignment.center);
            mergedCellA3A4.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            
            sheet.getCell('B3').value('Diesel');
            sheet.getCell('C3').value('Gasolina');
            sheet.getCell('D3').value('Energía');
            sheet.getCell('E3').value('Refacciones');

            // Format some rows and columns that should have similar formatting so we don't have to set it on individual cells.
            sheet.rows(2).cellFormat().font().bold(true);
            sheet.columns(1).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(2).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(3).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(4).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(5).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            
            sheet.columns(1).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(2).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(3).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(4).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(5).setWidth(120, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            
            sheet.columns(1).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(2).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(3).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(4).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(5).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);

            // Add a light color fill to all cells in the A3:G17 region to visually separate it from the rest of the sheet. We can iterate
            // all cells in the regions by getting an enumerator for the region and enumerating each item.
            var light1Fill = $.ig.excel.CellFill.createSolidFill(new $.ig.excel.WorkbookColorInfo($.ig.excel.WorkbookThemeColorType.light1));
            var cells = sheet.getRegion('A3:F18').getEnumerator();
            while (cells.moveNext()) {
                cells.current().cellFormat().fill(light1Fill);
                cells.current().cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                
            }

            // Populate the sheet with data
            sheet.getCell('B4').value('Costo');
            sheet.getCell('C4').value('Costo');
            sheet.getCell('D4').value('Costo');
            sheet.getCell('E4').value('Costo');
            sheet.getCell('F3').value('Total');
            
            
            $n=5;
                for(i in $scope.gastos_var) {
                    var obj = $scope.gastos_var[i];
                         sheet.getCell('A'+$n).value(obj['md']);
                         sheet.getCell('B'+$n).value(parseInt(obj['disel']));
                         sheet.getCell('C'+$n).value(parseInt(obj['gasolina']));
                         sheet.getCell('D'+$n).value(parseInt(obj['energia']));
                         sheet.getCell('E'+$n).value(parseInt(obj['refacciones']));
                         $n++;
                }
                  
            // Add a grand total which is bold and larger than the rest of the text to call attention to it.
            sheet.getCell('F5').applyFormula("=SUM(B5:E5)");
            sheet.getCell('F6').applyFormula("=SUM(B6:E6)");
            sheet.getCell('F7').applyFormula("=SUM(B7:E7)");
            sheet.getCell('F8').applyFormula("=SUM(B8:E8)");
            sheet.getCell('F9').applyFormula("=SUM(B9:E9)");
            sheet.getCell('F10').applyFormula("=SUM(B10:E10)");
            sheet.getCell('F11').applyFormula("=SUM(B11:E11)");
            sheet.getCell('F12').applyFormula("=SUM(B12:E12)");
            sheet.getCell('F13').applyFormula("=SUM(B13:E13)");
            sheet.getCell('F14').applyFormula("=SUM(B14:E14)");
            sheet.getCell('F15').applyFormula("=SUM(B15:E15)");
            sheet.getCell('F16').applyFormula("=SUM(B16:E16)");
            
            sheet.getCell('A18').value('Total');
            sheet.getCell('B18').applyFormula("=SUM(B5:B16)");
            sheet.getCell('C18').applyFormula("=SUM(C5:C16)");
            sheet.getCell('D18').applyFormula("=SUM(D5:D16)");
            sheet.getCell('E18').applyFormula("=SUM(E5:E16)");
            sheet.getCell('F18').applyFormula("=SUM(F5:F16)");

            
            
            sheet.getCell('E19').value('TOTAL');
            sheet.getCell('E19').cellFormat().font().height(14 * 20);
            sheet.getCell('E19').cellFormat().font().bold(true);

            sheet.getCell('F19').applyFormula("=SUM(F5:F16)");
            sheet.getCell('F19').cellFormat().font().height(14 * 20);
            sheet.getCell('F19').cellFormat().font().bold(true);
                    

            
            var y=20;
            var gastos_var_meses = _.mapValues(_.groupBy($scope.gastos_var_mes, 'md'),
                          clist => clist.map(mes => _.omit(mes, 'md')));
            
            
        for(var i in gastos_var_meses) {

            // Add merged regions for regions A1:D2
            var mergedCellA1D2 = sheet.mergedCellsRegions().add(0+y, 0, 1+y, 5);
            var mergedCellA3A4 = sheet.mergedCellsRegions().add(2+y, 0, 3+y, 0);

            // Add two large headers in merged cells above the data
            mergedCellA1D2.value(i);
            mergedCellA1D2.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            mergedCellA1D2.cellFormat().fill($.ig.excel.CellFill.createSolidFill('#ED7D31'));
            mergedCellA1D2.cellFormat().font().colorInfo(new $.ig.excel.WorkbookColorInfo($.ig.excel.WorkbookThemeColorType.light1));
            mergedCellA1D2.cellFormat().font().height(16 * 30);
            mergedCellA1D2.cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);

            mergedCellA3A4.value('Día');
            mergedCellA3A4.cellFormat().verticalAlignment($.ig.excel.VerticalCellAlignment.center);
            mergedCellA3A4.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            
            sheet.getCell('B'+(3+y)).value('Disel');
            sheet.getCell('C'+(3+y)).value('Gasolina');
            sheet.getCell('D'+(3+y)).value('Energía');
            sheet.getCell('E'+(3+y)).value('Refacciones');

            // Format some rows and columns that should have similar formatting so we don't have to set it on individual cells.
            sheet.rows(2+y).cellFormat().font().bold(true);
            sheet.columns(0).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);

            // Add a light color fill to all cells in the A3:G17 region to visually separate it from the rest of the sheet. We can iterate
            // all cells in the regions by getting an enumerator for the region and enumerating each item.
            var light1Fill = $.ig.excel.CellFill.createSolidFill(new $.ig.excel.WorkbookColorInfo($.ig.excel.WorkbookThemeColorType.light1));
            var cells = sheet.getRegion('A'+(y+3)+':F'+(y+37)).getEnumerator();
            while (cells.moveNext()) {
                cells.current().cellFormat().fill(light1Fill);
                cells.current().cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                
            }

            // Populate the sheet with data
            sheet.getCell('B'+(y+4)).value('Costo');
            sheet.getCell('C'+(y+4)).value('Costo');
            sheet.getCell('D'+(y+4)).value('Costo');
            sheet.getCell('E'+(y+4)).value('Costo');
            sheet.getCell('F'+(y+3)).value('Total');
            
            
            $n=5+y;
                for(j in gastos_var_meses[i]) {
                    var obj = gastos_var_meses[i][j];
                         sheet.getCell('A'+$n).value(obj['day']);
                         sheet.getCell('B'+$n).value(parseInt(obj['disel']));
                         sheet.getCell('C'+$n).value(parseInt(obj['gasolina']));
                         sheet.getCell('D'+$n).value(parseInt(obj['energia']));
                         sheet.getCell('E'+$n).value(parseInt(obj['refacciones']));
                         $n++;
                }
                  
            
            for(var i=5; i<=35; i++){
                sheet.getCell('F'+(i+y)).applyFormula("=SUM(B"+(i+y)+":E"+(i+y)+")");
            }
            

            
            sheet.getCell('A'+(37+y)).value('Total');
            sheet.getCell('B'+(37+y)).applyFormula("=SUM(B"+(5+y)+":B"+(36+y)+")");
            sheet.getCell('C'+(37+y)).applyFormula("=SUM(C"+(5+y)+":C"+(36+y)+")");
            sheet.getCell('D'+(37+y)).applyFormula("=SUM(D"+(5+y)+":D"+(36+y)+")");
            sheet.getCell('E'+(37+y)).applyFormula("=SUM(E"+(5+y)+":E"+(36+y)+")");
            sheet.getCell('F'+(37+y)).applyFormula("=SUM(F"+(5+y)+":F"+(36+y)+")");

            
            
            sheet.getCell('E'+(38+y)).value('TOTAL');
            sheet.getCell('E'+(38+y)).cellFormat().font().height(14 * 20);
            sheet.getCell('E'+(38+y)).cellFormat().font().bold(true);

            sheet.getCell('F'+(38+y)).applyFormula("=SUM(F"+(5+y)+":F"+(36+y)+")");
            sheet.getCell('F'+(38+y)).cellFormat().font().height(14 * 20);
            sheet.getCell('F'+(38+y)).cellFormat().font().bold(true);
            y=y+40;
            
        }
            
            
            //-------------------------Riego Fert Poda...-------------------------------
            var sheet = workbook.worksheets().add('Riego - Fert - Poda');
            sheet.columns(0).setWidth(110, $.ig.excel.WorksheetColumnWidthUnit.pixel);

            // Add merged regions for regions A1:D2
            var mergedCellA1D2 = sheet.mergedCellsRegions().add(0, 0, 1, 7);
            var mergedCellA3A4 = sheet.mergedCellsRegions().add(2, 0, 3, 0);
            var mergedCellB3C4 = sheet.mergedCellsRegions().add(2, 1, 2, 2);

            // Add two large headers in merged cells above the data
            mergedCellA1D2.value('Riego - Fertilización Suelo - Poda');
            mergedCellA1D2.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            mergedCellA1D2.cellFormat().fill($.ig.excel.CellFill.createSolidFill('#ED7D31'));
            mergedCellA1D2.cellFormat().font().colorInfo(new $.ig.excel.WorkbookColorInfo($.ig.excel.WorkbookThemeColorType.light1));
            mergedCellA1D2.cellFormat().font().height(16 * 30);
            mergedCellA1D2.cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);

            mergedCellA3A4.value('Mes');
            mergedCellA3A4.cellFormat().verticalAlignment($.ig.excel.VerticalCellAlignment.center);
            mergedCellA3A4.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            mergedCellB3C4.value('Fertilización Suelo');
            mergedCellB3C4.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            sheet.getCell('D3').value('Riego');
            sheet.getCell('E3').value('Aplicación');
            sheet.getCell('F3').value('Desmamone');
            sheet.getCell('G3').value('Poda');

            // Format some rows and columns that should have similar formatting so we don't have to set it on individual cells.
            sheet.rows(2).cellFormat().font().bold(true);
            sheet.columns(2).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(3).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(4).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(5).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(6).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(7).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            
            sheet.columns(1).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(2).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(3).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(4).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(5).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(6).setWidth(90, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(7).setWidth(120, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            
            sheet.columns(1).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(2).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(3).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(4).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(5).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(6).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(7).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);

            // Add a light color fill to all cells in the A3:G17 region to visually separate it from the rest of the sheet. We can iterate
            // all cells in the regions by getting an enumerator for the region and enumerating each item.
            var light1Fill = $.ig.excel.CellFill.createSolidFill(new $.ig.excel.WorkbookColorInfo($.ig.excel.WorkbookThemeColorType.light1));
            var cells = sheet.getRegion('A3:H18').getEnumerator();
            while (cells.moveNext()) {
                cells.current().cellFormat().fill(light1Fill);
                cells.current().cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                
            }

            // Populate the sheet with data
            sheet.getCell('B4').value('Cantidad');
            sheet.getCell('C4').value('Costo');
            sheet.getCell('D4').value('Costo');
            sheet.getCell('E4').value('Costo');
            sheet.getCell('F4').value('Costo');
            sheet.getCell('G4').value('Costo');
            sheet.getCell('H3').value('Total');
            
            $n=5;
                for(i in $scope.fertilizante_suelo2) {
                    var obj = $scope.fertilizante_suelo2[i];
                         sheet.getCell('A'+$n).value(obj['md']);
                         sheet.getCell('B'+$n).value(parseInt(obj['cantidad']));
                         sheet.getCell('C'+$n).value(parseInt(obj['costo']));
                         $n++;
                }
            $n=5;
                for(i in $scope.riego2) {
                    var obj = $scope.riego2[i];
                         sheet.getCell('D'+$n).value(parseInt(obj['costo']));
                         $n++;
                }
            $n=5;
                for(i in $scope.gastos_var) {
                    var obj = $scope.gastos_var[i];
                         sheet.getCell('E'+$n).value(parseInt(obj['aplicacion']));
                         sheet.getCell('F'+$n).value(parseInt(obj['desmamone']));
                         sheet.getCell('G'+$n).value(parseInt(obj['poda']));
                         $n++;
                }
                  
            sheet.getCell('H5').applyFormula("=SUM(C5:G5)");
            sheet.getCell('H6').applyFormula("=SUM(C6:G6)");
            sheet.getCell('H7').applyFormula("=SUM(C7:G7)");
            sheet.getCell('H8').applyFormula("=SUM(C8:G8)");
            sheet.getCell('H9').applyFormula("=SUM(C9:G9)");
            sheet.getCell('H10').applyFormula("=SUM(C10:G10)");
            sheet.getCell('H11').applyFormula("=SUM(C11:G11)");
            sheet.getCell('H12').applyFormula("=SUM(C12:G12)");
            sheet.getCell('H13').applyFormula("=SUM(C13:G13)");
            sheet.getCell('H14').applyFormula("=SUM(C14:G14)");
            sheet.getCell('H15').applyFormula("=SUM(C15:G15)");
            sheet.getCell('H16').applyFormula("=SUM(C16:G16)");
            
            sheet.getCell('A18').value('Total');
            sheet.getCell('B18').applyFormula("=SUM(B5:B16)");
            sheet.getCell('C18').applyFormula("=SUM(C5:C16)");
            sheet.getCell('D18').applyFormula("=SUM(D5:D16)");
            sheet.getCell('E18').applyFormula("=SUM(E5:E16)");
            sheet.getCell('F18').applyFormula("=SUM(F5:F16)");
            sheet.getCell('G18').applyFormula("=SUM(G5:G16)");
            sheet.getCell('H18').applyFormula("=SUM(H5:H16)");

            
            
            sheet.getCell('G19').value('TOTAL');
            sheet.getCell('G19').cellFormat().font().height(14 * 20);
            sheet.getCell('G19').cellFormat().font().bold(true);

            sheet.getCell('H19').applyFormula("=SUM(H5:H16)");
            sheet.getCell('H19').cellFormat().font().height(14 * 20);
            sheet.getCell('H19').cellFormat().font().bold(true);
            
            
            
            
            var y=20;
            var riego_meses = _.mapValues(_.groupBy($scope.riego_mes, 'md'),
                          clist => clist.map(mes => _.omit(mes, 'md')));
            
            
        for(var i in riego_meses) {

            var mergedCellA1D2 = sheet.mergedCellsRegions().add(0+y, 0, 1+y, 7);
            var mergedCellA3A4 = sheet.mergedCellsRegions().add(2+y, 0, 3+y, 0);
            var mergedCellB3C4 = sheet.mergedCellsRegions().add(2+y, 1, 2+y, 2);

            // Add two large headers in merged cells above the data
            mergedCellA1D2.value(i);
            mergedCellA1D2.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            mergedCellA1D2.cellFormat().fill($.ig.excel.CellFill.createSolidFill('#ED7D31'));
            mergedCellA1D2.cellFormat().font().colorInfo(new $.ig.excel.WorkbookColorInfo($.ig.excel.WorkbookThemeColorType.light1));
            mergedCellA1D2.cellFormat().font().height(16 * 30);
            mergedCellA1D2.cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);

            mergedCellA3A4.value('Día');
            mergedCellA3A4.cellFormat().verticalAlignment($.ig.excel.VerticalCellAlignment.center);
            mergedCellA3A4.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            mergedCellB3C4.value('Fertilización Suelo');
            mergedCellB3C4.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            sheet.getCell('D'+(y+3)).value('Riego');
            sheet.getCell('E'+(y+3)).value('Aplicación');
            sheet.getCell('F'+(y+3)).value('Desmamone');
            sheet.getCell('G'+(y+3)).value('Poda');

            sheet.rows(2).cellFormat().font().bold(true);
            sheet.columns(0).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);

            var light1Fill = $.ig.excel.CellFill.createSolidFill(new $.ig.excel.WorkbookColorInfo($.ig.excel.WorkbookThemeColorType.light1));
            var cells = sheet.getRegion('A'+(y+3)+':H'+(y+37)).getEnumerator();
            while (cells.moveNext()) {
                cells.current().cellFormat().fill(light1Fill);
                cells.current().cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                
            }

            // Populate the sheet with data
            sheet.getCell('B'+(y+4)).value('Cantidad');
            sheet.getCell('C'+(y+4)).value('Costo');
            sheet.getCell('D'+(y+4)).value('Costo');
            sheet.getCell('E'+(y+4)).value('Costo');
            sheet.getCell('F'+(y+4)).value('Costo');
            sheet.getCell('G'+(y+4)).value('Costo');
            sheet.getCell('H'+(y+3)).value('Total');
            
            $n=5+y;
            for(var j in riego_meses[i]) {
                var obj = riego_meses[i][j];
                    sheet.getCell('A'+$n).value(parseInt(obj['day']));
                    sheet.getCell('D'+$n).value(parseInt(obj['costo']));
                    $n++;
            }
            
            for(var i=5; i<=35; i++){
                sheet.getCell('H'+(i+y)).applyFormula("=SUM(C"+(i+y)+":G"+(i+y)+")");
            }
                  
            
            sheet.getCell('A'+(37+y)).value('Total');
            sheet.getCell('B'+(37+y)).applyFormula("=SUM(B"+(5+y)+":B"+(36+y)+")");
            sheet.getCell('C'+(37+y)).applyFormula("=SUM(C"+(5+y)+":C"+(36+y)+")");
            sheet.getCell('D'+(37+y)).applyFormula("=SUM(D"+(5+y)+":D"+(36+y)+")");
            sheet.getCell('E'+(37+y)).applyFormula("=SUM(E"+(5+y)+":E"+(36+y)+")");
            sheet.getCell('F'+(37+y)).applyFormula("=SUM(F"+(5+y)+":F"+(36+y)+")");
            sheet.getCell('G'+(37+y)).applyFormula("=SUM(G"+(5+y)+":G"+(36+y)+")");
            sheet.getCell('H'+(37+y)).applyFormula("=SUM(H"+(5+y)+":H"+(36+y)+")");

            
            
            sheet.getCell('G'+(38+y)).value('TOTAL');
            sheet.getCell('G'+(38+y)).cellFormat().font().height(14 * 20);
            sheet.getCell('G'+(38+y)).cellFormat().font().bold(true);

            sheet.getCell('H'+(38+y)).applyFormula("=SUM(H"+(5+y)+":H"+(36+y)+")");
            sheet.getCell('H'+(38+y)).cellFormat().font().height(14 * 20);
            sheet.getCell('H'+(38+y)).cellFormat().font().bold(true);
            
            
            y=y+40; 
        }
            
            y=20;
            for(i in ferti_s_meses) {
                $n=5+y;
                for(j in ferti_s_meses[i]) {
                    var obj = ferti_s_meses[i][j];
                         sheet.getCell('A'+$n).value(obj['md']);
                         sheet.getCell('B'+$n).value(parseInt(obj['cantidad']));
                         sheet.getCell('C'+$n).value(parseInt(obj['costo']));
                         $n++;
                }
                y=y+40;
            }
            
            y=20;
            for(i in gastos_var_meses) {
                $n=5+y;
                for(j in gastos_var_meses[i]) {
                    var obj = gastos_var_meses[i][j];
                         sheet.getCell('E'+$n).value(parseInt(obj['aplicacion']));
                         sheet.getCell('F'+$n).value(parseInt(obj['desmamone']));
                         sheet.getCell('G'+$n).value(parseInt(obj['poda']));
                         $n++;
                }
                y=y+40;
            }

            
            
            var sheet = workbook.worksheets().add('Beneficio - Costo');
            sheet.columns(0).setWidth(110, $.ig.excel.WorksheetColumnWidthUnit.pixel);

            // Add merged regions for regions A1:D2
            var mergedCellA1D2 = sheet.mergedCellsRegions().add(0, 0, 0, 8);
            var mergedCellA2D2 = sheet.mergedCellsRegions().add(1, 0, 1, 8);
            var mergedCellA3A4 = sheet.mergedCellsRegions().add(2, 0, 3, 0);
            
            var fecha = new Date();
            var año2 = new Date($scope.parcela[0].fecha_plantacion);
            var edad = fecha.getFullYear()-año2.getFullYear();
            

            mergedCellA1D2.value("Costos de producción y cosecha de la parcela \r\n Hectáreas: "+$scope.parcela[0].hectareas+" - Árboles: "+$scope.parcela[0].arboles+ " - Marco Plant.: "+$scope.parcela[0].marco_plantacion+" - Edad: "+edad+" años");
            sheet.rows(0).height(1200);
            mergedCellA1D2.cellFormat().wrapText(true);
            mergedCellA1D2.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            mergedCellA1D2.cellFormat().fill($.ig.excel.CellFill.createSolidFill('#ED7D31'));
            mergedCellA1D2.cellFormat().font().colorInfo(new $.ig.excel.WorkbookColorInfo($.ig.excel.WorkbookThemeColorType.light1));
            mergedCellA1D2.cellFormat().font().height(16 * 28);
            mergedCellA1D2.cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            
            mergedCellA2D2.value('Balance Anual '+$scope.control_maleza[0].md+' a '+$scope.control_maleza[11].md);
            mergedCellA2D2.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            mergedCellA2D2.cellFormat().fill($.ig.excel.CellFill.createSolidFill('#ED7D31'));
            mergedCellA2D2.cellFormat().font().colorInfo(new $.ig.excel.WorkbookColorInfo($.ig.excel.WorkbookThemeColorType.light1));
            mergedCellA2D2.cellFormat().font().height(16 * 25);
            mergedCellA2D2.cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);

            mergedCellA3A4.value('Mes');
            mergedCellA3A4.cellFormat().verticalAlignment($.ig.excel.VerticalCellAlignment.center);
            mergedCellA3A4.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            
            sheet.getCell('B3').value('Rejas (Total)');
            sheet.getCell('C3').value('Kilos (Total)');
            sheet.getCell('D3').value('Subtotal ($)');
            sheet.getCell('E3').value('Gastos ($)');
            sheet.getCell('F3').value('Total ($)');
            sheet.getCell('G3').value('Aplicación ($)');
            sheet.getCell('H3').value('Insumos ($)');
            sheet.getCell('I3').value('Balance Mensual ($)');

            // Format some rows and columns that should have similar formatting so we don't have to set it on individual cells.
            sheet.rows(2).cellFormat().font().bold(true);
            sheet.columns(3).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(4).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(5).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(6).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(7).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(8).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            sheet.columns(9).cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            
            sheet.columns(1).setWidth(130, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(2).setWidth(130, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(3).setWidth(130, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(4).setWidth(130, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(5).setWidth(130, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(6).setWidth(130, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(7).setWidth(130, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(8).setWidth(130, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(9).setWidth(130, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            sheet.columns(10).setWidth(130, $.ig.excel.WorksheetColumnWidthUnit.pixel);
            
            sheet.columns(1).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(2).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(3).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(4).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(5).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(6).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(7).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(8).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(9).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.columns(10).cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);

            var light1Fill = $.ig.excel.CellFill.createSolidFill(new $.ig.excel.WorkbookColorInfo($.ig.excel.WorkbookThemeColorType.light1));
            var cells = sheet.getRegion('A3:I18').getEnumerator();
            while (cells.moveNext()) {
                cells.current().cellFormat().fill(light1Fill);
                cells.current().cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                
            }

            $n=5;
                for(i in $scope.prod_cos) {
                    var obj = $scope.prod_cos[i];
                         sheet.getCell('A'+$n).value(obj['md']);
                         sheet.getCell('B'+$n).value(parseFloat(obj['rejas_total']));
                         sheet.getCell('C'+$n).value(parseFloat(obj['kilos_total']));
                         sheet.getCell('D'+$n).value(parseFloat(obj['sub_total']));
                         $n++;
                }
            $n=5;
                for(i in $scope.gastos_cos) {
                    var obj = $scope.gastos_cos[i];
                        sheet.getCell('E'+$n).value(parseFloat(obj['CORTE'])+parseFloat(obj['ACARREO'])+parseFloat(obj['CARGA_DESCARGA']));
                         $n++;
                }
                  
            
                for (var i = 5; i <=16; i++) {
                    sheet.getCell('F'+i).applyFormula("=SUM(D"+i+"-E"+i+")");
                }                
            
                for (var i = 5; i <=16; i++) {
                    sheet.getCell('I'+i).applyFormula("=SUM(F"+i+"-G"+i+"-H"+i+")");
                }                
                var x=5;
                for (var i = 46; i <=57; i++) {
                    sheet.getCell('H'+x).applyFormula("=K"+i);
                    x++;
                }
            
                var x=5;
                for (var i = 27; i <=38; i++) {
                    sheet.getCell('G'+x).applyFormula("=J"+i);
                    x++;
                }
            
            
            sheet.getCell('A18').value('Total');
            sheet.getCell('B18').applyFormula("=SUM(B5:B16)");
            sheet.getCell('C18').applyFormula("=SUM(C5:C16)");
            sheet.getCell('D18').applyFormula("=SUM(D5:D16)");
            sheet.getCell('E18').applyFormula("=SUM(E5:E16)");
            sheet.getCell('F18').applyFormula("=SUM(F5:F16)");
            sheet.getCell('G18').applyFormula("=SUM(G5:G16)");
            sheet.getCell('H18').applyFormula("=SUM(H5:H16)");

            
            
            sheet.getCell('G19').value('Balance General');
            sheet.getCell('G19').cellFormat().font().height(14 * 20);
            sheet.getCell('G19').cellFormat().font().bold(true);

            sheet.getCell('I19').applyFormula("=SUM(I5:I16)");
            sheet.getCell('I19').cellFormat().font().height(14 * 20);
            sheet.getCell('I19').cellFormat().font().bold(true);
            
            
            
            // --------------------Costo de la labor o aplicación-------------------------------
            
            var mergedCellA24I24 = sheet.mergedCellsRegions().add(23, 0, 23, 9);
            var mergedCellA25A25 = sheet.mergedCellsRegions().add(24, 0, 25, 0);
            
            
            mergedCellA24I24.value('Costo de la labor o aplicación');
            mergedCellA24I24.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            mergedCellA24I24.cellFormat().fill($.ig.excel.CellFill.createSolidFill('#ED7D31'));
            mergedCellA24I24.cellFormat().font().colorInfo(new $.ig.excel.WorkbookColorInfo($.ig.excel.WorkbookThemeColorType.light1));
            mergedCellA24I24.cellFormat().font().height(16 * 25);
            mergedCellA24I24.cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);

            mergedCellA25A25.value('Mes');
            mergedCellA25A25.cellFormat().verticalAlignment($.ig.excel.VerticalCellAlignment.center);
            mergedCellA25A25.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            
            sheet.getCell('B25').value('Macheteada');
            sheet.getCell('C25').value('Aplic. Herb');
            sheet.getCell('D25').value('Aplic. Foliar');
            sheet.getCell('E25').value('Riego');
            sheet.getCell('F25').value('Q Chupones');
            sheet.getCell('G25').value('Poda');
            sheet.getCell('H25').value('Fer. Edafica');
            sheet.getCell('I25').value('Rastreo/Desvare');
            sheet.getCell('J25').value('Total');


            var light1Fill = $.ig.excel.CellFill.createSolidFill(new $.ig.excel.WorkbookColorInfo($.ig.excel.WorkbookThemeColorType.light1));
            var cells = sheet.getRegion('A25:J40').getEnumerator();
            while (cells.moveNext()) {
                cells.current().cellFormat().fill(light1Fill);
                cells.current().cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
                
            }

            $n=27;
                for(i in $scope.macheteo) {
                    var obj = $scope.macheteo[i];
                        sheet.getCell('B'+$n).value(parseInt(obj['costo']));
                        $n++;
                }
            $n=27;
                for(i in $scope.rastreo) {
                    var obj = $scope.rastreo[i];
                        sheet.getCell('I'+$n).value(parseInt(obj['costo']));
                        $n++;
                }
            
                  
            $n=27;
                for(i in $scope.riego2) {
                    var obj = $scope.riego2[i];
                        sheet.getCell('E'+$n).value(parseInt(obj['costo']));
                        $n++;
                }
            $n=27;
                for(i in $scope.gastos_var) {
                    var obj = $scope.gastos_var[i];
                        sheet.getCell('A'+$n).value(obj['md']);
                        sheet.getCell('F'+$n).value(parseInt(obj['desmamone']));
                        sheet.getCell('G'+$n).value(parseInt(obj['poda']));
                        $n++;
                }
            $n=27;
                for(i in $scope.a_foliar) {
                    var obj = $scope.a_foliar[i];
                        sheet.getCell('D'+$n).value(parseInt(obj['aplicacion']));
                        $n++;
                }
            $n=27;
                for(i in $scope.a_suelo) {
                    var obj = $scope.a_suelo[i];
                        sheet.getCell('H'+$n).value(parseInt(obj['aplicacion']));
                        $n++;
                }
            
            var x=5;
            for(var i=27; i<=38; i++){
                sheet.getCell('C'+i).applyFormula("='Control de Malezas'!D"+x);
                x++;
            }
            
            for(var i=27; i<=38; i++){
                sheet.getCell('J'+i).applyFormula("=SUM(B"+i+":I"+i+")");
            }
            
            sheet.getCell('A40').value('Total');
            sheet.getCell('B40').applyFormula("=SUM(B27:B38)");
            sheet.getCell('C40').applyFormula("=SUM(C27:C38)");
            sheet.getCell('D40').applyFormula("=SUM(D27:D38)");
            sheet.getCell('E40').applyFormula("=SUM(E27:E38)");
            sheet.getCell('F40').applyFormula("=SUM(F27:F38)");
            sheet.getCell('G40').applyFormula("=SUM(G27:G38)");
            sheet.getCell('H40').applyFormula("=SUM(H27:H38)");
            sheet.getCell('I40').applyFormula("=SUM(I27:I38)");

            
            
            sheet.getCell('I41').value('Total');
            sheet.getCell('I41').cellFormat().font().height(14 * 20);
            sheet.getCell('I41').cellFormat().font().bold(true);

            sheet.getCell('J41').applyFormula("=SUM(J27:J38)");
            sheet.getCell('J41').cellFormat().font().height(14 * 20);
            sheet.getCell('J41').cellFormat().font().bold(true);
            
            
            // --------------------Costo de insumos-------------------------------
            
            var mergedCellA24I24 = sheet.mergedCellsRegions().add(42, 0, 42, 10);
            var mergedCellA25A25 = sheet.mergedCellsRegions().add(43, 0, 44, 0);
            
            
            mergedCellA24I24.value('Costo de los Insumos');
            mergedCellA24I24.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            mergedCellA24I24.cellFormat().fill($.ig.excel.CellFill.createSolidFill('#ED7D31'));
            mergedCellA24I24.cellFormat().font().colorInfo(new $.ig.excel.WorkbookColorInfo($.ig.excel.WorkbookThemeColorType.light1));
            mergedCellA24I24.cellFormat().font().height(16 * 25);
            mergedCellA24I24.cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);

            mergedCellA25A25.value('Mes');
            mergedCellA25A25.cellFormat().verticalAlignment($.ig.excel.VerticalCellAlignment.center);
            mergedCellA25A25.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            
            
            sheet.getCell('B44').value('Diesel');
            sheet.getCell('C44').value('Gasolina');
            sheet.getCell('D44').value('Refacciones');
            sheet.getCell('E44').value('Energia');
            sheet.getCell('F44').value('Herbicida');
            sheet.getCell('G44').value('Insecticida');
            sheet.getCell('H44').value('Funguicida');
            sheet.getCell('I44').value('Fer. Foliar');
            sheet.getCell('J44').value('Fer. Edafica');
            sheet.getCell('K44').value('Total');


            var light1Fill = $.ig.excel.CellFill.createSolidFill(new $.ig.excel.WorkbookColorInfo($.ig.excel.WorkbookThemeColorType.light1));
            var cells = sheet.getRegion('A44:K59').getEnumerator();
            while (cells.moveNext()) {
                cells.current().cellFormat().fill(light1Fill);
                cells.current().cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
                cells.current().cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
                
            }

            $n=27;
                for(i in $scope.a_suelo) {
                    var obj = $scope.a_suelo[i];
                        sheet.getCell('H'+$n).value(parseInt(obj['aplicacion']));
                        $n++;
                }
            
            var x=5;
            for(var i=46; i<=57; i++){
                sheet.getCell('B'+i).applyFormula("='Combustible y Refacciones'!B"+x);
                sheet.getCell('C'+i).applyFormula("='Combustible y Refacciones'!C"+x);
                sheet.getCell('D'+i).applyFormula("='Combustible y Refacciones'!D"+x);
                sheet.getCell('E'+i).applyFormula("='Combustible y Refacciones'!E"+x);
                sheet.getCell('F'+i).applyFormula("='Control de Malezas'!C"+x);
                sheet.getCell('G'+i).applyFormula("='Ins - Fung - Fert'!C"+x);
                sheet.getCell('H'+i).applyFormula("='Ins - Fung - Fert'!E"+x);
                sheet.getCell('I'+i).applyFormula("='Ins - Fung - Fert'!G"+x);
                sheet.getCell('J'+i).applyFormula("='Ins - Fung - Fert'!I"+x);
                x++;
            }
            
            for(var i=46; i<=57; i++){
                sheet.getCell('K'+i).applyFormula("=SUM(B"+i+":J"+i+")");
            }
            

            sheet.getCell('A59').value('Total');
            sheet.getCell('B59').applyFormula("=SUM(B46:B57)");
            sheet.getCell('C59').applyFormula("=SUM(C46:C57)");
            sheet.getCell('D59').applyFormula("=SUM(D46:D57)");
            sheet.getCell('E59').applyFormula("=SUM(E46:E57)");
            sheet.getCell('F59').applyFormula("=SUM(F46:F57)");
            sheet.getCell('G59').applyFormula("=SUM(G46:G57)");
            sheet.getCell('H59').applyFormula("=SUM(H46:H57)");
            sheet.getCell('I59').applyFormula("=SUM(I46:I57)");
            sheet.getCell('J59').applyFormula("=SUM(J46:J57)");

            
            
            sheet.getCell('J60').value('Total');
            sheet.getCell('J60').cellFormat().font().height(14 * 20);
            sheet.getCell('J60').cellFormat().font().bold(true);

            sheet.getCell('K60').applyFormula("=SUM(K46:K57)");
            sheet.getCell('K60').cellFormat().font().height(14 * 20);
            sheet.getCell('K60').cellFormat().font().bold(true);
            
            var mergedCellB62D62 = sheet.mergedCellsRegions().add(61, 1, 61, 3);
            var mergedCellE62F62 = sheet.mergedCellsRegions().add(61, 4, 61, 5);
            
            
            mergedCellB62D62.value('Gastos Variables Anuales');
            mergedCellB62D62.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            mergedCellB62D62.cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            mergedCellB62D62.cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            mergedCellB62D62.cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            mergedCellB62D62.cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            mergedCellB62D62.cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            
            mergedCellE62F62.applyFormula("=K60");
            mergedCellE62F62.cellFormat().font().height(14 * 20);
            mergedCellE62F62.cellFormat().font().bold(true);
            mergedCellE62F62.cellFormat().alignment($.ig.excel.HorizontalCellAlignment.left);
            mergedCellE62F62.cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            mergedCellE62F62.cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            mergedCellE62F62.cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            mergedCellE62F62.cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            mergedCellE62F62.cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');

            
            sheet.getCell('B64').value('Aplicación');           sheet.getCell('B64').cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.getCell('B64').cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('B64').cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('B64').cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('B64').cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('B65').applyFormula("=J41");
            sheet.getCell('B65').cellFormat().font().height(14 * 20);
            sheet.getCell('B65').cellFormat().font().bold(true);
            sheet.getCell('B65').cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.getCell('B65').cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('B65').cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('B65').cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('B65').cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('B65').cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            
            sheet.getCell('C64').value('Insumos');
            sheet.getCell('C64').cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.getCell('C64').cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('C64').cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('C64').cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('C64').cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('C65').applyFormula("=K60");
            sheet.getCell('C65').cellFormat().font().height(14 * 20);
            sheet.getCell('C65').cellFormat().font().bold(true);
            sheet.getCell('C65').cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.getCell('C65').cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('C65').cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('C65').cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('C65').cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('C65').cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            
            sheet.getCell('D64').value('Gastos Cosecha');
            sheet.getCell('D64').cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.getCell('D64').cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('D64').cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('D64').cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('D64').cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('D65').applyFormula("=E18");
            sheet.getCell('D65').cellFormat().font().height(14 * 20);
            sheet.getCell('D65').cellFormat().font().bold(true);
            sheet.getCell('D65').cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.getCell('D65').cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('D65').cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('D65').cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('D65').cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('D65').cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            
            
            sheet.getCell('E64').value('Costo Total');
            sheet.getCell('E64').cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.getCell('E64').cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('E64').cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('E64').cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('E64').cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('E65').applyFormula("=B65+C65+D65");
            sheet.getCell('E65').cellFormat().font().height(14 * 20);
            sheet.getCell('E65').cellFormat().font().bold(true);
            sheet.getCell('E65').cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.getCell('E65').cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('E65').cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('E65').cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('E65').cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('E65').cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            
            
            sheet.getCell('E67').value('Costo/Ha');
            sheet.getCell('E67').cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.getCell('E67').cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('E67').cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('E67').cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('E67').cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('E68').applyFormula("=(E65/"+$scope.parcela[0].hectareas+")");
            sheet.getCell('E68').cellFormat().font().height(14 * 20);
            sheet.getCell('E68').cellFormat().font().bold(true);
            sheet.getCell('E68').cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.getCell('E68').cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('E68').cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('E68').cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('E68').cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('E68').cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            
            sheet.getCell('C67').value('Ton/Ha');
            sheet.getCell('C67').cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.getCell('C67').cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('C67').cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('C67').cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('C67').cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('C68').applyFormula("=(C18/"+$scope.parcela[0].hectareas+")/1000");
            sheet.getCell('C68').cellFormat().font().height(14 * 20);
            sheet.getCell('C68').cellFormat().font().bold(true);
            sheet.getCell('C68').cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.getCell('C68').cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('C68').cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('C68').cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('C68').cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('C68').cellFormat().formatString('0.00');            
          
            
            sheet.getCell('D67').value('Costo/Ton');
            sheet.getCell('D67').cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.getCell('D67').cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('D67').cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('D67').cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('D67').cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('D68').applyFormula("=E68/C68");
            sheet.getCell('D68').cellFormat().font().height(14 * 20);
            sheet.getCell('D68').cellFormat().font().bold(true);
            sheet.getCell('D68').cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.getCell('D68').cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('D68').cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('D68').cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('D68').cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('D68').cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');
            
            
            sheet.getCell('C70').value('Ganancia');
            sheet.getCell('C70').cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.getCell('C70').cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('C70').cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('C70').cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('C70').cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('C71').applyFormula("=I19");
            sheet.getCell('C71').cellFormat().font().height(14 * 20);
            sheet.getCell('C71').cellFormat().font().bold(true);
            sheet.getCell('C71').cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.getCell('C71').cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('C71').cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('C71').cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('C71').cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('C71').cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');           
            
            
            sheet.getCell('D70').value('Costo Total');
            sheet.getCell('D70').cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.getCell('D70').cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('D70').cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('D70').cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('D70').cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('D71').applyFormula("=E65");
            sheet.getCell('D71').cellFormat().font().height(14 * 20);
            sheet.getCell('D71').cellFormat().font().bold(true);
            sheet.getCell('D71').cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.getCell('D71').cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('D71').cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('D71').cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('D71').cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('D71').cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');           
            
            sheet.getCell('E70').value('B/C');
            sheet.getCell('E70').cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.getCell('E70').cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('E70').cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('E70').cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('E70').cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('E71').applyFormula("=C71/D71");
            sheet.getCell('E71').cellFormat().font().height(14 * 20);
            sheet.getCell('E71').cellFormat().font().bold(true);
            sheet.getCell('E71').cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.getCell('E71').cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('E71').cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('E71').cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('E71').cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('E71').cellFormat().formatString('0.00');            
            
            sheet.getCell('F70').value('Ganancia/Ha');
            sheet.getCell('F70').cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.getCell('F70').cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('F70').cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('F70').cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('F70').cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('F71').applyFormula("=C71/"+$scope.parcela[0].hectareas);
            sheet.getCell('F71').cellFormat().font().height(14 * 20);
            sheet.getCell('F71').cellFormat().font().bold(true);
            sheet.getCell('F71').cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.getCell('F71').cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('F71').cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('F71').cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('F71').cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('F71').cellFormat().formatString('$#,##0.00_);[Red]($#,##0.00)');            
            
            sheet.getCell('G70').value('Kg/Árbol');
            sheet.getCell('G70').cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.getCell('G70').cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('G70').cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('G70').cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('G70').cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('G71').applyFormula("=(C68*1000)/"+$scope.parcela[0].arboles);
            sheet.getCell('G71').cellFormat().font().height(14 * 20);
            sheet.getCell('G71').cellFormat().font().bold(true);
            sheet.getCell('G71').cellFormat().alignment($.ig.excel.HorizontalCellAlignment.center);
            sheet.getCell('G71').cellFormat().topBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('G71').cellFormat().bottomBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('G71').cellFormat().rightBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('G71').cellFormat().leftBorderStyle($.ig.excel.CellBorderLineStyle.thin);
            sheet.getCell('G71').cellFormat().formatString('0.00');            

            
            

            
            
            // Save the workbook
            guardarDocExcel(workbook, "expediente.xlsx");
        }

        function guardarDocExcel(workbook, name) {
            workbook.save({ type: 'blob' }, function (data) {
                saveAs(data, name);
            }, function (error) {
                alert('Error exporting: : ' + error);
            });
        }

}]);

app.filter('capitalize', function() {
  return function(input, scope) {
    if (input!=null)
    input = input.toString().toLowerCase();
    return input.substring(0,1).toUpperCase()+input.substring(1);
  }
});