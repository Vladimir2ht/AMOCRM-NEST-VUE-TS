export default () => ({
	port: parseInt(process.env.PORT, 10) || 4000,

	amocrm: {
		domain: process.env.DOMAIN,
		clientID: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		redirectURL: process.env.REDIRECT_URI,
		authorisationCode: process.env.AUTHORISATION_CODE,
	},

	db: {
		type: process.env.DB_TYPE,
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT, 10) || 5432,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		synchronize: Boolean(process.env.DB_SYNCHRONIZE),
		entities: ['./dist/db.models/*.entity.ts'],
	},

})