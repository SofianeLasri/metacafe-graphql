<script setup lang="ts">
import defaultProfilePic from "~@/assets/images/square-logo-with-background.avif?url";
import emojiByGroup from "unicode-emoji-json/data-by-group.json";
import {emojiDataByGroup, Post} from "~@/types.ts";
import {onMounted} from "vue";

const props = defineProps<{
  col: string;
}>();

const emit = defineEmits<{
  (e: 'hasSubmittedPost', post: Post): void
}>();

const user = {
  id: 0,
  username: "username",
  email: "email",
  profilePicture: defaultProfilePic,
};

const textAreaId = props.col + "PostWriterTextArea";
const pickEmojiBtnId = props.col + "PickEmojiBtn";
const textToSpeechBtnId = props.col + "TextToSpeechBtn";
const sendPostBtnId = props.col + "SendPostBtn";
const emojiPickerId = props.col + "EmojiPicker";
const emojiListContainerId = props.col + "EmojiListContainer";

const emojiDataByGroup: emojiDataByGroup = JSON.parse(JSON.stringify(emojiByGroup));

function createEmojiGroupsDomElements(emojiData: emojiDataByGroup, emojiListContainer: HTMLElement, messageInput: HTMLTextAreaElement) {
  for (const group in emojiData) {
    const groupDomElement = document.createElement("div");
    groupDomElement.classList.add("group");

    const groupTitleDomElement = document.createElement("div");
    groupTitleDomElement.classList.add("subtitle");
    groupTitleDomElement.innerText = group;

    const groupEmojisDomElement = document.createElement("div");
    groupEmojisDomElement.classList.add("emojis");

    for (const emoji in emojiData[group]) {
      const emojiDomElement = document.createElement("div");
      let emojiString: string = emojiData[group][emoji].emoji;
      emojiDomElement.classList.add("emoji");
      emojiDomElement.dataset.type = "emoji";
      emojiDomElement.innerText = emojiString;

      groupEmojisDomElement.appendChild(emojiDomElement);

      emojiDomElement.addEventListener("click", () => {
        messageInput.value += emojiString;
      });
    }

    groupDomElement.appendChild(groupTitleDomElement);
    groupDomElement.appendChild(groupEmojisDomElement);
    emojiListContainer.appendChild(groupDomElement);
  }
}

function createPost(content: string): Post
{
  return {
    id: 0,
    content: content,
    title: "placeholder",
    author: user
  };
}

onMounted(() => {
  const textareaElement = document.getElementById(textAreaId) as HTMLTextAreaElement;
  const pickEmojiBtnElement = document.getElementById(pickEmojiBtnId)!;
  const textToSpeechBtnElement = document.getElementById(textToSpeechBtnId)!;
  const sendPostBtnElement = document.getElementById(sendPostBtnId)!;
  const emojiPicker = document.getElementById(emojiPickerId)!;
  const emojiListContainer = document.getElementById("emojiListContainer")!;

  // TODO: Terminer l'implémentation d'un emoji picker
  //createEmojiGroupsDomElements(emojiDataByGroup, emojiListContainer, textareaElement);

  pickEmojiBtnElement.addEventListener("click", () => {
    emojiPicker.classList.toggle("active");
  });

  sendPostBtnElement.addEventListener("click", () => {
    console.log(textareaElement.value);
    let post = createPost(textareaElement.value);
    emit("hasSubmittedPost", post);
  });
});

</script>

<template>
  <div class="card d-flex flex-column gap-2">
                <textarea :id="textAreaId" class="form-control" name="post" rows="3"
                          placeholder="Exprimez-vous..."></textarea>
    <div class="d-flex justify-content-end">
      <button :id="pickEmojiBtnId" type="button" class="btn btn-link text-muted">
        <font-awesome-icon :icon="['fas', 'face-smile']"/>
      </button>
      <button :id="textToSpeechBtnId" type="button" class="btn btn-link text-muted">
        <font-awesome-icon :icon="['fas', 'microphone']"/>
      </button>
      <button :id="sendPostBtnId" class="btn btn-primary">Poster</button>
    </div>

    <div class="popup d-none" :id="emojiPickerId">
      <div class="fw-bold">
        Choisir un emoji
      </div>
      <div :id="emojiListContainerId"></div>
    </div>
  </div>
</template>

<style scoped>

</style>