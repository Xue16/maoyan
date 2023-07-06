<template>
    <div class="movie-list">
        <MovieList :movie-list="movieList"></MovieList>
    </div>
</template>

<script>
import MovieList from '@/components/MovieList'
export default {
    name:'',
    props:{
     movieList:[]
    },
    components:{
        MovieList
    },
}

</script>
<style scoped>

</style>