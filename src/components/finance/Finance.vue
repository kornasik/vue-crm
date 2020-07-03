<template>
  <div>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias amet
      animi, dignissimos distinctio eligendi facilis impedit magni maxime,
      minima nam nobis non obcaecati quibusdam quis quisquam recusandae sequi
      velit voluptatibus.
    </div>
    <div>
      Adipisci consequatur cumque delectus ea earum exercitationem explicabo
      iste iusto laborum modi molestias non nostrum odio quibusdam quo quod quos
      suscipit totam ullam ut veniam, vitae voluptatum? Culpa, illum, similique?
    </div>
    <div>
      A adipisci, alias aperiam commodi culpa cumque eos, ex explicabo
      laboriosam laudantium libero nam nisi rem reprehenderit sit voluptas
      voluptate voluptatem? Dicta eius exercitationem inventore ipsum numquam
      perferendis quos voluptate!
    </div>
    <div>
      Aperiam atque autem dignissimos eveniet fugiat laborum magnam minus, modi
      mollitia nam placeat provident quibusdam rerum, vel voluptatum. Amet at
      doloribus fugit illum iste libero nisi pariatur repudiandae veniam
      voluptates?
    </div>
    <v-btn class="ma-2" tile color="indigo" dark @click="linkOnDocuments">
      Документы(счета)
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "Finance",
  data: () => ({}),
  methods: {
    linkOnDocuments() {
      this.$router.push("/patients/finance/documents");
    }
  }
};
</script>

<style></style>
