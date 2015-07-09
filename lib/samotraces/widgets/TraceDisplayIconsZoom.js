Samotraces.UI.Widgets.TraceDisplayIconsZoom = function(divId,trace,time_window,options) {
		options = options || {};
		// WidgetBasicTimeForm is a Widget
		Samotraces.UI.Widgets.Widget.call(this,divId);
		this.add_class('Widget-TraceDisplayIcons');
		//$(window).resize(this.refresh_x.bind(this));
		this.trace = trace;
		this.trace.on('trace:update',this.draw.bind(this));
		this.trace.on('trace:create_obsel',this.draw.bind(this));
		this.window = time_window;
		this.window.on('tw:update',this.refresh_x.bind(this));
		//this.window.on('tw:translate',this.translate_x.bind(this));
		this.init_DOM();
	   // this.data = this.trace.list_obsels(time_window.start,time_window.end);
	   this.data= this.trace.obsel_list;
		this.options = {};
		var this_widget = this;
		var bind_function = function(val_or_fun) {
			if(val_or_fun instanceof Function) {
				return val_or_fun.bind(this_widget);
			} else {
				return val_or_fun;
			}
		};
		this.options.x = bind_function(options.x || function(o) {
			return this.calculate_x(o.get_begin()) - 8;
		});
		this.options.y = bind_function(options.y || 17);
		this.options.width = bind_function(options.width || 16);
		this.options.height = bind_function(options.height || 16);
		this.options.url = bind_function(options.url || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAG7AAABuwBHnU4NQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKsSURBVDiNrZNLaFNpFMd/33fvTa5tYpuq0yatFWugRhEXw9AuhJEZBCkiqJWCIErrxp241C6L6650M/WBowunoyCDCjKrGYZ0IbiwxkdUbGyaPmgSm8d9f25MbXUlzH95zv/8OOdwjlBKsVajU1kEtJiavNBsaKcBqq5/3fKDSwrKY33JdX7RAIxOZQGM3bHIymCyPZhZqT8p2d4sQGtY7+yObvhxMjsvp4uVKOA2QEIpxehUFl2IvuFUZ3rZcu/+9X7RWqg7Jxw/QAFhTdLRFJoY6N4SazONo1czs/2eUlNjfUn0Risne+Pp9yv18TvZwrl9iVb2J2JEQhoKKNke6UJ55LfMB4aSHeMne+Ppay/yAkBcTL9ma7Np7Yu3/n1lOjdQ8wLO793GzlgzFdcjYujoUpAt17j8LIfjB5zdvfXBv3OlX3NVy5SAOJVKhP94M29UXB8FFGoWE89nufTkHQ9nFlEKejZuoLe1iYrr8+fbee9UKhEGhB6SYrBoudPLtnsAQCnF768Kq1v2AxAC6l7AsuUCsGS5h4uWOx2SYlBqQoyUHW/O9gO+1i9dbfyciKGA/wol3pTrANh+QNnx5jQhRuQ3VZ+1Z1OUg92biZkG/+SL3Hu7gPfVzQBIX6mJlpAeD2vrWds3mth+wOtSlUczS1RdfzUX1iQtIT3uKzWhO4GajJnGnc2mcf+j4x1umJ4uVShUbRSwUHPWwdvCxuOYaRxwAjUpAXUjk7eP9bTrEUNbNf30Q5ThXV0c6WknGvoSjxgax3e0uzcyeRtQcqwvSa5qmaYuB4aSHeMNiEJgahJ9zWQRQ2Mo2TFu6nIgV7XMdZd48+Vc/3CqM30m1XX3wcxi8d3H2sitl3mUACkEyZam24e2bTHbTOPc1cxsf6Pu/3mmtfred/4ESQNKXG8VACoAAAAASUVORK5CYII=');
		this.draw();
	};
Samotraces.UI.Widgets.TraceDisplayIconsZoom.prototype = {
		init_DOM: function() {
			
				var div_elmt = d3.select(this.element);
				this.svg = div_elmt.append('svg');

				// create the (red) line representing current time
				if(typeof(this.window.timer) !== "undefined") {
					this.svg.append('line')
						.attr('x1','50%')
						.attr('y1','0%')
						.attr('x2','50%')
						.attr('y2','100%')
						.attr('stroke-width','1px')
						.attr('stroke','red')
						.attr('opacity','0.3');
				}

				this.scale_x = this.element.clientWidth/this.window.get_width();
				this.translate_offset = 0;
                var x = d3.time.scale()
   // .domain([new Date(2014, 4, 1), new Date(2014, 4, 15) - 1])
    .domain([this.window.start, this.window.end])
    .range([0, this.element.clientWidth]);
    var margin = {top: 200, right: 40, bottom: 200, left: 40},
     height = 500 - margin.top - margin.bottom;
     this.svg_gp = this.svg.append('g')
						.attr('transform', 'translate(0,0)');
				this.svg_selected_obsel = this.svg.append('line')
					.attr('x1','0')
					.attr('y1','0%')
					.attr('x2','0')
					.attr('y2','100%')
					.attr('stroke-width','1px')
					.attr('stroke','black')
					.attr('opacity','0.3')
					.attr('transform', 'translate(0,0)')
					.style('display','none');
		
},
		d3Obsels: function() {
			return this.svg_gp
					.selectAll('circle,image,rect')
					// TODO: ATTENTION! WARNING! obsels MUST have a field id -> used as a key.
					//.data(this.data); //,function(d) { return d.id;});
					.data(this.data, function(d) { return d.id;}); // TODO: bogue in case no ID exists -> might happen with KTBS traces and new obsels
		},
		calculate_x: function(time) {
			return x = (time - this.window.start)*this.scale_x + this.translate_offset;
		},
		
		draw: function(e) {
            
			if(e) {
				switch(e.type) {
					case "trace:update":
					this.data = this.trace.list_obsels();
					
						//this.data = this.trace.list_obsels(this.window.start,this.window.end);
						break;
					default:
						this.data = this.trace.obsel_list; // do not want to trigger the refreshing of list_obsels()...
						break;
					}
			}
			
			this.d3Obsels()
				.exit()
				.remove();
			this.d3Obsels()
				.enter()
				.append('image')
				.attr('class','Samotraces-obsel')
				.attr('x',this.options.x)
				.attr('y',this.options.y)
				.attr('width',this.options.width)
				.attr('height',this.options.height)
				.attr('xlink:href',this.options.url);
			// Storing obsel data with jQuery for accessibility from 
			// events defined by users with jQuery
			$('image',this.element).each(function(i,el) {
				$.data(el,{
					'Samotraces-type': 'obsel',
					'Samotraces-data': d3.select(el).datum()
				});
			});
			
		},
		refresh_x: function() {
		    
			this.scale_x = this.element.clientWidth/this.window.get_width();
			this.translate_offset = 0;
			this.svg_gp
				.attr('transform', 'translate(0,0)');
			this.d3Obsels()
				.attr('x',this.options.x)
				.attr('y',this.options.y);
		},
		};
