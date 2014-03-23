describe('PeerSquare.model.Evento', function() {
	it('exists', function() {
		var model = Ext.create('PeerSquare.model.Evento');
		expect(model.$className).toEqual('PeerSquare.model.Evento');
	});
	
	it('has data', function() {
		var model = Ext.create('PeerSquare.model.Evento', {
			nome_evento: "Final do concurso Cidadao Inteligente",
			data: '31/03/2014',
			hora: '15:00',
			id_praca: 1,
			tags: "tecnologia, cidade"
		});
		expect(model.get('nome_evento')).toEqual('Final do concurso Cidadao Inteligente');
		expect(model.get('data')).toEqual('31/03/2014');
		expect(model.get('hora')).toEqual('15:00');
		expect(model.get('id_praca')).toEqual(1);
		expect(model.get('tags')).toEqual('tecnologia, cidade');
	});
	
	it('requires an id for the square', function() {
		var model = Ext.create('PeerSquare.model.Evento');
		var errors = model.validate();
		//expect(errors.isValid()).toBeFalsy();
		
		//expect(errors.getByField('data')[0].getMessage()).toEqual('must be present');
	});
});
