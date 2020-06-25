<template>
  <div>
    <header class="header">
      <p class="header__text">ヘッダー</p>
    </header>
    <div class="box">
      <div class="box__question">
        <div v-if="startFrag">
          <button @click="questionStart" style="background: skyblue; padding: 10px;">スタート</button>
          <br />
          <br />
          <router-link to="/" tag="a">ホームに戻る</router-link>
        </div>
        <div v-if="questionFrag">
          <p>第 {{ (questionIndex + 1) }} 問</p>
          <!-- 質問出題コーナー -->
          <h4 style="height: 70px; width: 80%; margin: auto;">{{ currentQuestion.question }}</h4>
          <button
            v-for="i in 5"
            :key="i"
            @click="addAnswer(i-1)"
            style="width:80%;height: 70px;  margin-bottom:20px; background: skyblue; letter-spacing: 2px; outline:0;"
          >{{ currentQuestion.answers_select[i-1] }}</button>
          <!-- <p v-for="i in 5" :key="i">forテスト: {{ i }}</p> -->
          <br />
          <router-link to="/" tag="a">ホームに戻る</router-link>
        </div>
        <div v-if="endAnswer">
          <p>お疲れさまでした</p>
          <p>点数は【{{ endNumber }}】で</p>
          <p>【{{ endText }}】</p>
          <br />
          <router-link to="/">戻る</router-link>
          <br>
          <br>
          <div style="display: inline-block; border:1px solid black;">
            <p>７点以下: 正常</p>
            <p>8点~15点: 軽度のOCD</p>
            <p>16点~23点: 中等度のOCD</p>
            <p>24点以上: 重度のOCD</p>
          </div>
          <p style="margin: 0; display: flex;">-入力内容一覧-</p>
          <p
            v-for="i in questions.length"
            :key="i"
            style="margin: 0; display: flex;"
          >{{ i }}問目: {{ answers[i-1] }}点</p>
        </div>
      </div>
      <p style="color:skybule">回答値 (点数){{ answers }}</p>
    </div>
  </div>
</template>

<script>
// 頭の中で考えているものもカウントする
// 確実な結果を出すならば、専門医に主旨の言葉をつける。
export default {
  name: "Padoa",

  data() {
    return {
      questions: [
        {
          question:
            "一日のうちでどれくらいの時間、脅迫的な考えが起こりますか？",
          answers_select: [
            "なし",
            "1日に1時間以内",
            "1日に1~3時間以下",
            "1日に3~8時間以下",
            "1日に8時間以下"
          ]
        },
        {
          question:
            "あなたの脅迫的な考えは社交的な活動や仕事の能力をどれくらい障害していますか？",
          answers_select: [
            "障害なし",
            "軽度: 社交的な活動や職業活動は少し妨害されるが、全体としては障害されない",
            "中等度: 社交的な活動や職業活動は明らかに傷害されているが、なんとか対処している",
            "重度: 社交的な活動や職業的な活動が著しく傷害されている",
            "極度: 障害のため何もできない"
          ]
        },
        {
          question: "脅迫的な考えはどれくらいの苦痛を生じますか？",
          answers_select: [
            "全くなし",
            "軽度: めったに生じない・あまり苦痛でない",
            "中等度: しばしば生じて苦痛であるが、なんとか対処できる",
            "重度: 頻回に生じ、非常に苦痛である",
            "極度: 苦痛のため何もできない"
          ]
        },
        {
          question:
            "何回くらい強迫観念を無視し、頭の中を自然に通り過ぎさせようとしますか？",
          answers_select: [
            "常に",
            "たいていのとき無視する",
            "無視しようと多少努力する",
            "めったに無視しない",
            "決して無視しない"
          ]
        },
        {
          question: "うまく強迫観念を無視できますか？",
          answers_select: [
            "いつもできる",
            "通常はできる",
            "時々できる",
            "ほとんどできない",
            "全くできない"
          ]
        },
        {
          question: "強迫行為に用いる時間はどれくらいですか？",
          answers_select: [
            "なし",
            "1日に1時間以内",
            "1日に1~3時間以下",
            "1日に3~8時間以下",
            "1日に8時間以下"
          ]
        },
        {
          question: "強迫行為は社交的な活動や仕事をどれだけ妨害していますか？",
          answers_select: [
            "全くない",
            "軽度: 少しだけ妨害しているが、全体の生活は損なわれていない。",
            "中等度: 明らかに妨害されているがなんとか対処している",
            "重度: 著しい妨害",
            "極度: 妨害され何もできない"
          ]
        },
        {
          question:
            "強迫行為を行うのを邪魔されたら、どのように感じますか？不安の程度はどれくらいですか？",
          answers_select: [
            "全くない",
            "軽度: ほんの少し",
            "中等度: 不安は高まるがなんとか対処できる",
            "重度: 不安は非常に強く、大きな障害になる",
            "極度: 不安のため何もできない"
          ]
        },
        {
          question: "強迫行為に対抗するため、どれくらいの努力をしていますか？",
          answers_select: [
            "いつも抵抗している",
            "大抵のときは抵抗",
            "少しは抵抗",
            "ほとんどすべての強迫行為に従っている",
            "全く抵抗せず、むしろすすんで強迫行為を行っている"
          ]
        },
        {
          question: "強迫行為をどの程度コントロールしていますか？",
          answers_select: [
            "完全にコントロールしている",
            "いくらかの努力と意思で強迫行為や儀式をやめることができる",
            "時には強迫行為をやめることができる",
            "強迫行為を遅らせることはできるが、結局行う",
            "強迫行為を遅らせることはできない"
          ]
        }
      ], //質問文
      // answer_list: ["全くない", "ほとんどない", "いくらか", "かなり", "非常に"],
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
      if (this.questionIndex === 10) {
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
      if (result >= 24) {
        this.endText = "重度の強迫性障害です。";
      } else if(result >= 16) {
        this.endText = "中程度の強迫性障害です。";
      } else if(result >= 8) {
        this.endText = "軽度の強迫性障害です。";
      } else {
        this.endText = "正常値です。強迫性障害の症状は抑えられています。";
      }
    },
    test() {
      console.log(this.currentQuestion.answers_select[0]);
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
    height: 100%;
    margin-top: 10px;
  }
}
</style>