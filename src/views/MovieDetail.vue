<template>
    <router-link to="/"><img class="voltar" src="../assets/casa1.png" alt="voltar"></router-link>

        <div class="movie-detail">
            <h2>{{ movie.Title }}</h2>
            <p>{{ movie.Year }}</p>
            <img :src="movie.Poster" alt="Movie Poster" class="featured-img" />
            <p>{{ movie.Plot }}</p>
        </div>
</template>

<script>
import{ref, onBeforeMount } from  'vue';
import{ useRoute } from 'vue-router';
import env from '@/env.js';

export default{
    setup () {
        const movie = ref({});
        const route = useRoute();

        onBeforeMount(() => {
            fetch(`https://www.omdbapi.com/?apikey=${env.apikey}&i=${route.params.id}&plot=full`)
            .then(response => response.json()
            .then(data => {
                movie.value = data;
            }));
        });

        return{
            movie
        }
    }
}
</script>

<style lang="scss">
.voltar{
    width: 23px;
    margin-left: 17px;
    position: absolute;
    top: 14px;
}
.movie-detail{
    padding: 16px;
    text-align: -webkit-center;
    margin-left: 5%;
    margin-right: 5%;
    
    h2{
        color: #fff;
        font-size: 28px;
        font-weight: 600;
        margin-bottom: 16px;
    }
    .featured-img{
        display: block;
        margin-bottom:16px;
    }
    p{
        color: #fff;
        font-size: 18px;
        line-height: 1.4;
    }
}
</style>