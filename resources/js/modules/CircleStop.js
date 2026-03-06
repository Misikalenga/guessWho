import Circle from './Circle';

export default class CircleStop extends Circle{
    constructor(body){
        super(body);
        this.startCircle = document.getElementById("modeStop");
        this.btnStart = "btnStartStop";

    }

    start(){
        let btnStart = document.getElementById(this.btnStart);
        let angle = 0;
        let labelUser =document.querySelectorAll(".labelUser");
        let lock = true;
        let stop = false;
        let fast = 0;
        let time = 0;
        btnStart.addEventListener("click", () => {
            if(lock == false){
                stop = true;
            }else{
                time = Math.floor(Math.random() * (60 - 30 + 1)) + 30;
                fast = 0;
                clearInterval(this.intervalS);
            
                this.intervalS = setInterval(() => {
                    this.boxRotate.style.transform = "rotate(" + angle + "deg)";
                    labelUser.forEach(user => user.style.transform = "translate(-50%, -50%)  rotate(-" + angle + "deg)");
                    btnStart.style.transform = " rotate(-" + angle + "deg)";
                    if(lock == true){
                        if(document.getElementById('boxG')){
                            document.getElementById('boxG').remove();
                        }

                        if(fast < 50){fast++}
                        angle += fast;  
                        if(fast >= 50){
                            lock = false;
                            btnStart.textContent = "Stop";
                            btnStart.classList.remove("button-start--go");
                            btnStart.classList.add("button-start--stop");
                        }                       
                    }else{
                        if(stop == true){
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
                                stop = false;
                                lock = true;
                                btnStart.textContent = "Start";
                                btnStart.classList.remove("button-start--stop");
                                btnStart.classList.add("button-start--go");
                            }
                        }else{
                            angle += fast;
                        }
                    }
                }, time);
            }
        });
        
    }

}