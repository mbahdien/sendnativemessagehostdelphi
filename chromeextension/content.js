  var bottom_bar=
   "<div id='xxbottom-bar' style='background-color:#db9494;position:fixed;bottom:0;"+
   "left:0px;height:30px;"+
   "width:100%;color:black;display:block;z-index:999'>"+
   "</div>"
   var button_browse=
   "<button id='xxbutton-browse' style='width:80px;position:absolute;left:10px;top:5px;height:20px;background-color:#b53232;"+
   "color:white;'>Browse</button>"
     var button_showtextarea=
   "<button id='xxbutton-showtextarea' style='width:80px;position:absolute;left:450px;"+
   "top:5px;height:20px;background-color:#b53232;"+
   "color:white;'>Show Textarea</button>"
   var txtarea="<div id='xxtest' style='position:absolute;left:50px;bottom:50px;width:60%;height:70%;z-index:999;background-color:wheat;'>"+
   "<p>Masukkan tulisan dalam jumlah banyak, kira-kira 1MB</p>"+
   "<textarea id='xxtextareainput' style='width:80%;margin-left:10px;height: 100px;'></textarea>"+
   "<p>Output</p>"+
    "<textarea id='xxtextareaoutput' style='width:80%;margin-left:10px;height: 100px;background-color:#aec5d9' readonly='readonly'></textarea>"+
    "<p>"+
    "<button style='margin-left:5px;background-color:gray;width:80px;height:40px;' id='xxoktest'>OK</button><button id='xxcanceltest'"+
    "style='background-color:gray;width:80px;height:40px;margin-left:5px;'>Close</button>"+
    "</p>"
   "</div>"
   var button_test=
      "<button id='xxbutton-test' style='width:80px;position:absolute;left:450px;"+
   "top:5px;height:20px;background-color:#b53232;"+
   "color:white;'>Test</button>"
   var txtbrowse=
   "<input id='xxinput-browse' style='width:300px;position:absolute;left:120px;"+
   "top:5px;height:20px;'/>"
   $(function(){

   	$(bottom_bar).appendTo("body")
    $(txtarea).appendTo("body").hide()
   	$(button_browse).appendTo("#xxbottom-bar")
   $(button_test).appendTo("#xxbottom-bar")
    $(txtbrowse).appendTo("#xxbottom-bar")
    $("#xxbutton-test").on("click",()=>{
       
        $("#xxtest").show()
    })
  

   	$("#xxbutton-browse").on("click",()=>{
         
           
   		chrome.runtime.sendMessage({action:"browse",native:true})
   	})
    $("#xxcanceltest").on("click",()=>{
        $("#xxtest").hide()
    })
    $("#xxoktest").on("click",()=>{
        $("#xxtextareaoutput").text("")
        chrome.runtime.sendMessage({action:"test",native:true,txt:$("#xxtextareainput").val()})
    })
    chrome.runtime.onMessage.addListener((msg)=>{
        if(msg.action=="browse"){
            $("#xxinput-browse").val(msg.filename)
        }
        else if(msg.action=="test"){
            $("#xxtextareaoutput").text(msg.txt)
        }
    })
   })
   
