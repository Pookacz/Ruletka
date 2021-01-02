getCookie();
var userBet ='';
var points = this.cookies[1]; //punkty początkowe gracza
var ruletteId = 1; //Id losowania
var chance = 1; //możliwość wykorzystania kodu

//Ustalanie punktów gracza na podstawie punktów
    if(points === undefined){ //jeśli brak ciasteczek to wartość równa 1000
        points = 1000;
    }else{
        points = parseFloat(this.cookies[1]);
    }
    document.getElementById("points").innerHTML = this.points;

timer();

function addPoints(){
    //sprawdzenie czy użytkownik może wykorzystać kod
    if(chance > 0){
        if(add.value == "free100"){
            this.points = this.points + 100;
            document.getElementById("points").innerHTML = points;
            setCookie("points", points, 100);
            chance = chance - 1;
        } 
    }
    
}

//funkcja tworzenia ciasteczek
function setCookie(name, value, days){

    if(!navigator.cookieEnabled) return;

    var e = encodeURIComponent;

    var cookie = e(name) + "=" + e(value);

    if(typeof days === "number"){
        var date = new Date();
        date.setTime(date.getTime() + days * 1000 * 60 *60 *24);
        cookie += "; expires" + date.toGMTString();
    }

    document.cookie = cookie; 

    return cookie[name];
}

//Funkcja czytania ciasteczek
function getCookie(){
    console.log(document.cookie);

    this.cookies = document.cookie.split('=');

    console.log(this.cookies[0]);
    console.log(this.cookies[1]);

    this.points = parseFloat(this.cookies[1])
}

function blackBet(){ //obsatwienie czarnego
    if(pointsBet.value > 0){
        if(points - pointsBet.value >= 0){
            this.userBet = "black"; 
            this.pointsB = pointsBet.value;
            points = points - this.pointsB; //pobranie z konta watości zakładu
            document.getElementById("points").innerHTML = points;
            document.getElementById("result").innerHTML = "Obstawiono <b>" + this.pointsB + '</b> punktów' + " na <span class='black'>Czarne</span>";
            // Wyłączanie przycisków na czas losowania
            greenButton.setAttribute("disabled", true);
            blackButton.setAttribute("disabled", true);
            redButton.setAttribute("disabled", true);

            setCookie("points", points, 100);
        }else{
            console.log("Masz za mało punktów!");
            document.getElementById("result").innerHTML = "Masz za mało punktów";
        }
    } else{
        console.log("nie obstawiłeś żadnych punktów");
        document.getElementById("result").innerHTML = "Nie obstawiłeś/aś żadnych punktów";
    }
}

function redBet(){ //obstawienie czerwonego
    if(pointsBet.value > 0){
        if(points - pointsBet.value >= 0){
            this.userBet = "red";
            this.pointsB = pointsBet.value;
            points = points - this.pointsB; //pobranie z konta watości zakładu
            document.getElementById("points").innerHTML = points;
            document.getElementById("result").innerHTML = "Obstawiono <b>" + this.pointsB + '</b> punktów' + " na <span class='red'>Czerwone</span>";
            // Wyłączanie przycisków na czas losowania
            greenButton.setAttribute("disabled", true);
            blackButton.setAttribute("disabled", true);
            redButton.setAttribute("disabled", true);

            setCookie("points", points, 100);
        }else{
            console.log("Masz za mało punktów!");
            document.getElementById("result").innerHTML = "Masz za mało punktów";
        }
    } else{
        console.log("nie obstawiłeś żadnych punktów");
        document.getElementById("result").innerHTML = "Nie obstawiłeś/aś żadnych punktów";
    }
}
function greenBet(){ //obstawienie zielonego
    if(pointsBet.value > 0){
        if(points - pointsBet.value >= 0){
            this.userBet = "green"; 
            this.pointsB = pointsBet.value; 
            points = points - this.pointsB; //pobranie z konta watości zakładu
            document.getElementById("points").innerHTML = points;
            document.getElementById("result").innerHTML = "Obstawiono <b>" + this.pointsB + '</b> punktów' + " na <span class='green'>Zielone</span>";
            // Wyłączanie przycisków na czas losowania
            greenButton.setAttribute("disabled", true);
            blackButton.setAttribute("disabled", true);
            redButton.setAttribute("disabled", true);

            setCookie("points", points, 100);
        }else{
            console.log("Masz za mało punktów!");
            document.getElementById("result").innerHTML = "Masz za mało punktów";
        }
    } else{
        console.log("nie obstawiłeś żadnych punktów");
        document.getElementById("result").innerHTML = "Nie obstawiłeś/aś żadnych punktów";
    }
}

//funkcja ruletki wywoływana co określony czas 
setInterval(function(){
    
    ruletteId = ruletteId + 1;
    document.getElementById("id").innerHTML = ruletteId;

    timer();

    this.result = Math.round(Math.random()*37);
    
    console.log(this.result);  
    if(this.result == 0){ //zero ma przypisany kolor zielony
        console.log("Wygrywają Zielone!");
        this.color = "green";
    } else if(this.result % 2 == 0){ //liczby parzyste mają przypisany kolor czarny
        console.log("Wygrywają Czarne!");
        this.color = "black";
    } else{ //pozostałe liczby (nieparzyste) mają przypisany kolo czerwony
        console.log("Wygrywają Czerwone!");
        this.color = "red";
    }
    //sprawdza czy gracz wygrał
    if(this.color === this.userBet){
        console.log("wygrana");
        document.getElementById("result").innerHTML = 
        userBet ='';
        if(this.color === "green"){
            this.pointsB = this.pointsB * 12; //stawka za wygranie zielonego
            points = points + this.pointsB;
            document.getElementById("result").innerHTML = "Wygyrwa kolor <span class='green'>Zielony:</span>" + " <b>+" + this.pointsB +"</b> punktów.";
            document.getElementById("points").innerHTML = points;
        }if(this.color === "black"){
            this.pointsB = this.pointsB * 2; //stawka za wygranie czarnego
            points = points + this.pointsB;
            document.getElementById("result").innerHTML = "Wygyrwa kolor <span class='black'>Czarny:</span>" + " <b>+" + this.pointsB + "</b> punktów.";

            document.getElementById("points").innerHTML = points;
        }if(this.color === "red"){
            this.pointsB = this.pointsB * 2; //stawka za wygranie czerwonego
            points = points + this.pointsB;
            document.getElementById("result").innerHTML = "Wygyrwa kolor <span class='red'>Czerwony:</span>" + " <b>+" + this.pointsB +"</b> punktów.";
            document.getElementById("points").innerHTML = points;
        }
    }else if(this.userBet === ''){
        console.log("nie obstawiono");
        document.getElementById("result").innerHTML = "Nie obstawiono żadnych punktów...";
    }else{
        if(this.color === "green"){
            document.getElementById("result").innerHTML = "Wygyrwa kolor <span class='green'>Zielony:</span>" + " <b>-" + this.pointsB +"</b> punktów.";
        }if(this.color === "black"){
            document.getElementById("result").innerHTML = "Wygyrwa kolor <span class='black'>Czarny:</span>" + " <b>-" + this.pointsB + "</b> punktów.";
        }if(this.color === "red"){
            document.getElementById("result").innerHTML = "Wygyrwa kolor <span class='red'>Czerwony:</span>" + " <b>-" + this.pointsB +"</b> punktów.";
        }
        userBet ='';
    }
    setCookie("points", points, 100);
    // Włączanie przycisków po losowaniu
    greenButton.removeAttribute("disabled");
    redButton.removeAttribute("disabled");
    blackButton.removeAttribute("disabled");
}, 18000); //czas kolejnych losowań

//przyciski dodatkowe
function clearPointsBet(){
    pointsBet.value = ''; 
};
function x2(){
    pointsBet.value = pointsBet.value * 2;
}
function x4(){
    pointsBet.value = pointsBet.value * 4;
}
function x8(){
    pointsBet.value = pointsBet.value * 8;
}
function allIn(){
    pointsBet.value = points;
}
   
//odliczanie
function timer(){
    document.getElementById("time").innerHTML = "00:15";

    setTimeout(function(){
        document.getElementById("time").innerHTML = "00:14";
    },1000)
    setTimeout(function(){
        document.getElementById("time").innerHTML = "00:13";
    },2000)
    setTimeout(function(){
        document.getElementById("time").innerHTML = "00:12";
    },3000)
    setTimeout(function(){
        document.getElementById("time").innerHTML = "00:11";
    },4000)
    setTimeout(function(){
        document.getElementById("time").innerHTML = "00:10";
    },5000)
    setTimeout(function(){
        document.getElementById("time").innerHTML = "00:09";
    },6000)
    setTimeout(function(){
        document.getElementById("time").innerHTML = "00:08";
    },7000)
    setTimeout(function(){
        document.getElementById("time").innerHTML = "00:07";
    },8000)
    setTimeout(function(){
        document.getElementById("time").innerHTML = "00:06";
    },9000)
    setTimeout(function(){
        document.getElementById("time").innerHTML = "00:05";
    },10000)
    setTimeout(function(){
        document.getElementById("time").innerHTML = "00:04";
    },11000)
    setTimeout(function(){
        document.getElementById("time").innerHTML = "<span class='red'>00:03</span>";
    },12000)
    setTimeout(function(){
        document.getElementById("time").innerHTML = "<span class='red'>00:02</span>";
    },13000)
    setTimeout(function(){
        document.getElementById("time").innerHTML = "<span class='red'>00:01</span>";
    },14000)
    setTimeout(function(){
        greenButton.setAttribute("disabled", true);
        blackButton.setAttribute("disabled", true);
        redButton.setAttribute("disabled", true);
        document.getElementById("time").innerHTML = "00:00";
        document.getElementById("result").innerHTML = "Losowanie.";
    },15000)
    setTimeout(function(){
        document.getElementById("result").innerHTML = "Losowanie..";
    },16000)
    setTimeout(function(){
        document.getElementById("result").innerHTML = "Losowanie...";
    },17000)
}
