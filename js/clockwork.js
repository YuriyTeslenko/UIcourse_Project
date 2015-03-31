$(function() {

var img2side = '<a class="rollup" href="#">&#40;</a>';
var img_compare = '<a class="rollup" href="#">&#68;</a>';
var img_side = '<span class="rollup" href="#">&#73;</span>';
var imgclose = '<a class="rollup" href="#">&#215;</a>';
imgcomparer();

function imgcomparer(){
	$("div.article img").after(img2side);
	$("div.article img + a").click(function(){
		if (!$("div.side img").length) {
			$("div.side").append(imgclose);
			$("div.side hr + a").click(function(){
				$(this).next("img").remove();
				$(this).remove();
				$("div.article img").next().remove();
				imgcomparer();
				return false;

			});
			$(this).prev().clone().appendTo("div.side");
			$("div.article img + a").remove();
			$("div.article img").each(function(indx, element){
				if ($("div.side img").attr("src")!=$(element).attr("src")) {
					$(element).after(img_compare);
				}else{
					$(element).after(img_side);
				};
			});
			$("div.article img + a").click(function(){
				$("div.side img").clone().appendTo("div.scrcomp");
				$("div.scrcomp").append("<br>");
				$(this).prev().clone().appendTo("div.scrcomp");
				$("div.scrcomp").append("<br>");
				$("div.scrcomp").append(imgclose);
				$("div.scrcomp a").click(function(){
					$("div.scrcomp").hide();
					$("div.scrcomp").empty();
					return false;
				});
				$("div.scrcomp").show();
				return false;
			});
		}; 
	return false;
	});
};







});