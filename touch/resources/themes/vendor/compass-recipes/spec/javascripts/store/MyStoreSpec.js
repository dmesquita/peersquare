describe('PeerSquare.store.MyStore', function() {
	var store;
	beforeEach(function () {
		jasmine.Ajax.useMock();
		clearAjaxRequests();
		store = Ext.create('PeerSquare.store.MyStore')
	});
	
	it('calls out to the proper url', function() {
		store.load();
		var request = mostRecentAjaxRequest();
		expect(request.url).toEqual('/colors.json');
	});
});
