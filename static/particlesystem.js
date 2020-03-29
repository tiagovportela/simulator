//Inspired by:
// http://natureofcode.com


class ParticleSystem {

  constructor(x, y) {
    this.origin = createVector(x, y);
    this.particles = [];
    
  }

  addParticle(x, y, infected, prob_infected, recovery_time, social_distance, symptons) {
    if (x !== undefined && y !== undefined) {
      
      this.particles.push(new Particle(x, y, infected, prob_infected, recovery_time, social_distance, symptons));
    } else {
      this.particles.push(new Particle(this.origin.x, this.origin.y, infected, prob_infected,recovery_time, social_distance, symptons));
    }
  }
  
  display(){
    for (let particle of this.particles) {
      particle.display()
    }
  }

  intersept(){
    for (let particle of this.particles) {
      particle.intersept(this.particles)
    }
  }

  update(){
    for (let particle of this.particles) {
      particle.update()
      particle.checkBoundaryCollision()
      particle.intersept(this.particles)
    }
  }
  
  remove(){
    // Filter removes any elements of the array that do not pass the test
    this.particles = this.particles.filter(particle => !particle.isRemove());

  }
  
  run() {
    // Run every particle
    // ES6 for..of loop
    for (let particle of this.particles) {
      particle.run();
      particle.intersept(this.particles);
      
      if(particle.infected == true){
        counter +=1
      }
      
      
    }

    
    
  }
}