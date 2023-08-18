

let aircraftList = [];
let reportJson = [];
let generatedTime = "";

 
document.getElementById("file_upload").addEventListener("change",(event)=>{
    let file = event.target.files[0];

    let reader = new FileReader();
    reader.readAsBinaryString(file);

    //---文件解析完成后执行 onload 事件函数---
    reader.onload = function(e){
        let tempData = e.target.result;
        // console.log(tempData);
        let workbook;
        workbook = XLSX.read(tempData,{type:"binary"});
        // console.log(workbook);
        let worksheet = workbook.Sheets[workbook.SheetNames[0]];

        //修改表头，方便后续转化成 JSON 调用
        const Range = XLSX.utils.decode_range(worksheet["!ref"]);
        for(let c = Range.s.c; c <= Range.e.c; c++) {
            let header = XLSX.utils.encode_col(c) + '1';
            worksheet[header].v = c;
            worksheet[header].w = c;
        }

        // console.log(worksheet);
        //---拿到转换过表头后的 JSON 原始数据---
        let TempJsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log(TempJsonData);

        //---获取 Generated Time ---
        generatedTime = TempJsonData[TempJsonData.length-1][3];

        //---在原始 JSON 数据内找到字符串 "Aridraft #" 的位置,用以定位每架飞机对应数据的起始位置
        let keyAircraft = findKey(TempJsonData,"Aircraft #");
        console.log(keyAircraft);

        let tempWorkList = {};

        //-----获取飞机列表---并整理有用数据-----
        for(i=0;i<keyAircraft.length;i++){
            let nextRowNum = Number(keyAircraft[i]) + 1;
            let firstList = Number(keyAircraft[i]) + 4;
            aircraftList.push(TempJsonData[nextRowNum][0]);

            let tempObj = {};
            let tempList = [];
            tempObj.aircraftID = TempJsonData[nextRowNum][0];
            tempObj.flightHour = TempJsonData[nextRowNum][5];
            tempObj.model = TempJsonData[nextRowNum][1 ];

            //计算对应飞机实际定检项目数量，这里最后一个飞机列表特殊处理
            let actualListNum = 0;
            if(i<(keyAircraft.length-1)){
                actualListNum = keyAircraft[i+1]-keyAircraft[i]-4;
            }
            else{
                actualListNum = TempJsonData.length-keyAircraft[i]-6;
            }
            
            //判断如果实际定检列表少于设置展示数量的时候,展示实际数量  --- 这个判断要放到 写表格的时候，代办
            // for(j = 0 ; actualListNum<WorkListNum?j<actualListNum:j<WorkListNum; j++){
            //     let indexTemp = firstList + j;
            //     tempWorkList = {
            //         "name":TempJsonData[indexTemp][1],
            //         "remain":TempJsonData[indexTemp][10],
            //         "due":TempJsonData[indexTemp][11],
            //         "lineNum":TempJsonData[indexTemp][2],

            //     };
            //     tempList.push(tempWorkList);
            // }

            for(j=0 ;j<actualListNum; j++){
                let indexTemp = firstList + j;
                // console.log(JSON.stringify(TempJsonData[indexTemp][10]));
                tempWorkList = {
                    "name":TempJsonData[indexTemp][1],
                    "remain":TempJsonData[indexTemp][10],
                    "due":TempJsonData[indexTemp][11],
                    "lineNum":TempJsonData[indexTemp][2],
                    // "isDue":isDue,
                };
                tempList.push(tempWorkList);
            }

            tempObj.workList = tempList;
            reportJson.push(tempObj);
        }   
        
        console.log(aircraftList);
        console.log(reportJson);
        
        //---读取 LocalStorage 中存储的已勾选飞机列表---
        let savedCheckedList = JSON.parse(window.localStorage.getItem("checkedAircraftList"));

        //---制作飞机列表选择---
        let strSelect = "";
        strSelect += `<tr>`
        +`<td>全选:<input type="checkbox" class="configCheckbox" id="selectAll" onchange="selectAllAircraft()"></td></tr>`
        +`<td>珠海 S92 :<input type="checkbox" class="configCheckbox" id="zhuhaiS92" onchange="selectZhuhaiS92()"></td></tr>`
        +`<td>珠海 S76 :<input type="checkbox" class="configCheckbox" id="zhuhaiS76" onchange="selectZhuhaiS76()"></td></tr>`
        ;
        aircraftList.forEach((element)=>{
                if(savedCheckedList && savedCheckedList.indexOf(element) !== -1){
                    strSelect += `<tr>`
                    +`<td><input type="checkbox" class="checkboxAircraftList" name="${element}" checked>${element}</td>`
                    +`</tr>`;
                }else{
                    strSelect += `<tr>`
                    +`<td><input type="checkbox" class="checkboxAircraftList" name="${element}" >${element}</td>`
                    +`</tr>`;
                }  
        });
        document.getElementById("selectAircraftTable").innerHTML=strSelect;
        document.getElementById("logTextarea").innerHTML = "文件导入成功";
    }

});


//----------------------------------------------生成按钮---点击事件------------------------------------------
document.getElementById("generateReportButton").addEventListener("click",()=>{
    if(document.getElementsByClassName("checkboxAircraftList").length !== 0){//如果飞机待展示列表未生成，判断为还没有选择文件
        //获取应该展示的飞机列表数据
        let checkboxlist = document.getElementsByClassName("checkboxAircraftList");
        let checkedAircraftList = [];

        //---因默认情况下 隐藏 LINE 号列表，点击生成按钮时，把复选框清空
        document.getElementById("lineNumCheckbox").checked = false;

        //---暂时改为不去判断是否勾选，直接写列表，然后隐藏此列，后续通过勾选触发显示隐藏
        // let lineNumIsShown = document.getElementById("lineNumCheckbox").checked;
        for(i=0;i<checkboxlist.length;i++){
            if(checkboxlist[i].checked){
                checkedAircraftList.push(checkboxlist[i].name);
            }
        }  
        //---把配置数据存储到 LocalStorage ---
        window.localStorage.setItem("checkedAircraftList",JSON.stringify(checkedAircraftList));
        
        //-----根据 Json 写表格-----
        let innerStr = "";
        innerStr += `<div id="DataExportedTimeBox">数据导出时间：${generatedTime}</div>`;
        reportJson.forEach((obj)=>{
            //---只有在被选择列表里的飞机数据才会被展示出来
            if(checkedAircraftList.indexOf(obj.aircraftID) !== -1){
                // let thatObj = obj;
                innerStr += `<table border="1">`
                +`<thead>`
                +`<tr>`
                +`<th class="tdColA">${obj.aircraftID}</th>`
                +`<th class="tdColB" contenteditable="true"><span>A/C:</span> <div>${obj.flightHour}</div></th>`
                +`<th class="tdColC"></th>`
                +`<th class="tdColD" hidden="true"></th>`
                +`</tr>`
                +`</thead>`
                +`<tbody id=${obj.aircraftID}>`
                +`<tr id="tbodyMenuHead">`
                +`<td class="tdColA">定检项目</td>`
                +`<td class="tdColB">到期时间</td>`
                +`<td class="tdColC">剩余时间</td>`
                +`<td class="tdColD" hidden="true">LINE 号</td>`
                +`</tr>`
                ;
                let strWorkList = "";
                let WorkListNum = document.getElementById("setListNum").value;
                let tempNum = obj.workList.length<WorkListNum?obj.workList.length:WorkListNum;
                for(let j=0; j<tempNum;j++){
                    let tempWorkName = obj.workList[j].name;
                    tempWorkName.length-tempWorkName.indexOf("\n")<4?tempWorkName = tempWorkName:tempWorkName = tempWorkName.substr(tempWorkName.indexOf("\n")+1,tempWorkName.length-tempWorkName.indexOf("\n"));

                    let fontColor = isRemainDue(obj.workList[j].remain)?"red":"black";

                    strWorkList += `<tr>`
                    +`<td class="tdColA">${tempWorkName}</td>`
                    +`<td class="tdColB">${ obj.workList[j].due}</td>`
                    +`<td class="tdColC" contenteditable="true" style="color:${fontColor}">${ obj.workList[j].remain}</td>`
                    +`<td class="tdColD" hidden="true">${ obj.workList[j].lineNum.substring(5,obj.workList[j].lineNum.length)}</td>`
                    +`</tr>`;
                }   
              
                innerStr += strWorkList +`</tbody>`+`</table>`;
            }
        });
        // innerStr += `<p>abc</p><p>def</P>`;
        document.getElementById("showDataBox").innerHTML=innerStr;
        document.getElementById("logTextarea").innerHTML = "写表格成功";

    }else{
        alert("请先选择文件");
        document.getElementById("logTextarea").innerHTML = "请先导入文件";
    }
                
});

//------------查找对象值，并返回对应 Key 的数组------------- 
function findKey(obj,findValue){
    let findKey = [];
    for(let key in obj){
        if(obj[key][0] === findValue){
            findKey.push(key);
        }
    }
    return findKey;
}



// 全选飞机复选框 回调函数
function selectAllAircraft(){
    let isChecked = document.getElementById("selectAll").checked;
    let tempList = document.getElementsByClassName("checkboxAircraftList");
    if(isChecked){
        for(i=0;i<tempList.length;i++){
            tempList[i].checked = true;
        }
    }else{
        for(i=0;i<tempList.length;i++){
            tempList[i].checked = false;
        }
    }

}

// 珠海S92飞机复选框 回调函数
function selectZhuhaiS92(){
    let isChecked = document.getElementById("zhuhaiS92").checked;
    let tempList = document.getElementsByClassName("checkboxAircraftList");
    let zhuhaiS92Element = [];
    for(i=0;i<tempList.length;i++){
        if(ConfigData[0].ZhuHaiS92List.indexOf(tempList[i].name) !== -1){
            zhuhaiS92Element.push(tempList[i]);
        }
    }
    for(i=0;i<zhuhaiS92Element.length;i++){
            if(isChecked){
                zhuhaiS92Element[i].checked = true;
            }else{
                zhuhaiS92Element[i].checked = false;
            }
    }
}

// 珠海S76飞机复选框 回调函数
function selectZhuhaiS76(){
    let isCheckedS76 = document.getElementById("zhuhaiS76").checked;   
    let tempList = document.getElementsByClassName("checkboxAircraftList");
    let zhuhaiS76Element = [];
    for(i=0;i<tempList.length;i++){
        if(ConfigData[0].ZhuHaiS76List.indexOf(tempList[i].name) !== -1){
            zhuhaiS76Element.push(tempList[i]);
        }
    }
    for(i=0;i<zhuhaiS76Element.length;i++){ 
        if(isCheckedS76){
            zhuhaiS76Element[i].checked = true;
        }else{
            zhuhaiS76Element[i].checked = false;
        }
    }
}

//--- 生成图片 --- 按钮 Onclick 回调函数 ---
document.getElementById("copyTableButton").addEventListener("click",()=>{
    var node = document.getElementById("showDataBox");

    domtoimage.toPng(node).then(function (dataUrl) {
        let img = new Image();
        img.src = dataUrl;
        // console.log(dataUrl);
        let newWin = window.open("","_blank");
        newWin.document.write(img.outerHTML);
        newWin.document.title="ReportPNG";
        newWin.document.close();
        document.getElementById("logTextarea").innerHTML = "生成图片成功";
        // document.getElementById("showPic").innerHTML = `<img id="dataTablePicture" src=${dataUrl}></img>`;

    }).catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
});



//--- LINE 号展示复选框 ---回调函数---
document.getElementById("lineNumCheckbox").addEventListener("change",()=>{
    let lineNumElementList = document.getElementsByClassName("tdColD");
    if(document.getElementById("lineNumCheckbox").checked){
        for(i=0;i<lineNumElementList.length;i++){
            // lineNumElementList[i].style.display = "table-cell";
            lineNumElementList[i].hidden = false;
           
        }
        if(document.getElementById("tableStyleSwitch").checked){
            document.getElementById("showDataBox").style.width="auto";
        }else{
            document.getElementById("showDataBox").style.width="1280px";
        }
    }else{
        for(i=0;i<lineNumElementList.length;i++){
            // lineNumElementList[i].style.display = "none";
            lineNumElementList[i].hidden = true;
            
        }
        if(document.getElementById("tableStyleSwitch").checked){
            document.getElementById("showDataBox").style.width="auto";
        }else{
            document.getElementById("showDataBox").style.width="1120px";
        }
    }

});


function isRemainDue(remainStr){
    let isDue = false; 
    let dueDays; 
    let dueFHStr;
    let dueFH;   
    let dueFHReadValue = Number(document.getElementById("setDueFHNum").value) * 60; 
    let dueDayReadValue = Number(document.getElementById("setDueDayNum").value);                      
    if(remainStr === ""){
        isDue = false;
    }else{
        if(remainStr.indexOf("*") !== -1){
            remainStr = remainStr.substring(1,remainStr.length);
        }
        if(remainStr.indexOf("Days") !== -1){
            dueDays = remainStr.substring(0,remainStr.indexOf("Days")-1);
            if(dueDays < dueDayReadValue){
                isDue = true;
            }
            // console.log(remainStr.substring(0,remainStr.indexOf("Days")-1));
        }
        if(remainStr.indexOf("FH") !== -1 ){
            if(remainStr.indexOf("Days") !== -1){
                dueFHStr = remainStr.substring(remainStr.indexOf("\n")-1,remainStr.indexOf("FH")-1);
            }else{
                dueFHStr = remainStr.substring(0,remainStr.indexOf("FH")-1);
            }
            dueFH = Number(dueFHStr.split(":")[0])*60+Number(dueFHStr.split(":")[1]);
            if(dueFH < dueFHReadValue){
                isDue = true;
            }
        }
        if(remainStr.indexOf("EH") !== -1 ){
            if(remainStr.indexOf("Days") !== -1){
                dueFHStr = remainStr.substring(remainStr.indexOf("\n")-1,remainStr.indexOf("EH")-1);
            }else{
                dueFHStr = remainStr.substring(0,remainStr.indexOf("EH")-1);
            }
            dueFH = Number(dueFHStr.split(":")[0])*60+Number(dueFHStr.split(":")[1]);
            if(dueFH < dueDayReadValue){
                isDue = true;
            }
        }

    }
                    
    return isDue;
}

// document.getElementById("testButton").addEventListener("click",()=>{

// });


//-------------------------------- 数字输入 Minus Plus 按钮 回调函数---------------------

document.getElementById("setListNumMinusButton").addEventListener("click",()=>{
    let ListNumValue = Number(document.getElementById("setListNum").value);
    if(ListNumValue > 0){
        document.getElementById("setListNum").value = ListNumValue - 1; 
    }
});

document.getElementById("setListNumPlusButton").addEventListener("click",()=>{
    let ListNumValue = Number(document.getElementById("setListNum").value);
    if(ListNumValue < 20){
        document.getElementById("setListNum").value = ListNumValue + 1; 
    }
});

//---

document.getElementById("setDueFHMinusButton").addEventListener("click",()=>{
    let ListNumValue = Number(document.getElementById("setDueFHNum").value);
    if(ListNumValue > 0){
        document.getElementById("setDueFHNum").value = ListNumValue - 1; 
    }
});

document.getElementById("setDueFHPlusButton").addEventListener("click",()=>{
    let ListNumValue = Number(document.getElementById("setDueFHNum").value);
    if(ListNumValue < 50){
        document.getElementById("setDueFHNum").value = ListNumValue + 1; 
    }
});

//---
document.getElementById("setDueDayMinusButton").addEventListener("click",()=>{
    let ListNumValue = Number(document.getElementById("setDueDayNum").value);
    if(ListNumValue > 0){
        document.getElementById("setDueDayNum").value = ListNumValue - 1; 
    }
});

document.getElementById("setDueDayPlusButton").addEventListener("click",()=>{
    let ListNumValue = Number(document.getElementById("setDueDayNum").value);
    if(ListNumValue < 20){
        document.getElementById("setDueDayNum").value = ListNumValue + 1; 
    }
});


//------------------------------------ 表格样式 Switch --- 回调函数 -----------------
document.getElementById("tableStyleSwitch").addEventListener("change",(Event)=>{
    // console.log(obj);
    let target = Event.target;
    let lineNumElementList = document.getElementsByClassName("tdColD");
    if(target.checked){  
        document.getElementById("DataTableStyle").href = "./style/tableLandscape.css";
        document.getElementById("showDataBox").style.width="auto";
        document.getElementById("lineNumCheckbox").checked = true;
        for(i=0;i<lineNumElementList.length;i++){
            lineNumElementList[i].hidden = false;
            
            
        }
    }else{
        document.getElementById("DataTableStyle").href = "./style/tablePortrait.css";
        document.getElementById("showDataBox").style.width="1120px";
        document.getElementById("lineNumCheckbox").checked = false;
        for(i=0;i<lineNumElementList.length;i++){
            lineNumElementList[i].hidden = true;     
        }
    }
});