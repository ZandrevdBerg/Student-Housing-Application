<script>

</script>


<template>
    <div>
    <input class="SearchBarContainer" type="text" placeholder="Search City,University or Province..." v-model="text">
    <button class="SearchButton">Search</button>
    </div>
</template>

<style>

.SearchBarContainer {
    cursor: text;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 16px;
    /* border: 3px solid #195055; */
    border: none;
    background: white url("./assets/search-svgrepo-com.svg") no-repeat;
    background-size: 35px;
    background-position: center left;
    border-radius: 60px;
    width: 800px;
    padding: 20px 20px 20px 35px;
    outline: none;
}

.SearchButton {
    cursor: pointer;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 16px;
    font-weight: 300;
    color: #FFFFFF;
    background-color: rgba(85,30,25,1);
    /* border: 3px solid rgba(85,30,25,1); */
    border: none;
    border-radius: 60px;
    padding: 20px 25px 20px 35px;
    margin-left: -110px;
    outline: none;
    transition: all 0.3s ease 0s;

}

.SearchButton:hover {
    background-color: #195055;
}
</style>
