<template>
  <div>
    <img
      :id="'myimage-' + image[size].id"
      :src="image[size].url"
      :width="image[size].width"
      :height="image[size].height"
      class="rounded-5"
      style="border: 1px solid #e7e7e6!important;"
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMouseOnImage: false
    };
  },
  props: {
    image: Object,
    size: {
      type: String,
      default: 'l'
    },
    isMouseInside:Boolean,
    highlightImage:Boolean,
  },
  methods: {
    resetMagnifier() {
      const imgID = "myimage-" + this.image[this.size].id;
      const img = document.getElementById(imgID);

      // Remove any existing magnifier glass
      const existingGlass = img.parentElement.querySelector(".img-magnifier-glass");
      if (existingGlass) {
        existingGlass.remove();
      }

      // Initialize the magnifier again
      this.initializeMagnifier();
    },
    initializeMagnifier() {
      const imgID = "myimage-" + this.image[this.size].id;
      const zoom = 3;

      const img = document.getElementById(imgID);

      // Create a new magnifier glass
      const glass = document.createElement("DIV");
      glass.setAttribute("class", "img-magnifier-glass");

      img.parentElement.insertBefore(glass, img);

      // Set background properties for the magnifier glass
      glass.style.backgroundImage = `url('${img.src}')`;
      glass.style.backgroundRepeat = "no-repeat";
      glass.style.backgroundSize = `${img.width * zoom}px ${img.height * zoom}px`;
      glass.style.zIndex= `999`;
      glass.style.overflow =`hidden`;


      const bw = 2;
      const w = glass.offsetWidth / 1.5;
      const h = glass.offsetHeight / 1.5;

      // Execute a function when someone moves the magnifier glass over the image
      glass.addEventListener("mousemove", moveMagnifier);
      img.addEventListener("mousemove", moveMagnifier);

      // Also handle touch events for touch screens
      glass.addEventListener("touchmove", moveMagnifier);
      img.addEventListener("touchmove", moveMagnifier);

      function moveMagnifier(e) {
        e.preventDefault();

        const pos = getCursorPos(e);
        let x = pos.x;
        let y = pos.y;

        if (x > img.width - (w / zoom)) {
          x = img.width - (w / zoom);
        }
        if (x < w / zoom) {
          x = w / zoom;
        }
        if (y > img.height - (h / zoom)) {
          y = img.height - (h / zoom);
        }
        if (y < h / zoom) {
          y = h / zoom;
        }

        glass.style.left = `${x - w}px`;
        glass.style.top = `${y - h}px`;
        glass.style.backgroundPosition = `-${(x * zoom) - w + bw}px -${(y * zoom) - h + bw}px`;
      }

      function getCursorPos(e) {
        const a = img.getBoundingClientRect();
        let x = 0;
        let y = 0;

        e = e || window.event;
        x = e.pageX - a.left - window.pageXOffset;
        y = e.pageY - a.top - window.pageYOffset;

        return { x, y };
      }
    }
  },
  watch: {
    image: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.resetMagnifier();
        });
      }
    },
    isMouseInside(val){
      if(val === false) {
        const imgID = "myimage-" + this.image[this.size].id;
        const img = document.getElementById(imgID);

        // Remove any existing magnifier glass
        const existingGlass = img.parentElement.querySelector(".img-magnifier-glass");
        if (existingGlass) {
          existingGlass.remove();
        }
      }
      if(val === false){
        this.initializeMagnifier()
      }
    },
  }
};
</script>

<style>
.img-magnifier-glass {
  position: absolute;
  border: 1px solid #000;
  border-radius: 50%;
  cursor: none;
  /* Set the size of the magnifier glass: */
  width: 300px;
  height: 300px;
  /* Set initial positioning for the magnifier glass: */
  left: -9999px;
  top: -9999px;
  /* Use 'cover' to prevent duplication and address lagging on edges: */
  background-size: cover;
  overflow: hidden;
}
@media screen and (max-width: 992px) {
  .img-magnifier-glass{
    display: none;
  }
}
</style>
