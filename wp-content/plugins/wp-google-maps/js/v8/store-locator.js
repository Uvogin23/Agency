/**
 * @namespace WPGMZA
 * @module StoreLocator
 * @requires WPGMZA.EventDispatcher
 */
jQuery(function($) {
	
	WPGMZA.StoreLocator = function(map, element)
	{
		var self = this;
		
		WPGMZA.EventDispatcher.call(this);
		
		this._center = null;
		
		this.map = map;
		this.element = element;
		this.state = WPGMZA.StoreLocator.STATE_INITIAL;
		
		$(element).find(".wpgmza-not-found-msg").hide();
		
		// TODO: This will be moved into this module instead of listening to the map event
		this.map.on("storelocatorgeocodecomplete", function(event) {
			self.onGeocodeComplete(event);
		});
		
		this.map.on("init", function(event) {
			
			self.map.markerFilter.on("filteringcomplete", function(event) {
				self.onFilteringComplete(event);
			});
			
		});

		// Legacy store locator buttons
		$(document.body).on("click", ".wpgmza_sl_search_button_" + map.id + ", [data-map-id='" + map.id + "'] .wpgmza_sl_search_button", function(event) {
			self.onSearch(event);
		});
		
		$(document.body).on("click", ".wpgmza_sl_reset_button_" + map.id + ", [data-map-id='" + map.id + "'] .wpgmza_sl_reset_button_div", function(event) {
			self.onReset(event);
		});
	}
	
	WPGMZA.StoreLocator.prototype = Object.create(WPGMZA.EventDispatcher.prototype);
	WPGMZA.StoreLocator.prototype.constructor = WPGMZA.StoreLocator;
	
	WPGMZA.StoreLocator.STATE_INITIAL		= "initial";
	WPGMZA.StoreLocator.STATE_APPLIED		= "applied";
	
	WPGMZA.StoreLocator.createInstance = function(map, element)
	{
		return new WPGMZA.StoreLocator(map, element);
	}
	
	Object.defineProperty(WPGMZA.StoreLocator.prototype, "radius", {
		"get": function() {
			return $("#radiusSelect, #radiusSelect_" + this.map.id).val();
		}
	});
	
	Object.defineProperty(WPGMZA.StoreLocator.prototype, "center", {
		"get": function() {
			return this._center;
		}
	});
	
	Object.defineProperty(WPGMZA.StoreLocator.prototype, "bounds", {
		"get": function() {
			return this._bounds;
		}
	});
	
	Object.defineProperty(WPGMZA.StoreLocator.prototype, "circle", {
		
		"get": function() {
			
			if(this._circle)
				return this._circle;
			
			if(this.map.settings.wpgmza_store_locator_radius_style == "modern" && !WPGMZA.isDeviceiOS())
			{
				this._circle = WPGMZA.ModernStoreLocatorCircle.createInstance(this.map.id);
				this._circle.settings.color = this.circleStrokeColor;
			}
			else
			{
				this._circle = WPGMZA.Circle.createInstance({
					strokeColor:	"#ff0000",
					strokeOpacity:	"0.25",
					strokeWeight:	2,
					fillColor:		"#ff0000",
					fillOpacity:	"0.15",
					visible:		false,
					clickable:      false
				});
			}
			
			return this._circle;
			
		}
		
	});
	
	WPGMZA.StoreLocator.prototype.onGeocodeComplete = function(event)
	{
		if(!event.results || !event.results.length)
		{
			this._center = null;
			this._bounds = null;

			return;
		}
		else
		{
			this._center = new WPGMZA.LatLng( event.results[0].latLng );
			this._bounds = new WPGMZA.LatLngBounds( event.results[0].bounds );
		}
		
		this.map.markerFilter.update();
	}
	
	WPGMZA.StoreLocator.prototype.onSearch = function(event)
	{
		this.state = WPGMZA.StoreLocator.STATE_APPLIED;
	}
	
	WPGMZA.StoreLocator.prototype.onReset = function(event)
	{
		this.state = WPGMZA.StoreLocator.STATE_INITIAL;
		
		this._center = null;
		this._bounds = null;
		
		this.map.markerFilter.update();
	}
	
	WPGMZA.StoreLocator.prototype.getFilteringParameters = function()
	{
		if(!this.center)
			return {};
		
		return {
			center: this.center,
			radius: this.radius
		};
	}
	
	WPGMZA.StoreLocator.prototype.onFilteringComplete = function(event)
	{
		var params = event.filteringParams;
		
		// Temporarily disabled. Does not work with static JS filtering
		/*if(event.filteredMarkers.length == 0)
			$(this.element).find(".wpgmza-not-found-msg").show();
		else
			$(this.element).find(".wpgmza-not-found-msg").hide();*/
		
		var circle = this.circle;
		
		if(!circle)
			return;
		
		circle.setVisible(false);
		
		if(params.center && params.radius)
		{
			circle.setRadius(params.radius);
			circle.setCenter(params.center);
			circle.setVisible(true);
			
			if(circle.map != this.map)
				this.map.addCircle(circle);
		}
		
		if(circle instanceof WPGMZA.ModernStoreLocatorCircle)
			circle.settings.radiusString = this.radius;
		
	}
	
});