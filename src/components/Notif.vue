<template>
  <div class='modal'>
    <div class='notif'>
      <div class='title'>
        {{ message }}
      </div>
      <div class='nav'>
        x
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
  .modal{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    padding: 20px;
    z-index: 2;
  }

  .modal .notif{
    width: 25%;
    position: absolute;
    background-color: #00ff00;
    border-radius: 10px;
    padding: 20px;
    font-weight: bold;
    box-sizing: border-box;
    box-shadow: 0px 4px 8px 0px #f5f5f0;
    bottom: 60;
    right: 60;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
