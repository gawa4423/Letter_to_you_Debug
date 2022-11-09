
//黒マス
let boxArray=[];
//得点
let point=0;
//現在のステータス
let riddleSet=0;
let drawPhase=7;
const Q_max=6;
let setting = true;

//座標関連
let startX=309,startY=36;
let gap=663/5;
let zoom=0.6;

//入力保存
let keyBuffer=0;

//画像
let imageList=[];
const riddleSetMax = 2; //要素数

//GUI
let buttonList=[];

function preload(){
    imageList=[];
    for(let i=0;i<riddleSetMax;i++){
        let tmp=[];
        for(let j=0;j<=Q_max;j++){
                let image = loadImage("img/"+i+"/"+"スライド"+j+".png");
                tmp.push(image);
        }
        imageList.push(tmp);
    }
    console.log(imageList);
}
function goodLoadimage(){
    console.log("good");
}
function badLoadimage(e){
    console.log(e);
}

function setup() {
    //キャンバス作成
    windowSet();

    //box初期化
    clearBox();

    //初期設定
    fill(0);
    stroke(0);
    strokeWeight(1);
    textAlign(CENTER,CENTER);
    imageMode(CORNER);

    //button作成
    for(let i=0;i<riddleSetMax;i++){
        console.log(i);
        let button = createButton(data["set"+i]["name"]);
        button.mousePressed(()=>onClickButton(i));
        let w = 3;
        let row = (int)(i/w);
        let col = (int)(i%w); 
        button.position(startX+gap*col*2, startY+gap*row*2);
        // ボタンサイズを変更
        button.style("width", "100px");
        button.style("height", "50px");
        // 角をまるく
        button.style("border-radius", "5px");
        buttonList.push(button);
    }
    
    

}
  
function draw() {
    background(255);
    if(setting){
        text("問題セットを選択",startX+gap*2.5,startY-gap);
        return;
    }
    push();

        translate(startX,startY);
        //問題描画
        iamgeDraw(riddleSet,drawPhase);

        //黒四角描画
        boxDraw(drawPhase);

    pop();

}
function onClickButton(num){
    riddleSet = num;
    for(button of buttonList){
        button.hide();
    }
    setting=false;
}

//クリック時
function  mouseClicked(){
    let x=mouseX;
    let y=mouseY;
    if(startX<x && x<(startX+gap*5) && startY<y && y< (startY+gap*5) ){
        let row = Math.floor((x-startX)/gap);
        let col = Math.floor((y-startY)/gap);
        boxArray[row][col] = !boxArray[row][col];
    }
    //得点更新
    point=pointUpdate();

}

//キーボードを押した時
function keyTyped(){
    if(key === "1" && keyBuffer==="1"){
        drawPhase=1;
        clearBox();
    }else if(key === "2"&& keyBuffer==="2"){
        drawPhase=2;
        clearBox();
    }else if(key === "3"&& keyBuffer==="3"){
        drawPhase=3;
        clearBox();
    }else if(key === "4"&& keyBuffer==="4"){
        drawPhase=4;
        clearBox();
    }else if(key === "5"&& keyBuffer==="5"){
        drawPhase=5;
        clearBox();
    }else if(key === "6"&& keyBuffer==="6"){
        drawPhase=6;
        clearBox();
    }else if(key === " "&& keyBuffer===" "){
            //let fs = fullscreen();
            fullscreen(true);
            drawPhase=0;
            clearBox();
    }else if(key === "0"&& keyBuffer==="0"){
        drawPhase=7;
        clearBox();
    }
    //得点更新
    point=pointUpdate();

    keyBuffer=key;
}

//問題画像描画
function iamgeDraw(set,num){
    boxDraw(num);

    //画像描画
    try{

        if(num<=Q_max){
            let img = imageList[set][num];
            rect(-gap*0.02,-gap*0.02,gap*5.04,gap*5.04);
            image(img,0,0,gap*5,gap*5);
        }
        textSize();

    }catch(e){
        console.log(e);
    }

    //問題名描画
        if(num===7){
            text("このままお待ちください",gap*2.5,gap*2.5)
        }else if(num===1){
            text("A",-gap*0.5,-gap*0.5)    
        }else if(num===2){
            text("B",-gap*0.5,-gap*0.5)
        }else if(num===3){
            text("C",-gap*0.5,-gap*0.5)
        }else if(num===4){
            text("D",-gap*0.5,-gap*0.5)
        }else if(num===5){
            text("E",-gap*0.5,-gap*0.5);
        }else if(num===6){
            text("F",-gap*0.5,-gap*0.5);
        }else if(num===0){
            text("例",-gap*0.5,-gap*0.5)
        }



    

    //得点描画
    if(drawPhase<=Q_max){
        textSize(30*windowHeight/600*0.7);
        text("黒マスの数 : "+point,gap*4,gap*5.5);
    }

    //黒マスプリセット描画
    if(drawPhase<=Q_max){
        for(let i=0;i<5;i++){
            for(let j=0;j<5;j++){
                //i列j行目がtrue or 問題文に黒マスがある
                if(data["set"+riddleSet]["preset"][drawPhase][j][i]-0===1){
                    rect(gap*i,gap*j,gap,gap);
                }
            }
        }
    }

}

//問題描画
    //使用しない
// function nazoDraw(num){
//     let moji=mojiList[num];

//     //5*5枠　描画
//     drawingContext.setLineDash([0.5, 4]);
//     if(num!==0){
//         for(let i=0;i<=5;i++){
//             line(gap*i,0,gap*i,gap*5);
//             line(0,gap*i,gap*5,gap*i);
//         }
//     }
//     drawingContext.setLineDash([]);


//     if(num===0){
//         text("このままお待ちください",gap*2.5,gap*2.5)
//     }else if(num===1){
//         text("A",-gap*0.5,-gap*0.5)

//         strokeWeight(2);
//         lineDraw(0,0,0,5);
//         lineDraw(0,0,5,0);
//         lineDraw(5,0,5,5);
//         lineDraw(0,5,5,5);

//         strokeWeight(1);
//         lineDraw(1,0,1,4);
//         lineDraw(1,4,2,4);
//         lineDraw(2,1,2,3);
//         lineDraw(2,3,4,3);
//         lineDraw(4,1,4,3);
//         lineDraw(3,0,3,2);
//         lineDraw(3,3,3,5);
//         lineDraw(4,4,5,4); 
//         strokeWeight(1);      
//     }else if(num===2){
//         text("B",-gap*0.5,-gap*0.5)
//     }else if(num===3){
//         text("C",-gap*0.5,-gap*0.5)
//         rect(gap*0,gap*1,gap,gap*3);
//         rect(gap*2,gap*1,gap,gap);
//         rect(gap*2,gap*3,gap,gap);
//     }else if(num===4){
//         text("D",-gap*0.5,-gap*0.5)

//         textSize(textSize()*0.7);
//         text("ろくろ",gap*4.5,gap*3.5)
//         textSize();
//         //黒
//         rect(gap*0,gap*0,gap,gap);
//         rect(gap*1,gap*3,gap,gap);
//         //白
//         fill(255);
//         rect(gap*1,gap*0,gap,gap);
//         rect(gap*0,gap*3,gap,gap);
//         //青
//         fill(color(50,50,255));
//         rect(gap*2,gap*0,gap,gap);
//         rect(gap*1,gap*1,gap,gap);

//         //赤
//         fill(color(255,50,50));
//         rect(gap*0,gap*1,gap,gap);
//         rect(gap*1,gap*2,gap,gap);

//         //黄色
//         fill(color(255,255,50));
//         rect(gap*0,gap*2,gap,gap);
//         rect(gap*2,gap*2,gap,gap);
//         rect(gap*2,gap*3,gap,gap);

//         fill(0)

//     }else if(num===5){
//         text("E",-gap*0.5,-gap*0.5);
//     }else if(num===6){
//         text("F",-gap*0.5,-gap*0.5);
//     }else if(num===7){
//         text("例",-gap*0.5,-gap*0.5)
//         textSize(textSize()*0.7);
//         text("かば",gap*0.5,gap*0.5);
//         text("した",gap*1.5,gap*0.5);
//         text("たこ",gap*2.5,gap*0.5);
//         text("たけ",gap*3.5,gap*0.5);
//         text("ふき",gap*4.5,gap*0.5);

//         text("ばとる",gap*0.5,gap*2.5);
//         text("しない",gap*1.5,gap*2.5);
//         text("こけし",gap*2.5,gap*2.5);
//         text("けむし",gap*3.5,gap*2.5);
//         text("ないふ",gap*4.5,gap*2.5);

//         text("?",gap*0.5,gap*4.5);
//         text("?",gap*1.5,gap*4.5);
//         text("?",gap*2.5,gap*4.5);
//         text("?",gap*3.5,gap*4.5);
//         text("?",gap*4.5,gap*4.5);

//         strokeWeight(2);
//         lineDraw(1,2.5,2,2.5);
//         lineDraw(3,2.5,4,2.5);
//         lineDraw(3.7,2.7,4,2.5);
//         lineDraw(3.7,2.3,4,2.5);
//         strokeWeight(1);

//         textSize();
//     }

//     //文字描画
//     if(drawPhase!==0){   
//         for(let i=0;i<5;i++){
//             for(let j=0;j<5;j++){
//                 //i列j行目が存在し、*でない
//                 if(moji[i][j] &&moji[i][j]!=="*"){
//                     text(moji[i][j],gap*(j+0.5),gap*(i+0.5));
//                 }
//             }
//         }
//         //得点描画
//         textSize(30*windowHeight/600*0.7);
//         text("黒マスの数 : "+point,gap*4,gap*5.5);
//     }



// }


//線を引く
function lineDraw(psx,psy,pex,pey){
    line(psy*gap,psx*gap,pey*gap,pex*gap);    
}


//黒四角描画
function boxDraw(phase){
    //phaseがQ_max以下の場合に黒四角を描画
    if(phase<=Q_max){
        for(let i=0;i<5;i++){
            for(let j=0;j<5;j++){
                if(boxArray[i][j]){
                    rect(gap*i,gap*j,gap,gap);
                }
            }
        }
    }
}

//黒四角消去
function clearBox(){
    //boxArray 初期化
    boxArray=[];
    for(let t=0;t<5;t++){
        boxArray.push([false,false,false,false,false]);
    }
}


//ウィンドウサイズ変更時に自動的に呼ばれる
function windowResized() {
    windowSet();
}

//ウィンドウサイズに合わせてパラメータを設定
function windowSet(){
    resizeCanvas(windowWidth, windowHeight);
    gap=windowHeight*zoom/5;
    startX=(windowWidth-gap*5)*0.5;
    startY=(windowHeight-gap*5)*0.5;
    textSize(30*windowHeight/600);
}

//得点更新
function pointUpdate(){
    let newPoint=0;
    if(drawPhase<=Q_max){
        for(let i=0;i<5;i++){
            for(let j=0;j<5;j++){
                //i列j行目がtrue or 問題文に黒マスがある
                if(boxArray[i][j]===true || data["set"+riddleSet]["preset"][drawPhase][j][i]-0===1){
                    newPoint++;
                }
            }
        }
    }

    return newPoint;
}


//盤面上の文字
const moji_null=[
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""]
];
const moji_a=[
    ["S","","イ","",""],
    ["","","","",""],
    ["ス","","","ー",""],
    ["","","","","ト"],
    ["","","","","G"]
];
const moji_b=[
    ["2","つ","進","め","ろ"],
    ["キ","ン","➽","ニ","チ"],
    ["フ","ァ","➔","","ラ"],
    ["ト","ラ","⇒","タ","ツ"],
    ["木","➽","➔","⇒","？"]
];
const moji_c=[
    ["","","","1",""],
    ["*","","*","",""],
    ["*","","","",""],
    ["*","","*","2",""],
    ["","","","",""]
];
const moji_d=[
    ["*","","","=","?"],
    ["","","=","","顔"],
    ["","","","=","気合"],
    ["","*","","=",""],
    ["？","の","国","は","何"]
];
const moji_e=[
    ["火","","消","","練"],
    ["","↖","↓","↙",""],
    ["石","→","？","→","酸"],
    ["","↙","↓","↘",""],
    ["焼","","坑","","素"]
];
const moji_f=[
    ["I","D","N","の","尾"],
    ["C","M","R","の","2"],
    ["B","R","A","の","3"],
    ["E","S","P","の","頭"],
    ["A","U","S","の","4"]
];

const mojiList = [moji_null,moji_a,moji_b,moji_c,moji_d,moji_e,moji_f,moji_null];