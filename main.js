song ="";
song1=""
leftWristX = 0;
leftWristY= 0;
rightWristX =0;
rightWristY =0;
scoreLeftWrist =0;
song_status = "";
song1_status ="";
function preload()
{
    song = loadSound("music.mp3");
    song1= loadsound("music2.mp3");
}

function setup()

{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = "+scoreLeftWrist);
        console.log("scoreRightWrist = "+scoreRightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log(" leftWristX = "+leftWristX +" , leftWristY = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX ="+rightWristX+" , rightWristY = "+rightWristY);
        
    }
}

function modelLoaded()
{
    console.log('posenet is innitilized');
}

function draw()
{
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("#FF0000");

    song_status = song.isPlaying();
    song1_status = song1.isPlaying();
                                                    
    if(scoreLeftWrist>0.2){
    circle(leftWristX,leftWristY,20);
    song1.stop();

    if(song_status == false)
    {
        song.play();
        document.getElementById("play").innerHTML ="playing  Harry poter theme song ";
    
    }
                        
    }
    if(scoreRightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        song.stop();
    
        if(song1_status == false)
        {
            song1.play();
            document.getElementById("play").innerHTML ="playing  game of thorns ";
        
        }
                            
        }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}