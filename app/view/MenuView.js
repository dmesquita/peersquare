Ext.define('PeerSquare.view.MenuView', {
	extend: 'Ext.form.Panel',
	xtype: 'menuview',
	requires: [
		'Ext.Menu'
	],
	
	config: {
		items: [
			{
				xtype: 'menu',
				items: [
						{	
							text: 'Mostrar eventos de hoje',
							ui: 'action',
							action: 'mostrar-eventos-de-hoje'                      
						},
						{	
							text: 'Filtrar por data',
							ui: 'action',
							action: 'filtrar-por-data'                      
						},
						{
							text: 'Filtrar por tag',
							ui: 'action'                
						},
						{
							text: 'Sobre',
							ui: 'action'                     
						}
					] 
				}
			]
		}
});
			
