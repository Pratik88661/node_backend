const config = {};
config.PROJECTNAME="node_demo"
config.ISSUER=process.env.ISSUER
config.RECORDS_PER_PAGE_LIMIT = 10
config.GOOGLECLIENTID = process.env.GOOGLECLIENTID

module.exports=config;