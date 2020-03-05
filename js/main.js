
  //index.htmlからcsv出力先の要素を取得
  const outputElement = document.getElementById('output_csv');
  

  //getCsvData()でtodouhuken2.csvを取得
  //csvを定数responseに代入しconvertArray(data)に飛ばす
  function getCsvData(dataPath) {
    const request = new XMLHttpRequest();
    request.addEventListener('load', (event) => {
      const response = event.target.responseText;
      convertArray(response);
    });
    request.open('GET', dataPath, true);
    request.send();
   }


  //引数data内のcsvを二次元配列っぽく配列化
  //その後<tr><td>を充てindex.htmlに出力
  //dataArray(二次元配列csv)をgetSum(twoDimeArray)へ飛ばす
  function convertArray(data) {
    const dataArray = [];
    const dataString = data.split('\n');
    for(var i = 0; i < dataString.length - 1; i++) {
      dataArray[i] = dataString[i].split(',');
    }
    var insertElement = '';
    dataArray.forEach(function(element) {
      insertElement += '<tr>';
      element.forEach(function(childElement) {
        insertElement += '<td>' + childElement + '</td>';
      });
      insertElement += '</tr>';
    });
     outputElement.innerHTML = insertElement;
    //  getSum(dataArray);

    getSum(dataArray);
  }


  function getSum(dataArray) {
    const intArray = dataArray.concat();
    for(var i = 1; i < intArray.length; i++) {
      for(var j = 1; j < intArray[i].length; j++) {
        intArray[i][j] = parseInt(dataArray[i][j], 10);
      }
    }

    var rowSum;
    const rowSumArray = [];
    for(var i = 1; i < intArray.length; i++){
      rowSum = 0;
      for(var j = 1; j < intArray[i].length; j++){
        rowSum += intArray[i][j];
      }
      rowSumArray.push(rowSum);
    }

    var colomnSum;
    const colomnSumArray = [];
    for(var i = 1; i < intArray[i].length; i++){
       colomnSum = 0;
       for(var j = 1; j < intArray.length; j++){
         colomnSum += intArray[j][i];
       }
       colomnSumArray.push(colomnSum);
    }
    var lastColomnSum = 0;
    for(var i = 0; i < colomnSumArray.length; i++){
      lastColomnSum += colomnSumArray[i];
    }
    colomnSumArray.unshift('年別合計');
    var newRow = outputElement.insertRow();
    colomnSumArray.forEach(function(element){
      var newCell = newRow.insertCell();
      var newTexts = document.createTextNode(element);
      newCell.appendChild(newTexts);
    });

    rowSumArray.unshift('各都市合計');
    for(var i = 0; i < rowSumArray.length; i++){
      var newColomn = outputElement.rows[i].insertCell(-1);
      var newTexts = document.createTextNode(rowSumArray[i]);
      newColomn.appendChild(newTexts);
    }

    var lastInsert = document.createTextNode(lastColomnSum);
    var lastCell = outputElement.rows[48].insertCell(-1);
    lastCell.appendChild(lastInsert);

  }

  getCsvData('../population.csv');

