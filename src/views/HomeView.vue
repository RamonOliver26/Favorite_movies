<template>
  <div class="home" >
    <div class="feature-card">
      <RouterLink to="/movie/tt3896198">
        <img src="../assets/Guardians-of-the-Galaxy-Vol.-3.png" alt="Guardians of the Galaxy Vol. 3" class="feature-img">
        <div class="detail">
          <h3>Guardians of  the Galaxy vol.3</h3>
          <p>Ainda se recuperando da perda de Gamora, Peter Quill reúne sua equipe para defender o universo e um dos seus – 
            uma missão que pode significar o fim dos Guardiões se não for bem-sucedida.</p>
        </div>
      </RouterLink>
    </div>

    <form @submit.prevent="SearchMovies()" class="search-box">
      <input type="text" placeholder="Qual seu filme favorito?" v-model="search">
      <input type="submit" value="Pesquisar">
    </form>

    <div class="movies-list">
      <div class="movie" v-for="movie in movies" :key="movie.imdbID">
        <!-- <div class="card">
            <a href="#" class="">
                <img class="favoritar" src="../assets/estrela.png" alt="estrela"/>
            </a>
        </div>   -->
        <RouterLink :to="'/movie/' + movie.imdbID" class="movie-link">
          <div class="product-image">
            <img :src="movie.Poster" alt="Movie Poster"/>
            <div class="type">{{ movie.Type }}</div>
          </div>
          <div class="detail">
            <p class="year">{{ movie.Year }}</p>
            <h3>{{ movie.Title }}</h3>
          </div>
        </RouterLink>
      </div> 

      <!-- <div id="pagination" hidden>
      <div class="first">&#171;</div>
      <div class="prev">&lt;</div>
      <div class="numbers">
        <div>1</div>
      </div>
      <div class="next">&gt;</div>
      <div class="last">&#187;</div>
      </div> -->
       
    </div>
  </div>
</template> 

<script>
  import { ref } from 'vue';
  import env from '@/env.js';
 

  export default{
    setup() {
      const search = ref("");
      const movies = ref([]);

      const SearchMovies = () => {
        if (search.value != ""){
          fetch(`https://www.omdbapi.com/?apikey=${env.apikey}&s=${search.value}`)
            .then(response => response.json())
            .then(data => {
            movies.value = data.Search;
            search.value = "";
            });
        } 
      }

      return{
        search,
        movies,
        SearchMovies
        
      }
    }
  }  
</script>

<style lang="scss">

.home{
  margin-left: 5%;
  margin-right: 5%;
  .feature-card{
    position: relative;

    .feature-img{
      display: block;
      width: 100%;
      height: 440px;
      object-fit: cover;
      border-radius: 11px;
      position: relative;
      z-index: 0;
    }

    .detail{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0,0.6);
      padding: 16px;
      z-index: 1;
      border-radius: 11px;

      h3{
        color: #fff;
        margin-bottom: 16px;
      }

      p{
        color: #fff;
      }


    }
  }

  .search-box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;

    input{
      display: block;
      appearance: none;
      border:none;
      background:none;

      &[type='text'] {
        width: 100%;
        color: #fff;
        background-color: #496583;
        font-size: 20px;
        padding: 10px 16px;
        border-radius: 8px;
        margin-bottom: 15px;
        transition: 0.4s;

        &::placeholder{
          color: #f3f3f3;
        }

        &:focus{
          box-shadow: 0px 3px 6px rgba(0,0,0,0.2);

        }
      }
      &[type="submit"]{
        width: 100%;
        max-width: 300px;
        background-color: #42B883;
        padding: 16px;
        border-radius: 8px;
        color: #fff;
        font-size: 20px;
        text-transform: uppercase;
        transition:0.4s;

        &:active{
          background-color: #3b8070;

        }

      }
    }
  }
  .favoritar {
    background: none; 
    cursor: pointer;
    font-size: 24px;
    color: red;
    width: 25px;
    position: relative;
    top: 38px;
    left: 7px;
    z-index: 1;
}
  .movies-list{
    display: flex;
    flex-wrap: wrap;
    margin: 0px 8px;

    .movie{
      max-width: 50%;
      flex: 1 1 50%;
      padding: 16px 8px;

      .movie-link{
        display:flex;
        flex-direction: column;
        height: 100%;

        .product-image{
          position: relative;
          display: block;

          img{
            display: block;
            width: 100%;
            height: 275px;
            object-fit: cover;
            border-radius: 8px 8px 0px 0px;
          }
          .type{
            position:absolute;
            padding: 8px 16px;
            background-color: #42b883;
            color: #fff;
            bottom:16px;
            left: 0px;
            text-transform: capitalize;
          }
        }
        .detail{
          background-color: #496583;
          padding: 16px 8px;
          flex: 1 1 100%;
          border-radius: 0px 0px 8px 8px;

          .year{
            color:#AAA;
            font-size: 14px;
          }

          h3{
            color:#fff;
            font-weight:600;
            font-size: 18px;

          }
        }
      }

    }
  }
}
</style>
