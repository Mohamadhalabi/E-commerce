<template>
  <div>
    <ShopTemplate v-if="page.type === 'category'" :category="page" />
    <ShopTemplate v-if="page.type === 'manufacturer'" :manufacturer="page" />
    <ShopTemplate v-if="page.type === 'brand'" :brand="page" />
    <br/>
    <main
      v-if="page.type != 'brand' && page.type != 'manufacturer' && page.type != 'category'" class="main about">
        <div class="container">
          <nav aria-label="breadcrumb" class="breadcrumb-nav">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <nuxt-link to="/">
                  {{ $t("shop.home") }}
                </nuxt-link>
              </li>
              <li class="breadcrumb-item active">
                {{ $t("common.aboutUs") }}
              </li>
            </ol>
          </nav>
        </div>
      <div class="container my-2" v-html="page.description" />
    </main>
  </div>
</template>
<script>
import api from "~/api";
import ShopTemplate from "~/pages/shop/_shop.vue";
export default {
  components: { ShopTemplate },
  async asyncData({ params }) {
    const { data } = await api.get(`pages/${params.page}`);
    return {
      page: data,
    };
  },
  head() {
    let head_data = {
      titleTemplate: this.page.meta_title,
      title: this.page.meta_title,
      link: [
        {
          rel: 'canonical',
          href: process.env.PUBLIC_PATH + this.$route.params.page,
        },
      ],
      meta: [
        {
          name: "description",
          content: this.page.meta_description,
        },
        {
          name: "og:description",
          content: this.page.meta_description,
        },
      ],
      script: [
        {
          type: 'application/ld+json',
          json: {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": this.$i18n.t("products.home"),
                "item": process.env.PUBLIC_PATH,
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": this.$i18n.t("products.shop"),
                "item": `${process.env.PUBLIC_PATH}shop`,
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.page.title,
                "item": `${process.env.PUBLIC_PATH}shop/` + this.$route.params.page,
              },
            ]
          }
        },
        {
          type: 'application/ld+json', json: {
            "@context": "https://schema.org",
            "@type": "Organization",
            "url": `${process.env.PUBLIC_PATH}`+this.page.slug,
            "logo": this.page.meta_image,
            "image": this.page.meta_image,
            "name" : this.page.title,
            "description" : this.page.meta_description,
            "email": "info@tlkeys.com",
            // "telephone": "+47-99-999-9999",
            // "address": {
            //   "@type": "PostalAddress",
            //   "streetAddress": "Rue Improbable 99",
            //   "addressLocality": "Paris",
            //   "addressCountry": "FR",
            //   "addressRegion": "Ile-de-France",
            //   "postalCode": "75001"
            // },
            // "vatID": "FR12345678901",
            // "iso6523Code": "0199:724500PMK2A2M1SQQ228"

          }
        },
      ]
    };
    if (this.page.type =="manufacturer") {
      head_data["script"].push({
        type: 'application/ld+json', json: {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": this.$i18n.t("products.home"),
                "item": process.env.PUBLIC_PATH,
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": this.$i18n.t("products.shop"),
                "item": `${process.env.PUBLIC_PATH}shop`,
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.page.title,
                "item": `${process.env.PUBLIC_PATH}shop/` + this.$route.params.page,
              },
            ]
          },
        }
      });

      if(this.page.frequently_asked_questions && this.page.frequently_asked_questions.length > 0) {
        const faqItems = [];
        // Loop through the frequently_asked_questions array
        this.page.frequently_asked_questions.forEach(item => {
          // Ensure that the item has at least two elements (question and answer)
          if (item.length >= 2) {
            // Construct the FAQ item and add it to the faqItems array
            const faqItem = {
              "@type": "Question",
              "name": item[0], // Question is at index 0
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item[1], // Answer is at index 1
              },
            };
            faqItems.push(faqItem);
          }
        });
        head_data["script"].push({
          type: 'application/ld+json',
          json: {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems,
          },
        });
      }
      if (this.page.video_details && this.page.video_details.length > 0) {
        this.page.video_details.forEach(video => {
          let thumbnailUrls = [];
          // Iterate over each thumbnail type (default, high, maxres, medium, standard)
          for (let thumbnailType in video.thumbnailUrl) {
            // Push the URL of each thumbnail into the array
            thumbnailUrls.push(video.thumbnailUrl[thumbnailType].url);
          }

          head_data["script"].push({
            type: 'application/ld+json',
            json: {
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": video.name,
              "description": video.description,
              "thumbnailUrl": thumbnailUrls,
              "uploadDate": video.uploadDate,
              "duration": video.duration,
              "contentUrl": video.contentUrl,
              "embedUrl": video.embedUrl,
            }
          });
        });
      }
    }

    if (this.page.type == "page") {
      head_data["meta"].push({
        name: "og:image:alt",
        content: this.page.meta_image.l.alt,
      });
      head_data["meta"].push({
        property: "og:image",
        content: this.page.meta_image.l.url,
      });
      head_data["meta"].push({
        name: "og:image:height",
        content: this.page.meta_image.l.height,
      });
      head_data["meta"].push({
        name: "og:image:width",
        content: this.page.meta_image.l.width,
      });
    } else {
      head_data["meta"].push({
        property: "og:title",
        content: this.page.meta_title,
      });
      head_data["meta"].push({
        property: "og:type",
        content: "website",
      });
      head_data["meta"].push({
        property: "og:description",
        content: this.page.meta_description,
      });
      head_data["meta"].push({
        property: "og:url",
        content: process.env.PUBLIC_PATH + this.page.slug,
      });
      head_data["meta"].push({
        property: "og:image",
        content: this.page.meta_image,
      });
      // head_data["meta"].push({
      //   property: "twitter:card",
      //   content: "summary",
      // });
      // head_data["meta"].push({
      //   property: "twitter:site",
      //   content: `${this.$settings.social_media.twitter}`,
      // });
      // head_data["meta"].push({
      //   property: "twitter:title",
      //   content: this.page.meta_title,
      // });
      // head_data["meta"].push({
      //   property: "twitter:description",
      //   content: this.page.meta_description,
      // });
    }

    return head_data;
  },
};
</script>
