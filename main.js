song = "";

BTS_Dimple = "";
Clarity_by_Zedd = "";

rightWrist_x = 0;
rightWrist_y = 0;

leftWrist_x = 0;
leftWrist_y = 0;

scoreleftWrist = 0;
scorerightWrist = 0;

song_Dimple = "";
song_Clarity = "";

function setup()
{
    canvas = createCanvas(600,530);
    canvas.position(450, 250);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload()
{
    BTS_Dimple = loadSound("BTS-Dimple.mp3");
    Clarity_by_Zedd = loadSound("Clarity-feat-Foxes-Zedd.mp3");
}

function draw()
{
    image(video,0,0,600,530);

    song_Dimple  = BTS_Dimple.isPlaying();
    console.log(song_Dimple);

    song_Clarity = Clarity_by_Zedd.isPlaying();
    console.log(song_Clarity);

    if(scoreleftWrist > 0.2)
    {
        circle(leftWrist_x,leftWrist_y,20);
        fill("#ff99cc");
	    stroke("#000000");

        Clarity_by_Zedd.stop();

        if(song_Dimple == false)
        {
            BTS_Dimple.play();
        }
        else
        {
            console.log("Song Name: BTS Dimple");
            document.getElementById("song_id").innerHTML = "Song Name: BTS Dimple";
        }
    }

    if(scorerightWrist > 0.2)
    {
        circle(rightWrist_x,rightWrist_y,20);
        fill("#80dfff");
	    stroke("#000000");

        BTS_Dimple.stop();

        if(song_Clarity == false)
        {
            Clarity_by_Zedd.play();
        }
        else
        {
            console.log("Song Name: Clarity by Zedd");
            document.getElementById("song_id").innerHTML = "Song Name: Clarity by Zedd";
        }
    }
}

function modelLoaded()
{
    console.log("poseNet Is Initialized");
}

function gotposes(results)
{
    if(results.length > 0)
    {
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("leftWrist_Score" + scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("rightWrist_Score" + scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}

function Stop()
{
    song.stop();
}


function Stop()
{
    song.stop();
}

/*function Stop()
{
    song.stop();
}*/