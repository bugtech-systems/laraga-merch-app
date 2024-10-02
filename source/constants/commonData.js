import icons from "./icons";


export const commonData = {
	apiUrl: 'https://sharewin.pro',
	// apiUrl: 'http://localhost:5120'
	// apiUrl: 'https://bugtech.online',
	apkUrl: 'https://sharewin.pro/apiv2/static',
	appVersion: '1.0.4',
	dashboard_cards: [
		{
			id: 0, 
			name: "CASH",
			topRight: icons.clock,
			sales: 1000,
			disbursed: 1000,
			AR: 3000,
			onHand: 3000
		},
		{
			id: 1, 
			name: "SALES",
			topRight: '',
		},
		{
			id: 2, 
			name: "INVENTORY",
			topRight: icons.clock,
		},
		{
			id: 3, 
			name: "PURCHASES",
			topRight: icons.clock,
		},
	]
        
}