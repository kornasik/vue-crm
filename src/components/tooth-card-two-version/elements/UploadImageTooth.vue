<template>
  <div class="upload-tooth-image">
    <o-button
      class="upload-tooth-image__select-image"
      type="is-info"
      icon-pack="fas"
      icon-left="paperclip"
      @click="onButtonClick"
    >
      {{ $t("tooth_card.selectImage") }}
    </o-button>

    <o-input
      class="upload-tooth-image__file-name"
      v-if="uploadImageData.displayFileName"
      v-model="uploadImageData.displayFileName"
      readonly
    ></o-input>

    <input
      type="file"
      class="input-field-file"
      ref="fupload"
      @change="onFileChange"
    />

    <div v-if="readyToUpload">
      <img :src="uploadImageData.uploadFileData" class="preview-image" />
    </div>

    <o-button
      class="upload-tooth-image__send-image"
      type="is-primary"
      icon-pack="fas"
      icon-left="cloud-upload-alt"
      v-if="readyToUpload"
      @click="uploadImage"
    >
      {{ $t("tooth_card.sendImage") }}
    </o-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { uploadImageTooth } from "@/api/tooth-card/upload-image-tooth.api";
import { Getter } from "vuex-class";
import { GROUP_TOOTH } from "@/shared/enums/tooth-card";
import { getListTeethMapImage } from "@/api/tooth-card/list-teeth-map-image.api";
import { updateImageTooth } from "@/api/tooth-card/update-image-tooth.api";
import { Image } from "@/types/tooth-card";
import OButton from "@/components/shared/OButton/OButton.vue";
import OInput from "@/components/shared/OInput/OInput.vue";
import { uploadImage } from "@/types/tooth-card";

@Component({
  components: {
    OButton,
    OInput
  }
})
export default class UploadImageTooth extends Vue {
  @Getter("toothCard/selectedTooth") selectedTooth: any;

  childrenTooth: number = 49;

  listTeethMapImage: Image[] = [];

  get readyToUpload() {
    return (
      this.uploadImageData.displayFileName &&
      this.uploadImageData.uploadFileData
    );
  }

  get typeTooth() {
    return Number(this.selectedTooth) > this.childrenTooth
      ? GROUP_TOOTH.deciduous
      : GROUP_TOOTH.permanent;
  }

  uploadImageData: uploadImage = {
    displayFileName: null,
    uploadFileData: null,
    file: null
  };

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      let file = event.target.files[0];
      this.uploadImageData.file = file;
      this.uploadImageData.displayFileName =
        event.target.files[0].name + " (" + this.calcSize(file.size) + "Kb)";
      let reader = new FileReader();
      reader.onload = e => {
        this.uploadImageData.uploadFileData = (e.target as any).result as any;
      };
      reader.readAsDataURL(file);
    }
    getListTeethMapImage().then(response => {
      this.listTeethMapImage = response.data.map;
    });
  }

  onButtonClick() {
    (this.$refs.fupload as any).click();
  }

  calcSize(size: number) {
    const sizeOneMByte = 1024;
    return Math.round(size / sizeOneMByte);
  }

  isExistImage(index: number) {
    return index === -1;
  }

  uploadImage() {
    let index = this.listTeethMapImage.findIndex((image: Image) => {
      if (+this.selectedTooth === image.number) {
        return true;
      }
    });
    if (this.isExistImage(index)) {
      let data = new FormData();
      data.append("type", this.typeTooth.toUpperCase());
      data.append("number", +this.selectedTooth as any);
      data.append("file", this.uploadImageData.file as any);
      uploadImageTooth(data);
    } else {
      let data = new FormData();
      data.append("id", this.listTeethMapImage[index].id as any);
      data.append("file", this.uploadImageData.file as any);
      updateImageTooth(data);
    }
    this.uploadImageData = {
      displayFileName: null,
      uploadFileData: null,
      file: null
    };
  }
}
</script>

<style>
.input-field-file {
  display: none;
}
.preview-image {
  width: auto;
  max-width: 300px;
  padding: 15px;
  margin: 20px 0;
  border: 1px solid #999;
  border-radius: 5px;
}

.upload-tooth-image__file-name {
  margin: 20px 0 0 0;
}

.upload-tooth-image__select-image {
  margin: 10px 0 0 0;
}

.upload-tooth-image__send-image {
  width: auto;
  max-width: 300px;
}
</style>
