<script lang="ts" setup>
definePageMeta({
  middleware: ['auth']
});

const { FETCH_AUTH } = useApi();
const { $swal } = useNuxtApp();

const user = ref({
  username: '',
  password: ''
});

async function login () {
  if (!user.value.username || !user.value.password) {
    $swal.fire({
      icon: 'warning',
      iconColor: '#000',
      html: '帳號或密碼未輸入',
      showConfirmButton: false,
      timer: 1500
    });
    return;
  }
  try {
    const { accessToken, refreshToken } = await FETCH_AUTH.login(user.value);
    if (!accessToken) { return; }

    const authorization = useCookie('authorization');
    const refresh_token = useCookie('refreshToken');
    const { AuthStore } = useStore();
    const router = useRouter();

    authorization.value = accessToken;
    AuthStore().FN_SET_TOKEN(accessToken);
    refresh_token.value = refreshToken;
    AuthStore().FN_SET_REFRESH_TOKEN(refreshToken);
    $swal.fire({
      icon: 'success',
      iconColor: '#000',
      html: '登入成功',
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      router.push('/');
    });
  } catch (err) {
    console.error(err);
  }
}
</script>

<template>
  <section class="absolute top-75px left-0 w-full h-[calc(100vh-75px)] flex items-center justify-center">
    <div class="w-90% p-20px rounded-10px shadow-[4px_5px_0px_4px_black] border-4px border-black">
      <h2 class="text-center text-24px fw-800">
        登入
      </h2>
      <div class="flex flex-col gap-y-10px">
        <label for="account">帳號:</label>
        <input id="account" v-model="user.username" type="text" class="w-full border-4px border-black rounded-10px p-10px focus:outline-none" placeholder="請輸入帳號">
        <label for="password">密碼:</label>
        <input id="password" v-model="user.password" type="password" class="w-full border-4px border-black rounded-10px p-10px focus:outline-none" placeholder="請輸入密碼">
        <button class="w-full border-4px border-black py-10px rounded-10px mt-20px bg-black text-white fw-800 hover:bg-white hover:text-black duration-300" @click="login">
          登入
        </button>
      </div>
    </div>
  </section>
</template>
