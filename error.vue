<script setup>
definePageMeta({
  layout: 'login'
});

const countNum = ref(5);
const timer = ref(null);

function countTimer () {
  timer.value = setInterval(() => {
    if (countNum.value > 1) {
      countNum.value -= 1;
    } else {
      clearInterval(timer.value);

      const router = useRouter();
      router.push('/');
    }
  }, 1000);
}

onMounted(() => {
  countTimer();
});

onBeforeUnmount(() => {
  clearInterval(timer.value);
});
</script>

<template>
  <section class="w-full min-h-screen flex-center flex-col">
    <img src="/images/error/404.svg" class="w-90% md:w-1/3">
    <p class="text-24px">
      OOPS!! 來錯地方囉!!<br> 將在 <span class="fw-800 text-28px">{{ countNum }}</span> 秒後跳轉至首頁
    </p>
  </section>
</template>
