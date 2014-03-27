Ext.define('PeerSquare.controller.Main', {
    extend: 'Ext.app.Controller',
    
    requires: [
		'Ext.Ajax',
		'Ext.MessageBox'
    ],
    
    id_praca_atual: '',
    nome_praca_atual: '',
    
    config: {
        refs: {
			mainView: 'main',			
			
			btnBack: 'main button[action=back]',			
			btnOpcoes: 'main button[action=opcoes]',
			
			myMap: 'map'
            
        },
        control: {
			'btnOpcoes': {
				tap: 'onOpcoesBtnTap'
			},
			'btnBack': {
				tap: 'onBackBtnTap'
			},
			'map': {
				maprender: 'renderTheMap'
			}           
        }      
    },
    
    onOpcoesBtnTap: function() {
		this.getMainView().animateActiveItem(1, {type: 'slide', direction: 'left'})	
		this.getBtnOpcoes().hide();
		this.getBtnBack().show();	
		console.log(PeerSquare.app.praca_markers[47].setOptions({fillColor:"FFFFFF"}));
	},
	
	onBackBtnTap: function() {
		this.getMainView().animateActiveItem(0, {type: 'slide', direction: 'right'})	
		this.getBtnOpcoes().show();
		this.getBtnBack().hide();
	},
	
	//Carregar e mostrar as coordenadas do mapa
	renderTheMap: function(component, googleMap, eOpts){ 
		Ext.Viewport.setMasked({
			xtype: 'loadmask',
			indicator: true,
			message: 'Carregando os marcadores das pra&ccedil;as ...'
		});		
		Ext.Ajax.request({
				url: 'resources/json/parquespracas.geojson',
										   
				success: function(response) {
					var pracas = Ext.decode(response.responseText);
					for(var i in pracas){
						for (var j in pracas.features){                                                     
							var pracaCoordsGoogleMaps = [];
							var coordenadas_praca = pracas.features[j].geometry.coordinates[0];    
							for(var i = 0; i < coordenadas_praca.length; i++){                  
								pracaCoordsGoogleMaps.push(new google.maps.LatLng(coordenadas_praca[i][1], coordenadas_praca[i][0]));
							};
							var id = pracas.features[j].id;
							var nome = pracas.features[j].properties.NMNOME;                                                               
							/**
								Vendo se a praca tem eventos
							**/ 
							var cor_poligono = '#374140';   
							/**                                                                
							if (pracas_com_eventos.indexOf(" "+id+",") != -1){
								cor_poligono = '#8E00CB';
							}
							*/
							praca = new google.maps.Polygon({
								paths: pracaCoordsGoogleMaps,
								strokeColor: cor_poligono,
								strokeOpacity: 0.8,
								strokeWeight: 2,
								fillColor: cor_poligono,
								fillOpacity: 0.35
							});
							mostrarId(praca, id, nome);                       
							PeerSquare.app.praca_markers[id] = (praca);																
							praca.setMap(googleMap);    
						};                                                  
					};  
					
					/* Neste ponto os marcadores ja estao no mapa, agora muda a cor dos que tem eventos */
						//Janeiro eh 0
						PeerSquare.utils.Functions.mostrarEventos("mes", new Date().getUTCMonth()+1);
					
				function mostrarId (praca, id, nome) {
						google.maps.event.addListener(praca, 'click', function() {
						var options = {
							type:'eventos',
							qs:{ql:'select * where id_praca = '+id}
						}
						
						/* Como o usuario clicou no marcador da praca, dizer pro resto do app que tudo que acontecer vai ser com esta praca */
							id_praca_atual = id;
							nome_praca_atual = nome;
							
						var eventos; 
						Ext.getCmp("titulo_praca").setTitle("<div class='title_praca'>"+nome_praca_global+"</div>");
						//console.log(nome);
						client.createCollection(options, function (err, eventos) {
							if (err) {
								//console.log("Couldn't get the list of books.");
							} else {
								var records = store.getRange();
								store.remove(records);
								if(! (eventos.hasNextEntity())){
									//console.log("aiai");
									store.add([{ evento: "Nenhum evento adicionado a essa praca",   hora: '',  date: ''   }]);
								};
								eventos.resetEntityPointer();
								//console.log(id);
								while(eventos.hasNextEntity()) {
									var evento = eventos.getNextEntity();
									//console.log("eita "+evento.get('evento'));
									//console.log( Sencha.setActiveItem(1));                                                                
									store.add([{ evento: evento.get('evento'),   hora: evento.get('hora'),  date: evento.get('data')   }]);
								} 
								/*
									Lista eh 1
									Formulario eh 2
								*/
								Ext.getCmp("cont").animateActiveItem(1, {type: 'slide', direction: 'left'});
								//Ext.getCmp("cont").setActiveItem(3);
								Ext.getCmp("voltar").show();
								Ext.getCmp("settings").hide();
								Ext.getCmp("add").show();  
							}
						});
					});
				};                          
			},
			failure: function() {
				alert("Erro ao carregar as pracas");                
            }
      }); 
      Ext.Viewport.unmask();
	},
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {
		this.getMainView().setActiveItem(0);			
        PeerSquare.utils.Functions.loadData();        
    }
});
