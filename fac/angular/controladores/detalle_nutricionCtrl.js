var app = angular.module('coeplimApp.detalle_nutricionCtrl', []);

app.controller('detalle_nutricionCtrl', ['$scope', '$http', '$routeParams', 'Nutricion', 'Notification', 'TipoInsumo', 'Insumos', function ($scope, $http, $routeParams, Nutricion, Notification, TipoInsumo, Insumos) {

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.format = 'dd-MMMM-yyyy';

    $scope.popup1 = {
        opened: false
    };

    var id = $routeParams.id;

    $scope.nutricion = {};
    $scope.Bsuelo = false;
    $scope.detalle = {};

    $scope.errorParc = false;
    $scope.errorCant = false;
    $scope.errorPlant = false;
    $scope.error = false;
    $scope.errorInsumo = false;
    $scope.errorFecha = false;
    $scope.errorRejilla = false;
    $scope.errorMetodo = false;

    $scope.tipo_insumos = {};
    TipoInsumo.all().then(function () {
        $scope.tipo_insumos = TipoInsumo;
    });

    $scope.getInsumos = function (parametro) {
        $scope.insumos = {};
        TipoInsumo.categoria(parametro).then(function () {
            $scope.insumos = TipoInsumo;
        });
    };

    function buscar() {
        for (var i = 0; i < $scope.insumos.insumos.length; i++) {
            if ($scope.nutricion.id_insumo == $scope.insumos.insumos[i].id_insumo) {
                $scope.nutricion.nombre_com = $scope.insumos.insumos[i].nombre_com;
            }
        }
    }

    if (!isNaN(id)) {
        Nutricion.getNutricion(id).then(function () {
            $scope.nutricion = Nutricion.nutricion;

            if ($scope.nutricion == undefined || Nutricion.nutricion == '') {
                window.location = '#/nutricions';
                return;
            }
            if ($scope.nutricion.tipo_aplicacion == 'SUELO') {
                $scope.Bsuelo = true;
            } else {
                $scope.Bsuelo = false;
            }
        });

        Nutricion.detalleNutricion(id).then(function () {
            $scope.detalle = Nutricion.detalleNut;
        });

    } else {
        window.location = '#/nutricions';
        return;
    }

    $scope.detalle = [];
    var x = 0;
    var cant = 0;
    $scope.agregar = function (nutricion) {
        $scope.encontrado = false;
        if (isNaN($scope.nutricion.cantidad) != true && $scope.nutricion.cantidad > 0) {
            if (isNaN($scope.nutricion.cant_planta) != true && $scope.nutricion.cant_planta > 0) {
                if ($scope.nutricion.id_insumo != undefined) {
                    if ($scope.nutricion.medida != undefined) {
                        if ($scope.nutricion.metodo != undefined) {
                            for (var i = 0; i < $scope.detalle.length; i++) {
                                if ($scope.nutricion.id_insumo == $scope.detalle[i].id_insumo) {
                                    $scope.encontrado = true;
                                    break;
                                }
                            }
                            if (!$scope.encontrado) {
                                buscar();
                                $scope.detalle.push(nutricion);
                                Nutricion.agregar_det(nutricion).then(function () {
                                    if (Nutricion.err) {
                                        Notification.error({
                                            message: 'No es posible agregar el registro, por favor inténtelo nuevamente.',
                                            title: 'Ocurrió un error',
                                            delay: 3000
                                        });
                                    } else {
                                        Notification.clearAll();
                                        Notification.success({
                                            message: 'Nutrición agregada correctamente.',
                                            title: 'Registro insertado',
                                            delay: 3000
                                        });
                                    }
                                });
                                $scope.nutricion = {};
                                $scope.insumos = {};

                                $scope.errorCant = false;
                                $scope.errorPlanta = false;
                                $scope.errorMedida = false;
                                $scope.errorInsumo = false;
                                $scope.error = false;
                                $scope.errorMetodo = false;
                            } else {
                                setTimeout(function () {
                                    $scope.encontrado = false;
                                    $scope.$apply();
                                }, 5000);
                            }
                        } else {
                            $scope.errorMetodo = true;
                            setTimeout(function () {
                                $scope.errorMetodo = false;
                                $scope.$apply();
                            }, 5000);
                        }
                    } else {
                        $scope.errorMedida = true;
                        setTimeout(function () {
                            $scope.errorMedida = false;
                            $scope.$apply();
                        }, 5000);
                    }
                } else {
                    $scope.errorInsumo = true;
                    setTimeout(function () {
                        $scope.errorInsumo = false;
                        $scope.$apply();
                    }, 5000);
                }
            } else {
                $scope.errorPlanta = true;
                setTimeout(function () {
                    $scope.errorPlanta = false;
                    $scope.$apply();
                }, 5000);
            }
        } else {
            $scope.errorCant = true;
            setTimeout(function () {
                $scope.errorCant = false;
                $scope.$apply();
            }, 5000);
        }
    }

    $scope.eliminarConfirm = function () {
        $scope.eliminando = true;
        $scope.nTitle = "¿Realmente quiere eliminar la cosecha?";
        $scope.nTitle2 = "Los datos se eliminarán para siempre";
        Notification.success({
            message: "Datos de Cosecha a eliminar:",
            templateUrl: "custom_template.html",
            scope: $scope,
            delay: null,
            closeOnClick: false,
            positionX: "right",
            positionY: "bottom",
            replaceMessage: true
        });
    };

    $scope.close_noti = function () {
        $scope.eliminando = false;
        Notification.clearAll();
    };


    $scope.eliminarNutricion = function () {
        Nutricion.eliminar_nutricion(id).then(function () {
            if (Nutricion.err) {
                $scope.error = true;
                Notification.error({
                    message: 'No es posible eliminar el registro, por favor inténtelo nuevamente.',
                    title: 'Ocurrió un error',
                    delay: 2000
                });

                window.location = '#/nutricions';
            } else {
                $scope.eliminado = true;
                Notification.clearAll();
                Notification.success({
                    message: 'Nutrición eliminada correctamente.',
                    title: 'Registro borrado',
                    delay: 3000
                });

                window.location = '#/nutricions';
            }
        });
    };

    $scope.eliminarDet = function (det, id) {

        Nutricion.eliminar_det_nut(det).then(function () {
            if (Nutricion.err) {
                Notification.error({
                    message: 'Ocurrió un error al borrar el registro. Por favor inténtelo nuevamente.',
                    delay: 4000
                });
            } else {
                $scope.detalle.splice(id, 1);
                Notification.success({
                    message: 'Nutrición eliminada correctamente.',
                    delay: 4000
                });
            }
        });

    };
	}]);
