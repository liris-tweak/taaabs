/**
 * @summary Trace object that is synchronised to a KTBS.
 * @class Javascript Model Object that is bound to a KTBS Model. 
 * @author Benoît Mathern / DERBEL Fatma
 * @requires jQuery framework (see <a href="http://jquery.com">jquery.com</a>)
 * @constructor
 * @augments Samotraces.EventHandler
 * @augments Samotraces.KTBS.Resource
 * @description
 * Samotraces.KTBS.Modelis a Javascript Trace object
 * that is bound to a KTBS Model. This Object implements the KTBS API.
 * Methods are available to get 
 * the Liste of type of Obsels from the KTBS Model, .
 *
 * 
 *
 * @todo Fully implement KTBS API
 *
 * @param {String}	uri	URI of the KTBS trace to load.
 * @param {String}	[id]	ID of the KTBS trace to load.
 */
 
 
 Samotraces.KTBS.Model = function (data) {
 
        Samotraces.EventHandler.call(this);
        if (data !== 'null')
       { this.list_Types_Obsles= this.list_obsels(data);}
        
};

Samotraces.KTBS.Model.prototype = {

	list_obsels: function(data) {
	ListeObselType=[];
	M=this;
		data.forEach(function(el,key) {
		var obs = {attributes: []};
		if (el["@type"]=="ObselType")
		    {
		        obs.id=el["@id"];
		        obs.type = el["@id"].substr(1);
		        obs.coche=false;
		        //obs[key] = el[key]
		        if (el['hasSuperObselType'])
		        {
		        obs.hasSuperObselType=el['hasSuperObselType']
		        }
		        ListeObselType.push(obs);
		        M.trigger('Model:Draw_obsel',obs);
		        console.log ('triger')
		    }
		 else if (el["@type"]=="AttributeType")
		 
		 {
		    obs=M.GetObselType(el["hasAttributeObselType"],ListeObselType);
		    el['coche']=false;
		    obs.attributes.push(el);
		    
		 }
		 
		});
		ListeObselType.forEach(function(o){
		if (o.hasSuperObselType)
		{
		
		o.attributes= M.getAttributes (o.hasSuperObselType[0])
		}
		
		})
		return ListeObselType;
		            
	},

GetObselType :function (id,ListeObselType)
		            {
		            var obs=[];
		             ListeObselType.forEach(function(o)
		              {
		                 
		                  if (o["id"]==id)
		                  {
		                  
		                  obsR=o;
		                  
		                  }
		              
		              }
		              )
		               return obsR;
		            },
	
		


getAttributes :function (ident)
		            {
		            
		             ListeObselType.forEach(function(o)
		              {
		                 
		                   if (o.id===ident)
                            {Att = o.attributes}
		              
		              }
		              )
		               return Att;
		            }
	
		
};

