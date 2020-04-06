<template>
  <container>
    <nuxt />
  </container>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  background-image: url('/wood_bg.png');
}

.vfg-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
}

ul {
  padding: 0;
  text-align: left;
  list-style: none;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.v-select {
  background: #e5dec1;
  border-radius: 5px;
}

.vs__selected {
  background-color: #ded5ac !important;
  color: #86521d !important;
}

button {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #86521d;
  color: #86521d;
  background: #e5dec1;
  text-decoration: none;
  padding: 10px 30px;
  transition: 0.3s;
}

@media only screen and (max-width: 600px) {
  button {
    width: 100%;
    margin-top: 0.8rem;
  }
}

button:hover {
  cursor: pointer;
  transition: 0.3s;
  background: #86521d;
  color: #e5dec1;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
