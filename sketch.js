/*
JS code is based off paper "Calculation of Visual and Circadian Response to Light Spectral Distribution" (Zhang, 2009)
with aim to estimate the effects of age and pupil size on the spectral distribution of light reaching the eye using 
several recent pupil size estimation models including the Rea and Ouellette modified De Groot Model and Berman's Model.  

-----INPUTS------
○ 400-700 UserSPD / comma delimited to JSlibrary
○ Illuminance Level (lux) / float
○ Age / int
○ Pupil Diameter (fixed pupil size mode) / float
-----OUTPUTS-----
○ Pupil Diameter (Berman Model) / float
○ Pupil Diameter (Rea Model) / float
○ Table Output: Wavelength, Radiation, Transmittance, Ratio to 20yr&2mm, Radiation at retina / dom table
○ Graph Human Lens Transmittance / chart.js
○ Graph SPD reaching the eye and retina / chart.js
*/
var userSpectrum; //= {400:2,410:2,420:2,430:2,440:2,450:3,460:2,470:4,480:44.0955,490:2,500:59.807,510:1,520:63.9805,530:21,540:260.4295,550:83.4465,560:1,570:124.674,580:121.221,590:221.04,600:301.424,610:2,620:148.5985,630:117.543,640:100.4425,650:92.1615,660:94.376,670:84.31,680:72.869,690:54.5005,700:43.578};
var photopicEfficacy = [0.271833952,0.830603742,2.745797495,7.962812736,15.7883356,26.0850762,41.18696243,62.45316403,95.43019194,142.7951987,221.7231477,345.284035,487.3790554,591.7193602,654.8727026,682.9828731,683.0171269,653.4998038,597.2109552,519.642176,433.1495549,345.284035,261.5372114,181.9090841,120.1286404,73.45008299,41.8734118,21.96637996,11.66963935,5.635749359,2.815815331];
var scotopicEfficacy = [15.67070882,58.76937515,162.9483823,337.0298839,553.4509755,767.5104964,956.4361571,1140.301309,1337.661151,1524.899975,1656.473203,1681.775747,1577.191899,1368.024204,1096.443566,811.3682391,554.6317609,350.1872067,204.4445542,110.4877748,55.91862188,26.87130156,12.43198321,5.625598913,2.525193875,1.141988145,0.527811064,0.249651766,0.120608792,0.059595925,0.030025685];
var userSpectrumText;
var exampleSpectrum1 = {400:2,410:2,420:2,430:2,440:2,450:3,460:2,470:4,480:44.0955,490:2,500:59.807,510:1,520:63.9805,530:21,540:260.4295,550:83.4465,560:1,570:124.674,580:121.221,590:221.04,600:301.424,610:2,620:148.5985,630:117.543,640:100.4425,650:92.1615,660:94.376,670:84.31,680:72.869,690:54.5005,700:43.578};
var exampleSpectrum2 = {400:2,410:2,420:2,430:2,440:2,450:3,460:2,470:4,480:44.0955,490:2,500:59.807,510:1,520:63.9805,530:21,540:260.4295,550:83.4465,560:1,570:124.674,580:121.221,590:221.04,600:301.424,610:2,620:148.5985,630:117.543,640:100.4425,650:92.1615,660:94.376,670:84.31,680:72.869,690:54.5005,700:43.578};
var exampleSpectrum3 = {400:2,410:2,420:2,430:2,440:2,450:3,460:2,470:4,480:44.0955,490:2,500:59.807,510:1,520:63.9805,530:21,540:260.4295,550:83.4465,560:1,570:124.674,580:121.221,590:221.04,600:301.424,610:2,620:148.5985,630:117.543,640:100.4425,650:92.1615,660:94.376,670:84.31,680:72.869,690:54.5005,700:43.578};

//wavelength,Vlamda,SPDxVlamda,PhotopicSPD,ScotopicSPD
var SPcalculations;
var illuminanceLevel = 10;
var luminance;
var ReaOuelletteModifiedDeGroot;
var BermanModel;
//3
var scotopicSum;
var photopicSum;
var spRatio;


function setup() {

}

function draw() {
 

}
function log10 (x) {
  return (log(x) / log(10));
}

function buttonClicked(){
	illuminanceLevel = document.getElementById("illuminanceLevel").value;
	var spectrumChoice = document.getElementById("spectrumChoice").value;
	if(spectrumChoice=="mySpectrum"){
		userSpectrumText = document.getElementById("userSPDEnter").value;

	userSpectrum = csvJSON(userSpectrumText);
		}
	else{
		userSpectrum = exampleSpectrum3;
	}
	SPcalculations = [
		[400,0.000396078,userSpectrum["400"]*0.000396078/1000*10,photopicEfficacy[0]*userSpectrum["400"]/1000,scotopicEfficacy[0]*userSpectrum["400"]/1000],
		[410,0.001210239,userSpectrum["410"]*0.001210239/1000*10,photopicEfficacy[1]*userSpectrum["410"]/1000,scotopicEfficacy[1]*userSpectrum["410"]/1000],
		[420,0.00400079,userSpectrum["420"]*0.00400079/1000*10,photopicEfficacy[2]*userSpectrum["420"]/1000,scotopicEfficacy[2]*userSpectrum["420"]/1000],
		[430,0.011602292,userSpectrum["430"]*0.011602292/1000*10,photopicEfficacy[3]*userSpectrum["430"]/1000,scotopicEfficacy[3]*userSpectrum["430"]/1000],
		[440,0.023004545,userSpectrum["440"]*0.023004545/1000*10,photopicEfficacy[4]*userSpectrum["440"]/1000,scotopicEfficacy[4]*userSpectrum["440"]/1000],
		[450,0.038007508,userSpectrum["450"]*0.038007508/1000*10,photopicEfficacy[5]*userSpectrum["450"]/1000,scotopicEfficacy[5]*userSpectrum["450"]/1000],
		[460,0.060011855,userSpectrum["460"]*0.060011855/1000*10,photopicEfficacy[6]*userSpectrum["460"]/1000,scotopicEfficacy[6]*userSpectrum["460"]/1000],
		[470,0.090997977,userSpectrum["470"]*0.090997977/1000*10,photopicEfficacy[7]*userSpectrum["470"]/1000,scotopicEfficacy[7]*userSpectrum["470"]/1000],
		[480,0.139047469,userSpectrum["480"]*0.139047469/1000*10,photopicEfficacy[8]*userSpectrum["480"]/1000,scotopicEfficacy[8]*userSpectrum["480"]/1000],
		[490,0.208061102,userSpectrum["490"]*0.208061102/1000*10,photopicEfficacy[9]*userSpectrum["490"]/1000,scotopicEfficacy[9]*userSpectrum["490"]/1000],
		[500,0.323063821,userSpectrum["500"]*0.323063821/1000*10,photopicEfficacy[10]*userSpectrum["500"]/1000,scotopicEfficacy[10]*userSpectrum["500"]/1000],
		[510,0.503099387,userSpectrum["510"]*0.503099387/1000*10,photopicEfficacy[11]*userSpectrum["510"]/1000,scotopicEfficacy[11]*userSpectrum["510"]/1000],
		[520,0.710140288,userSpectrum["520"]*0.710140288/1000*10,photopicEfficacy[12]*userSpectrum["520"]/1000,scotopicEfficacy[12]*userSpectrum["520"]/1000],
		[530,0.862170322,userSpectrum["530"]*0.862170322/1000*10,photopicEfficacy[13]*userSpectrum["530"]/1000,scotopicEfficacy[13]*userSpectrum["530"]/1000],
		[540,0.9541885,userSpectrum["540"]*0.9541885/1000*10,photopicEfficacy[14]*userSpectrum["540"]/1000,scotopicEfficacy[14]*userSpectrum["540"]/1000],
		[550,0.995146691,userSpectrum["550"]*0.995146691/1000*10,photopicEfficacy[15]*userSpectrum["550"]/1000,scotopicEfficacy[15]*userSpectrum["550"]/1000],
		[560,0.995196601,userSpectrum["560"]*0.995196601/1000*10,photopicEfficacy[16]*userSpectrum["560"]/1000,scotopicEfficacy[16]*userSpectrum["560"]/1000],
		[570,0.952188105,userSpectrum["570"]*0.952188105/1000*10,photopicEfficacy[17]*userSpectrum["570"]/1000,scotopicEfficacy[17]*userSpectrum["570"]/1000],
		[580,0.870171902,userSpectrum["580"]*0.870171902/1000*10,photopicEfficacy[18]*userSpectrum["580"]/1000,scotopicEfficacy[18]*userSpectrum["580"]/1000],
		[590,0.757149575,userSpectrum["590"]*0.757149575/1000*10,photopicEfficacy[19]*userSpectrum["590"]/1000,scotopicEfficacy[19]*userSpectrum["590"]/1000],
		[600,0.631124679,userSpectrum["600"]*0.631124679/1000*10,photopicEfficacy[20]*userSpectrum["600"]/1000,scotopicEfficacy[20]*userSpectrum["600"]/1000],
		[610,0.503099387,userSpectrum["610"]*0.503099387/1000*10,photopicEfficacy[21]*userSpectrum["610"]/1000,scotopicEfficacy[21]*userSpectrum["610"]/1000],
		[620,0.381075281,userSpectrum["620"]*0.381075281/1000*10,photopicEfficacy[22]*userSpectrum["620"]/1000,scotopicEfficacy[22]*userSpectrum["620"]/1000],
		[630,0.265052361,userSpectrum["630"]*0.265052361/1000*10,photopicEfficacy[23]*userSpectrum["630"]/1000,scotopicEfficacy[23]*userSpectrum["630"]/1000],
		[640,0.175034578,userSpectrum["640"]*0.175034578/1000*10,photopicEfficacy[24]*userSpectrum["640"]/1000,scotopicEfficacy[24]*userSpectrum["640"]/1000],
		[650,0.107021142,userSpectrum["650"]*0.107021142/1000*10,photopicEfficacy[25]*userSpectrum["650"]/1000,scotopicEfficacy[25]*userSpectrum["650"]/1000],
		[660,0.061012053,userSpectrum["660"]*0.061012053/1000*10,photopicEfficacy[26]*userSpectrum["660"]/1000,scotopicEfficacy[26]*userSpectrum["660"]/1000],
		[670,0.032006323,userSpectrum["670"]*0.032006323/1000*10,photopicEfficacy[27]*userSpectrum["670"]/1000,scotopicEfficacy[27]*userSpectrum["670"]/1000],
		[680,0.017003359,userSpectrum["680"]*0.017003359/1000*10,photopicEfficacy[28]*userSpectrum["680"]/1000,scotopicEfficacy[28]*userSpectrum["680"]/1000],
		[690,0.008211622,userSpectrum["690"]*0.008211622/1000*10,photopicEfficacy[29]*userSpectrum["690"]/1000,scotopicEfficacy[29]*userSpectrum["690"]/1000],
		[700,0.004102811,userSpectrum["700"]*0.004102811/1000*10,photopicEfficacy[30]*userSpectrum["700"]/1000,scotopicEfficacy[30]*userSpectrum["700"]/1000]
	];

	//3
	scotopicSum = 0;
	for (let i = 0; i < 31; i++) {
	  scotopicSum += SPcalculations[i][4];
	}
	photopicSum = 0;
	for (let i = 0; i < 31; i++) {
	  photopicSum += SPcalculations[i][3];
	}
	spRatio = scotopicSum/photopicSum;
		luminance = illuminanceLevel/PI;
	var logA =3.36-0.31*log(luminance*pow(spRatio,0.78)); 
	var A = exp(logA);
	BermanModel =sqrt(A/PI)*2;
	ReaOuelletteModifiedDeGroot = 4.77-2.44*tan(0.3*log10(luminance))
	document.getElementById("results").innerHTML = "Rea/Ouellette: "+round(ReaOuelletteModifiedDeGroot,2)+"\n"+"Berman Model: "+round(BermanModel,2);
}

function csvJSON(csv){
  var lines=csv.split("\n");
  var result = {};
  for(var i=0;i<lines.length;i++){
	var currentline=lines[i].split(",");
	result[currentline[0]] = parseFloat(currentline[1]);
  }
  return result;
}

function printClicked(){
	window.print();
}
