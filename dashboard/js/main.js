/*!
 * Webtags v0.4.6-pl, Dashboard for Webtags v1.0.18-pl
 * Webtags GitHub page (source code and links): (https://github.com/earthperson/Webtags)
 * Webtags website: (http://earthperson.github.io/Webtags/)
 * Dashboard for Webtags: (http://earthperson.github.io/Webtags/dashboard/)
 * Author website: (http://earthperson.info)
 *
 * Copyright (c) 2013-2014 Dmitry Ponomarev (email: ponomarev.dev@gmail.com)
 * Licensed under the MIT License: (http://www.opensource.org/licenses/mit-license.php)
 */

/*jshint -W069 */
$(function() {
	$.fn.setCheckboxesIndex = function () {
		this.each(function(index) {
			$(this).parent().contents().filter(function() {
				return this.nodeType === 3;
			}).remove();
			$(this).after('#'+(++index));
		});
		return this;
	};
	$.fn.updateButtonValue = function(checked) {
		this.parent().contents().filter(function() {
			return this.nodeType === 3;
		}).remove();
		this.after(checked ? this.data('values')[0] : this.data('values')[1]);
	};
	$.fn.serializeObject = function() {
		var o = {},
			items = [],
			item = {},
			v = '',
			a = this.serializeArray(), w, h;
		$.each(a, function() {
			if(this.name === 'label') {
				v = $.trim(this.value);
				if (v) {
					item['label'] = v;
				}
			}
			else if (item['label']) {
				v = $.trim(this.value);
				if (v) {
					item['url'] = v;
					items.push(item);
					item = {};
				}
			}
		});
		if (items.length > 0) {
			o['items'] = items;
			o['type'] = $('.panel input[name="type"]:checked').val();
			w = parseInt($('#canvasWidth').val());
			h = parseInt($('#canvasHeight').val());
			if(!isNaN(w) && w > 0) {
				o['width'] = w;
			}
			if(!isNaN(h) && h > 0) {
				o['height'] = h;
			}
			o['border'] = $('.panel :checkbox[value="border"]').prop('checked');
			o['grid'] = $('.panel input[name="grid"]:checked').val() == 1;
			o['style'] = {
				"border": "1px solid " + ($('#modalCanvasMoreOptions .colorpicker-group input').val() || '#5e8cc2')
			};
			o['tag'] = {};
			w = parseInt($('#tagWidth').val());
			h = parseInt($('#tagHeight').val());
			if(!isNaN(w) && w > 0) {
				o.tag['width'] = w;
			}
			if(!isNaN(h) && h > 0) {
				o.tag['height'] = h;
			}
			o.tag['context'] = {};
			o.tag.context['fillStyle'] = $('#modalTagMoreOptions .colorpicker-group-fill-style input').val() || '#5e8cc2';
			o.tag.context['strokeStyle'] = $('#modalTagMoreOptions .colorpicker-group-stroke-style input').val() || '#5e8cc2';
			o.tag.context['shadowColor'] = $('#modalTagMoreOptions .colorpicker-group-shadow-color input').val() || 'rgba(54, 111, 179, 0.4)';
			o.tag.context['lineWidth'] = $('#lineWidth').val() || 2;
		}
		return o;
	};
	$.fn.validate = function() {
		var re = $(this).attr('type') == 'text' ? /.{1,}/ : /\..{1,}$/;
		if (!re.test($(this).val())) {
			$(this).parent().addClass('has-error');
		}
		else {
			$(this).parent().removeClass('has-error');
		}
		return this;
	};
	function stripTags(str, re){
		if(re !== null) {
			str = str.replace(re, '');
		}
		str = str.replace(/<\/?[^>]+>/gi, '');
		return str;
	}
	$.fn.setLaunchAble = function() {
		var o = $('.col-xs-10 .form-group:not(.has-error)').children('input').serializeObject();
		if (o instanceof Object && o['items']) {
			$('.col-md-4 .btn-primary:last').removeAttr('disabled'); // Export
			$('.btn-launch').removeAttr('disabled'); // Launch
		}
		else {
			$('.col-md-4 .btn-primary:last').attr('disabled','disabled'); // Export
			$('.btn-launch').attr('disabled','disabled'); // Launch
		}
		return this;
	};
	$('#howto').click(function(event) {
		event.preventDefault();
	}).popover({
		"placement": "bottom",
		"html": true
	});
	$('#screencast').click(function(event) {
		event.preventDefault();
		$('#modalScreencast').modal();
	});
	$.fn.webtagsDemo = function() {
		$('.col-md-4 .btn-primary:eq(1)').click();
		$('#modalImport').one('shown.bs.modal', function (e) {
			$('#modalImport .btn-default:first').click();
			$('.modal .btn-primary').click();
			$('.btn-launch:first').click();
		});
		return false;
	};
	$('.col-md-4 .btn-primary:first').click(function() {
		var row = $('.col-md-8 .row:first').clone(true),
			index = $('.btn-danger').size(),
			checkbox = $(':checkbox', row);
		$('.btn-group', row).remove();
		$('input:not(:checkbox)', row).val('').parent().removeClass('has-error');
		checkbox.prop('checked', false).parent().contents().filter(function() {
		    return this.nodeType === 3;
		}).remove();
		checkbox.after('#'+index);
		$('.row:first', row).removeClass('hidden');
		row.appendTo('.col-md-8');
		//$(window).scrollTop(row.offset().top);
	});
	$('.btn-danger:not(.dropdown-toggle)').on('click', function() { // Remove
		if($('.btn-danger').size() > 1) {
			$(this).parents('.row:eq(1)').remove();
			$(':checkbox', $('.col-md-8')).setCheckboxesIndex().setLaunchAble();
		}
	});
	$('.btn-group .dropdown-menu a').click(function(event) {
		event.preventDefault();
		var index = $(this).parent().index(),
			checkboxes = $(this).closest('.col-md-8').find(':checkbox');
		if (index === 0) { // Check all
			checkboxes.prop('checked', true);
		}
		else if (index == 1) { // Uncheck all
			checkboxes.prop('checked', false);
		}
		else if (index == 3) { // Remove checked
			$($(this).closest('.col-md-8').children('.row:not(:first-child)')).each(function() {
				if ($(this).has(':checked').length > 0) {
					$(this).remove();
				}
			});
			$(':checkbox', $('.col-md-8')).setCheckboxesIndex().setLaunchAble();
		}
		else if (index == 4) { // Empty checked
			$('.col-md-8 .row:has(:checked):not(:first) input:not(:checkbox)').val('').parent().removeClass('has-error').setLaunchAble();
		}
		else if (index == 6) { // Empty all
			$('.col-md-8 .row input:not(:checkbox)').val('').parent().removeClass('has-error').setLaunchAble();
		}
	});
	$('.glyphicon-export')
		.data('values', [' Export as full code', ' Export JSON'])
		.updateButtonValue($(':checkbox[value="exportType"]').prop('checked')); // F5 (page reload) fix
	$(':checkbox[value="exportType"]').click(function() {
		$('.glyphicon-export').updateButtonValue($(this).prop('checked'));
	});
	$('div[role="complementary"]').affix({
		offset: {
			top: function() {
				return (this.top = $('.page-header').outerHeight(true));
			},
			bottom: function () {
				return (this.bottom = $('#footer').outerHeight(true));
			}
		}
	});
	$('.col-xs-10 input').keyup(function() {
		$(this).validate().setLaunchAble();
	});
	$('.col-xs-10 input').change(function() {
		var v = $.trim($(this).val());
		$(this).val(v).validate().setLaunchAble();
	});
	$('.col-xs-10 input[type="url"]').change(function() {
		var v = $.trim($(this).val());
		if(v && !/^.*?:\/\//.test(v)) {
			$(this).val('http://'+v);
		}
	});
	var modalImportBody = $('#modalImport .modal-body').html();
	$('.col-md-4 .btn-primary:eq(1)').click(function() { // Import
		$('#modalImport .modal-body').html(modalImportBody);
		$('#modalImport').modal();
		$(this).addClass('active');
		$('#modalImport').on('hidden.bs.modal', function (e) {
			$('.col-md-4 .btn-primary:eq(1)').removeClass('active');
		});
	});
	$('#modalImport .btn-default:first').click(function() { // Paste example
		$('#modalImport textarea').text('{"items":[{"label":"GitHub","url":"https://github.com/earthperson/Webtags"},{"label":"Webtags","url":"http://earthperson.github.io/Webtags/"},{"label":"Dashboard","url":"http://earthperson.github.io/Webtags/dashboard/"},{"label":"Personal web page","url":"http://earthperson.info/en/"},{"label":"Freelancer web page","url":"http://dev.earthperson.info/en/"},{"label":"Website of the earthperson\'s GitHub account","url":"http://earthperson.github.io"}],"type":"rounded","width":500,"height":350,"border":true,"grid":false,"style":{"border":"1px solid #5e8cc2"},"tag":{"width":100,"height":32,"context":{"fillStyle":"#5e8cc2","strokeStyle":"#5e8cc2","shadowColor":"rgba(54, 111, 179, 0.4)","lineWidth":"2"}}}');
		$('#howto').popover('hide');
	});
	$('.modal .btn-primary').click(function() { // Import
		var data = $.trim($('#modalImport textarea').val());
		if(!data) return;
		try {
			data = JSON.parse($.trim(stripTags(data, /<canvas[^>]+>.*?<\/[^>]+>/gi).replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)/gm, '$1').replace(/new Webtags\(((.*\s*)*)\);/i, '$1')));
			$('#modalImport').modal('hide');
			$('.btn-group .dropdown-menu li:eq(0) a').click();
			$('.btn-group .dropdown-menu li:eq(3) a').click();
			$('.panel input[name="type"]').filter('input[value="'+data.type+'"]').prop('checked', true);
			$('#canvasWidth').val(data.width || 500);
			$('#canvasHeight').val(data.height || 350);
			$('.panel :checkbox[value="border"]').prop('checked', data.border);
			$('.panel input[name="grid"]').filter('input[value="'+(data.grid+0)+'"]').prop('checked', true);
			if(data['style'] && data.style['border']) {
				$('#modalCanvasMoreOptions .colorpicker-group').colorpicker().colorpicker('setValue', data.style.border);
			}
			if(data['tag']) {
				$('#tagWidth').val(data.tag['width'] || 100);
				$('#tagHeight').val(data.tag['height'] || 32);
				if(data.tag['context']) {
					$('#modalTagMoreOptions .colorpicker-group-fill-style').colorpicker().colorpicker('setValue', data.tag.context['fillStyle'] || '#5e8cc2');
					$('#modalTagMoreOptions .colorpicker-group-stroke-style').colorpicker().colorpicker('setValue', data.tag.context['strokeStyle'] || '#5e8cc2');
					$('#modalTagMoreOptions .colorpicker-group-shadow-color').colorpicker().colorpicker('setValue', data.tag.context['shadowColor'] || 'rgba(54, 111, 179, 0.4)');
					$('#lineWidth').val(data.tag.context['lineWidth'] || 2);
				}
			}
			var inputs = $('.col-md-8 .row:last input:not(:checkbox)'),
			    i = 0,
			    n = data.items.length;
			for(; i < n; i++) {
				if (i > 0) {
					$('.col-md-4 .btn-primary:first').click();
					inputs = $('.col-md-8 .row:last input:not(:checkbox)');
				}
				$(inputs).first().val(data.items[i].label).validate().setLaunchAble();
				$(inputs).last().val(data.items[i].url).validate().setLaunchAble();
			}
		}
		catch (e) {
			$('#modalImport .modal-body').html('<div class="alert alert-danger">Incorrect format.</div>');
		}
	});
	$('.col-md-4 .btn-primary:last').click(function() { // Export
		$('#modalExport .modal-title').text(
				$(':checkbox[value="exportType"]').prop('checked') ? 'Export as full code' : 'Export JSON'
		);
		var t = JSON.stringify($('.col-xs-10 .form-group:not(.has-error)').children('input').serializeObject());
		if($(':checkbox[value="exportType"]').prop('checked')) {
			t = "<canvas id=\"webtags\">This text is displayed if your browser does not support HTML5 Canvas.</canvas>\n"+
				"<script type=\"text/javascript\" src=\"render.min.js\"></script>\n"+
				"<script type=\"text/javascript\">\n"+
				"new Webtags("+t+");\n"+
				"</script>\n";
		}
		$('#modalExport textarea').text(t).focus(function() {
			var $this = $(this);
			$this.select();
			$this.mouseup(function(event) {
				event.preventDefault();
				// Prevent further mouseup intervention
				$this.unbind('mouseup');
			});
		});
		$('#modalExport').modal();
		$(this).addClass('active');
		$('#modalExport').on('hidden.bs.modal', function (e) {
			$('.col-md-4 .btn-primary:last').removeClass('active');
		});
	});
	$('.btn-launch').click(function() { // Launch
		var o = $('.col-xs-10 .form-group:not(.has-error)').children('input').serializeObject();
		if (o instanceof Object && o['items']) {
			$('#modalTagMoreOptions').modal('hide');
			$('#modalCanvasMoreOptions').modal('hide');
			$('#modalLaunch').modal();
			$(this).addClass('active');
			$('#modalLaunch').on('hidden.bs.modal', function (e) {
				$('.btn-launch').removeClass('active');
			});
			new Webtags(o);
		}
	});
	$('.col-md-4 .panel:first .btn-default').click(function() { // Tag more options...
		var m = $('#modalTagMoreOptions').modal(), $this = $(this).addClass('active');
		m.on('hidden.bs.modal', function (e) {
			$this.removeClass('active');
		});
		$('input[name="modal-type"]', m).filter('input[value="'+$('.panel input[name="type"]:checked').val()+'"]').prop('checked', true);
		$('input[name="modal-type"]', m).change(function() {
			$('.panel input[name="type"]').prop('checked', false);
			$('.panel input[name="type"]').filter('input[value="'+$(this).val()+'"]').prop('checked', true);
		});
		$('input[name="modal-grid"]', m).filter('input[value="'+$('.panel input[name="grid"]:checked').val()+'"]').prop('checked', true);
		$('input[name="modal-grid"]', m).change(function() {
			$('.panel input[name="grid"]').prop('checked', false);
			$('.panel input[name="grid"]').filter('input[value="'+$(this).val()+'"]').prop('checked', true);
		});
		$('.colorpicker-group-fill-style', m).colorpicker();
		$('.colorpicker-group-stroke-style', m).colorpicker();
		$('.colorpicker-group-shadow-color', m).colorpicker();
	});
	$('.col-md-4 .panel:eq(1) .btn-default').click(function() { // Canvas more options...
		var m = $('#modalCanvasMoreOptions').modal(), $this = $(this).addClass('active');
		m.on('hidden.bs.modal', function (e) {
			$this.removeClass('active');
		});
		$(':checkbox[value="modal-border"]', m).prop('checked', $('.panel :checkbox[value="border"]').prop('checked'));
		$(':checkbox[value="modal-border"]', m).change(function() {
			$('.panel :checkbox[value="border"]').prop('checked', $(this).prop('checked'));
		});
		$('#modalCanvasMoreOptions .colorpicker-group').colorpicker();
	});
});
