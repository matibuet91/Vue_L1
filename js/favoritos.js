apps.component('favoritos',{
    props: ['misFavoritos'],
    methods: {
        mostrarFavorito(fvt){
            this.$emit('mostrar-favorito', fvt )
        }
    },
    template: /*html*/
    `<transition-group name="list">
        <div  class="favorite" v-for="fvt in misFavoritos" :key="fvt.login">
            <a :href="fvt.blog" target="_blank" @click.prevent="mostrarFavorito(fvt)">
                <img :src="fvt.avatar_url" alt="" class="result__avatar">
            </a>
        </div>
    </transition-group>`
})