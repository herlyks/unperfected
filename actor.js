function Actor(name, stat = {}) {
  this.name = name;

  this.max_hp = typeof stat.max_hp !== 'undefined' ? stat.max_hp : 100;
  this.hp     = typeof stat.hp !== 'undefined' ? stat.hp : this.max_hp;
  this.max_mp = typeof stat.max_mp !== 'undefined' ? stat.max_mp : 100;
  this.mp     = typeof stat.mp !== 'undefined' ? stat.mp : this.max_mp;
  this.atk    = typeof stat.atk !== 'undefined' ? stat.atk : 10;
  this.mag    = typeof stat.mag !== 'undefined' ? stat.mag : 10;
  this.crit   = typeof stat.crit !== 'undefined' ? stat.crit : 0;
  this.dodge  = typeof stat.dodge !== 'undefined' ? stat.dodge : 0;
  this.max_fd = typeof stat.max_fd !== 'undefined' ? stat.max_fd : 50;
  this.fd     = typeof stat.fd !== 'undefined' ? stat.fd : 0;
  this.def    = typeof stat.def !== 'undefined' ? stat.def : 5;

  function setBasicAttack(f) {
    this.basicAttack = f;
  }

  function setSkillOne(f) {
    this.skillOne = f;
  }

  function setSkillTwo(f) {
    this.skillTwo = f;
  }

  function setSkillThree(f) {
    this.skillThree = f;
  }

  function setSkillUltimate(f) {
    this.skillUltimate = f;
  }
}
