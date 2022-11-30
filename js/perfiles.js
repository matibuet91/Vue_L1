apps.component('perfiles',{
    props: ['favorito','resultado'],
    methods:{
        quitarFavorito(){
            this.$emit('quitar-favorito')
        },
        addFavoritos(){
            this.$emit('add-favorito');
        }
    },
    template: /*html*/ `
        <div class="result">
            <a v-if="favorito" href="#" class="result__toggle-favorite" @click="quitarFavorito">Quitar Favorito ⭐️</a>
            <a v-else href="#" class="result__toggle-favorite" @click="addFavoritos">Añadir Favorito ⭐️</a>
            <h2 class="result__name">{{resultado.name}}</h2>
            <img :src="resultado.avatar_url" alt="" class="result__avatar">
                <p class="result__bio">{{resultado.bio}}
                    <br>
                    <a :href="resultado.blog" target="_blank" class="result__blog">Blog</a>
                </p>
        </div>
    `
})