const Clarifai=require('clarifai') ;

const app = new Clarifai.App({
 apiKey: '0a5dd799261f485aae7bcf2888a0e79d'
});
const handleapi=(req,res)=>{
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data=>{
		res.json(data)
	}).catch(err=>res.status(400).json('unable to work with  api'))
}



const handleimage=(req,res,db)=>{
	const {id}=req.body;
	db('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0])

	})
	.catch(err=>res.status(400).json('unable to get entries'))
}
module.exports={
	handleimage:handleimage,
	handleapi:handleapi
};