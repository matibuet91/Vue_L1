const API = "https://api.github.com/users/";


const apps = Vue.createApp({
    data(){
        return {
            busqueda: "",
            result:null,
            error:null,
            favoritos: new Map(),
            pruebas: [
                {key:0, name:"mati"}, 
                {key:1, name:'otro'}
            ],
            numeros:[
                1,2,3,4,6,7
            ]
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
            this.actualizarStorage();
        },
        quitarFavorito(){
            this.favoritos.delete(this.result.login);
            this.actualizarStorage();
        },
        actualizarStorage(){
            localStorage.setItem('favoritos', JSON.stringify(this.misFavoritos));
        },
        mostrarFavorito(favorito){
            this.result = favorito;

        }

    },
    beforeCreate(){
        console.log('beforeCreate');
    },
    created(){
       const favoritosGuardados = JSON.parse(localStorage.getItem('favoritos'));       
       if (favoritosGuardados.length){
            var favoritos = new Map(favoritosGuardados.map(fav => [fav.login, fav]))
            this.favoritos = favoritos;
       }
    },
    beforeMount(){
        console.log('beforeMount');
    },
    mounted(){
        console.log('mounted');
        var items =  $('#tt').html();
        for (let index = 0; index < this.pruebas.length; index++) {  
            items = items + '<li>' + this.pruebas[index].name  + '</li>'
        }
        $('#tt').html(items);

    }
})