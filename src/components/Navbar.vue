<template>
    <n-affix
        :trigger-top="0"
        position="absolute"
        class="n-affix"
        >
        <n-grid :cols="2" item-responsive>
            <n-gi span="0 400:1">
                <a
                href="/"
                >
                    <h1>P4Mon</h1>
                </a>
            </n-gi>
            <n-gi>
                <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
            </n-gi>
        </n-grid>
        
    </n-affix>
</template>
<script>
import { defineComponent, h, ref } from 'vue'
import { NAffix, NPageHeader, NMenu, NGrid, NGi} from 'naive-ui';

const menuOptions = [
  {
    label: () => h(
      "a",
      {
        href: "#about",
        rel: "noopenner noreferrer"
      },
      "About"
    ),
    key: "About",
    },
  {
    label: () => h(
      "a",
      {
        href: "#milestones",
        rel: "noopenner noreferrer"
      },
      "Milestones"
    ),
    key: "milestones",
    },
  {
    label: () => h(
      "a",
      {
        href: "#team",
        rel: "noopenner noreferrer"
      },
      "Team"
    ),
    key: "team",
  },
];

export default defineComponent({
    components: {
        NAffix,
        NPageHeader,
        NMenu,
    },
    setup() {
        return {
            activeKey: ref(null),
            menuOptions
        };
    }
})
</script>
<style>
    .n-affix {
        z-index:1;
        text-align:center;
        justify-content: center;
        background-color: white;
        padding-inline: 10rem;
        width: 100%;
    }
</style>