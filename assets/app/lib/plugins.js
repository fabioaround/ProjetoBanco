// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

$('body').popover({
    selector: '[rel=popover]',
    html: true,
    trigger: 'hover',
    content: function(){return '<img src="'+$(this).data('img') + '" />';}
});

$('button').tooltip();

$("footer a[href^='#']").on('click', function(e) {
   e.preventDefault();
   $('html, body').animate({ scrollTop: $(this.hash).offset().top }, 500);
});
          

$(document).ready(function(){
    $('#product-list a').each(function(i, e){
    var TextValue = $(e).text();
    var TextLimiter = 35;
    var diminuido='';
    if(TextValue.length > TextLimiter){
      for(i=0;i<TextLimiter;i++) {  
        diminuido+=TextValue.substr(i,1);  
      }
      $(e).text(diminuido+'...');
    }
  })

$('#product-checkout span').each(function(i, e){
    var TextValue = $(e).text();
    var TextLimiter = 11;
    var diminuido='';
    if(TextValue.length > TextLimiter){
      for(i=0;i<TextLimiter;i++) {  
        diminuido+=TextValue.substr(i,1);  
      }
      $(e).text(diminuido+'...');
    }
  })    
});