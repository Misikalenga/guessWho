export default class Circle{
    // cette classe gère la création de la roue qui tourne et selectionne l'utilisateur gagnant
    constructor(body){
        this.color = ["red", "blue", "green", "cyan", "purple", "pink", "yellow", "orange"];
        this.colorSet = this.color;
        this.borderSize = 2;
        this.startCircle = document.getElementById("generate"); // le bouton pour générer la roue
        this.body = body; // le body pour ajouter la roue
        this.container = document.getElementById("container"); // le container ou il y a les utilisateurs
        this.boxCircle = "x";
        this.boxRotate = "x";
        this.listUser = [];
        this.intervalS = "x"
        this.durataion = 100; // la durée de chaque tour de roue en ms
        this.durationLength = this.durataion
        this.btnStart = "btnStart"; // le bouton pour lancer la roue
        


    }

    // init() ajoute un event listener au bouton de génération pour créer la roue et lancer l'animation
    init(){
        this.startCircle.addEventListener('click', ()=> {
            if(this.container.children.length > 1){
                if(document.getElementById('boxCircle')){
                    document.getElementById('boxCircle').remove();
                }
                if(document.getElementById('boxG')){
                    document.getElementById('boxG').remove();
                }
                if(document.getElementById('box')){
                    document.getElementById('box').remove();
                }
                this.colorSet = this.color;
                const div = document.createElement("div");
                div.className = "boxCircle";
                div.id = "boxCircle";
                this.body.appendChild(div);
                const boxRotate = document.createElement("div");
                boxRotate.id = "boxRotate";
                boxRotate.className = "boxRotate";
                this.boxRotate = boxRotate;
                this.createCircle();
            }else{

                if(document.getElementById('box')){
                    document.getElementById('box').remove();
                }
                if(document.getElementById('boxG')){
                    document.getElementById('boxG').remove();
                }
                const divStartCircle = "<div id='boxG' class='box'>"; 
                const text ="<p class='info'>Vous devez créer au moins 2 utilisateurs pour lancer le jeu</p>";
                const button ="<button id='backG' class='button button-danger'>Fermer</button>";
                const divEnd = "</div>";
                this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                this.back();
            }

        })
    }

    // ferme le message d'erreur si il n'y a pas assez d'utilisateur pour lancer le jeu
    back(){
        document.getElementById('backG').addEventListener('click', ()=>{
            document.getElementById('boxG').remove();
            if(document.getElementById('box')){
                document.getElementById('box').remove();
            }
        })
    }

    // crée la roue et la divise en fonction du nombre d'utilisateur, ajoute les utilisateurs sur la roue et lance l'animation de rotation
    createCircle(){
        this.recupUser();
        
        if( this.intervalS != "x"){clearInterval(this.intervalS);}
        this.boxCircle = document.getElementById("boxCircle");
        this.boxCircle.appendChild(this.boxRotate)
        const deleteCircle = document.querySelectorAll(".colorCircle");
        deleteCircle.forEach(circle => circle.remove());
    
        const btnStart ="<button id='"+ this.btnStart +"' class='button-start'>Start</button>";
        this.boxRotate.insertAdjacentHTML("beforeend", btnStart);

        const count = document.createElement("div");
        count.className = "count";
        count.id = "count";

        this.boxCircle.appendChild(count);
        

        if (this.container.children.length == 2) {
        
            const user1 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:50%;top:75px;transform:translate(-50%,-50%);'>" + this.listUser[0] + "</p>";
            const user2 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:50%;top:225px;transform:translate(-50%,-50%);'>" + this.listUser[1] + "</p>";
            
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c1' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 270deg," + this.randColor() + " 180deg,transparent 180deg);'>" + user1 + "</div>");
            
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c2' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 90deg," + this.randColor() + " 180deg,transparent 180deg);'>" + user2 + "</div>");
            
        }else if (this.container.children.length == 3) {
            
            const user1 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:225px;top:100px;transform:translate(-50%,-50%);'>" + this.listUser[0] + "</p>";
            const user2 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:50%;top:225px;transform:translate(-50%,-50%);'>" + this.listUser[1] + "</p>";
            const user3 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:75px;top:100px;transform:translate(-50%,-50%);'>" + this.listUser[2] + "</p>";
            
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c1' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 0deg," + this.randColor() + " 120deg,transparent 120deg);'>" + user1 + "</div>");
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c2' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 120deg," + this.randColor() + " 120deg,transparent 120deg);'>" + user2 + "</div>");
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c3' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 240deg," + this.randColor() + " 120deg,transparent 120deg);'>" + user3 + "</div>");
            
        }else if (this.container.children.length == 4) {
            
            const user1 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:213px;top:87px;transform:translate(-50%,-50%);'>" + this.listUser[0] + "</p>";
            const user2 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:213px;top:213px;transform:translate(-50%,-50%);'>" + this.listUser[1] + "</p>";
            const user3 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:87px;top:213px;transform:translate(-50%,-50%);'>" + this.listUser[2] + "</p>";
            const user4 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:87px;top:87px;transform:translate(-50%,-50%);'>" + this.listUser[3] + "</p>";
            
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c1' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 0deg," + this.randColor() + " 90deg,transparent 90deg);'>" + user1 + "</div>");
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c2' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 90deg," + this.randColor() + " 90deg,transparent 90deg);'>" + user2 + "</div>");
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c3' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 180deg," + this.randColor() + " 90deg,transparent 90deg);'>" + user3 + "</div>");
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c4' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 270deg," + this.randColor() + " 90deg,transparent 90deg);'>" + user4 + "</div>");
            
        }else if (this.container.children.length == 5) {
            
            const user1 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:200px;top:75px;transform:translate(-50%,-50%);'>" + this.listUser[0] + "</p>";
            const user2 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:240px;top:175px;transform:translate(-50%,-50%);'>" + this.listUser[1] + "</p>";
            const user3 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:150px;top:238px;transform:translate(-50%,-50%);'>" + this.listUser[2] + "</p>";
            const user4 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:60px;top:175px;transform:translate(-50%,-50%);'>" + this.listUser[3] + "</p>";
            const user5 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:100px;top:75px;transform:translate(-50%,-50%);'>" + this.listUser[4] + "</p>";
            
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c1' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 0deg," + this.randColor() + " 72deg,transparent 72deg);'>" + user1 + "</div>");
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c2' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 72deg," + this.randColor() + " 72deg,transparent 72deg);'>" + user2 + "</div>");
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c3' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 144deg," + this.randColor() + " 72deg,transparent 72deg);'>" + user3 + "</div>");
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c4' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 216deg," + this.randColor() + " 72deg,transparent 72deg);'>" + user4 + "</div>");
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c5' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 288deg," + this.randColor() + " 72deg,transparent 72deg);'>" + user5 + "</div>");
            
        }else if (this.container.children.length == 6) {
            
            const user1 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:200px;top:75px;transform:translate(-50%,-50%);'>" + this.listUser[0] + "</p>";
            const user2 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:238px;top:150px;transform:translate(-50%,-50%);'>" + this.listUser[1] + "</p>";
            const user3 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:200px;top:225px;transform:translate(-50%,-50%);'>" + this.listUser[2] + "</p>";
            const user4 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:100px;top:225px;transform:translate(-50%,-50%);'>" + this.listUser[3] + "</p>";
            const user5 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:63px;top:150px;transform:translate(-50%,-50%);'>" + this.listUser[4] + "</p>";
            const user6 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:100px;top:75px;transform:translate(-50%,-50%);'>" + this.listUser[5] + "</p>";
            
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c1' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 0deg," + this.randColor() + " 60deg,transparent 60deg);'>" + user1 + "</div>");
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c2' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 60deg," + this.randColor() + " 60deg,transparent 60deg);'>" + user2 + "</div>");
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c3' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 120deg," + this.randColor() + " 60deg,transparent 60deg);'>" + user3 + "</div>");
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c4' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 180deg," + this.randColor() + " 60deg,transparent 60deg);'>" + user4 + "</div>");
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c5' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 240deg," + this.randColor() + " 60deg,transparent 60deg);'>" + user5 + "</div>");
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c6' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 300deg," + this.randColor() + " 60deg,transparent 60deg);'>" + user6 + "</div>");
            
        }else if (this.container.children.length == 7) {
            
            const user1 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:187px;top:63px;transform:translate(-50%,-50%);'>" + this.listUser[0] + "</p>";
            const user2 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:238px;top:125px;transform:translate(-50%,-50%);'>" + this.listUser[1] + "</p>";
            const user3 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:225px;top:200px;transform:translate(-50%,-50%);'>" + this.listUser[2] + "</p>";
            const user4 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:150px;top:237px;transform:translate(-50%,-50%);'>" + this.listUser[3] + "</p>";
            const user5 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:75px;top:200px;transform:translate(-50%,-50%);'>" + this.listUser[4] + "</p>";
            const user6 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:63px;top:125px;transform:translate(-50%,-50%);'>" + this.listUser[5] + "</p>";
            const user7 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:113px;top:63px;transform:translate(-50%,-50%);'>" + this.listUser[6] + "</p>";
            
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c1' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 0deg," + this.randColor() + " 51deg,transparent 51deg);'>" + user1 + "</div>");
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c2' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 51deg," + this.randColor() + " 51deg,transparent 51deg);'>" + user2 + "</div>");
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c3' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 102deg," + this.randColor() + " 51deg,transparent 51deg);'>" + user3 + "</div>");
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c4' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 153deg," + this.randColor() + " 51deg,transparent 51deg);'>" + user4 + "</div>");
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c5' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 204deg," + this.randColor() + " 51deg,transparent 51deg);'>" + user5 + "</div>");
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c6' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 255deg," + this.randColor() + " 51deg,transparent 51deg);'>" + user6 + "</div>");
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c7' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 306deg," + this.randColor() + " 54deg,transparent 54deg);'>" + user7 + "</div>");
            
        }else if (this.container.children.length == 8) {
            
            const user1 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:187px;top:63px;transform:translate(-50%,-50%);'>" + this.listUser[0] + "</p>";
            const user2 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:238px;top:113px;transform:translate(-50%,-50%);'>" + this.listUser[1] + "</p>";
            const user3 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:238px;top:187px;transform:translate(-50%,-50%);'>" + this.listUser[2] + "</p>";
            const user4 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:187px;top:237px;transform:translate(-50%,-50%);'>" + this.listUser[3] + "</p>";
            const user5 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:113px;top:237px;transform:translate(-50%,-50%);'>" + this.listUser[4] + "</p>";
            const user6 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:63px;top:187px;transform:translate(-50%,-50%);'>" + this.listUser[5] + "</p>";
            const user7 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:63px;top:113px;transform:translate(-50%,-50%);'>" + this.listUser[6] + "</p>";
            const user8 = "<p class='labelUser' style='position:absolute;background:#fff;z-index:20;font-weight:700;padding:0 8px;border-radius:4px;left:113px;top:63px;transform:translate(-50%,-50%);'>" + this.listUser[7] + "</p>";
            
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c1' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 0deg," + this.randColor() + " 45deg,transparent 45deg);'>" + user1 + "</div>");
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c2' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 45deg," + this.randColor() + " 45deg,transparent 45deg);'>" + user2 + "</div>");
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c3' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 90deg," + this.randColor() + " 45deg,transparent 45deg);'>" + user3 + "</div>");
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c4' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 135deg," + this.randColor() + " 45deg,transparent 45deg);'>" + user4 + "</div>");
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c5' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 180deg," + this.randColor() + " 45deg,transparent 45deg);'>" + user5 + "</div>");
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c6' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 225deg," + this.randColor() + " 45deg,transparent 45deg);'>" + user6 + "</div>");
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c7' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 270deg," + this.randColor() + " 45deg,transparent 45deg);'>" + user7 + "</div>");
            this.boxRotate.insertAdjacentHTML("beforeend", "<div id='c8' style='position:absolute;width:300px;height:300px;border-radius:50%;border:" + this.borderSize + "px solid rgba(185,28,28,0.5);background:conic-gradient(from 315deg," + this.randColor() + " 45deg,transparent 45deg);'>" + user8 + "</div>");
      
        }
        

        this.start();
    }

    // recupUser() récupère les noms des utilisateurs dans le container et les stocke dans une liste
    recupUser(){
        this.listUser = [];
        const userName = document.querySelectorAll("#container h2");
        userName.forEach(user => this.listUser.push(user.textContent.trim()) )

    }

    //
    randColor(){
        const randCol = this.colorSet[Math.floor(Math.random() * this.colorSet.length)];
        this.colorSet = this.colorSet.filter(color => color !== randCol);
        return randCol;
    }

    // counter() récupère la rotation de la roue et détermine quel utilisateur a gagné en fonction oriantation de la roue
    counter(){
        let rotation = document.getElementById("boxRotate").style.transform;
        rotation = rotation.replace("rotate(", "").replace("deg)", "");
        rotation = parseFloat(rotation);
        rotation = rotation / 360;
        rotation = 360 - ((rotation - parseInt(rotation)) * 360);

        const divStartCircle = "<div id='boxG' class='box'>";
        const button = "<button id='backG' class='button button-danger'>Fermer</button>";
        const divEnd = "</div>";

    

        setTimeout(() => {
            if(this.container.children.length == 2){
                if(rotation >= 270 || rotation < 90){
                    let text = "<p class='info'>"+ this.listUser[0] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else{
                    let text = "<p class='info'>"+ this.listUser[1] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }
            }else if(this.container.children.length == 3){
                if(rotation >= 0 && rotation < 120){
                    let text = "<p class='info'>"+ this.listUser[0] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 120 && rotation < 240){
                    let text = "<p class='info'>"+ this.listUser[1] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else{
                    let text = "<p class='info'>"+ this.listUser[2] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }
            }else if(this.container.children.length == 4){
                if(rotation >= 0 && rotation < 90){
                    let text = "<p class='info'>"+ this.listUser[0] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 90 && rotation < 180){
                    let text = "<p class='info'>"+ this.listUser[1] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 180 && rotation < 270){
                    let text = "<p class='info'>"+ this.listUser[2] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else{
                    let text = "<p class='info'>"+ this.listUser[3] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }
            }else if(this.container.children.length == 5){
                if(rotation >= 0 && rotation < 72){
                    let text = "<p class='info'>"+ this.listUser[0] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 72 && rotation < 144){
                    let text = "<p class='info'>"+ this.listUser[1] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 144 && rotation < 216){
                    let text = "<p class='info'>"+ this.listUser[2] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 216 && rotation < 288){
                    let text = "<p class='info'>"+ this.listUser[3] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else{
                    let text = "<p class='info'>"+ this.listUser[4] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }
            }else if(this.container.children.length == 6){
                if(rotation >= 0 && rotation < 60){
                    let text = "<p class='info'>"+ this.listUser[0] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 60 && rotation < 120){
                    let text = "<p class='info'>"+ this.listUser[1] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 120 && rotation < 180){
                    let text = "<p class='info'>"+ this.listUser[2] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 180 && rotation < 240){
                    let text = "<p class='info'>"+ this.listUser[3] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 240 && rotation < 300){
                    let text = "<p class='info'>"+ this.listUser[4] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else{
                    let text = "<p class='info'>"+ this.listUser[5] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }
            }else if(this.container.children.length == 7){
                if(rotation >= 0 && rotation < 51){
                    let text = "<p class='info'>"+ this.listUser[0] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 51 && rotation < 102){
                    let text = "<p class='info'>"+ this.listUser[1] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 102 && rotation < 153){
                    let text = "<p class='info'>"+ this.listUser[2] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 153 && rotation < 204){
                    let text = "<p class='info'>"+ this.listUser[3] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 204 && rotation < 255){
                    let text = "<p class='info'>"+ this.listUser[4] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 255 && rotation < 306){
                    let text = "<p class='info'>"+ this.listUser[5] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else{
                    let text = "<p class='info'>"+ this.listUser[6] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }
            }else if(this.container.children.length == 8){
                if(rotation >= 0 && rotation < 45){
                    let text = "<p class='info'>"+ this.listUser[0] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 45 && rotation < 90){
                    let text = "<p class='info'>"+ this.listUser[1] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 90 && rotation < 135){
                    let text = "<p class='info'>"+ this.listUser[2] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 135 && rotation < 180){
                    let text = "<p class='info'>"+ this.listUser[3] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 180 && rotation < 225){
                    let text = "<p class='info'>"+ this.listUser[4] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 225 && rotation < 270){
                    let text = "<p class='info'>"+ this.listUser[5] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 270 && rotation < 315){
                    let text = "<p class='info'>"+ this.listUser[6] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else{
                    let text = "<p class='info'>"+ this.listUser[7] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }
            }
        }, 500);

    }
    
    // start() lance l'animation de rotation de la roue et appelle la fonction counter() pour déterminer le gagnant à la fin de l'animation
    start(){
        let btnStart = document.getElementById(this.btnStart);
        let angle = 0;
        let labelUser =document.querySelectorAll(".labelUser");

        btnStart.addEventListener("click", () => {
            clearInterval(this.intervalS);
            if(document.getElementById('boxG')){
                document.getElementById('boxG').remove();
            }
            let fast = 0;
            this.durationLength = this.durataion;
            let time = Math.floor(Math.random() * (60 - 30 + 1)) + 30;
            this.intervalS = setInterval(() => {
                this.boxRotate.style.transform = "rotate(" + angle + "deg)";
                labelUser.forEach(user => user.style.transform = "translate(-50%, -50%)  rotate(-" + angle + "deg)");
                btnStart.style.transform = " rotate(-" + angle + "deg)";
                if(this.durationLength > 1){
                    this.durationLength--

                    if(fast <= 50){fast++}
                    angle += fast;  
                    if(fast == 50){
                        angle += Math.floor(Math.random() * 360); 
                    }  
                }else{
                    if(fast > 0){
                        fast--;
                        angle += fast;

                    }

                    if(fast == 0){
                        clearInterval(this.intervalS);
                        this.counter()
                        if(document.getElementById('box')){
                            document.getElementById('box').remove();
                        }
                    }
                }

            }, time);
        });
    }

}