//Inspired by:
// http://natureofcode.com

let ps;
let slider_population; 
let sliber_prob_infected;
let sliber_recovery_time;
let plot;
let cheack_box_quanrentine;
let data = [];
//let POPULATION = false;
let counter = 0;
let quarantine = false;
function setup() {

  var canvas = createCanvas(640, 360);
 
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');

  
  
  Simulation(500);
  
  createP('')
  var button = createButton('Restart Simulation')
  button.mousePressed(Simulation)
  
  createP('Population Size')
  slider_population = createSlider(0,1000,100);

  createP('Probabilite of getting Infected')
  slider_prob_infected = createSlider(0,1000,value=500,step=1);

  createP('Recovery Time')
  slider_recovery_time= createSlider(50,500,value=255,step=1);

  createP('Social Distance')
  slider_social_distance= createSlider(28,200,value=200,step=43);

  createP("Percentage of people without symptoms" )
  slider_no_symptoms= createSlider(0,100,value=50,step=10);

  cheack_box_quanrentine = createCheckbox("Quarantine", false);
  cheack_box_quanrentine.changed(change_quarantine_state);

}


function change_quarantine_state(){
  quarantine = !quarantine;
}



function draw() {
  background(200);
  print(quarantine)
  let number_I = 0;
  let number_S = 0;
  let number_R = 0;
  for (let p of ps.particles) {
    if (p.infected == false && p.was_infected == false){
      number_S +=1
    }
    else if (p.infected == true){
      number_I +=1
    }
    else if (p.was_infected == true){
      number_R +=1
    }
  }
  data = [counter, number_I, number_S, number_R];
  ps.update()
  //ps.intersept();
  ps.display()
  if(quarantine){
    ps.remove();
  }
  counter+=1

}


function get_data(){
  return data;
}

function Simulation(){
  data = [];
  try {
    Population = slider_population.value();
    prob_infected =slider_prob_infected.value();
    recovery_time = slider_recovery_time.value();
    social_distance = 1 / (slider_social_distance.value()/1000);
    no_symptoms = slider_no_symptoms.value()/100
  }
  catch(err) {
    Population = 100;
    prob_infected = 500;
    recovery_time = 255;
    social_distance = 5;
    no_symptoms = 0.5
  }

  ps = new ParticleSystem(createVector(width / 2, 50));
  // Option #1 (move the Particle System origin)
  //ps.origin.set(0, 0, 0);
  for (let i = 0; i < Math.round(Population* no_symptoms); i++) {
    x=random(width);
    y=random( height);
    overlapping = false;
    for (let particle of ps.particles) {
      let distance = dist(particle.position.x,particle.position.x, x,y)
      if (distance < 5){
        //They are overlapping
        overlapping = true;
        break;
      }
    }
    if(!overlapping){
      ps.addParticle(x,y,infected=false, prob_infected=prob_infected, recovery_time=recovery_time, social_distance=social_distance, false);
    }

   
    
   }

   for (let i = 0; i < Math.round(Population* (1-no_symptoms)); i++) {
    x=random(width);
    y=random( height);
    overlapping = false;
    for (let particle of ps.particles) {
      let distance = dist(particle.position.x,particle.position.x, x,y)
      if (distance < 5){
        //They are overlapping
        overlapping = true;
        break;
      }
    }
    if(!overlapping){
      ps.addParticle(x,y,infected=false, prob_infected=prob_infected, recovery_time=recovery_time, social_distance=social_distance, true);
    }

   
    
   }

   ps.addParticle(x=random(width), y=random( height),infected=true, prob_infected=prob_infected, recovery_time=recovery_time, social_distance=social_distance, false)
  
   ps.addParticle(x=random(width), y=random( height),infected=true, prob_infected=prob_infected, recovery_time=recovery_time, social_distance=social_distance, true)
   
}
