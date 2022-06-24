

  "use strict";
  //---AMM & EMM REV 在此处更改---------
  const S92AMMRev = "REV.40";
  const S92EMMRev = "REV.20";
  const S76CAMMRev = "REV.33";
  const S76CEMMRev ="REV.18";

  //--- S92 定检项目 + 章节-------------------------
  const S92CraftProject = [
    "10HRS不可延期",
    "25HRS不可延期",
    "50HRS不可延期",
    "50HRS",
    "100H不可延期",
    "100HRS",
    "150HRS不可延期",
    "250HRS不可延期",
    "375HRS",
    "500HRS",
    "750HRS不可延期",
    "750HRS",
    "1250HRS./1Y.",
    "1500HRS",
    "30D",
    "3M",
    "6M",
    "12M",
    "2Y",
    "250HRS./6M.",
    "250HRS./1Y.不可延期",
    "500HRS./1Y.",
    "1500HRS./2Y.",
    "2500HRS./2Y.",
    "CT7-8A发动机50HRS",
    "CT7-8A发动机250HRS",
    "CT7-8A发动机500HRS",
    "CT7-8A发动机1000HRS",
    "CT7-8A发动机1500HRS",
    "APU 750HRS./750CYC.",
    "APU 750HRS./1Y.",
  ];

  const chapterS92 = {
    "10HRS不可延期":"64",
    "25HRS不可延期":"63",
    "50HRS不可延期":"55",
    "50HRS":"21",
    "100H不可延期":"63",
    "100HRS":"52",
    "150HRS不可延期":"53",
    "250HRS不可延期":"64",
    "375HRS":"21",
    "500HRS":"65",
    "750HRS不可延期":"53",
    "750HRS":"20",
    "1250HRS./1Y.":"53",
    "1500HRS":"5",
    "30D":"26",
    "3M":"34",
    "6M":"31",
    "12M":"5",
    "2Y":"23",
    "250HRS./6M.":"62",
    "250HRS./1Y.不可延期":"53",
    "500HRS./1Y.":"25",
    "1500HRS./2Y.":"53",
    "2500HRS./2Y.":"32",
    "CT7-8A发动机50HRS":"72",
    "CT7-8A发动机250HRS":"74",
    "CT7-8A发动机500HRS":"79",
    "CT7-8A发动机1000HRS":"79",
    "CT7-8A发动机1500HRS":"72",
    "APU 750HRS./750CYC.":"49",
    "APU 750HRS./1Y.":"49",
  };
  //--- S76C 定检项目 + 章节-------------------------
  const S76CCraftProject = [
    "25HRS不可延期",
    "50HRS",
    "50HRS不可延期",
    "100HRS",
    "100HRS不可延期",
    "300HRS",
    "300HRS不可延期",
    "600HRS",
    "900HRS",
    "1500HRS",
    "1500HRS不可延期",
    "30D",
    "12M",
    "2Y",
    "36",
    "300HRS./3M.",
    "300HRS./1Y.不可延期",
    "300HRS./1Y.",
    "600HRS./6M.",
    "600HRS./1Y.",
    "900HRS./1Y.",
    "1250HRS./3Y不可延期",
    "1250HRS./2Y.",
    "3000HRS./4Y.",
    "ARRIEL 2S1 发动机20HRS",
    "ARRIEL 2S1 发动机30HRS",
    "ARRIEL 2S1 发动机50HRS",
    "ARRIEL 2S1 发动机250HRS",
    "ARRIEL 2S1 发动机500HRS",
    "ARRIEL 2S1 发动机1000HRS",
    "ARRIEL 2S2 发动机20HRS",
    "ARRIEL 2S2 发动机30HRS",
    "ARRIEL 2S2 发动机50HRS",
    "ARRIEL 2S2 发动机300HRS",
    "ARRIEL 2S2 发动机600HRS",
    "ARRIEL 2S2 发动机3000HRS",
  ];

  const chapterS76C = {
    "25HRS不可延期":"65",
    "50HRS":"32",
    "50HRS不可延期":"65",
    "100HRS":"32",
    "100HRS不可延期":"32",
    "300HRS":"32",
    "300HRS不可延期":"55",
    "600HRS":"25",
    "900HRS":"55",
    "1500HRS":"32",
    "1500HRS不可延期":"55",
    "30D":"26",
    "12M":"32",
    "2Y":"39",
    "36":"28",
    "300HRS./3M.":"66",
    "300HRS./1Y.不可延期":"18",
    "300HRS./1Y.":"65",
    "600HRS./6M.":"67",
    "600HRS./1Y.":"76",
    "900HRS./1Y.":"66",
    "1250HRS./3Y不可延期":"65",
    "1250HRS./2Y.":"24",
    "3000HRS./4Y.":"71",
    "ARRIEL 2S1 发动机20HRS":"71",
    "ARRIEL 2S1 发动机30HRS":"72",
    "ARRIEL 2S1 发动机50HRS":"73",
    "ARRIEL 2S1 发动机250HRS":"73",
    "ARRIEL 2S1 发动机500HRS":"72",
    "ARRIEL 2S1 发动机1000HRS":"70",
    "ARRIEL 2S2 发动机20HRS":"71",
    "ARRIEL 2S2 发动机30HRS":"72",
    "ARRIEL 2S2 发动机50HRS":"73",
    "ARRIEL 2S2 发动机300HRS":"73",
    "ARRIEL 2S2 发动机600HRS":"72",
    "ARRIEL 2S2 发动机3000HRS":"73",
  };


  const S92Worker =[
    {"name":"蔡积洲","code":"191383"},
    {"name":"蔡鹏飞","code":"214534"},
    {"name":"曾令煜","code":"757244"},
    {"name":"陈焕东","code":"217413"},
    {"name":"陈捷","code":"191414"},
    {"name":"陈瑾","code":"229833"},
    {"name":"陈军","code":"757245"},
    {"name":"陈宁","code":"216006"},
    {"name":"陈若雄","code":"208368"},
    {"name":"陈翔","code":"191454"},
    {"name":"陈应林","code":"759113"},
    {"name":"陈玉梅","code":"191489"},
    {"name":"陈志多","code":"206920"},
    {"name":"陈钟浜","code":"214536"},
    {"name":"陈仲谋","code":"206915"},
    {"name":"褚正阳","code":"214528"},
    {"name":"邓继勇","code":"191434"},
    {"name":"邓仁亮","code":"725255"},
    {"name":"邓尚辉","code":"191446"},
    {"name":"邓真正","code":"212574"},
    {"name":"丁冬","code":"214514"},
    {"name":"杜国威","code":"212619"},
    {"name":"杜华","code":"191407"},
    {"name":"范振兴","code":"215994"},
    {"name":"封旺","code":"214530"},
    {"name":"冯绮君","code":"191424"},
    {"name":"冯巧娜","code":"725254"},
    {"name":"冯永超","code":"283964"},
    {"name":"符风雨","code":"217414"},
    {"name":"付永鹏","code":"216001"},
    {"name":"关爽","code":"749152"},
    {"name":"关土龙","code":"191380"},
    {"name":"关卫强","code":"725250"},
    {"name":"韩继阳","code":"733992"},
    {"name":"韩青云","code":"216005"},
    {"name":"何慧红","code":"191418"},
    {"name":"胡斌","code":"254044"},
    {"name":"黄东令","code":"214546"},
    {"name":"黄李铭","code":"216009"},
    {"name":"黄敏婷","code":"760469"},
    {"name":"黄铭","code":"215998"},
    {"name":"黄天荣","code":"191400"},
    {"name":"黄远卫","code":"191438"},
    {"name":"贾鹏飞","code":"212578"},
    {"name":"鞠邦超","code":"210803"},
    {"name":"劳玉春","code":"191483"},
    {"name":"黎富华","code":"191382"},
    {"name":"李柏杉","code":"254078"},
    {"name":"李丹","code":"720556"},
    {"name":"李峰","code":"191437"},
    {"name":"李庚峰","code":"214527"},
    {"name":"李汉钊","code":"214547"},
    {"name":"李佳栋","code":"217415"},
    {"name":"李家天","code":"217408"},
    {"name":"李健鸿","code":"210805"},
    {"name":"李杰文","code":"216014"},
    {"name":"李菁","code":"759119"},
    {"name":"李开聪","code":"003867"},
    {"name":"李培","code":"215995"},
    {"name":"李倩","code":"759111"},
    {"name":"李霞","code":"194108"},
    {"name":"李瑜","code":"191381"},
    {"name":"李振林","code":"191425"},
    {"name":"练子琦","code":"217416"},
    {"name":"梁德杰","code":"191374"},
    {"name":"梁华洪","code":"191448"},
    {"name":"梁嘉祺","code":"217417"},
    {"name":"梁玉东","code":"759247"},
    {"name":"梁玉东","code":"757247"},
    {"name":"廖博文","code":"214535"},
    {"name":"廖泊儒","code":"268951"},
    {"name":"林广桐","code":"248340"},
    {"name":"林华乐","code":"214532"},
    {"name":"林加发","code":"215987"},
    {"name":"林嘉欣","code":"780277"},
    {"name":"林锦泉","code":"191379"},
    {"name":"林俊晓","code":"217418"},
    {"name":"林元铖","code":"216002"},
    {"name":"林泽荣","code":"216011"},
    {"name":"凌辉","code":"197071"},
    {"name":"刘光洪","code":"215991"},
    {"name":"刘靓","code":"191509"},
    {"name":"刘立伟","code":"725248"},
    {"name":"刘普","code":"206730"},
    {"name":"刘潜","code":"279007"},
    {"name":"刘像","code":"214529"},
    {"name":"刘旭","code":"284271"},
    {"name":"刘旭东","code":"191440"},
    {"name":"刘泽朝","code":"217410"},
    {"name":"柳彬","code":"213049"},
    {"name":"龙泉","code":"191506"},
    {"name":"卢青","code":"212579"},
    {"name":"罗培德","code":"191478"},
    {"name":"罗益","code":"214538"},
    {"name":"马祥龙","code":"212569"},
    {"name":"麦鸿钊","code":"759145"},
    {"name":"毛志凌","code":"217554"},
    {"name":"莫建瑞","code":"191406"},
    {"name":"倪世滨","code":"214548"},
    {"name":"欧东","code":"191369"},
    {"name":"欧健","code":"214543"},
    {"name":"欧铭章","code":"216000"},
    {"name":"钱汝文","code":"214542"},
    {"name":"饶剑","code":"759126"},
    {"name":"任海涛","code":"191427"},
    {"name":"任龙飞","code":"212565"},
    {"name":"任维蒙","code":"759139"},
    {"name":"师俭超","code":"205407"},
    {"name":"石丽芳","code":"254043"},
    {"name":"宋姣","code":"761336"},
    {"name":"宋亮","code":"759140"},
    {"name":"苏光","code":"215996"},
    {"name":"苏人正","code":"212571"},
    {"name":"孙佺","code":"217411"},
    {"name":"唐洪","code":"212573"},
    {"name":"唐鹏","code":"191453"},
    {"name":"唐鹏","code":"759110"},
    {"name":"田伟","code":"203242"},
    {"name":"汪泉林","code":"284269"},
    {"name":"王朝军","code":"212576"},
    {"name":"王凤翔","code":"212570"},
    {"name":"王吉阳","code":"217409"},
    {"name":"王剑飞","code":"216003"},
    {"name":"王江鹏","code":"208369"},
    {"name":"王通","code":"214531"},
    {"name":"王同强","code":"216010"},
    {"name":"魏博","code":"216008"},
    {"name":"吴杰","code":"209768"},
    {"name":"吴锡锋","code":"215993"},
    {"name":"吴宜渊","code":"214539"},
    {"name":"吴越","code":"214541"},
    {"name":"伍勇毅","code":"213226"},
    {"name":"武圆圆","code":"247542"},
    {"name":"夏世谦","code":"282956"},
    {"name":"谢立珊","code":"191377"},
    {"name":"谢凌锋","code":"212567"},
    {"name":"谢珊娜","code":"763295"},
    {"name":"徐光辉","code":"205408"},
    {"name":"徐品通","code":"243186"},
    {"name":"徐树雄","code":"214526"},
    {"name":"徐晓明","code":"209761"},
    {"name":"闫渤","code":"734060"},
    {"name":"严峻","code":"205406"},
    {"name":"严晓辉","code":"191441"},
    {"name":"阳开","code":"210807"},
    {"name":"杨东鹏","code":"187005"},
    {"name":"杨帆","code":"215988"},
    {"name":"杨浩","code":"208114"},
    {"name":"杨慧海","code":"217412"},
    {"name":"杨剑华","code":"206914"},
    {"name":"杨俊强","code":"216013"},
    {"name":"杨兴","code":"254042"},
    {"name":"杨振","code":"254079"},
    {"name":"杨志江","code":"210802"},
    {"name":"姚长江","code":"205405"},
    {"name":"叶大成","code":"212575"},
    {"name":"叶锦泉","code":"216004"},
    {"name":"叶佩琪","code":"757243"},
    {"name":"叶英发","code":"216012"},
    {"name":"易超祥","code":"749153"},
    {"name":"易洪亮","code":"749151"},
    {"name":"于大鹏","code":"773498"},
    {"name":"余德华","code":"191504"},
    {"name":"原涛","code":"215990"},
    {"name":"张常亮","code":"210804"},
    {"name":"张帝","code":"215992"},
    {"name":"张海峰","code":"210806"},
    {"name":"张海燕","code":"737328"},
    {"name":"张晶巍","code":"191472"},
    {"name":"张诗雅","code":"766550"},
    {"name":"张雯雯","code":"759117"},
    {"name":"张璇","code":"742745"},
    {"name":"张勇","code":"712591"},
    {"name":"章仕俊","code":"219222"},
    {"name":"赵维鑫","code":"731420"},
    {"name":"甄康","code":"215999"},
    {"name":"周炳朴","code":"208361"},
    {"name":"周飞","code":"191511"},
    {"name":"周全","code":"208115"},
    {"name":"周宪众","code":"214540"},
    {"name":"周亚文","code":"191366"},
    {"name":"周艳","code":"761362"},
    {"name":"周运","code":"212566"},
    {"name":"朱惠婷","code":"212582"},
    {"name":"朱苏波","code":"191449"},
    {"name":"朱志聪","code":"229832"},
    {"name":"邹章平","code":"215989"},
    {"name":"左中","code":"212572"},

  ];


  let stickyNum = 1; //用于存储列表序号的变量
  let workerTempObj =[];  //用于存储暂存列表的临时数组

  //---机型选择下拉框的临时变量------
  let aircraftSelected = document.getElementById("craftModel");
  let aircraftSelectedResult = aircraftSelected.options[aircraftSelected.selectedIndex].value;

  //--------获取并显示当前日期-------
  let ddd = new Date();
  let day =ddd.getDate();
  let month;
  if(ddd.getMonth()<10){
    month = "0"+(ddd.getMonth()+1); 
  }
  if(ddd.getDate()<10){
    day = "0"+ddd.getDate(); 
  }
  let datew = ddd.getFullYear()+"-"+month+"-"+day;
  datew = datew.toString();
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
        + myProject.options[myProjectSelectIndex].value + "定检，检查结果正常，限于本项工作，飞机适航。";
    }else if(aircraftSelectedResult == "S76C"){
      textYJ = "依据民航法规及" + MM + "(" + document.getElementById(MM=="EMM"?"EMM":"AMM").value + ")" + "第" + chapterS76C[myProject.options[myProjectSelectIndex].value] + "章节等相关内容" + "，" + 
        "于" + document.getElementById("dateSelect").value.substr(0,4) + "年" 
        + document.getElementById("dateSelect").value.substr(5,2) + "月" 
        + document.getElementById("dateSelect").value.substr(8,2) + "日,"
        + "A/C: " + document.getElementById("FuselageTime").value + " 完成" 
        + myProject.options[myProjectSelectIndex].value + "定检，检查结果正常，限于本项工作，飞机适航。";
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

      str += `<tr id=${searchResult[i].name} onclick='clickSearchTr("复制成功","${searchResult[i].name}","${searchResult[i].code}")' ondblclick='stickyOndblclick("${searchResult[i].name}",${searchResult[i].code})'>` 
      + '<td>'+ (i+1).toString() +'</td>' 
      + '<td>' + searchResult[i].name + '</td>' 
      + '<td>'+searchResult[i].code + '</td>' 
      + '</tr>';
        

    }

    document.getElementById("tb").innerHTML = str;


    //-------------------增加鼠标悬停列表颜色改变------------
    var trTable = document.getElementsByTagName("tr");
    for(var i= 0;i<trTable.length;i++){
      bgcChange(trTable[i]);
    }
  }
    
  //----------点击搜索后得到的列表数据------将员工号添加到上部Sticky列表暂存------------
  function clickSearchTr(log,name,code){
    if(workerTempObj.filter((obj)=>{
      return obj.name.indexOf(name) != -1;
    }).length===0){
      let obj = {"name":name,"code":code};
      workerTempObj.push(obj);//往临时数组内暂存当前点击的对象，用以检索是否重复显示在暂存列表
      let strSticky="";
      strSticky += `<tr id=${"sticky"+name} ondblclick='stickyOndblclick("${name}","${code}")'>`
      + `<td>${stickyNum++}</td>` 
      + `<td>${name}</td>` 
      + `<td>${code}</td>` 
      + "</tr>";
      document.getElementById("sticky-tb").innerHTML += strSticky;  //在<tbody>标签内新增行
      
      if(stickyNum>8){
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
    document.getElementById("sticky-tb").innerHTML = "";
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

  