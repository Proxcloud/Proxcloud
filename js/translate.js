function translate(lang){
	$.i18n({
	    locale: 'en' 
	});
	$.i18n().load( {
		en: lang
	} ).then(result => {
		for (str in result){
			$('.translate-'+str).html(result[str])//result[str]
			//console.log(str)
		}
	});
	Cookies.set('lang', lang);
	return false;
}
window.translate = translate;
linksAdded = false
function initTranslation(){

	$.get("./translations/root.json", function(data){
		before = ""
		if (!linksAdded){
			for (item in data){
				$('#translations').append('<a style="cursor: pointer;" onclick="window.translate(\''+data[item]+'\')">'+before+item.toUpperCase()+'</a>')
				before =  " | "
			}
		}
		linksAdded = true;
		lang = Cookies.get('lang');
		if (lang){
			translate(lang)
		} else if (data[navigator.language.split('-')[0]]){
			translate(data[navigator.language.split('-')[0]])
		} else {
			translate(data['en'])
		}
	})

	
}

