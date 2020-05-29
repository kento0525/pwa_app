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
            style="width:80%; padding: 10px 0; margin-bottom:20px; background: skyblue"
          >{{ answer_list[i-1] }}</button>
          <br />
          <router-link to="/" tag="a">ホームに戻る</router-link>
        </div>
        <div v-if="endAnswer">
          <p>お疲れさまでした</p>
          <p>点数は【{{ endNumber }}】で</p>
          <p>【{{ endText }}】</p>
          <br />
          <router-link to="/">戻る</router-link>
          <p style="margin: 0; display: flex;">-入力内容一覧-</p>
          <p
            v-for="i in 60"
            :key="i"
            style="margin: 0; display: flex;"
          >{{ i }}問目: {{ answers[i-1] }}点</p>
        </div>
      </div>
      <p style="color:red">回答値 (点数){{ answers }}</p>
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
          question: "お金に触ると、手が汚れたと感じる。"
        },
        {
          question:
            "汗や唾や小便などに少しでも触れると、服が汚れたとか、私にとって何らかの害になるだろうとか思う。"
        },
        {
          question:
            "ある特定の人が触ったと分かっている物には触りたくないと感じる。"
        },
        {
          question: "生ゴミや汚いものには触りたくないと感じる。 "
        },
        {
          question:
            "病気や汚れることが怖いので、公衆トイレは使わないようにしている。 "
        },
        {
          question:
            "病気がうつるのが怖いので、公衆電話は使わないようにしている。"
        },
        {
          question: "必要以上に何回も，時間をかけて手を洗う。"
        },
        {
          question:
            "自分が汚いとか、「汚染された」かも知れないと思うだけで、自分の体を洗ったり、清潔にしたりせずにはいられない。"
        },
        {
          question:
            "「汚染されている」と思うものに触ると、すぐに自分の体を洗ったり、清潔にしたりせずにはいられない。"
        },
        {
          question:
            "動物に触れると、汚く感じて、すぐに自分の体を洗ったり、着替えたりせずにはいられない。 "
        },
        {
          question:
            "疑惑や心配なことが心に浮かぶと、安心できる人にそれらを相談するまでは落ちつくことができない。"
        },
        {
          question: "話す時に、同じことや同じ文を何度か繰り返す傾向がある。"
        },
        {
          question:
            "相手が言ったことを、たとえ最初に聞いて理解していても、同じことを繰り返してくれるように頼む傾向がある。"
        },
        {
          question:
            "服を着たり、脱いだり、体を洗うときに、決まった順序に従わなければならないと感じる時がある。"
        },
        {
          question: "寝る前に、あることを決まった順序でしなければならない。"
        },
        {
          question:
            "布団に入る前に、服を決まったやり方で吊るしたり、畳んだりしなくてはならない。"
        },
        {
          question:
            "理由もなく、ある決まった回数を繰り返さなくてはいけないと感じる。"
        },
        {
          question:
            "きちんとやれたと思うまでに、物事を何度か繰り返さなくてはいけない。"
        },
        {
          question: "必要以上に確認を繰り返す傾向がある。"
        },
        {
          question:
            "ガスや水道の蛇口や照明のスイッチを止めてからも再三確認する。"
        },
        {
          question:
            "ドアや窓や引き出しが確実にきちんと閉まっているのを確認するために家に引き返す。"
        },
        {
          question:
            "書類や小切手などを確実に正しく記入したかどうか、細部にわたって何度も確認する。"
        },
        {
          question:
            "マッチやたばこの火がきちんと消えたかどうかを見るために何度も引き返す。"
        },
        {
          question: "お金を扱うとき、何度も数えなおす。"
        },
        {
          question: "ポストに入れる前に、手紙を何回も注意深く確認する。"
        },
        {
          question: "たとえ重要でない事項についても、決断するのを難しく感じる。"
        },
        {
          question:
            "実際にはやったと分かっていることを、本当にやったかどうか確信できないことがある。"
        },
        {
          question:
            "自分は物事を決して明確に説明できないだろうと感じる。特に自分にとって重要なことを話すときにそうである。"
        },
        {
          question:
            "何かを注意深くやった後でも、まずいやり方をしたとか、完了していないのではないかと感じる。"
        },
        {
          question: "あることを必要以上に繰り返すために、遅刻することがある。"
        },
        {
          question: "自分がするほとんどのことに不審や疑問を抱いてしまう。"
        },
        {
          question: "あることについて考え始めるとそれに取りつかれてしまう。"
        },
        {
          question:
            "不快な考えが意に反して頭に浮かんできて、それらを取り除くことができない。"
        },
        {
          question:
            "わいせつな言葉や下品な言葉が頭に浮かんで、それらを取り除くことができない。"
        },
        {
          question:
            "私の頭脳はいつも勝手に動いて、周囲でおきていることに注意を払うのが難しい。"
        },
        {
          question:
            "自分のうっかりや、小さなミスのために破局的な結果が生じることを考えてしまう。"
        },
        {
          question:
            "知らないうちに誰かを傷つけたのではないかと、くどくどと考えてしまう。"
        },
        {
          question:
            "悪いニュースを聞くと、どうもそれが自分のせいではないかと考える。"
        },
        {
          question:
            "自分の体の具合が悪いのではないかと、理由もなく、くどくどと気にやむことがある。"
        },
        {
          question: "理由もなく、ものを数えだすことがある。"
        },
        {
          question: "重要でない数字を完全に覚えておかなくてはならないと感じる。"
        },
        {
          question:
            "本を読みながら、重要なことを見落としたのではないかと思って、２～３回は読みなおさないではいられないと感じる。"
        },
        {
          question:
            "重要でないことでも完全に覚えておこうと気をもんで、忘れないように努力する。"
        },
        {
          question:
            "ある考えや疑惑が心に浮かぶと、あらゆる観点から吟味しないと気が済まない。"
        },
        {
          question:
            "ある特定の場面で、自分のコントロールを失い、恥ずかしいことをしてしまうのではないかと恐れる。"
        },
        {
          question: "橋や非常に高い窓から下を見ると、飛び降りる衝動を感じる。"
        },
        {
          question:
            "電車が近づいて来るのを見ると、レールに飛び込む衝動を感じる。"
        },
        {
          question: "公衆の面前で自分の服を引き裂きたくなることがある。"
        },
        {
          question:
            "車を運転しているとき、人やものに突っ込む衝動を感じることがある。"
        },
        {
          question: "武器を見ると刺激されて、暴力的なことを考えてしまう。"
        },
        {
          question: "ナイフなどの尖ったものを見ると、混乱し、気をもんでしまう。"
        },
        {
          question:
            "自分の中に、全く無意味で、自分がしたくないようなことに駆り立てるものを感じるときがある。"
        },
        {
          question: "理由もなく、物を壊す衝動を感じるときがある。"
        },
        {
          question:
            "たとえ自分にとっては何の役に立たないものであっても、他人の持ち物を盗む衝動を感じるときがある。"
        },
        {
          question:
            "スーパーから万引きする誘惑に駆られ、ほとんど逆らえないように感じるときがある。"
        },
        {
          question: "時々、無防備な子供や動物を傷つける衝動を感じる。"
        },
        {
          question: "風変わりなしぐさや歩き方をしなくてはいけないと感じる。"
        },
        {
          question:
            "気分が悪くても、度を超えて食べてしまう衝動を感じるときがある。"
        },
        {
          question:
            "自殺や犯罪のことを聞くと、長時間混乱して、考えるのをやめるのが難しい。"
        },
        {
          question: "ばい菌や病気について無用の心配を抱いてしまう。"
        }
      ], //質問文
      answer_list: ["全くない", "ほとんどない", "いくらか", "かなり", "非常に"],
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
      if (this.questionIndex === 60) {
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
    height: 100%;
    margin-top: 100px;
  }
}
</style>