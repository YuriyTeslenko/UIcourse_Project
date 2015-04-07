$(function() {
	var sidebar = $("div.side");
	var article = $("article");
	var txtimg = $("article img");
	var artctrl = ".rollup";
	var comparewndw = $("div.scrcomp");
	var imgonside = "div.side img";
	var maxonside =5;

	var closebtn = '<a name="cls" class="rollup" href="#">&#215;</a>';
	var toleftbtn = '<a name="tolft" class="rollup" href="#">&#40;</a>';
	var torightbtn = '<a name="torgt" class="rollup" href="#">&#41;</a>';
	var img_compare = '<a name="cmp" class="rollup" href="#">&#68;</a>';
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
		sidebar.draw(imageURL);
		localRebuild();
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
		var sidetarget=eventarget.getAttribute("name");
		if (sidetarget=="cls") {
			$(eventarget).prev("img").remove()
			$(eventarget).remove();
			localRebuild();
			article.render();
			return false;
		};
	});

	article.render = function(){
		article.children(artctrl).remove();
		sidenmbr=sidebar.contain();
		if (!sidenmbr){
			txtimg.after(toleftbtn);
			return;
		}
		txtimg.each(function(){
			var element=$(this);
			if (!sidebar.contain(element)) {
				element.after(img_compare);
				sidenmbr!=maxonside && element.after(toleftbtn);
			}else{
				element.after(img_compare);
				element.after(imgisonside);
			}
		});

	}

	article.click(function(articlevent){
		var eventarget=articlevent.target;
		//eventarget.tagName=="IMG";
		var artarget=eventarget.getAttribute("name");
		var previmg=$(eventarget).prevAll("img").first();
		if (artarget=="tolft") {
			sidebar.add(previmg.attr("src"));
			article.render();
			return false;
		}
		if (artarget=="cmp") {	
			comparewndw.render(previmg);
			return false;
		}
		return true;
	});
	

	comparewndw.render = function(targetimg, scroll){
		var compimgs = comparewndw.children("img");
		var rerender = compimgs.length;
		var sideimgs = $(imgonside).clone();
		var sideimgn = sideimgs.length-1; //from zero
		if (rerender) {
			targetimg = compimgs.first().clone();
			var activeimg = compimgs.last();
			var activimgindx = sidebar.contain(activeimg)+scroll;
			if (activimgindx > sideimgn) {activimgindx=0};
			if (activimgindx < 0) {activimgindx=sideimgn};
			activeimg = sideimgs[activimgindx];
			comparewndw.empty();

		}else{
			targetimg = targetimg.clone();
			var activeimg = sideimgs[sideimgn];
		}
		comparewndw.append(targetimg);
		comparewndw.append(activeimg);
		sideimgn && comparewndw.append(toleftbtn);
		comparewndw.append(closebtn);
		sideimgn && comparewndw.append(torightbtn);
		rerender || comparewndw.show();
		return false;

		
		//$(sideimg).attr("src")==targetimg.attr("src")) {
		
	}

	comparewndw.click(function(cmpevent) {
		var cmptarget=cmpevent.target.getAttribute("name");
		if (cmptarget=="cls" || !cmptarget){
			comparewndw.hide();
			comparewndw.empty();
			return false;
		}
		var scrl = 0;
		if (cmptarget=="tolft") {scrl=-2};
		comparewndw.render(null,scrl);
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