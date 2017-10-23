if (typeof actor_dot_js === 'undefined') {
  throw new Error('actor.js is missing..');
}
var db_skill = {
  strike: (function() {
    var skill = new Skill('Strike', function(target = {}) {
      var caster = this.actor;
      var damage = caster.atk;
      var critical =  dice(0, 100) < caster.crit ? true : false;
      if (critical) {
        damage = damage * 2;
      }
      target.hp -= damage;
      caster.fd += 10;

      var msg = Mustache.render(getTemplate('battle_msg'), deal_damage_option({
        name:this.name, caster, target, damage, critical,
      }));
      writeBattleLog(msg);
    });
    skill.description = 'Hit your opponent using basic strike. +10 FD per use.';
    return skill;
  })(),
  doubleStrike: (function() {
    var skill = new Skill('Double Strike', function(target = {}) {
      var caster = this.actor;
      var damage = caster.atk * 2;
      var critical =  dice(0, 100) < caster.crit ? true : false;
      if (critical) {
        damage = damage * 2;
      }
      target.hp -= damage;

      var msg = Mustache.render(getTemplate('battle_msg'), deal_damage_option({
        name:this.name, caster, target, damage, critical,
      }));
      writeBattleLog(msg);
    });
    skill.description = 'Strike your opponent twice.';
    return skill;
  })(),
  heal: (function() {
    var skill = new Skill('Heal Wound', function(target = {}) {
      var caster = this.actor;
      target = caster;
      var restore = caster.mag;
      var final =  caster.fd >= caster.max_fd ? true : false;
      if (final) {
        restore = restore + caster.fd;
        caster.fd = 0;
      }
      target.hp += restore;

      var msg = Mustache.render(getTemplate('battle_msg'), restore_hp_option({
        name:this.name, caster, target, restore, final,
      }));
      writeBattleLog(msg);
    });
    skill.description = 'Heal yourself. Consume all FD if FD is 100% or more.';
    return skill;
  })()
}; // end db_skill..
