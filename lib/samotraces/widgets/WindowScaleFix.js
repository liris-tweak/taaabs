Samotraces.UI.Widgets.WindowScaleFix = function(html_id,time_window,is_javascript_date) {
		// WidgetBasicTimeForm is a Widget
		Samotraces.UI.Widgets.Widget.call(this,html_id);
        this.add_class('Widget-WindowScale');
		$(window).resize(this.draw.bind(this));
        this.window = time_window;
	    // trying to guess if time_window is related to a Date() object
		if(this.window.start > 1000000000) { // 1o^9 > 11 Jan 1970 if a Date object
			this.is_javascript_date = is_javascript_date || true;
		} else {
			this.is_javascript_date = is_javascript_date || false;
		}
        	this.window.on('tw:update',this.draw.bind(this));
		this.init_DOM();
		// update slider's position
		this.draw();
		};
	Samotraces.UI.Widgets.WindowScaleFix.prototype = {
	init_DOM: function() {
		// create the slider
		//this.svg = d3.select("#"+this.id).append("svg");
		this.svg = d3.select(this.element).append("svg");
		if(this.is_javascript_date) {
			this.x = d3.time.scale(); //.range([0,this.element.getSize().x]);
		} else {
			this.x = d3.scale.linear();
		}
		//this.xAxis = d3.svg.axis().scale(this.x); //.orient("bottom");
		this.xAxis = d3.svg.axis().scale(this.x);
		                           //.ticks(d3.time.days);
		this.x.domain([this.window.start,this.window.end]);
		this.svgAxis = this.svg.append("g");
		
	},

	draw: function() {
		this.x.range([0,this.element.clientWidth]);// = d3.time.scale().range([0,this.element.getSize().x]);
		this.x.domain([this.window.start,this.window.end]);
		this.svgAxis.call(this.xAxis);
	},
};
