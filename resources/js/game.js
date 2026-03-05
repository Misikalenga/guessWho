import CircleStop from './modules/CircleStop';
import Circle from './modules/Circle';
import TextAnim from './modules/TextAnim';
import User from './modules/User';

export function init(){

    const titreAnim = new TextAnim('hAnim');
    titreAnim.contrast = 0.5;
    titreAnim.time = 100;

    titreAnim.color = ["green", "blue", "purple",];
    titreAnim.start()

    const NewUser = new User(document.getElementById("body"));

    const NewCircle = new Circle(document.getElementById("body"));
    NewCircle.init()

    const NewCircleStop = new CircleStop(document.getElementById("body"));
    NewCircleStop.init()
}

