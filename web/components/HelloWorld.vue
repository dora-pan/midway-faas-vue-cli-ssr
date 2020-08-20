<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ faaSData }}</h2>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      faaSData: "Getting data from FaaS...",
    };
  },
  mounted() {
    axios.get("/api/detail", {}).then((res) => {
      console.log("HelloWorld---[axios]");
      this.faaSData = res.data.message;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
