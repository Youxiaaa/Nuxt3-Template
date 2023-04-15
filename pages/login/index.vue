<script lang="ts" setup>
import { FETCH_AUTH } from '~~/api';
import { AuthStore } from '~~/stores';

definePageMeta({
  middleware: ['auth']
});

const { $swal } = useNuxtApp();

const user = ref({
  username: '',
  password: ''
});

async function login () {
  try {
    const { accessToken, refreshToken } = await FETCH_AUTH.login(user.value);

    if (!accessToken) { return; }

    const authorization = useCookie('authorization');
    const refresh_token = useCookie('refreshToken');
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
      <VForm v-slot="{ errors }" @submit="login()">
        <div class="flex flex-col gap-y-14px">
          <div class="flex flex-col gap-y-4px">
            <label for="account">帳號:</label>
            <VField
              id="account"
              v-model="user.username"
              name="帳號"
              rules="required"
              type="text"
              class="w-full border-2px px-14px py-5px rounded-10px focus:outline-none"
              :class="[errors.帳號 ? 'border-red-500' : 'border-black']"
              placeholder="請輸入帳號"
            />
            <transition name="fade">
              <VErrorMessage name="帳號" class="text-14px text-red-500" />
            </transition>
          </div>
          <div class="flex flex-col gap-y-4px">
            <label for="password">密碼:</label>
            <VField
              id="password"
              v-model="user.password"
              name="密碼"
              rules="required|minMax:4,12"
              type="password"
              class="w-full border-2px px-14px py-5px rounded-10px focus:outline-none"
              :class="[errors.密碼 ? 'border-red-500' : 'border-black']"
              placeholder="請輸入密碼"
            />
            <transition name="fade">
              <VErrorMessage name="密碼" class="text-14px text-red-500" />
            </transition>
          </div>
        </div>
        <button class="w-full border-4px border-black py-10px rounded-10px mt-20px bg-black text-white fw-800 hover:bg-white hover:text-black duration-300">
          登入
        </button>
      </VForm>
    </div>
  </section>
</template>
