<template>
  <div>
    <header class="header">
      <p class="header__text">ヘッダー</p>
    </header>
    <div class="box">
      <div class="box__question">
        <button
          v-if="startFrag"
          @click="questionStart"
          style="background: skyblue; padding: 10px;"
        >スタート</button>
        <div v-if="questionFrag">
          <p>第 {{ (questionIndex+1) }} 問</p>
          <!-- 質問出題コーナー -->
          <h4>{{ currentQuestion.question }}</h4>

          <button
            v-for="i in 5"
            :key="i"
            @click="addAnswer(i-1)"
            style="width:100%; margin-bottom:15px; background: skyblue"
          >{{ answer_list[i-1] }}</button>
        </div>
        <div v-if="endAnswer">
          <p>お疲れさまでした</p>
          <p>点数は【{{ endNumber }}】で</p>
          <p>【{{ endText }}】</p>
          <br>
          <p>入力内容一覧</p>
          <p v-for="i in 60" :key="i" style="margin: 0; display: flex;">{{ i }}問目: {{ answers[i-1] }}点 </p>
          <router-link to="/">戻る</router-link>
        </div>
      </div>
      <p style="color:red">{{ answers }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Padoa",

  data() {
    return {
      questions: [
        {
          question: "たとえ重要でない事項についても、決断するのを難しく感じる。"
        },
        {
          question:
            "実際にはやったと分かっていることを、本当にやったかどうか確信できないことがある。 "
        },
        {
          question:
            "自分は物事を決して明確に説明できないだろうと感じる。特に自分にとって重要なことを話すときにそうである。"
        }
      ], //質問文
      answer_list: [
        "全くわずらわされない",
        "ほとんどわずらわされない",
        "いくらかわずらわされる",
        "かなりわずらわされる",
        "非常にわずらわされる"
      ],
      questionIndex: 0, //現在のクイズ番号を保持する
      select: [0, 1, 2, 3, 4], //選択肢(数字, 後に計算される)
      answers: [], //回答されたものを保持する変数
      startFrag: true, //ボタンの表示非表示
      questionFrag: false, //文章の表示非表示
      endAnswer: false, //質問終わったときの表示非表示
      endNumber: Number, //質問終わったあとの合計点数
      endText: String //質問終わったあとのテキスト
    };
  },
  methods: {
    questionStart() {
      this.startFrag = false;
      this.questionFrag = true;
    },
    addAnswer(index) {
      this.answers.push(index);
      this.questionIndex++;
      if (this.questionIndex === 3) {
        this.questionFrag = false;
        this.endAnswer = true;
        this.calcAnswers();
      }
    },
    calcAnswers() {
      //合計値計算
      let result = this.answers.reduce(function(a, b) {
        return a + b;
      });
      this.endNumber = result;
      if (result <= 70) {
        this.endText = "70点以下は強迫性障害の可能性が低いです。";
      } else {
        this.endText = "70点以上は強迫性障害の可能性が高いです。";
      }
    }
  },
  computed: {
    currentQuestion() {
      return this.questions[this.questionIndex]; //質問を出してくれるcomputed
    }
  }
};
</script>



<style scoped lang="scss">
.header {
  background: #e5e5e5;
  height: 78px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header__text {
  margin: 0;
  font-size: 25px;
}

.box {
  &__question {
    height: 450px;
    margin-top: 100px;
  }
}
</style>