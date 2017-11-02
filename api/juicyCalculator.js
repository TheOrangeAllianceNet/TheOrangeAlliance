//juicyCalculator by Michael Leonffu
var math = require('mathjs')

function juicyCalculator(orange){
	//Determines the values of jello
	//orange should be in the form of:
	// orange: {
	// 	labels:['123','123',...],	labels numbers in same order as matches
	// 	juice:[						this is the collum(row index), index 0 is match 1...
	// 		[1,0,0,1,0,1,0,...]...	this is the row(row contents), is 1 if the team played in match, 0 if the team does not play
	// 	],							should have as many rows as matches and collumns as teams to make a RECTANGLUAR matrix
	// 	result:[					this should be a (amount of matches) x 1 size matrix
	// 		[123]					this is the combined score of the teams that played in that match
	// 	]
	// }

	//Times how long it takes to juice the juicy oranges
	juicyTimer = new Date()

	//Creates a Matrix for each 2D array
	rawOrangeMatrixJuice = math.matrix(orange.juice)
	rawOrangeMatrixResult = math.matrix(orange.result)
	//Consider rawOrangeMatrixJuice as the matrix:

	//			[1A 1B 0C]
	//			[1A 0B 1C]
	//			[1A 1B 0C]
	//			[0A 1B 1C]
	//	A 4x3 Matrix; Let the matrix be called N

	//			[21]
	//			[30]
	//			[ 9]
	//			[16]
	//	A 4x1 Matrix; Let the matrix be called P

	//They represent 4 equations:
	//	1A+1B+0C = 21
	//	1A+0B+1C = 30
	//	1A+1B+0C = 9
	//	0A+1B+1C = 16
	//Such that our matrix equation is N = P
	//Now lets introduce matrix X (unknowns):

	//			[A]
	//			[B]
	//			[C]
	//	A 3x1 Matrix; Let the matrix be called X

	//Now N = MX
	//Thus the matrix equation results as MX = P

	//Transpose the rawOrangeMatrixJuice and miltiply it to both sides (since it's an equation)
	//Consider the equation where M is a non-square matrix, X is the unknown matrix, and P is the product:
	//MX = P; where Mt is the transposed matrix of M; MtMx = MtP
	//MtM makes M a square matrix nessasary to inverse it
	orangeMatrixContent = math.multiply(math.transpose(rawOrangeMatrixJuice), rawOrangeMatrixJuice)
	orangeMatrixResult = math.multiply(math.transpose(rawOrangeMatrixJuice), rawOrangeMatrixResult)
	//This is MtMX = MtP:
	//					[1 1 0]									[21]
	//	[1 1 1 0]		[1 0 1]		[A]			[1 1 1 0]		[30]
	//	[1 0 1 1]	*	[1 1 0]	  *	[B]		=	[1 0 1 1]	*	[ 9]
	//	[0 1 0 1]		[0 1 1]		[C]			[0 1 0 1]		[16]
	//		Mt				M		 X				Mt			 P

	//This can be simplifyed to:
	//
	//	[3 2 1]		[A]			[60]		[21+30+ 9+  ]
	//	[2 3 1]	 *	[B]	   =	[46]	=	[21+  + 9+16]
	//	[1 1 2]		[C]			[46]		[  +30+  +16]
	//	 MtM		 X			MtP				MtP
	//Notice the resemblace between Mt (in the last example) and MtP (in this exmaple)

	//So what does this look like in algebra? Recall the 4 equations we started with:
	//	1A+1B+0C = 21
	//	1A+0B+1C = 30
	//	1A+1B+0C = 9
	//	0A+1B+1C = 16

	//What we have now is in the form:
	//Where A is pressent: 3A+2B+1C = 21+30+ 9+   = 60
	//Where B is pressent: 2A+3B+1C = 21+  + 9+16 = 46
	//Where C is pressent: 1A+1B+2C =   +30+  +16 = 46
	
	//Basically you're commbining all equations with A to solve for A; B for B and C for C
	//Notice the similaritys between the co-effeticents of the last example with the MtM matrix (two examples ago)
	//This means that if you do MtMX then you'll get the combined algebratic equations showen above

	//This is as the form: (MtM)-1MtMX=(MtM)-1MtP; Where 1/n = (n)-1
	//The result is X = (MtM)-1MtP; this is the 'solution'
	orangeMatrix = math.multiply(math.inv(orangeMatrixContent),orangeMatrixResult)

	//This next part isn't that important... It'll be finding the amount error, least squares.
	//Least squres is when you get the error^2 and add them all togeter.

	//Example, in context of privous examples:
	//A+B  =21
	//A+  C=30
	//A+B  = 9
	//  B+C=16

	//Finding error is just the result + error: A+B  =21+error
	//Then squreing all the errors and adding them together
	//We've solved for X in X = (MtM)-1MtP; where 1/n is (n)-1
	//If we subsitute X back in we get:
	//14.5+00.5     =21+error; error=-6
	//14.5+     15.5=30+error; error= 0
	//14.5+00.5     = 9+error; error= 6
	//     00.5+15.5=16+error; error= 0

	//(-6)^2 + ( 0)^2 + ( 6)^2 + ( 0)^2 = 72 (error)

	//So how to do this in Matrix?
	//MX-P=E; Where E is a nx1 matrix which contains all the errors
	incompleteErrorMatrix = math.multiply(rawOrangeMatrixJuice,orangeMatrix)
	errorMatrix = math.subtract(incompleteErrorMatrix,rawOrangeMatrixResult)
	//E^2=C; where C is the calculated sum of the error squred matrix stuff (72)
	error = math.sum(math.square(errorMatrix))

	//Converts the Matrix to a 2D array
	orangeArray = math.round(orangeMatrix,3).valueOf()
	juicyData = {juice:{}}
	if(orange.labels){
		for (var i = 0; orangeArray.length > i; i++) {
			juicyData.juice[orange.labels[i]] = orangeArray[i][0]
		}
	}else{
		juicyData = {juice:orangeArray}
	}
	juicyData.error = error

	console.log('Operation juicyCalculator time(Milliseconds):',new Date(new Date()-juicyTimer).getMilliseconds())

	console.log(juicyData)

	return juicyData
}

sampleOrange = {
	labels: ['TeamA','TeamB','TeamC'],
	juice:[
		[1,1,0],
		[0,1,1],
		[1,0,1],
		[1,1,0]
	],
	result:[
		[16],
		[21],
		[19],
		[16]
	]
}

sampleOrange2 = {
	labels: ['TeamA','TeamB','TeamC'],
	juice:[
		[1,1,0],
		[1,0,1],
		[1,1,0],
		[0,1,1]
	],
	result:[
		[21],
		[30],
		[9],
		[16]
	]
}

//juicyCalculator(orange2)

module.exports = juicyCalculator
// To use in another file:
// var juicyCalculator = require('./juicyCalculator')
// calculatedJuice = juicyCalculator(orange)