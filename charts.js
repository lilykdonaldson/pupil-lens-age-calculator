var exampleSpectrum1 = {400:2,410:2,420:2,430:2,440:2,450:3,460:2,470:4,480:44.0955,490:2,500:59.807,510:1,520:63.9805,530:21,540:260.4295,550:83.4465,560:1,570:124.674,580:121.221,590:221.04,600:301.424,610:2,620:148.5985,630:117.543,640:100.4425,650:92.1615,660:94.376,670:84.31,680:72.869,690:54.5005,700:43.578};
var exampleSpectrum2 = {400:1,410:1,420:1,430:1,440:1,450:2,460:1,470:0,480:35,490:1,500:35.807,510:1,520:35.9805,530:12,540:170.4295,550:76.4465,560:1,570:100.674,580:100.221,590:150.04,600:260.424,610:1,620:130.5985,630:100.543,640:90.4425,650:80.1615,660:80.376,670:70.31,680:60.869,690:40.5005,700:20.578};
var wavelengthSpectrum = Object.keys(exampleSpectrum1);
var valuesSpectrum = Object.values(exampleSpectrum1);
var wavelengthSpectrum2 = Object.keys(exampleSpectrum2);
var valuesSpectrum2 = Object.values(exampleSpectrum2);
console.log(valuesSpectrum);
var ctx = document.getElementById('spectrumChart').getContext('2d');
var spectrumChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: wavelengthSpectrum,
    datasets: [{
      fill: false,
      label: 'SPD Reaching the Eye',
      data: valuesSpectrum,
      borderColor: "rgba(133, 180, 255,1)"
    }, 
    {
      fill: false,
      label: 'SPD Reaching the Retina',
      data: valuesSpectrum2,
      borderColor: "rgba(20, 163, 55,1)"
    }
    ]
  }
});
var lensSpec = [400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,630,640,650,660,670,680,690,700];
var lensValues = [0.125892541,0.221060154,0.316227766,0.420517613,0.52480746,0.543574393,0.562341325,0.58,0.594506597,0.604078303,0.62,0.621828875,0.630007741,0.637722327,0.644972633,0.65,0.658080405,0.663937871,0.669331057,0.674259963,0.68,0.682724935,0.686261001,0.689332787,0.691940293,0.694083519,0.695762465,0.696977131,0.697727517,0.698013623,0.7];
var ctx2 = document.getElementById('humanLensChart').getContext('2d');
var humanLensChart = new Chart(ctx2, {
  type: 'line',
  data: {
    labels: lensSpec,
    datasets: [{
      fill: false,
      label: 'Human Lens Transmittance',
      data: lensValues,
      borderColor: "rgba(252, 186, 3,1)"
    }
    ]
  }
});