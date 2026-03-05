export default class TextAnim {
    /*
        Mode d'emploi :
        1. Créer un instance avec comme paramètre  l'id de la balise div ou il y aura l'animation
        2. Si besoin, changez les variable de base qui sont listé dans le constructor 
        3. Démarer l'animation avec la méthode start
    */
    constructor(container){
        this.container = document.getElementById(container);;
        this.time = 100;
        this.number = 60
        this.margin = 2;
        this.color = ["pink", "red", "cyan"];
        this.opacity = 0.5;
        this.anim = "";

        //lancement de l'initialisation

        this.init();
    }

    

    // couleur aleatoire
    randColor(){
        return this.color[Math.floor(Math.random() * this.color.length)];
    }

    // lettre aléatoire
    randContent(){
        return String.fromCharCode(65 + Math.floor(Math.random() * 25));
    }

    // rajouter une lettre 
    addLetters(){
        let textP = document.createElement("p");
        textP.className = "font-bold leading-none p-0"; 
        textP.style.cssText = "color:"+this.randColor()+";opacity:"+this.contrast +";margin:2px 10px"
        textP.textContent = this.randContent();
        this.container.appendChild(textP);
    }

    // Supprime la première lettre après avoir ajouter la dernière lettre
    animLetters(){
        this.addLetters();
        if(this.container.children.length > this.number){
            this.container.children[0].remove();
        }
    }


    // initialisation pour mettre en place les premières lettres
    init(){
       for (let i=0; i< this.number; i++){
            this.addLetters();
        } 
        this.stop()   
    }  
    

    // lancer le script
    start(){
        this.anim = setInterval(() =>{
            this.animLetters()
        }, this.time);
        
    }
    
    // stop l'animation
    stop(){
        this.container.addEventListener('mouseenter', () => {clearInterval(this.anim);})
        this.container.addEventListener('click', () => {clearInterval(this.anim); this.start();})
    }
}

