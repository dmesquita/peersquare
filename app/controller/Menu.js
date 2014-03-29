Ext.define('PeerSquare.controller.Menu', {
    extend: 'Ext.app.Controller',
    
    requires: [
		
    ],
    
    id_praca_atual: '',
    nome_praca_atual: '',
    
    config: {
        refs: {
			menuView: 'menuview',			
			
			btnEventosHoje: 'menuview button[action=mostrar-eventos-de-hoje]',			
			btnOpcoes: 'main button[action=opcoes]',
			
			myMap: 'map'
            
        },
        control: {
			'btnEventosHoje': {
				tap: 'onEventosHojeBtnTap'
			},
			'btnBack': {
				tap: 'onBackBtnTap'
			},
			'map': {
				maprender: 'renderTheMap'
			}           
        }      
    },
    
    onEventosHojeBtnTap: function() {
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
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {
		this.getMainView().setActiveItem(0);			
        PeerSquare.utils.Functions.loadData();        
    }
});
