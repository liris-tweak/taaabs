Samotraces.UI.Widgets.DisplayModel = function(divId,model,options) {
		options = options || {};
		// WidgetBasicTimeForm is a Widget
		Samotraces.UI.Widgets.Widget.call(this,divId);
		this.add_class('Widget-TraceModel');
		//$(window).resize(this.refresh_x.bind(this));
		this.model=model;
		this.model.on('Model:Draw_obsel',this.draw.bind(this));
		this.init_DOM();
		this.options = {};
		this.data=this.model.list_Types_Obsles;
		var this_widget = this;
		var bind_function = function(val_or_fun) {
			if(val_or_fun instanceof Function) {
				return val_or_fun.bind(this_widget);
			} else {
				return val_or_fun;
			}
		};
		x=0
		x1=16;
		this.options.x_Img = bind_function(options.x || function(o) {
			x=x+16
			return x;
		});
		this.options.x_text = bind_function(options.x || function(o) {
			x1=x1+16
			return x1;
		});
		this.options.y = bind_function(options.y || 17);
		this.options.width = bind_function(options.width || 16);
		this.options.height = bind_function(options.height || 16);
		this.options.url = bind_function(options.url || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAG7AAABuwBHnU4NQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKsSURBVDiNrZNLaFNpFMd/33fvTa5tYpuq0yatFWugRhEXw9AuhJEZBCkiqJWCIErrxp241C6L6650M/WBowunoyCDCjKrGYZ0IbiwxkdUbGyaPmgSm8d9f25MbXUlzH95zv/8OOdwjlBKsVajU1kEtJiavNBsaKcBqq5/3fKDSwrKY33JdX7RAIxOZQGM3bHIymCyPZhZqT8p2d4sQGtY7+yObvhxMjsvp4uVKOA2QEIpxehUFl2IvuFUZ3rZcu/+9X7RWqg7Jxw/QAFhTdLRFJoY6N4SazONo1czs/2eUlNjfUn0Risne+Pp9yv18TvZwrl9iVb2J2JEQhoKKNke6UJ55LfMB4aSHeMne+Ppay/yAkBcTL9ma7Np7Yu3/n1lOjdQ8wLO793GzlgzFdcjYujoUpAt17j8LIfjB5zdvfXBv3OlX3NVy5SAOJVKhP94M29UXB8FFGoWE89nufTkHQ9nFlEKejZuoLe1iYrr8+fbee9UKhEGhB6SYrBoudPLtnsAQCnF768Kq1v2AxAC6l7AsuUCsGS5h4uWOx2SYlBqQoyUHW/O9gO+1i9dbfyciKGA/wol3pTrANh+QNnx5jQhRuQ3VZ+1Z1OUg92biZkG/+SL3Hu7gPfVzQBIX6mJlpAeD2vrWds3mth+wOtSlUczS1RdfzUX1iQtIT3uKzWhO4GajJnGnc2mcf+j4x1umJ4uVShUbRSwUHPWwdvCxuOYaRxwAjUpAXUjk7eP9bTrEUNbNf30Q5ThXV0c6WknGvoSjxgax3e0uzcyeRtQcqwvSa5qmaYuB4aSHeMNiEJgahJ9zWQRQ2Mo2TFu6nIgV7XMdZd48+Vc/3CqM30m1XX3wcxi8d3H2sitl3mUACkEyZam24e2bTHbTOPc1cxsf6Pu/3mmtfred/4ESQNKXG8VACoAAAAASUVORK5CYII=');
		wid=this;
		this.data.forEach(function(o){
		    wid.draw(o);
		});
		
		           
	};
Samotraces.UI.Widgets.DisplayModel.prototype = {
		init_DOM: function() {
			    var div_elmt = d3.select('#'+this.id);
			    this.div_elmt=d3.select('#'+this.id);
				this.svg = div_elmt.append('svg')
				.attr('height','1000px');
                // create the (red) line representing current time
				
                this.x=16;
			
				this.translate_offset = 0;
                var x = d3.time.scale()
                .domain([new Date(2014, 4, 1), new Date(2014, 4, 15) - 1])
                // .domain([this.window.start, this.window.end])
                    .range([0, this.element.clientWidth]);
                    var margin = {top: 200, right: 40, bottom: 200, left: 40},
                    height = 500 - margin.top - margin.bottom;
                    /*this.svg_gp = this.svg.append('g')
						.attr('transform', 'translate(0,0)');
						 this.svg_text = this.svg.append('g')
						.attr('transform', 'translate(0,0)');*/
	                this.svg_selected_obsel = div_elmt.append('line')
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
		
		d3Obselstext : function() {
			return this.svg_text 
					.selectAll('circle,image,rect')
					// TODO: ATTENTION! WARNING! obsels MUST have a field id -> used as a key.
					//.data(this.data); //,function(d) { return d.id;});
					.data(this.data, function(d) { return d.id;}); // TODO: bogue in case no ID exists -> might happen with KTBS traces and new obsels
		},
		
		draw: function(e) {
		var images= this.svg.selectAll("circle,image,rect")
                    .data(this.data, function(d) { return d.id;})
                     .enter()
                     .append("image");
		var images_att=	images.attr('class','Samotraces-obsel')
				            .attr('y',this.options.x_Img)
				            .attr('x','17')
				            .attr('width','16')
				            .attr('height','16')
				            .attr('xlink:href',this.options.url);
		var text = this.svg.selectAll("text")
                        .data(this.data)
                        .enter()
                        .append("text");
        var textLabels = text
                 .attr("x",'35')
                 .attr("y",this.options.x_text)
                 .text(function(d) { return d.type;})
                 .attr("font-family", "sans-serif")
                .attr("font-size", "15px");
                
           /* this.d3Obsels()
				.exit()
				.remove();
			this.d3Obsels()
				.enter()
				.append('image')
				.attr('class','Samotraces-obsel')
				.attr('y',this.options.x)
				.attr('x','17')
				.attr('width','16')
				.attr('height','16')
				.attr('xlink:href',this.options.url)
				
			this.d3Obsels()
				.enter()
				.append('text')
				.attr('class','Samotraces-obsel')
				.attr('y',this.options.x)
				.attr('x','30')
				.attr('width','16')
				.attr('height','16')
				//.attr('xlink:href',this.options.url)
				.text ("ici");*/
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
