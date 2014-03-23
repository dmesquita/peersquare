Ext.define('PeerSquare.store.MyStore', {
	extend: 'Ext.data.Store',
	config: {
		storeId: 'mystore',
		fields: ['color'],
		data: [
			{color: 'red'},
			{color: 'green'},
			{color: 'blue'}
		]
	}
});
