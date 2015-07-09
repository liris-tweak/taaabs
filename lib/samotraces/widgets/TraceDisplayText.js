Samotraces.UI.Widgets.TraceDisplayText = function(divId,trace,time_window) {
		Samotraces.UI.Widgets.Widget.call(this,divId);
		this.divId = divId;
		this.add_class('Widget-TraceDisplayText');
		this.trace = trace;
		this.trace.on('trace:updateT',this.refresh_x.bind(this));
		this.trace.on('trace:create_obsel_Text',this.draw.bind(this));
		this.window = time_window;
		this.window.on('tw:update',this.refresh_x.bind(this));
		this.window.on('ChangeLangage',this.refresh_x.bind(this));
		this.refresh_x();
		this.dataOb=[];
	};
	Samotraces.UI.Widgets.TraceDisplayText.prototype = {
		draw: function(e) {
		this.dataOb.push(JSON.stringify(e.data));
		//this.dataOb = JSON.stringify (e.data);
		        Assist.ViewTrace.addObselVisu(e.data,this.divId);
				$("#"+e.data['@id']).hide()
		},
		refresh_x: function(){
            timeWindow = this.window;
			this.trace.obsel_list.forEach(function(o) {
	  	    if ((timeWindow.start <= o.get_begin()) && 
	  	    (o.get_begin()<= timeWindow.end) )
	  			    {$("#"+o.get_id()).show()}
	  	    else 
	  			    {$("#"+o.get_id()).hide()}
	  	    });
	  			},
	  			redraw: function(){
	  			 document.getElementById(this.divId).innerHTML="";
	  			 widj=this;
			this.dataOb.forEach(function(o) {
	      	    Assist.ViewTrace.addObselVisu(JSON.parse(o),widj.divId);
				$("#"+JSON.parse(o)['@id']).hide();
	  	    });
	  	    this.refresh_x();
	  			},
};
