 Samotraces.UI.Widgets.IntervalTimeForm = function(html_id,timeWindow) {
		// WidgetBasicTimeForm is a Widget
		Samotraces.UI.Widgets.Widget.call(this,html_id);
		this.add_class('Widget-ReadableTimeForm');
		this.window= timeWindow;
		this.window.on('tw:update',this.refresh.bind(this));
		this.window.on('tw:translate',this.refresh.bind(this));
		//this.timer.on('timer:update',this.refresh.bind(this));
		//this.timer.on('timer:play:update',this.refresh.bind(this));
		this.init_DOM();
		this.refresh();
	};
	Samotraces.UI.Widgets.IntervalTimeForm.prototype = {
		init_DOM: function() {

			var p_element = document.createElement('p');
			var text_node = document.createTextNode('FROM: ');
			p_element.appendChild(text_node);
			this.year_element = document.createElement('input');
			this.year_element.setAttribute('type','text');
			this.year_element.setAttribute('name','year');
			this.year_element.setAttribute('size',4);
			this.year_element.setAttribute('value','');
			p_element.appendChild(this.year_element);
			p_element.appendChild(document.createTextNode('/'));
			this.month_element = document.createElement('input');
			this.month_element.setAttribute('type','text');
			this.month_element.setAttribute('name','month');
			this.month_element.setAttribute('size',2);
			this.month_element.setAttribute('value','');
			p_element.appendChild(this.month_element);
			p_element.appendChild(document.createTextNode('/'));
			this.day_element = document.createElement('input');
			this.day_element.setAttribute('type','text');
			this.day_element.setAttribute('name','day');
			this.day_element.setAttribute('size',2);
			this.day_element.setAttribute('value','');
			p_element.appendChild(this.day_element);
			p_element.appendChild(document.createTextNode(' - '));
			this.hour_element = document.createElement('input');
			this.hour_element.setAttribute('type','text');
			this.hour_element.setAttribute('name','hour');
			this.hour_element.setAttribute('size',2);
			this.hour_element.setAttribute('value','');
			p_element.appendChild(this.hour_element);
			p_element.appendChild(document.createTextNode(':'));
			this.minute_element = document.createElement('input');
			this.minute_element.setAttribute('type','text');
			this.minute_element.setAttribute('name','minute');
			this.minute_element.setAttribute('size',2);
			this.minute_element.setAttribute('value','');
			p_element.appendChild(this.minute_element);
			p_element.appendChild(document.createTextNode(':'));
			this.second_element = document.createElement('input');
			this.second_element.setAttribute('type','text');
			this.second_element.setAttribute('name','second');
			this.second_element.setAttribute('size',8);
			this.second_element.setAttribute('value','');
			p_element.appendChild(this.second_element);
			
			//var p_element1 = document.createElement('p');
			var text_node1 = document.createTextNode('To: ');
			p_element.appendChild(text_node1);
			this.year_element1 = document.createElement('input');
			this.year_element1.setAttribute('type','text');
			this.year_element1.setAttribute('name','year');
			this.year_element1.setAttribute('size',4);
			this.year_element1.setAttribute('value','');
			p_element.appendChild(this.year_element1);
			p_element.appendChild(document.createTextNode('/'));
			this.month_element1 = document.createElement('input');
			this.month_element1.setAttribute('type','text');
			this.month_element1.setAttribute('name','month');
			this.month_element1.setAttribute('size',2);
			this.month_element1.setAttribute('value','');
			p_element.appendChild(this.month_element1);
			p_element.appendChild(document.createTextNode('/'));
			this.day_element1 = document.createElement('input');
			this.day_element1.setAttribute('type','text');
			this.day_element1.setAttribute('name','day');
			this.day_element1.setAttribute('size',2);
			this.day_element1.setAttribute('value','');
			p_element.appendChild(this.day_element1);
			p_element.appendChild(document.createTextNode(' - '));
			this.hour_element1 = document.createElement('input');
			this.hour_element1.setAttribute('type','text');
			this.hour_element1.setAttribute('name','hour');
			this.hour_element1.setAttribute('size',2);
			this.hour_element1.setAttribute('value','');
			p_element.appendChild(this.hour_element1);
			p_element.appendChild(document.createTextNode(':'));
			this.minute_element1 = document.createElement('input');
			this.minute_element1.setAttribute('type','text');
			this.minute_element1.setAttribute('name','minute');
			this.minute_element1.setAttribute('size',2);
			this.minute_element1.setAttribute('value','');
			p_element.appendChild(this.minute_element1);
			p_element.appendChild(document.createTextNode(':'));
			this.second_element1 = document.createElement('input');
			this.second_element1.setAttribute('type','text');
			this.second_element1.setAttribute('name','second');
			this.second_element1.setAttribute('size',8);
			this.second_element1.setAttribute('value','');
			p_element.appendChild(this.second_element1);





			var submit_element = document.createElement('input');
			submit_element.setAttribute('type','submit');
			submit_element.setAttribute('value','Update time');
			p_element.appendChild(submit_element);
			this.form_element = document.createElement('form');
			this.form_element.addEventListener('submit', this.build_callback('submit'));

			this.form_element.appendChild(p_element);
			

			this.element.appendChild(this.form_element);
		},
		refresh: function() {
			
			timestart = this.window.start;
			timeEnd = this.window.end;
			
			var datestart = new Date();
			datestart.setTime(timestart);
			this.year_element.value   = datestart.getFullYear();
			this.month_element.value  = datestart.getMonth()+1;
			this.day_element.value    = datestart.getDate();
			this.hour_element.value   = datestart.getHours();
			this.minute_element.value = datestart.getMinutes();
			this.second_element.value = datestart.getSeconds()+datestart.getMilliseconds()/1000;

			var dateEnd = new Date();
			dateEnd.setTime(timeEnd);
			this.year_element1.value   = dateEnd.getFullYear();
			this.month_element1.value  = dateEnd.getMonth()+1;
			this.day_element1.value    = dateEnd.getDate();
			this.hour_element1.value   = dateEnd.getHours();
			this.minute_element1.value = dateEnd.getMinutes();
			this.second_element1.value = dateEnd.getSeconds()+dateEnd.getMilliseconds()/1000;
		},
		build_callback: function(event) {
			var timerWindow = this.window;
			var time_form = this;
			switch(event) {
				case 'submit':
					return function(e) {
						//console.log('WidgetBasicTimeForm.submit');
						e.preventDefault();


			var datestart = new Date();
			datestart.setFullYear(time_form.year_element.value);
			datestart.setMonth(time_form.month_element.value-1);
			datestart.setDate(time_form.day_element.value);
			datestart.setHours(time_form.hour_element.value);
			datestart.setMinutes(time_form.minute_element.value);
			datestart.setSeconds(time_form.second_element.value);
			var dateend = new Date();
			dateend.setFullYear(time_form.year_element1.value);
			dateend.setMonth(time_form.month_element1.value-1);
			dateend.setDate(time_form.day_element1.value);
			dateend.setHours(time_form.hour_element1.value);
			dateend.setMinutes(time_form.minute_element1.value);
			dateend.setSeconds(time_form.second_element1.value);
			timerWindow.set_start(datestart.getTime());
			timerWindow.set_end (dateend.getTime())
						//timer.set(date.getTime());
						return false;
					};
				default:
					return function() {};
			}
		}
	};
