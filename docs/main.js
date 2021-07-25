// Necesitamos una aplicación que nos genere equipos para las practicas de clase. La aplicación tendrá la siguiente funcionalidad:
// - Solicitará al usuario el numero de miembros por equipo y un check para indicar si se quiere mezclar online y presencial
// - A continuación la aplicación te mostrará los grupos generados aleatoriamente, con las condiciones seleccionadas antes. (Estaría guay que se visualizasen los grupos con el mismo estilo que el resultado del sorteo de grupos de la champions)
// - cuando esté generando los equipos aparecerá un gif que encuentres de internet de un bombo moviendo las bolitas durante 3 segundos. Al terminar los 3 segundos aparecerán los resultados.
// - Cuando aparezcan los resultados sonará el audio himno de la champions
// - Publicar en github pages la aplicación

//Group arrays variables created here to acces them globaly.
let groups = [];
let groupOnline = [];
let groupPresencial = [];

//------------------FUNCTION TO GENERATE RANDOM INTEGERS FROM 0 TO MAX---------------//

function getRandomNumber(max) {
    return Math.round(Math.random() * max);
}

//-------------------------------END-------------------------------------------------


let studentsOnline = ['Virginia', 'Veka', 'Ale', 'Yohe', 'Alexander', 'Diego'];
let studentsPresencial = ['Marta', 'Paloma', 'Jean', 'Jorge', 'Matias', 'Jose'];

const membersInput = document.getElementById('members_selection');
const mixedGroups = document.getElementById('mix-choice');

let MEMBERS = 2;
let MIXED = false;

//WE HEAR FOR CHANGES ON NUMBER OF MEMBERS INPUT
membersInput.addEventListener('change', function () {
    MEMBERS = membersInput.value;
});
//WE HEAR FOR CHANGES ON GROUPS INPUT
mixedGroups.addEventListener('change', function () {
    console.log('its here');
    console.log(MIXED);
    console.log(getRandomNumber());
    if (MIXED === false) {
        MIXED = true;
    } else {
        MIXED = false;
    }

});


console.log(membersInput);

const btn = document.getElementById('btn_group_make');

//------------------------CLICKING EVENT LISTENER---------------------------
btn.addEventListener('click', function () {
    showLotteryAnimation();
    makeGroupsLottery(MEMBERS, MIXED);
})
//-------------------------------------END--------------------------------------

//------------------------LOTTERY ANIMATION SHOW-------------------------------
function showLotteryAnimation() {
    //lets hide main screen for now
    const hiddenScreen = document.getElementById('nav-menu');
    hiddenScreen.style.display = 'none';
    //lets show the animation on a nice looking card
    const animationScreen = document.createElement('section');
    animationScreen.classList.add('content-section');
    //lets create the card
    const animationCard = document.createElement('div');
    animationCard.classList.add('animation-card');
    //add the card to the container
    animationScreen.appendChild(animationCard);

    //get the animation screen on the DOM
    document.body.appendChild(animationScreen);
    playChampionsLeagueAudio();
    setTimeout(function () {
        animationScreen.style.display = 'none';
        //hiddenScreen.style.display = 'flex'; //FOR TESTING PURPOSE. WE WILL SHOW GROUPS FROM HERE.
        showGroupResults();
    }, 4200);


}
//-------------------------------------END--------------------------------------

function showGroupResults() {
    let nameHolder = '';
    let groupNumber = 1;
    const groupsScreen = document.createElement('section');
    groupsScreen.classList.add('groups__container');

    if (MIXED === true) {
        groups.forEach(e => {
            /**
             * GROUPS FOR MIXED GROUPS OPTION
             */
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('card__container');

            groupTitle = document.createElement('p');
            groupTitle.classList.add('tittle__block');
            groupTitle.textContent = `GROUP ${groupNumber}`;
            groupNumber++;
            cardContainer.appendChild(groupTitle);

            e.forEach(a => {

                console.log(a);
                nameHolder = document.createElement('p');
                nameHolder.classList.add('text__block');
                nameHolder.textContent = '⭐️ ' + a + ' ⭐️';
                cardContainer.appendChild(nameHolder);
                groupsScreen.appendChild(cardContainer);
                document.body.appendChild(groupsScreen);
            })


        });
    } else {
        groupOnline.forEach(e => {
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('card__container');

            groupTitle = document.createElement('p');
            groupTitle.classList.add('tittle__block');
            groupTitle.textContent = `ONLINE GROUP ${groupNumber}`;
            groupNumber++;
            cardContainer.appendChild(groupTitle);
            e.forEach(a => {

                console.log(a);
                nameHolder = document.createElement('p');
                nameHolder.classList.add('text__block');
                nameHolder.textContent = '⭐️ ' + a + ' ⭐️';
                cardContainer.appendChild(nameHolder);
                groupsScreen.appendChild(cardContainer);
                document.body.appendChild(groupsScreen);
            })

        });
        groupNumber = 1;
        groupPresencial.forEach(e => {
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('card__container');

            groupTitle = document.createElement('p');
            groupTitle.classList.add('tittle__block');
            groupTitle.textContent = `GROUP ${groupNumber}`;
            groupNumber++;
            cardContainer.appendChild(groupTitle);
            e.forEach(a => {

                console.log(a);
                nameHolder = document.createElement('p');
                nameHolder.classList.add('text__block');
                nameHolder.textContent = '⭐️ ' + a + ' ⭐️';
                cardContainer.appendChild(nameHolder);
                groupsScreen.appendChild(cardContainer);
                document.body.appendChild(groupsScreen);
            })

        });

    }

}
//--------------------------------END-----------------------------------
function playChampionsLeagueAudio() {
    console.log('play');
    let audio = new Audio('./assets/rec4.wav');
    audio.play();
}
//------------------------------RANDOM GROUPS GENERATOR--------------------------------
function makeGroupsLottery(members, mixed) {

    let numberOfGroups = Math.ceil((studentsOnline.length + studentsPresencial.length) / members);


    if (mixed === true) {


        let studentsArray = studentsOnline.map(e => e);
        studentsArray = studentsArray.concat(studentsPresencial);
        for (let i = 0; i < numberOfGroups; i++) {
            groups[i] = [];
            for (let j = 0; j < members; j++) {
                if (studentsArray.length > 0) {
                    let memberIndex = getRandomNumber(studentsArray.length - 1);
                    groups[i].push(studentsArray[memberIndex]);
                    studentsArray.splice(memberIndex, 1);
                }

            }
        }
        //console.log(groups); //------------HERE WE HAVE TO CALL TO GROUPS SCREEN MAKER
    } else {

        let studentsArray_online = studentsOnline.map(e => e);
        let studentsArray_presencial = studentsPresencial.map(e => e);


        for (let i = 0; i < numberOfGroups / 2; i++) {
            groupOnline[i] = [];
            for (let j = 0; j < members; j++) {
                if (studentsArray_online.length > 0) {
                    let memberIndex = getRandomNumber(studentsArray_online.length - 1);
                    groupOnline[i].push(studentsArray_online[memberIndex]);
                    studentsArray_online.splice(memberIndex, 1);
                }
            }
        }
        for (let i = 0; i < numberOfGroups / 2; i++) {
            groupPresencial[i] = [];
            for (let j = 0; j < members; j++) {
                if (studentsArray_presencial.length > 0) {
                    let memberIndex = getRandomNumber(studentsArray_presencial.length - 1);
                    groupPresencial[i].push(studentsArray_presencial[memberIndex]);
                    studentsArray_presencial.splice(memberIndex, 1);
                }
            }
        }
        //console.log(groupOnline);//------------HERE WE HAVE TO CALL TO GROUPS SCREEN MAKER
        //console.log(groupPresencial);
    }
}
//-------------------------------------END--------------------------------------

