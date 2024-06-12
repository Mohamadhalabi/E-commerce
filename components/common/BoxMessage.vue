<template>
  <div class="boxMessageClsass">
    <div>
      <b-list-group-item
        v-for="(message , index) in messageInfo.replies"
        :key="index"
        class="message mb-1 mx-2"
        :class="index%2 == 0 ? 'left' : 'right' "
        style="background-color:#fbfbfb"
      >
        <p class="mb-0 d-flex">
          <b-avatar class="mr-3 mx-2" />
          <section
            class="mr-auto testconteent"
            v-html="message.reply"
          />
        </p>
        <div v-if="message.files.length">
          <p class="mb-0 mt-1"><i class="sicon-paper-clip"></i> Attachments</p>
          <a
            v-for="(file , indexFile) in message.files"
            class="mx-2"
            :key="indexFile"
            target="_blank"
            :href="file.image_path"
          ><b-badge style="background-color:#f07905" pill>{{file.image_name}}</b-badge></a>
        </div>
        <p class="text-right mb-0 date">
          <small>3 days ago</small>
        </p>
      </b-list-group-item>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    messageInfo: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
    .boxMessageClsass .message.list-group-item{
        border: 1px solid #eaeaea
    }
    .boxMessageClsass .left {
        direction: rtl;
        text-align: right;

    }
    .boxMessageClsass .left  section , .boxMessageClsass .left span{
        background-color: #f07905;
        color: #fff;
    }
    .boxMessageClsass .right  section{
        background-color: #e7e7e7;
        color: #585858;
    }
    .boxMessageClsass .left  section.testconteent {

        padding: 0 5px;
        border-radius: 5px;
        width: 100%;
        text-align: right;
    }
    .boxMessageClsass .right  section.testconteent {
        padding: 0 5px;
        border-radius: 5px;
         width: 100%;
        text-align: left;
    }
    .boxMessageClsass .left .date{
        text-align: left !important
    }
</style>
