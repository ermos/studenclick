<template>
  <p id="editor" contenteditable="true">
    Ce texte peut être édité par l'utilisateur.
  </p>
</template>

<script>
export default {
name: "Editor"
}
</script>

<style>
#editor {
  outline: none;
  border: none;
}
</style>