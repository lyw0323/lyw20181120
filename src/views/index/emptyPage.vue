<template>
    <div>
        <!-- 用于刷新不白屏,创建的空文件误删 -->
    </div>
</template>
<script>
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$router.replace(from.path)
    })
  }
}
</script>
