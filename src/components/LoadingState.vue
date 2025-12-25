<template>
  <div class="d-flex align-self-center justify-center ga-3 position-relative">
    <span>Model is typing<span class="dots"></span></span>
  </div>
</template>

<style scoped>
.dots::after {
  content: '';
  animation: dots 1.5s steps(4, end) infinite;
  position: absolute;
  left: calc(100% + 5px);
}

@keyframes dots {
  0% {
    content: '';
  }
  25% {
    content: '.';
  }
  50% {
    content: '..';
  }
  75% {
    content: '...';
  }
  100% {
    content: '';
  }
}
</style>
