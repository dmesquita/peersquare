Ext.define('PeerSquare.utils.Functions', {
	singleton: true,
	
	requires: ['Ext.Ajax'],
		
	loadData: function() {
		Ext.Viewport.setMasked({
				xtype: 'loadmask',
				indicator: true,
				message: 'Logando no apigee...'
		});									
	},
	
	mostrarEventos: function(parte_da_data, valor){
		var client = new Usergrid.Client({
			orgName:'dehmesquita', 
			appName:'peersquare' 
		});
		
		var options_eventos = {
			type:'eventos',
			qs:{ql:'select * where ' + parte_da_data + '='+valor}
		}
		
		var eventos;

		client.createCollection(options_eventos, function (err, eventos) {
			Ext.Viewport.setMasked({
				xtype: 'loadmask',
				indicator: true,
				message: 'Carregando os eventos...'
			});			
			if (err) {
				alert("Erro ao buscar eventos no banco de dados.");
			} else {console.log(parte_da_data + ' = ' + valor);
				while(eventos.hasNextEntity()) {
					var evento = eventos.getNextEntity();
					console.log(evento.get('nome_evento'));
					var id = evento.get('id_praca');  
					PeerSquare.app.praca_markers[id].setOptions({fillColor:"8E00CB"});                
				}				                
			}
			Ext.Viewport.unmask(); 
		 });		
	},
	
	adicionarEventoApigee: function(evento){
		var eventos;
            var options = {
				type:'eventos'
            };
            
           client.createCollection(options, function (err, eventos) {
				if (err) {
					alert("Erro na conexao ao adicionar evento");                                                            
				} else {                                                     
					eventos.addEntity(evento, function (error, response) {
						if (error) {                                                                             
							alert("Erro na entidade ao adicionar evento.");
						} else { 
							alert("Evento adicionado com sucesso!");
						} 
                    });
                }                                            
           });
	},
	
	getDateElement: function (tipo, data){
		//Fazer
		bronken
	}	
});
