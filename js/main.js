function alertmsg() { 
	document.getElementById("loader").classList.toggle("loader-open");
	document.getElementById("text1").innerHTML=""; 
	document.getElementById("settings").classList.toggle("settings-open");
}

function redirectUser(id, idLink) {
		idLink = "cupom-" + idLink;
		url = document.getElementById(idLink).href;
		updateProperties = new Object();
		updateProperties.url = url;
		//console.log(url);
		updateProperties.active = false;
		chrome.tabs.update(id, updateProperties, function() {});
}

function clearView(){
	document.getElementsByTagName("img")[0].remove();
	document.getElementById("img").innerHTML="";
	document.getElementById("text").innerHTML="";
	document.getElementById("text").classList.toggle("absolute-text");
	document.getElementById("loader").classList.toggle("loader-open");
	document.getElementById("text1").innerHTML=""; 
	document.getElementById("settings").classList.toggle("settings-open");
}

function getCupons(link){
  var content1 = document.createElement('script');
  content1.src = 'https://api.cuponocity.com/all.php?link=' + link;
  content1.setAttribute("id", "DB");
  if(link != undefined && !link.includes("chrome://")){
      document.getElementsByTagName('script')[0].insertAdjacentElement('afterend', content1);
  }
}

function createContent(id, array){
	clearView();

	deep = "https://deeplink.cuponocity.com/?link=";
	
	//content = document.createElement("img");
	//content.setAttribute("src", array[0].storeImage1);
	//document.getElementById("text").append(content);

	for (var i = array.length - 1; i >= 0; i--) {
		document.getElementById("text1").innerHTML="";
		linkTrackeado = array[i].ID;
		var content = document.createElement("a");
		content.setAttribute("id", "cupom-" + array[i].ID);
		content.setAttribute("href", deep + array[i].link);
		content.setAttribute("target", id);
		content.setAttribute("onclick", "redirectUser('"+id+"', '" + deep + linkTrackeado + "')");
		content.setAttribute("class", "list-group-item list-group-item-action flex-column align-items-start cupom-" + array[i].ID);
		conteudo = '<small>##i##</small> <div class="d-flex w-100 justify-content-between"> <h5 class="mb-1"><em><strong>Categoria:</strong></em> ##categoryName##</h5> </div><p class="mb-1"><em><strong>Descrição:</strong></em> <br>##title##</p><small><em><strong>Código:</strong></em> <mark>##code##</mark></small><input type="hidden" id="idtab" value="##idTab##">';
		conteudo = conteudo.replace("##categoryName##", array[i].categoryName);
		conteudo = conteudo.replace("##title##", array[i].title);
		conteudo = conteudo.replace("##code##", array[i].code);
		conteudo = conteudo.replace("##i##", i+1);
		conteudo = conteudo.replace("##idTab##", id);

		content.innerHTML= conteudo;

		content.addEventListener("click", function(){redirectUser(id, linkTrackeado)});
		document.getElementById("itemList").appendChild(content);
	}
}

function main() {
	chrome.tabs.query({active: true, currentWindow: true}, 
		function(tabs) {
			var tab = tabs[0];
			getCupons(tab.url);
			exec = setTimeout(main, 1000);
			if (typeof arrayCount !== 'undefined') {
		  		if(arrayCount != 0){
					clearTimeout(exec);
					//console.log(query);
					createContent(tab.id, array);
				}else{
					clearTimeout(exec);
					alertmsg();
				}
		  	}
	  	});
}

var exec = setTimeout(main, 1000);