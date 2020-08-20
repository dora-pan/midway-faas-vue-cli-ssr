<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>Data From FaaS:</h2>
    <h3 v-show="typeof faaSData == 'string'">{{ faaSData }}</h3>
    <div
      v-show="typeof faaSData != 'string'"
      v-for="(item, d) in faaSData"
      :key="d + ''"
    >
      {{ item.name }} : {{ item.info }}
    </div>
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
    axios.get("/api/list", {}).then((res) => {
      console.log("About---[axios]");
      this.faaSData = res.data.list;
    });
  },
};
</script>

<style scoped></style>
