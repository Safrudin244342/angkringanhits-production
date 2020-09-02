<template>
  <div id="app">
    <AppHeader />
    <main>
      <AppNav />
      <section class='main'>
        <article class='listFood'>

        </article>
        
        <section class='listOrder'>

        </section>
      </section>
    </main>
  </div>
</template>

<script>
import AppHeader from './components/Header'
import AppNav from './components/Nav'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppNav
  }
}
</script>

<style>
  main{
    display: flex;
  }

  main section.main{
    margin-top: 80px;
    display: flex;
    margin-left: auto;
    flex: 1;
    justify-content: center;
  }

  main section .listFood{
    margin-left: 70px;
    margin-right: 30%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 10px;
    flex: 1;
    background-color: rgba(190, 195, 202, 0.3);
    width: 300px;
    min-height: 500px;
  }

  main section .listOrder{
    background-color: white;
    position: fixed;
    display: flex;
    margin-left: 70%;
    width: 30%;
    height: 100%;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  }
</style>
