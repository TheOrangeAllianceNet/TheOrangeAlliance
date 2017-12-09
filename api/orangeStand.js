//orangeStand by Michael Leonffu
var MongoClient = require('mongodb').MongoClient
var configDB = require('./../config/database.js')
ObjectId = require('mongodb').ObjectID

//This handles putting the data into the database to present onto the website; all this really does is a mongodb insert or update.

var rankingsJuice = function(pickedOranges, calculatedJuice, rankingsJuice){
	// rankingsJuice requires all the information that goes into the rankings tab in the UI:
	// 	Team number, team name (not from any spesififc picker or peeler)
	//	This is ranking information form the ranking picker and peeler ->
	// 		Rank,
	// 		record T-W-L,
	// 		Qp, Rp,
	//	This would be from the averages picker and peeler ->
	// 		OPR, CCWM, OPR, OPR, OPR
	// Both combine into making the rankings tab; rankings Juice.

	//rankings should be in the form of:
	// ranking:[
	// 	{
	// 		rank: 123,
	// 		teamNumber: 123,
	// 		teamName: 123,
	// 		record:{
	// 			wins: 123,
	// 			losses: 123,
	// 			ties: 123
	// 		},
	// 		qualifyingPoints: 123,
	// 		rankingPoints: 123,
	// 		averageScore: .123,
	// 		averageMarginalScore: .123,
	// 		average:{
	// 			auto: .123,
	// 			driver: .123,
	// 			end: .123
	// 		}
	// 	}
	// ]

	// form of average picker peeler is in 
	// {
	// 	juice: {
	// 		'123' : .123
	// 	},
	// 	error: .123
	// }

	// form of rankings picker peeler is in
	// {
	// 	rankings: [
	// 		{
	// 			teamName: 'abc',
	// 			teamNumber: 123,
	// 			record: {
	// 				wins: 123,
	// 				lossess: 123,
	// 				ties: 123
	// 			},
	// 			qualifyingPoints: 123,
	// 			rankingPoints: 123,
	// 			rank: 123
	// 		}
	// 	]
	// }

	MongoClient.connect(configDB.url, function(err,db){
		if(err){
			console.log(err)
			return
		}
		db.collection('eventOut').update(
			{},
			{},
			function(err, result){
				if(err){
					rankingsJuice('Failure')
					console.log(err)
					return
				}else{
					rankingsJuice('Sucess')
					console.log(result)
					//add some logic here
				}
			}
		)
	})
}


module.exports = {
	rankingsJuice: rankingsJuice
}

// To use in another file:
// var orangeStand = require('./orangeStand')
// orangeStand.rankingsJuice(pickedOranges, STUFf)
// Where STUFf is the callback function returning a json