const extname="com.anashidayat.sendnative"
function tabQuery(callback){
	chrome.tabs.query({active:true,lastFocusedWindow:true},(tabs)=>{
		let tabid=tabs[0].id
		callback(tabid)
	})
}
chrome.runtime.onMessage.addListener((msg)=>{
	if(msg.native){
		tabQuery((tabid)=>{
					chrome.runtime.sendNativeMessage(extname,msg,(resp)=>{

					if(chrome.runtime.lastError){
						console.log(chrome.runtime.lastError.message)
						return
					}
					
					if(msg.action==='browse'){
							console.log(resp)
							chrome.tabs.sendMessage(tabid,
								{action:msg.action,filename:resp.filename})
						
						
					}
					else if(msg.action=="test"){
						if(resp!=undefined){
							console.log(resp)
							chrome.tabs.sendMessage(tabid,
								{action:msg.action,txt:resp.txt})
						}
						
						
						 
					}
				})
		})
		
		
	}
})
