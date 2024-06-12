<template>
  <div class="error-banmark">
    <div class="ban-icon">
      <span class="icon-line line-long-invert"></span>
      <span class="icon-line line-long"></span>
      <div class="icon-circlea"></div>
      <div class="icon-fix"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.error-banmark {
  width: 80px;
  height: 115px;
  margin: 0 auto;
}
.error-banmark .ban-icon {
  width: 80px;
  height: 80px;
  position: relative;
  border-radius: 50%;
  box-sizing: content-box;
  border: 4px solid #af4c4c;
}
.error-banmark .ban-icon::before {
  top: 3px;
  left: -2px;
  width: 30px;
  transform-origin: 100% 50%;
  border-radius: 100px 0 0 100px;
}
.error-banmark .ban-icon::after {
  top: 0;
  left: 30px;
  width: 60px;
  transform-origin: 0 50%;
  border-radius: 0 100px 100px 0;
  animation: rotate-circle 5.4s;
}
.error-banmark .ban-icon::before,
.error-banmark .ban-icon::after {
  content: "";
  height: 100px;
  position: absolute;
  background: rgba(255, 255, 255, 0);
  transform: rotate(-45deg);
}
.error-banmark .ban-icon .icon-line {
  height: 5px;
  background-color: #af4c4c;
  display: block;
  border-radius: 2px;
  position: absolute;
  z-index: 10;
}
.error-banmark .ban-icon .icon-line.line-long-invert {
  top: 39px;
  left: 8px;
  width: 60px;
  transform: rotate(45deg);
  animation: icon-line-long 1.9s;
}
.error-banmark .ban-icon .icon-line.line-long {
  top: 39px;
  left: 8px;
  width: 60px;
  transform: rotate(-45deg);
  animation: icon-line-long 2s;
}
.error-banmark .ban-icon .icon-circlea {
  top: -4px;
  left: -4px;
  z-index: 10;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  box-sizing: content-box;
  border: 4px solid rgba(175, 76, 76, 0.5);
}
.error-banmark .ban-icon .icon-fix {
  top: 8px;
  width: 5px;
  left: 26px;
  z-index: 1;
  height: 85px;
  position: absolute;
  transform: rotate(-45deg);
  background-color: rgba(255, 255, 255, 0);
}
</style>