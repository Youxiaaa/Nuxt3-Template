# Nuxt3 開發模板

## Setup
```typescript
// 安裝依賴
npm i

// 啟動本地端
npm run dev
// 啟動本地端(生產環境)
npm run dev:prod

// 打包
npm run build
// 打包(生產環境)
npm run build:dev
```

## 環境版本
```javascript
Node => 18.15.0
Npm => 9.6.2
```

## 相關依賴
```typescript
- Pinia
- UnoCSS
- FontAwesome
- Sweetalert2
- VueUse
- Gsap
```

## API 使用方式
```typescript
<script lang="ts" setup>
  const { FETCH_ROOM } = useApi();

  cosnt roomList = useState([]);
  async function getRoomList() {
    const query = {
      pageNo: 1,
      pageSize: 20
    }
    const { result } = await FETCH_ROOM(query)

    roomList.value = result.orders.data;
  }
  // 執行 Function
  await getRoomList();
  // 客戶端渲染
  onMounted(() => {
    nextTick(() => {
      getList();
    });
  });
</script>
```
## Store 使用方式
```typescript
export default defineNuxtRouteMiddleware((to, from) => {
  const { AuthStore } = useStore()

  if (!AuthStore().TOKEN_GETTER) {
    if (to.path !== '/login') { return navigateTo('/login') }
  } else if (to.path === '/login') { return navigateTo('/') }
})
```

## 圖片懶加載使用方式
```html
<img v-lazy="item.pictureUrl" :alt="item.title">
```
