
/* App Module */
var app = app || {};

$(function() {
    $( ".open" ).click(function(){
      $('.cart').toggleClass("cart-open");
    });
    $( "#aaa2" ).click(function(){
      $( "#cart" ).addClass("hide");
    });
});


app.config = function() {
	this.baseURL = SITE_URL + "index.php?r=loja/";
	this.wsURL = SITE_URL + "index.php?r=iziWebServices/";
	this.key_session_id = "";
};

app.structure = {
	init: function() {
	},
	_defaultErrorHandler: function(xhr, status, error){
		console.log(xhr.statusText);
	},
	_doAjax: function(method, data, fnSuccess, fnError, async){
		if (!data) data = {};
		if (!async) async = false;

		if (!fnError) fnError = this._defaultErrorHandler;
		$.ajax({
			type: "POST",
			url: app.baseURL + method,
			data: data,
			dataType: "json",
			async: async,
			success: function(result) {
				if ( result.status == "503") {
					window.location.replace(result.redirect);
				} else {
					if(method == "startShopping"){
						window.location.replace(result.redirect);
					}
					fnSuccess(result);
				}
			},
			error: fnError,
		});
	},
	getCategoryList: function(success, error){
		this._doAjax("categoryList", 0, this.readyCategoryList);
	},
	readyCategoryList:  function(data){
		if (typeof (data) !== "undefined" && data !== null){
			var container = $('#tags div.accordion-inner');
			container.html('').addClass('preload_small');
			var first = null;
			$.each(data, function() {

				var icon = "plus";
				if (first == null) {
					icon = "minus";
				}

				container.append('<dl class="categoryItem" id="cat-' + this.cd_categoria + '"><input type="checkbox" class="checkAll" data-category="' + this.cd_categoria + '" style="margin-top: 15px;float:right;" /><dt title="' + this.ds_ecommerce + '" data-category="' + this.cd_categoria + '" class="motion oneSec dl-one fadeInLeft accordion-heading-light"><i style="padding-right:10px;float:left;" class="glyphicon glyphicon-' + icon + '"></i><strong>' + this.ds_ecommerce + '</strong></dt></dl>');
				if (first == null) {
					app.structure._doAjax("subCategoryList", {'cd_cat_sup':this.cd_categoria}, app.structure.readyFirstSubCategoryList, true);
					first = this.cd_categoria;
					$('.sub').show();
				} else {
					app.structure._doAjax("subCategoryList", {'cd_cat_sup':this.cd_categoria}, app.structure.readySubCategoryList, true);
				}
			});
			container.removeClass('preload_small');
		}
	},
	readyFirstSubCategoryList:  function(data){
		if (typeof (data) !== "undefined" && data !== null){
			if (typeof (data[0]) !== "undefined" && data[0] !== null){
				var container = $('#cat-' + data[0].cd_cat_sup).addClass('preload_small');
				var qtd_prods = 0;
				$.each(data, function() {
					qtd_prods = (typeof this.count === "undefined" || this.count === null) ? 0 : this.count;
					container.append('<dd class="sub" style="display:none;"><div class="checkbox"><label rel="popover" data-img=\''+this.lnk_imagem+'\' data-placement="right"><input type="checkbox" class="subcategoryItem" name="subcategoryItem[]" data-category="' + this.cd_cat_sup + '" value="' + this.cd_categoria + '">' + this.ds_ecommerce + '<span class="badge pull-right">' + qtd_prods + '</span></label></div></dd>');
				});
				container.removeClass('preload_small');
			}
		}
	},
	readySubCategoryList:  function(data){
		if (typeof (data) !== "undefined" && data !== null){
			if (typeof (data[0]) !== "undefined" && data[0] !== null){
				var container = $('#cat-' + data[0].cd_cat_sup).addClass('preload_small');
				var qtd_prods = 0;
				$.each(data, function() {
					qtd_prods = (typeof this.count === "undefined" || this.count === null) ? 0 : this.count;
					container.append('<dd class="sub" style="display:none;"><div class="checkbox"><label rel="popover" data-img=\''+this.lnk_imagem+'\' data-placement="right"><input type="checkbox" class="subcategoryItem" name="subcategoryItem[]" data-category="' + this.cd_cat_sup + '" value="' + this.cd_categoria + '">' + this.ds_ecommerce + '<span class="badge pull-right">' + qtd_prods + '</span></label></div></dd>');
				});
				container.removeClass('preload_small');
			}
		}
	},
	fillTable: function (data){
		var html = '';
		var i = 1;
		$.each(data, function() {
			html += '<tr>';
			html += '	<td><span rel="popover" data-img="'+ this.lnk_imagem +'" data-placement="left">'+ this.ds_categoria+ '</span></td>';
			html += '	<td class="item-name">';
			if(this.cd_tag != null){
				if(this.cd_tag == 1){
					html += '<span class="label label-info" style="text-shadow : 0.0em 0.0em;"><font color="white">Mais vendido</font></span> '+ this.ds_item ;
				}else if(this.cd_tag == 2){
					html += '<span class="label label-danger" style="text-shadow : 0.0em 0.0em;"><font color="white">Lançamento</font></span>'+ this.ds_item ;
				}
			}else{
				html += '<span>'+ this.ds_item + '</span>';
			}
			html += '	</td>';
			html += '			<td>R$ ' + this.preco+ '</td>';
			html += '			<td>';
			html += '				<form class="form-inline" role="form">';
			html += '					<div class="form-group">';
			html += '						<button type="button" class="btn btn-default btn-sm qtyDec" data-item="' + this.cd_item + '"><i class="glyphicon glyphicon-minus"></i></button>';
			html += '						<input type="text" class="qty cd-item-'+this.cd_item+'" tabindex="' + i + '" data-price=" ' + this.preco+ '" data-item="' + this.cd_item + '" value="0" placeholder="0" />';
			html += '						<button type="button" class="btn btn-default btn-sm qtyInc" data-item="' + this.cd_item + '"><i class="glyphicon glyphicon-plus"></i></button>';
			html += '					</div>';
			html += '				</form>';
			html += '			</td>';
			html += '		</tr>';
			i++;
		});

		return html;
	},
	readyProductList:  function(data){
		$('.preload').show();
		if (typeof (data[0]) !== "undefined"){
			$('.preload').addClass('');
			var container = $('#product-list tbody');
			$('small.result strong').html(data.length);
			container.html('').wait(200).slideUp('fast',function(){container.html(app.structure.fillTable(data))}).wait(200).slideDown('fast',function(){$('.preload').hide()});
		}else{
			$('.preload').hide();
			toastApp('Nenhum item encontrado com o filtro selecionado');
		}
	},
	fillCustomerTable: function (data){
		
		var html = '';
		$.each(data, function() {
			html += '<tr class="customer">';
			html += '	<td class="nome">'+ this.nm_agente+ '</td>';
			html += '	<td class="apelido"><span>'+ this.apelido + '</span></td>';
			html += '	<td class="email">' + this.email+ '</td>';
			html += '	<td class="cpf">'+ this.cpf +'</td>';
			html += '</tr>';
		});

		return html;
	},
	readyCustomerList:  function(data){
		$('.preload').show();
		if (typeof (data[0]) !== "undefined"){
			if(data.length == 1 && data[0].cpf == null){
				$('.preload').hide();
				toastApp('Nenhum cliente encontrado com o filtro digitado');
			}else{
				$('.preload').addClass('');
				var container = $('#customer-list tbody');
				$('small.result strong').html(data.length);
				container.html('').wait(200).slideUp('fast',function(){container.html(app.structure.fillCustomerTable(data))}).wait(200).slideDown('fast',function(){$('.preload').hide()});
			}
		}else{
			$('.preload').hide();
			toastApp('Nenhum cliente encontrado com o filtro digitado');
		}
	},
	listCustomers: function(success, error){
		this._doAjax("customerList", 0, this.readyCustomerList);
	},
	getObterCliente: function(success, error){
		this._doAjax("obterCliente", 0, this.readyObterCliente);
	},
	readyObterCliente:  function(data){
		if (typeof (data) !== "undefined" && data !== null){

		}
	},
	doIncluirPedido: function(success, error){
		this._doAjax("incluirPedido", 0, this.readyIncluirPedido);
	},
	readyIncluirPedido:  function(data){
		if (typeof (data) !== "undefined" && data !== null){

		}
	},
	doCancelarPedido: function(success, error){
		this._doAjax("cancelarPedido", 0, this.readyCancelarPedido);
	},
	readyCancelarPedido:  function(data){
		if (typeof (data) !== "undefined" && data !== null){

		}
	},
	doAtualizarPedido: function(success, error){
		this._doAjax("atualizarPedido", 0, this.readyAtualizarPedido);
	},
	readyAtualizarPedido:  function(data){
		if (typeof (data) !== "undefined" && data !== null){

		}
	},
	getMarcasList: function(success, error){
		this._doAjax("listarMarcas", 0, this.readyMarcasList);
	},
	readyMarcasList:  function(data){
		if (typeof (data) !== "undefined" && data !== null){

		}
	},
	getTagsTopList: function(success, error){
		this._doAjax("listarTagsTop", 0, this.readyTagsTopList);
	},
	readyTagsTopList:  function(data){
		if (typeof (data) !== "undefined" && data !== null){

		}
	},
	getAparelhosList: function(success, error){
		this._doAjax("listarAparelhos", 0, this.readyAparelhosList);
	},
	readyAparelhosList:  function(data){
		if (typeof (data) !== "undefined" && data !== null){

		}
	},
	getItensComTagsTopList: function(success, error){
		this._doAjax("listarItensComTagsTop", 0, this.readyItensComTagsTopList);
	},
	readyItensComTagsTopList:  function(data){
		if (typeof (data) !== "undefined" && data !== null){

		}
	},
	getItensPorAparelhoList: function(success, error){
		this._doAjax("listarItensPorAparelho", 0, this.readyItensPorAparelhoList);
	},
	readyItensPorAparelhoList:  function(data){
		if (typeof (data) !== "undefined" && data !== null){

		}
	},
	readyValidaCupom: function(data){
		console.log(data);
		if(typeof (data) !== "undefined" && data !== null){
			if(data.status == 200){
				$("#retorno_cupom").html(data.mensagem);
				$("#input_cupom" ).fadeOut( "slow", function() {
					$("#retorno_cupom").fadeIn();
				});
			}else{
				$("#msg_error").html("<br/><div class='alert alert-warning'>" + data.mensagem + "</div>");
				$("#msg_error_div").fadeIn();
			}
		}
	}
}



function toastApp(sMessage)
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
        $(this).delay(4000).fadeOut("slow", function()
        {
            $(this).remove();
        });
    });
}

app.cart = {
	init: function() {
		$.jStorage.reInit();
		this.carrinhoVazio = 0;
		this.subtotalAVista = 0;
		this.count = 0;
		this.totalValorCarrinho = 0;
		this.frete = 0;
		this.i = 1;
	},

	remove: function(key){
		var keyID = $.jStorage.get(key);
		if (typeof keyID === "undefined" || keyID === null){
		}else{
			$.jStorage.deleteKey(key);
		}

		return true;
	},
	save: function(key, object){
		var keyID = $.jStorage.get(key);
		if (typeof keyID === "undefined" || keyID === null){
			$.jStorage.set(key, JSON.stringify(object));
		}else{
			$.jStorage.deleteKey(key);
			$.jStorage.set(key, JSON.stringify(object));
		}

		return true;
	},
	isCached: function(){
		if($.jStorage.index().length > 0){
			toastApp("Você possui itens no carrinho!");
		}
	},
	list: function(){
		var index = $.jStorage.index();

		if(index.length == 0){
			$('#product-checkout tbody').html('<tr><td colspan="4">N&atilde;o h&aacute; itens no seu carrinho.</td></tr>');
			$('#calculate').hide();
			$('#checkout').hide();
			app.cart.carrinhoVazio = 1;
		}else{
			$('#calculate').show();
			$('#checkout').show();
			app.cart.carrinhoVazio = 0;
		}


		var container = $('#product-checkout tbody');
		container.html('').slideUp;
		var html = '';
		app.cart.subtotalAVista = 0;
		$.each(index, function(i,key) {
			var itemObj = JSON.parse($.jStorage.get(key));
			html += '<tr data-name="'+itemObj.name+'" data-item="' + itemObj.item + '" class="cart-item cart-item-' + itemObj.item + '">';
			html += '<td style="width: 230px" class="item-name">';
			html += '<span rel="popover_" data-img="http://placehold.it/150x240&amp;text=Foto" data-placement="left">' + itemObj.name + '</span>';
			html += '<td>';
			html += '<form class="form-inline" role="form">';
			html += '<div class="form-group">';
			html += '<button type="button" class="btn btn-default btn-sm qtyDec"><i class="glyphicon glyphicon-minus"></i></button>&nbsp;';
			html += '<input type="text" class="qty cd-item-'+itemObj.item+'" data-teste="'+ itemObj.name +'" data-price="' + itemObj.price + '" data-item="' + itemObj.item + '"  placeholder="0" value="' + itemObj.qty + '">';
			html += '<button type="button" class="btn btn-default btn-sm qtyInc"><i class="glyphicon glyphicon-plus"></i></button>';
			html += '</div>';
			html += '</form>';
			html += '</td>';
			html += '<td>';
			html += '<span>R$ ' + itemObj.total.toFixed(2).replace('.',',') + '</span>';
			html += '</td>';
			html += '<td>';
			html += '<button type="button" class="btn btn-danger btn-sm pull-right remove" data-item="' + itemObj.item + '" data-placement="bottom" data-original-title="Remover"><i class="glyphicon glyphicon-remove"></i></button>';
			html += '</td>';
			html += '</tr>';
			app.cart.subtotalAVista += eval(converteBrEn(itemObj.price)) * eval(itemObj.qty);
		});

		app.cart.totalItem();
		app.cart.totalValorCarrinho = eval(app.cart.frete) + eval(app.cart.subtotalAVista);
		$('#calculate tbody tr:eq(0) td:eq(1) small').html('R$ ' + app.cart.subtotalAVista.toFixed(2).replace('.',','));
		$('#calculate tbody tr:eq(3) td:eq(1) span').html('R$ ' + app.cart.totalValorCarrinho.toFixed(2).replace('.',','));

		container.html(html).slideDown();

	    var rows = $('#product-checkout tbody  tr').get();

	    rows.sort(function(a, b) {
	        var A = $(a).children('td').eq(0).text().toUpperCase();
	        var B = $(b).children('td').eq(0).text().toUpperCase();

	        if(A < B) {
	          return -1;
	        }
	        if(A > B) {
	          return 1;
	        }
	        return 0;
	    });

	    $.each(rows, function(index, row) {
	    	$('#product-checkout').children('tbody').append(row);
	    });



	},
	listModal: function(){
		var index = $.jStorage.index();

		if(index.length == 0){
			$('#product-checkout-modal tbody').html('<tr><td colspan="4">N&atilde;o h&aacute; itens no seu carrinho.</td></tr>');
			$('#calculate').hide();
			$('#checkout').hide();
			app.cart.carrinhoVazio = 1;
		}else{
			$('#calculate').show();
			$('#checkout').show();
			app.cart.carrinhoVazio = 0;
		}


		var container = $('#product-checkout-modal tbody');
		container.html('').slideUp;
		var html = '';
		app.cart.subtotalAVista = 0;
		$.each(index, function(i,key) {
			var itemObj = JSON.parse($.jStorage.get(key));
			html += '<tr data-item="' + itemObj.item + '" class="cart-item cart-item-' + itemObj.item + '">';
			html += '<td style="width: 380px" class="item-name">';
			html += '<span rel="popover_" data-img="http://placehold.it/150x240&amp;text=Foto" data-placement="left">'+ itemObj.name + '</span>';
			html += '<td>';
			html += '<form class="form-inline" role="form">';
			html += '<div class="form-group">';
			html += '<input type="text" readOnly="true" class="qty cd-item-'+itemObj.item+'" data-price="' + itemObj.price + '" data-item="' + itemObj.item + '"  placeholder="0" value="' + itemObj.qty + '">';
			html += '</div>';
			html += '</form>';
			html += '</td>';
			html += '<td>';
			html += '<span>R$ ' + itemObj.total.toFixed(2).replace('.',',') + '</span>';
			html += '</td>';
			html += '<td>';
			html += '</td>';
			html += '</tr>';
			app.cart.subtotalAVista += eval(converteBrEn(itemObj.price)) * eval(itemObj.qty);
		});

		app.cart.totalItem();
		app.cart.totalValorCarrinho = eval(app.cart.frete) + eval(app.cart.subtotalAVista);
		app.cart.totalItem();
		$('#calculate tbody tr:eq(0) td:eq(1) small').html('R$ ' + app.cart.subtotalAVista.toFixed(2).replace('.',','));
		$('#calculate tbody tr:eq(2) td:eq(1) span').html('R$ ' + app.cart.totalValorCarrinho.toFixed(2).replace('.',','));

		container.html(html).slideDown();

		var rows = $('#product-checkout-modal tbody  tr').get();

	    rows.sort(function(a, b) {
	        var A = $(a).children('td').eq(0).text().toUpperCase();
	        var B = $(b).children('td').eq(0).text().toUpperCase();

	        if(A < B) {
	          return -1;
	        }
	        if(A > B) {
	          return 1;
	        }
	        return 0;
	    });

	    $.each(rows, function(index, row) {
	    	$('#product-checkout-modal').children('tbody').append(row);
	    });

	},
	totalItem: function(){
		var total = 0;
		$('#product-checkout tr').each(function (i, row) {
			var $row = $(row);
			var $qty_input = $row.find('.qty');
			total = total + parseInt($qty_input.val());
		});
		$('#shopping-cart span.badge').html(total);
		$('#myModal span.badge').html(total);
	},
	recalc: function(){
		var index = $.jStorage.index();
		if(index.length == 0){
			$('#product-checkout tbody').html('<tr><td colspan="4">N&atilde;o h&aacute; itens no seu carrinho.</td></tr>');
			$('#calculate').hide();
			$('#checkout').hide();
			app.cart.carrinhoVazio = 1;
		}else{
			$('#calculate').show();
			$('#checkout').show();
			app.cart.carrinhoVazio = 0;
		}

		app.cart.subtotalAVista = 0;
		$.each(index, function(i,key) {
			var itemObj = JSON.parse($.jStorage.get(key));
			app.cart.subtotalAVista += eval(converteBrEn(itemObj.price)) * eval(itemObj.qty);
		});
		app.cart.totalValorCarrinho = eval(app.cart.frete) + eval(app.cart.subtotalAVista);
		app.cart.totalItem();
		$('#calculate tbody tr:eq(0) td:eq(1) small').text('R$ ' + app.cart.subtotalAVista.toFixed(2).replace('.',','));
		$('#calculate tbody tr:eq(3) td:eq(1) span').text('R$ ' + app.cart.totalValorCarrinho.toFixed(2).replace('.',','));
	},

	empty:function(){
		$.jStorage.flush();
		app.cart.recalc();
		this.carrinhoVazio = 1;
	},
	
}

app.order = {
	init: function() {

	},
	end: function(data) {		
		
		$("#modalPedidoCriado #pedido-criado").show();
		$("#modalPedidoCriado #pedido-nao-criado").hide();
		
		$("#retorno_cupom" ).fadeOut( "slow", function() {
			$("#input_cupom").fadeIn();
		});
		
		$('.close-order').removeAttr('disabled');
		$('#checkout').removeAttr('disabled');
		if (data != null) {
			
			if (data.status == 500) {
				$("#pedidoResultBoleto").html("<br/><div class='alert alert-warning'>" + data.mensagem + "</div>");
				$("#modalPedidoCriado #pedido-criado").hide();
				$("#modalPedidoCriado #pedido-nao-criado").show();
			} else {
				$("#pedidoResultBoleto").html("<div class='alert alert-success'>" + data.boleto + "</div>");
				$("#pedidoResultDados").html(
					"<label class='label label-info'>Referência Loja Virtual:</label>	" + data.pedido.cd_pedido +
					"<br/><br/><label class='label label-info'>Sub-Total do Pedido:</label>	R$ " + data.pedido.vlr_sub_total +
					"<label style='margin-left: 10px;'  class='label label-info'>% de Desconto:</label>	" + data.pedido.percentual_desconto + "%" +
					"<label style='margin-left: 10px;'  class='label label-info'>Total do Pedido:</label>	R$ " + data.pedido.vlr_total +
					"<br/><br/><label class='label label-info'>Plano de Pagamento:</label>	" + data.plano +
					"<label style='margin-left: 10px;' class='label label-info'>Forma de Pagamento:</label>	" + data.forma
				);
				app.cart.empty();
			}
			$('.preload').hide();			
		}
	},
	new: function() {
		$('.close-order').attr('disabled','true');
		$('#checkout').attr('disabled','true');
		this.orderObj = new Object();
		var index = $.jStorage.index();
		this.orderObj.itens = [];

		var items = [];
		$.each(index, function(i,key) {
			var tempItemObj = JSON.parse($.jStorage.get(key));
			var ItemObj = new Object();
			ItemObj.num_item = i;
			ItemObj.cd_item = tempItemObj.item;
			ItemObj.qtd_pedido = tempItemObj.qty;
			items.push(ItemObj);
		});
		this.orderObj.itens = items;
		
		var cupom = $("#cupom").val();
		this.orderObj.KEY_CUPOM = cupom;

		$("#modalPedidoCriado").modal();
		$("#pedidoResultBoleto").html("<strong>Enviando pedido...</strong><div class='progress progress-striped'><div class='bar' style='width: 100px;'></div></div>");
		$("#pedidoResultDados").html("");

		var orderObjData = JSON.stringify(this.orderObj);
		app.structure._doAjax("incluirPedido", {'order':orderObjData}, app.order.end);
	},

}
