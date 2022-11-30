const API = "https://api.github.com/users/";
const apps = Vue.createApp({
    
    data(){
        return {
            busqueda: "",
            result:null,
            error:null,
            favoritos: new Map(),
            show: true,
            tiempoMaxEspera: 20000,
            prendido: false
        }
    },
    computed: {
        esFavorito(){
            var resp =  this.favoritos.has(this.result.login);
            return resp;
        },
        misFavoritos(){
            let resp = Array.from(this.favoritos.values());
            return resp;
        }
    },
    methods: {
        search(){
            const self = this;
            this.result = this.error = null;

            const favoritoExistente = this.favoritos.get(this.busqueda.toLowerCase());

            //preguntamos si encontramos el usuario
            if(!!favoritoExistente) {
                const { ultimaBusqueda } = favoritoExistente;
                let actualizar =  this.deboActualizar(ultimaBusqueda);

                //si esta actualizado
                if (actualizar == false){
                    this.result = favoritoExistente;
                    return;
                }            
            }

            $.ajax({
                url: API + self.busqueda,
                method: 'GET',
            }).done(function (data){
                self.result = data;
                if(!!favoritoExistente) {
                    favoritoExistente.ultimaBusqueda = Date.now()
                }
            }).fail (function (){
                self.error = "No se encontro el usuario"
            })
            
        },
        deboActualizar(ultimaBusqueda) {
            var now = Date.now();
            var diferencia = (now - ultimaBusqueda)> this.tiempoMaxEspera
            return diferencia;
        },
        aumentarValor(){
           this.contador++;
        },
        addFavoritos(){
            // aca seteamos y creamos el valor ultima busqueda
            this.result.ultimaBusqueda = Date.now();
            this.favoritos.set(this.result.login.toLowerCase(), this.result);
            this.actualizarStorage();
        },
        quitarFavorito(){
            this.favoritos.delete(this.result.login.toLowerCase());
            this.actualizarStorage();
        },
        actualizarStorage(){
            localStorage.setItem('favoritos', JSON.stringify(this.misFavoritos));
        },
        mostrarFavorito(favorito){
            this.result = null;
            setTimeout( n=> {
                this.result = favorito;
            },500);
        },
        verificarFavorito(login){
           let resp =  this.result?.login == login;
          return this.result?.login == login;
        }      
    },
    beforeCreate(){

    },
    created(){
       const favoritosGuardados = JSON.parse(localStorage.getItem('favoritos'));       
       if (favoritosGuardados?.length){
            var favoritos = new Map(favoritosGuardados.map(fav => [fav.login, fav]))
            this.favoritos = favoritos;
       }
    },
    beforeMount(){

    },
    mounted(){
  
    }
})
