Ext.require('PeerSquare.view.MyView');

describe('PeerSquare.view.MyView', function () {
	it("has a list of colors", function () {
		var store = Ext.create('PeerSquare.store.MyStore', {
			data: [
				{color: 'red'},
				{color: 'green'},
				{color: 'blue'}
			]
		
		});
		
		var view = Ext.create('PeerSquare.view.MyView', {
			renderTo: 'jasmine_content',
			store: store
		});
		
		expect(Ext.DomQuery.select('.favorite-color').map(function (el) { return el.textContent }).join(', ')).toEqual('red, green, blue');
		
	});
});
