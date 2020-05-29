<template>
  <div>
    <div style="padding: 100px 0;">
      <p>プロトタイプ(簡易版)</p>

    <router-link to="/Padoa" tag="button" style="background: skyblue; margin-right: 10px; padding: 10px;">パドゥア尺度</router-link>
    <router-link to="/Bocs" tag="button" style="background: pink; padding: 10px;" >Y-BOCS</router-link>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>
