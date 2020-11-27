<template>
  <v-card :color="cardColor" class="upil-text-bubble">
    <v-card-text px-3 class="break-all preformatted grey--text text--lighten-3">
      <div class="dotsContainer">
        <span id="dot1"></span>
        <span id="dot2"></span>
        <span id="dot3"></span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { VCard, VCardText } from 'vuetify/lib'

export default {
  components: {
    VCard,
    VCardText,
  },
  props: {
    reply: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    cardColor() {
      return this.reply === true ? 'secondary' : 'primary'
    },
  },
}
</script>

<style scoped lang="scss">
.dotsContainer {
  width: 50px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;

  #dot1,
  #dot2,
  #dot3 {
    width: 10px;
    height: 10px;
    background-color: white;
    border-radius: 50%;
    margin: 2px;
    transition: all 0.5s ease-in-out;
    animation: typing 1s infinite;
  }

  #dot1 {
    animation-delay: 1s;
  }

  #dot2 {
    animation-delay: 0.5s;
  }

  #dot3 {
    animation-delay: 0.8s;
  }
}

@keyframes typing {
  0% {
    transform: translateY(0);
    transition: all 0.5s ease-in-out;
  }

  50% {
    transform: translateY(-5px);
    transition: all 0.5s ease-in-out;
  }

  100% {
    transform: translateY(0);
    transition: all 0.5s ease-in-out;
  }
}
</style>
