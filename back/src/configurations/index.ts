export default () => ({
	port: parseInt(process.env.PORT, 10) || 4000,

	amocrm: {
		domain: process.env.DOMAIN,
		clientID: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		redirectURL: process.env.REDIRECT_URI,
		authorisationCode: process.env.AUTHORISATION_CODE,
	},

})