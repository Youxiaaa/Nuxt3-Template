import Swal from 'sweetalert2';

export default defineNuxtPlugin(() => {
  const swal = Swal;
  return {
    provide: {
      swal
    }
  };
});
