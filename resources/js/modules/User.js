export default class User{
    // cette classe gère la création d'un utilisateur et son affichage dans le container
    // le constructeur prend en paramètre le body qui est le container ou il y aura les utilisateurs
    constructor(body){
        this.name = "x";
        this.container = document.getElementById("container");
        this.containerSize = 8;
        this.create = document.getElementById("create")
        this.body = body; 
        this.init()
        this.userNumber = 0;
        this.listUser = [];

    }
    // init() ajoute un event listener au bouton de création d'utilisateur pour afficher le formulaire
    init(){
        this.create.addEventListener("click", ()=> { this.form()})
    }
    // form() crée un formulaire pour entrer le nom de l'utilisateur et ajoute un event listener au bouton d'enregistrement pour créer l'utilisateur
    form(){
        if(this.container.children.length < this.containerSize){
            if(document.getElementById('boxG')){
                document.getElementById('boxG').remove();
            }
            if(document.getElementById('box')){
                document.getElementById('box').remove();
            }
            const divStart = "<div id='box' class='box'>";
            const label = "<div class='row'><label class='label'>Nom</label>";
            const input = "<input id='name' class='input' type='text'></div>";
            const button = "<button id='submit' class='button'>Enregistrer</button>";
            const divEnd = "</div>";

            this.body.insertAdjacentHTML("beforeend", divStart + label + input + button + divEnd);

            this.submit();
        }else{
            const divStart = "<div id='box' class='box'>";
            const text = "<p class='info'>Vous ne pouvez pas créer plus de " + this.containerSize + " utilisateurs</p>";
            const button = "<button id='back' class='button button-danger'>Fermer</button>";
            const divEnd = "</div>";
            this.body.insertAdjacentHTML("beforeend",divStart + text + button + divEnd);
            this.back();
        }

    }

    back(){
        document.getElementById('back').addEventListener('click', ()=>{
            document.getElementById('box').remove();
        })
    }

    // submit() ajoute un event listener au bouton d'enregistrement pour récupérer le nom de l'utilisateur, supprimer le formulaire et créer l'utilisateur
    submit(){
        document.getElementById('submit').addEventListener('click', ()=>{
            this.name = document.getElementById('name').value.trim();
            document.getElementById('box').remove()
            this.createUser();
        })
    }
    // createUser() crée un élément HTML pour afficher l'utilisateur dans le container
    createUser(){
        if(this.name != ""){
            if(document.getElementById('initText')){
                document.getElementById('initText').remove();
            }
            this.userNumber++;
            const user ="<div id='" + this.userNumber + "' class='user-card'>";
            const h2 ="<h2 class='user-name'>" + this.name + "</h2>";
            const deleteUser ="<div id='delete-" + this.userNumber + "' class='icon-btn icon-btn-danger'>X</div>";
            const divEnd = "</div>";
            this.container.classList.add("user-grid");
            this.container.insertAdjacentHTML("beforeend", user + h2 + deleteUser + divEnd);
            this.listUser.push(this.name);
            this.delete();
        }               
    }
    // delete() supprime l'user
    delete(){
        const deleteU = document.getElementById("delete-"+ this.userNumber);
        const number = this.userNumber;
        deleteU.addEventListener('click', ()=> {
            document.getElementById(number).remove();
            if(this.container.children.length == 0){
                const initText = "<p id='initText'>Les users seront affichés ici</p>";
                this.container.insertAdjacentHTML("beforeend", initText);
            }
        })
    }

}