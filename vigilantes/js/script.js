(function () {

  const FPS = 1; 

  //Dimensions
  let gameDimensions = [1243, 960];
  let focoDimensions = [100, 130];
  let lifeDimensions = [100, 54];
  let devastationDims = [250,250];
  let probFoco = 25;
  let reserva;
  let focos = [];
  let gameLoop;
  const S = 115;

  function init() {
    setScenario();
    startGame();
  }

  function startGame(){
    window.addEventListener("keypress", (e) =>{
      if(e.key === 's')
        gameLoop = setInterval(setFire, 1000/FPS);
    });
  }

  function setScenario(){
    reserva = new Reserva();
    lives = new Life();
    score = new Score();
  }

  window.addEventListener("keydown", function (e) {
    if (e.key === 'o') {
      clearInterval(gameLoop);
    }
  })

  function setFire() {
    if (Math.random() * 100 < probFoco) {
      let foco = new FocoIncendio();
      focos.push(foco);
      foco.burning();
    }
  }

  class Reserva {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "reserva";
      this.element.style.width = `${gameDimensions[0]}px`;
      this.element.style.height = `${gameDimensions[1]}px`;
      document.body.appendChild(this.element);
    }
  }  
  
  class FocoIncendio {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "foco-incendio";
      this.element.style.width = `${focoDimensions[0]}px`;
      this.element.style.height = `${focoDimensions[1]}px`;
      this.element.style.left = `${Math.floor((Math.random() * (gameDimensions[0]-devastationDims[0])))}px`;
      this.element.style.top = `${Math.floor((Math.random() * (gameDimensions[1]-devastationDims[1])))}px`;
      reserva.element.appendChild(this.element);

      this.state = "burning";

    }

    burning(){
      var self = this;

      setTimeout(devastation, 2000);
      putOutFire();

      function devastation(){
        if(self.state != "extinguished"){
          self.element.className += " foco-devastated";
          self.element.style.height = `${devastationDims[0]}px`;
          self.element.style.width = `${devastationDims[1]}px`;
          self.element.removeEventListener("click",extinguish);
          lives.loseLives();
        } 
      }

      function putOutFire(){
        self.element.addEventListener("click", extinguish);
      }

      function extinguish(){
        self.state = "extinguished";
        self.element.parentNode.removeChild(self.element);
        score.increaseScore(10);
      }

      
    }
      
  }

  class Life {
    constructor (){
      this.remainingLives = 5;
      this.element = document.createElement("div");
      this.element.className = "vida";
      this.element.style.width = `${this.remainingLives*lifeDimensions[0]}px`;
      this.element.style.height = `${lifeDimensions[1]}px`;
      document.body.appendChild(this.element);
    }

    loseLives(lives){
      if(this.remainingLives > 0){
        this.remainingLives -= lives;
        this.element.style.width = `${this.remainingLives*lifeDimensions[0]}px`;
      }
    }
  }

  class Score {
    constructor(){
      this.num = 0;    
      this.element = document.createElement("div");
      this.element.className = "score";
      this.element.style.width = `${gameDimensions[0]}px`;
      this.element.innerHTML = this.num.toString().padStart(5, "0"); 
      document.body.appendChild(this.element);
    }

    increaseScore(points){
      this.num += points;
      this.element.innerHTML = this.num.toString().padStart(5, "0");
    }
  }


  init();
})();


//-----------melhorias
//todo: mostrar tela de "pressione S para começar!"