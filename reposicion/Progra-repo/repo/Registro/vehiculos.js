Vue.component('vehiculo', {
    data: () => {
        return {
            buscar: '',
            vehiculos: [],
            vehiculo: {
                accion: 'nuevo',
                mostrar_msg: false,
                msg: '',
                idVehiculo: '',
                marca: '',
                modelo: '',
                año: '',
                num_motor: '',
                num_chasis: ''
            }
        }
    },
    methods: {
        buscandovehiculo() {
            this.obtenervehiculos(this.buscar);
        },
        eliminarvehiculo(vehiculo) {
            if (confirm(`Esta seguro de eliminar el vehiculo ${vehiculo.marca}?`)) {
                this.vehiculo.accion = 'eliminar';
                this.vehiculo.idvehiculo = vehiculo.idVehiculo;
                this.guardarvehiculo();
            }
            this.nuevovehiculo();
        },
        modificarvehiculo(datos) {
            this.vehiculo = JSON.parse(JSON.stringify(datos));
            this.vehiculo.accion = 'modificar';
        },
        guardarvehiculo() {
            this.obtenervehiculos();
            let vehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];
            if (this.vehiculo.accion == "nuevo") {
                this.vehiculo.idvehiculo = generarIdUnicoFecha();
                vehiculos.push(this.vehiculo);
            } else if (this.vehiculo.accion == "modificar") {
                let index = vehiculos.findIndex(vehiculo => vehiculo.idvehiculo == this.vehiculo.idvehiculo);
                vehiculos[index] = this.vehiculo;
            } else if (this.vehiculo.accion == "eliminar") {
                let index = vehiculos.findIndex(vehiculo => vehiculo.idvehiculo == this.vehiculo.idVehiculo);
                vehiculos.splice(index, 1);
            }
            localStorage.setItem('vehiculos', JSON.stringify(vehiculos));
            this.nuevovehiculo();
            this.obtenervehiculos();
            this.vehiculo.msg = 'vehiculo procesado con exito';
        },
        obtenervehiculos(valor = '') {
            this.vehiculos = [];
            let vehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];
            this.vehiculos = vehiculos.filter(vehiculo => vehiculo.marca.toLowerCase().indexOf(valor.toLowerCase()) > -1);
        },
        nuevovehiculo() {
            this.vehiculo.accion = 'nuevo';
            this.vehiculo.msg = '';
            this.vehiculo.idvehiculo = '';
            this.vehiculo.marca = '';
            this.vehiculo.modelo = '';
            this.vehiculo.año = '';
            this.vehiculo.num_motor = '';
            this.vehiculo.num_chasis = '';
        }
    },
    created() {
        this.obtenervehiculos();
    },
    template: `
        <div id="appCiente">
            <div class="card  text-white" id="carvehiculo">
                <div class="card-header bg-success">
                <img src="/Progra-repo/repo/Registro/images/iconvehiculo.png" height="30px">
                    Registro de vehiculo
                    

                    <button type="button" class="btn-close text-end" data-bs-dismiss="alert" data-bs-target="#carvehiculo" aria-label="Close"></button>
                </div>
                <div class="card-body text-dark ">
                    <form method="post" @submit.prevent="guardarvehiculo" @reset="nuevovehiculo">
                        <div class="row p-1">
                            <div class="col col-md-2">Marca:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese la marca" v-model="vehiculo.marca"  required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Modelo:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese el modelo" v-model="vehiculo.modelo"  required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">año:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese año" v-model="vehiculo.año" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Número de Motor:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese el número del motor" v-model="vehiculo.num_motor" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Número de chasis:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese el numeor de chasis" v-model="vehiculo.num_chasis" required class="form-control">
                            </div> 
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-5 text-center">
                                <div v-if="vehiculo.mostrar_msg" class="alert alert-info alert-dismissible fade show" role="alert">
                                    {{ vehiculo.msg }}
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                        <div class="row m-2">
                            <div class="col col-md-5 text-center">
                                <input class="btn btn-success" type="submit" value="Guardar">
                                <input class="btn btn-warning" type="reset" value="Nuevo">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="card text-white" id="carBuscarvehiculo">
                
                <div class="card-header bg-success">
                    Busqueda de vehiculos

                    <button type="button" class="btn-close" data-bs-dismiss="alert" data-bs-target="#carBuscarvehiculo" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th colspan="7">
                                <img src="/Progra-repo/repo/Registro/images/lupaicon.png" height="30px">
                                    Buscar: <input @keyup="buscandovehiculo" v-model="buscar" placeholder="buscar aqui" class="form-control" type="text" >
                                </th>
                            </tr>
                            <tr>
                                <th>MARCA</th>
                                <th>MODELO</th>
                                <th>AÑO</th>
                                <th>NUM_MOTOR</th>
                                <th>NUM_CHASIS</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in vehiculos" @click='modificarvehiculo( item )' :key="item.idvehiculo">
                                <td>{{item.marca}}</td>
                                <td>{{item.modelo}}</td>
                                <td>{{item.año}}</td>
                                <td>{{item.num_motor}}</td>
                                <td>{{item.num_chasis}}</td>
                                <td>
                                    <button class="btn btn-danger" @click="eliminarvehiculo(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
});