=IF(x,x,IF(AND($J$38>=2,$J$38<4),L5+(M5-L5)/2*($J$38-2),IF(AND($J$38>=4,$J$38<6),M5+(N5-M5)/2*($J$38-4),IF(AND($J$38>=6,$J$38<8),N5+(O5-N5)/2*($J$38-6),O5))))

if pupilSize is between 0 and 2, 




var transmittancePer = [];
if(pupilSize>=0&&pupilSize<2){
	for(i=0;i<interpolation0.length;i++){
		transmittancePer.push(interpolation0[i]+(interpolation2[i]-interpolation0[i])/2*(pupilSize-0));
	}
}
else if(pupilSize>=2&&pupilSize<4){
	for(i=0;i<interpolation0.length;i++){
		transmittancePer.push(interpolation2[i]+(interpolation4[i]-interpolation2[i])/2*(pupilSize-0));
	}
}
else if(pupilSize>=4&&pupilSize<6){
	for(i=0;i<interpolation0.length;i++){
		transmittancePer.push(interpolation4[i]+(interpolation6[i]-interpolation4[i])/2*(pupilSize-0));
	}
}
else if(pupilSize>=6&&pupilSize<8){
	for(i=0;i<interpolation0.length;i++){
		transmittancePer.push(interpolation6[i]+(interpolation8[i]-interpolation6[i])/2*(pupilSize-0));
	}
}
else if(pupilSize>=8){
	for(i=0;i<interpolation0.length;i++){
		transmittancePer.push(interpolation8[i]);
	}

}
