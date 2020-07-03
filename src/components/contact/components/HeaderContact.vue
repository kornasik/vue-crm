<template>
  <div class="header-contact">
    <div class="header-contact__label">
      <TitleContact />
      <ContactID />
      <div :style="{ marginLeft: 'auto' }"><SaveContact /></div>
    </div>
    <TagContact />
  </div>
</template>

<script>
import TitleContact from "../elements/TitleContact";
import ContactID from "../elements/ContactID";
import TagContact from "../elements/TagContact";
import SaveContact from "../elements/SaveContact";

export default {
  name: "HeaderContact",
  components: {
    SaveContact,
    ContactID,
    TitleContact,
    TagContact
  },
  data: () => ({})
};
</script>

<style scoped lang="scss">
.header-contact {
  &__label {
    display: flex;
  }
}
</style>
