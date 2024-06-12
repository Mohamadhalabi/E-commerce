<template>
  <div>
    <div class="row">
      <div class="col-md-8 mb-2" v-if="$settings.website.bottom_big_banner_link">
        <a
          v-if="$settings.website.bottom_big_banner_link"
          :href="$settings.website.bottom_big_banner_link"
          target="_blank"
          class="top-notice-image"
        >
          <nuxt-img
            loading="lazy"
            format="webp"
            style="border-radius: 6px;"
            width="924"
            height="238"
            :src="$settings.website.bottom_big_banner_image.l.url"
            :open_graph="$settings.website.bottom_big_banner_image.l['open_graph']"
            :scal="$settings.website.bottom_big_banner_image.l['scal']"
            :description="$settings.website.bottom_big_banner_image.l['description']"
            :alt="$settings.website.bottom_big_banner_image.l['alt']"
          />
        </a>
      </div>
      <div class="col-md-4" v-if="$settings.website.bottom_small_banner_link">
        <a
          :href="$settings.website.bottom_small_banner_link"
          target="_blank"
          class="top-notice-image"
        >
          <nuxt-img
            loading="lazy"
            format="webp"
            width="452"
            height="241"
            style="border-radius: 6px;"
            :src="$settings.website.bottom_small_banner_image.l.url"
            :open_graph="$settings.website.bottom_small_banner_image.l['open_graph']"
            :scal="$settings.website.bottom_small_banner_image.l['scal']"
            :description="$settings.website.bottom_small_banner_image.l['description']"
            :alt="$settings.website.bottom_small_banner_image.l['alt']"
          />
        </a>
      </div>
    </div>
  </div>
</template>
