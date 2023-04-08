import { defineRule } from 'vee-validate';

export default defineNuxtPlugin(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defineRule('required', (value: string, target, ctx) => {
    if (!value || !value.length) {
      return `${ctx.field}為必填`;
    }
    return true;
  });
  defineRule('minMax', (value: string, [min, max]: any, ctx) => {
    const numericValue = Number(value.length);

    if (numericValue < min) {
      return `${ctx.field}最少為 ${min} 個字`;
    }
    if (numericValue > max) {
      return `${ctx.field}最多為 ${max} 個字`;
    }
    return true;
  });
});
