Ext.define('PeerSquare.utils.Functions', {
	singleton: true,
	
	requires: ['Ext.Ajax'],
	
	loadData: function() {
										
	},
		
	mostrarEventos: function(parte_da_data, valor){
		var client = new Apigee.Client({
			orgName:'dehmesquita', 
			appName:'peersquare' 
			}, function(err, data){
				if(!err){
					alert("Erro na autenticacao com o banco de dados");
				}
			}
		);
			
		var eventos = new Apigee.Collection( { "client":client, "type":"eventos","qs":{ql:'select * where ' + parte_da_data + '='+valor} } );
		
		Ext.Viewport.setMasked({
				xtype: 'loadmask',
				indicator: true,
				message: 'Carregando os eventos...'
		});
		
		eventos.fetch(
			function(){
				while ( eventos.hasNextEntity() ) {
					var evento_atual = eventos.getNextEntity();
					console.log(evento_atual.get('nome_evento'));
					var id = evento_atual.get('id_praca');  
					PeerSquare.app.praca_markers[id].setOptions({fillColor:"8E00CB"});                
                }			
			},
			
			function(){
				alert("Erro ao buscar eventos no banco de dados.");
			}		
		);
		
		Ext.Viewport.unmask(); 		
	},
	
	adicionarEventoApigee: function(new_evento){
		var client = new Apigee.Client({
			orgName:'dehmesquita', 
			appName:'peersquare' 
			}, function(err, data){
				if(!err){
					alert("Erro na autenticacao com o banco de dados");
				}
			}
		);
		
		var eventos = new Apigee.Collection( { "client":client, "type":"eventos"});
		
		eventos.addEntity(new_evento, function (error, response) {
                    if (error) {
                        alert("Erro na conexao ao adicionar evento"); 
                    } else {
                        alert("Evento adicionado com sucesso!");
                    }
        });
          
	},
	
	getDateElement: function (tipo, data){
		//Fazer
		bronken
	}	
});
