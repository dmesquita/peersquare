Ext.define('PeerSquare.controller.AddEvento', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
			addEventoView: 'addeventoview',
			
			btnEnviar: 'addEventoView button[action=enviar]',
			
			nome_evento = 'addEventoView textfield[name=nome_evento]',
			data: 'addEventoView datepickerfield[name=data]',			
			hora: 'addEventoView timepickerfield[name=hora]'
			            
        },
        
        control: {
			'btnEnviar': {
				tap: 'onEnviarBtnTap'
			}          
        }      
    },
    
    onEnviarBtnTap: function() {
		var evento = {
			dia: PeerSquare.utils.Functions.getDateElment("dia", data),
			mes: PeerSquare.utils.Functions.getDateElement("mes", data),
			ano: PeerSquare.utils.Functions.getDateElement("ano", data),
			id_praca: PeerSquare.controler.Main.id_praca_atual,
			nome_evento: nome_evento,
			hora: hora,
			tags:			
		}
		PeerSquare.utils.Functions.adicionarEventoApigee(evento);
	}

});
