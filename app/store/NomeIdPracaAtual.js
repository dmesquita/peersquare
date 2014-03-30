Ext.define('PeerSquare.store.NomeIdPracaAtual', {
	extend: 'Ext.data.Store',
	requires: ['PeerSquare.model.NomeIdPracaAtual'],
    config: {
    	model: 'PeerSquare.model.NomeIdPracaAtual',
    	autoLoad: true
	}
});
