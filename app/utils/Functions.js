Ext.define('PeerSquare.utils.Functions', {
	singleton: true,
	
	requires: ['Ext.Ajax'],
	
	config: {stores: ['PeerSquare.store.RuntimeVariables', 'PeerSquare.store.Eventos']},
	
	loadData: function() {
										
	},
		
	mostrarEventos: function(parte_da_data, valor){
		Ext.Viewport.setMasked({
				xtype: 'loadmask',
				indicator: true,
				message: 'Carregando os eventos...'
		});
		
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
		
		
		
		eventos.fetch(
			function(){
				var storeVariables = Ext.getStore('RuntimeVariables');
				var praca_markers = storeVariables.getAt(0).get('praca_markers');
				var storeEventos = Ext.getStore('Eventos');
				storeEventos.removeAll();
				storeEventos.sync();
				var data = "";
				
				while ( eventos.hasNextEntity() ) {
					var evento_atual = eventos.getNextEntity();
					data = evento_atual.get("dia")+"/"+evento_atual.get("mes")+"/"+evento_atual.get("ano");
					storeEventos.add([{ nome_evento: evento_atual.get('nome_evento'),   hora: evento_atual.get('hora'),  data: data, id_praca: evento_atual.get("id_praca")   }]);
					var id = evento_atual.get('id_praca');  
					praca_markers[id].setOptions({fillColor:"#8E00CB"});                
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
	},
	
	limparCorDosEventos: function (qtdPracas){		
		var store = Ext.getStore('RuntimeVariables');
		var praca_markers = store.getAt(0).get('praca_markers');	
		
		for (var id = 0; id < qtdPracas + 1; id++){
			praca_markers[id].setOptions({fillColor:"#374140"});  			
		}				
	}
		
});
