Ext.define('PeerSquare.view.MyView', {
	extend: 'Ext.dataview.DataView',
	xtype: 'myview',
	config: {
		itemTpl: '<div class="favorite-color">{color}</div>'
	}
});
