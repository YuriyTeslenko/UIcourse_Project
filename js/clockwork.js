$(function() {
	var sidebar = $("div.side");
	var article = $("article");
	var txtimg = $("article img");
	var artctrl = ".rollup";
	var comparewndw = $("div.scrcomp");
	var imgonside = "div.side img";
	var maxonside =5;

	var closebtn = '<a class="rollup" href="#">&#215;</a>';
	var toleftbtn = '<a name="tolft" class="rollup" href="#">&#40;</a>';
	var torightbtn = '<a name="torgt" class="rollup" href="#">&#41;</a>';
	var img_compare = '<a class="rollup" href="#">&#68;</a>';
	var imgisonside = '<span class="rollup" href="#">&#73;</span>';
	var storeindx = 'img';

	function localRebuild(){
		var localURLs = [];
		$(imgonside).each(function(){
			localURLs.push($(this).attr("src"));
		});
		localStorage[storeindx]=JSON.stringify(localURLs);
	}

	sidebar.draw = function(imageURL){
		sidebar.append('<img src="'+imageURL+'"">');
		sidebar.append(closebtn);
	}
	sidebar.add = function(imageURL) {
		if (sidebar.contain()==maxonside) {return false};
		sidebar.draw(imageURL);
		localRebuild();
		return true;
	}
	sidebar.contain = function(element){
		if (!element) {return $(imgonside).length};
		var onsideimg=$(imgonside).get();
		var elementsrc=element.attr("src");
		for (var i = 0; i < onsideimg.length; i++) {
			if ($(onsideimg[i]).attr("src")==elementsrc) {return i+1};
		};
		return false;
	}

	sidebar.click(function(sidevent){
		var eventarget=sidevent.target;
		//eventarget.tagName=="IMG";
		if (eventarget.tagName=="A" && $(eventarget).prev("img").remove()) {
			$(eventarget).remove();
			localRebuild();
			article.render();
			return false;
		};
	});

	article.render = function(){
		article.children(artctrl).remove();
		if (!sidebar.contain()){
			txtimg.after(toleftbtn);
			return;
		}
		txtimg.each(function(){
			var element=$(this);
			if (!sidebar.contain(element)) {
				element.after(img_compare);
				element.after(toleftbtn);
			}else{
				element.after(img_compare);
				element.after(imgisonside);
			}
		});

	}

	article.click(function(articlevent){
		var eventarget=articlevent.target;
		//eventarget.tagName=="IMG";
		var prevtag=$(eventarget).prev();
		var prevtagn = prevtag[0].tagName;
		if (prevtagn=="IMG" && eventarget.tagName=="A") {
			sidebar.add(prevtag.attr("src"));
			article.render();
			return false;
		}
		if ((prevtagn=="A" || prevtagn=="SPAN") && eventarget.tagName=="A") {	
			comparewndw.render(prevtag.prev());
			return false;
		}
		return true;
	});
	

	comparewndw.render = function(targetimg, scroll){
		var sideimgs = $(imgonside).clone();
		var itemsnmbr = sideimgs.length-1;
		if (comparewndw.children().length) {
			var activeimg = comparewndw.children("img").last();
			var activimgindx = sidebar.contain(activeimg);
			scroll=="tolft" && activimgindx-2;
			if (activimgindx > itemsnmbr) {activimgindx=0};
			if (activimgindx < 0) {activimgindx=itemsnmbr};
			activeimg.replaceWith(sideimgs[activimgindx]);
			return false;
		}
		targetimg.clone().appendTo(comparewndw);
		comparewndw.append(sideimgs[itemsnmbr]);
		comparewndw.append(toleftbtn);
		comparewndw.append(closebtn);
		comparewndw.append(torightbtn);
		comparewndw.show();
		return false;
	}

	comparewndw.click(function(cmpevent) {
		var cmptarget=cmpevent.target.getAttribute("name");
		if (cmptarget){
			comparewndw.render(null,cmptarget);
			return false;
		}
		comparewndw.hide();
		comparewndw.empty();
		return false;
	});

	var storeditms = JSON.parse(localStorage.getItem(storeindx));
	if (storeditms) {
		for (var i = 0; i < storeditms.length; i++) {
			sidebar.draw(storeditms[i]);
		}
	}
	$(window).width()>800 && article.render();

});