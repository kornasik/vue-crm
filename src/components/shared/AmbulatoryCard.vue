<template>
  <div class="ambulatory-card">
    <div class="ambulatory-card__title">Амбулаторная карта</div>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam numquam
      quidem quod tenetur veritatis. Aliquam debitis earum est laborum mollitia
      possimus voluptates. Accusamus blanditiis dignissimos eum iusto labore
      optio sit?
    </div>
    <div>
      Assumenda explicabo, impedit mollitia obcaecati quisquam sint voluptates?
      Architecto aspernatur dicta quasi. Aspernatur corporis cumque et in ipsam
      iusto nisi quas quasi, qui quibusdam ratione, reiciendis rerum sapiente
      sunt velit?
    </div>
    <div>
      Asperiores dolore ducimus eaque harum impedit, maxime pariatur quia
      suscipit? Facilis nobis praesentium quod rerum sed! Accusantium,
      consequatur, cumque dignissimos, excepturi maxime nam nihil obcaecati
      quibusdam sint sit ut voluptatem.
    </div>
    <div>
      Deserunt distinctio doloremque ducimus ea eos eveniet excepturi fugit ipsa
      libero magnam molestias mollitia nemo pariatur quisquam reprehenderit
      rerum similique tempore veritatis, vitae voluptas? Adipisci animi
      consequatur eveniet omnis veniam?
    </div>
    <div>
      Ab cum, deserunt doloribus facere facilis inventore ipsum iste nam nemo,
      neque nulla officiis quidem quis. Accusamus accusantium, consequatur
      dolore dolores earum eligendi excepturi incidunt ipsum maxime minima
      obcaecati saepe?
    </div>
    <div class="ambulatory-card__buttons">
      <v-btn
        class="ma-2"
        tile
        color="indigo"
        dark
        @click="linkOnHistoryDiagnoses"
        >История диагнозов</v-btn
      >
      <v-btn class="ma-2" tile color="indigo" dark>История зубной карты</v-btn>
      <v-btn
        class="ma-2"
        tile
        color="indigo"
        dark
        @click="linkOnDiagnosesAssignment"
        >Назначение диагнозов</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "AmbulatoryCard",
  data: () => ({}),
  methods: {
    linkOnHistoryDiagnoses() {
      this.$router.push("ambulatory-card/history-diagnoses");
    },
    linkOnDiagnosesAssignment() {
      this.$router.push("ambulatory-card/diagnoses-assignment");
    }
  }
};
</script>

<style scoped lang="scss">
.ambulatory-card {
  width: 900px;
  margin: 0 auto;

  &__title {
    margin-bottom: 30px;
  }

  &__buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
  }
}
</style>
