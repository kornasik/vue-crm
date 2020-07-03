<template>
  <div id="app" class="container">
    <section>
      <b-collapse
        v-for="(property, index) of propertiesOrders"
        :key="index"
        :open="isOpen === index"
        @open="isOpen = index"
        :style="{ display: 'block' }"
      >
        <div slot="trigger" role="button">
          <p class="card-header-title">
            {{ property.title }}
          </p>
        </div>
        <div class="card-content">
          <div class="content">
            <div
              class="propertyField"
              v-for="(propertyField, indexPropertyField) in property.field"
              :key="indexPropertyField"
            >
              <b-input
                :name="propertyField.label"
                :type="propertyField.type"
                :placeholder="propertyField.label"
                :style="{ marginBottom: '20px' }"
              />
            </div>
          </div>
        </div>
      </b-collapse>
    </section>
  </div>
</template>

<script>
export default {
  name: "PropertiesOrders",
  data() {
    return {
      isOpen: 0,
      propertiesOrders: [
        {
          title: "Свойства сделок",
          field: [
            {
              label: "Имя",
              type: "text"
            },
            {
              label: "Фамилия",
              type: "text"
            },
            {
              label: "Дата",
              type: "date"
            }
          ]
        },
        {
          title: "Свойства связанных контактов",
          field: [
            {
              label: "Наименование",
              type: "text"
            },
            {
              label: "Телефон",
              type: "tel"
            },
            {
              label: "Город",
              type: "text"
            }
          ]
        },
        {
          title: "Свойства связанных компаний",
          field: [
            {
              label: "Наименование",
              type: "text"
            },
            {
              label: "Телефон",
              type: "tel"
            },
            {
              label: "Город",
              type: "text"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style></style>
