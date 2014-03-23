Ext.define('PeerSquare.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
			mainView: 'main',
			addEventoView: 'addeventoview',
			
			btnBack: 'main button[action=back]',
			btnEnviar: 'addeventoview button[action=enviar]',
			btnOpcoes: 'main button[action=opcoes]'
            
        },
        control: {
			'btnOpcoes': {
				tap: 'onOpcoesBtnTap'
			},
			'btnBack': {
				tap: 'onBackBtnTap'
			}           
        }      
    },
    
    onOpcoesBtnTap: function() {
		this.getMainView().animateActiveItem(1, {type: 'slide', direction: 'left'})	
		this.getBtnOpcoes().hide();
		this.getBtnBack().show();	
	},
	
	onBackBtnTap: function() {
		this.getMainView().animateActiveItem(0, {type: 'slide', direction: 'right'})	
		this.getBtnOpcoes().show();
		this.getBtnBack().hide();
	},
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {
		this.getMainView().setActiveItem(0);	
        //PeerSquare.utils.Functions.loadData();
    }
});
