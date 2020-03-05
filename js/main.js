  //main.jsではメインの処理だけ書く
  /*
  メインはcsvのデータを取得する
  取得したCSVをhtml上にinnerHTMLする
  以上！！
  */

  /* めいんじゃない機能は切り離す
  for文を縮められないか？
  データをどんどん順次処理的にパスするのではなく
  必要なところに関数をつまんでくるようにできないか？？
  
  */


  //index.htmlからcsv出力先の要素を取得
  const outputElement = document.getElementById('output_csv');

  //todouhuken2.csvを取得し、内容をoutput_csvの要素内に記載
  function getCsvData(dataPath) {
    const request = new XMLHttpRequest();
    request.addEventListener('load', (event) => {
      const response = event.target.responseText;
      convertArray(response);
    });
    request.open('GET', dataPath, true);
    request.send();
   }

  //  dataStringにsplitで改行毎に分割し一次元配列とする
  //　dataArrayの各行を「,」で分割し一次元配列化する
  function convertArray(data) {
    const dataArray = [];
    const dataString = data.split('\n');
    for(var i = 0; i < dataString.length; i++) {
      dataArray[i] = dataString[i].split(',');
    }
    //空文字列insertElementにdataArrayにテーブルタグを足している
    var insertElement = '';
    dataArray.forEach(function(element) {
      insertElement += '<tr>';
      element.forEach(function(childElement) {
        insertElement += '<td>' + childElement + '</td>';
      });
      insertElement += '</tr>';
    });
     outputElement.innerHTML = insertElement;
  }
   getCsvData('../population.csv');

  //まずは破壊的メソッドshiftを変更
  //非破壊的メソッドでDupulicateを作る
   function getIntArray(twoDimeArray) {
    // twoDimeArray.shift();
    const intArray = [];
    for(var i = 1; i < twoDimeArray.length; i++) {
      // twoDimeArray[i].shift();
      intArray[i] = [];
      for(var j = 1; j < twoDimeArray[i].length; j++) {
        intArray[i] = twoDimeArray[i].map(Number);
      }
    }
    console.log(intArray);
    // getSum(intArray);
  }

  //とりあえずfor文を短くする
  //intArrayがつながっていきているやつを切り離す
  function getSum(intArray) {
    var rowSum;
    const rowSumArray = [];
    for(var i = 0; i < intArray.length; i++){
      rowSum = 0;
      for(var j = 0; j < intArray[i].length; j++){
        rowSum += intArray[i][j];
      }
      rowSumArray.push(rowSum);
    }

    var colomnSum;
    const colomnSumArray = [];
    for(var i = 0; i < intArray[i].length; i++){
       colomnSum = 0;
       for(var j = 0; j < intArray.length; j++){
         colomnSum += intArray[j][i];
       }
       colomnSumArray.push(colomnSum);
    }
    insertRow(colomnSumArray,'年別合計');
  }


  var insertRow = function insert(colomnSumArray, text) {
    // console.log(colomnSumArray);
    // const insertArray = [];
    insertArray = colomnSumArray;
    // // insertArray[0][0] = text;
    insertArray[0] = text;
    // // console.log(insertArray);
    newRow = outputElement.insertRow(-1);
    insertElement = '';
    // newTd = document.createElement('td');
    insertArray.forEach(function(element){
      insertElement += '<td>' + '</td>';
    });
    newRow[0].appendChild(insertElement);
    // // console.log(insertArray);
    // // var newTr = document.createElement('tr');
    // // var newTd = 



    // var insertElement = '';
    // insertArray.forEach(function(element) {
    //   insertElement += '<tr>';
    //   element.forEach(function(childElement) {
    //     insertElement += '<td>' + childElement + '</td>';
    //   });
    //   insertElement += '</tr>';
    // });
    // outputElement.appendChild(insertElement);
  }
