var main_dot_js = 'main.js is loaded..';
if (typeof actor_dot_js === 'undefined') {
  throw new Error('actor.js is missing..');
}
if (typeof global_dot_js === 'undefined') {
  throw new Error('global.js is missing..');
}

(function() {
  function strike(target) {
    var skill_name = 'Strike';
    var caster = this;
    var damage = caster.atk;
    var critical = dice(0, 100) < 20 ? true : false;
    var critical_damage = damage * 2;
    var option = {
      caster : {
        value : caster.name,
        class : caster == player ? 'playername' : 'enemyname'
      },
      target : {
        value : target.name,
        class : target == player ? 'playername' : 'enemyname'
      },
      skill : {
        value : skill_name,
        class : 'skillname'
      },
      damage : {
        value : !critical ? damage : false,
        class : critical ? 'damagecritical' : 'damagetext',
        critical : critical ? critical_damage : false
      }
    };
    var msg = Mustache.render(getTemplate('battle_msg'), {
      deal_damage : option
    })
    writeBattleLog(msg);
  }

  player.basicAttack = strike;
})();
