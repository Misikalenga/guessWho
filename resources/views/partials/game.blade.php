    <div class="w-full flex  overflow-hidden h-44 justify-center items-center">
            <div id="hAnim" class="grid grid-cols-12 gap-0">
            </div>
        <h1 class="absolute text-6xl m-4 px-5 py-4 bg-gray-100/40 rounded-xl backdrop-blur-sm">Guess Who</h1>
    </div>


    <div id="body" class="w-full h-screen relative flex  flex-col p-5 select-none">
        <p class="text-justify p-2">
            Guess Who te permet de choisir quelqu’un au hasard dans ton groupe. Ajoute d’abord les joueurs avec New User,
             puis démarre la roue. En Mode Auto, la roue tourne et s’arrête automatiquement. En Mode Manuel,
             c’est toi qui décides du moment où elle s’arrête en appuyant sur Stop. 
        </p>

        <div id="menu" class="p-5 my-5 rounded-xl backdrop-blur-sm bg-gradient-to-t from-gray-500/30 to-gray-100`/30">
            <ul class="flex gap-10 justify-center">
                <li id="create" class="font-bold hover:underline hover:text-blue-600 cursor-pointer active:text-blue-400">New User</li>
                <li id="generate" class="font-bold hover:underline hover:text-blue-600 cursor-pointer active:text-blue-400">Mode Auto</li>
                <li id="modeStop" class="font-bold hover:underline hover:text-blue-600 cursor-pointer active:text-blue-400">Mode Manuel</li>
            </ul>
        </div>
        <div id="container" class="border border-gray-500/30 rounded-xl p-5">
            <p id="initText">Les users seront affichés ici</p>
        </div>

    </div>