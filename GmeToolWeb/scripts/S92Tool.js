
"use strict";


  let stickyNum = 1; //用于存储列表序号的变量
  let workerTempObj =[];  //用于存储暂存列表的临时数组

  //---机型选择下拉框的临时变量------
  let aircraftSelected = document.getElementById("craftModel");
  let aircraftSelectedResult = aircraftSelected.options[aircraftSelected.selectedIndex].value;

  //--------获取并显示当前日期-------
  let ddd = new Date();
  let day = ddd.getDate();
  let month = ddd.getMonth() + 1;
  if(month < 10){
    month = "0"+ month; 
  }
  if(day < 10){
    day = "0"+ day; 
  }
  let datew = ddd.getFullYear() + "-" + month + "-" + day;
  datew = datew.toString();
  //console.log(datew);
  document.querySelector("#dateSelect").value = datew;

  //----------设置默认机型为S92时-项目列表-AMMRev-EMMRev--------
  let writeOutput="";
  if(aircraftSelectedResult == "S76C"){
    S76CCraftProject.forEach((str)=>{
      writeOutput += "<option value=" + "\"" + str + "\"" + ">" + str + "</option>";
    })
    document.getElementById("AMM").value = S76CAMMRev;
    document.getElementById("EMM").value = S76CEMMRev;
  }else if(aircraftSelectedResult == "S92"){
    S92CraftProject.forEach((str)=>{
      writeOutput += "<option value="+ str + ">" + str + "</option>";
    })
    document.getElementById("AMM").value = S92AMMRev;
    document.getElementById("EMM").value = S92EMMRev;
  }
  document.getElementById("selectProject").innerHTML = writeOutput;

  //------------按下按钮复制-------
  var buttonCopy = document.getElementById('buttonCopy');
  var text = document.getElementById('textYj');
  buttonCopy.addEventListener('click', function(){
    text.focus(); // 文本框获取焦点事件，以便于获取选中位置
    text.setSelectionRange(0, -1); // 设置选中范围，只有文本框有此事件
    document.execCommand('copy'); // 执行复制
  })

  //--------------生成YJ-----------------
  var buttonGenerate = document.getElementById('buttonGenerate');
  buttonGenerate.addEventListener('click', function(){
    aircraftSelected = document.getElementById("craftModel");
    aircraftSelectedResult = aircraftSelected.options[aircraftSelected.selectedIndex].value;
    if(!document.getElementById("FuselageTime").value){
      alert("请输入飞行时间！");
    } 
    let myProject = document.getElementById("selectProject");
    let myProjectSelectIndex = myProject.selectedIndex;
    let textYJ;
    let MM;
    if( myProject.options[myProjectSelectIndex].value.search("发动机") != -1 )
    {
      MM="EMM";
    }else{MM="AMM";}
    if(aircraftSelectedResult == "S92"){
      textYJ = "依据民航法规及" + MM + "(" + document.getElementById(MM=="EMM"?"EMM":"AMM").value + ")" + "第" + chapterS92[myProject.options[myProjectSelectIndex].value] + "章节等相关内容" + "，" + 
        "于" + document.getElementById("dateSelect").value.substr(0,4) + "年" 
        + document.getElementById("dateSelect").value.substr(5,2) + "月" 
        + document.getElementById("dateSelect").value.substr(8,2) + "日,"
        + "A/C: " + document.getElementById("FuselageTime").value + " 完成" 
        + myProject.options[myProjectSelectIndex].innerHTML + "定检，检查结果正常，限于本项工作，飞机适航。";
        console.log(myProject.options[myProjectSelectIndex].value);
    }else if(aircraftSelectedResult == "S76C"){
      textYJ = "依据民航法规及" + MM + "(" + document.getElementById(MM=="EMM"?"EMM":"AMM").value + ")" + "第" + chapterS76C[myProject.options[myProjectSelectIndex].value] + "章节等相关内容" + "，" + 
        "于" + document.getElementById("dateSelect").value.substr(0,4) + "年" 
        + document.getElementById("dateSelect").value.substr(5,2) + "月" 
        + document.getElementById("dateSelect").value.substr(8,2) + "日,"
        + "A/C: " + document.getElementById("FuselageTime").value + " 完成" 
        + myProject.options[myProjectSelectIndex].innerHTML + "定检，检查结果正常，限于本项工作，飞机适航。";
    }
    document.getElementById('textYj').value = textYJ;       
  })


 
  //----------更改机型回调--------------
  function changeAircraft(){
    writeOutput = "";
    aircraftSelected = document.getElementById("craftModel");
    aircraftSelectedResult = aircraftSelected.options[aircraftSelected.selectedIndex].value;
    if(aircraftSelectedResult == "S76C"){
      S76CCraftProject.forEach((str)=>{
        writeOutput += "<option value=" + "\"" + str + "\"" + ">" + str + "</option>";
      })
      document.getElementById("AMM").value = S76CAMMRev;
      document.getElementById("EMM").value = S76CEMMRev;
    }else if(aircraftSelectedResult == "S92"){
      S92CraftProject.forEach((str)=>{
        writeOutput += "<option value="+ str + ">" + str + "</option>";
      })
      document.getElementById("AMM").value = S92AMMRev;
      document.getElementById("EMM").value = S92EMMRev;
    }
    document.getElementById("selectProject").innerHTML = writeOutput;
    //console.log(writeOutput);
  }



  //--------------------工作者员工号搜索-------------------------------------------------------------    
  //CallBack function of searchbox oninput
  function oninputSearch(){
    let searchResult = S92Worker.filter((obj)=>{
        return obj.name.indexOf(document.getElementById("WorkerSearch").value) != -1;
    });


    //----------show the data whitch matches -------
    var str = "";


    //-----采用for循环写表格-----
    for(let i = 0 ; i<=searchResult.length-1 ; i++){

      str += `<tr id=${searchResult[i].name} onclick='clickSearchTr("复制成功","${searchResult[i].name}","${searchResult[i].code}")' ondblclick='stickyOndblclick("${searchResult[i].name}","${searchResult[i].code}")'>` 
      + '<td>'+ (i+1).toString() +'</td>' 
      + '<td>' + searchResult[i].name + '</td>' 
      + '<td>'+searchResult[i].code + '</td>' 
      + '</tr>';
        

    }

    document.getElementById("tb").innerHTML = str;
    //tb.innerHTML = str;


    //-------------------增加鼠标悬停列表颜色改变------------
    var trTable = document.getElementsByTagName("tr");
    for(var i= 0;i<trTable.length;i++){
      bgcChange(trTable[i]);
    }
  }
    



  //----------点击搜索后得到的列表数据------将员工号添加到上部Sticky列表暂存------------
  function clickSearchTr(log,name,code){
    if(workerTempObj.filter((obj)=>{
      // return obj.name.indexOf(name) != -1;
      return obj.workerName.indexOf(name) != -1;
    }).length===0){
      // let obj = {"name":name,"code":code};
      let obj = {"num":stickyNum++,"workerName":name,"workerCode":code};
      workerTempObj.push(obj);//往临时数组内暂存当前点击的对象，用以检索是否重复显示在暂存列表
      // let strSticky="";
      // strSticky += `<tr id=${"sticky"+name} ondblclick='stickyOndblclick("${name}","${code}")'>`
      // + `<td>${stickyNum++}</td>` 
      // + `<td>${name}</td>` 
      // + `<td>${code}</td>` 
      // + "</tr>";
      // document.getElementById("stickyTb").innerHTML += strSticky;  //在<tbody>标签内新增行
      writeTableFromJsonObj(workerTempObj,"stickyTb");
      if(stickyNum>10){
        alert("StickyFull");
      }
      
    }

    //增加鼠标悬停列表颜色改变
    var trTable = document.getElementsByTagName("tr");
    for(var i= 0;i<trTable.length;i++){
      bgcChange(trTable[i]);
    }
    writeLog("添加到Sticky列表");
  } 


  function stickyOndblclick(name,code){
    copyToClickBoard(code);
    writeLog(`复制到剪贴板成功 ${name}: [${code}]`);

  }

  function writeLog(content){
    document.getElementById("logIputText").value=content;
  }

  //-------点击清空列表按钮---清空暂存列表
  function clearWorkerTable(){
    document.getElementById("stickyTb").innerHTML = "";
    stickyNum = 1;
    workerTempObj =[]; //清空临时数组
  }

  //鼠标移动改变背景,可以通过给每行绑定鼠标移上事件和鼠标移除事件来改变所在行背景色。
  function bgcChange(obj){
    obj.onmouseover=function(){
      obj.style.backgroundColor="lightblue";
    }
    obj.onmouseout=function(){
      obj.style.backgroundColor="#fff";
    }
  }

  //-------复制到剪贴板函数--------------
  function copyToClickBoard(content){
    navigator.clipboard.writeText(content)
        .then(() => {
        //document.getElementById("logIputText").value="复制到剪贴板成功"
    })
        .catch(err => {
        console.log('Something went wrong', err);
    })
 
  }


  //-----------依据--Json对象-----写表格函数-----------------
function writeTableFromJsonObj(jsonData , tbId){   //jsonData是一个JSON{}对象,tb是表格的ID
  let tbString = "";
  // for(let key in jsonData){
  //     // console.log(key + " " + jsonData[key].fuselageTime);
  //     // tbString += `<tr id=${key} contenteditable="true">` 
  //     tbString +=  `<tr  ondblclick='stickyOndblclick("${jsonData[key].workerName}","${jsonData[key].workerCode}")'>` //这个位置已经取消表格可编辑
  //     + '<td>'+ key +'</td>' 
  //     + '<td>' + jsonData[key].workerName + '</td>' 
  //     + '<td>'+ jsonData[key].workerCode + '</td>' 
  //     // + '<td>'+ jsonData[key].engineTwoTime + '</td>' 
  //     + '</tr>';
  // }
  jsonData.forEach((obj)=>{
        tbString +=  `<tr  ondblclick='stickyOndblclick("${obj.workerName}","${obj.workerCode}")'>` //这个位置已经取消表格可编辑
        + '<td>'+ obj.num +'</td>' 
        + '<td>' + obj.workerName + '</td>' 
        + '<td>'+ obj.workerCode + '</td>' 
        // + '<td>'+ jsonData[key].engineTwoTime + '</td>' 
        + '</tr>';
  })

  document.getElementById(tbId).innerHTML = tbString;
}

const KeysArray = ["num","workerName","workerCode"];

//---------------读后台表格函数，=>输出为一个JSON对象字符串，
function readTableToJson(tbID){
  if(document.getElementById("stickyTb").innerHTML===""){
    console.log("emptyTable");
    return "";
  }
  else{
    // console.log(document.getElementById("craftList").tBodies[1].innerText );
    let json = "[";
    let tdValue;
    let rows = document.getElementById(tbID).rows.length;
    // let colums = document.getElementById("tb").rows[0].cells.length;

    for (var i = 0; i < rows; i++) { //每行
        // let craftIDTemp = document.getElementById(tbID).rows[i].cells[0].innerHTML;
        // if(craftIDTemp === "" && i === 0 && rows === 1){//如果在读取第一行时飞机号列表栏为空，跳过当前行数据读取
        //     json += "{";
        //     continue;
        // }else if(craftIDTemp === "" && i === 0 && rows !== 1){//如果在读取第一行时飞机号列表栏为空，跳过当前行数据读取
          
        //     continue;
        // }else if(craftIDTemp === "" && i !== 0){//不是第一行飞机号列为空时
        //     continue;
        // }

        // json += "\""; //加上一个双引号
        // json += document.getElementById(tbID).rows[i].cells[0].innerHTML;
        // json += "\""; 
        // json += ":";
        json += "{";
        for (var j = 0; j < 3; j++) {
            //tdName = KeysArray[j]; //Json数据的键
            tdValue = document.getElementById(tbID).rows[i].cells[j].innerHTML;//Json数据的值
            json += "\""; //加上一个双引号
            json += KeysArray[j];
            json += "\""; 
            json += ":";
            json += "\""; 
            json += tdValue;
            json += "\""; 
            json += ",";
        }
        json = json.substring(0, json.length - 1);
        json += "}";
        json += ",";
    }
    json = json.substring(0, json.length - 1);
    json += "]";
    
    console.log(json);
    return json;
  }
}

document.getElementById("saveList").addEventListener("click",()=>{
  // if(document.getElementById("stickyTb").innerHTML){
  let saveData = readTableToJson("stickyTb");
  window.localStorage.setItem("WorkListObj",saveData);

  
});

window.onload = function(){
 let readDataObj = JSON.parse(window.localStorage.getItem("WorkListObj"));
 console.log(readDataObj);
 writeTableFromJsonObj(readDataObj,"stickyTb");
 workerTempObj = readDataObj;
 stickyNum = readDataObj.length + 1;
}
