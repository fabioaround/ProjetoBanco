String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
String.prototype.ltrim=function(){return this.replace(/^\s+/,'');};
String.prototype.rtrim=function(){return this.replace(/\s+$/,'');};
String.prototype.fulltrim=function(){return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');};

$.fn.wait = function(time, type) {
    time = time || 1000;
    type = type || "fx";
    return this.queue(type, function() {
        var self = this;
        setTimeout(function() {
            $(self).dequeue();
        }, time);
    });
};

function converteBrEn(valor){
	if(valor !="" && valor !="0"){
		return valor.replace(",", ".");
	}
}
function converteEnBR(valor){
	if(valor !="" && valor !="0"){
		if (typeof this.qtd_prods === "undefined" || this.qtd_prods === null){
			return '0,00';
		}else
			return valor.replace(".", ",");
	}
}

function filterTag() {	
	
	var output = '';
	output += jQuery.map($('input.subcategoryItem:checked'), function(n, i){
	      return n.value;
	}).join(',');
	
	if (output !== '') {
		var tag = '';
		
		$('#noFilter').hide();
		$('.preload').show();
		var listItem = $("#tagList input");
		listItem.each(function(idx, li){
			if ($(li).hasClass('active')) {
				if($(li).attr("tag-id") == "NEW"){
					tag += 'NEW,';
				} else if($(li).attr("tag-id") == "TOP"){
					tag += 'TOP,';
				}
				$(li).children().text($(li).children().text() + " [x]");
			} else {
				$(li).children().text($(li).children().text().replace(" [x]",""));
			}
		});
		
		tag = tag.substring(0, tag.length -1);

		$('#product-list tbody').html('');
		$('small.result strong').html('0');
		app.structure._doAjax("productList", {'cd_categoria':output, 'tag':tag}, app.structure.readyProductList);
	
	} else {
		toast("Você deve selecionar pelo menos uma categoria!");
	}
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}else{
		var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;	  
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}


if(readCookie("show") != "not"){
	$("#mTutorial").modal();
}



$(function() {
	var ajaxRequests = 0;
	var progress = 0.2;
	var request;
	
	$('body').loadie();

	$(document).bind('ajaxSend', function() {
		ajaxRequests++; 
		progress += 0.1;
		$('body').loadie(progress);
	}).bind('ajaxComplete', function() {
		if (--ajaxRequests == 0) {
			$('body').loadie(1);
		}
	});

//	$( document ).bind("ajaxSend", function(elm, xhr, s){
//		if (s.type == "POST") {
//			
//		}
//	});

	/**
	 * Collapse toggle em subcagetorias
	 */
	$(document).on('click','#tags dl>dt',function(e){
		e.preventDefault();
		$(this).parent().children("dd").fadeToggle("fast");
		var icon = $(this).parent().find("i");
		if (icon.hasClass("glyphicon-plus")) {
			icon.removeClass("glyphicon-plus");
			icon.addClass("glyphicon-minus");
		} else {
			var icon = $(this).parent().find(".glyphicon-minus");
			icon.removeClass("glyphicon-minus");
			icon.addClass("glyphicon-plus");
		}
	});

	$("#abrirCarrinho").mousedown(function(){
		$(this).attr('src','assets/app/img/vercarrinho-on.png')
	});
		
	$("#abrirCarrinho").mouseup(function(){
		$(this).attr('src','assets/app/img/vercarrinho-off.png')
	});
	
	$("#limpaFiltro").mousedown(function(){
		$(this).attr('src','assets/app/img/limpafiltros-on.png')
	});
		
	$("#limpaFiltro").mouseup(function(){
		$(this).attr('src','assets/app/img/limpafiltros-off.png')
	});
	
	$("#tutorialNext").mousedown(function(){
		$(this).attr('src','assets/app/img/tutorial-next-on.png')
	});
		
	$("#tutorialNext").mouseup(function(){
		$(this).attr('src','assets/app/img/tutorial-next-off.png')
	});
	
	$("#tutorialPrev").mousedown(function(){
		$(this).attr('src','assets/app/img/tutorial-prev-on.png')
	});
		
	$("#tutorialPrev").mouseup(function(){
		$(this).attr('src','assets/app/img/tutorial-prev-off.png')
	});
	
	$("#tutorialFechar").mousedown(function(){
		$(this).attr('src','assets/app/img/tutorial-fechar-on.png')
	});
	
	$("#tutorialPular").mouseup(function(){
		$(this).attr('src','assets/app/img/tutorial-pular-off.png')
	});
	
	$("#tutorialPular").mousedown(function(){
		$(this).attr('src','assets/app/img/tutorial-pular-on.png')
	});
	
	$("#dontShow").click(function(){
		if ($(this).is(':checked')){
			createCookie("show","not");
		}else{
			eraseCookie("show");
		}
	});
	
	$("#tutorialFechar").mouseup(function(){
		$(this).attr('src','assets/app/img/tutorial-fechar-off.png')
	});
	
	$(document).on('click','#tagList li',function(e){
		e.preventDefault();
		if($(this).children().attr('id') == "new"){
			if($(this).children().hasClass("active")){
				$(this).children().attr('src','assets/app/img/lancamento-off.png');
			}else{
				$(this).children().attr('src','assets/app/img/lancamento-on.png');
			}
		}else if($(this).children().attr('id') == "top"){
			if($(this).children().hasClass("active")){
				$(this).children().attr('src','assets/app/img/maisvendido-off.png');
			}else{
				$(this).children().attr('src','assets/app/img/maisvendido-on.png');
			}
		}
		$(this).children().toggleClass('active');
		$(this).removeClass("ui-state-focus ui-state-hover");
		filterTag();
	});
	
	
	
	$(document).on('click','input.subcategoryItem, .checkAll',function(){					
		
		if ($(this).hasClass("subcategoryItem")) {
			var childrens = $(this).parent().parent().parent().parent().children();
			if (childrens.find("input.subcategoryItem:checked").size() == childrens.find("input.subcategoryItem").size()) {
				$("#cat-" + $(this).attr("data-category") + " .checkAll").prop('checked', true);
			} else {
				$("#cat-" + $(this).attr("data-category") + " .checkAll").prop('checked',false);
			}
		}
		
		if ($(this).hasClass("checkAll")) {
			var isChecked = $(this).is(":checked");
			var checks = $('input[data-category=' + $(this).attr("data-category") + ']');
			checks.each(function(check, a){
				if (isChecked) {
					$(a).prop('checked', true)
				} else {
					$(a).prop('checked', false);
				}
			});
		}
		
		var output = '';	

		output += jQuery.map($('input.subcategoryItem:checked'), function(n, i){
		      return n.value;
		}).join(',');
	
		if(output !== ''){
			$('.preload').show();
		}
		
		window.setTimeout(function() {
		
		if (output !== '') {
			$('#noFilter').hide();
			
			$('#product-list tbody').html('');
			$('small.result strong').html('0');
			
			// Filtramos sempre por filtro de inicio.
			filterTag();
			
//			app.structure._doAjax("productList", {'cd_categoria':output}, app.structure.readyProductList);
		}else{
			$('#product-list tbody').html('');
			$('small.result strong').html('0');
			$('#noFilter').show();
		}
		}, 100);
		
	});
	
	/*
	 * Busca | LIVE
	 * 
	 * A Busca se Baseia nas categorias selecionadas, caso não haja nenhuma envia 0
	 * passa o valor do campo como KEY_FILTER
	 * Ele aguarda o mesmo retorno da busca de categorias.
	 * 
	 * 
	 * */
	$(document).on('change','#s',function(){
        var count = 0;
        if(filter !== ''){
        	
        	$('.subcategoryItem').prop('checked', false);
        	$('.checkAll').prop('checked', false);
        	
			$('#product-list tbody').html('');
			$('small.result strong').html('0');
			
			var output = 0;

			app.structure._doAjax("productList", {'cd_categoria':output, 'filter':filter}, app.structure.readyProductList);			
		} 
    });	
	
	/*
	 * Busca | LIVE
	 * 
	 * Busca os clientes
	 * 
	 * */
	$(document).on('change','#search_customer',function(){
        var filter = $(this).val(), count = 0;
        if(filter !== ''){
      
			$('#customer-list tbody').html('');
			$('small.result strong').html('0');
		
			app.structure._doAjax("customerList", {'filter':filter}, app.structure.readyCustomerList);			
		} 
    });	

	$(document).on('click','#btn_cupom',function(){
		var cupom = $('#cupom').val();
		if (cupom == ""){
			
		} else{
			app.structure._doAjax("validaCupom", {'KEY_CUPOM':cupom}, app.structure.readyValidaCupom);
		}
	});
	
	$(document).on('click','input.cleanFilters',function(){
		$('#product-list tbody').html('').slideUp();
		$('small.result strong').html('0');
		$('input.subcategoryItem:checkbox').prop('checked', false);
	
		var listItem = $("#tagList li");
		listItem.each(function(idx, li){
			if($(li).children().attr('id') == "new"){
				if($(li).children().hasClass("active")){
					$(li).children().attr('src','assets/app/img/lancamento-off.png');
				}
			}else if($(li).children().attr('id') == "top"){
				if($(li).children().hasClass("active")){
					$(li).children().attr('src','assets/app/img/maisvendido-off.png');
				}
			}
			$(li).children().removeClass('active');
		});		
	});

	$(document).on('click','button.remove',function(){
		var item = $(this).attr('data-item');
		app.cart.remove(item);
		$(this).closest('td').parent().remove();
		$('.cart-item-'+ $(this).attr('data-item')).remove();
		app.cart.recalc();
		app.cart.totalItem();
	});
	
	$(document).on('click', '.customer', function(){
		var cpf = $(this).find('.cpf').text();
		var email = $(this).find('.email').text();
		if(email != "" && cpf != null){
			app.structure._doAjax("startShopping", {'KEY_CPF_CNPJ':cpf, 'KEY_EMAIL':email}, null);
		}
	});
	
	$(document).on('click','button.qtyInc',function(){
		var qty = $(this).prev('input.qty').val();
		qty++;
		var item;
		var tr = $(this).closest('td').siblings('td:nth-child(2)').clone();
		$(tr).find('.label').empty();
		if(tr !== "" ){
			item = $(tr).text().fulltrim();
		}else{
			item = $(this).closest('td').siblings('td:first-child').text().fulltrim();
		}
		
		toast("Item " +  item.substring(0,35) +"...  adicionado ao carrinho! Quantidade: " + qty);
		$(this).removeClass("ui-state-focus ui-state-hover");
		$('.cd-item-'+$(this).prev('input.qty').attr('data-item')).val(qty).change();
		app.cart.totalItem();
	});

	$(document).on('click','button.qtyDec',function(event){
		var qty = $(this).next('input.qty').val();
		if(qty > 0){
			qty--;
			$(this).removeClass("ui-state-focus ui-state-hover");
			$('.cd-item-'+$(this).next('input.qty').attr('data-item')).val(qty).change();
			app.cart.totalItem();
			toast("Item removido do carrinho!");
		}
		
	});

	$(document).on('click','a.close-order',function(){
		app.order.new();
		$('#myModal').modal('hide');
	});

	$(document).on('change','input.qty',function(){
		var item = $(this).attr('data-item');
		var price = $(this).attr('data-price');
		var qty = $(this).val();
		var itemObj = new Object();
		var trLine = $(this).closest('td').parent();
		if($(this).closest('td').siblings('td:nth-child(2)').text().fulltrim() == ""){
			var tr = $(this).closest('td').siblings('td:first-child').clone();
			$(tr).find('.label').empty()
			itemObj.name = $(tr).text().fulltrim(); 
			$(this).closest('td').siblings('td:first-child').html('');
		}else{
			var ds_item = $(this).closest('td').siblings('td:nth-child(2)').clone();
			$(ds_item).find('.label').empty();
			itemObj.name = $(this).closest('td').siblings('td:first-child').text().fulltrim() + " - " +  $(ds_item).text().fulltrim();
		}
		
		itemObj.item = item;
		itemObj.price = price;
		itemObj.qty = qty;
		itemObj.total = eval(price) * eval(qty);
		$('.cd-item-'+$(this).attr('data-item')).val(qty);
		if(qty > 0){
			app.cart.save(item,itemObj);
			app.cart.list();
			app.cart.listModal();
		}else{
			toast("Item removido do carrinho");
			app.cart.remove(item);
			if(trLine.hasClass('cart-item')){
				trLine.slideUp();
				app.cart.recalc();
			}else{
				app.cart.list();
				app.cart.listModal();
			}
		}
	});
	
	$(".removeAll").click(function(){
		app.cart.empty();
		$('.qty').val('0');
	})
	
	function toast(sMessage)
    {
		var toastContainer = $("#toastContainer");
        var container = $(document.createElement("div"));
        container.addClass("toast");

        var message = $(document.createElement("div"));
        message.addClass("message");
        message.text(sMessage);
        message.appendTo(container);

        container.appendTo(toastContainer);

        container.delay(400).fadeIn("slow", function()
        {
            $(this).delay(400).fadeOut("slow", function()
            {
                $(this).remove();
            });
        });
    }	
	
	$('.preload').hide();
	app.config();
	app.structure.init();
	if($('#page_type').val() == undefined || $('#page_type').val() == "customer"){
		app.structure.getCategoryList();
		app.cart.isCached();
		app.cart.init();
		app.cart.list();
		app.cart.listModal();
		app.cart.recalc();
	}
	if($('#page_type').val() == "representante"){
		app.structure.listCustomers();
	}
});

