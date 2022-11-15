const API = "https://api.github.com/users/";


const apps = Vue.createApp({
    data(){
        return {
            busqueda: "",
            result:null,
            error:null,
            favoritos: new Map(),
        }
    },
    computed: {
        esFavorito(){
            return this.favoritos.has(this.result.login)
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
           
            $.ajax({
                url: API + self.busqueda,
                method: 'GET',
            }).done(function (data){
                self.result = data;
            }).fail (function (){
                self.error = "No se encontro el usuario"
            })
        },
        aumentarValor(){
           this.contador++;
        },
        addFavoritos(){
            this.favoritos.set(this.result.login, this.result);
        },
        quitarFavorito(){
            this.favoritos.delete(this.result.login);
        }
    }
})