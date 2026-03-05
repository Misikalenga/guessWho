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
                div.className =" relative border border-gray-500/30 rounded-xl p-5 my-5 flex justify-center items-center scroll- w-full min-h-[340px] overflow-hidden mb-5";
                div.id = "boxCircle";
                this.body.appendChild(div);
                const boxRotate = document.createElement("div");
                boxRotate.id = "boxRotate";
                boxRotate.className ="w-[300px] h-[300px] flex justify-center items-center";
                this.boxRotate = boxRotate
                this.createCircle();

            }else{

                if(document.getElementById('box')){
                    document.getElementById('box').remove();
                }
                if(document.getElementById('boxG')){
                    document.getElementById('boxG').remove();
                }
                const divStartCircle = "<div id='boxG' class='absolute w-[70%] flex flex-col  rounded-xl p-5 backdrop-blur-sm bg-white/90 shadow-xl z-50  border border-gray-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>";
                const text = "<p class='w-18 mx-2'>Vous devez créer au moins 2 utilisateurs pour lancer le jeu</p>";
                const button = "<button id='backG' class='m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Fermer</button>";   
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
    
        const btnStart = "<button id='"+this.btnStart + "' class='absolute z-30 w-20 h-20 bg-green-500 hover:bg-green-400 active:bg-green-600 text-white font-bold py-2 px-4 rounded-full'>Start</button>";
        this.boxRotate.insertAdjacentHTML("beforeend", btnStart);

        const count = document.createElement("div");
        count.className = "w-0 h-0 z-40 absolute left-1/2 -translate-x-1/2 top-0 border-r-[25px] border-r-transparent border-l-[25px] rounded border-l-transparent border-t-[50px] border-t-red-500";
        count.id = "count";
        this.boxCircle.appendChild(count);
        

        if(this.container.children.length == 2){
            const user1 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-1/2 -translate-x-1/2 top-[75px] -translate-y-1/2'>" + this.listUser[0] +"</p>";
            const user2 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-1/2 -translate-x-1/2 top-[225px] -translate-y-1/2'>" + this.listUser[1] +"</p>";

            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c1' class=' colorCircle absolute bg-[conic-gradient(from_270deg,"+ this.randColor() +"_180deg,transparent_180deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user1 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c2' class=' colorCircle absolute bg-[conic-gradient(from_90deg,"+ this.randColor() +",_180deg,transparent_180deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user2 +"</div>");

        } else if(this.container.children.length == 3){
            const user1 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[225px] -translate-x-1/2 top-[100px] -translate-y-1/2'>" + this.listUser[0] +"</p>";
            const user2 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-1/2 -translate-x-1/2 top-[225px] -translate-y-1/2'>" + this.listUser[1] +"</p>";
            const user3 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[75px] -translate-x-1/2 top-[100px] -translate-y-1/2'>" + this.listUser[2] +"</p>";

            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c1' class=' colorCircle absolute bg-[conic-gradient(from_0deg,"+ this.randColor() +"_120deg,transparent_120deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user1 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c2' class=' colorCircle absolute bg-[conic-gradient(from_120deg,"+ this.randColor() +"_120deg,transparent_120deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user2 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c3' class=' colorCircle absolute bg-[conic-gradient(from_240deg,"+ this.randColor() +"_120deg,transparent_120deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user3 +"</div>");

        } else if(this.container.children.length == 4){
            const user1 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[213px] -translate-x-1/2 top-[87px] -translate-y-1/2'>" + this.listUser[0] +"</p>";
            const user2 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[213px] -translate-x-1/2 top-[213px] -translate-y-1/2'>" + this.listUser[1] +"</p>";
            const user3 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[87px] -translate-x-1/2 top-[213px] -translate-y-1/2'>" + this.listUser[2] +"</p>";
            const user4 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[87px] -translate-x-1/2 top-[87px] -translate-y-1/2'>" + this.listUser[3] +"</p>";

            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c1' class=' colorCircle absolute bg-[conic-gradient(from_0deg,"+ this.randColor() +"_90deg,transparent_90deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user1 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c2' class=' colorCircle absolute bg-[conic-gradient(from_90deg,"+ this.randColor() +"_90deg,transparent_90deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user2 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c3' class=' colorCircle absolute bg-[conic-gradient(from_180deg,"+ this.randColor() +"_90deg,transparent_90deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user3 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c4' class=' colorCircle absolute bg-[conic-gradient(from_270deg,"+ this.randColor() +"_90deg,transparent_90deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user4 +"</div>");

        } else if(this.container.children.length == 5){
            const user1 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[200px] -translate-x-1/2 top-[75px] -translate-y-1/2'>" + this.listUser[0] +"</p>";
            const user2 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[240px] -translate-x-1/2 top-[175px] -translate-y-1/2'>" + this.listUser[1] +"</p>";
            const user3 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[150px] -translate-x-1/2 top-[238px] -translate-y-1/2'>" + this.listUser[2] +"</p>";
            const user4 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[60px] -translate-x-1/2 top-[175px] -translate-y-1/2'>" + this.listUser[3] +"</p>";
            const user5 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[100px] -translate-x-1/2 top-[75px] -translate-y-1/2'>" + this.listUser[4] +"</p>";

            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c1' class=' colorCircle absolute bg-[conic-gradient(from_0deg,"+ this.randColor() +"_72deg,transparent_72deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user1 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c2' class=' colorCircle absolute bg-[conic-gradient(from_72deg,"+ this.randColor() +"_72deg,transparent_72deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user2 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c3' class=' colorCircle absolute bg-[conic-gradient(from_144deg,"+ this.randColor() +"_72deg,transparent_72deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user3 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c4' class=' colorCircle absolute bg-[conic-gradient(from_216deg,"+ this.randColor() +"_72deg,transparent_72deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user4 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c5' class=' colorCircle absolute bg-[conic-gradient(from_288deg,"+ this.randColor() +"_72deg,transparent_72deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user5 +"</div>");

        } else if(this.container.children.length == 6){
            const user1 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[200px] -translate-x-1/2 top-[75px] -translate-y-1/2'>" + this.listUser[0] +"</p>";
            const user2 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[238px] -translate-x-1/2 top-[150px] -translate-y-1/2'>" + this.listUser[1] +"</p>";
            const user3 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[200px] -translate-x-1/2 top-[225px] -translate-y-1/2'>" + this.listUser[2] +"</p>";
            const user4 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[100px] -translate-x-1/2 top-[225px] -translate-y-1/2'>" + this.listUser[3] +"</p>";
            const user5 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[63px] -translate-x-1/2 top-[150px] -translate-y-1/2'>" + this.listUser[4] +"</p>";
            const user6 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[100px] -translate-x-1/2 top-[75px] -translate-y-1/2'>" + this.listUser[5] +"</p>";

            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c1' class=' colorCircle absolute bg-[conic-gradient(from_0deg,"+ this.randColor() +"_60deg,transparent_60deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user1 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c2' class=' colorCircle absolute bg-[conic-gradient(from_60deg,"+ this.randColor() +"_60deg,transparent_60deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user2 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c3' class=' colorCircle absolute bg-[conic-gradient(from_120deg,"+ this.randColor() +"_60deg,transparent_60deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user3 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c4' class=' colorCircle absolute bg-[conic-gradient(from_180deg,"+ this.randColor() +"_60deg,transparent_60deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user4 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c5' class=' colorCircle absolute bg-[conic-gradient(from_240deg,"+ this.randColor() +"_60deg,transparent_60deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user5 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c6' class=' colorCircle absolute bg-[conic-gradient(from_300deg,"+ this.randColor() +"_60deg,transparent_60deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user6 +"</div>");

        } else if(this.container.children.length == 7){
            const user1 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[187px] -translate-x-1/2 top-[63px] -translate-y-1/2'>" + this.listUser[0] +"</p>";
            const user2 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[238px] -translate-x-1/2 top-[125px] -translate-y-1/2'>" + this.listUser[1] +"</p>";
            const user3 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[225px] -translate-x-1/2 top-[200px] -translate-y-1/2'>" + this.listUser[2] +"</p>";
            const user4 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[150px] -translate-x-1/2 top-[237px] -translate-y-1/2'>" + this.listUser[3] +"</p>";
            const user5 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[75px] -translate-x-1/2 top-[200px] -translate-y-1/2'>" + this.listUser[4] +"</p>";
            const user6 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[63px] -translate-x-1/2 top-[125px] -translate-y-1/2'>" + this.listUser[5] +"</p>";
            const user7 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[113px] -translate-x-1/2 top-[63px] -translate-y-1/2'>" + this.listUser[6] +"</p>";

            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c1' class=' colorCircle absolute bg-[conic-gradient(from_0deg,"+ this.randColor() +"_51deg,transparent_51deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user1 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c2' class=' colorCircle absolute bg-[conic-gradient(from_51deg,"+ this.randColor() +"_51deg,transparent_51deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user2 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c3' class=' colorCircle absolute bg-[conic-gradient(from_102deg,"+ this.randColor() +"_51deg,transparent_51deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user3 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c4' class=' colorCircle absolute bg-[conic-gradient(from_153deg,"+ this.randColor() +"_51deg,transparent_51deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user4 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c5' class=' colorCircle absolute bg-[conic-gradient(from_204deg,"+ this.randColor() +"_51deg,transparent_51deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user5 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c6' class=' colorCircle absolute bg-[conic-gradient(from_255deg,"+ this.randColor() +"_51deg,transparent_51deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user6 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c7' class=' colorCircle absolute bg-[conic-gradient(from_306deg,"+ this.randColor() +"_54deg,transparent_54deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user7 +"</div>");

        } else if(this.container.children.length == 8){
            const user1 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[187px] -translate-x-1/2 top-[63px] -translate-y-1/2'>" + this.listUser[0] +"</p>";
            const user2 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[238px] -translate-x-1/2 top-[113px] -translate-y-1/2'>" + this.listUser[1] +"</p>";
            const user3 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[238px] -translate-x-1/2 top-[187px] -translate-y-1/2'>" + this.listUser[2] +"</p>";
            const user4 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[187px] -translate-x-1/2 top-[237px] -translate-y-1/2'>" + this.listUser[3] +"</p>";
            const user5 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[113px] -translate-x-1/2 top-[237px] -translate-y-1/2'>" + this.listUser[4] +"</p>";
            const user6 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[63px] -translate-x-1/2 top-[187px] -translate-y-1/2'>" + this.listUser[5] +"</p>";
            const user7 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[63px] -translate-x-1/2 top-[113px] -translate-y-1/2'>" + this.listUser[6] +"</p>";
            const user8 = "<p class='labelUser bg-white z-20 font-bold px-2 rounded absolute left-[113px] -translate-x-1/2 top-[63px] -translate-y-1/2'>" + this.listUser[7] +"</p>";

            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c1' class=' colorCircle absolute bg-[conic-gradient(from_0deg,"+ this.randColor() +"_45deg,transparent_45deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user1 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c2' class=' colorCircle absolute bg-[conic-gradient(from_45deg,"+ this.randColor() +"_45deg,transparent_45deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user2 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c3' class=' colorCircle absolute bg-[conic-gradient(from_90deg,"+ this.randColor() +"_45deg,transparent_45deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user3 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c4' class=' colorCircle absolute bg-[conic-gradient(from_135deg,"+ this.randColor() +"_45deg,transparent_45deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user4 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c5' class=' colorCircle absolute bg-[conic-gradient(from_180deg,"+ this.randColor() +"_45deg,transparent_45deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user5 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c6' class=' colorCircle absolute bg-[conic-gradient(from_225deg,"+ this.randColor() +"_45deg,transparent_45deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user6 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c7' class=' colorCircle absolute bg-[conic-gradient(from_270deg,"+ this.randColor() +"_45deg,transparent_45deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user7 +"</div>");
            this.boxRotate.insertAdjacentHTML("beforeend","<div id='c8' class=' colorCircle absolute bg-[conic-gradient(from_315deg,"+ this.randColor() +"_45deg,transparent_45deg)] w-[300px] h-[300px] rounded-full border-" + this.borderSize + " border-red-700/50'>"+ user8 +"</div>");

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

        const divStartCircle = "<div id='boxG' class='absolute w-[70%] flex flex-col  rounded-xl p-5 backdrop-blur-sm bg-white/90 shadow-xl z-50  border border-gray-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>";
        const button = "<button id='backG' class='m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Fermer</button>";   
        const divEnd = "</div>";
    

        setTimeout(() => {
            if(this.container.children.length == 2){
                if(rotation >= 270 || rotation < 90){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[0] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else{
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[1] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }
            }else if(this.container.children.length == 3){
                if(rotation >= 0 && rotation < 120){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[0] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 120 && rotation < 240){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[1] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else{
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[2] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }
            }else if(this.container.children.length == 4){
                if(rotation >= 0 && rotation < 90){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[0] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 90 && rotation < 180){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[1] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 180 && rotation < 270){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[2] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else{
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[3] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }
            }else if(this.container.children.length == 5){
                if(rotation >= 0 && rotation < 72){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[0] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 72 && rotation < 144){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[1] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 144 && rotation < 216){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[2] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 216 && rotation < 288){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[3] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else{
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[4] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }
            }else if(this.container.children.length == 6){
                if(rotation >= 0 && rotation < 60){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[0] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 60 && rotation < 120){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[1] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 120 && rotation < 180){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[2] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 180 && rotation < 240){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[3] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 240 && rotation < 300){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[4] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else{
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[5] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }
            }else if(this.container.children.length == 7){
                if(rotation >= 0 && rotation < 51){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[0] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 51 && rotation < 102){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[1] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 102 && rotation < 153){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[2] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 153 && rotation < 204){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[3] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 204 && rotation < 255){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[4] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 255 && rotation < 306){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[5] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else{
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[6] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }
            }else if(this.container.children.length == 8){
                if(rotation >= 0 && rotation < 45){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[0] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 45 && rotation < 90){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[1] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 90 && rotation < 135){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[2] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 135 && rotation < 180){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[3] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 180 && rotation < 225){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[4] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 225 && rotation < 270){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[5] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else if(rotation >= 270 && rotation < 315){
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[6] +" à gagné</p>";
                    this.body.insertAdjacentHTML("beforeend", divStartCircle + text + button + divEnd);
                    this.back();
                }else{
                    let text = "<p class='w-18 mx-2'>"+ this.listUser[7] +" à gagné</p>";
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