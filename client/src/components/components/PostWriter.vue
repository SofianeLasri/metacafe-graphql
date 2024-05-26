<script setup lang="ts">
import defaultProfilePic from "~@/assets/images/square-logo-with-background.avif?url";
import emojiByGroup from "unicode-emoji-json/data-by-group.json";
import {EmojiDataByGroup, Post} from "~@/types.ts";
import {onMounted} from "vue";
import {gql} from "@apollo/client/core";
import client from './../../apolloClient';
import * as bootstrap from 'bootstrap';

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

const CREATE_POST_MUTATION = gql`
mutation CreatePost($title: String!, $content: String!) {
  createPost(title: $title, content: $content) {
    id
  }
}
`;

const textAreaId = props.col + "PostWriterTextArea";
const pickEmojiBtnId = props.col + "PickEmojiBtn";
const textToSpeechBtnId = props.col + "TextToSpeechBtn";
const sendPostBtnId = props.col + "SendPostBtn";
const emojiPickerId = props.col + "EmojiPicker";
const emojiListContainerId = props.col + "EmojiListContainer";

const emojiDataByGroup: EmojiDataByGroup = JSON.parse(JSON.stringify(emojiByGroup));

function createEmojiGroupsDomElements(emojiData: EmojiDataByGroup, emojiListContainer: HTMLElement, messageInput: HTMLTextAreaElement) {
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

async function createPost(content: string): Promise<Post> {
  let data = {
    title: "placeholder",
    content: content
  };
  await client.mutate({
    mutation: CREATE_POST_MUTATION,
    variables: data,
    context: {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }
  });

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
  const emojiListContainer = document.getElementById(emojiListContainerId)!;

  createEmojiGroupsDomElements(emojiDataByGroup, emojiListContainer, textareaElement);

  pickEmojiBtnElement.addEventListener("click", () => {
    emojiPicker.classList.toggle("active");
  });

  sendPostBtnElement.addEventListener("click", async () => {
    let post = await createPost(textareaElement.value);
    emit("hasSubmittedPost", post);
  });

  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
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
      <button :id="textToSpeechBtnId" type="button" class="btn btn-link text-muted" data-bs-toggle="tooltip"
              data-bs-placement="bottom" data-bs-title="Cette fonctionnalité n'est pas encore disponible.">
        <font-awesome-icon :icon="['fas', 'microphone']"/>
      </button>
      <button :id="sendPostBtnId" class="btn btn-primary">Poster</button>
    </div>
  </div>

  <div class="emoji-picker" :id="emojiPickerId">
    <div class="fw-bold">
      Choisir un emoji
    </div>
    <div :id="emojiListContainerId"></div>
  </div>
</template>

<style scoped>

</style>