//Inspired by:
// http://natureofcode.com

function infected_prob_choice(prob){
  var randomValue = random(0,1000);
  if(randomValue <= prob){
    return true;
  }
  else{
    return false;
  }
}

class Particle {

  constructor(x, y , infected, prob_infect, recovery_time, social_distance, symptons) {
    this.acceleration = createVector(0.0, 0.0);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.velocity.setMag(2);
    this.position = createVector(x, y);
    this.r = 3;

    this.symptons = symptons
    this.infected = infected;
    this.was_infected = false;
    this.lifespan = recovery_time;
    this.social_distance = social_distance
    this.prob_infect = prob_infect
  }

  run() {
    this.update();
    this.display();
    this.checkBoundaryCollision();
    //this.isRecovered();
    
  }

  intersept(particles){
    
    for (let other of particles) {
      if (other != this){
        
        
        // let dir = p5.Vector.sub(this.position, other.position);
        
        // if(dir.mag < self.r*2){
        //   console.log('Collision!!!')
        //  dir.setMag(0.2);
        //  this.apply_force(dir)

        //  if(other.infected == true){
        //    this.infected = true;
        //  }
        // }

        let dir = dist(this.position.x,this.position.y, other.position.x,other.position.y)
        if(dir < this.r + other.r + this.social_distance ){
                
          if(other.infected && this.was_infected == false && this.infected == false){
            let infected_value = infected_prob_choice(this.prob_infect )
            this.infected = infected_value;
          }
        }
        
        
        if(dir < this.r + other.r + (1/this.social_distance) ){
          
          other.velocity.x *= -1;
          other.velocity.y *= -1;
          this.velocity.x *= -1;
          this.velocity.y *= -1;
        }
      }
    }

  }

  apply_force(force){
    this.acceleration.add(force)
  }

  checkBoundaryCollision(){
    if (this.position.x > width-this.r) {
      this.position.x = width-this.r;
      this.velocity.x *= -1;
    } else if (this.position.x < this.r) {
      this.position.x = this.r;
      this.velocity.x *= -1;
    } else if (this.position.y > height-this.r) {
      this.position.y = height-this.r;
      this.velocity.y *= -1;
    } else if (this.position.y < this.r) {
      this.position.y = this.r;
      this.velocity.y *= -1;
    }
  }

  // Method to update position
  update() {
    this.velocity.add(this.acceleration);
    //this.velocity.limit(this.topspeed)
    this.position.add(this.velocity);
    if (this.infected == true){
      this.lifespan -= 0.5;
    }
    
    if (this.lifespan <= 0.0) {
      this.infected = false;
      this.was_infected = true; 
    }
    

  }

  // Method to display
  display() {
    //stroke(0, this.lifespan);
    //strokeWeight(2);
    noStroke()
    
    if(this.infected ==true && this.symptons == true){
      fill(233, 0, 50);
    }
    else if(this.infected ==true && this.symptons == false){
      fill(255, 151, 173);
    }
    else if (this.was_infected){
      fill(75, 192, 192);
    }
    else{
      fill(54, 162, 235);
    }
    
    ellipse(this.position.x, this.position.y, this.r*2, this.r*2);
  }

  // Is the particle still useful?
  isRecovered() {
    if (this.lifespan <= 0.0) {
      this.infected = false;
      this.was_infected = true; 
    }
  }

  isRemove() {
    if (this.infected == true && this.symptons == true) {
      return true; 
    }
    else{
      return false;
    }
  }

}