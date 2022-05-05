var prediction1 = "";
var prediction2 = "";
Webcam.set({
    width : 350,
    height:300,
    image_format:"png",
    png_quality:90
});
camera = document.getElementById("camera");
Webcam.attach("#camera");
function takeSnapshot(){
Webcam.snap(function(data_URI){
document.getElementById("result").innerHTML = "<img id = 'captured_image' src = '"+data_URI+"'>";
});}
console.log("ml5 version:", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/4xx_H506j/model.json",modelLoaded);
function modelLoaded(){
    console.log("model loaded.");
}
function speak()
{
var synth = window.speechSynthesis;
speakData1 = "the first prediction is"+prediction1;
speakData2 = "and the second prediction is"+prediction2;
var utterThis = new SpeechSynthesisUtterance(speakData1+speakData2);
synth.speak(utterThis);

}
function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
    
}
function gotResult(error, results){
if(error){
    window.error(error);
}
else{
    console.log(results);
    prediction1 = results[0].label;
    prediction2=  results[1].label;
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    document.getElementById("result_emotion_name2").innerHTML = results[1].label;
    
    speak();
    if (results[0].label == "happy"){
        document.getElementById("update_emoji").innerHTML = "&#128522;";
            }
            if (results[0].label == "angry"){
                document.getElementById("update_emoji").innerHTML = "&#128548;";
                    } 
            if (results[0].label == "sad"){
                        document.getElementById("update_emoji").innerHTML = "&#128532;";


                            }
                            if (results[1].label == "happy"){
                                document.getElementById("update_emoji2").innerHTML = "&#128522;";
                                    }
                                    if (results[1].label == "angry"){
                                        document.getElementById("update_emoji2").innerHTML = "&#128548;";
                                            } 
                                    if (results[1].label == "sad"){
                                                document.getElementById("update_emoji2").innerHTML = "&#128532;";
                                                    }
}
}
