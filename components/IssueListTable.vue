<template>
  <div>
    <div class="w-full xl:w-4/12 px-4">
      <v-sheet elevation="2" class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full max-w-full flex-grow flex-1">
              <h6 class="uppercase text-gray-500 mb-1 text-xs font-semibold">Performance</h6>
              <h2 class="text-gray-800 text-xl font-semibold">課題リスト</h2>
              <div class="add-button">
                <ModalAddData/>
              </div>
            </div>
          </div>
        </div>
        <div class="p-4 flex-auto">
          <div class="relative">
            <v-data-table :headers="tableHeader" :items="issueList" class="elevation-1">
              <template v-slot:item.classification="{ item }">
                <v-chip x-small :color="getColor(item.classification)" dark>
                  {{ item.classification }}
                </v-chip>
              </template>
            </v-data-table>
          </div>
        </div>
      </v-sheet>
    </div>
  </div>
</template>

<style scoped>
  .add-button {
    text-align: right;
  }
</style>

<script>
import ModalAddData from "@/components/ModalAddData";

export default {
  props: ['issueList'],
  comments: ['ModalAddData'],
  data: function() {
    return {
      tableHeader: [
        { text: '聞き取り日', value: 'hearingDate' },
        { text: '題目', value: 'title' },
        { text: '分類', value: 'classification' },
        { text: '内容', value: 'contents' },
        { text: '対応案', value: 'solution' },
        { text: '情報源', value: 'source' },
        { text: 'ステータス', value: 'status' },
        { text: '地域', value: 'area' },
        { text: '関係人口', value: 'relatedPopulation' },
        { text: '緊急度(0~100)', value: 'urgencyLevel' },
        { text: '実現難易度(0~100)', value: 'difficultyLevel' },
      ],
      issueListSize: 0,
      colorSet: [
        {label: "農業", color: "#62ce81"},
        {label: "自然災害", color: "#ce4343"},
        {label: "林業", color: "#055e1f"},
        {label: "子育て", color: "#e576d2"},
      ],
    }
  },
  methods: {
    getColor(data) {
      const color = this.colorSet.find(value => value.label === data[0]);
      return color ? color.color : 'gray';
    },
  }
};
</script>
