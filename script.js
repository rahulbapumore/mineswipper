let n=10;
let m = 10;
(document.querySelector("select")).addEventListener("change",(event)=>{
    
    n = parseInt(document.querySelector("select").value); 
    if(n == 10)
    {
        m = 10;

    }
    else if(n == 20)
    {
        m = 18;
    }
    else if(n == 40)
    {
        m = 24;
    }

    document.querySelector(".body").innerHTML = "";
    play();
});

document.querySelector("button").addEventListener("click",(event)=>
{
    document.querySelector(".body").innerHTML = "";
    play();
});
let arr = Array(m);
let level=1;
const gameBoard=document.querySelector("body");
let set=[];
play();
function play(){

    for (var i = 0; i < m; i++) {
        arr[i] = Array(m).fill(0);
    }
    set=new Set();
    for(let i=0;i<n;i++){
        let row=parseInt(Math.random()*m);
        let col=parseInt(Math.random()*m);
        if(set.has([row,col])){
            i--;
        }else{
            set.add([row,col]);
            arr[row][col]=-1;
        }
    }
    const iterator1 = set.entries();
    console.log(set);
    for (const entry of iterator1) {
        let row=entry[0][0];
        let col=entry[0][1];
        let dir=[[-1,0],[0,-1],[1,0],[0,1],[-1,-1],[1,1],[-1,1],[1,-1]];
        for(let i=0;i<dir.length;i++){
            let r=row+dir[i][0];
            let c=col+dir[i][1];
            if(r>=0 && c>=0 && r<m && c<m && arr[r][c]!=-1){
                arr[r][c]= arr[r][c]+1;
            }
        }
    }

    console.log(arr);
    let mainDiv=document.createElement("div");
    mainDiv.className="mainDiv";
    for(let i=0;i<m;i++){
        let rowDiv=document.createElement("div");
        rowDiv.className="rowDiv";
        for(j=0;j<m;j++){
            let div=document.createElement("div");
            div.setAttribute("row",i);
            div.setAttribute("col",j);
            if((i+j) % 2 == 0)
            {
                div.style.opacity = "0.5";
            }
            
            div.style.backgroundColor="greenyellow";
            div.className="cell";
            div.setAttribute("onclick","callBack(event)")
            rowDiv.appendChild(div);
        }
        mainDiv.appendChild(rowDiv);
    }

    document.querySelector(".body").appendChild(mainDiv);
}
function dfs(arr,row,col,visited){
    //console.log(visited);
    //console.log(visited[row][col]);
    visited[row][col]=true;
    //console.log(visited[row][col]);
    //if(arr[row][col]!=0)  return;
    document.querySelector(`div[row='${row}'][col='${col}']`).style.backgroundColor="white";
    //console.log("hhhh");
    let dir=[[-1,0],[0,-1],[1,0],[0,1],[-1,-1],[1,1],[-1,1],[1,-1]];
        for(let i=0;i<dir.length;i++){
            let r=parseInt(row)+parseInt(dir[i][0]);
            let c=parseInt(col)+parseInt(dir[i][1]);
            console.log(r,c);
            if(r>=0 && c>=0 && r<m && c<m  && arr[r][c]==0 && !visited[r][c]){
                dfs(arr,r,c,visited);
            }else{
                if(r>=0 && c>=0 && r<m && c<m){
                    if(arr[r][c]==0){

                        document.querySelector(`div[row='${r}'][col='${c}']`).style.backgroundColor="white";
                        
                    }else if(arr[r][c]==-1){
                        let img=document.createElement("img");
                        img.src="./bomb.png";
                        document.querySelector(`div[row='${r}'][col='${c}']`).appendChild(img);
                    }
                    else{
                        document.querySelector(`div[row='${r}'][col='${c}']`).innerHTML=arr[r][c];
                        document.querySelector(`div[row='${r}'][col='${c}']`).style.backgroundColor="white";
                
                    }
                    
                }
                //return;
                
            }
        }
}
function callBack(event){
    
    let r=event.target.getAttribute("row");
    let c=event.target.getAttribute("col");
    //alert(event.target.outerHTML);
    event.target.style.backgroundColor="white";
    //console.log(arr);
    console.log(arr[r][c])
    if(arr[r][c]==-1){

        let itr=set.entries();
         for(let i of itr){
             let row=i[0][0];
             let col=i[0][1];
             let ele = document.querySelector(`div[row='${row}'][col='${col}']`);
                ele.innerHTML = "";
                ele.style.opacity = "1";
                ele.style.backgroundColor = "white";
               img=document.createElement("img");
                img.src="./bomb.png";
                ele.appendChild(img);
         }
         

    }else if(arr[r][c]!=0){
        event.target.innerHTML=arr[r][c];
    }else{
        let visited= new Array(m);
        for(let i=0;i<m;i++){
            visited[i]= new Array(m).fill(false);

        }
        
        dfs(arr,r,c,visited);
        //event.target.innerHTML="0";
        
    }
    event.target.removeAttribute("onclick");

    let temp = document.querySelectorAll(`div[style*=green]`);
    if(temp.length == n)
    {
        alert("You won the game!");

    }
}

// document.querySelector(".cell").addEventListener("click",(event)=>{
    

// })
