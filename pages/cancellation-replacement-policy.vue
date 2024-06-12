<template>
  <main class="main skeleton-body">
    <div class="container">
      <nav
        aria-label="breadcrumb"
        class="breadcrumb-nav">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link to="/">
              {{ $t('shop.home') }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item active">
            Cancellation & Replacement Policy
          </li>
        </ol>
      </nav>
      <div class="about_section mt-3">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-12">
              <div class="about_content">
                <h1>Cancellation & Replacement Policy</h1>
                <p style="color:red">
                  Please note that original products cannot be returned or refunded. Only products meeting the eligibility criteria and returned within 15 days of purchase will be considered for a refund or exchange. We appreciate your understanding.
                </p>
                <span class="policy">Eligibility for Exchanges - Cancellation & Replacement Policy</span><br>
                <ul class="privacy-policy-list">
                  <li>The item must be unused and in the same condition as received.</li>
                  <li>It must be in the original packaging.</li>
                  <li>To complete your exchange (if applicable), we require a receipt or proof of purchase.</li>
                  <li>We replace items only if they are defective or damaged.</li>
                </ul>
                <p>
                  If you need to exchange it for the same item, please email us at <a href="mailto:order@tlkeys.com">order@tlkeys.com</a>and send your item to Warehouse No. 1, Techno Lock Keys Trading, Maleha Road, Industrial 5, Sharjah, UAE 26480 Sharjah, United Arab Emirates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "cancellation-replacement-policy"
}
</script>

<style scoped>
.about_content p {
  color: #5c5c5c;
  font-size: 16px;
  line-height: 26px;
  text-align: left;
  margin: 15px 0 25px 0;
}

.policy{
  font-size:20px!important;
  color:#3E444A!important;
  text-transform: capitalize;
  font-family: sans-serif;
  font-style: normal!important;
  font-weight:600;
}

.privacy-policy-list{
  font-size:16px;
  margin: 15px 0 25px 23px;
  list-style-type: circle
}
.privacy-policy-list li{
  padding:3px;
}

.about_content a{
  color:#da8b50!important;
  transition: 0.3s;
}
.about_content a:hover{
  color:#c05817!important;
}
.return-refund-policy{
  font-size: 36px;
}
</style>