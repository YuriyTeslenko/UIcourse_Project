$(function() {
	var arturl ="http://dcorp.org/articles/";
	var sidebar = $("div.side");
	var txtimg = $("div.article img");
	var comparewnwd = $("div.scrcomp");
	var imgonside = "div.side img";

	var imgclose = '<a class="rollup" href="#">&#215;</a>';
	var img2side = '<a class="rollup" href="#">&#40;</a>';
	var img_compare = '<a class="rollup" href="#">&#68;</a>';
	var imgisonside = '<span class="rollup" href="#">&#73;</span>';

	sidebar.append(imgclose);
	var sideclose = sidebar.children("a:last");

	$(document).click(function(){
		if (comparewnwd.children().length) {
			comparewnwd.hide();
			comparewnwd.empty();
			return false;
		};
		return true;
	});
	sideclose.click(function(){
		if ($(imgonside).length){
			$(this).next().remove();
			txtimg.next().remove();
		}	
		$(this).hide();
		txtimg.after(img2side);
		txtimg.next().click(function(){
			sideclose.show();
			$(this).prev().clone().appendTo(sidebar);
			txtimg.next().remove();
			txtimg.each(function(){
				var element=$(this);
				if ($(imgonside).attr("src")==element.attr("src")) {
					element.after(imgisonside);
				}else{
					element.after(img_compare);
					element.next().click(function(){
						$(imgonside).clone().appendTo(comparewnwd);
						comparewnwd.append("<br>");
						$(this).prev().clone().appendTo(comparewnwd);
						comparewnwd.append("<br>");
						comparewnwd.append(imgclose);
						comparewnwd.show();
						return false;
					});
				};
			});
		return false;
		});
		return false;
	});
	sideclose.click();

});