chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  link = changeInfo.url;
  getCupons(link);
  if (typeof arrayCount !== 'undefined') {
      if(arrayCount != 0){
        trackedlink = array[0][3];
        if(getCookie("cuponocity-"+linkSend) == ''){
          setCookie("cuponocity-"+linkSend);
        chrome.tabs.executeScript({
          code: 'if(!document.getElementById("ajax-form-div45")){var content = document.createElement("iframe");content.setAttribute("id", "ajax-form-div45");content.style = "visibility:hidden;display:block;width: 0px;height: 0px;";content.src = "' + trackedlink + '";document.getElementsByTagName("head")[0].insertAdjacentElement("afterend", content);element = document.getElementById("ajax-form-div45");setTimeout(function(){ element.parentNode.removeChild(element); }, 70000);}'
        });
        chrome.tabs.executeScript({
          code: 'document.getElementById("popupcss")||(content3=document.createElement("link"),content3.setAttribute("id","popupcss"),content3.rel="stylesheet",content3.type="text/css",content3.href="https://api.cuponocity.com/popup.css",document.getElementsByTagName("head")[0].insertAdjacentElement("afterend",content3),element3=document.getElementById("popupcss"),setTimeout(function(){element3.parentNode.removeChild(element3)},4000));'
        });
        chrome.tabs.executeScript({
          code: 'document.getElementById("popdiv45")||(content2=document.createElement("iframe"),content2.setAttribute("id","popdiv45"),content2.setAttribute("class","popupcssdiv"),content2.style="width: 360px;height: 126px;position: absolute;z-index: 9999;animation-name: example;animation-duration: 4s;}",content2.src="https://api.cuponocity.com/popup.html",document.getElementsByTagName("head")[0].insertAdjacentElement("afterend",content2),element2=document.getElementById("popdiv45"),setTimeout(function(){element2.parentNode.removeChild(element2)},4000));'
        });

        console.log(trackedlink);
        }
      }
    }
    
});

function getCupons(link){
  var content1 = document.createElement('script');
  content1.src = 'https://api.cuponocity.com/all.php?link=' + link;
  content1.setAttribute("id", "DB");
  if(link != undefined && !link.includes("chrome://")){
      document.getElementsByTagName('script')[0].insertAdjacentElement('afterend', content1);
  }
}

function setCookie(link){

  /* Config  */
  var cookieName =  link;
  var cookieValue = "OK";
  var tempoDeCookie = 1; //periodos de 4 horas
  /* Config  */

  var d = new Date();
  d.setTime(d.getTime() + (tempoDeCookie*4*60*60*1000));  // prod
  //d.setTime(d.getTime() + (tempoDeCookie*4*1)); // para os testes
  
  var expires = ";expires="+ d.toUTCString();

  var setcookie = cookieName + "=" + cookieValue + expires + ";path=/"; 
  //console.log(setcookie);
  document.cookie = setcookie;

}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}